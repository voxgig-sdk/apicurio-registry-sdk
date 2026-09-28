package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/apicurio-registry-sdk/go/utility/struct"
)

type ApicurioRegistrySDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewApicurioRegistrySDK(options map[string]any) *ApicurioRegistrySDK {
	sdk := &ApicurioRegistrySDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *ApicurioRegistrySDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *ApicurioRegistrySDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *ApicurioRegistrySDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *ApicurioRegistrySDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *ApicurioRegistrySDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *ApicurioRegistrySDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *ApicurioRegistrySDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("ApicurioRegistrySDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *ApicurioRegistrySDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

func (sdk *ApicurioRegistrySDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("ApicurioRegistrySDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Admin returns a Admin entity bound to this client.
// Idiomatic usage: client.Admin(nil).List(nil, nil) or
// client.Admin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Admin(data map[string]any) ApicurioRegistryEntity {
	return NewAdminEntityFunc(sdk, data)
}


// Agent returns a Agent entity bound to this client.
// Idiomatic usage: client.Agent(nil).List(nil, nil) or
// client.Agent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Agent(data map[string]any) ApicurioRegistryEntity {
	return NewAgentEntityFunc(sdk, data)
}


// AgentCard returns a AgentCard entity bound to this client.
// Idiomatic usage: client.AgentCard(nil).List(nil, nil) or
// client.AgentCard(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) AgentCard(data map[string]any) ApicurioRegistryEntity {
	return NewAgentCardEntityFunc(sdk, data)
}


// AiCatalog returns a AiCatalog entity bound to this client.
// Idiomatic usage: client.AiCatalog(nil).List(nil, nil) or
// client.AiCatalog(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) AiCatalog(data map[string]any) ApicurioRegistryEntity {
	return NewAiCatalogEntityFunc(sdk, data)
}


// ArdExplore returns a ArdExplore entity bound to this client.
// Idiomatic usage: client.ArdExplore(nil).List(nil, nil) or
// client.ArdExplore(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ArdExplore(data map[string]any) ApicurioRegistryEntity {
	return NewArdExploreEntityFunc(sdk, data)
}


// ArdSearch returns a ArdSearch entity bound to this client.
// Idiomatic usage: client.ArdSearch(nil).List(nil, nil) or
// client.ArdSearch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ArdSearch(data map[string]any) ApicurioRegistryEntity {
	return NewArdSearchEntityFunc(sdk, data)
}


// Artifact returns a Artifact entity bound to this client.
// Idiomatic usage: client.Artifact(nil).List(nil, nil) or
// client.Artifact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Artifact(data map[string]any) ApicurioRegistryEntity {
	return NewArtifactEntityFunc(sdk, data)
}


// ArtifactReference returns a ArtifactReference entity bound to this client.
// Idiomatic usage: client.ArtifactReference(nil).List(nil, nil) or
// client.ArtifactReference(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ArtifactReference(data map[string]any) ApicurioRegistryEntity {
	return NewArtifactReferenceEntityFunc(sdk, data)
}


// ArtifactRule returns a ArtifactRule entity bound to this client.
// Idiomatic usage: client.ArtifactRule(nil).List(nil, nil) or
// client.ArtifactRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ArtifactRule(data map[string]any) ApicurioRegistryEntity {
	return NewArtifactRuleEntityFunc(sdk, data)
}


// ArtifactType returns a ArtifactType entity bound to this client.
// Idiomatic usage: client.ArtifactType(nil).List(nil, nil) or
// client.ArtifactType(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ArtifactType(data map[string]any) ApicurioRegistryEntity {
	return NewArtifactTypeEntityFunc(sdk, data)
}


// Branch returns a Branch entity bound to this client.
// Idiomatic usage: client.Branch(nil).List(nil, nil) or
// client.Branch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Branch(data map[string]any) ApicurioRegistryEntity {
	return NewBranchEntityFunc(sdk, data)
}


// Comment returns a Comment entity bound to this client.
// Idiomatic usage: client.Comment(nil).List(nil, nil) or
// client.Comment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Comment(data map[string]any) ApicurioRegistryEntity {
	return NewCommentEntityFunc(sdk, data)
}


// ConfigurationProperty returns a ConfigurationProperty entity bound to this client.
// Idiomatic usage: client.ConfigurationProperty(nil).List(nil, nil) or
// client.ConfigurationProperty(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ConfigurationProperty(data map[string]any) ApicurioRegistryEntity {
	return NewConfigurationPropertyEntityFunc(sdk, data)
}


// ConsumerVersionHeatmap returns a ConsumerVersionHeatmap entity bound to this client.
// Idiomatic usage: client.ConsumerVersionHeatmap(nil).List(nil, nil) or
// client.ConsumerVersionHeatmap(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ConsumerVersionHeatmap(data map[string]any) ApicurioRegistryEntity {
	return NewConsumerVersionHeatmapEntityFunc(sdk, data)
}


