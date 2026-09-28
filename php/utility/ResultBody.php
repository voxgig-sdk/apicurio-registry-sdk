<?php
declare(strict_types=1);

// ApicurioRegistry SDK utility: result_body

class ApicurioRegistryResultBody
{
    public static function call(ApicurioRegistryContext $ctx): ?ApicurioRegistryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
