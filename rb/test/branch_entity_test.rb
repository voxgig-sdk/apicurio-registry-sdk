# Branch entity test

require "minitest/autorun"
require "json"
require_relative "../ApicurioRegistry_sdk"
require_relative "runner"

class BranchEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ApicurioRegistrySDK.test(nil, nil)
    ent = testsdk.Branch(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = branch_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "branch." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_BRANCH_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    branch_ref01_ent = client.Branch(nil)
    branch_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.branch"), "branch_ref01"))
    branch_ref01_data["artifact_id"] = setup[:idmap]["artifact01"]
    branch_ref01_data["group_id"] = setup[:idmap]["group01"]

    branch_ref01_data_result = branch_ref01_ent.create(branch_ref01_data, nil)
    branch_ref01_data = Helpers.to_map(branch_ref01_data_result.respond_to?(:data_get) ? branch_ref01_data_result.data_get : branch_ref01_data_result)
    assert !branch_ref01_data.nil?
    assert !branch_ref01_data["id"].nil?

    # UPDATE
    branch_ref01_data_up0_up = {
      "id" => branch_ref01_data["id"],
      "artifact_id" => setup[:idmap]["artifact_id"],
      "group_id" => setup[:idmap]["group_id"],
    }

    branch_ref01_markdef_up0_name = "artifactId"
    branch_ref01_markdef_up0_value = "Mark01-branch_ref01_#{setup[:now]}"
    branch_ref01_data_up0_up[branch_ref01_markdef_up0_name] = branch_ref01_markdef_up0_value

    branch_ref01_resdata_up0_result = branch_ref01_ent.update(branch_ref01_data_up0_up, nil)
    branch_ref01_resdata_up0 = Helpers.to_map(branch_ref01_resdata_up0_result.respond_to?(:data_get) ? branch_ref01_resdata_up0_result.data_get : branch_ref01_resdata_up0_result)
    assert !branch_ref01_resdata_up0.nil?
    assert_equal branch_ref01_resdata_up0["id"], branch_ref01_data_up0_up["id"]
    assert_equal branch_ref01_resdata_up0[branch_ref01_markdef_up0_name], branch_ref01_markdef_up0_value

    # LOAD
    branch_ref01_match_dt0 = {
      "id" => branch_ref01_data["id"],
    }
    branch_ref01_data_dt0_loaded = branch_ref01_ent.load(branch_ref01_match_dt0, nil)
    branch_ref01_data_dt0_load_result = Helpers.to_map(branch_ref01_data_dt0_loaded.respond_to?(:data_get) ? branch_ref01_data_dt0_loaded.data_get : branch_ref01_data_dt0_loaded)
    assert !branch_ref01_data_dt0_load_result.nil?
    assert_equal branch_ref01_data_dt0_load_result["id"], branch_ref01_data["id"]

    # REMOVE
    branch_ref01_match_rm0 = {
      "id" => branch_ref01_data["id"],
    }
    branch_ref01_ent.remove(branch_ref01_match_rm0, nil)

  end
end

def branch_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "branch", "BranchTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ApicurioRegistrySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["branch01", "branch02", "branch03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["APICURIO_REGISTRY_TEST_BRANCH_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APICURIO_REGISTRY_TEST_BRANCH_ENTID" => idmap,
    "APICURIO_REGISTRY_TEST_LIVE" => "FALSE",
    "APICURIO_REGISTRY_TEST_EXPLAIN" => "FALSE",
    "APICURIO_REGISTRY_SERVER_REGISTRY" => "MY-REGISTRY-URL",
  })

  idmap_resolved = Helpers.to_map(
    env["APICURIO_REGISTRY_TEST_BRANCH_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["artifact_id"].nil?
    idmap_resolved["artifact_id"] = idmap_resolved["artifact01"]
  end
  if idmap_resolved["group_id"].nil?
    idmap_resolved["group_id"] = idmap_resolved["group01"]
  end

  if env["APICURIO_REGISTRY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "server" => {
          "registry" => env["APICURIO_REGISTRY_SERVER_REGISTRY"],
        },
      },
      extra || {},
    ])
    client = ApicurioRegistrySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["APICURIO_REGISTRY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["APICURIO_REGISTRY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
