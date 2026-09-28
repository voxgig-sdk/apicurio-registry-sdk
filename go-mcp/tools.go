package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/apicurio-registry-sdk/go"
)

// Args is the common argument shape for both tools. `entity` selects
// the SDK entity to operate on; `query` is the optional reqmatch /
// reqdata map passed through to the SDK. For load, `query` should be
// `{"id": <value>}`. For list, omit `query` or pass an empty map.
type Args struct {
	Entity string         `json:"entity" jsonschema:"admin | agent | agent_card | ai_catalog | ard_explore | ard_search | artifact | artifact_reference | artifact_rule | artifact_type | branch | comment | configuration_property | consumer_version_heatmap | content | contract | contract_rule | contract_rule_set | create_artifact | deprecation_readiness | download_ref | git_op | git_ops_status | git_ops_validate_task | global_rule | group | group_rule | kafka_sql | mcp_tool | metadata | odcs_contract_result | odcs_contract_summary | reference_graph | role_mapping | rule | searched_branch | searched_group | system_info | usage_summary | user_info | user_interface_config | version | well_known | wrapped_version_state"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional match map e.g. {\"id\":1} for load, omit for list"`
}

func registerTools(server *mcp.Server, client *sdk.ApicurioRegistrySDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name: "apicurio-registry_list",
		Description: "List records from ApicurioRegistry. " +
			"Args: entity (one of the supported SDK entities), query (optional filter map). " +
			"Returns the first page of records as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "list", args)
	})

	mcp.AddTool(server, &mcp.Tool{
		Name: "apicurio-registry_load",
		Description: "Load a single record from ApicurioRegistry. " +
			"Args: entity, query ({\"id\":N} required). Returns the record as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "load", args)
	})
}

func runOp(client *sdk.ApicurioRegistrySDK, op string, args Args) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, args.Entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(args.Query, nil)
	case "load":
		result, err = ent.Load(args.Query, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.ApicurioRegistrySDK, name string) (sdk.ApicurioRegistryEntity, error) {
	switch strings.ToLower(name) {
	case "admin":
		return client.Admin(nil), nil
	case "agent":
		return client.Agent(nil), nil
	case "agent_card":
		return client.AgentCard(nil), nil
	case "ai_catalog":
		return client.AiCatalog(nil), nil
	case "ard_explore":
		return client.ArdExplore(nil), nil
	case "ard_search":
		return client.ArdSearch(nil), nil
	case "artifact":
		return client.Artifact(nil), nil
	case "artifact_reference":
		return client.ArtifactReference(nil), nil
	case "artifact_rule":
		return client.ArtifactRule(nil), nil
	case "artifact_type":
		return client.ArtifactType(nil), nil
	case "branch":
		return client.Branch(nil), nil
	case "comment":
		return client.Comment(nil), nil
	case "configuration_property":
		return client.ConfigurationProperty(nil), nil
	case "consumer_version_heatmap":
		return client.ConsumerVersionHeatmap(nil), nil
	case "content":
		return client.Content(nil), nil
	case "contract":
		return client.Contract(nil), nil
	case "contract_rule":
		return client.ContractRule(nil), nil
	case "contract_rule_set":
		return client.ContractRuleSet(nil), nil
	case "create_artifact":
		return client.CreateArtifact(nil), nil
	case "deprecation_readiness":
		return client.DeprecationReadiness(nil), nil
	case "download_ref":
		return client.DownloadRef(nil), nil
	case "git_op":
		return client.GitOp(nil), nil
	case "git_ops_status":
		return client.GitOpsStatus(nil), nil
	case "git_ops_validate_task":
		return client.GitOpsValidateTask(nil), nil
	case "global_rule":
		return client.GlobalRule(nil), nil
	case "group":
		return client.Group(nil), nil
	case "group_rule":
		return client.GroupRule(nil), nil
	case "kafka_sql":
		return client.KafkaSql(nil), nil
	case "mcp_tool":
		return client.McpTool(nil), nil
	case "metadata":
		return client.Metadata(nil), nil
	case "odcs_contract_result":
		return client.OdcsContractResult(nil), nil
	case "odcs_contract_summary":
		return client.OdcsContractSummary(nil), nil
	case "reference_graph":
		return client.ReferenceGraph(nil), nil
	case "role_mapping":
		return client.RoleMapping(nil), nil
	case "rule":
		return client.Rule(nil), nil
	case "searched_branch":
		return client.SearchedBranch(nil), nil
	case "searched_group":
		return client.SearchedGroup(nil), nil
	case "system_info":
		return client.SystemInfo(nil), nil
	case "usage_summary":
		return client.UsageSummary(nil), nil
	case "user_info":
		return client.UserInfo(nil), nil
	case "user_interface_config":
		return client.UserInterfaceConfig(nil), nil
	case "version":
		return client.Version(nil), nil
	case "well_known":
		return client.WellKnown(nil), nil
	case "wrapped_version_state":
		return client.WrappedVersionState(nil), nil

	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}
