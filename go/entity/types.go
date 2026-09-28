// Typed models for the ApicurioRegistry SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/apicurio-registry-sdk/go/core"
)

// Admin is the typed data model for the admin entity.
type Admin struct {
}

// AdminCreateData is the typed request payload for Admin.CreateTyped.
type AdminCreateData struct {
	RequireEmptyRegistry *bool `json:"require_empty_registry,omitempty"`
	Role string `json:"role"`
	Value string `json:"value"`
}

// AdminUpdateData is the typed request payload for Admin.UpdateTyped.
type AdminUpdateData struct {
	PrincipalId string `json:"principal_id"`
	Role *string `json:"role,omitempty"`
	Value *string `json:"value,omitempty"`
}

// AdminRemoveMatch is the typed request payload for Admin.RemoveTyped.
type AdminRemoveMatch struct {
	PrincipalId string `json:"principal_id"`
}

// Agent is the typed data model for the agent entity.
type Agent struct {
}

// AgentListMatch is the typed request payload for Agent.ListTyped.
type AgentListMatch struct {
	Capability *[]any `json:"capability,omitempty"`
	InputMode *[]any `json:"input_mode,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	OutputMode *[]any `json:"output_mode,omitempty"`
	Skill *[]any `json:"skill,omitempty"`
}

// AgentCard is the typed data model for the agent_card entity.
type AgentCard struct {
}

// AgentCardListMatch is the typed request payload for AgentCard.ListTyped.
type AgentCardListMatch struct {
	Capabilities *map[string]any `json:"capabilities,omitempty"`
	DefaultInputModes *[]any `json:"defaultInputModes,omitempty"`
	DefaultOutputModes *[]any `json:"defaultOutputModes,omitempty"`
	Description *string `json:"description,omitempty"`
	DocumentationUrl *string `json:"documentationUrl,omitempty"`
	IconUrl *string `json:"iconUrl,omitempty"`
	Name *string `json:"name,omitempty"`
	ProtocolVersion *string `json:"protocolVersion,omitempty"`
	Provider *map[string]any `json:"provider,omitempty"`
	SecurityRequirements *[]any `json:"securityRequirements,omitempty"`
	SecuritySchemes *map[string]any `json:"securitySchemes,omitempty"`
	Signatures *[]any `json:"signatures,omitempty"`
	Skills *[]any `json:"skills,omitempty"`
	SupportedInterfaces *[]any `json:"supportedInterfaces,omitempty"`
	Version *string `json:"version,omitempty"`
}

// AiCatalog is the typed data model for the ai_catalog entity.
type AiCatalog struct {
}

// AiCatalogListMatch is the typed request payload for AiCatalog.ListTyped.
type AiCatalogListMatch struct {
	Capabilities *[]any `json:"capabilities,omitempty"`
	Description *string `json:"description,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
	Identifier *string `json:"identifier,omitempty"`
	RepresentativeQueries *[]any `json:"representativeQueries,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
	Version *string `json:"version,omitempty"`
}

// ArdExplore is the typed data model for the ard_explore entity.
type ArdExplore struct {
}

// ArdExploreCreateData is the typed request payload for ArdExplore.CreateTyped.
type ArdExploreCreateData struct {
	Query *map[string]any `json:"query,omitempty"`
	ResultType map[string]any `json:"resultType"`
}

// ArdSearch is the typed data model for the ard_search entity.
type ArdSearch struct {
}

// ArdSearchCreateData is the typed request payload for ArdSearch.CreateTyped.
type ArdSearchCreateData struct {
	Federation *string `json:"federation,omitempty"`
	PageSize *int `json:"pageSize,omitempty"`
	PageToken *string `json:"pageToken,omitempty"`
	Query map[string]any `json:"query"`
	Results []any `json:"results"`
}

// Artifact is the typed data model for the artifact entity.
type Artifact struct {
}

// ArtifactLoadMatch is the typed request payload for Artifact.LoadTyped.
type ArtifactLoadMatch struct {
	GlobalId int `json:"global_id"`
	Reference *string `json:"reference,omitempty"`
	ReturnArtifactType *bool `json:"return_artifact_type,omitempty"`
}

// ArtifactListMatch is the typed request payload for Artifact.ListTyped.
type ArtifactListMatch struct {
	ArtifactId *string `json:"artifact_id,omitempty"`
	ArtifactType *string `json:"artifact_type,omitempty"`
	ContentId *int `json:"content_id,omitempty"`
	Description *string `json:"description,omitempty"`
	GlobalId *int `json:"global_id,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Label *[]any `json:"label,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
	SkipCount *bool `json:"skip_count,omitempty"`
}

