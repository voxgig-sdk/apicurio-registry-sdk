# OdcsContractResult entity test

import json
import os
import time

import pytest

from apicurioregistry_sdk.utility.voxgig_struct import voxgig_struct as vs
from apicurioregistry_sdk import ApicurioRegistrySDK
from apicurioregistry_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestOdcsContractResultEntity:

    def test_should_create_instance(self):
        testsdk = ApicurioRegistrySDK.test(None, None)
        ent = testsdk.OdcsContractResult(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _odcs_contract_result_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "odcs_contract_result." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        odcs_contract_result_ref01_ent = client.OdcsContractResult(None)
        odcs_contract_result_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.odcs_contract_result"), "odcs_contract_result_ref01"))
        odcs_contract_result_ref01_data["group_id"] = setup["idmap"]["group01"]

        odcs_contract_result_ref01_data = helpers.to_map(runner.entity_data(odcs_contract_result_ref01_ent.create(odcs_contract_result_ref01_data, None)))
        assert odcs_contract_result_ref01_data is not None

        # UPDATE
        odcs_contract_result_ref01_data_up0_up = {
            "group_id": setup["idmap"]["group_id"],
        }

        odcs_contract_result_ref01_resdata_up0 = helpers.to_map(runner.entity_data(odcs_contract_result_ref01_ent.update(odcs_contract_result_ref01_data_up0_up, None)))
        assert odcs_contract_result_ref01_resdata_up0 is not None



def _odcs_contract_result_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/odcs_contract_result/OdcsContractResultTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ApicurioRegistrySDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["odcs_contract_result01", "odcs_contract_result02", "odcs_contract_result03", "group01", "group02", "group03", "contract01", "contract02", "contract03"],
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
        "APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID": idmap,
        "APICURIO_REGISTRY_TEST_LIVE": "FALSE",
        "APICURIO_REGISTRY_TEST_EXPLAIN": "FALSE",
        "APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
    })

    idmap_resolved = helpers.to_map(
        env.get("APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID"))
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