// Content returns a Content entity bound to this client.
// Idiomatic usage: client.Content(nil).List(nil, nil) or
// client.Content(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Content(data map[string]any) ApicurioRegistryEntity {
	return NewContentEntityFunc(sdk, data)
}


// Contract returns a Contract entity bound to this client.
// Idiomatic usage: client.Contract(nil).List(nil, nil) or
// client.Contract(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Contract(data map[string]any) ApicurioRegistryEntity {
	return NewContractEntityFunc(sdk, data)
}


// ContractRule returns a ContractRule entity bound to this client.
// Idiomatic usage: client.ContractRule(nil).List(nil, nil) or
// client.ContractRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ContractRule(data map[string]any) ApicurioRegistryEntity {
	return NewContractRuleEntityFunc(sdk, data)
}


// ContractRuleSet returns a ContractRuleSet entity bound to this client.
// Idiomatic usage: client.ContractRuleSet(nil).List(nil, nil) or
// client.ContractRuleSet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ContractRuleSet(data map[string]any) ApicurioRegistryEntity {
	return NewContractRuleSetEntityFunc(sdk, data)
}


// CreateArtifact returns a CreateArtifact entity bound to this client.
// Idiomatic usage: client.CreateArtifact(nil).List(nil, nil) or
// client.CreateArtifact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) CreateArtifact(data map[string]any) ApicurioRegistryEntity {
	return NewCreateArtifactEntityFunc(sdk, data)
}


// DeprecationReadiness returns a DeprecationReadiness entity bound to this client.
// Idiomatic usage: client.DeprecationReadiness(nil).List(nil, nil) or
// client.DeprecationReadiness(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) DeprecationReadiness(data map[string]any) ApicurioRegistryEntity {
	return NewDeprecationReadinessEntityFunc(sdk, data)
}


// DownloadRef returns a DownloadRef entity bound to this client.
// Idiomatic usage: client.DownloadRef(nil).List(nil, nil) or
// client.DownloadRef(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) DownloadRef(data map[string]any) ApicurioRegistryEntity {
	return NewDownloadRefEntityFunc(sdk, data)
}


// GitOp returns a GitOp entity bound to this client.
// Idiomatic usage: client.GitOp(nil).List(nil, nil) or
// client.GitOp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) GitOp(data map[string]any) ApicurioRegistryEntity {
	return NewGitOpEntityFunc(sdk, data)
}


// GitOpsStatus returns a GitOpsStatus entity bound to this client.
// Idiomatic usage: client.GitOpsStatus(nil).List(nil, nil) or
// client.GitOpsStatus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) GitOpsStatus(data map[string]any) ApicurioRegistryEntity {
	return NewGitOpsStatusEntityFunc(sdk, data)
}


// GitOpsValidateTask returns a GitOpsValidateTask entity bound to this client.
// Idiomatic usage: client.GitOpsValidateTask(nil).List(nil, nil) or
// client.GitOpsValidateTask(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) GitOpsValidateTask(data map[string]any) ApicurioRegistryEntity {
	return NewGitOpsValidateTaskEntityFunc(sdk, data)
}


// GlobalRule returns a GlobalRule entity bound to this client.
// Idiomatic usage: client.GlobalRule(nil).List(nil, nil) or
// client.GlobalRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) GlobalRule(data map[string]any) ApicurioRegistryEntity {
	return NewGlobalRuleEntityFunc(sdk, data)
}


// Group returns a Group entity bound to this client.
// Idiomatic usage: client.Group(nil).List(nil, nil) or
// client.Group(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Group(data map[string]any) ApicurioRegistryEntity {
	return NewGroupEntityFunc(sdk, data)
}


// GroupRule returns a GroupRule entity bound to this client.
// Idiomatic usage: client.GroupRule(nil).List(nil, nil) or
// client.GroupRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) GroupRule(data map[string]any) ApicurioRegistryEntity {
	return NewGroupRuleEntityFunc(sdk, data)
}


// KafkaSql returns a KafkaSql entity bound to this client.
// Idiomatic usage: client.KafkaSql(nil).List(nil, nil) or
// client.KafkaSql(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) KafkaSql(data map[string]any) ApicurioRegistryEntity {
	return NewKafkaSqlEntityFunc(sdk, data)
}


// McpTool returns a McpTool entity bound to this client.
// Idiomatic usage: client.McpTool(nil).List(nil, nil) or
// client.McpTool(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) McpTool(data map[string]any) ApicurioRegistryEntity {
	return NewMcpToolEntityFunc(sdk, data)
}


