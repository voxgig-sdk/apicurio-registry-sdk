package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestContractEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Contract(nil)
		if ent == nil {
			t.Fatal("expected non-nil ContractEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"contract": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Contract(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Contract(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := contractBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "contract." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_CONTRACT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		contractRef01Ent := client.Contract(nil)
		contractRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "contract"}), "contract_ref01"))
		contractRef01Data["artifact_id"] = setup.idmap["artifact01"]
		contractRef01Data["group_id"] = setup.idmap["group01"]

		contractRef01DataResult, err := contractRef01Ent.Create(contractRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		contractRef01Data = core.ToMapAny(entityData(contractRef01DataResult))
		if contractRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if contractRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		contractRef01Match := map[string]any{
			"artifact_id": setup.idmap["artifact01"],
			"group_id": setup.idmap["group01"],
		}

		contractRef01ListResult, err := contractRef01Ent.List(contractRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		contractRef01List, contractRef01ListOk := contractRef01ListResult.([]any)
		if !contractRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", contractRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(contractRef01List), map[string]any{"id": contractRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		contractRef01DataUp0Up := map[string]any{
			"id": contractRef01Data["id"],
			"group_id": setup.idmap["group_id"],
		}

		contractRef01MarkdefUp0Name := "artifactId"
		contractRef01MarkdefUp0Value := fmt.Sprintf("Mark01-contract_ref01_%d", setup.now)
		contractRef01DataUp0Up[contractRef01MarkdefUp0Name] = contractRef01MarkdefUp0Value

		contractRef01ResdataUp0Result, err := contractRef01Ent.Update(contractRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		contractRef01ResdataUp0 := core.ToMapAny(entityData(contractRef01ResdataUp0Result))
		if contractRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if contractRef01ResdataUp0["id"] != contractRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if contractRef01ResdataUp0[contractRef01MarkdefUp0Name] != contractRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", contractRef01MarkdefUp0Name, contractRef01ResdataUp0[contractRef01MarkdefUp0Name])
		}

		// LOAD
		contractRef01MatchDt0 := map[string]any{
			"id": contractRef01Data["id"],
		}
		contractRef01DataDt0Loaded, err := contractRef01Ent.Load(contractRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		contractRef01DataDt0LoadResult := core.ToMapAny(entityData(contractRef01DataDt0Loaded))
		if contractRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if contractRef01DataDt0LoadResult["id"] != contractRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		contractRef01MatchRm0 := map[string]any{
			"id": contractRef01Data["id"],
		}
		_, err = contractRef01Ent.Remove(contractRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		contractRef01MatchRt0 := map[string]any{
			"artifact_id": setup.idmap["artifact01"],
			"group_id": setup.idmap["group01"],
		}

		contractRef01ListRt0Result, err := contractRef01Ent.List(contractRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		contractRef01ListRt0, contractRef01ListRt0Ok := contractRef01ListRt0Result.([]any)
		if !contractRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", contractRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(contractRef01ListRt0), map[string]any{"id": contractRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func contractBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "contract", "ContractTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read contract test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse contract test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"contract01", "contract02", "contract03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03"},
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
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_CONTRACT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_CONTRACT_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_CONTRACT_ENTID"])
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
