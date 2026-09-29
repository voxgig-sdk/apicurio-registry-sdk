# ApicurioRegistry Lua SDK Reference

Complete API reference for the ApicurioRegistry Lua SDK.


## ApicurioRegistrySDK

### Constructor

```lua
local sdk = require("apicurio-registry_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Admin(data)`

Create a new `Admin` entity instance. Pass `nil` for no initial data.

#### `Agent(data)`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `AgentCard(data)`

Create a new `AgentCard` entity instance. Pass `nil` for no initial data.

#### `AiCatalog(data)`

Create a new `AiCatalog` entity instance. Pass `nil` for no initial data.

#### `ArdExplore(data)`

Create a new `ArdExplore` entity instance. Pass `nil` for no initial data.

#### `ArdSearch(data)`

Create a new `ArdSearch` entity instance. Pass `nil` for no initial data.

#### `Artifact(data)`

Create a new `Artifact` entity instance. Pass `nil` for no initial data.

#### `ArtifactReference(data)`

Create a new `ArtifactReference` entity instance. Pass `nil` for no initial data.

#### `ArtifactRule(data)`

Create a new `ArtifactRule` entity instance. Pass `nil` for no initial data.

#### `ArtifactType(data)`

Create a new `ArtifactType` entity instance. Pass `nil` for no initial data.

#### `Branch(data)`

Create a new `Branch` entity instance. Pass `nil` for no initial data.

#### `Comment(data)`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `ConfigurationProperty(data)`

Create a new `ConfigurationProperty` entity instance. Pass `nil` for no initial data.

#### `ConsumerVersionHeatmap(data)`

Create a new `ConsumerVersionHeatmap` entity instance. Pass `nil` for no initial data.

#### `Content(data)`

Create a new `Content` entity instance. Pass `nil` for no initial data.

#### `Contract(data)`

Create a new `Contract` entity instance. Pass `nil` for no initial data.

#### `ContractRule(data)`

Create a new `ContractRule` entity instance. Pass `nil` for no initial data.

#### `ContractRuleSet(data)`

Create a new `ContractRuleSet` entity instance. Pass `nil` for no initial data.

#### `CreateArtifact(data)`

Create a new `CreateArtifact` entity instance. Pass `nil` for no initial data.

#### `DeprecationReadiness(data)`

Create a new `DeprecationReadiness` entity instance. Pass `nil` for no initial data.

#### `DownloadRef(data)`

Create a new `DownloadRef` entity instance. Pass `nil` for no initial data.

#### `GitOp(data)`

Create a new `GitOp` entity instance. Pass `nil` for no initial data.

#### `GitOpsStatus(data)`

Create a new `GitOpsStatus` entity instance. Pass `nil` for no initial data.

#### `GitOpsValidateTask(data)`

Create a new `GitOpsValidateTask` entity instance. Pass `nil` for no initial data.

#### `GlobalRule(data)`

Create a new `GlobalRule` entity instance. Pass `nil` for no initial data.

#### `Group(data)`

Create a new `Group` entity instance. Pass `nil` for no initial data.

#### `GroupRule(data)`

Create a new `GroupRule` entity instance. Pass `nil` for no initial data.

#### `KafkaSql(data)`

Create a new `KafkaSql` entity instance. Pass `nil` for no initial data.

#### `Metadata(data)`

Create a new `Metadata` entity instance. Pass `nil` for no initial data.

#### `OdcsContractResult(data)`

Create a new `OdcsContractResult` entity instance. Pass `nil` for no initial data.

#### `OdcsContractSummary(data)`

Create a new `OdcsContractSummary` entity instance. Pass `nil` for no initial data.

#### `ReferenceGraph(data)`

Create a new `ReferenceGraph` entity instance. Pass `nil` for no initial data.

#### `RoleMapping(data)`

Create a new `RoleMapping` entity instance. Pass `nil` for no initial data.

#### `Rule(data)`

Create a new `Rule` entity instance. Pass `nil` for no initial data.

#### `SearchedBranch(data)`

Create a new `SearchedBranch` entity instance. Pass `nil` for no initial data.

#### `SearchedGroup(data)`

Create a new `SearchedGroup` entity instance. Pass `nil` for no initial data.

#### `SystemInfo(data)`

Create a new `SystemInfo` entity instance. Pass `nil` for no initial data.

#### `UsageSummary(data)`

Create a new `UsageSummary` entity instance. Pass `nil` for no initial data.

#### `UserInfo(data)`

