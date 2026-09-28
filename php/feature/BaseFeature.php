<?php
declare(strict_types=1);

// ApicurioRegistry SDK base feature

class ApicurioRegistryBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ApicurioRegistryContext $ctx, array $options): void {}
    public function PostConstruct(ApicurioRegistryContext $ctx): void {}
    public function PostConstructEntity(ApicurioRegistryContext $ctx): void {}
    public function SetData(ApicurioRegistryContext $ctx): void {}
    public function GetData(ApicurioRegistryContext $ctx): void {}
    public function GetMatch(ApicurioRegistryContext $ctx): void {}
    public function SetMatch(ApicurioRegistryContext $ctx): void {}
    public function PrePoint(ApicurioRegistryContext $ctx): void {}
    public function PreSpec(ApicurioRegistryContext $ctx): void {}
    public function PreRequest(ApicurioRegistryContext $ctx): void {}
    public function PreResponse(ApicurioRegistryContext $ctx): void {}
    public function PreResult(ApicurioRegistryContext $ctx): void {}
    public function PreDone(ApicurioRegistryContext $ctx): void {}
    public function PreUnexpected(ApicurioRegistryContext $ctx): void {}
}
