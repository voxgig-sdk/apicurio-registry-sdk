-- Typed models for the ApicurioRegistry SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Admin
---@field role string
---@field value string

---@class AdminCreateData
---@field require_empty_registry? boolean
---@field role string
---@field value string

---@class AdminUpdateData
---@field principal_id string
---@field role? string
---@field value? string

---@class AdminRemoveMatch
---@field principal_id string

---@class Agent
---@field capabilities? table
---@field defaultInputModes? table
---@field defaultOutputModes? table
---@field description? string
---@field documentationUrl? string
---@field iconUrl? string
---@field name? string
---@field protocolVersion? string
---@field provider? table
---@field securityRequirements? table
---@field securitySchemes? table
---@field signatures? table
---@field skills? table
---@field supportedInterfaces? table
---@field version? string

---@class AgentListMatch
---@field capabilities? table
---@field defaultInputModes? table
---@field defaultOutputModes? table
---@field description? string
---@field documentationUrl? string
---@field iconUrl? string
---@field name? string
---@field protocolVersion? string
---@field provider? table
---@field securityRequirements? table
---@field securitySchemes? table
---@field signatures? table
---@field skills? table
---@field supportedInterfaces? table
---@field version? string

---@class AgentCard
---@field capabilities? table
---@field defaultInputModes? table
---@field defaultOutputModes? table
---@field description? string
---@field documentationUrl? string
---@field iconUrl? string
---@field name? string
---@field protocolVersion? string
---@field provider? table
---@field securityRequirements? table
---@field securitySchemes? table
---@field signatures? table
---@field skills? table
---@field supportedInterfaces? table
---@field version? string

---@class AgentCardListMatch
---@field capabilities? table
---@field defaultInputModes? table
---@field defaultOutputModes? table
---@field description? string
---@field documentationUrl? string
---@field iconUrl? string
---@field name? string
---@field protocolVersion? string
---@field provider? table
---@field securityRequirements? table
---@field securitySchemes? table
---@field signatures? table
---@field skills? table
---@field supportedInterfaces? table
---@field version? string

---@class AiCatalog
---@field capabilities? table
---@field description? string
---@field displayName? string
---@field identifier string
---@field representativeQueries? table
---@field tags? table
---@field type string
---@field updatedAt? string
---@field url? string
---@field version? string

---@class AiCatalogListMatch
---@field capabilities? table
---@field description? string
---@field displayName? string
---@field identifier? string
---@field representativeQueries? table
---@field tags? table
---@field type? string
---@field updatedAt? string
---@field url? string
---@field version? string

---@class ArdExplore
---@field facets? table
---@field query? table
---@field resultType? string

---@class ArdExploreCreateData
---@field facets? table
---@field query? table
---@field resultType? string

---@class ArdSearch
---@field federation? string
---@field pageSize? number
---@field pageToken? string
---@field query table
---@field results table

---@class ArdSearchCreateData
---@field federation? string
---@field pageSize? number
---@field pageToken? string
---@field query table
---@field results table

---@class Artifact
---@field artifactId string
---@field artifactType string
---@field artifacts table
---@field count number
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field name? string
---@field owner string
---@field versions table

---@class ArtifactLoadMatch
---@field global_id number
---@field reference? string
---@field return_artifact_type? boolean

---@class ArtifactListMatch
---@field artifact_id? string
---@field artifact_type? string
---@field content_id? number
---@field description? string
---@field global_id? number
---@field group_id? string
---@field label? table
---@field limit? number
---@field name? string
---@field offset? number
---@field order? string
---@field orderby? string
---@field skip_count? boolean

---@class ArtifactCreateData
---@field artifact_type? string
---@field canonical? boolean
---@field group_id? string
---@field limit? number
---@field offset? number
---@field order? string
---@field orderby? string
---@field skip_count? boolean
---@field artifactId string
---@field artifactType string
---@field artifacts table
---@field count number
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field name? string
---@field owner string
---@field versions table

---@class ArtifactRemoveMatch
---@field group_id string
---@field id? string

---@class ArtifactReference
---@field artifactId string
---@field content string
---@field contentType string
---@field encoding? string
---@field groupId string
---@field name string
---@field references? table
---@field version? string

---@class ArtifactReferenceListMatch
---@field global_id_id number
---@field ref_type? string

---@class ArtifactReferenceCreateData
---@field artifact_type? string
---@field artifactId string
---@field content string
---@field contentType string
---@field encoding? string
---@field groupId string
---@field name string
---@field references? table
---@field version? string

---@class ArtifactRule
---@field config string
---@field id? string
---@field ruleType? string

