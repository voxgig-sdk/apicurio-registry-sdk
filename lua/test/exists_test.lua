-- ApicurioRegistry SDK exists test

local sdk = require("apicurio-registry_sdk")

describe("ApicurioRegistrySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
