-- Metadata entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("apicurio-registry_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("MetadataEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Metadata(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = metadata_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "metadata." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_METADATA_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local metadata_ref01_ent = client:Metadata(nil)
    local metadata_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.metadata"), "metadata_ref01"))
    metadata_ref01_data["artifact_id"] = setup.idmap["artifact01"]
    metadata_ref01_data["group_id"] = setup.idmap["group01"]
    metadata_ref01_data["version_expression"] = setup.idmap["version_expression01"]

    local metadata_ref01_data_result, err = metadata_ref01_ent:create(metadata_ref01_data, nil)
    assert.is_nil(err)
    metadata_ref01_data = helpers.to_map(type(metadata_ref01_data_result) == 'table' and metadata_ref01_data_result.data_get and metadata_ref01_data_result:data_get() or metadata_ref01_data_result)
    assert.is_not_nil(metadata_ref01_data)

    -- UPDATE
    local metadata_ref01_data_up0_up = {
      ["group_id"] = setup.idmap["group_id"],
    }

    local metadata_ref01_markdef_up0_name = "artifactId"
    local metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_" .. tostring(setup.now)
    metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

    local metadata_ref01_resdata_up0_result, err = metadata_ref01_ent:update(metadata_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local metadata_ref01_resdata_up0 = helpers.to_map(type(metadata_ref01_resdata_up0_result) == 'table' and metadata_ref01_resdata_up0_result.data_get and metadata_ref01_resdata_up0_result:data_get() or metadata_ref01_resdata_up0_result)
    assert.is_not_nil(metadata_ref01_resdata_up0)
    assert.are.equal(metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name], metadata_ref01_markdef_up0_value)

    -- LOAD
    local metadata_ref01_match_dt0 = {}
    local metadata_ref01_data_dt0_loaded, err = metadata_ref01_ent:load(metadata_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(metadata_ref01_data_dt0_loaded)

  end)
end)

function metadata_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/metadata/MetadataTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read metadata test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "metadata01", "metadata02", "metadata03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03", "version_expression01" },
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
  local entid_env_raw = os.getenv("APICURIO_REGISTRY_TEST_METADATA_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["APICURIO_REGISTRY_TEST_METADATA_ENTID"] = idmap,
    ["APICURIO_REGISTRY_TEST_LIVE"] = "FALSE",
    ["APICURIO_REGISTRY_TEST_EXPLAIN"] = "FALSE",
    ["APICURIO_REGISTRY_SERVER_REGISTRY"] = "MY-REGISTRY-URL",
  })

  local idmap_resolved = helpers.to_map(
    env["APICURIO_REGISTRY_TEST_METADATA_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["group_id"] == nil then
    idmap_resolved["group_id"] = idmap_resolved["group01"]
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
