# Metadata entity test

import json
import os
import time

import pytest

from apicurioregistry_sdk.utility.voxgig_struct import voxgig_struct as vs
from apicurioregistry_sdk import ApicurioRegistrySDK
from apicurioregistry_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestMetadataEntity:

    def test_should_create_instance(self):
        testsdk = ApicurioRegistrySDK.test(None, None)
        ent = testsdk.Metadata(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _metadata_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "metadata." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set APICURIO_REGISTRY_TEST_METADATA_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        metadata_ref01_ent = client.Metadata(None)
        metadata_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.metadata"), "metadata_ref01"))
        metadata_ref01_data["artifact_id"] = setup["idmap"]["artifact01"]
        metadata_ref01_data["group_id"] = setup["idmap"]["group01"]
        metadata_ref01_data["version_expression"] = setup["idmap"]["version_expression01"]

        metadata_ref01_data = helpers.to_map(runner.entity_data(metadata_ref01_ent.create(metadata_ref01_data, None)))
        assert metadata_ref01_data is not None

        # UPDATE
        metadata_ref01_data_up0_up = {
            "group_id": setup["idmap"]["group_id"],
        }

        metadata_ref01_markdef_up0_name = "artifactId"
        metadata_ref01_markdef_up0_value = "Mark01-metadata_ref01_" + str(setup["now"])
        metadata_ref01_data_up0_up[metadata_ref01_markdef_up0_name] = metadata_ref01_markdef_up0_value

        metadata_ref01_resdata_up0 = helpers.to_map(runner.entity_data(metadata_ref01_ent.update(metadata_ref01_data_up0_up, None)))
        assert metadata_ref01_resdata_up0 is not None
        assert metadata_ref01_resdata_up0[metadata_ref01_markdef_up0_name] == metadata_ref01_markdef_up0_value

        # LOAD
        metadata_ref01_match_dt0 = {}
        metadata_ref01_data_dt0_loaded = metadata_ref01_ent.load(metadata_ref01_match_dt0, None)
        assert metadata_ref01_data_dt0_loaded is not None



def _metadata_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/metadata/MetadataTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ApicurioRegistrySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["metadata01", "metadata02", "metadata03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03", "version_expression01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "APICURIO_REGISTRY_TEST_METADATA_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "APICURIO_REGISTRY_TEST_METADATA_ENTID": idmap,
        "APICURIO_REGISTRY_TEST_LIVE": "FALSE",
        "APICURIO_REGISTRY_TEST_EXPLAIN": "FALSE",
        "APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
    })

    idmap_resolved = helpers.to_map(
        env.get("APICURIO_REGISTRY_TEST_METADATA_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("group_id") is None:
        idmap_resolved["group_id"] = idmap_resolved.get("group01")

    if env.get("APICURIO_REGISTRY_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "server": {
                    "registry": env.get("APICURIO_REGISTRY_SERVER_REGISTRY"),
                },
            },
            extra or {},
        ])
        client = ApicurioRegistrySDK(helpers.to_map(merged_opts))

    _live = env.get("APICURIO_REGISTRY_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("APICURIO_REGISTRY_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
