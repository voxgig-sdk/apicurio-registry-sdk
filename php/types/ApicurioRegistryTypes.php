<?php
declare(strict_types=1);

// Typed models for the ApicurioRegistry SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Admin entity data model. */
class Admin
{
    public string $role;
    public string $value;
}

/** Request payload for Admin#create. */
class AdminCreateData
{
    public ?bool $require_empty_registry = null;
    public string $role;
    public string $value;
}

/** Request payload for Admin#update. */
class AdminUpdateData
{
    public string $principal_id;
    public ?string $role = null;
    public ?string $value = null;
}

/** Request payload for Admin#remove. */
class AdminRemoveMatch
{
    public string $principal_id;
}

/** Agent entity data model. */
class Agent
{
    public ?string $artifactId = null;
    public ?array $capabilities = null;
    public ?int $createdOn = null;
    public ?array $defaultInputModes = null;
    public ?array $defaultOutputModes = null;
    public ?string $description = null;
    public ?string $documentationUrl = null;
    public ?string $groupId = null;
    public ?string $iconUrl = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?string $protocolVersion = null;
    public ?array $provider = null;
    public ?array $securityRequirements = null;
    public ?array $securitySchemes = null;
    public ?array $signatures = null;
    public ?array $skills = null;
    public ?array $supportedInterfaces = null;
    public ?string $version = null;
}

/** Request payload for Agent#list. */
class AgentListMatch
{
    public ?array $capability = null;
    public ?array $input_mode = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?array $output_mode = null;
    public ?array $skill = null;
}

/** AgentCard entity data model. */
class AgentCard
{
    public ?array $capabilities = null;
    public ?array $defaultInputModes = null;
    public ?array $defaultOutputModes = null;
    public ?string $description = null;
    public ?string $documentationUrl = null;
    public ?string $iconUrl = null;
    public ?string $name = null;
    public ?string $protocolVersion = null;
    public ?array $provider = null;
    public ?array $securityRequirements = null;
    public ?array $securitySchemes = null;
    public ?array $signatures = null;
    public ?array $skills = null;
    public ?array $supportedInterfaces = null;
    public ?string $version = null;
}

/** Request payload for AgentCard#list. */
class AgentCardListMatch
{
    public ?array $capabilities = null;
    public ?array $defaultInputModes = null;
    public ?array $defaultOutputModes = null;
    public ?string $description = null;
    public ?string $documentationUrl = null;
    public ?string $iconUrl = null;
    public ?string $name = null;
    public ?string $protocolVersion = null;
    public ?array $provider = null;
    public ?array $securityRequirements = null;
    public ?array $securitySchemes = null;
    public ?array $signatures = null;
    public ?array $skills = null;
    public ?array $supportedInterfaces = null;
    public ?string $version = null;
}

/** AiCatalog entity data model. */
class AiCatalog
{
    public ?array $capabilities = null;
    public ?string $description = null;
    public ?string $displayName = null;
    public string $identifier;
    public ?array $representativeQueries = null;
    public ?array $tags = null;
    public string $type;
    public ?string $updatedAt = null;
    public ?string $url = null;
    public ?string $version = null;
}

/** Request payload for AiCatalog#list. */
class AiCatalogListMatch
{
    public ?array $capabilities = null;
    public ?string $description = null;
    public ?string $displayName = null;
    public ?string $identifier = null;
    public ?array $representativeQueries = null;
    public ?array $tags = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
    public ?string $version = null;
}

/** ArdExplore entity data model. */
class ArdExplore
{
    public ?array $query = null;
    public array $resultType;
}

/** Request payload for ArdExplore#create. */
class ArdExploreCreateData
{
    public ?array $query = null;
    public array $resultType;
}

/** ArdSearch entity data model. */
class ArdSearch
{
    public ?string $federation = null;
    public ?int $pageSize = null;
    public ?string $pageToken = null;
    public array $query;
    public array $results;
}

/** Request payload for ArdSearch#create. */
class ArdSearchCreateData
{
    public ?string $federation = null;
    public ?int $pageSize = null;
    public ?string $pageToken = null;
    public array $query;
    public array $results;
}

/** Artifact entity data model. */
class Artifact
{
    public string $artifactId;
    public string $artifactType;
    public array $artifacts;
    public int $count;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?string $id = null;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public ?string $name = null;
    public string $owner;
    public array $versions;
}

