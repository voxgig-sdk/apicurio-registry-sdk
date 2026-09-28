<?php
declare(strict_types=1);

// ApicurioRegistry SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class ApicurioRegistrySDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new ApicurioRegistryUtility();
        $this->_utility = $utility;

        $config = ApicurioRegistryConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = ApicurioRegistryHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = ApicurioRegistryHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!ApicurioRegistryFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, ApicurioRegistryFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return ApicurioRegistryUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = ApicurioRegistryHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = ApicurioRegistryHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = ApicurioRegistryHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new ApicurioRegistrySpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new ApicurioRegistryError($op . "_allow",
                "ApicurioRegistrySDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = ApicurioRegistryHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = ApicurioRegistryHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new ApicurioRegistryError("graphql_error",
                "ApicurioRegistrySDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_admin = null;

    // Canonical facade: $client->Admin()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->admin()
    // resolves here too.
    public function Admin($data = null)
    {
        require_once __DIR__ . '/entity/admin_entity.php';
        if ($data === null) {
            if ($this->_admin === null) {
                $this->_admin = new AdminEntity($this, null);
            }
            return $this->_admin;
        }
        return new AdminEntity($this, $data);
    }


    private $_agent = null;

    // Canonical facade: $client->Agent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent()
    // resolves here too.
    public function Agent($data = null)
    {
        require_once __DIR__ . '/entity/agent_entity.php';
        if ($data === null) {
            if ($this->_agent === null) {
                $this->_agent = new AgentEntity($this, null);
            }
            return $this->_agent;
        }
        return new AgentEntity($this, $data);
    }


    private $_agent_card = null;

    // Canonical facade: $client->AgentCard()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agent_card()
    // resolves here too.
    public function AgentCard($data = null)
    {
        require_once __DIR__ . '/entity/agent_card_entity.php';
        if ($data === null) {
            if ($this->_agent_card === null) {
                $this->_agent_card = new AgentCardEntity($this, null);
            }
            return $this->_agent_card;
        }
        return new AgentCardEntity($this, $data);
    }


    private $_ai_catalog = null;

    // Canonical facade: $client->AiCatalog()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ai_catalog()
    // resolves here too.
    public function AiCatalog($data = null)
    {
        require_once __DIR__ . '/entity/ai_catalog_entity.php';
        if ($data === null) {
            if ($this->_ai_catalog === null) {
                $this->_ai_catalog = new AiCatalogEntity($this, null);
            }
            return $this->_ai_catalog;
        }
        return new AiCatalogEntity($this, $data);
    }


    private $_ard_explore = null;

    // Canonical facade: $client->ArdExplore()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ard_explore()
    // resolves here too.
    public function ArdExplore($data = null)
    {
        require_once __DIR__ . '/entity/ard_explore_entity.php';
        if ($data === null) {
            if ($this->_ard_explore === null) {
                $this->_ard_explore = new ArdExploreEntity($this, null);
            }
            return $this->_ard_explore;
        }
        return new ArdExploreEntity($this, $data);
    }


    private $_ard_search = null;

    // Canonical facade: $client->ArdSearch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ard_search()
    // resolves here too.
    public function ArdSearch($data = null)
    {
        require_once __DIR__ . '/entity/ard_search_entity.php';
        if ($data === null) {
            if ($this->_ard_search === null) {
                $this->_ard_search = new ArdSearchEntity($this, null);
            }
            return $this->_ard_search;
        }
        return new ArdSearchEntity($this, $data);
    }


    private $_artifact = null;

    // Canonical facade: $client->Artifact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact()
    // resolves here too.
    public function Artifact($data = null)
    {
        require_once __DIR__ . '/entity/artifact_entity.php';
        if ($data === null) {
            if ($this->_artifact === null) {
                $this->_artifact = new ArtifactEntity($this, null);
            }
            return $this->_artifact;
        }
        return new ArtifactEntity($this, $data);
    }


    private $_artifact_reference = null;

    // Canonical facade: $client->ArtifactReference()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_reference()
    // resolves here too.
    public function ArtifactReference($data = null)
    {
        require_once __DIR__ . '/entity/artifact_reference_entity.php';
        if ($data === null) {
            if ($this->_artifact_reference === null) {
                $this->_artifact_reference = new ArtifactReferenceEntity($this, null);
            }
            return $this->_artifact_reference;
        }
        return new ArtifactReferenceEntity($this, $data);
    }


    private $_artifact_rule = null;

    // Canonical facade: $client->ArtifactRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_rule()
    // resolves here too.
    public function ArtifactRule($data = null)
    {
        require_once __DIR__ . '/entity/artifact_rule_entity.php';
        if ($data === null) {
            if ($this->_artifact_rule === null) {
                $this->_artifact_rule = new ArtifactRuleEntity($this, null);
            }
            return $this->_artifact_rule;
        }
        return new ArtifactRuleEntity($this, $data);
    }


    private $_artifact_type = null;

    // Canonical facade: $client->ArtifactType()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->artifact_type()
    // resolves here too.
    public function ArtifactType($data = null)
    {
        require_once __DIR__ . '/entity/artifact_type_entity.php';
        if ($data === null) {
            if ($this->_artifact_type === null) {
                $this->_artifact_type = new ArtifactTypeEntity($this, null);
            }
            return $this->_artifact_type;
        }
        return new ArtifactTypeEntity($this, $data);
    }


    private $_branch = null;

    // Canonical facade: $client->Branch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->branch()
    // resolves here too.
    public function Branch($data = null)
    {
        require_once __DIR__ . '/entity/branch_entity.php';
        if ($data === null) {
            if ($this->_branch === null) {
                $this->_branch = new BranchEntity($this, null);
            }
            return $this->_branch;
        }
        return new BranchEntity($this, $data);
    }


    private $_comment = null;

    // Canonical facade: $client->Comment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->comment()
    // resolves here too.
    public function Comment($data = null)
    {
        require_once __DIR__ . '/entity/comment_entity.php';
        if ($data === null) {
            if ($this->_comment === null) {
                $this->_comment = new CommentEntity($this, null);
            }
            return $this->_comment;
        }
        return new CommentEntity($this, $data);
    }


    private $_configuration_property = null;

    // Canonical facade: $client->ConfigurationProperty()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->configuration_property()
    // resolves here too.
    public function ConfigurationProperty($data = null)
    {
        require_once __DIR__ . '/entity/configuration_property_entity.php';
        if ($data === null) {
            if ($this->_configuration_property === null) {
                $this->_configuration_property = new ConfigurationPropertyEntity($this, null);
            }
            return $this->_configuration_property;
        }
        return new ConfigurationPropertyEntity($this, $data);
    }


    private $_consumer_version_heatmap = null;

    // Canonical facade: $client->ConsumerVersionHeatmap()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->consumer_version_heatmap()
    // resolves here too.
    public function ConsumerVersionHeatmap($data = null)
    {
        require_once __DIR__ . '/entity/consumer_version_heatmap_entity.php';
        if ($data === null) {
            if ($this->_consumer_version_heatmap === null) {
                $this->_consumer_version_heatmap = new ConsumerVersionHeatmapEntity($this, null);
            }
            return $this->_consumer_version_heatmap;
        }
        return new ConsumerVersionHeatmapEntity($this, $data);
    }


    private $_content = null;

    // Canonical facade: $client->Content()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->content()
    // resolves here too.
    public function Content($data = null)
    {
        require_once __DIR__ . '/entity/content_entity.php';
        if ($data === null) {
            if ($this->_content === null) {
                $this->_content = new ContentEntity($this, null);
            }
            return $this->_content;
        }
        return new ContentEntity($this, $data);
    }


    private $_contract = null;

    // Canonical facade: $client->Contract()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->contract()
    // resolves here too.
    public function Contract($data = null)
    {
        require_once __DIR__ . '/entity/contract_entity.php';
        if ($data === null) {
            if ($this->_contract === null) {
                $this->_contract = new ContractEntity($this, null);
            }
            return $this->_contract;
        }
        return new ContractEntity($this, $data);
    }


    private $_contract_rule = null;

    // Canonical facade: $client->ContractRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->contract_rule()
    // resolves here too.
    public function ContractRule($data = null)
    {
        require_once __DIR__ . '/entity/contract_rule_entity.php';
        if ($data === null) {
            if ($this->_contract_rule === null) {
                $this->_contract_rule = new ContractRuleEntity($this, null);
            }
            return $this->_contract_rule;
        }
        return new ContractRuleEntity($this, $data);
    }


    private $_contract_rule_set = null;

    // Canonical facade: $client->ContractRuleSet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->contract_rule_set()
    // resolves here too.
    public function ContractRuleSet($data = null)
    {
        require_once __DIR__ . '/entity/contract_rule_set_entity.php';
        if ($data === null) {
            if ($this->_contract_rule_set === null) {
                $this->_contract_rule_set = new ContractRuleSetEntity($this, null);
            }
            return $this->_contract_rule_set;
        }
        return new ContractRuleSetEntity($this, $data);
    }


    private $_create_artifact = null;

    // Canonical facade: $client->CreateArtifact()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->create_artifact()
    // resolves here too.
    public function CreateArtifact($data = null)
    {
        require_once __DIR__ . '/entity/create_artifact_entity.php';
        if ($data === null) {
            if ($this->_create_artifact === null) {
                $this->_create_artifact = new CreateArtifactEntity($this, null);
            }
            return $this->_create_artifact;
        }
        return new CreateArtifactEntity($this, $data);
    }


    private $_deprecation_readiness = null;

    // Canonical facade: $client->DeprecationReadiness()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->deprecation_readiness()
    // resolves here too.
    public function DeprecationReadiness($data = null)
    {
        require_once __DIR__ . '/entity/deprecation_readiness_entity.php';
        if ($data === null) {
            if ($this->_deprecation_readiness === null) {
                $this->_deprecation_readiness = new DeprecationReadinessEntity($this, null);
            }
            return $this->_deprecation_readiness;
        }
        return new DeprecationReadinessEntity($this, $data);
    }


    private $_download_ref = null;

    // Canonical facade: $client->DownloadRef()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->download_ref()
    // resolves here too.
    public function DownloadRef($data = null)
    {
        require_once __DIR__ . '/entity/download_ref_entity.php';
        if ($data === null) {
            if ($this->_download_ref === null) {
                $this->_download_ref = new DownloadRefEntity($this, null);
            }
            return $this->_download_ref;
        }
        return new DownloadRefEntity($this, $data);
    }


    private $_git_op = null;

    // Canonical facade: $client->GitOp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->git_op()
    // resolves here too.
    public function GitOp($data = null)
    {
        require_once __DIR__ . '/entity/git_op_entity.php';
        if ($data === null) {
            if ($this->_git_op === null) {
                $this->_git_op = new GitOpEntity($this, null);
            }
            return $this->_git_op;
        }
        return new GitOpEntity($this, $data);
    }


    private $_git_ops_status = null;

    // Canonical facade: $client->GitOpsStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->git_ops_status()
    // resolves here too.
    public function GitOpsStatus($data = null)
    {
        require_once __DIR__ . '/entity/git_ops_status_entity.php';
        if ($data === null) {
            if ($this->_git_ops_status === null) {
                $this->_git_ops_status = new GitOpsStatusEntity($this, null);
            }
            return $this->_git_ops_status;
        }
        return new GitOpsStatusEntity($this, $data);
    }


    private $_git_ops_validate_task = null;

    // Canonical facade: $client->GitOpsValidateTask()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->git_ops_validate_task()
    // resolves here too.
    public function GitOpsValidateTask($data = null)
    {
        require_once __DIR__ . '/entity/git_ops_validate_task_entity.php';
        if ($data === null) {
            if ($this->_git_ops_validate_task === null) {
                $this->_git_ops_validate_task = new GitOpsValidateTaskEntity($this, null);
            }
            return $this->_git_ops_validate_task;
        }
        return new GitOpsValidateTaskEntity($this, $data);
    }


    private $_global_rule = null;

    // Canonical facade: $client->GlobalRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->global_rule()
    // resolves here too.
    public function GlobalRule($data = null)
    {
        require_once __DIR__ . '/entity/global_rule_entity.php';
        if ($data === null) {
            if ($this->_global_rule === null) {
                $this->_global_rule = new GlobalRuleEntity($this, null);
            }
            return $this->_global_rule;
        }
        return new GlobalRuleEntity($this, $data);
    }


    private $_group = null;

    // Canonical facade: $client->Group()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->group()
    // resolves here too.
    public function Group($data = null)
    {
        require_once __DIR__ . '/entity/group_entity.php';
        if ($data === null) {
            if ($this->_group === null) {
                $this->_group = new GroupEntity($this, null);
            }
            return $this->_group;
        }
        return new GroupEntity($this, $data);
    }


    private $_group_rule = null;

    // Canonical facade: $client->GroupRule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->group_rule()
    // resolves here too.
    public function GroupRule($data = null)
    {
        require_once __DIR__ . '/entity/group_rule_entity.php';
        if ($data === null) {
            if ($this->_group_rule === null) {
                $this->_group_rule = new GroupRuleEntity($this, null);
            }
            return $this->_group_rule;
        }
        return new GroupRuleEntity($this, $data);
    }


    private $_kafka_sql = null;

    // Canonical facade: $client->KafkaSql()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->kafka_sql()
    // resolves here too.
    public function KafkaSql($data = null)
    {
        require_once __DIR__ . '/entity/kafka_sql_entity.php';
        if ($data === null) {
            if ($this->_kafka_sql === null) {
                $this->_kafka_sql = new KafkaSqlEntity($this, null);
            }
            return $this->_kafka_sql;
        }
        return new KafkaSqlEntity($this, $data);
    }


    private $_mcp_tool = null;

    // Canonical facade: $client->McpTool()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mcp_tool()
    // resolves here too.
    public function McpTool($data = null)
    {
        require_once __DIR__ . '/entity/mcp_tool_entity.php';
        if ($data === null) {
            if ($this->_mcp_tool === null) {
                $this->_mcp_tool = new McpToolEntity($this, null);
            }
            return $this->_mcp_tool;
        }
        return new McpToolEntity($this, $data);
    }


    private $_metadata = null;

    // Canonical facade: $client->Metadata()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->metadata()
    // resolves here too.
    public function Metadata($data = null)
    {
        require_once __DIR__ . '/entity/metadata_entity.php';
        if ($data === null) {
            if ($this->_metadata === null) {
                $this->_metadata = new MetadataEntity($this, null);
            }
            return $this->_metadata;
        }
        return new MetadataEntity($this, $data);
    }


    private $_odcs_contract_result = null;

    // Canonical facade: $client->OdcsContractResult()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->odcs_contract_result()
    // resolves here too.
    public function OdcsContractResult($data = null)
    {
        require_once __DIR__ . '/entity/odcs_contract_result_entity.php';
        if ($data === null) {
            if ($this->_odcs_contract_result === null) {
                $this->_odcs_contract_result = new OdcsContractResultEntity($this, null);
            }
            return $this->_odcs_contract_result;
        }
        return new OdcsContractResultEntity($this, $data);
    }


    private $_odcs_contract_summary = null;

    // Canonical facade: $client->OdcsContractSummary()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->odcs_contract_summary()
    // resolves here too.
    public function OdcsContractSummary($data = null)
    {
        require_once __DIR__ . '/entity/odcs_contract_summary_entity.php';
        if ($data === null) {
            if ($this->_odcs_contract_summary === null) {
                $this->_odcs_contract_summary = new OdcsContractSummaryEntity($this, null);
            }
            return $this->_odcs_contract_summary;
        }
        return new OdcsContractSummaryEntity($this, $data);
    }


    private $_reference_graph = null;

    // Canonical facade: $client->ReferenceGraph()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->reference_graph()
    // resolves here too.
    public function ReferenceGraph($data = null)
    {
        require_once __DIR__ . '/entity/reference_graph_entity.php';
        if ($data === null) {
            if ($this->_reference_graph === null) {
                $this->_reference_graph = new ReferenceGraphEntity($this, null);
            }
            return $this->_reference_graph;
        }
        return new ReferenceGraphEntity($this, $data);
    }


    private $_role_mapping = null;

    // Canonical facade: $client->RoleMapping()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->role_mapping()
    // resolves here too.
    public function RoleMapping($data = null)
    {
        require_once __DIR__ . '/entity/role_mapping_entity.php';
        if ($data === null) {
            if ($this->_role_mapping === null) {
                $this->_role_mapping = new RoleMappingEntity($this, null);
            }
            return $this->_role_mapping;
        }
        return new RoleMappingEntity($this, $data);
    }


    private $_rule = null;

    // Canonical facade: $client->Rule()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->rule()
    // resolves here too.
    public function Rule($data = null)
    {
        require_once __DIR__ . '/entity/rule_entity.php';
        if ($data === null) {
            if ($this->_rule === null) {
                $this->_rule = new RuleEntity($this, null);
            }
            return $this->_rule;
        }
        return new RuleEntity($this, $data);
    }


    private $_searched_branch = null;

    // Canonical facade: $client->SearchedBranch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->searched_branch()
    // resolves here too.
    public function SearchedBranch($data = null)
    {
        require_once __DIR__ . '/entity/searched_branch_entity.php';
        if ($data === null) {
            if ($this->_searched_branch === null) {
                $this->_searched_branch = new SearchedBranchEntity($this, null);
            }
            return $this->_searched_branch;
        }
        return new SearchedBranchEntity($this, $data);
    }


    private $_searched_group = null;

    // Canonical facade: $client->SearchedGroup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->searched_group()
    // resolves here too.
    public function SearchedGroup($data = null)
    {
        require_once __DIR__ . '/entity/searched_group_entity.php';
        if ($data === null) {
            if ($this->_searched_group === null) {
                $this->_searched_group = new SearchedGroupEntity($this, null);
            }
            return $this->_searched_group;
        }
        return new SearchedGroupEntity($this, $data);
    }


    private $_system_info = null;

    // Canonical facade: $client->SystemInfo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->system_info()
    // resolves here too.
    public function SystemInfo($data = null)
    {
        require_once __DIR__ . '/entity/system_info_entity.php';
        if ($data === null) {
            if ($this->_system_info === null) {
                $this->_system_info = new SystemInfoEntity($this, null);
            }
            return $this->_system_info;
        }
        return new SystemInfoEntity($this, $data);
    }


    private $_usage_summary = null;

    // Canonical facade: $client->UsageSummary()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->usage_summary()
    // resolves here too.
    public function UsageSummary($data = null)
    {
        require_once __DIR__ . '/entity/usage_summary_entity.php';
        if ($data === null) {
            if ($this->_usage_summary === null) {
                $this->_usage_summary = new UsageSummaryEntity($this, null);
            }
            return $this->_usage_summary;
        }
        return new UsageSummaryEntity($this, $data);
    }


    private $_user_info = null;

    // Canonical facade: $client->UserInfo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_info()
    // resolves here too.
    public function UserInfo($data = null)
    {
        require_once __DIR__ . '/entity/user_info_entity.php';
        if ($data === null) {
            if ($this->_user_info === null) {
                $this->_user_info = new UserInfoEntity($this, null);
            }
            return $this->_user_info;
        }
        return new UserInfoEntity($this, $data);
    }


    private $_user_interface_config = null;

    // Canonical facade: $client->UserInterfaceConfig()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->user_interface_config()
    // resolves here too.
    public function UserInterfaceConfig($data = null)
    {
        require_once __DIR__ . '/entity/user_interface_config_entity.php';
        if ($data === null) {
            if ($this->_user_interface_config === null) {
                $this->_user_interface_config = new UserInterfaceConfigEntity($this, null);
            }
            return $this->_user_interface_config;
        }
        return new UserInterfaceConfigEntity($this, $data);
    }


    private $_version = null;

    // Canonical facade: $client->Version()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->version()
    // resolves here too.
    public function Version($data = null)
    {
        require_once __DIR__ . '/entity/version_entity.php';
        if ($data === null) {
            if ($this->_version === null) {
                $this->_version = new VersionEntity($this, null);
            }
            return $this->_version;
        }
        return new VersionEntity($this, $data);
    }


    private $_well_known = null;

    // Canonical facade: $client->WellKnown()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->well_known()
    // resolves here too.
    public function WellKnown($data = null)
    {
        require_once __DIR__ . '/entity/well_known_entity.php';
        if ($data === null) {
            if ($this->_well_known === null) {
                $this->_well_known = new WellKnownEntity($this, null);
            }
            return $this->_well_known;
        }
        return new WellKnownEntity($this, $data);
    }


    private $_wrapped_version_state = null;

    // Canonical facade: $client->WrappedVersionState()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->wrapped_version_state()
    // resolves here too.
    public function WrappedVersionState($data = null)
    {
        require_once __DIR__ . '/entity/wrapped_version_state_entity.php';
        if ($data === null) {
            if ($this->_wrapped_version_state === null) {
                $this->_wrapped_version_state = new WrappedVersionStateEntity($this, null);
            }
            return $this->_wrapped_version_state;
        }
        return new WrappedVersionStateEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new ApicurioRegistrySDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