// Metadata returns a Metadata entity bound to this client.
// Idiomatic usage: client.Metadata(nil).List(nil, nil) or
// client.Metadata(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Metadata(data map[string]any) ApicurioRegistryEntity {
	return NewMetadataEntityFunc(sdk, data)
}


// OdcsContractResult returns a OdcsContractResult entity bound to this client.
// Idiomatic usage: client.OdcsContractResult(nil).List(nil, nil) or
// client.OdcsContractResult(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) OdcsContractResult(data map[string]any) ApicurioRegistryEntity {
	return NewOdcsContractResultEntityFunc(sdk, data)
}


// OdcsContractSummary returns a OdcsContractSummary entity bound to this client.
// Idiomatic usage: client.OdcsContractSummary(nil).List(nil, nil) or
// client.OdcsContractSummary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) OdcsContractSummary(data map[string]any) ApicurioRegistryEntity {
	return NewOdcsContractSummaryEntityFunc(sdk, data)
}


// ReferenceGraph returns a ReferenceGraph entity bound to this client.
// Idiomatic usage: client.ReferenceGraph(nil).List(nil, nil) or
// client.ReferenceGraph(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) ReferenceGraph(data map[string]any) ApicurioRegistryEntity {
	return NewReferenceGraphEntityFunc(sdk, data)
}


// RoleMapping returns a RoleMapping entity bound to this client.
// Idiomatic usage: client.RoleMapping(nil).List(nil, nil) or
// client.RoleMapping(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) RoleMapping(data map[string]any) ApicurioRegistryEntity {
	return NewRoleMappingEntityFunc(sdk, data)
}


// Rule returns a Rule entity bound to this client.
// Idiomatic usage: client.Rule(nil).List(nil, nil) or
// client.Rule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Rule(data map[string]any) ApicurioRegistryEntity {
	return NewRuleEntityFunc(sdk, data)
}


// SearchedBranch returns a SearchedBranch entity bound to this client.
// Idiomatic usage: client.SearchedBranch(nil).List(nil, nil) or
// client.SearchedBranch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) SearchedBranch(data map[string]any) ApicurioRegistryEntity {
	return NewSearchedBranchEntityFunc(sdk, data)
}


// SearchedGroup returns a SearchedGroup entity bound to this client.
// Idiomatic usage: client.SearchedGroup(nil).List(nil, nil) or
// client.SearchedGroup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) SearchedGroup(data map[string]any) ApicurioRegistryEntity {
	return NewSearchedGroupEntityFunc(sdk, data)
}


// SystemInfo returns a SystemInfo entity bound to this client.
// Idiomatic usage: client.SystemInfo(nil).List(nil, nil) or
// client.SystemInfo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) SystemInfo(data map[string]any) ApicurioRegistryEntity {
	return NewSystemInfoEntityFunc(sdk, data)
}


// UsageSummary returns a UsageSummary entity bound to this client.
// Idiomatic usage: client.UsageSummary(nil).List(nil, nil) or
// client.UsageSummary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) UsageSummary(data map[string]any) ApicurioRegistryEntity {
	return NewUsageSummaryEntityFunc(sdk, data)
}


// UserInfo returns a UserInfo entity bound to this client.
// Idiomatic usage: client.UserInfo(nil).List(nil, nil) or
// client.UserInfo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) UserInfo(data map[string]any) ApicurioRegistryEntity {
	return NewUserInfoEntityFunc(sdk, data)
}


// UserInterfaceConfig returns a UserInterfaceConfig entity bound to this client.
// Idiomatic usage: client.UserInterfaceConfig(nil).List(nil, nil) or
// client.UserInterfaceConfig(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) UserInterfaceConfig(data map[string]any) ApicurioRegistryEntity {
	return NewUserInterfaceConfigEntityFunc(sdk, data)
}


// Version returns a Version entity bound to this client.
// Idiomatic usage: client.Version(nil).List(nil, nil) or
// client.Version(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) Version(data map[string]any) ApicurioRegistryEntity {
	return NewVersionEntityFunc(sdk, data)
}


// WellKnown returns a WellKnown entity bound to this client.
// Idiomatic usage: client.WellKnown(nil).List(nil, nil) or
// client.WellKnown(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) WellKnown(data map[string]any) ApicurioRegistryEntity {
	return NewWellKnownEntityFunc(sdk, data)
}


// WrappedVersionState returns a WrappedVersionState entity bound to this client.
// Idiomatic usage: client.WrappedVersionState(nil).List(nil, nil) or
// client.WrappedVersionState(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ApicurioRegistrySDK) WrappedVersionState(data map[string]any) ApicurioRegistryEntity {
	return NewWrappedVersionStateEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *ApicurioRegistrySDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewApicurioRegistrySDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