/** Request payload for Artifact#load. */
class ArtifactLoadMatch
{
    public int $global_id;
    public ?string $reference = null;
    public ?bool $return_artifact_type = null;
}

/** Request payload for Artifact#list. */
class ArtifactListMatch
{
    public ?string $artifact_id = null;
    public ?string $artifact_type = null;
    public ?int $content_id = null;
    public ?string $description = null;
    public ?int $global_id = null;
    public ?string $group_id = null;
    public ?array $label = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
    public ?bool $skip_count = null;
}

/** Request payload for Artifact#create. */
class ArtifactCreateData
{
    public ?string $artifact_type = null;
    public ?bool $canonical = null;
    public ?string $group_id = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
    public ?bool $skip_count = null;
    public string $artifactId;
    public string $artifactType;
    public array $artifacts;
    public int $count;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?string $id = null;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public ?string $name = null;
    public string $owner;
    public array $versions;
}

/** Request payload for Artifact#remove. */
class ArtifactRemoveMatch
{
    public string $group_id;
    public ?string $id = null;
}

/** ArtifactReference entity data model. */
class ArtifactReference
{
    public string $artifactId;
    public string $content;
    public string $contentType;
    public ?string $encoding = null;
    public string $groupId;
    public string $name;
    public ?array $references = null;
    public ?string $version = null;
}

/** Request payload for ArtifactReference#list. */
class ArtifactReferenceListMatch
{
    public int $global_id_id;
    public ?string $ref_type = null;
}

/** Request payload for ArtifactReference#create. */
class ArtifactReferenceCreateData
{
    public ?string $artifact_type = null;
    public string $artifactId;
    public string $content;
    public string $contentType;
    public ?string $encoding = null;
    public string $groupId;
    public string $name;
    public ?array $references = null;
    public ?string $version = null;
}

/** ArtifactRule entity data model. */
class ArtifactRule
{
    public string $config;
    public ?string $id = null;
    public ?string $ruleType = null;
}

/** Request payload for ArtifactRule#create. */
class ArtifactRuleCreateData
{
    public string $group_id;
    public string $id;
    public string $config;
    public ?string $ruleType = null;
}

/** Request payload for ArtifactRule#remove. */
class ArtifactRuleRemoveMatch
{
    public ?string $artifact_id = null;
    public string $group_id;
    public string $id;
}

/** ArtifactType entity data model. */
class ArtifactType
{
    public ?string $name = null;
}

/** Request payload for ArtifactType#list. */
class ArtifactTypeListMatch
{
    public ?string $name = null;
}

/** Branch entity data model. */
class Branch
{
    public string $artifactId;
    public string $branchId;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?string $id = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public string $owner;
    public bool $systemDefined;
    public ?array $versions = null;
}

/** Request payload for Branch#load. */
class BranchLoadMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $id;
}

/** Request payload for Branch#create. */
class BranchCreateData
{
    public string $artifact_id;
    public string $group_id;
    public string $artifactId;
    public string $branchId;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?string $id = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public string $owner;
    public bool $systemDefined;
    public ?array $versions = null;
}

/** Request payload for Branch#update. */
class BranchUpdateData
{
    public string $artifact_id;
    public string $group_id;
    public string $id;
    public ?string $artifactId = null;
    public ?string $branchId = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?string $groupId = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $owner = null;
    public ?bool $systemDefined = null;
    public ?array $versions = null;
}

/** Request payload for Branch#remove. */
class BranchRemoveMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $id;
}

/** Comment entity data model. */
class Comment
{
    public string $commentId;
    public string $createdOn;
    public string $owner;
    public string $value;
}

/** Request payload for Comment#list. */
class CommentListMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $version_expression;
}

/** Request payload for Comment#create. */
class CommentCreateData
{
    public string $artifact_id;
    public string $group_id;
    public string $version_expression;
    public string $commentId;
    public string $createdOn;
    public string $owner;
    public string $value;
}

/** ConfigurationProperty entity data model. */
class ConfigurationProperty
{
    public string $description;
    public ?string $id = null;
    public string $label;
    public string $name;
    public string $type;
    public string $value;
}

/** Request payload for ConfigurationProperty#load. */
class ConfigurationPropertyLoadMatch
{
    public string $id;
}

/** Request payload for ConfigurationProperty#list. */
class ConfigurationPropertyListMatch
{
    public ?string $description = null;
    public ?string $id = null;
    public ?string $label = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $value = null;
}

