# Typed models for the ApicurioRegistry SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Admin(TypedDict):
    role: str
    value: str


class AdminCreateDataRequired(TypedDict):
    role: str
    value: str


class AdminCreateData(AdminCreateDataRequired, total=False):
    require_empty_registry: bool


class AdminUpdateDataRequired(TypedDict):
    principal_id: str


class AdminUpdateData(AdminUpdateDataRequired, total=False):
    role: str
    value: str


class AdminRemoveMatch(TypedDict):
    principal_id: str


class Agent(TypedDict, total=False):
    capabilities: dict
    defaultInputModes: list
    defaultOutputModes: list
    description: str
    documentationUrl: str
    iconUrl: str
    name: str
    protocolVersion: str
    provider: dict
    securityRequirements: list
    securitySchemes: dict
    signatures: list
    skills: list
    supportedInterfaces: list
    version: str


class AgentListMatch(TypedDict, total=False):
    capabilities: dict
    defaultInputModes: list
    defaultOutputModes: list
    description: str
    documentationUrl: str
    iconUrl: str
    name: str
    protocolVersion: str
    provider: dict
    securityRequirements: list
    securitySchemes: dict
    signatures: list
    skills: list
    supportedInterfaces: list
    version: str


class AgentCard(TypedDict, total=False):
    capabilities: dict
    defaultInputModes: list
    defaultOutputModes: list
    description: str
    documentationUrl: str
    iconUrl: str
    name: str
    protocolVersion: str
    provider: dict
    securityRequirements: list
    securitySchemes: dict
    signatures: list
    skills: list
    supportedInterfaces: list
    version: str


class AgentCardListMatch(TypedDict, total=False):
    capabilities: dict
    defaultInputModes: list
    defaultOutputModes: list
    description: str
    documentationUrl: str
    iconUrl: str
    name: str
    protocolVersion: str
    provider: dict
    securityRequirements: list
    securitySchemes: dict
    signatures: list
    skills: list
    supportedInterfaces: list
    version: str


class AiCatalogRequired(TypedDict):
    identifier: str
    type: str


class AiCatalog(AiCatalogRequired, total=False):
    capabilities: list
    description: str
    displayName: str
    representativeQueries: list
    tags: list
    updatedAt: str
    url: str
    version: str


class AiCatalogListMatch(TypedDict, total=False):
    capabilities: list
    description: str
    displayName: str
    identifier: str
    representativeQueries: list
    tags: list
    type: str
    updatedAt: str
    url: str
    version: str


class ArdExplore(TypedDict, total=False):
    facets: dict
    query: dict
    resultType: str


class ArdExploreCreateData(TypedDict, total=False):
    facets: dict
    query: dict
    resultType: str


class ArdSearchRequired(TypedDict):
    query: dict
    results: list


class ArdSearch(ArdSearchRequired, total=False):
    federation: str
    pageSize: int
    pageToken: str


class ArdSearchCreateDataRequired(TypedDict):
    query: dict
    results: list


class ArdSearchCreateData(ArdSearchCreateDataRequired, total=False):
    federation: str
    pageSize: int
    pageToken: str


class ArtifactRequired(TypedDict):
    artifactId: str
    artifactType: str
    artifacts: list
    count: int
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str
    versions: list


class Artifact(ArtifactRequired, total=False):
    description: str
    id: str
    labels: dict
    name: str


class ArtifactLoadMatchRequired(TypedDict):
    global_id: int


class ArtifactLoadMatch(ArtifactLoadMatchRequired, total=False):
    reference: str
    return_artifact_type: bool


class ArtifactListMatch(TypedDict, total=False):
    artifact_id: str
    artifact_type: str
    content_id: int
    description: str
    global_id: int
    group_id: str
    label: list
    limit: int
    name: str
    offset: int
    order: str
    orderby: str
    skip_count: bool


class ArtifactCreateDataRequired(TypedDict):
    artifactId: str
    artifactType: str
    artifacts: list
    count: int
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str
    versions: list


class ArtifactCreateData(ArtifactCreateDataRequired, total=False):
    artifact_type: str
    canonical: bool
    group_id: str
    limit: int
    offset: int
    order: str
    orderby: str
    skip_count: bool
    description: str
    id: str
    labels: dict
    name: str


class ArtifactRemoveMatchRequired(TypedDict):
    group_id: str


class ArtifactRemoveMatch(ArtifactRemoveMatchRequired, total=False):
    id: str


class ArtifactReferenceRequired(TypedDict):
    artifactId: str
    content: str
    contentType: str
    groupId: str
    name: str


