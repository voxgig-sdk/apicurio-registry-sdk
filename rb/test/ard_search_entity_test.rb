# ArdSearch entity test

require "minitest/autorun"
require "json"
require_relative "../ApicurioRegistry_sdk"
require_relative "runner"

class ArdSearchEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ApicurioRegistrySDK.test(nil, nil)
    ent = testsdk.ArdSearch(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ard_search_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ard_search." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    ard_search_ref01_ent = client.ArdSearch(nil)
    ard_search_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.ard_search"), "ard_search_ref01"))

    ard_search_ref01_data_result = ard_search_ref01_ent.create(ard_search_ref01_data, nil)
    ard_search_ref01_data = Helpers.to_map(ard_search_ref01_data_result.respond_to?(:data_get) ? ard_search_ref01_data_result.data_get : ard_search_ref01_data_result)
    assert !ard_search_ref01_data.nil?

  end
end

def ard_search_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ard_search", "ArdSearchTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ApicurioRegistrySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ard_search01", "ard_search02", "ard_search03"],
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
  entid_env_raw = ENV["APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID" => idmap,
    "APICURIO_REGISTRY_TEST_LIVE" => "FALSE",
    "APICURIO_REGISTRY_TEST_EXPLAIN" => "FALSE",
    "APICURIO_REGISTRY_SERVER_REGISTRY" => "MY-REGISTRY-URL",
  })

  idmap_resolved = Helpers.to_map(
    env["APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID"])
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
