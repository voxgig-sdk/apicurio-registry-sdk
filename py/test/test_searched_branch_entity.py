# SearchedBranch entity test

import json
import os
import time

import pytest

from apicurioregistry_sdk.utility.voxgig_struct import voxgig_struct as vs
from apicurioregistry_sdk import ApicurioRegistrySDK
from apicurioregistry_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestSearchedBranchEntity:

    def test_should_create_instance(self):
        testsdk = ApicurioRegistrySDK.test(None, None)
        ent = testsdk.SearchedBranch(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "searched_branch": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ApicurioRegistrySDK.test(seed, None)
        seen = list(base.SearchedBranch(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from apicurioregistry_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ApicurioRegistrySDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.SearchedBranch(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _searched_branch_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "searched_branch." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        searched_branch_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.searched_branch")))
        searched_branch_ref01_data = None
        if len(searched_branch_ref01_data_raw) > 0:
            searched_branch_ref01_data = helpers.to_map(searched_branch_ref01_data_raw[0][1])

        # LIST
        searched_branch_ref01_ent = client.SearchedBranch(None)
        searched_branch_ref01_match = {
            "artifact_id": setup["idmap"]["artifact01"],
            "group_id": setup["idmap"]["group01"],
        }

        searched_branch_ref01_list_result = searched_branch_ref01_ent.list(searched_branch_ref01_match, None)
        assert isinstance(searched_branch_ref01_list_result, list)



def _searched_branch_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/searched_branch/SearchedBranchTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ApicurioRegistrySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["searched_branch01", "searched_branch02", "searched_branch03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03"],
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
        "APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID": idmap,
        "APICURIO_REGISTRY_TEST_LIVE": "FALSE",
        "APICURIO_REGISTRY_TEST_EXPLAIN": "FALSE",
        "APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
    })

    idmap_resolved = helpers.to_map(
        env.get("APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID"))
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