// ArtifactCreateData is the typed request payload for Artifact.CreateTyped.
type ArtifactCreateData struct {
	ArtifactType *string `json:"artifact_type,omitempty"`
	Canonical *bool `json:"canonical,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
	SkipCount *bool `json:"skip_count,omitempty"`
	ArtifactId string `json:"artifactId"`
	ArtifactType2 string `json:"artifactType"`
	Artifacts []any `json:"artifacts"`
	Count int `json:"count"`
	CreatedOn string `json:"createdOn"`
	Description *string `json:"description,omitempty"`
	GroupId2 string `json:"groupId"`
	Id *string `json:"id,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy string `json:"modifiedBy"`
	ModifiedOn string `json:"modifiedOn"`
	Name *string `json:"name,omitempty"`
	Owner string `json:"owner"`
	Versions []any `json:"versions"`
}

// ArtifactRemoveMatch is the typed request payload for Artifact.RemoveTyped.
type ArtifactRemoveMatch struct {
	GroupId string `json:"group_id"`
	Id *string `json:"id,omitempty"`
}

// ArtifactReference is the typed data model for the artifact_reference entity.
type ArtifactReference struct {
}

// ArtifactReferenceListMatch is the typed request payload for ArtifactReference.ListTyped.
type ArtifactReferenceListMatch struct {
	GlobalIdId int `json:"global_id_id"`
	RefType *string `json:"ref_type,omitempty"`
}

// ArtifactReferenceCreateData is the typed request payload for ArtifactReference.CreateTyped.
type ArtifactReferenceCreateData struct {
	ArtifactType *string `json:"artifact_type,omitempty"`
	ArtifactId string `json:"artifactId"`
	Content string `json:"content"`
	ContentType string `json:"contentType"`
	Encoding *string `json:"encoding,omitempty"`
	GroupId string `json:"groupId"`
	Name string `json:"name"`
	References *[]any `json:"references,omitempty"`
	Version *string `json:"version,omitempty"`
}

// ArtifactRule is the typed data model for the artifact_rule entity.
type ArtifactRule struct {
}

// ArtifactRuleCreateData is the typed request payload for ArtifactRule.CreateTyped.
type ArtifactRuleCreateData struct {
	GroupId string `json:"group_id"`
	Id string `json:"id"`
	Config string `json:"config"`
	RuleType *string `json:"ruleType,omitempty"`
}

// ArtifactRuleRemoveMatch is the typed request payload for ArtifactRule.RemoveTyped.
type ArtifactRuleRemoveMatch struct {
	ArtifactId *string `json:"artifact_id,omitempty"`
	GroupId string `json:"group_id"`
	Id string `json:"id"`
}

// ArtifactType is the typed data model for the artifact_type entity.
type ArtifactType struct {
}

// ArtifactTypeListMatch is the typed request payload for ArtifactType.ListTyped.
type ArtifactTypeListMatch struct {
	Name *string `json:"name,omitempty"`
}

// Branch is the typed data model for the branch entity.
type Branch struct {
}

// BranchLoadMatch is the typed request payload for Branch.LoadTyped.
type BranchLoadMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	Id string `json:"id"`
}

// BranchCreateData is the typed request payload for Branch.CreateTyped.
type BranchCreateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	ArtifactId2 string `json:"artifactId"`
	BranchId string `json:"branchId"`
	CreatedOn string `json:"createdOn"`
	Description *string `json:"description,omitempty"`
	GroupId2 string `json:"groupId"`
	Id *string `json:"id,omitempty"`
	ModifiedBy string `json:"modifiedBy"`
	ModifiedOn string `json:"modifiedOn"`
	Owner string `json:"owner"`
	SystemDefined bool `json:"systemDefined"`
	Versions *[]any `json:"versions,omitempty"`
}