---@class ArtifactRuleCreateData
---@field group_id string
---@field id string
---@field config string
---@field ruleType? string

---@class ArtifactRuleRemoveMatch
---@field artifact_id? string
---@field group_id string
---@field id string

---@class ArtifactType
---@field name? string

---@class ArtifactTypeListMatch
---@field name? string

---@class Branch
---@field artifactId string
---@field branchId string
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field modifiedBy string
---@field modifiedOn string
---@field owner string
---@field systemDefined boolean
---@field versions? table

---@class BranchLoadMatch
---@field artifact_id string
---@field group_id string
---@field id string

---@class BranchCreateData
---@field artifact_id string
---@field group_id string
---@field artifactId string
---@field branchId string
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field modifiedBy string
---@field modifiedOn string
---@field owner string
---@field systemDefined boolean
---@field versions? table

---@class BranchUpdateData
---@field artifact_id string
---@field group_id string
---@field id string
---@field artifactId? string
---@field branchId? string
---@field createdOn? string
---@field description? string
---@field groupId? string
---@field modifiedBy? string
---@field modifiedOn? string
---@field owner? string
---@field systemDefined? boolean
---@field versions? table

---@class BranchRemoveMatch
---@field artifact_id string
---@field group_id string
---@field id string

---@class Comment
---@field commentId string
---@field createdOn string
---@field owner string
---@field value string

---@class CommentListMatch
---@field artifact_id string
---@field group_id string
---@field version_expression string

---@class CommentCreateData
---@field artifact_id string
---@field group_id string
---@field version_expression string
---@field commentId string
---@field createdOn string
---@field owner string
---@field value string

---@class ConfigurationProperty
---@field description string
---@field id? string
---@field label string
---@field name string
---@field type string
---@field value string

---@class ConfigurationPropertyLoadMatch
---@field id string

---@class ConfigurationPropertyListMatch
---@field description? string
---@field id? string
---@field label? string
---@field name? string
---@field type? string
---@field value? string

---@class ConsumerVersionHeatmap
---@field clientId string
---@field driftAlert? boolean
---@field versions? table
---@field versionsBehind? number

---@class ConsumerVersionHeatmapListMatch
---@field artifact_id string
---@field group_id string

---@class Content

---@class ContentCreateData
---@field artifact_type string

---@class Contract
---@field artifactId string
---@field artifactType string
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field name? string
---@field owner string

---@class ContractLoadMatch
---@field group_id string
---@field id string

---@class ContractListMatch
---@field compatibility_group? string
---@field limit? number
---@field offset? number
---@field order? string
---@field orderby? string
---@field owner_team? string
---@field status? string

---@class ContractCreateData
---@field artifact_id string
---@field group_id string
---@field version_id? string
---@field artifactId string
---@field artifactType string
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field name? string
---@field owner string

---@class ContractUpdateData
---@field artifact_id string
---@field group_id string
---@field artifactId? string
---@field artifactType? string
---@field createdOn? string
---@field description? string
---@field groupId? string
---@field id? string
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner? string

---@class ContractRemoveMatch
---@field group_id string
---@field id string

---@class ContractRule
---@field artifactId? string
---@field globalId? number
---@field groupId? string
---@field rule table
---@field ruleCategory? string

---@class ContractRuleListMatch
---@field tag string

---@class ContractRuleSet
---@field domainRules? table
---@field migrationRules? table

---@class ContractRuleSetListMatch
---@field domainRules? table
---@field migrationRules? table

---@class ContractRuleSetUpdateData
---@field domainRules? table
---@field migrationRules? table

---@class CreateArtifact
---@field artifact table
---@field artifactId string
---@field artifactType? string
---@field description? string
---@field firstVersion table
---@field labels? table
---@field name? string
---@field version table

---@class CreateArtifactCreateData
---@field group_id string
---@field canonical? boolean
---@field dry_run? boolean
---@field if_exist? string
---@field artifact table
---@field artifactId string
---@field artifactType? string
---@field description? string
---@field firstVersion table
---@field labels? table
---@field name? string
---@field version table

---@class DeprecationReadiness
---@field clientId? string
---@field fetchCount? number
---@field lastFetched? number

---@class DeprecationReadinessListMatch
---@field artifact_id string
---@field group_id string
---@field version_id string

---@class DownloadRef
---@field downloadId string
---@field href? string

---@class DownloadRefLoadMatch
---@field for_browser? boolean
---@field group_id? string

---@class GitOp

---@class GitOpCreateData

---@class GitOpRemoveMatch
---@field task_id string

---@class GitOpsStatus
---@field context? string
---@field detail string
---@field source? string

---@class GitOpsStatusListMatch
---@field context? string
---@field detail? string
---@field source? string

