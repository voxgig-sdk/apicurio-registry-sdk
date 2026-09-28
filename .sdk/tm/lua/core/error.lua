-- ApicurioRegistry SDK error

local ApicurioRegistryError = {}
ApicurioRegistryError.__index = ApicurioRegistryError


function ApicurioRegistryError.new(code, msg, ctx)
  local self = setmetatable({}, ApicurioRegistryError)
  self.is_sdk_error = true
  self.sdk = "ApicurioRegistry"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ApicurioRegistryError:error()
  return self.msg
end


function ApicurioRegistryError:__tostring()
  return self.msg
end


return ApicurioRegistryError