// BranchUpdateData is the typed request payload for Branch.UpdateTyped.
type BranchUpdateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	Id string `json:"id"`
	ArtifactId2 *string `json:"artifactId,omitempty"`
	BranchId *string `json:"branchId,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GroupId2 *string `json:"groupId,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Owner *string `json:"owner,omitempty"`
	SystemDefined *bool `json:"systemDefined,omitempty"`
	Versions *[]any `json:"versions,omitempty"`
}

// BranchRemoveMatch is the typed request payload for Branch.RemoveTyped.
type BranchRemoveMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	Id string `json:"id"`
}

// Comment is the typed data model for the comment entity.
type Comment struct {
}

// CommentListMatch is the typed request payload for Comment.ListTyped.
type CommentListMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression string `json:"version_expression"`
}

// CommentCreateData is the typed request payload for Comment.CreateTyped.
type CommentCreateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression string `json:"version_expression"`
	CommentId string `json:"commentId"`
	CreatedOn string `json:"createdOn"`
	Owner string `json:"owner"`
	Value string `json:"value"`
}

// ConfigurationProperty is the typed data model for the configuration_property entity.
type ConfigurationProperty struct {
}

// ConfigurationPropertyLoadMatch is the typed request payload for ConfigurationProperty.LoadTyped.
type ConfigurationPropertyLoadMatch struct {
	Id string `json:"id"`
}

// ConfigurationPropertyListMatch is the typed request payload for ConfigurationProperty.ListTyped.
type ConfigurationPropertyListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Label *string `json:"label,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Value *string `json:"value,omitempty"`
}

// ConsumerVersionHeatmap is the typed data model for the consumer_version_heatmap entity.
type ConsumerVersionHeatmap struct {
}

// ConsumerVersionHeatmapListMatch is the typed request payload for ConsumerVersionHeatmap.ListTyped.
type ConsumerVersionHeatmapListMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
}

// Content is the typed data model for the content entity.
type Content struct {
}

// ContentCreateData is the typed request payload for Content.CreateTyped.
type ContentCreateData struct {
	ArtifactType string `json:"artifact_type"`
}

// Contract is the typed data model for the contract entity.
type Contract struct {
}

// ContractLoadMatch is the typed request payload for Contract.LoadTyped.
type ContractLoadMatch struct {
	GroupId string `json:"group_id"`
	Id string `json:"id"`
}

// ContractListMatch is the typed request payload for Contract.ListTyped.
type ContractListMatch struct {
	CompatibilityGroup *string `json:"compatibility_group,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
	OwnerTeam *string `json:"owner_team,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ContractCreateData is the typed request payload for Contract.CreateTyped.
type ContractCreateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionId *string `json:"version_id,omitempty"`
	ArtifactId2 string `json:"artifactId"`
	ArtifactType string `json:"artifactType"`
	CreatedOn string `json:"createdOn"`
	Description *string `json:"description,omitempty"`
	GroupId2 string `json:"groupId"`
	Id *string `json:"id,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy string `json:"modifiedBy"`
	ModifiedOn string `json:"modifiedOn"`
	Name *string `json:"name,omitempty"`
	Owner string `json:"owner"`
}

// ContractUpdateData is the typed request payload for Contract.UpdateTyped.
type ContractUpdateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	ArtifactId2 *string `json:"artifactId,omitempty"`
	ArtifactType *string `json:"artifactType,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GroupId2 *string `json:"groupId,omitempty"`
	Id *string `json:"id,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
}

// ContractRemoveMatch is the typed request payload for Contract.RemoveTyped.
type ContractRemoveMatch struct {
	GroupId string `json:"group_id"`
	Id string `json:"id"`
}

// ContractRule is the typed data model for the contract_rule entity.
type ContractRule struct {
}

// ContractRuleListMatch is the typed request payload for ContractRule.ListTyped.
type ContractRuleListMatch struct {
	Tag string `json:"tag"`
}

// ContractRuleSet is the typed data model for the contract_rule_set entity.
type ContractRuleSet struct {
}

// ContractRuleSetListMatch is the typed request payload for ContractRuleSet.ListTyped.
type ContractRuleSetListMatch struct {
	DomainRules *[]any `json:"domainRules,omitempty"`
	MigrationRules *[]any `json:"migrationRules,omitempty"`
}

