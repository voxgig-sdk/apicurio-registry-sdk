<?php
declare(strict_types=1);

// ApicurioRegistry SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ApicurioRegistryMakeContext
{
    public static function call(array $ctxmap, ?ApicurioRegistryContext $basectx): ApicurioRegistryContext
    {
        return new ApicurioRegistryContext($ctxmap, $basectx);
    }
}
