<?php
declare(strict_types=1);

// ApicurioRegistry SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class ApicurioRegistryContext
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?ApicurioRegistryUtility $utility;
    public ApicurioRegistryControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?ApicurioRegistrySpec $spec;
    public ?ApicurioRegistryResult $result;
    public ?ApicurioRegistryResponse $response;
    public ApicurioRegistryOperation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new ApicurioRegistryControl();
        $ctrl_raw = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
            if (array_key_exists('actor', $ctrl_raw)) {
                $this->ctrl->actor = $ctrl_raw['actor'];
            }
            if (isset($ctrl_raw['paging']) && is_array($ctrl_raw['paging'])) {
                $this->ctrl->paging = $ctrl_raw['paging'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null
            && ApicurioRegistryHelpers::get_ctx_prop($ctxmap, "opname") === null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = ApicurioRegistryHelpers::to_map(ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = ApicurioRegistryHelpers::to_map(ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = ApicurioRegistryHelpers::to_map(ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = ApicurioRegistryHelpers::to_map(ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof ApicurioRegistrySpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof ApicurioRegistryResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof ApicurioRegistryResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = ApicurioRegistryHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): ApicurioRegistryOperation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new ApicurioRegistryOperation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new ApicurioRegistryOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): ApicurioRegistryError
    {
        return new ApicurioRegistryError($code, $msg, $this);
    }
}
