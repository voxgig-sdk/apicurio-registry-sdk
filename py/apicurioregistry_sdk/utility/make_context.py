# ApicurioRegistry SDK utility: make_context

from apicurioregistry_sdk.core.context import ApicurioRegistryContext


def make_context_util(ctxmap, basectx):
    return ApicurioRegistryContext(ctxmap, basectx)
