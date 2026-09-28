<?php
declare(strict_types=1);

// ApicurioRegistry SDK utility: feature_hook

class ApicurioRegistryFeatureHook
{
    public static function call(ApicurioRegistryContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
