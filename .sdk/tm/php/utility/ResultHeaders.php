<?php
declare(strict_types=1);

// ApicurioRegistry SDK utility: result_headers

class ApicurioRegistryResultHeaders
{
    public static function call(ApicurioRegistryContext $ctx): ?ApicurioRegistryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
