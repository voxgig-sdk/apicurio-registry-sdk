# Contract entity test

require "minitest/autorun"
require "json"
require_relative "../ApicurioRegistry_sdk"
require_relative "runner"

class ContractEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ApicurioRegistrySDK.test(nil, nil)
    ent = testsdk.Contract(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "contract" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ApicurioRegistrySDK.test(seed, nil)
    seen = base.Contract(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ApicurioRegistryConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ApicurioRegistrySDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Contract(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = contract_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "contract." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_CONTRACT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    contract_ref01_ent = client.Contract(nil)
    contract_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.contract"), "contract_ref01"))
    contract_ref01_data["artifact_id"] = setup[:idmap]["artifact01"]
    contract_ref01_data["group_id"] = setup[:idmap]["group01"]

    contract_ref01_data_result = contract_ref01_ent.create(contract_ref01_data, nil)
    contract_ref01_data = Helpers.to_map(contract_ref01_data_result.respond_to?(:data_get) ? contract_ref01_data_result.data_get : contract_ref01_data_result)
    assert !contract_ref01_data.nil?
    assert !contract_ref01_data["id"].nil?

    # LIST
    contract_ref01_match = {
      "artifact_id" => setup[:idmap]["artifact01"],
      "group_id" => setup[:idmap]["group01"],
    }

    contract_ref01_list_result = contract_ref01_ent.list(contract_ref01_match, nil)
    assert contract_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(contract_ref01_list_result),
      { "id" => contract_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    contract_ref01_data_up0_up = {
      "id" => contract_ref01_data["id"],
      "group_id" => setup[:idmap]["group_id"],
    }

    contract_ref01_markdef_up0_name = "artifactId"
    contract_ref01_markdef_up0_value = "Mark01-contract_ref01_#{setup[:now]}"
    contract_ref01_data_up0_up[contract_ref01_markdef_up0_name] = contract_ref01_markdef_up0_value

    contract_ref01_resdata_up0_result = contract_ref01_ent.update(contract_ref01_data_up0_up, nil)
    contract_ref01_resdata_up0 = Helpers.to_map(contract_ref01_resdata_up0_result.respond_to?(:data_get) ? contract_ref01_resdata_up0_result.data_get : contract_ref01_resdata_up0_result)
    assert !contract_ref01_resdata_up0.nil?
    assert_equal contract_ref01_resdata_up0["id"], contract_ref01_data_up0_up["id"]
    assert_equal contract_ref01_resdata_up0[contract_ref01_markdef_up0_name], contract_ref01_markdef_up0_value

    # LOAD
    contract_ref01_match_dt0 = {
      "id" => contract_ref01_data["id"],
    }
    contract_ref01_data_dt0_loaded = contract_ref01_ent.load(contract_ref01_match_dt0, nil)
    contract_ref01_data_dt0_load_result = Helpers.to_map(contract_ref01_data_dt0_loaded.respond_to?(:data_get) ? contract_ref01_data_dt0_loaded.data_get : contract_ref01_data_dt0_loaded)
    assert !contract_ref01_data_dt0_load_result.nil?
    assert_equal contract_ref01_data_dt0_load_result["id"], contract_ref01_data["id"]

    # REMOVE
    contract_ref01_match_rm0 = {
      "id" => contract_ref01_data["id"],
    }
    contract_ref01_ent.remove(contract_ref01_match_rm0, nil)

    # LIST
    contract_ref01_match_rt0 = {
      "artifact_id" => setup[:idmap]["artifact01"],
      "group_id" => setup[:idmap]["group01"],
    }

    contract_ref01_list_rt0_result = contract_ref01_ent.list(contract_ref01_match_rt0, nil)
    assert contract_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(contract_ref01_list_rt0_result),
      { "id" => contract_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def contract_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "contract", "ContractTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ApicurioRegistrySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["contract01", "contract02", "contract03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03"],
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
  entid_env_raw = ENV["APICURIO_REGISTRY_TEST_CONTRACT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APICURIO_REGISTRY_TEST_CONTRACT_ENTID" => idmap,
    "APICURIO_REGISTRY_TEST_LIVE" => "FALSE",
    "APICURIO_REGISTRY_TEST_EXPLAIN" => "FALSE",
    "APICURIO_REGISTRY_SERVER_REGISTRY" => "MY-REGISTRY-URL",
  })

  idmap_resolved = Helpers.to_map(
    env["APICURIO_REGISTRY_TEST_CONTRACT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
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
