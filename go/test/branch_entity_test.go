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

func TestBranchEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Branch(nil)
		if ent == nil {
			t.Fatal("expected non-nil BranchEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := branchBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "branch." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_BRANCH_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		branchRef01Ent := client.Branch(nil)
		branchRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "branch"}), "branch_ref01"))
		branchRef01Data["artifact_id"] = setup.idmap["artifact01"]
		branchRef01Data["group_id"] = setup.idmap["group01"]

		branchRef01DataResult, err := branchRef01Ent.Create(branchRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		branchRef01Data = core.ToMapAny(entityData(branchRef01DataResult))
		if branchRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if branchRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		branchRef01DataUp0Up := map[string]any{
			"id": branchRef01Data["id"],
			"artifact_id": setup.idmap["artifact_id"],
			"group_id": setup.idmap["group_id"],
		}

		branchRef01MarkdefUp0Name := "artifactId"
		branchRef01MarkdefUp0Value := fmt.Sprintf("Mark01-branch_ref01_%d", setup.now)
		branchRef01DataUp0Up[branchRef01MarkdefUp0Name] = branchRef01MarkdefUp0Value

		branchRef01ResdataUp0Result, err := branchRef01Ent.Update(branchRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		branchRef01ResdataUp0 := core.ToMapAny(entityData(branchRef01ResdataUp0Result))
		if branchRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if branchRef01ResdataUp0["id"] != branchRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if branchRef01ResdataUp0[branchRef01MarkdefUp0Name] != branchRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", branchRef01MarkdefUp0Name, branchRef01ResdataUp0[branchRef01MarkdefUp0Name])
		}

		// LOAD
		branchRef01MatchDt0 := map[string]any{
			"id": branchRef01Data["id"],
		}
		branchRef01DataDt0Loaded, err := branchRef01Ent.Load(branchRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		branchRef01DataDt0LoadResult := core.ToMapAny(entityData(branchRef01DataDt0Loaded))
		if branchRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if branchRef01DataDt0LoadResult["id"] != branchRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		branchRef01MatchRm0 := map[string]any{
			"id": branchRef01Data["id"],
		}
		_, err = branchRef01Ent.Remove(branchRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func branchBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "branch", "BranchTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read branch test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse branch test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"branch01", "branch02", "branch03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03"},
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
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_BRANCH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_BRANCH_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_BRANCH_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add artifact_id alias for update test.
	if idmapResolved["artifact_id"] == nil {
		idmapResolved["artifact_id"] = idmapResolved["artifact01"]
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
