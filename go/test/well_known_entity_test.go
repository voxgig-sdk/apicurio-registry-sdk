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

func TestWellKnownEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WellKnown(nil)
		if ent == nil {
			t.Fatal("expected non-nil WellKnownEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := well_knownBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "well_known." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		wellKnownRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.well_known")))
		var wellKnownRef01Data map[string]any
		if len(wellKnownRef01DataRaw) > 0 {
			wellKnownRef01Data = core.ToMapAny(wellKnownRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = wellKnownRef01Data

		// LOAD
		wellKnownRef01Ent := client.WellKnown(nil)
		wellKnownRef01MatchDt0 := map[string]any{
			"id": wellKnownRef01Data["id"],
		}
		wellKnownRef01DataDt0Loaded, err := wellKnownRef01Ent.Load(wellKnownRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		wellKnownRef01DataDt0LoadResult := core.ToMapAny(entityData(wellKnownRef01DataDt0Loaded))
		if wellKnownRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if wellKnownRef01DataDt0LoadResult["id"] != wellKnownRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func well_knownBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "well_known", "WellKnownTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read well_known test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse well_known test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"well_known01", "well_known02", "well_known03", "agent01", "agent02", "agent03", "mcp_tool01", "mcp_tool02", "mcp_tool03", "schema_type01"},
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
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
