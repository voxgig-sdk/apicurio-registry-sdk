// Typed models for the ApicurioRegistry SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Admin {
  role: string
  value: string
}

export interface AdminCreateData {
  require_empty_registry?: boolean
  role: string
  value: string

  // Selects a custom action instead of the plain create:
  //   'import'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AdminUpdateData {
  principal_id: string
  role?: string
  value?: string
}

export interface AdminRemoveMatch {
  principal_id: string
}

export interface Agent {
  capabilities?: Record<string, any>
  defaultInputModes?: any[]
  defaultOutputModes?: any[]
  description?: string
  documentationUrl?: string
  iconUrl?: string
  name?: string
  protocolVersion?: string
  provider?: Record<string, any>
  securityRequirements?: any[]
  securitySchemes?: Record<string, any>
  signatures?: any[]
  skills?: any[]
  supportedInterfaces?: any[]
  version?: string
}

export interface AgentListMatch {
  capabilities?: Record<string, any>
  defaultInputModes?: any[]
  defaultOutputModes?: any[]
  description?: string
  documentationUrl?: string
  iconUrl?: string
  name?: string
  protocolVersion?: string
  provider?: Record<string, any>
  securityRequirements?: any[]
  securitySchemes?: Record<string, any>
  signatures?: any[]
  skills?: any[]
  supportedInterfaces?: any[]
  version?: string
}

export interface AgentCard {
  capabilities?: Record<string, any>
  defaultInputModes?: any[]
  defaultOutputModes?: any[]
  description?: string
  documentationUrl?: string
  iconUrl?: string
  name?: string
  protocolVersion?: string
  provider?: Record<string, any>
  securityRequirements?: any[]
  securitySchemes?: Record<string, any>
  signatures?: any[]
  skills?: any[]
  supportedInterfaces?: any[]
  version?: string
}

export interface AgentCardListMatch {
  capabilities?: Record<string, any>
  defaultInputModes?: any[]
  defaultOutputModes?: any[]
  description?: string
  documentationUrl?: string
  iconUrl?: string
  name?: string
  protocolVersion?: string
  provider?: Record<string, any>
  securityRequirements?: any[]
  securitySchemes?: Record<string, any>
  signatures?: any[]
  skills?: any[]
  supportedInterfaces?: any[]
  version?: string
}

export interface AiCatalog {
  capabilities?: any[]
  description?: string
  displayName?: string
  identifier: string
  representativeQueries?: any[]
  tags?: any[]
  type: string
  updatedAt?: string
  url?: string
  version?: string
}

export interface AiCatalogListMatch {
  capabilities?: any[]
  description?: string
  displayName?: string
  identifier?: string
  representativeQueries?: any[]
  tags?: any[]
  type?: string
  updatedAt?: string
  url?: string
  version?: string
}

export interface ArdExplore {
  facets?: Record<string, any>
  query?: Record<string, any>
  resultType?: string
}

export interface ArdExploreCreateData {
  facets?: Record<string, any>
  query?: Record<string, any>
  resultType?: string
}

export interface ArdSearch {
  federation?: string
  pageSize?: number
  pageToken?: string
  query: Record<string, any>
  results: any[]
}

export interface ArdSearchCreateData {
  federation?: string
  pageSize?: number
  pageToken?: string
  query: Record<string, any>
  results: any[]
}

export interface Artifact {
  artifactId: string
  artifactType: string
  artifacts: any[]
  count: number
  createdOn: string
  description?: string
  groupId: string
  id?: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  name?: string
  owner: string
  versions: any[]
}

export interface ArtifactLoadMatch {
  global_id: number
  reference?: string
  return_artifact_type?: boolean
}

export interface ArtifactListMatch {
  artifact_id?: string
  artifact_type?: string
  content_id?: number
  description?: string
  global_id?: number
  group_id?: string
  label?: any[]
  limit?: number
  name?: string
  offset?: number
  order?: string
  orderby?: string
  skip_count?: boolean
}