/** ConsumerVersionHeatmap entity data model. */
class ConsumerVersionHeatmap
{
    public string $clientId;
    public ?bool $driftAlert = null;
    public ?array $versions = null;
    public ?int $versionsBehind = null;
}

/** Request payload for ConsumerVersionHeatmap#list. */
class ConsumerVersionHeatmapListMatch
{
    public string $artifact_id;
    public string $group_id;
}

/** Content entity data model. */
class Content
{
}

/** Request payload for Content#create. */
class ContentCreateData
{
    public string $artifact_type;
}

/** Contract entity data model. */
class Contract
{
    public string $artifactId;
    public string $artifactType;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?string $id = null;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public ?string $name = null;
    public string $owner;
}

/** Request payload for Contract#load. */
class ContractLoadMatch
{
    public string $group_id;
    public string $id;
}

/** Request payload for Contract#list. */
class ContractListMatch
{
    public ?string $compatibility_group = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
    public ?string $owner_team = null;
    public ?string $status = null;
}

/** Request payload for Contract#create. */
class ContractCreateData
{
    public string $artifact_id;
    public string $group_id;
    public ?string $version_id = null;
    public string $artifactId;
    public string $artifactType;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?string $id = null;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public ?string $name = null;
    public string $owner;
}

/** Request payload for Contract#update. */
class ContractUpdateData
{
    public string $artifact_id;
    public string $group_id;
    public ?string $artifactId = null;
    public ?string $artifactType = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?string $groupId = null;
    public ?string $id = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $name = null;
    public ?string $owner = null;
}

/** Request payload for Contract#remove. */
class ContractRemoveMatch
{
    public string $group_id;
    public string $id;
}

/** ContractRule entity data model. */
class ContractRule
{
    public ?string $artifactId = null;
    public ?int $globalId = null;
    public ?string $groupId = null;
    public array $rule;
    public ?string $ruleCategory = null;
}

/** Request payload for ContractRule#list. */
class ContractRuleListMatch
{
    public string $tag;
}

/** ContractRuleSet entity data model. */
class ContractRuleSet
{
    public ?array $domainRules = null;
    public ?array $migrationRules = null;
}

/** Request payload for ContractRuleSet#list. */
class ContractRuleSetListMatch
{
    public ?array $domainRules = null;
    public ?array $migrationRules = null;
}

/** Request payload for ContractRuleSet#update. */
class ContractRuleSetUpdateData
{
    public ?array $domainRules = null;
    public ?array $migrationRules = null;
}

/** CreateArtifact entity data model. */
class CreateArtifact
{
    public array $artifact;
    public string $artifactId;
    public ?string $artifactType = null;
    public ?string $description = null;
    public array $firstVersion;
    public ?array $labels = null;
    public ?string $name = null;
    public array $version;
}

/** Request payload for CreateArtifact#create. */
class CreateArtifactCreateData
{
    public string $group_id;
    public ?bool $canonical = null;
    public ?bool $dry_run = null;
    public ?string $if_exist = null;
    public array $artifact;
    public string $artifactId;
    public ?string $artifactType = null;
    public ?string $description = null;
    public array $firstVersion;
    public ?array $labels = null;
    public ?string $name = null;
    public array $version;
}

/** DeprecationReadiness entity data model. */
class DeprecationReadiness
{
    public ?string $clientId = null;
    public ?int $fetchCount = null;
    public ?int $lastFetched = null;
}

/** Request payload for DeprecationReadiness#list. */
class DeprecationReadinessListMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $version_id;
}

/** DownloadRef entity data model. */
class DownloadRef
{
    public string $downloadId;
    public ?string $href = null;
}

/** Request payload for DownloadRef#load. */
class DownloadRefLoadMatch
{
    public ?bool $for_browser = null;
    public ?string $group_id = null;
}

/** GitOp entity data model. */
class GitOp
{
    public string $ref;
    public string $repoId;
    public ?string $type = null;
}

/** Request payload for GitOp#create. */
class GitOpCreateData
{
    public string $ref;
    public string $repoId;
    public ?string $type = null;
}

/** Request payload for GitOp#remove. */
class GitOpRemoveMatch
{
    public string $task_id;
}

/** GitOpsStatus entity data model. */
class GitOpsStatus
{
    public ?string $context = null;
    public string $detail;
    public ?string $source = null;
}