class ArtifactReference(ArtifactReferenceRequired, total=False):
    encoding: str
    references: list
    version: str


class ArtifactReferenceListMatchRequired(TypedDict):
    global_id_id: int


class ArtifactReferenceListMatch(ArtifactReferenceListMatchRequired, total=False):
    ref_type: str


class ArtifactReferenceCreateDataRequired(TypedDict):
    artifactId: str
    content: str
    contentType: str
    groupId: str
    name: str


class ArtifactReferenceCreateData(ArtifactReferenceCreateDataRequired, total=False):
    artifact_type: str
    encoding: str
    references: list
    version: str


class ArtifactRuleRequired(TypedDict):
    config: str


class ArtifactRule(ArtifactRuleRequired, total=False):
    id: str
    ruleType: str


class ArtifactRuleCreateDataRequired(TypedDict):
    group_id: str
    id: str
    config: str


class ArtifactRuleCreateData(ArtifactRuleCreateDataRequired, total=False):
    ruleType: str


class ArtifactRuleRemoveMatchRequired(TypedDict):
    group_id: str
    id: str


class ArtifactRuleRemoveMatch(ArtifactRuleRemoveMatchRequired, total=False):
    artifact_id: str


class ArtifactType(TypedDict, total=False):
    name: str


class ArtifactTypeListMatch(TypedDict, total=False):
    name: str


class BranchRequired(TypedDict):
    artifactId: str
    branchId: str
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str
    systemDefined: bool


class Branch(BranchRequired, total=False):
    description: str
    id: str
    versions: list


class BranchLoadMatch(TypedDict):
    artifact_id: str
    group_id: str
    id: str


class BranchCreateDataRequired(TypedDict):
    artifact_id: str
    group_id: str
    artifactId: str
    branchId: str
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str
    systemDefined: bool


class BranchCreateData(BranchCreateDataRequired, total=False):
    description: str
    id: str
    versions: list


class BranchUpdateDataRequired(TypedDict):
    artifact_id: str
    group_id: str
    id: str


class BranchUpdateData(BranchUpdateDataRequired, total=False):
    artifactId: str
    branchId: str
    createdOn: str
    description: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str
    systemDefined: bool
    versions: list


class BranchRemoveMatch(TypedDict):
    artifact_id: str
    group_id: str
    id: str


class Comment(TypedDict):
    commentId: str
    createdOn: str
    owner: str
    value: str


class CommentListMatch(TypedDict):
    artifact_id: str
    group_id: str
    version_expression: str


class CommentCreateData(TypedDict):
    artifact_id: str
    group_id: str
    version_expression: str
    commentId: str
    createdOn: str
    owner: str
    value: str


class ConfigurationPropertyRequired(TypedDict):
    description: str
    label: str
    name: str
    type: str
    value: str


class ConfigurationProperty(ConfigurationPropertyRequired, total=False):
    id: str


class ConfigurationPropertyLoadMatch(TypedDict):
    id: str


class ConfigurationPropertyListMatch(TypedDict, total=False):
    description: str
    id: str
    label: str
    name: str
    type: str
    value: str


class ConsumerVersionHeatmapRequired(TypedDict):
    clientId: str


class ConsumerVersionHeatmap(ConsumerVersionHeatmapRequired, total=False):
    driftAlert: bool
    versions: dict
    versionsBehind: int


class ConsumerVersionHeatmapListMatch(TypedDict):
    artifact_id: str
    group_id: str


class Content(TypedDict):
    pass


class ContentCreateData(TypedDict):
    artifact_type: str


class ContractRequired(TypedDict):
    artifactId: str
    artifactType: str
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str


class Contract(ContractRequired, total=False):
    description: str
    id: str
    labels: dict
    name: str


class ContractLoadMatch(TypedDict):
    group_id: str
    id: str


class ContractListMatch(TypedDict, total=False):
    compatibility_group: str
    limit: int
    offset: int
    order: str
    orderby: str
    owner_team: str
    status: str


class ContractCreateDataRequired(TypedDict):
    artifact_id: str
    group_id: str
    artifactId: str
    artifactType: str
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str


class ContractCreateData(ContractCreateDataRequired, total=False):
    version_id: str
    description: str
    id: str
    labels: dict
    name: str


class ContractUpdateDataRequired(TypedDict):
    artifact_id: str
    group_id: str


class ContractUpdateData(ContractUpdateDataRequired, total=False):
    artifactId: str
    artifactType: str
    createdOn: str
    description: str
    groupId: str
    id: str
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str
    owner: str


