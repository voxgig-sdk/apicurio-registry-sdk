# ApicurioRegistry SDK utility: make_context
require_relative '../core/context'
module ApicurioRegistryUtilities
  MakeContext = ->(ctxmap, basectx) {
    ApicurioRegistryContext.new(ctxmap, basectx)
  }
end
