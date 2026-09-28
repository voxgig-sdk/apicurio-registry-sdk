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

func TestMetadataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Metadata(nil)
		if ent == nil {
			t.Fatal("expected non-nil MetadataEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := metadataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "metadata." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_METADATA_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		metadataRef01Ent := client.Metadata(nil)
		metadataRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "metadata"}), "metadata_ref01"))
		metadataRef01Data["artifact_id"] = setup.idmap["artifact01"]
		metadataRef01Data["group_id"] = setup.idmap["group01"]
		metadataRef01Data["version_expression"] = setup.idmap["version_expression01"]

		metadataRef01DataResult, err := metadataRef01Ent.Create(metadataRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		metadataRef01Data = core.ToMapAny(entityData(metadataRef01DataResult))
		if metadataRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// UPDATE
		metadataRef01DataUp0Up := map[string]any{
			"group_id": setup.idmap["group_id"],
		}

		metadataRef01MarkdefUp0Name := "artifactId"
		metadataRef01MarkdefUp0Value := fmt.Sprintf("Mark01-metadata_ref01_%d", setup.now)
		metadataRef01DataUp0Up[metadataRef01MarkdefUp0Name] = metadataRef01MarkdefUp0Value

		metadataRef01ResdataUp0Result, err := metadataRef01Ent.Update(metadataRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		metadataRef01ResdataUp0 := core.ToMapAny(entityData(metadataRef01ResdataUp0Result))
		if metadataRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if metadataRef01ResdataUp0[metadataRef01MarkdefUp0Name] != metadataRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", metadataRef01MarkdefUp0Name, metadataRef01ResdataUp0[metadataRef01MarkdefUp0Name])
		}

		// LOAD
		metadataRef01MatchDt0 := map[string]any{}
		metadataRef01DataDt0Loaded, err := metadataRef01Ent.Load(metadataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if metadataRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func metadataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "metadata", "MetadataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read metadata test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse metadata test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"metadata01", "metadata02", "metadata03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03", "version01", "version02", "version03", "version_expression01"},
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
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_METADATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_METADATA_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_METADATA_ENTID"])
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