class ContractRemoveMatch(TypedDict):
    group_id: str
    id: str


class ContractRuleRequired(TypedDict):
    rule: dict


class ContractRule(ContractRuleRequired, total=False):
    artifactId: str
    globalId: int
    groupId: str
    ruleCategory: str


class ContractRuleListMatch(TypedDict):
    tag: str


class ContractRuleSet(TypedDict, total=False):
    domainRules: list
    migrationRules: list


class ContractRuleSetListMatch(TypedDict, total=False):
    domainRules: list
    migrationRules: list


class ContractRuleSetUpdateData(TypedDict, total=False):
    domainRules: list
    migrationRules: list


class CreateArtifactRequired(TypedDict):
    artifact: dict
    artifactId: str
    firstVersion: dict
    version: dict


class CreateArtifact(CreateArtifactRequired, total=False):
    artifactType: str
    description: str
    labels: dict
    name: str


class CreateArtifactCreateDataRequired(TypedDict):
    group_id: str
    artifact: dict
    artifactId: str
    firstVersion: dict
    version: dict


class CreateArtifactCreateData(CreateArtifactCreateDataRequired, total=False):
    canonical: bool
    dry_run: bool
    if_exist: str
    artifactType: str
    description: str
    labels: dict
    name: str


class DeprecationReadiness(TypedDict, total=False):
    clientId: str
    fetchCount: int
    lastFetched: int


class DeprecationReadinessListMatch(TypedDict):
    artifact_id: str
    group_id: str
    version_id: str


class DownloadRefRequired(TypedDict):
    downloadId: str


class DownloadRef(DownloadRefRequired, total=False):
    href: str


class DownloadRefLoadMatch(TypedDict, total=False):
    for_browser: bool
    group_id: str


class GitOp(TypedDict):
    pass


class GitOpCreateData(TypedDict):
    pass


class GitOpRemoveMatch(TypedDict):
    task_id: str


class GitOpsStatusRequired(TypedDict):
    detail: str


class GitOpsStatus(GitOpsStatusRequired, total=False):
    context: str
    source: str


class GitOpsStatusListMatch(TypedDict, total=False):
    context: str
    detail: str
    source: str


class GitOpsValidateTaskRequired(TypedDict):
    state: str
    taskId: str


class GitOpsValidateTask(GitOpsValidateTaskRequired, total=False):
    artifactCount: int
    completedAt: str
    createdAt: str
    errors: list
    groupCount: int
    ref: str
    repoId: str
    result: str
    type: str
    versionCount: int


class GitOpsValidateTaskLoadMatch(TypedDict):
    task_id: str


class GitOpsValidateTaskListMatch(TypedDict, total=False):
    artifactCount: int
    completedAt: str
    createdAt: str
    errors: list
    groupCount: int
    ref: str
    repoId: str
    result: str
    state: str
    taskId: str
    type: str
    versionCount: int


class GitOpsValidateTaskCreateDataRequired(TypedDict):
    state: str
    taskId: str


class GitOpsValidateTaskCreateData(GitOpsValidateTaskCreateDataRequired, total=False):
    artifactCount: int
    completedAt: str
    createdAt: str
    errors: list
    groupCount: int
    ref: str
    repoId: str
    result: str
    type: str
    versionCount: int


class GlobalRuleRequired(TypedDict):
    config: str


class GlobalRule(GlobalRuleRequired, total=False):
    id: str
    ruleType: str


class GlobalRuleListMatch(TypedDict, total=False):
    config: str
    id: str
    ruleType: str


class GlobalRuleCreateDataRequired(TypedDict):
    config: str


class GlobalRuleCreateData(GlobalRuleCreateDataRequired, total=False):
    id: str
    ruleType: str


class GlobalRuleRemoveMatch(TypedDict):
    id: str


class GroupRequired(TypedDict):
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str


class Group(GroupRequired, total=False):
    description: str
    id: str
    labels: dict


class GroupLoadMatch(TypedDict):
    id: str


class GroupListMatch(TypedDict, total=False):
    limit: int
    offset: int
    order: str
    orderby: str


class GroupCreateDataRequired(TypedDict):
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str


class GroupCreateData(GroupCreateDataRequired, total=False):
    description: str
    id: str
    labels: dict


class GroupUpdateDataRequired(TypedDict):
    id: str


class GroupUpdateData(GroupUpdateDataRequired, total=False):
    createdOn: str
    description: str
    groupId: str
    labels: dict
    modifiedBy: str
    modifiedOn: str
    owner: str


class GroupRemoveMatch(TypedDict):
    id: str