/** Request payload for GitOpsStatus#list. */
class GitOpsStatusListMatch
{
    public ?string $context = null;
    public ?string $detail = null;
    public ?string $source = null;
}

/** GitOpsValidateTask entity data model. */
class GitOpsValidateTask
{
    public ?int $artifactCount = null;
    public ?string $completedAt = null;
    public ?string $createdAt = null;
    public ?array $errors = null;
    public ?int $groupCount = null;
    public ?string $ref = null;
    public ?string $repoId = null;
    public ?string $result = null;
    public string $state;
    public string $taskId;
    public ?string $type = null;
    public ?int $versionCount = null;
}

/** Request payload for GitOpsValidateTask#load. */
class GitOpsValidateTaskLoadMatch
{
    public string $task_id;
}

/** Request payload for GitOpsValidateTask#list. */
class GitOpsValidateTaskListMatch
{
    public ?int $artifactCount = null;
    public ?string $completedAt = null;
    public ?string $createdAt = null;
    public ?array $errors = null;
    public ?int $groupCount = null;
    public ?string $ref = null;
    public ?string $repoId = null;
    public ?string $result = null;
    public ?string $state = null;
    public ?string $taskId = null;
    public ?string $type = null;
    public ?int $versionCount = null;
}

/** GlobalRule entity data model. */
class GlobalRule
{
    public string $config;
    public ?string $id = null;
    public ?string $ruleType = null;
}

/** Request payload for GlobalRule#create. */
class GlobalRuleCreateData
{
    public string $config;
    public ?string $id = null;
    public ?string $ruleType = null;
}

/** Request payload for GlobalRule#remove. */
class GlobalRuleRemoveMatch
{
    public string $id;
}

/** Group entity data model. */
class Group
{
    public ?string $artifactsType = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?string $groupId = null;
    public ?string $id = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $owner = null;
    public ?array $properties = null;
}

/** Request payload for Group#load. */
class GroupLoadMatch
{
    public string $id;
}

/** Request payload for Group#list. */
class GroupListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
}

/** Request payload for Group#create. */
class GroupCreateData
{
    public ?string $artifactsType = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?string $groupId = null;
    public ?string $id = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $owner = null;
    public ?array $properties = null;
}

/** Request payload for Group#update. */
class GroupUpdateData
{
    public string $id;
    public ?string $artifactsType = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?string $groupId = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $owner = null;
    public ?array $properties = null;
}

/** Request payload for Group#remove. */
class GroupRemoveMatch
{
    public string $id;
}

/** GroupRule entity data model. */
class GroupRule
{
    public string $config;
    public ?string $id = null;
    public ?string $ruleType = null;
}

/** Request payload for GroupRule#create. */
class GroupRuleCreateData
{
    public string $id;
    public string $config;
    public ?string $ruleType = null;
}

/** Request payload for GroupRule#remove. */
class GroupRuleRemoveMatch
{
    public ?string $group_id = null;
    public string $id;
}

/** KafkaSql entity data model. */
class KafkaSql
{
    public string $snapshotId;
}

/** Request payload for KafkaSql#create. */
class KafkaSqlCreateData
{
    public string $snapshotId;
}

/** McpTool entity data model. */
class McpTool
{
    public ?string $artifactId = null;
    public ?int $createdOn = null;
    public ?string $description = null;
    public ?string $groupId = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?array $parameters = null;
    public ?string $title = null;
}

/** Request payload for McpTool#list. */
class McpToolListMatch
{
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?array $parameter = null;
}

/** Metadata entity data model. */
class Metadata
{
    public ?string $artifactId = null;
    public ?string $artifactType = null;
    public ?int $contentId = null;
    public ?array $contractMetadata = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?int $globalId = null;
    public ?string $groupId = null;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public ?string $name = null;
    public ?string $owner = null;
    public ?int $version = null;
}

/** Request payload for Metadata#load. */
class MetadataLoadMatch
{
    public string $artifact_id;
    public string $group_id;
    public ?string $version_expression = null;
}

/** Request payload for Metadata#create. */
class MetadataCreateData
{
    public string $artifact_id;
    public string $group_id;
    public string $version_expression;
    public ?string $artifactId = null;
    public ?string $artifactType = null;
    public ?int $contentId = null;
    public ?array $contractMetadata = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?int $globalId = null;
    public ?string $groupId = null;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public ?string $name = null;
    public ?string $owner = null;
    public ?int $version = null;
}