export interface ArtifactCreateData {
  artifact_type?: string
  canonical?: boolean
  group_id?: string
  limit?: number
  offset?: number
  order?: string
  orderby?: string
  skip_count?: boolean
  artifactId: string
  artifactType: string
  artifacts: any[]
  count: number
  createdOn: string
  description?: string
  groupId: string
  id?: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  name?: string
  owner: string
  versions: any[]
}

export interface ArtifactRemoveMatch {
  group_id: string
  id?: string
}

export interface ArtifactReference {
  artifactId: string
  content: string
  contentType: string
  encoding?: string
  groupId: string
  name: string
  references?: any[]
  version?: string
}

export interface ArtifactReferenceListMatch {
  global_id_id: number
  ref_type?: string
}

export interface ArtifactReferenceCreateData {
  artifact_type?: string
  artifactId: string
  content: string
  contentType: string
  encoding?: string
  groupId: string
  name: string
  references?: any[]
  version?: string
}

export interface ArtifactRule {
  config: string
  id?: string
  ruleType?: string
}

export interface ArtifactRuleCreateData {
  group_id: string
  id: string
  config: string
  ruleType?: string
}

export interface ArtifactRuleRemoveMatch {
  artifact_id?: string
  group_id: string
  id: string
}

export interface ArtifactType {
  name?: string
}

export interface ArtifactTypeListMatch {
  name?: string
}

export interface Branch {
  artifactId: string
  branchId: string
  createdOn: string
  description?: string
  groupId: string
  id?: string
  modifiedBy: string
  modifiedOn: string
  owner: string
  systemDefined: boolean
  versions?: any[]
}

export interface BranchLoadMatch {
  artifact_id: string
  group_id: string
  id: string
}

export interface BranchCreateData {
  artifact_id: string
  group_id: string
  artifactId: string
  branchId: string
  createdOn: string
  description?: string
  groupId: string
  id?: string
  modifiedBy: string
  modifiedOn: string
  owner: string
  systemDefined: boolean
  versions?: any[]

  // Selects a custom action instead of the plain create:
  //   'version'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BranchUpdateData {
  artifact_id: string
  group_id: string
  id: string
  artifactId?: string
  branchId?: string
  createdOn?: string
  description?: string
  groupId?: string
  modifiedBy?: string
  modifiedOn?: string
  owner?: string
  systemDefined?: boolean
  versions?: any[]

  // Selects a custom action instead of the plain update:
  //   'version'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BranchRemoveMatch {
  artifact_id: string
  group_id: string
  id: string
}

export interface Comment {
  commentId: string
  createdOn: string
  owner: string
  value: string
}

export interface CommentListMatch {
  artifact_id: string
  group_id: string
  version_expression: string
}

export interface CommentCreateData {
  artifact_id: string
  group_id: string
  version_expression: string
  commentId: string
  createdOn: string
  owner: string
  value: string
}

export interface ConfigurationProperty {
  description: string
  id?: string
  label: string
  name: string
  type: string
  value: string
}

export interface ConfigurationPropertyLoadMatch {
  id: string
}

export interface ConfigurationPropertyListMatch {
  description?: string
  id?: string
  label?: string
  name?: string
  type?: string
  value?: string
}

export interface ConsumerVersionHeatmap {
  clientId: string
  driftAlert?: boolean
  versions?: Record<string, any>
  versionsBehind?: number
}

export interface ConsumerVersionHeatmapListMatch {
  artifact_id: string
  group_id: string
}

export interface Content {
}

export interface ContentCreateData {
  artifact_type: string

  // Selects a custom action instead of the plain create:
  //   'canonicalize'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Contract {
  artifactId: string
  artifactType: string
  createdOn: string
  description?: string
  groupId: string
  id?: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  name?: string
  owner: string
}

export interface ContractLoadMatch {
  group_id: string
  id: string

  // Selects a custom action instead of the plain load:
  //   'compatibility_group' | 'export' | 'metadata' | 'quality'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ContractListMatch {
  compatibility_group?: string
  limit?: number
  offset?: number
  order?: string
  orderby?: string
  owner_team?: string
  status?: string

