# WellKnown entity test

import json
import os
import time

import pytest

from apicurioregistry_sdk.utility.voxgig_struct import voxgig_struct as vs
from apicurioregistry_sdk import ApicurioRegistrySDK
from apicurioregistry_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestWellKnownEntity:

    def test_should_create_instance(self):
        testsdk = ApicurioRegistrySDK.test(None, None)
        ent = testsdk.WellKnown(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "well_known": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ApicurioRegistrySDK.test(seed, None)
        seen = list(base.WellKnown(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from apicurioregistry_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ApicurioRegistrySDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.WellKnown(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _well_known_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "well_known." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        well_known_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.well_known")))
        well_known_ref01_data = None
        if len(well_known_ref01_data_raw) > 0:
            well_known_ref01_data = helpers.to_map(well_known_ref01_data_raw[0][1])

        # LIST
        well_known_ref01_ent = client.WellKnown(None)
        well_known_ref01_match = {}

        well_known_ref01_list_result = well_known_ref01_ent.list(well_known_ref01_match, None)
        assert isinstance(well_known_ref01_list_result, list)

        # LOAD
        well_known_ref01_match_dt0 = {
            "id": well_known_ref01_data["id"],
        }
        well_known_ref01_data_dt0_loaded = well_known_ref01_ent.load(well_known_ref01_match_dt0, None)
        well_known_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(well_known_ref01_data_dt0_loaded))
        assert well_known_ref01_data_dt0_load_result is not None
        assert well_known_ref01_data_dt0_load_result["id"] == well_known_ref01_data["id"]



def _well_known_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/well_known/WellKnownTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ApicurioRegistrySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["well_known01", "well_known02", "well_known03", "agent01", "agent02", "agent03", "schema_type01"],
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
        "APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID": idmap,
        "APICURIO_REGISTRY_TEST_LIVE": "FALSE",
        "APICURIO_REGISTRY_TEST_EXPLAIN": "FALSE",
        "APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
    })

    idmap_resolved = helpers.to_map(
        env.get("APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

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