/** Request payload for Metadata#update. */
class MetadataUpdateData
{
    public string $artifact_id;
    public string $group_id;
    public ?string $version_expression = null;
    public ?string $artifactId = null;
    public ?string $artifactType = null;
    public ?int $contentId = null;
    public ?array $contractMetadata = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?int $globalId = null;
    public ?string $groupId = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?int $version = null;
}

/** OdcsContractResult entity data model. */
class OdcsContractResult
{
    public ?int $labelsApplied = null;
    public ?int $rulesApplied = null;
    public ?int $tagsApplied = null;
    public ?array $warnings = null;
}

/** Request payload for OdcsContractResult#create. */
class OdcsContractResultCreateData
{
    public string $group_id;
    public ?int $labelsApplied = null;
    public ?int $rulesApplied = null;
    public ?int $tagsApplied = null;
    public ?array $warnings = null;
}

/** Request payload for OdcsContractResult#update. */
class OdcsContractResultUpdateData
{
    public string $contract_id;
    public string $group_id;
    public ?int $labelsApplied = null;
    public ?int $rulesApplied = null;
    public ?int $tagsApplied = null;
    public ?array $warnings = null;
}

/** OdcsContractSummary entity data model. */
class OdcsContractSummary
{
    public ?string $contractId = null;
    public ?string $name = null;
}

/** Request payload for OdcsContractSummary#list. */
class OdcsContractSummaryListMatch
{
    public string $group_id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** ReferenceGraph entity data model. */
class ReferenceGraph
{
    public array $edges;
    public array $metadata;
    public array $nodes;
    public array $root;
}

/** Request payload for ReferenceGraph#list. */
class ReferenceGraphListMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $version_id;
    public ?int $depth = null;
    public ?string $direction = null;
}

/** RoleMapping entity data model. */
class RoleMapping
{
    public ?string $id = null;
    public string $principalId;
    public ?string $principalName = null;
    public string $role;
}

/** Request payload for RoleMapping#load. */
class RoleMappingLoadMatch
{
    public string $id;
}

/** Request payload for RoleMapping#list. */
class RoleMappingListMatch
{
    public ?int $limit = null;
    public ?int $offset = null;
}

/** Rule entity data model. */
class Rule
{
    public string $config;
    public ?string $id = null;
    public ?string $ruleType = null;
}

/** Request payload for Rule#load. */
class RuleLoadMatch
{
    public ?string $artifact_id = null;
    public ?string $group_id = null;
    public string $id;
}

/** Request payload for Rule#list. */
class RuleListMatch
{
    public ?string $config = null;
    public ?string $id = null;
    public ?string $ruleType = null;
}

/** Request payload for Rule#update. */
class RuleUpdateData
{
    public ?string $artifact_id = null;
    public ?string $group_id = null;
    public string $id;
    public ?string $config = null;
    public ?string $ruleType = null;
}

/** SearchedBranch entity data model. */
class SearchedBranch
{
    public string $artifactId;
    public string $branchId;
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public string $modifiedBy;
    public string $modifiedOn;
    public string $owner;
    public bool $systemDefined;
}

/** Request payload for SearchedBranch#list. */
class SearchedBranchListMatch
{
    public string $artifact_id;
    public string $group_id;
    public ?int $limit = null;
    public ?int $offset = null;
}

/** SearchedGroup entity data model. */
class SearchedGroup
{
    public string $createdOn;
    public ?string $description = null;
    public string $groupId;
    public ?array $labels = null;
    public string $modifiedBy;
    public string $modifiedOn;
    public string $owner;
}

/** Request payload for SearchedGroup#list. */
class SearchedGroupListMatch
{
    public ?string $description = null;
    public ?string $group_id = null;
    public ?array $label = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
}

/** SystemInfo entity data model. */
class SystemInfo
{
    public ?string $builtOn = null;
    public ?string $description = null;
    public ?string $name = null;
    public ?string $version = null;
}

/** Request payload for SystemInfo#load. */
class SystemInfoLoadMatch
{
    public ?string $builtOn = null;
    public ?string $description = null;
    public ?string $name = null;
    public ?string $version = null;
}

/** UsageSummary entity data model. */
class UsageSummary
{
    public int $active;
    public int $dead;
    public int $stale;
}

/** Request payload for UsageSummary#load. */
class UsageSummaryLoadMatch
{
    public ?int $active = null;
    public ?int $dead = null;
    public ?int $stale = null;
}

