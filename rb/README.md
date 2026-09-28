# ApicurioRegistry Ruby SDK



The Ruby SDK for the ApicurioRegistry API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Admin` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/apicurio-registry-sdk/releases](https://github.com/voxgig-sdk/apicurio-registry-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "ApicurioRegistry_sdk"

client = ApicurioRegistrySDK.new
```

### 3. Load an artifact

Artifact is nested under global, so provide the `global_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Artifact record (raises on error).
  artifact = client.Artifact.load({ "global_id" => 1 })
  puts artifact
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Admin record.
created = client.Admin.create({ "role" => "example_role", "value" => "example_value" })

# Update
client.Admin.update({ "principal_id" => "example_principal_id", "role" => "example_role" })

# Remove
client.Admin.remove({ "principal_id" => "example_principal_id" })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  contractrules = client.ContractRule.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = ApicurioRegistrySDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
contractrule = client.ContractRule.list()
puts contractrule
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ApicurioRegistrySDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
APICURIO_REGISTRY_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ApicurioRegistrySDK

```ruby
require_relative "ApicurioRegistry_sdk"
client = ApicurioRegistrySDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ApicurioRegistrySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ApicurioRegistrySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Admin` | `(data) -> AdminEntity` | Create an Admin entity instance. |
| `Agent` | `(data) -> AgentEntity` | Create an Agent entity instance. |
| `AgentCard` | `(data) -> AgentCardEntity` | Create an AgentCard entity instance. |
| `AiCatalog` | `(data) -> AiCatalogEntity` | Create an AiCatalog entity instance. |
| `ArdExplore` | `(data) -> ArdExploreEntity` | Create an ArdExplore entity instance. |
| `ArdSearch` | `(data) -> ArdSearchEntity` | Create an ArdSearch entity instance. |
| `Artifact` | `(data) -> ArtifactEntity` | Create an Artifact entity instance. |
| `ArtifactReference` | `(data) -> ArtifactReferenceEntity` | Create an ArtifactReference entity instance. |
| `ArtifactRule` | `(data) -> ArtifactRuleEntity` | Create an ArtifactRule entity instance. |
| `ArtifactType` | `(data) -> ArtifactTypeEntity` | Create an ArtifactType entity instance. |
| `Branch` | `(data) -> BranchEntity` | Create a Branch entity instance. |
| `Comment` | `(data) -> CommentEntity` | Create a Comment entity instance. |
| `ConfigurationProperty` | `(data) -> ConfigurationPropertyEntity` | Create a ConfigurationProperty entity instance. |
| `ConsumerVersionHeatmap` | `(data) -> ConsumerVersionHeatmapEntity` | Create a ConsumerVersionHeatmap entity instance. |
| `Content` | `(data) -> ContentEntity` | Create a Content entity instance. |
| `Contract` | `(data) -> ContractEntity` | Create a Contract entity instance. |
| `ContractRule` | `(data) -> ContractRuleEntity` | Create a ContractRule entity instance. |
| `ContractRuleSet` | `(data) -> ContractRuleSetEntity` | Create a ContractRuleSet entity instance. |
| `CreateArtifact` | `(data) -> CreateArtifactEntity` | Create a CreateArtifact entity instance. |
| `DeprecationReadiness` | `(data) -> DeprecationReadinessEntity` | Create a DeprecationReadiness entity instance. |
| `DownloadRef` | `(data) -> DownloadRefEntity` | Create a DownloadRef entity instance. |
| `GitOp` | `(data) -> GitOpEntity` | Create a GitOp entity instance. |
| `GitOpsStatus` | `(data) -> GitOpsStatusEntity` | Create a GitOpsStatus entity instance. |
| `GitOpsValidateTask` | `(data) -> GitOpsValidateTaskEntity` | Create a GitOpsValidateTask entity instance. |
| `GlobalRule` | `(data) -> GlobalRuleEntity` | Create a GlobalRule entity instance. |
| `Group` | `(data) -> GroupEntity` | Create a Group entity instance. |
| `GroupRule` | `(data) -> GroupRuleEntity` | Create a GroupRule entity instance. |
| `KafkaSql` | `(data) -> KafkaSqlEntity` | Create a KafkaSql entity instance. |
| `McpTool` | `(data) -> McpToolEntity` | Create a McpTool entity instance. |
| `Metadata` | `(data) -> MetadataEntity` | Create a Metadata entity instance. |
| `OdcsContractResult` | `(data) -> OdcsContractResultEntity` | Create an OdcsContractResult entity instance. |
| `OdcsContractSummary` | `(data) -> OdcsContractSummaryEntity` | Create an OdcsContractSummary entity instance. |
| `ReferenceGraph` | `(data) -> ReferenceGraphEntity` | Create a ReferenceGraph entity instance. |
| `RoleMapping` | `(data) -> RoleMappingEntity` | Create a RoleMapping entity instance. |
| `Rule` | `(data) -> RuleEntity` | Create a Rule entity instance. |
| `SearchedBranch` | `(data) -> SearchedBranchEntity` | Create a SearchedBranch entity instance. |
| `SearchedGroup` | `(data) -> SearchedGroupEntity` | Create a SearchedGroup entity instance. |
| `SystemInfo` | `(data) -> SystemInfoEntity` | Create a SystemInfo entity instance. |
| `UsageSummary` | `(data) -> UsageSummaryEntity` | Create an UsageSummary entity instance. |
| `UserInfo` | `(data) -> UserInfoEntity` | Create an UserInfo entity instance. |
| `UserInterfaceConfig` | `(data) -> UserInterfaceConfigEntity` | Create an UserInterfaceConfig entity instance. |
| `Version` | `(data) -> VersionEntity` | Create a Version entity instance. |
| `WellKnown` | `(data) -> WellKnownEntity` | Create a WellKnown entity instance. |
| `WrappedVersionState` | `(data) -> WrappedVersionStateEntity` | Create a WrappedVersionState entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `ApicurioRegistryError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Admin