Create a new `UserInfo` entity instance. Pass `nil` for no initial data.

#### `UserInterfaceConfig(data)`

Create a new `UserInterfaceConfig` entity instance. Pass `nil` for no initial data.

#### `Version(data)`

Create a new `Version` entity instance. Pass `nil` for no initial data.

#### `WellKnown(data)`

Create a new `WellKnown` entity instance. Pass `nil` for no initial data.

#### `WrappedVersionState(data)`

Create a new `WrappedVersionState` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AdminEntity

```lua
local admin = client:Admin(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Admin():create({
  role = --[[ string ]],
  value = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Admin():remove({ principal_id = "principal_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Admin():update({
  principal_id = "principal_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AdminEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentEntity

```lua
local agent = client:Agent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `table` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `table` | No |  |
| `defaultOutputModes` | `table` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `table` | No | Provider of an A2A agent. |
| `securityRequirements` | `table` | No |  |
| `securitySchemes` | `table` | No |  |
| `signatures` | `table` | No |  |
| `skills` | `table` | No |  |
| `supportedInterfaces` | `table` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Agent():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AgentCardEntity

```lua
local agent_card = client:AgentCard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `table` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `table` | No |  |
| `defaultOutputModes` | `table` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `table` | No | Provider of an A2A agent. |
| `securityRequirements` | `table` | No |  |
| `securitySchemes` | `table` | No |  |
| `signatures` | `table` | No |  |
| `skills` | `table` | No |  |
| `supportedInterfaces` | `table` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AgentCard():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentCardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AiCatalogEntity

```lua
local ai_catalog = client:AiCatalog(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `table` | No |  |
| `description` | `string` | No |  |
| `displayName` | `string` | No |  |
| `identifier` | `string` | Yes |  |
| `representativeQueries` | `table` | No |  |
| `tags` | `table` | No |  |
| `type` | `string` | Yes |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AiCatalog():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AiCatalogEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArdExploreEntity

```lua
local ard_explore = client:ArdExplore(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `facets` | `table` | No | Facets keyed by the requested facet field name. |
| `query` | `table` | No | ARD search query. |
| `resultType` | `string` | No | Requested result type for the ARD POST /explore endpoint. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `facets` | - |
| `query` | - |
| `resultType` | Yes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ArdExplore():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArdExploreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArdSearchEntity

```lua
local ard_search = client:ArdSearch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `federation` | `string` | No |  |
| `pageSize` | `number` | No |  |
| `pageToken` | `string` | No |  |
| `query` | `table` | Yes | ARD search query. |
| `results` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ArdSearch():create({
  query = --[[ table ]],
  results = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArdSearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArtifactEntity

```lua
local artifact = client:Artifact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `artifacts` | `table` | Yes | The artifacts returned in the result set. |
| `count` | `number` | Yes | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `table` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `versions` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Artifact():create({
  artifactId = --[[ string ]],
  artifactType = --[[ string ]],
  artifacts = --[[ table ]],
  count = --[[ number ]],
  createdOn = --[[ string ]],
  groupId = --[[ string ]],
  modifiedBy = --[[ string ]],
  modifiedOn = --[[ string ]],
  owner = --[[ string ]],
  versions = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Artifact():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Artifact():load({ global_id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Artifact():remove({ group_id = "group_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArtifactReferenceEntity

```lua
local artifact_reference = client:ArtifactReference(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `content` | `string` | Yes | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `string` | Yes | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `string` | No | Optional encoding for the content property. |
| `groupId` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `references` | `table` | No | Collection of references to other artifacts. |
| `version` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ArtifactReference():create({
  artifactId = --[[ string ]],
  content = --[[ string ]],
  contentType = --[[ string ]],
  groupId = --[[ string ]],
  name = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ArtifactReference():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactReferenceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArtifactRuleEntity

```lua
local artifact_rule = client:ArtifactRule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ArtifactRule():create({
  group_id = --[[ string ]],
  id = --[[ string ]],
  config = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ArtifactRule():remove({ group_id = "group_id", id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactRuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArtifactTypeEntity

```lua
local artifact_type = client:ArtifactType(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ArtifactType():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactTypeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BranchEntity

```lua
local branch = client:Branch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `branchId` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `systemDefined` | `boolean` | Yes |  |
| `versions` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Branch():create({
  artifact_id = --[[ string ]],
  group_id = --[[ string ]],
  artifactId = --[[ string ]],
  branchId = --[[ string ]],
  createdOn = --[[ string ]],
  groupId = --[[ string ]],
  modifiedBy = --[[ string ]],
  modifiedOn = --[[ string ]],
  owner = --[[ string ]],
  systemDefined = --[[ boolean ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Branch():load({ id = "branch_id", artifact_id = "artifact_id", group_id = "group_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Branch():remove({ id = "branch_id", artifact_id = "artifact_id", group_id = "group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Branch():update({
  id = "branch_id",
  artifact_id = "artifact_id",
  group_id = "group_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BranchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CommentEntity

```lua
local comment = client:Comment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Comment():create({
  artifact_id = --[[ string ]],
  group_id = --[[ string ]],
  version_expression = --[[ string ]],
  commentId = --[[ string ]],
  createdOn = --[[ string ]],
  owner = --[[ string ]],
  value = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Comment():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConfigurationPropertyEntity

```lua
local configuration_property = client:ConfigurationProperty(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | Yes |  |
| `id` | `string` | No |  |
| `label` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `type` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ConfigurationProperty():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ConfigurationProperty():load({ id = "configuration_property_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConfigurationPropertyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConsumerVersionHeatmapEntity

```lua
local consumer_version_heatmap = client:ConsumerVersionHeatmap(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | Yes |  |
| `driftAlert` | `boolean` | No |  |
| `versions` | `table` | No |  |
| `versionsBehind` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ConsumerVersionHeatmap():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConsumerVersionHeatmapEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContentEntity

```lua
local content = client:Content(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Content():create({
  artifact_type = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContractEntity

```lua
local contract = client:Contract(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `table` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Contract():create({
  artifact_id = --[[ string ]],
  group_id = --[[ string ]],
  artifactId = --[[ string ]],
  artifactType = --[[ string ]],
  createdOn = --[[ string ]],
  groupId = --[[ string ]],
  modifiedBy = --[[ string ]],
  modifiedOn = --[[ string ]],
  owner = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Contract():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Contract():load({ id = "contract_id", group_id = "group_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Contract():remove({ id = "contract_id", group_id = "group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Contract():update({
  id = "contract_id",
  artifact_id = "artifact_id",
  group_id = "group_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContractEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContractRuleEntity

```lua
local contract_rule = client:ContractRule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No | The artifact ID containing the rule. |
| `globalId` | `number` | No | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | No | The group ID of the artifact containing the rule. |
| `rule` | `table` | Yes | A single contract rule definition. |
| `ruleCategory` | `string` | No | The rule category (DOMAIN or MIGRATION). |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ContractRule():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContractRuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ContractRuleSetEntity

```lua
local contract_rule_set = client:ContractRuleSet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domainRules` | `table` | No | Rules for domain validation. |
| `migrationRules` | `table` | No | Rules for version migration. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ContractRuleSet():list()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ContractRuleSet():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContractRuleSetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CreateArtifactEntity

```lua
local create_artifact = client:CreateArtifact(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifact` | `table` | Yes |  |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | No |  |
| `description` | `string` | No |  |
| `firstVersion` | `table` | Yes |  |
| `labels` | `table` | No |  |
| `name` | `string` | No |  |
| `version` | `table` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CreateArtifact():create({
  group_id = --[[ string ]],
  artifact = --[[ table ]],
  artifactId = --[[ string ]],
  firstVersion = --[[ table ]],
  version = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateArtifactEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeprecationReadinessEntity

```lua
local deprecation_readiness = client:DeprecationReadiness(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | No |  |
| `fetchCount` | `number` | No |  |
| `lastFetched` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DeprecationReadiness():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeprecationReadinessEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DownloadRefEntity

```lua
local download_ref = client:DownloadRef(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadId` | `string` | Yes |  |
| `href` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:DownloadRef():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DownloadRefEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GitOpEntity

```lua
local git_op = client:GitOp(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:GitOp():create({
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:GitOp():remove({ task_id = "task_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GitOpEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GitOpsStatusEntity

```lua
local git_ops_status = client:GitOpsStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | `string` | No | The file path or location where the error occurred. |
| `detail` | `string` | Yes | A human-readable description of the error. |
| `source` | `string` | No | The source ID (e.g., repository ID) where the error occurred. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GitOpsStatus():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GitOpsStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GitOpsValidateTaskEntity

```lua
local git_ops_validate_task = client:GitOpsValidateTask(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactCount` | `number` | No | Number of artifacts loaded during validation. |
| `completedAt` | `string` | No | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | No | ISO 8601 timestamp of when the task was created. |
| `errors` | `table` | No | Validation errors. |
| `groupCount` | `number` | No | Number of groups loaded during validation. |
| `ref` | `string` | No | Git ref being validated. |
| `repoId` | `string` | No | Repository ID being validated. |
| `result` | `string` | No | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Yes | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Yes | Unique identifier for the validation task. |
| `type` | `string` | No | Validation type (`pull` or `push`). |
| `versionCount` | `number` | No | Number of artifact versions loaded during validation. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `artifactCount` | - | - | - |
| `completedAt` | - | - | - |
| `createdAt` | - | - | - |
| `errors` | - | - | - |
| `groupCount` | - | - | - |
| `ref` | - | - | Yes |
| `repoId` | - | - | Yes |
| `result` | - | - | - |
| `state` | - | - | - |
| `taskId` | - | - | - |
| `type` | - | - | - |
| `versionCount` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:GitOpsValidateTask():create({
  state = --[[ string ]],
  taskId = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GitOpsValidateTask():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GitOpsValidateTask():load({ task_id = "task_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GitOpsValidateTaskEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GlobalRuleEntity

```lua
local global_rule = client:GlobalRule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:GlobalRule():create({
  config = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GlobalRule():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:GlobalRule():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GlobalRuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GroupEntity

```lua
local group = client:Group(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `table` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdOn` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `groupId` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `labels` | - | - | - | - | - |
| `modifiedBy` | - | - | - | - | - |
| `modifiedOn` | - | - | - | - | - |
| `owner` | - | - | - | Yes | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Group():create({
  createdOn = --[[ string ]],
  groupId = --[[ string ]],
  modifiedBy = --[[ string ]],
  modifiedOn = --[[ string ]],
  owner = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Group():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Group():load({ id = "group_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Group():remove({ id = "group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Group():update({
  id = "group_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GroupRuleEntity

```lua
local group_rule = client:GroupRule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:GroupRule():create({
  id = --[[ string ]],
  config = --[[ string ]],
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:GroupRule():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupRuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## KafkaSqlEntity

```lua
local kafka_sql = client:KafkaSql(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshotId` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:KafkaSql():create({
  snapshotId = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KafkaSqlEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MetadataEntity

```lua
local metadata = client:Metadata(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `contentId` | `number` | Yes |  |
| `contractMetadata` | `table` | No | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `globalId` | `number` | Yes |  |
| `groupId` | `string` | No |  |
| `labels` | `table` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `state` | `string` | No |  |
| `version` | `string` | Yes | A single version of an artifact. |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `artifactId` | - | - | - |
| `artifactType` | - | - | - |
| `contentId` | - | - | - |
| `contractMetadata` | - | - | - |
| `createdOn` | - | - | - |
| `description` | - | - | - |
| `globalId` | - | - | - |
| `groupId` | Yes | - | - |
| `labels` | - | - | - |
| `modifiedBy` | Yes | - | - |
| `modifiedOn` | Yes | - | - |
| `name` | - | - | - |
| `owner` | - | - | Yes |
| `state` | - | - | - |
| `version` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Metadata():create({
  artifact_id = --[[ string ]],
  group_id = --[[ string ]],
  version_expression = --[[ string ]],
  artifactId = --[[ string ]],
  artifactType = --[[ string ]],
  contentId = --[[ number ]],
  createdOn = --[[ string ]],
  globalId = --[[ number ]],
  owner = --[[ string ]],
  version = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Metadata():load({ artifact_id = "artifact_id", group_id = "group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Metadata():update({
  artifact_id = "artifact_id",
  group_id = "group_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OdcsContractResultEntity

```lua
local odcs_contract_result = client:OdcsContractResult(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `string` | No | The contract artifact ID. |
| `projection` | `table` | No | Summary of the projection performed when an ODCS contract is applied. |
| `version` | `string` | No | The ODCS contract version. |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:OdcsContractResult():create({
  group_id = --[[ string ]],
})
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:OdcsContractResult():update({
  contract_id = "contract_id",
  group_id = "group_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OdcsContractResultEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OdcsContractSummaryEntity

```lua
local odcs_contract_summary = client:OdcsContractSummary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `string` | No | The contract artifact ID. |
| `name` | `string` | No | The contract display name. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:OdcsContractSummary():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OdcsContractSummaryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReferenceGraphEntity

```lua
local reference_graph = client:ReferenceGraph(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `edges` | `table` | Yes | All edges (references) in the graph. |
| `metadata` | `table` | Yes | Metadata about the graph structure. |
| `nodes` | `table` | Yes | All nodes in the graph, including the root. |
| `root` | `table` | Yes | The root node of the graph (the artifact for which references were requested). |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ReferenceGraph():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReferenceGraphEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RoleMappingEntity

```lua
local role_mapping = client:RoleMapping(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `principalId` | `string` | Yes |  |
| `principalName` | `string` | No | A friendly name for the principal. |
| `role` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:RoleMapping():create({
  principalId = --[[ string ]],
  role = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RoleMapping():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RoleMapping():load({ id = "role_mapping_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RoleMappingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RuleEntity

```lua
local rule = client:Rule(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Rule():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Rule():load({ id = "rule_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Rule():update({
  id = "rule_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RuleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchedBranchEntity

```lua
local searched_branch = client:SearchedBranch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `branchId` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `systemDefined` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:SearchedBranch():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchedBranchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchedGroupEntity

```lua
local searched_group = client:SearchedGroup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `labels` | `table` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:SearchedGroup():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchedGroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SystemInfoEntity

```lua
local system_info = client:SystemInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `builtOn` | `string` | No |  |
| `description` | `string` | No |  |
| `name` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:SystemInfo():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UsageSummaryEntity

```lua
local usage_summary = client:UsageSummary(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `number` | Yes |  |
| `dead` | `number` | Yes |  |
| `stale` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UsageSummary():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserInfoEntity

```lua
local user_info = client:UserInfo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `boolean` | No |  |
| `developer` | `boolean` | No |  |
| `displayName` | `string` | No |  |
| `username` | `string` | No |  |
| `viewer` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UserInfo():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserInterfaceConfigEntity

```lua
local user_interface_config = client:UserInterfaceConfig(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth` | `table` | Yes |  |
| `features` | `table` | No |  |
| `ui` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UserInterfaceConfig():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInterfaceConfigEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VersionEntity

```lua
local version = client:Version(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `branches` | `table` | No |  |
| `content` | `table` | Yes |  |
| `contentId` | `number` | Yes |  |
| `count` | `number` | Yes | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `globalId` | `number` | Yes |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `isDraft` | `boolean` | No |  |
| `labels` | `table` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `state` | `string` | No |  |
| `value` | `string` | Yes |  |
| `version` | `string` | Yes | A single version of an artifact. |
| `versions` | `table` | Yes | The collection of artifact versions returned in the result set. |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `artifactId` | - | - | - | - | - |
| `artifactType` | - | - | - | - | - |
| `branches` | - | - | - | - | - |
| `content` | - | - | - | - | - |
| `contentId` | - | - | - | - | - |
| `count` | - | - | - | - | - |
| `createdOn` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `globalId` | - | - | - | - | - |
| `groupId` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `isDraft` | - | - | - | - | - |
| `labels` | - | - | - | - | - |
| `modifiedBy` | - | - | - | - | - |
| `modifiedOn` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `owner` | - | - | - | - | - |
| `state` | - | Yes | - | - | - |
| `value` | - | - | - | - | - |
| `version` | - | - | Yes | - | - |
| `versions` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Version():create({
  artifactId = --[[ string ]],
  artifactType = --[[ string ]],
  content = --[[ table ]],
  contentId = --[[ number ]],
  count = --[[ number ]],
  createdOn = --[[ string ]],
  globalId = --[[ number ]],
  owner = --[[ string ]],
  value = --[[ string ]],
  version = --[[ string ]],
  versions = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Version():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Version():load({ artifact_id = "artifact_id", group_id = "group_id", version_expression = "version_expression" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Version():remove({ artifact_id = "artifact_id", group_id = "group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Version():update({
  artifact_id = "artifact_id",
  comment_id = "comment_id",
  group_id = "group_id",
  version_id = "version_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VersionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WellKnownEntity

```lua
local well_known = client:WellKnown(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `capabilities` | `table` | No | Capabilities of an A2A agent. |
| `createdOn` | `number` | No |  |
| `description` | `string` | No |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `parameters` | `table` | No |  |
| `skills` | `table` | No |  |
| `supportedInterfaces` | `table` | No |  |
| `title` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WellKnown():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WellKnown():load({ artifact_id = "artifact_id", group_id = "group_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WellKnownEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WrappedVersionStateEntity

```lua
local wrapped_version_state = client:WrappedVersionState(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `string` | Yes | Describes the state of an artifact or artifact version. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WrappedVersionState():load({ artifact_id = "artifact_id", group_id = "group_id", version_expression = "version_expression" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WrappedVersionStateEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