  // Selects a custom action instead of the plain list:
  //   'audit'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ContractCreateData {
  artifact_id: string
  group_id: string
  version_id?: string
  artifactId: string
  artifactType: string
  createdOn: string
  description?: string
  groupId: string
  id?: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  name?: string
  owner: string

  // Selects a custom action instead of the plain create:
  //   'execute' | 'migrate' | 'promote' | 'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ContractUpdateData {
  artifact_id: string
  group_id: string
  artifactId?: string
  artifactType?: string
  createdOn?: string
  description?: string
  groupId?: string
  id?: string
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner?: string

  // Selects a custom action instead of the plain update:
  //   'compatibility_group' | 'metadata'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ContractRemoveMatch {
  group_id: string
  id: string

  // Selects a custom action instead of the plain remove:
  //   'ruleset' | 'ruleset'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ContractRule {
  artifactId?: string
  globalId?: number
  groupId?: string
  rule: Record<string, any>
  ruleCategory?: string
}

export interface ContractRuleListMatch {
  tag: string
}

export interface ContractRuleSet {
  domainRules?: any[]
  migrationRules?: any[]
}

export interface ContractRuleSetListMatch {
  domainRules?: any[]
  migrationRules?: any[]
}

export interface ContractRuleSetUpdateData {
  domainRules?: any[]
  migrationRules?: any[]
}

export interface CreateArtifact {
  artifact: Record<string, any>
  artifactId: string
  artifactType?: string
  description?: string
  firstVersion: Record<string, any>
  labels?: Record<string, any>
  name?: string
  version: Record<string, any>
}

export interface CreateArtifactCreateData {
  group_id: string
  canonical?: boolean
  dry_run?: boolean
  if_exist?: string
  artifact: Record<string, any>
  artifactId: string
  artifactType?: string
  description?: string
  firstVersion: Record<string, any>
  labels?: Record<string, any>
  name?: string
  version: Record<string, any>
}

export interface DeprecationReadiness {
  clientId?: string
  fetchCount?: number
  lastFetched?: number
}

export interface DeprecationReadinessListMatch {
  artifact_id: string
  group_id: string
  version_id: string
}

export interface DownloadRef {
  downloadId: string
  href?: string
}

export interface DownloadRefLoadMatch {
  for_browser?: boolean
  group_id?: string
}

export interface GitOp {
}

export interface GitOpCreateData {
}

export interface GitOpRemoveMatch {
  task_id: string
}

export interface GitOpsStatus {
  context?: string
  detail: string
  source?: string
}

export interface GitOpsStatusListMatch {
  context?: string
  detail?: string
  source?: string
}

export interface GitOpsValidateTask {
  artifactCount?: number
  completedAt?: string
  createdAt?: string
  errors?: any[]
  groupCount?: number
  ref?: string
  repoId?: string
  result?: string
  state: string
  taskId: string
  type?: string
  versionCount?: number
}

export interface GitOpsValidateTaskLoadMatch {
  task_id: string
}

export interface GitOpsValidateTaskListMatch {
  artifactCount?: number
  completedAt?: string
  createdAt?: string
  errors?: any[]
  groupCount?: number
  ref?: string
  repoId?: string
  result?: string
  state?: string
  taskId?: string
  type?: string
  versionCount?: number
}

export interface GitOpsValidateTaskCreateData {
  artifactCount?: number
  completedAt?: string
  createdAt?: string
  errors?: any[]
  groupCount?: number
  ref?: string
  repoId?: string
  result?: string
  state: string
  taskId: string
  type?: string
  versionCount?: number
}

export interface GlobalRule {
  config: string
  id?: string
  ruleType?: string
}

export interface GlobalRuleListMatch {
  config?: string
  id?: string
  ruleType?: string
}

export interface GlobalRuleCreateData {
  config: string
  id?: string
  ruleType?: string
}

export interface GlobalRuleRemoveMatch {
  id: string
}

export interface Group {
  createdOn: string
  description?: string
  groupId: string
  id?: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  owner: string
}

export interface GroupLoadMatch {
  id: string
}

export interface GroupListMatch {
  limit?: number
  offset?: number
  order?: string
  orderby?: string
}