| Field | Description |
| --- | --- |
| `role` |  |
| `value` |  |

Operations: Create, Remove, Update.

API path: `/admin/import`

#### Agent

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `capabilities` | Capabilities of an A2A agent. |
| `createdOn` |  |
| `defaultInputModes` |  |
| `defaultOutputModes` |  |
| `description` |  |
| `documentationUrl` |  |
| `groupId` |  |
| `iconUrl` |  |
| `name` |  |
| `owner` |  |
| `protocolVersion` |  |
| `provider` | Provider of an A2A agent. |
| `securityRequirements` |  |
| `securitySchemes` |  |
| `signatures` |  |
| `skills` |  |
| `supportedInterfaces` |  |
| `version` |  |

Operations: List.

API path: `/well-known/agents`

#### AgentCard

| Field | Description |
| --- | --- |
| `capabilities` | Capabilities of an A2A agent. |
| `defaultInputModes` |  |
| `defaultOutputModes` |  |
| `description` |  |
| `documentationUrl` |  |
| `iconUrl` |  |
| `name` |  |
| `protocolVersion` |  |
| `provider` | Provider of an A2A agent. |
| `securityRequirements` |  |
| `securitySchemes` |  |
| `signatures` |  |
| `skills` |  |
| `supportedInterfaces` |  |
| `version` |  |

Operations: List.

API path: `/well-known/agent-card.json`

#### AiCatalog

| Field | Description |
| --- | --- |
| `capabilities` |  |
| `description` |  |
| `displayName` |  |
| `identifier` |  |
| `representativeQueries` |  |
| `tags` |  |
| `type` |  |
| `updatedAt` |  |
| `url` |  |
| `version` |  |

Operations: List.

API path: `/well-known/ard/agents`

#### ArdExplore

| Field | Description |
| --- | --- |
| `query` | ARD search query. |
| `resultType` | Requested result type for the ARD POST /explore endpoint. |

Operations: Create.

API path: `/well-known/ard/explore`

#### ArdSearch

| Field | Description |
| --- | --- |
| `federation` |  |
| `pageSize` |  |
| `pageToken` |  |
| `query` | ARD search query. |
| `results` |  |

Operations: Create.

API path: `/well-known/ard/search`

#### Artifact

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `artifactType` |  |
| `artifacts` | The artifacts returned in the result set. |
| `count` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `id` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `name` |  |
| `owner` |  |
| `versions` |  |

Operations: Create, List, Load, Remove.

API path: `/search/artifacts`

#### ArtifactReference

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `content` | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | Optional encoding for the content property. |
| `groupId` |  |
| `name` |  |
| `references` | Collection of references to other artifacts. |
| `version` |  |

Operations: Create, List.

API path: `/content/references`

#### ArtifactRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: Create, Remove.

API path: `/groups/{groupId}/artifacts/{artifactId}/rules`

#### ArtifactType

| Field | Description |
| --- | --- |
| `name` |  |

Operations: List.

API path: `/admin/config/artifactTypes`

#### Branch

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `branchId` |  |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `id` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `owner` |  |
| `systemDefined` |  |
| `versions` |  |