/** UserInfo entity data model. */
class UserInfo
{
    public ?bool $admin = null;
    public ?bool $developer = null;
    public ?string $displayName = null;
    public ?string $username = null;
    public ?bool $viewer = null;
}

/** Request payload for UserInfo#load. */
class UserInfoLoadMatch
{
    public ?bool $admin = null;
    public ?bool $developer = null;
    public ?string $displayName = null;
    public ?string $username = null;
    public ?bool $viewer = null;
}

/** UserInterfaceConfig entity data model. */
class UserInterfaceConfig
{
    public array $auth;
    public ?array $features = null;
    public ?array $ui = null;
}

/** Request payload for UserInterfaceConfig#load. */
class UserInterfaceConfigLoadMatch
{
    public ?array $auth = null;
    public ?array $features = null;
    public ?array $ui = null;
}

/** Version entity data model. */
class Version
{
    public string $artifactId;
    public string $artifactType;
    public ?array $branches = null;
    public array $content;
    public int $contentId;
    public int $count;
    public string $createdOn;
    public ?string $description = null;
    public int $globalId;
    public ?string $groupId = null;
    public ?string $id = null;
    public ?bool $isDraft = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $name = null;
    public string $owner;
    public string $state;
    public string $value;
    public ?string $version = null;
    public array $versions;
}

/** Request payload for Version#load. */
class VersionLoadMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $version_expression;
    public ?bool $canonical = null;
    public ?string $reference = null;
}

/** Request payload for Version#list. */
class VersionListMatch
{
    public ?string $artifact_id = null;
    public ?string $artifact_type = null;
    public ?string $content = null;
    public ?int $content_id = null;
    public ?string $description = null;
    public ?int $global_id = null;
    public ?string $group_id = null;
    public ?array $label = null;
    public ?int $limit = null;
    public ?string $name = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
    public ?bool $skip_count = null;
    public ?string $state = null;
    public ?string $structure = null;
    public ?string $version = null;
}

/** Request payload for Version#create. */
class VersionCreateData
{
    public ?string $artifact_id = null;
    public ?string $artifact_type = null;
    public ?bool $canonical = null;
    public ?string $group_id = null;
    public ?int $limit = null;
    public ?int $offset = null;
    public ?string $order = null;
    public ?string $orderby = null;
    public ?bool $skip_count = null;
    public ?string $state = null;
    public string $artifactId;
    public string $artifactType;
    public ?array $branches = null;
    public array $content;
    public int $contentId;
    public int $count;
    public string $createdOn;
    public ?string $description = null;
    public int $globalId;
    public ?string $groupId = null;
    public ?string $id = null;
    public ?bool $isDraft = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $name = null;
    public string $owner;
    public string $value;
    public ?string $version = null;
    public array $versions;
}

/** Request payload for Version#update. */
class VersionUpdateData
{
    public string $artifact_id;
    public string $comment_id;
    public string $group_id;
    public string $version_id;
    public ?string $artifactId = null;
    public ?string $artifactType = null;
    public ?array $branches = null;
    public ?array $content = null;
    public ?int $contentId = null;
    public ?int $count = null;
    public ?string $createdOn = null;
    public ?string $description = null;
    public ?int $globalId = null;
    public ?string $groupId = null;
    public ?string $id = null;
    public ?bool $isDraft = null;
    public ?array $labels = null;
    public ?string $modifiedBy = null;
    public ?string $modifiedOn = null;
    public ?string $name = null;
    public ?string $owner = null;
    public ?string $state = null;
    public ?string $value = null;
    public ?string $version = null;
    public ?array $versions = null;
}

/** Request payload for Version#remove. */
class VersionRemoveMatch
{
    public string $artifact_id;
    public ?string $comment_id = null;
    public string $group_id;
    public ?string $version_id = null;
    public ?string $id = null;
}

/** WellKnown entity data model. */
class WellKnown
{
    public ?string $id = null;
}

/** Request payload for WellKnown#load. */
class WellKnownLoadMatch
{
    public string $artifact_id;
    public string $group_id;
    public ?string $version = null;
}

/** WrappedVersionState entity data model. */
class WrappedVersionState
{
    public string $state;
}

/** Request payload for WrappedVersionState#load. */
class WrappedVersionStateLoadMatch
{
    public string $artifact_id;
    public string $group_id;
    public string $version_expression;
}