class GroupRuleRequired(TypedDict):
    config: str


class GroupRule(GroupRuleRequired, total=False):
    id: str
    ruleType: str


class GroupRuleCreateDataRequired(TypedDict):
    id: str
    config: str


class GroupRuleCreateData(GroupRuleCreateDataRequired, total=False):
    ruleType: str


class GroupRuleRemoveMatchRequired(TypedDict):
    id: str


class GroupRuleRemoveMatch(GroupRuleRemoveMatchRequired, total=False):
    group_id: str


class KafkaSql(TypedDict):
    snapshotId: str


class KafkaSqlCreateData(TypedDict):
    snapshotId: str


class MetadataRequired(TypedDict):
    artifactId: str
    artifactType: str
    contentId: int
    createdOn: str
    globalId: int
    owner: str
    version: str


class Metadata(MetadataRequired, total=False):
    contractMetadata: dict
    description: str
    groupId: str
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str
    state: str


class MetadataLoadMatchRequired(TypedDict):
    artifact_id: str
    group_id: str


class MetadataLoadMatch(MetadataLoadMatchRequired, total=False):
    version_expression: str


class MetadataCreateDataRequired(TypedDict):
    artifact_id: str
    group_id: str
    version_expression: str
    artifactId: str
    artifactType: str
    contentId: int
    createdOn: str
    globalId: int
    owner: str
    version: str


class MetadataCreateData(MetadataCreateDataRequired, total=False):
    contractMetadata: dict
    description: str
    groupId: str
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str
    state: str


class MetadataUpdateDataRequired(TypedDict):
    artifact_id: str
    group_id: str


class MetadataUpdateData(MetadataUpdateDataRequired, total=False):
    version_expression: str
    artifactId: str
    artifactType: str
    contentId: int
    contractMetadata: dict
    createdOn: str
    description: str
    globalId: int
    groupId: str
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str
    owner: str
    state: str
    version: str


class OdcsContractResult(TypedDict, total=False):
    contractId: str
    projection: dict
    version: str


class OdcsContractResultCreateDataRequired(TypedDict):
    group_id: str


class OdcsContractResultCreateData(OdcsContractResultCreateDataRequired, total=False):
    contractId: str
    projection: dict
    version: str


class OdcsContractResultUpdateDataRequired(TypedDict):
    contract_id: str
    group_id: str


class OdcsContractResultUpdateData(OdcsContractResultUpdateDataRequired, total=False):
    contractId: str
    projection: dict
    version: str


class OdcsContractSummary(TypedDict, total=False):
    contractId: str
    name: str


class OdcsContractSummaryListMatchRequired(TypedDict):
    group_id: str


class OdcsContractSummaryListMatch(OdcsContractSummaryListMatchRequired, total=False):
    limit: int
    offset: int


class ReferenceGraph(TypedDict):
    edges: list
    metadata: dict
    nodes: list
    root: dict


class ReferenceGraphListMatchRequired(TypedDict):
    artifact_id: str
    group_id: str
    version_id: str


class ReferenceGraphListMatch(ReferenceGraphListMatchRequired, total=False):
    depth: int
    direction: str


class RoleMappingRequired(TypedDict):
    principalId: str
    role: str


class RoleMapping(RoleMappingRequired, total=False):
    id: str
    principalName: str


class RoleMappingLoadMatch(TypedDict):
    id: str


class RoleMappingListMatch(TypedDict, total=False):
    limit: int
    offset: int


class RoleMappingCreateDataRequired(TypedDict):
    principalId: str
    role: str


class RoleMappingCreateData(RoleMappingCreateDataRequired, total=False):
    id: str
    principalName: str


class RuleRequired(TypedDict):
    config: str


class Rule(RuleRequired, total=False):
    id: str
    ruleType: str


class RuleLoadMatchRequired(TypedDict):
    id: str


class RuleLoadMatch(RuleLoadMatchRequired, total=False):
    artifact_id: str
    group_id: str


class RuleListMatchRequired(TypedDict):
    group_id: str


class RuleListMatch(RuleListMatchRequired, total=False):
    artifact_id: str


class RuleUpdateDataRequired(TypedDict):
    id: str


class RuleUpdateData(RuleUpdateDataRequired, total=False):
    artifact_id: str
    group_id: str
    config: str
    ruleType: str


class SearchedBranchRequired(TypedDict):
    artifactId: str
    branchId: str
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str
    systemDefined: bool


class SearchedBranch(SearchedBranchRequired, total=False):
    description: str


class SearchedBranchListMatchRequired(TypedDict):
    artifact_id: str
    group_id: str