---@class GitOpsValidateTask
---@field artifactCount? number
---@field completedAt? string
---@field createdAt? string
---@field errors? table
---@field groupCount? number
---@field ref? string
---@field repoId? string
---@field result? string
---@field state string
---@field taskId string
---@field type? string
---@field versionCount? number

---@class GitOpsValidateTaskLoadMatch
---@field task_id string

---@class GitOpsValidateTaskListMatch
---@field artifactCount? number
---@field completedAt? string
---@field createdAt? string
---@field errors? table
---@field groupCount? number
---@field ref? string
---@field repoId? string
---@field result? string
---@field state? string
---@field taskId? string
---@field type? string
---@field versionCount? number

---@class GitOpsValidateTaskCreateData
---@field artifactCount? number
---@field completedAt? string
---@field createdAt? string
---@field errors? table
---@field groupCount? number
---@field ref? string
---@field repoId? string
---@field result? string
---@field state string
---@field taskId string
---@field type? string
---@field versionCount? number

---@class GlobalRule
---@field config string
---@field id? string
---@field ruleType? string

---@class GlobalRuleListMatch
---@field config? string
---@field id? string
---@field ruleType? string

---@class GlobalRuleCreateData
---@field config string
---@field id? string
---@field ruleType? string

---@class GlobalRuleRemoveMatch
---@field id string

---@class Group
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field owner string

---@class GroupLoadMatch
---@field id string

---@class GroupListMatch
---@field limit? number
---@field offset? number
---@field order? string
---@field orderby? string

---@class GroupCreateData
---@field createdOn string
---@field description? string
---@field groupId string
---@field id? string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field owner string

---@class GroupUpdateData
---@field id string
---@field createdOn? string
---@field description? string
---@field groupId? string
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field owner? string

---@class GroupRemoveMatch
---@field id string

---@class GroupRule
---@field config string
---@field id? string
---@field ruleType? string

---@class GroupRuleCreateData
---@field id string
---@field config string
---@field ruleType? string

---@class GroupRuleRemoveMatch
---@field group_id? string
---@field id string

---@class KafkaSql
---@field snapshotId string

---@class KafkaSqlCreateData
---@field snapshotId string

---@class Metadata
---@field artifactId string
---@field artifactType string
---@field contentId number
---@field contractMetadata? table
---@field createdOn string
---@field description? string
---@field globalId number
---@field groupId? string
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner string
---@field state? string
---@field version string

---@class MetadataLoadMatch
---@field artifact_id string
---@field group_id string
---@field version_expression? string

---@class MetadataCreateData
---@field artifact_id string
---@field group_id string
---@field version_expression string
---@field artifactId string
---@field artifactType string
---@field contentId number
---@field contractMetadata? table
---@field createdOn string
---@field description? string
---@field globalId number
---@field groupId? string
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner string
---@field state? string
---@field version string

---@class MetadataUpdateData
---@field artifact_id string
---@field group_id string
---@field version_expression? string
---@field artifactId? string
---@field artifactType? string
---@field contentId? number
---@field contractMetadata? table
---@field createdOn? string
---@field description? string
---@field globalId? number
---@field groupId? string
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner? string
---@field state? string
---@field version? string

---@class OdcsContractResult
---@field contractId? string
---@field projection? table
---@field version? string

---@class OdcsContractResultCreateData
---@field group_id string
---@field contractId? string
---@field projection? table
---@field version? string

---@class OdcsContractResultUpdateData
---@field contract_id string
---@field group_id string
---@field contractId? string
---@field projection? table
---@field version? string

---@class OdcsContractSummary
---@field contractId? string
---@field name? string

---@class OdcsContractSummaryListMatch
---@field group_id string
---@field limit? number
---@field offset? number

---@class ReferenceGraph
---@field edges table
---@field metadata table
---@field nodes table
---@field root table

---@class ReferenceGraphListMatch
---@field artifact_id string
---@field group_id string
---@field version_id string
---@field depth? number
---@field direction? string

---@class RoleMapping
---@field id? string
---@field principalId string
---@field principalName? string
---@field role string

---@class RoleMappingLoadMatch
---@field id string

---@class RoleMappingListMatch
---@field limit? number
---@field offset? number

---@class RoleMappingCreateData
---@field id? string
---@field principalId string
---@field principalName? string
---@field role string

---@class Rule
---@field config string
---@field id? string
---@field ruleType? string

---@class RuleLoadMatch
---@field artifact_id? string
---@field group_id? string
---@field id string

---@class RuleListMatch
---@field artifact_id? string
---@field group_id string

