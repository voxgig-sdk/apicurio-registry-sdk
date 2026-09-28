# ApicurioRegistry SDK utility: make_context

from projectname_sdk.core.context import ApicurioRegistryContext


def make_context_util(ctxmap, basectx):
    return ApicurioRegistryContext(ctxmap, basectx)