// ContractRuleSetUpdateData is the typed request payload for ContractRuleSet.UpdateTyped.
type ContractRuleSetUpdateData struct {
	DomainRules *[]any `json:"domainRules,omitempty"`
	MigrationRules *[]any `json:"migrationRules,omitempty"`
}

// CreateArtifact is the typed data model for the create_artifact entity.
type CreateArtifact struct {
}

// CreateArtifactCreateData is the typed request payload for CreateArtifact.CreateTyped.
type CreateArtifactCreateData struct {
	GroupId string `json:"group_id"`
	Canonical *bool `json:"canonical,omitempty"`
	DryRun *bool `json:"dry_run,omitempty"`
	IfExist *string `json:"if_exist,omitempty"`
	Artifact map[string]any `json:"artifact"`
	ArtifactId string `json:"artifactId"`
	ArtifactType *string `json:"artifactType,omitempty"`
	Description *string `json:"description,omitempty"`
	FirstVersion map[string]any `json:"firstVersion"`
	Labels *map[string]any `json:"labels,omitempty"`
	Name *string `json:"name,omitempty"`
	Version map[string]any `json:"version"`
}

// DeprecationReadiness is the typed data model for the deprecation_readiness entity.
type DeprecationReadiness struct {
}

// DeprecationReadinessListMatch is the typed request payload for DeprecationReadiness.ListTyped.
type DeprecationReadinessListMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionId string `json:"version_id"`
}

// DownloadRef is the typed data model for the download_ref entity.
type DownloadRef struct {
}

// DownloadRefLoadMatch is the typed request payload for DownloadRef.LoadTyped.
type DownloadRefLoadMatch struct {
	ForBrowser *bool `json:"for_browser,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
}

// GitOp is the typed data model for the git_op entity.
type GitOp struct {
}

// GitOpCreateData is the typed request payload for GitOp.CreateTyped.
type GitOpCreateData struct {
	Ref string `json:"ref"`
	RepoId string `json:"repoId"`
	Type *string `json:"type,omitempty"`
}

// GitOpRemoveMatch is the typed request payload for GitOp.RemoveTyped.
type GitOpRemoveMatch struct {
	TaskId string `json:"task_id"`
}

// GitOpsStatus is the typed data model for the git_ops_status entity.
type GitOpsStatus struct {
}

// GitOpsStatusListMatch is the typed request payload for GitOpsStatus.ListTyped.
type GitOpsStatusListMatch struct {
	Context *string `json:"context,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Source *string `json:"source,omitempty"`
}

// GitOpsValidateTask is the typed data model for the git_ops_validate_task entity.
type GitOpsValidateTask struct {
}

// GitOpsValidateTaskLoadMatch is the typed request payload for GitOpsValidateTask.LoadTyped.
type GitOpsValidateTaskLoadMatch struct {
	TaskId string `json:"task_id"`
}

// GitOpsValidateTaskListMatch is the typed request payload for GitOpsValidateTask.ListTyped.
type GitOpsValidateTaskListMatch struct {
	ArtifactCount *int `json:"artifactCount,omitempty"`
	CompletedAt *string `json:"completedAt,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Errors *[]any `json:"errors,omitempty"`
	GroupCount *int `json:"groupCount,omitempty"`
	Ref *string `json:"ref,omitempty"`
	RepoId *string `json:"repoId,omitempty"`
	Result *string `json:"result,omitempty"`
	State *string `json:"state,omitempty"`
	TaskId *string `json:"taskId,omitempty"`
	Type *string `json:"type,omitempty"`
	VersionCount *int `json:"versionCount,omitempty"`
}

// GlobalRule is the typed data model for the global_rule entity.
type GlobalRule struct {
}

// GlobalRuleCreateData is the typed request payload for GlobalRule.CreateTyped.
type GlobalRuleCreateData struct {
	Config string `json:"config"`
	Id *string `json:"id,omitempty"`
	RuleType *string `json:"ruleType,omitempty"`
}

// GlobalRuleRemoveMatch is the typed request payload for GlobalRule.RemoveTyped.
type GlobalRuleRemoveMatch struct {
	Id string `json:"id"`
}

// Group is the typed data model for the group entity.
type Group struct {
}

// GroupLoadMatch is the typed request payload for Group.LoadTyped.
type GroupLoadMatch struct {
	Id string `json:"id"`
}

// GroupListMatch is the typed request payload for Group.ListTyped.
type GroupListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
}

// GroupCreateData is the typed request payload for Group.CreateTyped.
type GroupCreateData struct {
	ArtifactsType *string `json:"artifactsType,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GroupId *string `json:"groupId,omitempty"`
	Id *string `json:"id,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Owner *string `json:"owner,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
}

