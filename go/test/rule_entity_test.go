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

func TestRuleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Rule(nil)
		if ent == nil {
			t.Fatal("expected non-nil RuleEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"rule": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Rule(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Rule(nil).Stream("list", nil, nil) {
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
		setup := ruleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "rule." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set APICURIO_REGISTRY_TEST_RULE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		ruleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.rule")))
		var ruleRef01Data map[string]any
		if len(ruleRef01DataRaw) > 0 {
			ruleRef01Data = core.ToMapAny(ruleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ruleRef01Data

		// LIST
		ruleRef01Ent := client.Rule(nil)
		ruleRef01Match := map[string]any{
			"group_id": setup.idmap["group01"],
		}

		ruleRef01ListResult, err := ruleRef01Ent.List(ruleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, ruleRef01ListOk := ruleRef01ListResult.([]any)
		if !ruleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", ruleRef01ListResult)
		}

		// UPDATE
		ruleRef01DataUp0Up := map[string]any{
			"id": ruleRef01Data["id"],
		}

		ruleRef01MarkdefUp0Name := "config"
		ruleRef01MarkdefUp0Value := fmt.Sprintf("Mark01-rule_ref01_%d", setup.now)
		ruleRef01DataUp0Up[ruleRef01MarkdefUp0Name] = ruleRef01MarkdefUp0Value

		ruleRef01ResdataUp0Result, err := ruleRef01Ent.Update(ruleRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		ruleRef01ResdataUp0 := core.ToMapAny(entityData(ruleRef01ResdataUp0Result))
		if ruleRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if ruleRef01ResdataUp0["id"] != ruleRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if ruleRef01ResdataUp0[ruleRef01MarkdefUp0Name] != ruleRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", ruleRef01MarkdefUp0Name, ruleRef01ResdataUp0[ruleRef01MarkdefUp0Name])
		}

		// LOAD
		ruleRef01MatchDt0 := map[string]any{
			"id": ruleRef01Data["id"],
		}
		ruleRef01DataDt0Loaded, err := ruleRef01Ent.Load(ruleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		ruleRef01DataDt0LoadResult := core.ToMapAny(entityData(ruleRef01DataDt0Loaded))
		if ruleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if ruleRef01DataDt0LoadResult["id"] != ruleRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func ruleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "rule", "RuleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read rule test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse rule test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"rule01", "rule02", "rule03", "group01", "group02", "group03", "artifact01", "artifact02", "artifact03"},
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
	entidEnvRaw := os.Getenv("APICURIO_REGISTRY_TEST_RULE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APICURIO_REGISTRY_TEST_RULE_ENTID": idmap,
		"APICURIO_REGISTRY_TEST_LIVE":      "FALSE",
		"APICURIO_REGISTRY_TEST_EXPLAIN":   "FALSE",
		"APICURIO_REGISTRY_SERVER_REGISTRY": "MY-REGISTRY-URL",
	})

	idmapResolved := core.ToMapAny(env["APICURIO_REGISTRY_TEST_RULE_ENTID"])
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