Operations: Create, Load, Remove, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions`

#### Comment

| Field | Description |
| --- | --- |
| `commentId` |  |
| `createdOn` |  |
| `owner` |  |
| `value` |  |

Operations: Create, List.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments`

#### ConfigurationProperty

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `label` |  |
| `name` |  |
| `type` |  |
| `value` |  |

Operations: List, Load.

API path: `/admin/config/properties`

#### ConsumerVersionHeatmap

| Field | Description |
| --- | --- |
| `clientId` |  |
| `driftAlert` |  |
| `versions` |  |
| `versionsBehind` |  |

Operations: List.

API path: `/admin/usage/artifacts/{groupId}/{artifactId}/heatmap`

#### Content

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/content/canonicalize`

#### Contract

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `artifactType` |  |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `id` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `name` |  |
| `owner` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute`

#### ContractRule

| Field | Description |
| --- | --- |
| `artifactId` | The artifact ID containing the rule. |
| `globalId` | The global ID of the version (null for artifact-level rules). |
| `groupId` | The group ID of the artifact containing the rule. |
| `rule` | A single contract rule definition. |
| `ruleCategory` | The rule category (DOMAIN or MIGRATION). |

Operations: List.

API path: `/search/contract/rules`

#### ContractRuleSet

| Field | Description |
| --- | --- |
| `domainRules` | Rules for domain validation. |
| `migrationRules` | Rules for version migration. |

Operations: List, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset`

#### CreateArtifact

| Field | Description |
| --- | --- |
| `artifact` |  |
| `artifactId` |  |
| `artifactType` |  |
| `description` |  |
| `firstVersion` |  |
| `labels` |  |
| `name` |  |
| `version` |  |

Operations: Create.

API path: `/groups/{groupId}/artifacts`

#### DeprecationReadiness

| Field | Description |
| --- | --- |
| `clientId` |  |
| `fetchCount` |  |
| `lastFetched` |  |

Operations: List.

API path: `/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness`

#### DownloadRef

| Field | Description |
| --- | --- |
| `downloadId` |  |
| `href` |  |

Operations: Load.

API path: `/admin/export`

#### GitOp

| Field | Description |
| --- | --- |
| `ref` | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | Repository ID to validate against. |
| `type` | Validation type. |

Operations: Create, Remove.

API path: `/admin/gitops/sync`

#### GitOpsStatus

| Field | Description |
| --- | --- |
| `context` | The file path or location where the error occurred. |
| `detail` | A human-readable description of the error. |
| `source` | The source ID (e.g., repository ID) where the error occurred. |

Operations: List.

API path: `/admin/gitops/status`

#### GitOpsValidateTask

| Field | Description |
| --- | --- |
| `artifactCount` | Number of artifacts loaded during validation. |
| `completedAt` | ISO 8601 timestamp of when the task completed. |
| `createdAt` | ISO 8601 timestamp of when the task was created. |
| `errors` | Validation errors. |
| `groupCount` | Number of groups loaded during validation. |
| `ref` | Git ref being validated. |
| `repoId` | Repository ID being validated. |
| `result` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | Unique identifier for the validation task. |
| `type` | Validation type (`pull` or `push`). |
| `versionCount` | Number of artifact versions loaded during validation. |

Operations: List, Load.

API path: `/admin/gitops/validate`

#### GlobalRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: Create, Remove.

API path: `/admin/rules`

#### Group

| Field | Description |
| --- | --- |
| `artifactsType` |  |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `id` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `owner` |  |
| `properties` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/groups`

#### GroupRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: Create, Remove.

API path: `/groups/{groupId}/rules`

#### KafkaSql

| Field | Description |
| --- | --- |
| `snapshotId` |  |

Operations: Create.

API path: `/admin/snapshots`

#### McpTool

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `name` |  |
| `owner` |  |
| `parameters` |  |
| `title` |  |

Operations: List.

API path: `/well-known/mcp-tools`

#### Metadata

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `artifactType` |  |
| `contentId` |  |
| `contractMetadata` | Contract metadata projected from the artifact labels. |
| `createdOn` |  |
| `description` |  |
| `globalId` |  |
| `groupId` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `name` |  |
| `owner` |  |
| `version` |  |