// GroupUpdateData is the typed request payload for Group.UpdateTyped.
type GroupUpdateData struct {
	Id string `json:"id"`
	ArtifactsType *string `json:"artifactsType,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GroupId *string `json:"groupId,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Owner *string `json:"owner,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
}

// GroupRemoveMatch is the typed request payload for Group.RemoveTyped.
type GroupRemoveMatch struct {
	Id string `json:"id"`
}

// GroupRule is the typed data model for the group_rule entity.
type GroupRule struct {
}

// GroupRuleCreateData is the typed request payload for GroupRule.CreateTyped.
type GroupRuleCreateData struct {
	Id string `json:"id"`
	Config string `json:"config"`
	RuleType *string `json:"ruleType,omitempty"`
}

// GroupRuleRemoveMatch is the typed request payload for GroupRule.RemoveTyped.
type GroupRuleRemoveMatch struct {
	GroupId *string `json:"group_id,omitempty"`
	Id string `json:"id"`
}

// KafkaSql is the typed data model for the kafka_sql entity.
type KafkaSql struct {
}

// KafkaSqlCreateData is the typed request payload for KafkaSql.CreateTyped.
type KafkaSqlCreateData struct {
	SnapshotId string `json:"snapshotId"`
}

// McpTool is the typed data model for the mcp_tool entity.
type McpTool struct {
}

// McpToolListMatch is the typed request payload for McpTool.ListTyped.
type McpToolListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Parameter *[]any `json:"parameter,omitempty"`
}

// Metadata is the typed data model for the metadata entity.
type Metadata struct {
}

// MetadataLoadMatch is the typed request payload for Metadata.LoadTyped.
type MetadataLoadMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression *string `json:"version_expression,omitempty"`
}

// MetadataCreateData is the typed request payload for Metadata.CreateTyped.
type MetadataCreateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression string `json:"version_expression"`
	ArtifactId2 *string `json:"artifactId,omitempty"`
	ArtifactType *string `json:"artifactType,omitempty"`
	ContentId *int `json:"contentId,omitempty"`
	ContractMetadata *map[string]any `json:"contractMetadata,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GlobalId *int `json:"globalId,omitempty"`
	GroupId2 *string `json:"groupId,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy string `json:"modifiedBy"`
	ModifiedOn string `json:"modifiedOn"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	Version *int `json:"version,omitempty"`
}

// MetadataUpdateData is the typed request payload for Metadata.UpdateTyped.
type MetadataUpdateData struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression *string `json:"version_expression,omitempty"`
	ArtifactId2 *string `json:"artifactId,omitempty"`
	ArtifactType *string `json:"artifactType,omitempty"`
	ContentId *int `json:"contentId,omitempty"`
	ContractMetadata *map[string]any `json:"contractMetadata,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GlobalId *int `json:"globalId,omitempty"`
	GroupId2 *string `json:"groupId,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	Version *int `json:"version,omitempty"`
}

// OdcsContractResult is the typed data model for the odcs_contract_result entity.
type OdcsContractResult struct {
}

// OdcsContractResultCreateData is the typed request payload for OdcsContractResult.CreateTyped.
type OdcsContractResultCreateData struct {
	GroupId string `json:"group_id"`
	LabelsApplied *int `json:"labelsApplied,omitempty"`
	RulesApplied *int `json:"rulesApplied,omitempty"`
	TagsApplied *int `json:"tagsApplied,omitempty"`
	Warnings *[]any `json:"warnings,omitempty"`
}

// OdcsContractResultUpdateData is the typed request payload for OdcsContractResult.UpdateTyped.
type OdcsContractResultUpdateData struct {
	ContractId string `json:"contract_id"`
	GroupId string `json:"group_id"`
	LabelsApplied *int `json:"labelsApplied,omitempty"`
	RulesApplied *int `json:"rulesApplied,omitempty"`
	TagsApplied *int `json:"tagsApplied,omitempty"`
	Warnings *[]any `json:"warnings,omitempty"`
}

// OdcsContractSummary is the typed data model for the odcs_contract_summary entity.
type OdcsContractSummary struct {
}

// OdcsContractSummaryListMatch is the typed request payload for OdcsContractSummary.ListTyped.
type OdcsContractSummaryListMatch struct {
	GroupId string `json:"group_id"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// ReferenceGraph is the typed data model for the reference_graph entity.
