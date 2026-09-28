package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/apicurio-registry-sdk/go"
	"github.com/voxgig-sdk/apicurio-registry-sdk/go/core"

	vs "github.com/voxgig-sdk/apicurio-registry-sdk/go/utility/struct"
)

func TestOdcsContractResultEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OdcsContractResult(nil)
		if ent == nil {
			t.Fatal("expected non-nil OdcsContractResultEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := odcs_contract_resultBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "odcs_contract_result." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		odcsContractResultRef01Ent := client.OdcsContractResult(nil)
		odcsContractResultRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "odcs_contract_result"}), "odcs_contract_result_ref01"))
		odcsContractResultRef01Data["group_id"] = setup.idmap["group01"]

		odcsContractResultRef01DataResult, err := odcsContractResultRef01Ent.Create(odcsContractResultRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		odcsContractResultRef01Data = core.ToMapAny(entityData(odcsContractResultRef01DataResult))
		if odcsContractResultRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// UPDATE
		odcsContractResultRef01DataUp0Up := map[string]any{
			"group_id": setup.idmap["group_id"],
		}

		odcsContractResultRef01ResdataUp0Result, err := odcsContractResultRef01Ent.Update(odcsContractResultRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		odcsContractResultRef01ResdataUp0 := core.ToMapAny(entityData(odcsContractResultRef01ResdataUp0Result))
		if odcsContractResultRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}

	})
}

func odcs_contract_resultBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "odcs_contract_result", "OdcsContractResultTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read odcs_contract_result test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse odcs_contract_result test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"odcs_contract_result01", "odcs_contract_result02", "odcs_contract_result03", "group01", "group02", "group03", "contract01", "contract02", "contract03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add group_id alias for update test.
	if idmapResolved["group_id"] == nil {
		idmapResolved["group_id"] = idmapResolved["group01"]
	}

	if env["APICURIO_REGISTRY_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"server": map[string]any{
					"registry": env["APICURIO_REGISTRY_SERVER_REGISTRY"],
				},
			},
			extraOpts,
		})
		client = sdk.NewApicurioRegistrySDK(core.ToMapAny(mergedOpts))
	}

	live := env["APICURIO_REGISTRY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["APICURIO_REGISTRY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
