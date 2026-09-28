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

func TestVersionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Version(nil)
		if ent == nil {
			t.Fatal("expected non-nil VersionEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"version": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Version(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Version(nil).Stream("list", nil, nil) {
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
		setup := versionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "version." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_VERSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		versionRef01Ent := client.Version(nil)
		versionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "version"}), "version_ref01"))
		versionRef01Data["artifact_id"] = setup.idmap["artifact01"]
		versionRef01Data["branch_id"] = setup.idmap["branch01"]
		versionRef01Data["group_id"] = setup.idmap["group01"]
		versionRef01Data["version_id"] = setup.idmap["version01"]

		versionRef01DataResult, err := versionRef01Ent.Create(versionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		versionRef01Data = core.ToMapAny(entityData(versionRef01DataResult))
		if versionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if versionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		versionRef01Match := map[string]any{
			"artifact_id": setup.idmap["artifact01"],
			"branch_id": setup.idmap["branch01"],
			"group_id": setup.idmap["group01"],
		}

		versionRef01ListResult, err := versionRef01Ent.List(versionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		versionRef01List, versionRef01ListOk := versionRef01ListResult.([]any)
		if !versionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", versionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(versionRef01List), map[string]any{"id": versionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		versionRef01DataUp0Up := map[string]any{
			"id": versionRef01Data["id"],
			"artifact_id": setup.idmap["artifact_id"],
			"group_id": setup.idmap["group_id"],
			"version_id": setup.idmap["version_id"],
		}

		versionRef01MarkdefUp0Name := "artifactId"
		versionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-version_ref01_%d", setup.now)
		versionRef01DataUp0Up[versionRef01MarkdefUp0Name] = versionRef01MarkdefUp0Value

		versionRef01ResdataUp0Result, err := versionRef01Ent.Update(versionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		versionRef01ResdataUp0 := core.ToMapAny(entityData(versionRef01ResdataUp0Result))
		if versionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if versionRef01ResdataUp0["id"] != versionRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if versionRef01ResdataUp0[versionRef01MarkdefUp0Name] != versionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", versionRef01MarkdefUp0Name, versionRef01ResdataUp0[versionRef01MarkdefUp0Name])
		}

		// LOAD
		versionRef01MatchDt0 := map[string]any{
			"id": versionRef01Data["id"],
		}
		versionRef01DataDt0Loaded, err := versionRef01Ent.Load(versionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		versionRef01DataDt0LoadResult := core.ToMapAny(entityData(versionRef01DataDt0Loaded))
		if versionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if versionRef01DataDt0LoadResult["id"] != versionRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		versionRef01MatchRm0 := map[string]any{
			"id": versionRef01Data["id"],
		}
		_, err = versionRef01Ent.Remove(versionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		versionRef01MatchRt0 := map[string]any{
			"artifact_id": setup.idmap["artifact01"],
			"branch_id": setup.idmap["branch01"],
			"group_id": setup.idmap["group01"],
		}

		versionRef01ListRt0Result, err := versionRef01Ent.List(versionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		versionRef01ListRt0, versionRef01ListRt0Ok := versionRef01ListRt0Result.([]any)
		if !versionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", versionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(versionRef01ListRt0), map[string]any{"id": versionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func versionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "version", "VersionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read version test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse version test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"version01", "version02", "version03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "branch01", "branch02", "branch03", "comment01", "comment02", "comment03"},
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
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_VERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_VERSION_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_VERSION_ENTID"])
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
	// Add version_id alias for update test.
	if idmapResolved["version_id"] == nil {
		idmapResolved["version_id"] = idmapResolved["version01"]
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
