-- WellKnown entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("apicurio-registry_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("WellKnownEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:WellKnown(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = well_known_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "well_known." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local well_known_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.well_known")))
    local well_known_ref01_data = nil
    if #well_known_ref01_data_raw > 0 then
      well_known_ref01_data = helpers.to_map(well_known_ref01_data_raw[1][2])
    end

    -- LOAD
    local well_known_ref01_ent = client:WellKnown(nil)
    local well_known_ref01_match_dt0 = {
      id = well_known_ref01_data["id"],
    }
    local well_known_ref01_data_dt0_loaded, err = well_known_ref01_ent:load(well_known_ref01_match_dt0, nil)
    assert.is_nil(err)
    local well_known_ref01_data_dt0_load_result = helpers.to_map(type(well_known_ref01_data_dt0_loaded) == 'table' and well_known_ref01_data_dt0_loaded.data_get and well_known_ref01_data_dt0_loaded:data_get() or well_known_ref01_data_dt0_loaded)
    assert.is_not_nil(well_known_ref01_data_dt0_load_result)
    assert.are.equal(well_known_ref01_data_dt0_load_result["id"], well_known_ref01_data["id"])

  end)
end)

function well_known_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/well_known/WellKnownTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read well_known test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "well_known01", "well_known02", "well_known03", "agent01", "agent02", "agent03", "mcp_tool01", "mcp_tool02", "mcp_tool03", "schema_type01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID"] = idmap,
    ["APICURIO_REGISTRY_TEST_LIVE"] = "FALSE",
    ["APICURIO_REGISTRY_TEST_EXPLAIN"] = "FALSE",
    ["APICURIO_REGISTRY_SERVER_REGISTRY"] = "MY-REGISTRY-URL",
  })

  local idmap_resolved = helpers.to_map(
    env["APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["APICURIO_REGISTRY_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        server = {
          ["registry"] = env["APICURIO_REGISTRY_SERVER_REGISTRY"],
        },
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["APICURIO_REGISTRY_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["APICURIO_REGISTRY_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
