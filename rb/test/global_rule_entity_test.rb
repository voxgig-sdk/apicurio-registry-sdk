# GlobalRule entity test

require "minitest/autorun"
require "json"
require_relative "../ApicurioRegistry_sdk"
require_relative "runner"

class GlobalRuleEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ApicurioRegistrySDK.test(nil, nil)
    ent = testsdk.GlobalRule(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "global_rule" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ApicurioRegistrySDK.test(seed, nil)
    seen = base.GlobalRule(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ApicurioRegistryConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ApicurioRegistrySDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.GlobalRule(nil).stream("list", nil, nil).each do |item|
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
    setup = global_rule_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "global_rule." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    global_rule_ref01_ent = client.GlobalRule(nil)
    global_rule_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.global_rule"), "global_rule_ref01"))

    global_rule_ref01_data_result = global_rule_ref01_ent.create(global_rule_ref01_data, nil)
    global_rule_ref01_data = Helpers.to_map(global_rule_ref01_data_result.respond_to?(:data_get) ? global_rule_ref01_data_result.data_get : global_rule_ref01_data_result)
    assert !global_rule_ref01_data.nil?
    assert !global_rule_ref01_data["id"].nil?

    # LIST
    global_rule_ref01_match = {}

    global_rule_ref01_list_result = global_rule_ref01_ent.list(global_rule_ref01_match, nil)
    assert global_rule_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(global_rule_ref01_list_result),
      { "id" => global_rule_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # REMOVE
    global_rule_ref01_match_rm0 = {
      "id" => global_rule_ref01_data["id"],
    }
    global_rule_ref01_ent.remove(global_rule_ref01_match_rm0, nil)

    # LIST
    global_rule_ref01_match_rt0 = {}

    global_rule_ref01_list_rt0_result = global_rule_ref01_ent.list(global_rule_ref01_match_rt0, nil)
    assert global_rule_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(global_rule_ref01_list_rt0_result),
      { "id" => global_rule_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def global_rule_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "global_rule", "GlobalRuleTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ApicurioRegistrySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["global_rule01", "global_rule02", "global_rule03"],
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
  entid_env_raw = ENV["APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID" => idmap,
    "APICURIO_REGISTRY_TEST_LIVE" => "FALSE",
    "APICURIO_REGISTRY_TEST_EXPLAIN" => "FALSE",
    "APICURIO_REGISTRY_SERVER_REGISTRY" => "MY-REGISTRY-URL",
  })

  idmap_resolved = Helpers.to_map(
    env["APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
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
