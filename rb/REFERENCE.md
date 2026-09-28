# ApicurioRegistry Ruby SDK Reference

Complete API reference for the ApicurioRegistry Ruby SDK.


## ApicurioRegistrySDK

### Constructor

```ruby
require_relative 'ApicurioRegistry_sdk'

client = ApicurioRegistrySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApicurioRegistrySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ApicurioRegistrySDK.test
```


### Instance Methods

#### `Admin(data = nil)`

Create a new `Admin` entity instance. Pass `nil` for no initial data.

#### `Agent(data = nil)`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `AgentCard(data = nil)`

Create a new `AgentCard` entity instance. Pass `nil` for no initial data.

#### `AiCatalog(data = nil)`

Create a new `AiCatalog` entity instance. Pass `nil` for no initial data.

#### `ArdExplore(data = nil)`

Create a new `ArdExplore` entity instance. Pass `nil` for no initial data.

#### `ArdSearch(data = nil)`

Create a new `ArdSearch` entity instance. Pass `nil` for no initial data.

#### `Artifact(data = nil)`

Create a new `Artifact` entity instance. Pass `nil` for no initial data.

#### `ArtifactReference(data = nil)`

Create a new `ArtifactReference` entity instance. Pass `nil` for no initial data.

#### `ArtifactRule(data = nil)`

Create a new `ArtifactRule` entity instance. Pass `nil` for no initial data.

#### `ArtifactType(data = nil)`

Create a new `ArtifactType` entity instance. Pass `nil` for no initial data.

#### `Branch(data = nil)`

Create a new `Branch` entity instance. Pass `nil` for no initial data.

#### `Comment(data = nil)`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `ConfigurationProperty(data = nil)`

Create a new `ConfigurationProperty` entity instance. Pass `nil` for no initial data.

#### `ConsumerVersionHeatmap(data = nil)`

Create a new `ConsumerVersionHeatmap` entity instance. Pass `nil` for no initial data.

#### `Content(data = nil)`

Create a new `Content` entity instance. Pass `nil` for no initial data.

#### `Contract(data = nil)`

Create a new `Contract` entity instance. Pass `nil` for no initial data.

#### `ContractRule(data = nil)`

Create a new `ContractRule` entity instance. Pass `nil` for no initial data.

#### `ContractRuleSet(data = nil)`

Create a new `ContractRuleSet` entity instance. Pass `nil` for no initial data.

#### `CreateArtifact(data = nil)`

Create a new `CreateArtifact` entity instance. Pass `nil` for no initial data.

#### `DeprecationReadiness(data = nil)`

Create a new `DeprecationReadiness` entity instance. Pass `nil` for no initial data.

#### `DownloadRef(data = nil)`

Create a new `DownloadRef` entity instance. Pass `nil` for no initial data.

#### `GitOp(data = nil)`

Create a new `GitOp` entity instance. Pass `nil` for no initial data.

#### `GitOpsStatus(data = nil)`

Create a new `GitOpsStatus` entity instance. Pass `nil` for no initial data.

#### `GitOpsValidateTask(data = nil)`

Create a new `GitOpsValidateTask` entity instance. Pass `nil` for no initial data.

#### `GlobalRule(data = nil)`

Create a new `GlobalRule` entity instance. Pass `nil` for no initial data.

#### `Group(data = nil)`

Create a new `Group` entity instance. Pass `nil` for no initial data.

#### `GroupRule(data = nil)`

Create a new `GroupRule` entity instance. Pass `nil` for no initial data.

#### `KafkaSql(data = nil)`

Create a new `KafkaSql` entity instance. Pass `nil` for no initial data.

#### `McpTool(data = nil)`

Create a new `McpTool` entity instance. Pass `nil` for no initial data.

#### `Metadata(data = nil)`

Create a new `Metadata` entity instance. Pass `nil` for no initial data.

#### `OdcsContractResult(data = nil)`

Create a new `OdcsContractResult` entity instance. Pass `nil` for no initial data.

#### `OdcsContractSummary(data = nil)`

Create a new `OdcsContractSummary` entity instance. Pass `nil` for no initial data.

#### `ReferenceGraph(data = nil)`

Create a new `ReferenceGraph` entity instance. Pass `nil` for no initial data.

#### `RoleMapping(data = nil)`