---@class RuleUpdateData
---@field artifact_id? string
---@field group_id? string
---@field id string
---@field config? string
---@field ruleType? string

---@class SearchedBranch
---@field artifactId string
---@field branchId string
---@field createdOn string
---@field description? string
---@field groupId string
---@field modifiedBy string
---@field modifiedOn string
---@field owner string
---@field systemDefined boolean

---@class SearchedBranchListMatch
---@field artifact_id string
---@field group_id string
---@field limit? number
---@field offset? number

---@class SearchedGroup
---@field createdOn string
---@field description? string
---@field groupId string
---@field labels? table
---@field modifiedBy string
---@field modifiedOn string
---@field owner string

---@class SearchedGroupListMatch
---@field description? string
---@field group_id? string
---@field label? table
---@field limit? number
---@field offset? number
---@field order? string
---@field orderby? string

---@class SystemInfo
---@field builtOn? string
---@field description? string
---@field name? string
---@field version? string

---@class SystemInfoLoadMatch
---@field builtOn? string
---@field description? string
---@field name? string
---@field version? string

---@class UsageSummary
---@field active number
---@field dead number
---@field stale number

---@class UsageSummaryLoadMatch
---@field active? number
---@field dead? number
---@field stale? number

---@class UserInfo
---@field admin? boolean
---@field developer? boolean
---@field displayName? string
---@field username? string
---@field viewer? boolean

---@class UserInfoLoadMatch
---@field admin? boolean
---@field developer? boolean
---@field displayName? string
---@field username? string
---@field viewer? boolean

---@class UserInterfaceConfig
---@field auth table
---@field features? table
---@field ui? table

---@class UserInterfaceConfigLoadMatch
---@field auth? table
---@field features? table
---@field ui? table

---@class Version
---@field artifactId string
---@field artifactType string
---@field branches? table
---@field content table
---@field contentId number
---@field count number
---@field createdOn string
---@field description? string
---@field globalId number
---@field groupId? string
---@field id? string
---@field isDraft? boolean
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner string
---@field state? string
---@field value string
---@field version string
---@field versions table

---@class VersionLoadMatch
---@field artifact_id string
---@field group_id string
---@field version_expression string
---@field canonical? boolean
---@field reference? string

---@class VersionListMatch
---@field artifact_id? string
---@field artifact_type? string
---@field content? string
---@field content_id? number
---@field description? string
---@field global_id? number
---@field group_id? string
---@field label? table
---@field limit? number
---@field name? string
---@field offset? number
---@field order? string
---@field orderby? string
---@field skip_count? boolean
---@field state? string
---@field structure? string
---@field version? string

---@class VersionCreateData
---@field artifact_id? string
---@field artifact_type? string
---@field canonical? boolean
---@field group_id? string
---@field limit? number
---@field offset? number
---@field order? string
---@field orderby? string
---@field skip_count? boolean
---@field state? string
---@field artifactId string
---@field artifactType string
---@field branches? table
---@field content table
---@field contentId number
---@field count number
---@field createdOn string
---@field description? string
---@field globalId number
---@field groupId? string
---@field id? string
---@field isDraft? boolean
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner string
---@field value string
---@field version string
---@field versions table

---@class VersionUpdateData
---@field artifact_id string
---@field comment_id string
---@field group_id string
---@field version_id string
---@field artifactId? string
---@field artifactType? string
---@field branches? table
---@field content? table
---@field contentId? number
---@field count? number
---@field createdOn? string
---@field description? string
---@field globalId? number
---@field groupId? string
---@field id? string
---@field isDraft? boolean
---@field labels? table
---@field modifiedBy? string
---@field modifiedOn? string
---@field name? string
---@field owner? string
---@field state? string
---@field value? string
---@field version? string
---@field versions? table

---@class VersionRemoveMatch
---@field artifact_id string
---@field comment_id? string
---@field group_id string
---@field version_id? string
---@field id? string

---@class WellKnown
---@field artifactId? string
---@field capabilities? table
---@field createdOn? number
---@field description? string
---@field groupId? string
---@field id? string
---@field name? string
---@field owner? string
---@field parameters? table
---@field skills? table
---@field supportedInterfaces? table
---@field title? string
---@field version? string

---@class WellKnownLoadMatch
---@field artifact_id string
---@field group_id string
---@field version? string

---@class WellKnownListMatch
---@field capability? table
---@field input_mode? table
---@field limit? number
---@field name? string
---@field offset? number
---@field output_mode? table
---@field skill? table

---@class WrappedVersionState
---@field state string

---@class WrappedVersionStateLoadMatch
---@field artifact_id string
---@field group_id string
---@field version_expression string

local M = {}

return M