Operations: Create, Load, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render`

#### OdcsContractResult

| Field | Description |
| --- | --- |
| `labelsApplied` | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | Any warnings encountered during projection. |

Operations: Create, Update.

API path: `/groups/{groupId}/contracts`

#### OdcsContractSummary

| Field | Description |
| --- | --- |
| `contractId` | The contract artifact ID. |
| `name` | The contract display name. |

Operations: List.

API path: `/groups/{groupId}/contracts`

#### ReferenceGraph

| Field | Description |
| --- | --- |
| `edges` | All edges (references) in the graph. |
| `metadata` | Metadata about the graph structure. |
| `nodes` | All nodes in the graph, including the root. |
| `root` | The root node of the graph (the artifact for which references were requested). |

Operations: List.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph`

#### RoleMapping

| Field | Description |
| --- | --- |
| `id` |  |
| `principalId` |  |
| `principalName` | A friendly name for the principal. |
| `role` |  |

Operations: List, Load.

API path: `/admin/roleMappings`

#### Rule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: List, Load, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/rules`

#### SearchedBranch

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `branchId` |  |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `owner` |  |
| `systemDefined` |  |

Operations: List.

API path: `/groups/{groupId}/artifacts/{artifactId}/branches`

#### SearchedGroup

| Field | Description |
| --- | --- |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `owner` |  |

Operations: List.

API path: `/search/groups`

#### SystemInfo

| Field | Description |
| --- | --- |
| `builtOn` |  |
| `description` |  |
| `name` |  |
| `version` |  |

Operations: Load.

API path: `/system/info`

#### UsageSummary

| Field | Description |
| --- | --- |
| `active` |  |
| `dead` |  |
| `stale` |  |

Operations: Load.

API path: `/admin/usage/summary`

#### UserInfo

| Field | Description |
| --- | --- |
| `admin` |  |
| `developer` |  |
| `displayName` |  |
| `username` |  |
| `viewer` |  |

Operations: Load.

API path: `/users/me`

#### UserInterfaceConfig

| Field | Description |
| --- | --- |
| `auth` |  |
| `features` |  |
| `ui` |  |

Operations: Load.

API path: `/system/uiConfig`

#### Version

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `artifactType` |  |
| `branches` |  |
| `content` |  |
| `contentId` |  |
| `count` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` |  |
| `description` |  |
| `globalId` |  |
| `groupId` |  |
| `id` |  |
| `isDraft` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `name` |  |
| `owner` |  |
| `state` |  |
| `value` |  |
| `version` |  |
| `versions` | The collection of artifact versions returned in the result set. |

Operations: Create, List, Load, Remove, Update.

API path: `/search/versions`

#### WellKnown

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/well-known/agents/{groupId}/{artifactId}`

#### WrappedVersionState

| Field | Description |
| --- | --- |
| `state` | Describes the state of an artifact or artifact version. |