Create a new `RoleMapping` entity instance. Pass `nil` for no initial data.

#### `Rule(data = nil)`

Create a new `Rule` entity instance. Pass `nil` for no initial data.

#### `SearchedBranch(data = nil)`

Create a new `SearchedBranch` entity instance. Pass `nil` for no initial data.

#### `SearchedGroup(data = nil)`

Create a new `SearchedGroup` entity instance. Pass `nil` for no initial data.

#### `SystemInfo(data = nil)`

Create a new `SystemInfo` entity instance. Pass `nil` for no initial data.

#### `UsageSummary(data = nil)`

Create a new `UsageSummary` entity instance. Pass `nil` for no initial data.

#### `UserInfo(data = nil)`

Create a new `UserInfo` entity instance. Pass `nil` for no initial data.

#### `UserInterfaceConfig(data = nil)`

Create a new `UserInterfaceConfig` entity instance. Pass `nil` for no initial data.

#### `Version(data = nil)`

Create a new `Version` entity instance. Pass `nil` for no initial data.

#### `WellKnown(data = nil)`

Create a new `WellKnown` entity instance. Pass `nil` for no initial data.

#### `WrappedVersionState(data = nil)`

Create a new `WrappedVersionState` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AdminEntity

```ruby
admin = client.Admin
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `String` | Yes |  |
| `value` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Admin.create({
  "role" => "example_role", # String
  "value" => "example_value", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Admin.remove({ "principal_id" => "principal_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Admin.update({
  "principal_id" => "principal_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AdminEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentEntity

```ruby
agent = client.Agent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | No |  |
| `capabilities` | `Hash` | No | Capabilities of an A2A agent. |
| `createdOn` | `Integer` | No |  |
| `defaultInputModes` | `Array` | No |  |
| `defaultOutputModes` | `Array` | No |  |
| `description` | `String` | No |  |
| `documentationUrl` | `String` | No |  |
| `groupId` | `String` | No |  |
| `iconUrl` | `String` | No |  |
| `name` | `String` | No |  |
| `owner` | `String` | No |  |
| `protocolVersion` | `String` | No |  |
| `provider` | `Hash` | No | Provider of an A2A agent. |
| `securityRequirements` | `Array` | No |  |
| `securitySchemes` | `Hash` | No |  |
| `signatures` | `Array` | No |  |
| `skills` | `Array` | No |  |
| `supportedInterfaces` | `Array` | No |  |
| `version` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Agent.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AgentCardEntity

```ruby
agent_card = client.AgentCard
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `Hash` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `Array` | No |  |
| `defaultOutputModes` | `Array` | No |  |
| `description` | `String` | No |  |
| `documentationUrl` | `String` | No |  |
| `iconUrl` | `String` | No |  |
| `name` | `String` | No |  |
| `protocolVersion` | `String` | No |  |
| `provider` | `Hash` | No | Provider of an A2A agent. |
| `securityRequirements` | `Array` | No |  |
| `securitySchemes` | `Hash` | No |  |
| `signatures` | `Array` | No |  |
| `skills` | `Array` | No |  |
| `supportedInterfaces` | `Array` | No |  |
| `version` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AgentCard.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgentCardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AiCatalogEntity

```ruby
ai_catalog = client.AiCatalog
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `Array` | No |  |
| `description` | `String` | No |  |
| `displayName` | `String` | No |  |
| `identifier` | `String` | Yes |  |
| `representativeQueries` | `Array` | No |  |
| `tags` | `Array` | No |  |
| `type` | `String` | Yes |  |
| `updatedAt` | `String` | No |  |
| `url` | `String` | No |  |
| `version` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.AiCatalog.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AiCatalogEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArdExploreEntity

```ruby
ard_explore = client.ArdExplore
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `Hash` | No | ARD search query. |
| `resultType` | `Hash` | Yes | Requested result type for the ARD POST /explore endpoint. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ArdExplore.create({
  "resultType" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArdExploreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArdSearchEntity

```ruby
ard_search = client.ArdSearch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `federation` | `String` | No |  |
| `pageSize` | `Integer` | No |  |
| `pageToken` | `String` | No |  |
| `query` | `Hash` | Yes | ARD search query. |
| `results` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ArdSearch.create({
  "query" => {}, # Hash
  "results" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArdSearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArtifactEntity

```ruby
artifact = client.Artifact
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | Yes |  |
| `artifactType` | `String` | Yes |  |
| `artifacts` | `Array` | Yes | The artifacts returned in the result set. |
| `count` | `Integer` | Yes | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `String` | Yes |  |
| `description` | `String` | No |  |
| `groupId` | `String` | Yes |  |
| `id` | `String` | No |  |
| `labels` | `Hash` | No |  |
| `modifiedBy` | `String` | Yes |  |
| `modifiedOn` | `String` | Yes |  |
| `name` | `String` | No |  |
| `owner` | `String` | Yes |  |
| `versions` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Artifact.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Artifact.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Artifact.load({ "global_id" => 1 })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Artifact.remove({ "group_id" => "group_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArtifactEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArtifactReferenceEntity

```ruby
artifact_reference = client.ArtifactReference
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | Yes |  |
| `content` | `String` | Yes | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `String` | Yes | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `String` | No | Optional encoding for the content property. |
| `groupId` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `references` | `Array` | No | Collection of references to other artifacts. |
| `version` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ArtifactReference.create({
  "artifactId" => "example_artifactId", # String
  "content" => "example_content", # String
  "contentType" => "example_contentType", # String
  "groupId" => "example_groupId", # String
  "name" => "example_name", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ArtifactReference.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArtifactReferenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArtifactRuleEntity

```ruby
artifact_rule = client.ArtifactRule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ruleType` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ArtifactRule.create({
  "group_id" => "example_group_id", # String
  "id" => "example_id", # String
  "config" => "example_config", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.ArtifactRule.remove({ "group_id" => "group_id", "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArtifactRuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArtifactTypeEntity

```ruby
artifact_type = client.ArtifactType
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ArtifactType.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArtifactTypeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BranchEntity

```ruby
branch = client.Branch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | Yes |  |
| `branchId` | `String` | Yes |  |
| `createdOn` | `String` | Yes |  |
| `description` | `String` | No |  |
| `groupId` | `String` | Yes |  |
| `id` | `String` | No |  |
| `modifiedBy` | `String` | Yes |  |
| `modifiedOn` | `String` | Yes |  |
| `owner` | `String` | Yes |  |
| `systemDefined` | `Boolean` | Yes |  |
| `versions` | `Array` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Branch.create({
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Branch.load({ "id" => "branch_id", "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Branch.remove({ "id" => "branch_id", "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Branch.update({
  "id" => "branch_id",
  "artifact_id" => "artifact_id",
  "group_id" => "group_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BranchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CommentEntity

```ruby
comment = client.Comment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | `String` | Yes |  |
| `createdOn` | `String` | Yes |  |
| `owner` | `String` | Yes |  |
| `value` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Comment.create({
  "artifact_id" => "example_artifact_id", # String
  "group_id" => "example_group_id", # String
  "version_expression" => "example_version_expression", # String
  "commentId" => "example_commentId", # String
  "createdOn" => "example_createdOn", # String
  "owner" => "example_owner", # String
  "value" => "example_value", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Comment.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConfigurationPropertyEntity

```ruby
configuration_property = client.ConfigurationProperty
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | Yes |  |
| `id` | `String` | No |  |
| `label` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `type` | `String` | Yes |  |
| `value` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ConfigurationProperty.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ConfigurationProperty.load({ "id" => "configuration_property_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConfigurationPropertyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConsumerVersionHeatmapEntity

```ruby
consumer_version_heatmap = client.ConsumerVersionHeatmap
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `String` | Yes |  |
| `driftAlert` | `Boolean` | No |  |
| `versions` | `Hash` | No |  |
| `versionsBehind` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ConsumerVersionHeatmap.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConsumerVersionHeatmapEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContentEntity

```ruby
content = client.Content
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Content.create({
  "artifact_type" => "example_artifact_type", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContractEntity

```ruby
contract = client.Contract
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | Yes |  |
| `artifactType` | `String` | Yes |  |
| `createdOn` | `String` | Yes |  |
| `description` | `String` | No |  |
| `groupId` | `String` | Yes |  |
| `id` | `String` | No |  |
| `labels` | `Hash` | No |  |
| `modifiedBy` | `String` | Yes |  |
| `modifiedOn` | `String` | Yes |  |
| `name` | `String` | No |  |
| `owner` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Contract.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Contract.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Contract.load({ "id" => "contract_id", "group_id" => "group_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Contract.remove({ "id" => "contract_id", "group_id" => "group_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Contract.update({
  "id" => "contract_id",
  "artifact_id" => "artifact_id",
  "group_id" => "group_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContractEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContractRuleEntity

```ruby
contract_rule = client.ContractRule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | No | The artifact ID containing the rule. |
| `globalId` | `Integer` | No | The global ID of the version (null for artifact-level rules). |
| `groupId` | `String` | No | The group ID of the artifact containing the rule. |
| `rule` | `Hash` | Yes | A single contract rule definition. |
| `ruleCategory` | `String` | No | The rule category (DOMAIN or MIGRATION). |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ContractRule.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContractRuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ContractRuleSetEntity

```ruby
contract_rule_set = client.ContractRuleSet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domainRules` | `Array` | No | Rules for domain validation. |
| `migrationRules` | `Array` | No | Rules for version migration. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ContractRuleSet.list
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.ContractRuleSet.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ContractRuleSetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CreateArtifactEntity

```ruby
create_artifact = client.CreateArtifact
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifact` | `Hash` | Yes |  |
| `artifactId` | `String` | Yes |  |
| `artifactType` | `String` | No |  |
| `description` | `String` | No |  |
| `firstVersion` | `Hash` | Yes |  |
| `labels` | `Hash` | No |  |
| `name` | `String` | No |  |
| `version` | `Hash` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CreateArtifact.create({
  "group_id" => "example_group_id", # String
  "artifact" => {}, # Hash
  "artifactId" => "example_artifactId", # String
  "firstVersion" => {}, # Hash
  "version" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CreateArtifactEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeprecationReadinessEntity

```ruby
deprecation_readiness = client.DeprecationReadiness
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `String` | No |  |
| `fetchCount` | `Integer` | No |  |
| `lastFetched` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.DeprecationReadiness.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeprecationReadinessEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DownloadRefEntity

```ruby
download_ref = client.DownloadRef
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadId` | `String` | Yes |  |
| `href` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.DownloadRef.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DownloadRefEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GitOpEntity

```ruby
git_op = client.GitOp
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ref` | `String` | Yes | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `String` | Yes | Repository ID to validate against. |
| `type` | `String` | No | Validation type. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.GitOp.create({
  "ref" => "example_ref", # String
  "repoId" => "example_repoId", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.GitOp.remove({ "task_id" => "task_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GitOpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GitOpsStatusEntity

```ruby
git_ops_status = client.GitOpsStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | `String` | No | The file path or location where the error occurred. |
| `detail` | `String` | Yes | A human-readable description of the error. |
| `source` | `String` | No | The source ID (e.g., repository ID) where the error occurred. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GitOpsStatus.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GitOpsStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GitOpsValidateTaskEntity

```ruby
git_ops_validate_task = client.GitOpsValidateTask
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactCount` | `Integer` | No | Number of artifacts loaded during validation. |
| `completedAt` | `String` | No | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `String` | No | ISO 8601 timestamp of when the task was created. |
| `errors` | `Array` | No | Validation errors. |
| `groupCount` | `Integer` | No | Number of groups loaded during validation. |
| `ref` | `String` | No | Git ref being validated. |
| `repoId` | `String` | No | Repository ID being validated. |
| `result` | `String` | No | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `String` | Yes | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `String` | Yes | Unique identifier for the validation task. |
| `type` | `String` | No | Validation type (`pull` or `push`). |
| `versionCount` | `Integer` | No | Number of artifact versions loaded during validation. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GitOpsValidateTask.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GitOpsValidateTask.load({ "task_id" => "task_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GitOpsValidateTaskEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GlobalRuleEntity

```ruby
global_rule = client.GlobalRule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ruleType` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.GlobalRule.create({
  "config" => "example_config", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.GlobalRule.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GlobalRuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GroupEntity

```ruby
group = client.Group
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactsType` | `String` | No |  |
| `createdOn` | `String` | No |  |
| `description` | `String` | No |  |
| `groupId` | `String` | No |  |
| `id` | `String` | No |  |
| `labels` | `Hash` | No |  |
| `modifiedBy` | `String` | No |  |
| `modifiedOn` | `String` | No |  |
| `owner` | `String` | No |  |
| `properties` | `Hash` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `artifactsType` | - | - | - | - | - |
| `createdOn` | - | Yes | - | - | - |
| `description` | - | - | - | - | - |
| `groupId` | - | Yes | Yes | - | - |
| `id` | - | - | - | - | - |
| `labels` | - | - | - | - | - |
| `modifiedBy` | - | Yes | - | - | - |
| `modifiedOn` | - | Yes | - | - | - |
| `owner` | - | Yes | - | - | - |
| `properties` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Group.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Group.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Group.load({ "id" => "group_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Group.remove({ "id" => "group_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Group.update({
  "id" => "group_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GroupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GroupRuleEntity

```ruby
group_rule = client.GroupRule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ruleType` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.GroupRule.create({
  "id" => "example_id", # String
  "config" => "example_config", # String
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.GroupRule.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GroupRuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## KafkaSqlEntity

```ruby
kafka_sql = client.KafkaSql
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshotId` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.KafkaSql.create({
  "snapshotId" => "example_snapshotId", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `KafkaSqlEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## McpToolEntity

```ruby
mcp_tool = client.McpTool
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | No |  |
| `createdOn` | `Integer` | No |  |
| `description` | `String` | No |  |
| `groupId` | `String` | No |  |
| `name` | `String` | No |  |
| `owner` | `String` | No |  |
| `parameters` | `Array` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.McpTool.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `McpToolEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MetadataEntity

```ruby
metadata = client.Metadata
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | No |  |
| `artifactType` | `String` | No |  |
| `contentId` | `Integer` | No |  |
| `contractMetadata` | `Hash` | No | Contract metadata projected from the artifact labels. |
| `createdOn` | `String` | No |  |
| `description` | `String` | No |  |
| `globalId` | `Integer` | No |  |
| `groupId` | `String` | No |  |
| `labels` | `Hash` | No |  |
| `modifiedBy` | `String` | Yes |  |
| `modifiedOn` | `String` | Yes |  |
| `name` | `String` | No |  |
| `owner` | `String` | No |  |
| `version` | `Integer` | No |  |

### Field Usage by Operation

| Field | load | create | update |
| --- | --- | --- | --- |
| `artifactId` | Yes | - | - |
| `artifactType` | Yes | - | - |
| `contentId` | - | - | - |
| `contractMetadata` | - | - | - |
| `createdOn` | Yes | - | - |
| `description` | - | - | - |
| `globalId` | - | - | - |
| `groupId` | Yes | - | - |
| `labels` | - | - | - |
| `modifiedBy` | - | - | - |
| `modifiedOn` | - | - | - |
| `name` | - | - | - |
| `owner` | Yes | - | - |
| `version` | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Metadata.create({
  "artifact_id" => "example_artifact_id", # String
  "group_id" => "example_group_id", # String
  "version_expression" => "example_version_expression", # String
  "modifiedBy" => "example_modifiedBy", # String
  "modifiedOn" => "example_modifiedOn", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Metadata.load({ "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Metadata.update({
  "artifact_id" => "artifact_id",
  "group_id" => "group_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OdcsContractResultEntity

```ruby
odcs_contract_result = client.OdcsContractResult
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `labelsApplied` | `Integer` | No | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | `Integer` | No | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | `Integer` | No | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | `Array` | No | Any warnings encountered during projection. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OdcsContractResult.create({
  "group_id" => "example_group_id", # String
})
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.OdcsContractResult.update({
  "contract_id" => "contract_id",
  "group_id" => "group_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OdcsContractResultEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OdcsContractSummaryEntity

```ruby
odcs_contract_summary = client.OdcsContractSummary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `String` | No | The contract artifact ID. |
| `name` | `String` | No | The contract display name. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.OdcsContractSummary.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OdcsContractSummaryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReferenceGraphEntity

```ruby
reference_graph = client.ReferenceGraph
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `edges` | `Array` | Yes | All edges (references) in the graph. |
| `metadata` | `Hash` | Yes | Metadata about the graph structure. |
| `nodes` | `Array` | Yes | All nodes in the graph, including the root. |
| `root` | `Hash` | Yes | The root node of the graph (the artifact for which references were requested). |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ReferenceGraph.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReferenceGraphEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RoleMappingEntity

```ruby
role_mapping = client.RoleMapping
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `principalId` | `String` | Yes |  |
| `principalName` | `String` | No | A friendly name for the principal. |
| `role` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RoleMapping.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RoleMapping.load({ "id" => "role_mapping_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RoleMappingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RuleEntity

```ruby
rule = client.Rule
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `String` | Yes |  |
| `id` | `String` | No |  |
| `ruleType` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Rule.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Rule.load({ "id" => "rule_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Rule.update({
  "id" => "rule_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RuleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchedBranchEntity

```ruby
searched_branch = client.SearchedBranch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | Yes |  |
| `branchId` | `String` | Yes |  |
| `createdOn` | `String` | Yes |  |
| `description` | `String` | No |  |
| `groupId` | `String` | Yes |  |
| `modifiedBy` | `String` | Yes |  |
| `modifiedOn` | `String` | Yes |  |
| `owner` | `String` | Yes |  |
| `systemDefined` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SearchedBranch.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchedBranchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchedGroupEntity

```ruby
searched_group = client.SearchedGroup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `String` | Yes |  |
| `description` | `String` | No |  |
| `groupId` | `String` | Yes |  |
| `labels` | `Hash` | No |  |
| `modifiedBy` | `String` | Yes |  |
| `modifiedOn` | `String` | Yes |  |
| `owner` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SearchedGroup.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchedGroupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SystemInfoEntity

```ruby
system_info = client.SystemInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `builtOn` | `String` | No |  |
| `description` | `String` | No |  |
| `name` | `String` | No |  |
| `version` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SystemInfo.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SystemInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UsageSummaryEntity

```ruby
usage_summary = client.UsageSummary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Integer` | Yes |  |
| `dead` | `Integer` | Yes |  |
| `stale` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.UsageSummary.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserInfoEntity

```ruby
user_info = client.UserInfo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Boolean` | No |  |
| `developer` | `Boolean` | No |  |
| `displayName` | `String` | No |  |
| `username` | `String` | No |  |
| `viewer` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.UserInfo.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserInfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserInterfaceConfigEntity

```ruby
user_interface_config = client.UserInterfaceConfig
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth` | `Hash` | Yes |  |
| `features` | `Hash` | No |  |
| `ui` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.UserInterfaceConfig.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserInterfaceConfigEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VersionEntity

```ruby
version = client.Version
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `String` | Yes |  |
| `artifactType` | `String` | Yes |  |
| `branches` | `Array` | No |  |
| `content` | `Hash` | Yes |  |
| `contentId` | `Integer` | Yes |  |
| `count` | `Integer` | Yes | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `String` | Yes |  |
| `description` | `String` | No |  |
| `globalId` | `Integer` | Yes |  |
| `groupId` | `String` | No |  |
| `id` | `String` | No |  |
| `isDraft` | `Boolean` | No |  |
| `labels` | `Hash` | No |  |
| `modifiedBy` | `String` | No |  |
| `modifiedOn` | `String` | No |  |
| `name` | `String` | No |  |
| `owner` | `String` | Yes |  |
| `state` | `String` | Yes |  |
| `value` | `String` | Yes |  |
| `version` | `String` | No |  |
| `versions` | `Array` | Yes | The collection of artifact versions returned in the result set. |

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
| `state` | - | - | - | - | - |
| `value` | - | - | - | - | - |
| `version` | - | Yes | - | - | - |
| `versions` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Version.create({
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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Version.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Version.load({ "artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Version.remove({ "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Version.update({
  "artifact_id" => "artifact_id",
  "comment_id" => "comment_id",
  "group_id" => "group_id",
  "version_id" => "version_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VersionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WellKnownEntity

```ruby
well_known = client.WellKnown
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WellKnown.load({ "artifact_id" => "artifact_id", "group_id" => "group_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WellKnownEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WrappedVersionStateEntity

```ruby
wrapped_version_state = client.WrappedVersionState
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `String` | Yes | Describes the state of an artifact or artifact version. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WrappedVersionState.load({ "artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WrappedVersionStateEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = ApicurioRegistrySDK.new({
  "feature" => {
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

