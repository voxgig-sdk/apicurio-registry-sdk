# Metadata entity test

require "minitest/autorun"
require "json"
require_relative "../ApicurioRegistry_sdk"
require_relative "runner"

class MetadataEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ApicurioRegistrySDK.test(nil, nil)
    ent = testsdk.Metadata(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = metadata_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "metadata." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_METADATA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    metadata_ref01_ent = client.Metadata(nil)
    metadata_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.metadata"), "metadata_ref01"))
    metadata_ref01_data["artifact_id"] = setup[:idmap]["artifact01"]
    metadata_ref01_data["group_id"] = setup[:idmap]["group01"]
    metadata_ref01_data["version_expression"] = setup[:idmap]["version_expression01"]

    metadata_ref01_data_result = metadata_ref01_ent.create(metadata_ref01_data, nil)
    metadata_ref01_data = Helpers.to_map(metadata_ref01_data_result.respond_to?(:data_get) ? metadata_ref01_data_result.data_get : metadata_ref01_data_result)
    assert !metadata_ref01_data.nil?

    # UPDATE
    metadata_ref01_data_up0_up = {
      "group_id" => setup[:idmap]["group_id"],
    }

    metadata_ref01_markdef_up0_name = "artifactId"
    metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_#{setup[:now]}"
    metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

    metadata_ref01_resdata_up0_result = metadata_ref01_ent.update(metadata_ref01_data_up0_up, nil)
    metadata_ref01_resdata_up0 = Helpers.to_map(metadata_ref01_resdata_up0_result.respond_to?(:data_get) ? metadata_ref01_resdata_up0_result.data_get : metadata_ref01_resdata_up0_result)
    assert !metadata_ref01_resdata_up0.nil?
    assert_equal metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name], metadata_ref01_markdef_up0_value

    # LOAD
    metadata_ref01_match_dt0 = {}
    metadata_ref01_data_dt0_loaded = metadata_ref01_ent.load(metadata_ref01_match_dt0, nil)
    assert !metadata_ref01_data_dt0_loaded.nil?

  end
end

def metadata_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "metadata", "MetadataTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ApicurioRegistrySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["metadata01", "metadata02", "metadata03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03", "version_expression01"],
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
  entid_env_raw = ENV["APICURIO_REGISTRY_TEST_METADATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APICURIO_REGISTRY_TEST_METADATA_ENTID" => idmap,
    "APICURIO_REGISTRY_TEST_LIVE" => "FALSE",
    "APICURIO_REGISTRY_TEST_EXPLAIN" => "FALSE",
    "APICURIO_REGISTRY_SERVER_REGISTRY" => "MY-REGISTRY-URL",
  })

  idmap_resolved = Helpers.to_map(
    env["APICURIO_REGISTRY_TEST_METADATA_ENTID"])
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
