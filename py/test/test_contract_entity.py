# Contract entity test

import json
import os
import time

import pytest

from apicurioregistry_sdk.utility.voxgig_struct import voxgig_struct as vs
from apicurioregistry_sdk import ApicurioRegistrySDK
from apicurioregistry_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestContractEntity:

    def test_should_create_instance(self):
        testsdk = ApicurioRegistrySDK.test(None, None)
        ent = testsdk.Contract(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "contract": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ApicurioRegistrySDK.test(seed, None)
        seen = list(base.Contract(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from apicurioregistry_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ApicurioRegistrySDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Contract(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _contract_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "contract." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set APICURIO_REGISTRY_TEST_CONTRACT_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        contract_ref01_ent = client.Contract(None)
        contract_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.contract"), "contract_ref01"))
        contract_ref01_data["artifact_id"] = setup["idmap"]["artifact01"]
        contract_ref01_data["group_id"] = setup["idmap"]["group01"]

        contract_ref01_data = helpers.to_map(runner.entity_data(contract_ref01_ent.create(contract_ref01_data, None)))
        assert contract_ref01_data is not None
        assert contract_ref01_data["id"] is not None

        # LIST
        contract_ref01_match = {
            "artifact_id": setup["idmap"]["artifact01"],
            "group_id": setup["idmap"]["group01"],
        }

        contract_ref01_list_result = contract_ref01_ent.list(contract_ref01_match, None)
        assert isinstance(contract_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(contract_ref01_list_result),
            {"id": contract_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        contract_ref01_data_up0_up = {
            "id": contract_ref01_data["id"],
            "group_id": setup["idmap"]["group_id"],
        }

        contract_ref01_markdef_up0_name = "artifactId"
        contract_ref01_markdef_up0_value = "Mark01-contract_ref01_" + str(setup["now"])
        contract_ref01_data_up0_up[contract_ref01_markdef_up0_name] = contract_ref01_markdef_up0_value

        contract_ref01_resdata_up0 = helpers.to_map(runner.entity_data(contract_ref01_ent.update(contract_ref01_data_up0_up, None)))
        assert contract_ref01_resdata_up0 is not None
        assert contract_ref01_resdata_up0["id"] == contract_ref01_data_up0_up["id"]
        assert contract_ref01_resdata_up0[contract_ref01_markdef_up0_name] == contract_ref01_markdef_up0_value

        # LOAD
        contract_ref01_match_dt0 = {
            "id": contract_ref01_data["id"],
        }
        contract_ref01_data_dt0_loaded = contract_ref01_ent.load(contract_ref01_match_dt0, None)
        contract_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(contract_ref01_data_dt0_loaded))
        assert contract_ref01_data_dt0_load_result is not None
        assert contract_ref01_data_dt0_load_result["id"] == contract_ref01_data["id"]

        # REMOVE
        contract_ref01_match_rm0 = {
            "id": contract_ref01_data["id"],
        }
        contract_ref01_ent.remove(contract_ref01_match_rm0, None)

        # LIST
        contract_ref01_match_rt0 = {
            "artifact_id": setup["idmap"]["artifact01"],
            "group_id": setup["idmap"]["group01"],
        }

        contract_ref01_list_rt0_result = contract_ref01_ent.list(contract_ref01_match_rt0, None)
        assert isinstance(contract_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(contract_ref01_list_rt0_result),
            {"id": contract_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _contract_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/contract/ContractTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ApicurioRegistrySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["contract01", "contract02", "contract03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03"],
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
        "APICURIO_REGISTRY_TEST_CONTRACT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "APICURIO_REGISTRY_TEST_CONTRACT_ENTID": idmap,
        "APICURIO_REGISTRY_TEST_LIVE": "FALSE",
        "APICURIO_REGISTRY_TEST_EXPLAIN": "FALSE",
        "APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
    })

    idmap_resolved = helpers.to_map(
        env.get("APICURIO_REGISTRY_TEST_CONTRACT_ENTID"))
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