type ReferenceGraph struct {
}

// ReferenceGraphListMatch is the typed request payload for ReferenceGraph.ListTyped.
type ReferenceGraphListMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionId string `json:"version_id"`
	Depth *int `json:"depth,omitempty"`
	Direction *string `json:"direction,omitempty"`
}

// RoleMapping is the typed data model for the role_mapping entity.
type RoleMapping struct {
}

// RoleMappingLoadMatch is the typed request payload for RoleMapping.LoadTyped.
type RoleMappingLoadMatch struct {
	Id string `json:"id"`
}

// RoleMappingListMatch is the typed request payload for RoleMapping.ListTyped.
type RoleMappingListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// Rule is the typed data model for the rule entity.
type Rule struct {
}

// RuleLoadMatch is the typed request payload for Rule.LoadTyped.
type RuleLoadMatch struct {
	ArtifactId *string `json:"artifact_id,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Id string `json:"id"`
}

// RuleListMatch is the typed request payload for Rule.ListTyped.
type RuleListMatch struct {
	Config *string `json:"config,omitempty"`
	Id *string `json:"id,omitempty"`
	RuleType *string `json:"ruleType,omitempty"`
}

// RuleUpdateData is the typed request payload for Rule.UpdateTyped.
type RuleUpdateData struct {
	ArtifactId *string `json:"artifact_id,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Id string `json:"id"`
	Config *string `json:"config,omitempty"`
	RuleType *string `json:"ruleType,omitempty"`
}

// SearchedBranch is the typed data model for the searched_branch entity.
type SearchedBranch struct {
}

// SearchedBranchListMatch is the typed request payload for SearchedBranch.ListTyped.
type SearchedBranchListMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
}

// SearchedGroup is the typed data model for the searched_group entity.
type SearchedGroup struct {
}

// SearchedGroupListMatch is the typed request payload for SearchedGroup.ListTyped.
type SearchedGroupListMatch struct {
	Description *string `json:"description,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Label *[]any `json:"label,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
}

// SystemInfo is the typed data model for the system_info entity.
type SystemInfo struct {
}

// SystemInfoLoadMatch is the typed request payload for SystemInfo.LoadTyped.
type SystemInfoLoadMatch struct {
	BuiltOn *string `json:"builtOn,omitempty"`
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
	Version *string `json:"version,omitempty"`
}

// UsageSummary is the typed data model for the usage_summary entity.
type UsageSummary struct {
}

// UsageSummaryLoadMatch is the typed request payload for UsageSummary.LoadTyped.
type UsageSummaryLoadMatch struct {
	Active *int `json:"active,omitempty"`
	Dead *int `json:"dead,omitempty"`
	Stale *int `json:"stale,omitempty"`
}

// UserInfo is the typed data model for the user_info entity.
type UserInfo struct {
}