Operations: Load.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state`



## Entities


### Admin

Create an instance: `admin = client.Admin`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `String` |  |
| `value` | `String` |  |

#### Example: Create

```ruby
admin = client.Admin.create({
  "role" => "example_role", # String
  "value" => "example_value", # String
})
```


### Agent

Create an instance: `agent = client.Agent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `capabilities` | `Hash` | Capabilities of an A2A agent. |
| `createdOn` | `Integer` |  |
| `defaultInputModes` | `Array` |  |
| `defaultOutputModes` | `Array` |  |
| `description` | `String` |  |
| `documentationUrl` | `String` |  |
| `groupId` | `String` |  |
| `iconUrl` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `protocolVersion` | `String` |  |
| `provider` | `Hash` | Provider of an A2A agent. |
| `securityRequirements` | `Array` |  |
| `securitySchemes` | `Hash` |  |
| `signatures` | `Array` |  |
| `skills` | `Array` |  |
| `supportedInterfaces` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Agent records (raises on error).
agents = client.Agent.list
```


### AgentCard

Create an instance: `agent_card = client.AgentCard`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Hash` | Capabilities of an A2A agent. |
| `defaultInputModes` | `Array` |  |
| `defaultOutputModes` | `Array` |  |
| `description` | `String` |  |
| `documentationUrl` | `String` |  |
| `iconUrl` | `String` |  |
| `name` | `String` |  |
| `protocolVersion` | `String` |  |
| `provider` | `Hash` | Provider of an A2A agent. |
| `securityRequirements` | `Array` |  |
| `securitySchemes` | `Hash` |  |
| `signatures` | `Array` |  |
| `skills` | `Array` |  |
| `supportedInterfaces` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AgentCard records (raises on error).
agent_cards = client.AgentCard.list
```


### AiCatalog

Create an instance: `ai_catalog = client.AiCatalog`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Array` |  |
| `description` | `String` |  |
| `displayName` | `String` |  |
| `identifier` | `String` |  |
| `representativeQueries` | `Array` |  |
| `tags` | `Array` |  |
| `type` | `String` |  |
| `updatedAt` | `String` |  |
| `url` | `String` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of AiCatalog records (raises on error).
ai_catalogs = client.AiCatalog.list
```


### ArdExplore

Create an instance: `ard_explore = client.ArdExplore`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `query` | `Hash` | ARD search query. |
| `resultType` | `Hash` | Requested result type for the ARD POST /explore endpoint. |

#### Example: Create

```ruby
ard_explore = client.ArdExplore.create({
  "resultType" => {}, # Hash
})
```


### ArdSearch

Create an instance: `ard_search = client.ArdSearch`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `federation` | `String` |  |
| `pageSize` | `Integer` |  |
| `pageToken` | `String` |  |
| `query` | `Hash` | ARD search query. |
| `results` | `Array` |  |

#### Example: Create

```ruby
ard_search = client.ArdSearch.create({
  "query" => {}, # Hash
  "results" => [], # Array
})
```


### Artifact

Create an instance: `artifact = client.Artifact`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `artifactType` | `String` |  |
| `artifacts` | `Array` | The artifacts returned in the result set. |
| `count` | `Integer` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `id` | `String` |  |
| `labels` | `Hash` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `versions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Artifact record (raises on error).
artifact = client.Artifact.load({ "global_id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Artifact records (raises on error).
artifacts = client.Artifact.list
```

#### Example: Create

```ruby
artifact = client.Artifact.create({
  "artifactId" => "example_artifactId", # String
  "artifactType" => "example_artifactType", # String
  "artifacts" => [], # Array
  "count" => 1, # Integer
  "createdOn" => "example_createdOn", # String
  "groupId" => "example_groupId", # String
  "modifiedBy" => "example_modifiedBy", # String
  "modifiedOn" => "example_modifiedOn", # String
  "owner" => "example_owner", # String
  "versions" => [], # Array
})
```


### ArtifactReference

Create an instance: `artifact_reference = client.ArtifactReference`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `content` | `String` | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `String` | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `String` | Optional encoding for the content property. |
| `groupId` | `String` |  |
| `name` | `String` |  |
| `references` | `Array` | Collection of references to other artifacts. |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of ArtifactReference records (raises on error).
artifact_references = client.ArtifactReference.list
```

#### Example: Create

```ruby
artifact_reference = client.ArtifactReference.create({
  "artifactId" => "example_artifactId", # String
  "content" => "example_content", # String
  "contentType" => "example_contentType", # String
  "groupId" => "example_groupId", # String
  "name" => "example_name", # String
})
```


### ArtifactRule

Create an instance: `artifact_rule = client.ArtifactRule`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `String` |  |
| `id` | `String` |  |
| `ruleType` | `String` |  |

#### Example: Create

```ruby
artifact_rule = client.ArtifactRule.create({
  "group_id" => "example_group_id", # String
  "id" => "example_id", # String
  "config" => "example_config", # String
})
```


### ArtifactType

Create an instance: `artifact_type = client.ArtifactType`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of ArtifactType records (raises on error).
artifact_types = client.ArtifactType.list
```


### Branch

Create an instance: `branch = client.Branch`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `branchId` | `String` |  |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `id` | `String` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `owner` | `String` |  |
| `systemDefined` | `Boolean` |  |
| `versions` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Branch record (raises on error).
branch = client.Branch.load({ "id" => "branch_id", "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

#### Example: Create

```ruby
branch = client.Branch.create({
  "artifact_id" => "example_artifact_id", # String
  "group_id" => "example_group_id", # String
  "artifactId" => "example_artifactId", # String
  "branchId" => "example_branchId", # String
  "createdOn" => "example_createdOn", # String
  "groupId" => "example_groupId", # String
  "modifiedBy" => "example_modifiedBy", # String
  "modifiedOn" => "example_modifiedOn", # String
  "owner" => "example_owner", # String
  "systemDefined" => true, # Boolean
})
```


### Comment

Create an instance: `comment = client.Comment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commentId` | `String` |  |
| `createdOn` | `String` |  |
| `owner` | `String` |  |
| `value` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Comment records (raises on error).
comments = client.Comment.list
```

#### Example: Create

```ruby
comment = client.Comment.create({
  "artifact_id" => "example_artifact_id", # String
  "group_id" => "example_group_id", # String
  "version_expression" => "example_version_expression", # String
  "commentId" => "example_commentId", # String
  "createdOn" => "example_createdOn", # String
  "owner" => "example_owner", # String
  "value" => "example_value", # String
})
```


### ConfigurationProperty

Create an instance: `configuration_property = client.ConfigurationProperty`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `String` |  |
| `label` | `String` |  |
| `name` | `String` |  |
| `type` | `String` |  |
| `value` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConfigurationProperty record (raises on error).
configuration_property = client.ConfigurationProperty.load({ "id" => "configuration_property_id" })
```

#### Example: List

```ruby
# list returns an Array of ConfigurationProperty records (raises on error).
configuration_propertys = client.ConfigurationProperty.list
```


### ConsumerVersionHeatmap

Create an instance: `consumer_version_heatmap = client.ConsumerVersionHeatmap`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `String` |  |
| `driftAlert` | `Boolean` |  |
| `versions` | `Hash` |  |
| `versionsBehind` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of ConsumerVersionHeatmap records (raises on error).
consumer_version_heatmaps = client.ConsumerVersionHeatmap.list
```


### Content

Create an instance: `content = client.Content`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
content = client.Content.create({
  "artifact_type" => "example_artifact_type", # String
})
```


### Contract

Create an instance: `contract = client.Contract`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `artifactType` | `String` |  |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `id` | `String` |  |
| `labels` | `Hash` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Contract record (raises on error).
contract = client.Contract.load({ "id" => "contract_id", "group_id" => "group_id" })
```

#### Example: List

```ruby
# list returns an Array of Contract records (raises on error).
contracts = client.Contract.list
```

#### Example: Create

```ruby
contract = client.Contract.create({
  "artifact_id" => "example_artifact_id", # String
  "group_id" => "example_group_id", # String
  "artifactId" => "example_artifactId", # String
  "artifactType" => "example_artifactType", # String
  "createdOn" => "example_createdOn", # String
  "groupId" => "example_groupId", # String
  "modifiedBy" => "example_modifiedBy", # String
  "modifiedOn" => "example_modifiedOn", # String
  "owner" => "example_owner", # String
})
```


### ContractRule

Create an instance: `contract_rule = client.ContractRule`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` | The artifact ID containing the rule. |
| `globalId` | `Integer` | The global ID of the version (null for artifact-level rules). |
| `groupId` | `String` | The group ID of the artifact containing the rule. |
| `rule` | `Hash` | A single contract rule definition. |
| `ruleCategory` | `String` | The rule category (DOMAIN or MIGRATION). |

#### Example: List

```ruby
# list returns an Array of ContractRule records (raises on error).
contract_rules = client.ContractRule.list
```


### ContractRuleSet

Create an instance: `contract_rule_set = client.ContractRuleSet`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domainRules` | `Array` | Rules for domain validation. |
| `migrationRules` | `Array` | Rules for version migration. |

#### Example: List

```ruby
# list returns an Array of ContractRuleSet records (raises on error).
contract_rule_sets = client.ContractRuleSet.list
```


### CreateArtifact

Create an instance: `create_artifact = client.CreateArtifact`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifact` | `Hash` |  |
| `artifactId` | `String` |  |
| `artifactType` | `String` |  |
| `description` | `String` |  |
| `firstVersion` | `Hash` |  |
| `labels` | `Hash` |  |
| `name` | `String` |  |
| `version` | `Hash` |  |

#### Example: Create

```ruby
create_artifact = client.CreateArtifact.create({
  "group_id" => "example_group_id", # String
  "artifact" => {}, # Hash
  "artifactId" => "example_artifactId", # String
  "firstVersion" => {}, # Hash
  "version" => {}, # Hash
})
```


### DeprecationReadiness

Create an instance: `deprecation_readiness = client.DeprecationReadiness`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `String` |  |
| `fetchCount` | `Integer` |  |
| `lastFetched` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of DeprecationReadiness records (raises on error).
deprecation_readinesss = client.DeprecationReadiness.list
```


### DownloadRef

Create an instance: `download_ref = client.DownloadRef`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadId` | `String` |  |
| `href` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DownloadRef record (raises on error).
download_ref = client.DownloadRef.load()
```


### GitOp

Create an instance: `git_op = client.GitOp`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ref` | `String` | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `String` | Repository ID to validate against. |
| `type` | `String` | Validation type. |

#### Example: Create

```ruby
git_op = client.GitOp.create({
  "ref" => "example_ref", # String
  "repoId" => "example_repoId", # String
})
```


### GitOpsStatus

Create an instance: `git_ops_status = client.GitOpsStatus`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `context` | `String` | The file path or location where the error occurred. |
| `detail` | `String` | A human-readable description of the error. |
| `source` | `String` | The source ID (e.g., repository ID) where the error occurred. |

#### Example: List

```ruby
# list returns an Array of GitOpsStatus records (raises on error).
git_ops_statuss = client.GitOpsStatus.list
```


### GitOpsValidateTask

Create an instance: `git_ops_validate_task = client.GitOpsValidateTask`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactCount` | `Integer` | Number of artifacts loaded during validation. |
| `completedAt` | `String` | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `String` | ISO 8601 timestamp of when the task was created. |
| `errors` | `Array` | Validation errors. |
| `groupCount` | `Integer` | Number of groups loaded during validation. |
| `ref` | `String` | Git ref being validated. |
| `repoId` | `String` | Repository ID being validated. |
| `result` | `String` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `String` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `String` | Unique identifier for the validation task. |
| `type` | `String` | Validation type (`pull` or `push`). |
| `versionCount` | `Integer` | Number of artifact versions loaded during validation. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the GitOpsValidateTask record (raises on error).
git_ops_validate_task = client.GitOpsValidateTask.load({ "task_id" => "task_id" })
```

#### Example: List

```ruby
# list returns an Array of GitOpsValidateTask records (raises on error).
git_ops_validate_tasks = client.GitOpsValidateTask.list
```


### GlobalRule

Create an instance: `global_rule = client.GlobalRule`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `String` |  |
| `id` | `String` |  |
| `ruleType` | `String` |  |

#### Example: Create

```ruby
global_rule = client.GlobalRule.create({
  "config" => "example_config", # String
})
```


### Group

Create an instance: `group = client.Group`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactsType` | `String` |  |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `id` | `String` |  |
| `labels` | `Hash` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `owner` | `String` |  |
| `properties` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Group record (raises on error).
group = client.Group.load({ "id" => "group_id" })
```

#### Example: List

```ruby
# list returns an Array of Group records (raises on error).
groups = client.Group.list
```

#### Example: Create

```ruby
group = client.Group.create({
})
```


### GroupRule

Create an instance: `group_rule = client.GroupRule`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `String` |  |
| `id` | `String` |  |
| `ruleType` | `String` |  |

#### Example: Create

```ruby
group_rule = client.GroupRule.create({
  "id" => "example_id", # String
  "config" => "example_config", # String
})
```


### KafkaSql

Create an instance: `kafka_sql = client.KafkaSql`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `snapshotId` | `String` |  |

#### Example: Create

```ruby
kafka_sql = client.KafkaSql.create({
  "snapshotId" => "example_snapshotId", # String
})
```


### McpTool

Create an instance: `mcp_tool = client.McpTool`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `createdOn` | `Integer` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `parameters` | `Array` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of McpTool records (raises on error).
mcp_tools = client.McpTool.list
```


### Metadata

Create an instance: `metadata = client.Metadata`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `artifactType` | `String` |  |
| `contentId` | `Integer` |  |
| `contractMetadata` | `Hash` | Contract metadata projected from the artifact labels. |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `globalId` | `Integer` |  |
| `groupId` | `String` |  |
| `labels` | `Hash` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `version` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Metadata record (raises on error).
metadata = client.Metadata.load({ "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

#### Example: Create

```ruby
metadata = client.Metadata.create({
  "artifact_id" => "example_artifact_id", # String
  "group_id" => "example_group_id", # String
  "version_expression" => "example_version_expression", # String
  "modifiedBy" => "example_modifiedBy", # String
  "modifiedOn" => "example_modifiedOn", # String
})
```


### OdcsContractResult

Create an instance: `odcs_contract_result = client.OdcsContractResult`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `labelsApplied` | `Integer` | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | `Integer` | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | `Integer` | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | `Array` | Any warnings encountered during projection. |

#### Example: Create

```ruby
odcs_contract_result = client.OdcsContractResult.create({
  "group_id" => "example_group_id", # String
})
```


### OdcsContractSummary

Create an instance: `odcs_contract_summary = client.OdcsContractSummary`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `String` | The contract artifact ID. |
| `name` | `String` | The contract display name. |

#### Example: List

```ruby
# list returns an Array of OdcsContractSummary records (raises on error).
odcs_contract_summarys = client.OdcsContractSummary.list
```


### ReferenceGraph

Create an instance: `reference_graph = client.ReferenceGraph`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `edges` | `Array` | All edges (references) in the graph. |
| `metadata` | `Hash` | Metadata about the graph structure. |
| `nodes` | `Array` | All nodes in the graph, including the root. |
| `root` | `Hash` | The root node of the graph (the artifact for which references were requested). |

#### Example: List

```ruby
# list returns an Array of ReferenceGraph records (raises on error).
reference_graphs = client.ReferenceGraph.list
```


### RoleMapping

Create an instance: `role_mapping = client.RoleMapping`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `principalId` | `String` |  |
| `principalName` | `String` | A friendly name for the principal. |
| `role` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the RoleMapping record (raises on error).
role_mapping = client.RoleMapping.load({ "id" => "role_mapping_id" })
```

#### Example: List

```ruby
# list returns an Array of RoleMapping records (raises on error).
role_mappings = client.RoleMapping.list
```


### Rule

Create an instance: `rule = client.Rule`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `String` |  |
| `id` | `String` |  |
| `ruleType` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Rule record (raises on error).
rule = client.Rule.load({ "id" => "rule_id" })
```

#### Example: List

```ruby
# list returns an Array of Rule records (raises on error).
rules = client.Rule.list
```


### SearchedBranch

Create an instance: `searched_branch = client.SearchedBranch`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `branchId` | `String` |  |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `owner` | `String` |  |
| `systemDefined` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of SearchedBranch records (raises on error).
searched_branchs = client.SearchedBranch.list
```


### SearchedGroup

Create an instance: `searched_group = client.SearchedGroup`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `groupId` | `String` |  |
| `labels` | `Hash` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `owner` | `String` |  |

#### Example: List

```ruby
# list returns an Array of SearchedGroup records (raises on error).
searched_groups = client.SearchedGroup.list
```


### SystemInfo

Create an instance: `system_info = client.SystemInfo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `builtOn` | `String` |  |
| `description` | `String` |  |
| `name` | `String` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SystemInfo record (raises on error).
system_info = client.SystemInfo.load()
```


### UsageSummary

Create an instance: `usage_summary = client.UsageSummary`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Integer` |  |
| `dead` | `Integer` |  |
| `stale` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the UsageSummary record (raises on error).
usage_summary = client.UsageSummary.load()
```


### UserInfo

Create an instance: `user_info = client.UserInfo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Boolean` |  |
| `developer` | `Boolean` |  |
| `displayName` | `String` |  |
| `username` | `String` |  |
| `viewer` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the UserInfo record (raises on error).
user_info = client.UserInfo.load()
```


### UserInterfaceConfig

Create an instance: `user_interface_config = client.UserInterfaceConfig`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth` | `Hash` |  |
| `features` | `Hash` |  |
| `ui` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the UserInterfaceConfig record (raises on error).
user_interface_config = client.UserInterfaceConfig.load()
```


### Version

Create an instance: `version = client.Version`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `String` |  |
| `artifactType` | `String` |  |
| `branches` | `Array` |  |
| `content` | `Hash` |  |
| `contentId` | `Integer` |  |
| `count` | `Integer` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `String` |  |
| `description` | `String` |  |
| `globalId` | `Integer` |  |
| `groupId` | `String` |  |
| `id` | `String` |  |
| `isDraft` | `Boolean` |  |
| `labels` | `Hash` |  |
| `modifiedBy` | `String` |  |
| `modifiedOn` | `String` |  |
| `name` | `String` |  |
| `owner` | `String` |  |
| `state` | `String` |  |
| `value` | `String` |  |
| `version` | `String` |  |
| `versions` | `Array` | The collection of artifact versions returned in the result set. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Version record (raises on error).
version = client.Version.load({ "artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression" })
```

#### Example: List

```ruby
# list returns an Array of Version records (raises on error).
versions = client.Version.list
```

#### Example: Create

```ruby
version = client.Version.create({
  "artifactId" => "example_artifactId", # String
  "artifactType" => "example_artifactType", # String
  "content" => {}, # Hash
  "contentId" => 1, # Integer
  "count" => 1, # Integer
  "createdOn" => "example_createdOn", # String
  "globalId" => 1, # Integer
  "owner" => "example_owner", # String
  "value" => "example_value", # String
  "versions" => [], # Array
})
```


### WellKnown

Create an instance: `well_known = client.WellKnown`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the WellKnown record (raises on error).
well_known = client.WellKnown.load({ "artifact_id" => "artifact_id", "group_id" => "group_id" })
```


### WrappedVersionState

Create an instance: `wrapped_version_state = client.WrappedVersionState`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `state` | `String` | Describes the state of an artifact or artifact version. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the WrappedVersionState record (raises on error).
wrapped_version_state = client.WrappedVersionState.load({ "artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression" })
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── ApicurioRegistry_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`ApicurioRegistry_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
contractrule = client.ContractRule
contractrule.list()

# contractrule.data_get now returns the contractrule data from the last list
# contractrule.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
