-- Contract entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("apicurio-registry_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ContractEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Contract(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["contract"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Contract(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Contract(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = contract_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "contract." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_CONTRACT_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local contract_ref01_ent = client:Contract(nil)
    local contract_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.contract"), "contract_ref01"))
    contract_ref01_data["artifact_id"] = setup.idmap["artifact01"]
    contract_ref01_data["group_id"] = setup.idmap["group01"]

    local contract_ref01_data_result, err = contract_ref01_ent:create(contract_ref01_data, nil)
    assert.is_nil(err)
    contract_ref01_data = helpers.to_map(type(contract_ref01_data_result) == 'table' and contract_ref01_data_result.data_get and contract_ref01_data_result:data_get() or contract_ref01_data_result)
    assert.is_not_nil(contract_ref01_data)
    assert.is_not_nil(contract_ref01_data["id"])

    -- LIST
    local contract_ref01_match = {
      ["artifact_id"] = setup.idmap["artifact01"],
      ["group_id"] = setup.idmap["group01"],
    }

    local contract_ref01_list_result, err = contract_ref01_ent:list(contract_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(contract_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(contract_ref01_list_result),
      { id = contract_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local contract_ref01_data_up0_up = {
      id = contract_ref01_data["id"],
      ["group_id"] = setup.idmap["group_id"],
    }

    local contract_ref01_markdef_up0_name = "artifactId"
    local contract_ref01_markdef_up0_value = "Mark01-contract_ref01_" .. tostring(setup.now)
    contract_ref01_data_up0_up[contract_ref01_markdef_up0_name] = contract_ref01_markdef_up0_value

    local contract_ref01_resdata_up0_result, err = contract_ref01_ent:update(contract_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local contract_ref01_resdata_up0 = helpers.to_map(type(contract_ref01_resdata_up0_result) == 'table' and contract_ref01_resdata_up0_result.data_get and contract_ref01_resdata_up0_result:data_get() or contract_ref01_resdata_up0_result)
    assert.is_not_nil(contract_ref01_resdata_up0)
    assert.are.equal(contract_ref01_resdata_up0["id"], contract_ref01_data_up0_up["id"])
    assert.are.equal(contract_ref01_resdata_up0[contract_ref01_markdef_up0_name], contract_ref01_markdef_up0_value)

    -- LOAD
    local contract_ref01_match_dt0 = {
      id = contract_ref01_data["id"],
    }
    local contract_ref01_data_dt0_loaded, err = contract_ref01_ent:load(contract_ref01_match_dt0, nil)
    assert.is_nil(err)
    local contract_ref01_data_dt0_load_result = helpers.to_map(type(contract_ref01_data_dt0_loaded) == 'table' and contract_ref01_data_dt0_loaded.data_get and contract_ref01_data_dt0_loaded:data_get() or contract_ref01_data_dt0_loaded)
    assert.is_not_nil(contract_ref01_data_dt0_load_result)
    assert.are.equal(contract_ref01_data_dt0_load_result["id"], contract_ref01_data["id"])

    -- REMOVE
    local contract_ref01_match_rm0 = {
      id = contract_ref01_data["id"],
    }
    local _, err = contract_ref01_ent:remove(contract_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local contract_ref01_match_rt0 = {
      ["artifact_id"] = setup.idmap["artifact01"],
      ["group_id"] = setup.idmap["group01"],
    }

    local contract_ref01_list_rt0_result, err = contract_ref01_ent:list(contract_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(contract_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(contract_ref01_list_rt0_result),
      { id = contract_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function contract_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/contract/ContractTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read contract test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "contract01", "contract02", "contract03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03" },
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
  local entid_env_raw = os.getenv("APICURIO_REGISTRY_TEST_CONTRACT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["APICURIO_REGISTRY_TEST_CONTRACT_ENTID"] = idmap,
    ["APICURIO_REGISTRY_TEST_LIVE"] = "FALSE",
    ["APICURIO_REGISTRY_TEST_EXPLAIN"] = "FALSE",
    ["APICURIO_REGISTRY_SERVER_REGISTRY"] = "MY-REGISTRY-URL",
  })

  local idmap_resolved = helpers.to_map(
    env["APICURIO_REGISTRY_TEST_CONTRACT_ENTID"])
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