export interface GroupCreateData {
  createdOn: string
  description?: string
  groupId: string
  id?: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  owner: string
}

export interface GroupUpdateData {
  id: string
  createdOn?: string
  description?: string
  groupId?: string
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  owner?: string
}

export interface GroupRemoveMatch {
  id: string
}

export interface GroupRule {
  config: string
  id?: string
  ruleType?: string
}

export interface GroupRuleCreateData {
  id: string
  config: string
  ruleType?: string
}

export interface GroupRuleRemoveMatch {
  group_id?: string
  id: string
}

export interface KafkaSql {
  snapshotId: string
}

export interface KafkaSqlCreateData {
  snapshotId: string
}

export interface Metadata {
  artifactId: string
  artifactType: string
  contentId: number
  contractMetadata?: Record<string, any>
  createdOn: string
  description?: string
  globalId: number
  groupId?: string
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner: string
  state?: string
  version: string
}

export interface MetadataLoadMatch {
  artifact_id: string
  group_id: string
  version_expression?: string
}

export interface MetadataCreateData {
  artifact_id: string
  group_id: string
  version_expression: string
  artifactId: string
  artifactType: string
  contentId: number
  contractMetadata?: Record<string, any>
  createdOn: string
  description?: string
  globalId: number
  groupId?: string
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner: string
  state?: string
  version: string

  // Selects a custom action instead of the plain create:
  //   'render'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MetadataUpdateData {
  artifact_id: string
  group_id: string
  version_expression?: string
  artifactId?: string
  artifactType?: string
  contentId?: number
  contractMetadata?: Record<string, any>
  createdOn?: string
  description?: string
  globalId?: number
  groupId?: string
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner?: string
  state?: string
  version?: string

  // Selects a custom action instead of the plain update:
  //   'content' | 'state'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OdcsContractResult {
  contractId?: string
  projection?: Record<string, any>
  version?: string
}

export interface OdcsContractResultCreateData {
  group_id: string
  contractId?: string
  projection?: Record<string, any>
  version?: string
}

export interface OdcsContractResultUpdateData {
  contract_id: string
  group_id: string
  contractId?: string
  projection?: Record<string, any>
  version?: string
}

export interface OdcsContractSummary {
  contractId?: string
  name?: string
}

export interface OdcsContractSummaryListMatch {
  group_id: string
  limit?: number
  offset?: number
}

export interface ReferenceGraph {
  edges: any[]
  metadata: Record<string, any>
  nodes: any[]
  root: Record<string, any>
}

export interface ReferenceGraphListMatch {
  artifact_id: string
  group_id: string
  version_id: string
  depth?: number
  direction?: string
}

export interface RoleMapping {
  id?: string
  principalId: string
  principalName?: string
  role: string
}

export interface RoleMappingLoadMatch {
  id: string
}

export interface RoleMappingListMatch {
  limit?: number
  offset?: number

  // Selects a custom action instead of the plain list:
  //   'role_mapping'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface RoleMappingCreateData {
  id?: string
  principalId: string
  principalName?: string
  role: string

  // Selects a custom action instead of the plain create:
  //   'role_mapping'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Rule {
  config: string
  id?: string
  ruleType?: string
}

export interface RuleLoadMatch {
  artifact_id?: string
  group_id?: string
  id: string
}

export interface RuleListMatch {
  artifact_id?: string
  group_id: string
}

export interface RuleUpdateData {
  artifact_id?: string
  group_id?: string
  id: string
  config?: string
  ruleType?: string
}

export interface SearchedBranch {
  artifactId: string
  branchId: string
  createdOn: string
  description?: string
  groupId: string
  modifiedBy: string
  modifiedOn: string
  owner: string
  systemDefined: boolean
}

export interface SearchedBranchListMatch {
  artifact_id: string
  group_id: string
  limit?: number
  offset?: number
}

export interface SearchedGroup {
  createdOn: string
  description?: string
  groupId: string
  labels?: Record<string, any>
  modifiedBy: string
  modifiedOn: string
  owner: string
}

