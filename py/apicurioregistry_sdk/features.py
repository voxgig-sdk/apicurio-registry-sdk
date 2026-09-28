# ApicurioRegistry SDK feature factory

from apicurioregistry_sdk.feature.base_feature import ApicurioRegistryBaseFeature
from apicurioregistry_sdk.feature.debug_feature import ApicurioRegistryDebugFeature
from apicurioregistry_sdk.feature.idempotency_feature import ApicurioRegistryIdempotencyFeature
from apicurioregistry_sdk.feature.metrics_feature import ApicurioRegistryMetricsFeature
from apicurioregistry_sdk.feature.paging_feature import ApicurioRegistryPagingFeature
from apicurioregistry_sdk.feature.ratelimit_feature import ApicurioRegistryRatelimitFeature
from apicurioregistry_sdk.feature.retry_feature import ApicurioRegistryRetryFeature
from apicurioregistry_sdk.feature.test_feature import ApicurioRegistryTestFeature
from apicurioregistry_sdk.feature.timeout_feature import ApicurioRegistryTimeoutFeature


_FEATURES = {
    "base": lambda: ApicurioRegistryBaseFeature(),
    "debug": lambda: ApicurioRegistryDebugFeature(),
    "idempotency": lambda: ApicurioRegistryIdempotencyFeature(),
    "metrics": lambda: ApicurioRegistryMetricsFeature(),
    "paging": lambda: ApicurioRegistryPagingFeature(),
    "ratelimit": lambda: ApicurioRegistryRatelimitFeature(),
    "retry": lambda: ApicurioRegistryRetryFeature(),
    "test": lambda: ApicurioRegistryTestFeature(),
    "timeout": lambda: ApicurioRegistryTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