// UserInfoLoadMatch is the typed request payload for UserInfo.LoadTyped.
type UserInfoLoadMatch struct {
	Admin *bool `json:"admin,omitempty"`
	Developer *bool `json:"developer,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
	Username *string `json:"username,omitempty"`
	Viewer *bool `json:"viewer,omitempty"`
}

// UserInterfaceConfig is the typed data model for the user_interface_config entity.
type UserInterfaceConfig struct {
}

// UserInterfaceConfigLoadMatch is the typed request payload for UserInterfaceConfig.LoadTyped.
type UserInterfaceConfigLoadMatch struct {
	Auth *map[string]any `json:"auth,omitempty"`
	Features *map[string]any `json:"features,omitempty"`
	Ui *map[string]any `json:"ui,omitempty"`
}

// Version is the typed data model for the version entity.
type Version struct {
}

// VersionLoadMatch is the typed request payload for Version.LoadTyped.
type VersionLoadMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression string `json:"version_expression"`
	Canonical *bool `json:"canonical,omitempty"`
	Reference *string `json:"reference,omitempty"`
}

// VersionListMatch is the typed request payload for Version.ListTyped.
type VersionListMatch struct {
	ArtifactId *string `json:"artifact_id,omitempty"`
	ArtifactType *string `json:"artifact_type,omitempty"`
	Content *string `json:"content,omitempty"`
	ContentId *int `json:"content_id,omitempty"`
	Description *string `json:"description,omitempty"`
	GlobalId *int `json:"global_id,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Label *[]any `json:"label,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Name *string `json:"name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
	SkipCount *bool `json:"skip_count,omitempty"`
	State *string `json:"state,omitempty"`
	Structure *string `json:"structure,omitempty"`
	Version *string `json:"version,omitempty"`
}

// VersionCreateData is the typed request payload for Version.CreateTyped.
type VersionCreateData struct {
	ArtifactId *string `json:"artifact_id,omitempty"`
	ArtifactType *string `json:"artifact_type,omitempty"`
	Canonical *bool `json:"canonical,omitempty"`
	GroupId *string `json:"group_id,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Order *string `json:"order,omitempty"`
	Orderby *string `json:"orderby,omitempty"`
	SkipCount *bool `json:"skip_count,omitempty"`
	State *string `json:"state,omitempty"`
	ArtifactId2 string `json:"artifactId"`
	ArtifactType2 string `json:"artifactType"`
	Branches *[]any `json:"branches,omitempty"`
	Content map[string]any `json:"content"`
	ContentId int `json:"contentId"`
	Count int `json:"count"`
	CreatedOn string `json:"createdOn"`
	Description *string `json:"description,omitempty"`
	GlobalId int `json:"globalId"`
	GroupId2 *string `json:"groupId,omitempty"`
	Id *string `json:"id,omitempty"`
	IsDraft *bool `json:"isDraft,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner string `json:"owner"`
	Value string `json:"value"`
	Version *string `json:"version,omitempty"`
	Versions []any `json:"versions"`
}

// VersionUpdateData is the typed request payload for Version.UpdateTyped.
type VersionUpdateData struct {
	ArtifactId string `json:"artifact_id"`
	CommentId string `json:"comment_id"`
	GroupId string `json:"group_id"`
	VersionId string `json:"version_id"`
	ArtifactId2 *string `json:"artifactId,omitempty"`
	ArtifactType *string `json:"artifactType,omitempty"`
	Branches *[]any `json:"branches,omitempty"`
	Content *map[string]any `json:"content,omitempty"`
	ContentId *int `json:"contentId,omitempty"`
	Count *int `json:"count,omitempty"`
	CreatedOn *string `json:"createdOn,omitempty"`
	Description *string `json:"description,omitempty"`
	GlobalId *int `json:"globalId,omitempty"`
	GroupId2 *string `json:"groupId,omitempty"`
	Id *string `json:"id,omitempty"`
	IsDraft *bool `json:"isDraft,omitempty"`
	Labels *map[string]any `json:"labels,omitempty"`
	ModifiedBy *string `json:"modifiedBy,omitempty"`
	ModifiedOn *string `json:"modifiedOn,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
	State *string `json:"state,omitempty"`
	Value *string `json:"value,omitempty"`
	Version *string `json:"version,omitempty"`
	Versions *[]any `json:"versions,omitempty"`
}

// VersionRemoveMatch is the typed request payload for Version.RemoveTyped.
type VersionRemoveMatch struct {
	ArtifactId string `json:"artifact_id"`
	CommentId *string `json:"comment_id,omitempty"`
	GroupId string `json:"group_id"`
	VersionId *string `json:"version_id,omitempty"`
	Id *string `json:"id,omitempty"`
}

// WellKnown is the typed data model for the well_known entity.
type WellKnown struct {
}

// WellKnownLoadMatch is the typed request payload for WellKnown.LoadTyped.
type WellKnownLoadMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	Version *string `json:"version,omitempty"`
}

// WrappedVersionState is the typed data model for the wrapped_version_state entity.
type WrappedVersionState struct {
}

// WrappedVersionStateLoadMatch is the typed request payload for WrappedVersionState.LoadTyped.
type WrappedVersionStateLoadMatch struct {
	ArtifactId string `json:"artifact_id"`
	GroupId string `json:"group_id"`
	VersionExpression string `json:"version_expression"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