class SearchedBranchListMatch(SearchedBranchListMatchRequired, total=False):
    limit: int
    offset: int


class SearchedGroupRequired(TypedDict):
    createdOn: str
    groupId: str
    modifiedBy: str
    modifiedOn: str
    owner: str


class SearchedGroup(SearchedGroupRequired, total=False):
    description: str
    labels: dict


class SearchedGroupListMatch(TypedDict, total=False):
    description: str
    group_id: str
    label: list
    limit: int
    offset: int
    order: str
    orderby: str


class SystemInfo(TypedDict, total=False):
    builtOn: str
    description: str
    name: str
    version: str


class SystemInfoLoadMatch(TypedDict, total=False):
    builtOn: str
    description: str
    name: str
    version: str


class UsageSummary(TypedDict):
    active: int
    dead: int
    stale: int


class UsageSummaryLoadMatch(TypedDict, total=False):
    active: int
    dead: int
    stale: int


class UserInfo(TypedDict, total=False):
    admin: bool
    developer: bool
    displayName: str
    username: str
    viewer: bool


class UserInfoLoadMatch(TypedDict, total=False):
    admin: bool
    developer: bool
    displayName: str
    username: str
    viewer: bool


class UserInterfaceConfigRequired(TypedDict):
    auth: dict


class UserInterfaceConfig(UserInterfaceConfigRequired, total=False):
    features: dict
    ui: dict


class UserInterfaceConfigLoadMatch(TypedDict, total=False):
    auth: dict
    features: dict
    ui: dict


class VersionRequired(TypedDict):
    artifactId: str
    artifactType: str
    content: dict
    contentId: int
    count: int
    createdOn: str
    globalId: int
    owner: str
    value: str
    version: str
    versions: list


class Version(VersionRequired, total=False):
    branches: list
    description: str
    groupId: str
    id: str
    isDraft: bool
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str
    state: str


class VersionLoadMatchRequired(TypedDict):
    artifact_id: str
    group_id: str
    version_expression: str


class VersionLoadMatch(VersionLoadMatchRequired, total=False):
    canonical: bool
    reference: str


class VersionListMatch(TypedDict, total=False):
    artifact_id: str
    artifact_type: str
    content: str
    content_id: int
    description: str
    global_id: int
    group_id: str
    label: list
    limit: int
    name: str
    offset: int
    order: str
    orderby: str
    skip_count: bool
    state: str
    structure: str
    version: str


class VersionCreateDataRequired(TypedDict):
    artifactId: str
    artifactType: str
    content: dict
    contentId: int
    count: int
    createdOn: str
    globalId: int
    owner: str
    value: str
    version: str
    versions: list


class VersionCreateData(VersionCreateDataRequired, total=False):
    artifact_id: str
    artifact_type: str
    canonical: bool
    group_id: str
    limit: int
    offset: int
    order: str
    orderby: str
    skip_count: bool
    state: str
    branches: list
    description: str
    groupId: str
    id: str
    isDraft: bool
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str


class VersionUpdateDataRequired(TypedDict):
    artifact_id: str
    comment_id: str
    group_id: str
    version_id: str


class VersionUpdateData(VersionUpdateDataRequired, total=False):
    artifactId: str
    artifactType: str
    branches: list
    content: dict
    contentId: int
    count: int
    createdOn: str
    description: str
    globalId: int
    groupId: str
    id: str
    isDraft: bool
    labels: dict
    modifiedBy: str
    modifiedOn: str
    name: str
    owner: str
    state: str
    value: str
    version: str
    versions: list


class VersionRemoveMatchRequired(TypedDict):
    artifact_id: str
    group_id: str


class VersionRemoveMatch(VersionRemoveMatchRequired, total=False):
    comment_id: str
    version_id: str
    id: str


class WellKnown(TypedDict, total=False):
    artifactId: str
    capabilities: dict
    createdOn: int
    description: str
    groupId: str
    id: str
    name: str
    owner: str
    parameters: list
    skills: list
    supportedInterfaces: list
    title: str
    version: str


class WellKnownLoadMatchRequired(TypedDict):
    artifact_id: str
    group_id: str


class WellKnownLoadMatch(WellKnownLoadMatchRequired, total=False):
    version: str


class WellKnownListMatch(TypedDict, total=False):
    capability: list
    input_mode: list
    limit: int
    name: str
    offset: int
    output_mode: list
    skill: list


class WrappedVersionState(TypedDict):
    state: str


class WrappedVersionStateLoadMatch(TypedDict):
    artifact_id: str
    group_id: str
    version_expression: str