export interface SearchedGroupListMatch {
  description?: string
  group_id?: string
  label?: any[]
  limit?: number
  offset?: number
  order?: string
  orderby?: string
}

export interface SystemInfo {
  builtOn?: string
  description?: string
  name?: string
  version?: string
}

export interface SystemInfoLoadMatch {
  builtOn?: string
  description?: string
  name?: string
  version?: string
}

export interface UsageSummary {
  active: number
  dead: number
  stale: number
}

export interface UsageSummaryLoadMatch {
  active?: number
  dead?: number
  stale?: number
}

export interface UserInfo {
  admin?: boolean
  developer?: boolean
  displayName?: string
  username?: string
  viewer?: boolean
}

export interface UserInfoLoadMatch {
  admin?: boolean
  developer?: boolean
  displayName?: string
  username?: string
  viewer?: boolean
}

export interface UserInterfaceConfig {
  auth: Record<string, any>
  features?: Record<string, any>
  ui?: Record<string, any>
}

export interface UserInterfaceConfigLoadMatch {
  auth?: Record<string, any>
  features?: Record<string, any>
  ui?: Record<string, any>
}

export interface Version {
  artifactId: string
  artifactType: string
  branches?: any[]
  content: Record<string, any>
  contentId: number
  count: number
  createdOn: string
  description?: string
  globalId: number
  groupId?: string
  id?: string
  isDraft?: boolean
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner: string
  state?: string
  value: string
  version: string
  versions: any[]
}

export interface VersionLoadMatch {
  artifact_id: string
  group_id: string
  version_expression: string
  canonical?: boolean
  reference?: string

  // Selects a custom action instead of the plain load:
  //   'content' | 'export'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VersionListMatch {
  artifact_id?: string
  artifact_type?: string
  content?: string
  content_id?: number
  description?: string
  global_id?: number
  group_id?: string
  label?: any[]
  limit?: number
  name?: string
  offset?: number
  order?: string
  orderby?: string
  skip_count?: boolean
  state?: string
  structure?: string
  version?: string
}

export interface VersionCreateData {
  artifact_id?: string
  artifact_type?: string
  canonical?: boolean
  group_id?: string
  limit?: number
  offset?: number
  order?: string
  orderby?: string
  skip_count?: boolean
  state?: string
  artifactId: string
  artifactType: string
  branches?: any[]
  content: Record<string, any>
  contentId: number
  count: number
  createdOn: string
  description?: string
  globalId: number
  groupId?: string
  id?: string
  isDraft?: boolean
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner: string
  value: string
  version: string
  versions: any[]
}

export interface VersionUpdateData {
  artifact_id: string
  comment_id: string
  group_id: string
  version_id: string
  artifactId?: string
  artifactType?: string
  branches?: any[]
  content?: Record<string, any>
  contentId?: number
  count?: number
  createdOn?: string
  description?: string
  globalId?: number
  groupId?: string
  id?: string
  isDraft?: boolean
  labels?: Record<string, any>
  modifiedBy?: string
  modifiedOn?: string
  name?: string
  owner?: string
  state?: string
  value?: string
  version?: string
  versions?: any[]
}

export interface VersionRemoveMatch {
  artifact_id: string
  comment_id?: string
  group_id: string
  version_id?: string
  id?: string
}

export interface WellKnown {
  artifactId?: string
  capabilities?: Record<string, any>
  createdOn?: number
  description?: string
  groupId?: string
  id?: string
  name?: string
  owner?: string
  parameters?: any[]
  skills?: any[]
  supportedInterfaces?: any[]
  title?: string
  version?: string
}

export interface WellKnownLoadMatch {
  artifact_id: string
  group_id: string
  version?: string
}

export interface WellKnownListMatch {
  capability?: any[]
  input_mode?: any[]
  limit?: number
  name?: string
  offset?: number
  output_mode?: any[]
  skill?: any[]
}

export interface WrappedVersionState {
  state: string
}

export interface WrappedVersionStateLoadMatch {
  artifact_id: string
  group_id: string
  version_expression: string
}

