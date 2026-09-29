# ApicurioRegistry Lua SDK



The Lua SDK for the ApicurioRegistry API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Admin()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/apicurio-registry-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("apicurio-registry_sdk")

local client = sdk.new()
```

### 3. Load an artifact

Artifact is nested under global, so provide the `global_id`.

```lua
local artifact, err = client:Artifact():load({ global_id = 1 })
if err then error(err) end
print(artifact)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Admin():create({ role = "example_role", value = "example_value" })
if err then error(err) end

-- Update
client:Admin():update({ principal_id = "example_principal_id", role = "example_role" })

-- Remove
client:Admin():remove({ principal_id = "example_principal_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local contractrules, err = client:ContractRule():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:ContractRule():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### ApicurioRegistrySDK

```lua
local sdk = require("apicurio-registry_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ApicurioRegistrySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local artifact, err = client:Artifact():load()
    if err then error(err) end
    -- artifact is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

API path: `/well-known/agent.json`

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
| `facets` | Facets keyed by the requested facet field name. |
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

Operations: Create, List, Load.

API path: `/admin/gitops/validate`

#### GlobalRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: Create, List, Remove.

API path: `/admin/rules`

#### Group

| Field | Description |
| --- | --- |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `id` |  |
| `labels` |  |
| `modifiedBy` |  |
| `modifiedOn` |  |
| `owner` |  |

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
| `state` |  |
| `version` | A single version of an artifact. |

Operations: Create, Load, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render`

#### OdcsContractResult

| Field | Description |
| --- | --- |
| `contractId` | The contract artifact ID. |
| `projection` | Summary of the projection performed when an ODCS contract is applied. |
| `version` | The ODCS contract version. |

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

Operations: Create, List, Load.

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
| `version` | A single version of an artifact. |
| `versions` | The collection of artifact versions returned in the result set. |

Operations: Create, List, Load, Remove, Update.

API path: `/search/versions`

#### WellKnown

| Field | Description |
| --- | --- |
| `artifactId` |  |
| `capabilities` | Capabilities of an A2A agent. |
| `createdOn` |  |
| `description` |  |
| `groupId` |  |
| `id` |  |
| `name` |  |
| `owner` |  |
| `parameters` |  |
| `skills` |  |
| `supportedInterfaces` |  |
| `title` |  |
| `version` |  |

Operations: List, Load.

API path: `/well-known/agents`

#### WrappedVersionState

| Field | Description |
| --- | --- |
| `state` | Describes the state of an artifact or artifact version. |

Operations: Load.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state`



## Entities


### Admin

Create an instance: `local admin = client:Admin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `string` |  |
| `value` | `string` |  |

#### Example: Create

```lua
local admin, err = client:Admin():create({
  role = "example_role", -- string
  value = "example_value", -- string
})
```


### Agent

Create an instance: `local agent = client:Agent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `table` | Capabilities of an A2A agent. |
| `defaultInputModes` | `table` |  |
| `defaultOutputModes` | `table` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `table` | Provider of an A2A agent. |
| `securityRequirements` | `table` |  |
| `securitySchemes` | `table` |  |
| `signatures` | `table` |  |
| `skills` | `table` |  |
| `supportedInterfaces` | `table` |  |
| `version` | `string` |  |

#### Example: List

```lua
local agents, err = client:Agent():list()
```


### AgentCard

Create an instance: `local agent_card = client:AgentCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `table` | Capabilities of an A2A agent. |
| `defaultInputModes` | `table` |  |
| `defaultOutputModes` | `table` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `table` | Provider of an A2A agent. |
| `securityRequirements` | `table` |  |
| `securitySchemes` | `table` |  |
| `signatures` | `table` |  |
| `skills` | `table` |  |
| `supportedInterfaces` | `table` |  |
| `version` | `string` |  |

#### Example: List

```lua
local agent_cards, err = client:AgentCard():list()
```


### AiCatalog

Create an instance: `local ai_catalog = client:AiCatalog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `table` |  |
| `description` | `string` |  |
| `displayName` | `string` |  |
| `identifier` | `string` |  |
| `representativeQueries` | `table` |  |
| `tags` | `table` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |
| `version` | `string` |  |

#### Example: List

```lua
local ai_catalogs, err = client:AiCatalog():list()
```


### ArdExplore

Create an instance: `local ard_explore = client:ArdExplore(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `facets` | `table` | Facets keyed by the requested facet field name. |
| `query` | `table` | ARD search query. |
| `resultType` | `string` | Requested result type for the ARD POST /explore endpoint. |

#### Example: Create

```lua
local ard_explore, err = client:ArdExplore():create({
})
```


### ArdSearch

Create an instance: `local ard_search = client:ArdSearch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `federation` | `string` |  |
| `pageSize` | `number` |  |
| `pageToken` | `string` |  |
| `query` | `table` | ARD search query. |
| `results` | `table` |  |

#### Example: Create

```lua
local ard_search, err = client:ArdSearch():create({
  query = {}, -- table
  results = {}, -- table
})
```


### Artifact

Create an instance: `local artifact = client:Artifact(nil)`

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
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `artifacts` | `table` | The artifacts returned in the result set. |
| `count` | `number` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `table` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `versions` | `table` |  |

#### Example: Load

```lua
local artifact, err = client:Artifact():load({ global_id = 1 })
```

#### Example: List

```lua
local artifacts, err = client:Artifact():list()
```

#### Example: Create

```lua
local artifact, err = client:Artifact():create({
  artifactId = "example_artifactId", -- string
  artifactType = "example_artifactType", -- string
  artifacts = {}, -- table
  count = 1, -- number
  createdOn = "example_createdOn", -- string
  groupId = "example_groupId", -- string
  modifiedBy = "example_modifiedBy", -- string
  modifiedOn = "example_modifiedOn", -- string
  owner = "example_owner", -- string
  versions = {}, -- table
})
```


### ArtifactReference

Create an instance: `local artifact_reference = client:ArtifactReference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `content` | `string` | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `string` | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `string` | Optional encoding for the content property. |
| `groupId` | `string` |  |
| `name` | `string` |  |
| `references` | `table` | Collection of references to other artifacts. |
| `version` | `string` |  |

#### Example: List

```lua
local artifact_references, err = client:ArtifactReference():list()
```

#### Example: Create

```lua
local artifact_reference, err = client:ArtifactReference():create({
  artifactId = "example_artifactId", -- string
  content = "example_content", -- string
  contentType = "example_contentType", -- string
  groupId = "example_groupId", -- string
  name = "example_name", -- string
})
```


### ArtifactRule

Create an instance: `local artifact_rule = client:ArtifactRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: Create

```lua
local artifact_rule, err = client:ArtifactRule():create({
  group_id = "example_group_id", -- string
  id = "example_id", -- string
  config = "example_config", -- string
})
```


### ArtifactType

Create an instance: `local artifact_type = client:ArtifactType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```lua
local artifact_types, err = client:ArtifactType():list()
```


### Branch

Create an instance: `local branch = client:Branch(nil)`

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
| `artifactId` | `string` |  |
| `branchId` | `string` |  |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |
| `systemDefined` | `boolean` |  |
| `versions` | `table` |  |

#### Example: Load

```lua
local branch, err = client:Branch():load({ id = "branch_id", artifact_id = "artifact_id", group_id = "group_id" })
```

#### Example: Create

```lua
local branch, err = client:Branch():create({
  artifact_id = "example_artifact_id", -- string
  group_id = "example_group_id", -- string
  artifactId = "example_artifactId", -- string
  branchId = "example_branchId", -- string
  createdOn = "example_createdOn", -- string
  groupId = "example_groupId", -- string
  modifiedBy = "example_modifiedBy", -- string
  modifiedOn = "example_modifiedOn", -- string
  owner = "example_owner", -- string
  systemDefined = true, -- boolean
})
```


### Comment

Create an instance: `local comment = client:Comment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commentId` | `string` |  |
| `createdOn` | `string` |  |
| `owner` | `string` |  |
| `value` | `string` |  |

#### Example: List

```lua
local comments, err = client:Comment():list()
```

#### Example: Create

```lua
local comment, err = client:Comment():create({
  artifact_id = "example_artifact_id", -- string
  group_id = "example_group_id", -- string
  version_expression = "example_version_expression", -- string
  commentId = "example_commentId", -- string
  createdOn = "example_createdOn", -- string
  owner = "example_owner", -- string
  value = "example_value", -- string
})
```


### ConfigurationProperty

Create an instance: `local configuration_property = client:ConfigurationProperty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `string` |  |
| `label` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `value` | `string` |  |

#### Example: Load

```lua
local configuration_property, err = client:ConfigurationProperty():load({ id = "configuration_property_id" })
```

#### Example: List

```lua
local configuration_propertys, err = client:ConfigurationProperty():list()
```


### ConsumerVersionHeatmap

Create an instance: `local consumer_version_heatmap = client:ConsumerVersionHeatmap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `driftAlert` | `boolean` |  |
| `versions` | `table` |  |
| `versionsBehind` | `number` |  |

#### Example: List

```lua
local consumer_version_heatmaps, err = client:ConsumerVersionHeatmap():list()
```


### Content

Create an instance: `local content = client:Content(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local content, err = client:Content():create({
  artifact_type = "example_artifact_type", -- string
})
```


### Contract

Create an instance: `local contract = client:Contract(nil)`

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
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `table` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```lua
local contract, err = client:Contract():load({ id = "contract_id", group_id = "group_id" })
```

#### Example: List

```lua
local contracts, err = client:Contract():list()
```

#### Example: Create

```lua
local contract, err = client:Contract():create({
  artifact_id = "example_artifact_id", -- string
  group_id = "example_group_id", -- string
  artifactId = "example_artifactId", -- string
  artifactType = "example_artifactType", -- string
  createdOn = "example_createdOn", -- string
  groupId = "example_groupId", -- string
  modifiedBy = "example_modifiedBy", -- string
  modifiedOn = "example_modifiedOn", -- string
  owner = "example_owner", -- string
})
```


### ContractRule

Create an instance: `local contract_rule = client:ContractRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` | The artifact ID containing the rule. |
| `globalId` | `number` | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | The group ID of the artifact containing the rule. |
| `rule` | `table` | A single contract rule definition. |
| `ruleCategory` | `string` | The rule category (DOMAIN or MIGRATION). |

#### Example: List

```lua
local contract_rules, err = client:ContractRule():list()
```


### ContractRuleSet

Create an instance: `local contract_rule_set = client:ContractRuleSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domainRules` | `table` | Rules for domain validation. |
| `migrationRules` | `table` | Rules for version migration. |

#### Example: List

```lua
local contract_rule_sets, err = client:ContractRuleSet():list()
```


### CreateArtifact

Create an instance: `local create_artifact = client:CreateArtifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifact` | `table` |  |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `description` | `string` |  |
| `firstVersion` | `table` |  |
| `labels` | `table` |  |
| `name` | `string` |  |
| `version` | `table` |  |

#### Example: Create

```lua
local create_artifact, err = client:CreateArtifact():create({
  group_id = "example_group_id", -- string
  artifact = {}, -- table
  artifactId = "example_artifactId", -- string
  firstVersion = {}, -- table
  version = {}, -- table
})
```


### DeprecationReadiness

Create an instance: `local deprecation_readiness = client:DeprecationReadiness(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `fetchCount` | `number` |  |
| `lastFetched` | `number` |  |

#### Example: List

```lua
local deprecation_readinesss, err = client:DeprecationReadiness():list()
```


### DownloadRef

Create an instance: `local download_ref = client:DownloadRef(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadId` | `string` |  |
| `href` | `string` |  |

#### Example: Load

```lua
local download_ref, err = client:DownloadRef():load()
```


### GitOp

Create an instance: `local git_op = client:GitOp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Example: Create

```lua
local git_op, err = client:GitOp():create({
})
```


### GitOpsStatus

Create an instance: `local git_ops_status = client:GitOpsStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `context` | `string` | The file path or location where the error occurred. |
| `detail` | `string` | A human-readable description of the error. |
| `source` | `string` | The source ID (e.g., repository ID) where the error occurred. |

#### Example: List

```lua
local git_ops_statuss, err = client:GitOpsStatus():list()
```


### GitOpsValidateTask

Create an instance: `local git_ops_validate_task = client:GitOpsValidateTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactCount` | `number` | Number of artifacts loaded during validation. |
| `completedAt` | `string` | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | ISO 8601 timestamp of when the task was created. |
| `errors` | `table` | Validation errors. |
| `groupCount` | `number` | Number of groups loaded during validation. |
| `ref` | `string` | Git ref being validated. |
| `repoId` | `string` | Repository ID being validated. |
| `result` | `string` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Unique identifier for the validation task. |
| `type` | `string` | Validation type (`pull` or `push`). |
| `versionCount` | `number` | Number of artifact versions loaded during validation. |

#### Example: Load

```lua
local git_ops_validate_task, err = client:GitOpsValidateTask():load({ task_id = "task_id" })
```

#### Example: List

```lua
local git_ops_validate_tasks, err = client:GitOpsValidateTask():list()
```

#### Example: Create

```lua
local git_ops_validate_task, err = client:GitOpsValidateTask():create({
  state = "example_state", -- string
  taskId = "example_taskId", -- string
})
```


### GlobalRule

Create an instance: `local global_rule = client:GlobalRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: List

```lua
local global_rules, err = client:GlobalRule():list()
```

#### Example: Create

```lua
local global_rule, err = client:GlobalRule():create({
  config = "example_config", -- string
})
```


### Group

Create an instance: `local group = client:Group(nil)`

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
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `table` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```lua
local group, err = client:Group():load({ id = "group_id" })
```

#### Example: List

```lua
local groups, err = client:Group():list()
```

#### Example: Create

```lua
local group, err = client:Group():create({
  createdOn = "example_createdOn", -- string
  groupId = "example_groupId", -- string
  modifiedBy = "example_modifiedBy", -- string
  modifiedOn = "example_modifiedOn", -- string
  owner = "example_owner", -- string
})
```


### GroupRule

Create an instance: `local group_rule = client:GroupRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: Create

```lua
local group_rule, err = client:GroupRule():create({
  id = "example_id", -- string
  config = "example_config", -- string
})
```


### KafkaSql

Create an instance: `local kafka_sql = client:KafkaSql(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `snapshotId` | `string` |  |

#### Example: Create

```lua
local kafka_sql, err = client:KafkaSql():create({
  snapshotId = "example_snapshotId", -- string
})
```


### Metadata

Create an instance: `local metadata = client:Metadata(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `contentId` | `number` |  |
| `contractMetadata` | `table` | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `number` |  |
| `groupId` | `string` |  |
| `labels` | `table` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `version` | `string` | A single version of an artifact. |

#### Example: Load

```lua
local metadata, err = client:Metadata():load({ artifact_id = "artifact_id", group_id = "group_id" })
```

#### Example: Create

```lua
local metadata, err = client:Metadata():create({
  artifact_id = "example_artifact_id", -- string
  group_id = "example_group_id", -- string
  version_expression = "example_version_expression", -- string
  artifactId = "example_artifactId", -- string
  artifactType = "example_artifactType", -- string
  contentId = 1, -- number
  createdOn = "example_createdOn", -- string
  globalId = 1, -- number
  owner = "example_owner", -- string
  version = "example_version", -- string
})
```


### OdcsContractResult

Create an instance: `local odcs_contract_result = client:OdcsContractResult(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `string` | The contract artifact ID. |
| `projection` | `table` | Summary of the projection performed when an ODCS contract is applied. |
| `version` | `string` | The ODCS contract version. |

#### Example: Create

```lua
local odcs_contract_result, err = client:OdcsContractResult():create({
  group_id = "example_group_id", -- string
})
```


### OdcsContractSummary

Create an instance: `local odcs_contract_summary = client:OdcsContractSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `string` | The contract artifact ID. |
| `name` | `string` | The contract display name. |

#### Example: List

```lua
local odcs_contract_summarys, err = client:OdcsContractSummary():list()
```


### ReferenceGraph

Create an instance: `local reference_graph = client:ReferenceGraph(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `edges` | `table` | All edges (references) in the graph. |
| `metadata` | `table` | Metadata about the graph structure. |
| `nodes` | `table` | All nodes in the graph, including the root. |
| `root` | `table` | The root node of the graph (the artifact for which references were requested). |

#### Example: List

```lua
local reference_graphs, err = client:ReferenceGraph():list()
```


### RoleMapping

Create an instance: `local role_mapping = client:RoleMapping(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `principalId` | `string` |  |
| `principalName` | `string` | A friendly name for the principal. |
| `role` | `string` |  |

#### Example: Load

```lua
local role_mapping, err = client:RoleMapping():load({ id = "role_mapping_id" })
```

#### Example: List

```lua
local role_mappings, err = client:RoleMapping():list()
```

#### Example: Create

```lua
local role_mapping, err = client:RoleMapping():create({
  principalId = "example_principalId", -- string
  role = "example_role", -- string
})
```


### Rule

Create an instance: `local rule = client:Rule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: Load

```lua
local rule, err = client:Rule():load({ id = "rule_id" })
```

#### Example: List

```lua
local rules, err = client:Rule():list()
```


### SearchedBranch

Create an instance: `local searched_branch = client:SearchedBranch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `branchId` | `string` |  |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |
| `systemDefined` | `boolean` |  |

#### Example: List

```lua
local searched_branchs, err = client:SearchedBranch():list()
```


### SearchedGroup

Create an instance: `local searched_group = client:SearchedGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `labels` | `table` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: List

```lua
local searched_groups, err = client:SearchedGroup():list()
```


### SystemInfo

Create an instance: `local system_info = client:SystemInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `builtOn` | `string` |  |
| `description` | `string` |  |
| `name` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local system_info, err = client:SystemInfo():load()
```


### UsageSummary

Create an instance: `local usage_summary = client:UsageSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `number` |  |
| `dead` | `number` |  |
| `stale` | `number` |  |

#### Example: Load

```lua
local usage_summary, err = client:UsageSummary():load()
```


### UserInfo

Create an instance: `local user_info = client:UserInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `boolean` |  |
| `developer` | `boolean` |  |
| `displayName` | `string` |  |
| `username` | `string` |  |
| `viewer` | `boolean` |  |

#### Example: Load

```lua
local user_info, err = client:UserInfo():load()
```


### UserInterfaceConfig

Create an instance: `local user_interface_config = client:UserInterfaceConfig(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth` | `table` |  |
| `features` | `table` |  |
| `ui` | `table` |  |

#### Example: Load

```lua
local user_interface_config, err = client:UserInterfaceConfig():load()
```


### Version

Create an instance: `local version = client:Version(nil)`

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
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `branches` | `table` |  |
| `content` | `table` |  |
| `contentId` | `number` |  |
| `count` | `number` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `number` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `isDraft` | `boolean` |  |
| `labels` | `table` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `value` | `string` |  |
| `version` | `string` | A single version of an artifact. |
| `versions` | `table` | The collection of artifact versions returned in the result set. |

#### Example: Load

```lua
local version, err = client:Version():load({ artifact_id = "artifact_id", group_id = "group_id", version_expression = "version_expression" })
```

#### Example: List

```lua
local versions, err = client:Version():list()
```

#### Example: Create

```lua
local version, err = client:Version():create({
  artifactId = "example_artifactId", -- string
  artifactType = "example_artifactType", -- string
  content = {}, -- table
  contentId = 1, -- number
  count = 1, -- number
  createdOn = "example_createdOn", -- string
  globalId = 1, -- number
  owner = "example_owner", -- string
  value = "example_value", -- string
  version = "example_version", -- string
  versions = {}, -- table
})
```


### WellKnown

Create an instance: `local well_known = client:WellKnown(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `capabilities` | `table` | Capabilities of an A2A agent. |
| `createdOn` | `number` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `parameters` | `table` |  |
| `skills` | `table` |  |
| `supportedInterfaces` | `table` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local well_known, err = client:WellKnown():load({ artifact_id = "artifact_id", group_id = "group_id" })
```

#### Example: List

```lua
local well_knowns, err = client:WellKnown():list()
```


### WrappedVersionState

Create an instance: `local wrapped_version_state = client:WrappedVersionState(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `state` | `string` | Describes the state of an artifact or artifact version. |

#### Example: Load

```lua
local wrapped_version_state, err = client:WrappedVersionState():load({ artifact_id = "artifact_id", group_id = "group_id", version_expression = "version_expression" })
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── apicurio-registry_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`apicurio-registry_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local contractrule = client:ContractRule()
contractrule:list()

-- contractrule:data_get() now returns the contractrule data from the last list
-- contractrule:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
