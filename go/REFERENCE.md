# ApicurioRegistry Golang SDK Reference

Complete API reference for the ApicurioRegistry Golang SDK.


## ApicurioRegistrySDK

### Constructor

```go
func NewApicurioRegistrySDK(options map[string]any) *ApicurioRegistrySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ApicurioRegistrySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ApicurioRegistrySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Admin(data map[string]any) ApicurioRegistryEntity`

Create a new `Admin` entity instance. Pass `nil` for no initial data.

#### `Agent(data map[string]any) ApicurioRegistryEntity`

Create a new `Agent` entity instance. Pass `nil` for no initial data.

#### `AgentCard(data map[string]any) ApicurioRegistryEntity`

Create a new `AgentCard` entity instance. Pass `nil` for no initial data.

#### `AiCatalog(data map[string]any) ApicurioRegistryEntity`

Create a new `AiCatalog` entity instance. Pass `nil` for no initial data.

#### `ArdExplore(data map[string]any) ApicurioRegistryEntity`

Create a new `ArdExplore` entity instance. Pass `nil` for no initial data.

#### `ArdSearch(data map[string]any) ApicurioRegistryEntity`

Create a new `ArdSearch` entity instance. Pass `nil` for no initial data.

#### `Artifact(data map[string]any) ApicurioRegistryEntity`

Create a new `Artifact` entity instance. Pass `nil` for no initial data.

#### `ArtifactReference(data map[string]any) ApicurioRegistryEntity`

Create a new `ArtifactReference` entity instance. Pass `nil` for no initial data.

#### `ArtifactRule(data map[string]any) ApicurioRegistryEntity`

Create a new `ArtifactRule` entity instance. Pass `nil` for no initial data.

#### `ArtifactType(data map[string]any) ApicurioRegistryEntity`

Create a new `ArtifactType` entity instance. Pass `nil` for no initial data.

#### `Branch(data map[string]any) ApicurioRegistryEntity`

Create a new `Branch` entity instance. Pass `nil` for no initial data.

#### `Comment(data map[string]any) ApicurioRegistryEntity`

Create a new `Comment` entity instance. Pass `nil` for no initial data.

#### `ConfigurationProperty(data map[string]any) ApicurioRegistryEntity`

Create a new `ConfigurationProperty` entity instance. Pass `nil` for no initial data.

#### `ConsumerVersionHeatmap(data map[string]any) ApicurioRegistryEntity`

Create a new `ConsumerVersionHeatmap` entity instance. Pass `nil` for no initial data.

#### `Content(data map[string]any) ApicurioRegistryEntity`

Create a new `Content` entity instance. Pass `nil` for no initial data.

#### `Contract(data map[string]any) ApicurioRegistryEntity`

Create a new `Contract` entity instance. Pass `nil` for no initial data.

#### `ContractRule(data map[string]any) ApicurioRegistryEntity`

Create a new `ContractRule` entity instance. Pass `nil` for no initial data.

#### `ContractRuleSet(data map[string]any) ApicurioRegistryEntity`

Create a new `ContractRuleSet` entity instance. Pass `nil` for no initial data.

#### `CreateArtifact(data map[string]any) ApicurioRegistryEntity`

Create a new `CreateArtifact` entity instance. Pass `nil` for no initial data.

#### `DeprecationReadiness(data map[string]any) ApicurioRegistryEntity`

Create a new `DeprecationReadiness` entity instance. Pass `nil` for no initial data.

#### `DownloadRef(data map[string]any) ApicurioRegistryEntity`

Create a new `DownloadRef` entity instance. Pass `nil` for no initial data.

#### `GitOp(data map[string]any) ApicurioRegistryEntity`

Create a new `GitOp` entity instance. Pass `nil` for no initial data.

#### `GitOpsStatus(data map[string]any) ApicurioRegistryEntity`

Create a new `GitOpsStatus` entity instance. Pass `nil` for no initial data.

#### `GitOpsValidateTask(data map[string]any) ApicurioRegistryEntity`

Create a new `GitOpsValidateTask` entity instance. Pass `nil` for no initial data.

#### `GlobalRule(data map[string]any) ApicurioRegistryEntity`

Create a new `GlobalRule` entity instance. Pass `nil` for no initial data.

#### `Group(data map[string]any) ApicurioRegistryEntity`

Create a new `Group` entity instance. Pass `nil` for no initial data.

#### `GroupRule(data map[string]any) ApicurioRegistryEntity`

Create a new `GroupRule` entity instance. Pass `nil` for no initial data.

#### `KafkaSql(data map[string]any) ApicurioRegistryEntity`

Create a new `KafkaSql` entity instance. Pass `nil` for no initial data.

#### `McpTool(data map[string]any) ApicurioRegistryEntity`

Create a new `McpTool` entity instance. Pass `nil` for no initial data.

#### `Metadata(data map[string]any) ApicurioRegistryEntity`

Create a new `Metadata` entity instance. Pass `nil` for no initial data.

#### `OdcsContractResult(data map[string]any) ApicurioRegistryEntity`

Create a new `OdcsContractResult` entity instance. Pass `nil` for no initial data.

#### `OdcsContractSummary(data map[string]any) ApicurioRegistryEntity`

Create a new `OdcsContractSummary` entity instance. Pass `nil` for no initial data.

#### `ReferenceGraph(data map[string]any) ApicurioRegistryEntity`

Create a new `ReferenceGraph` entity instance. Pass `nil` for no initial data.

#### `RoleMapping(data map[string]any) ApicurioRegistryEntity`

Create a new `RoleMapping` entity instance. Pass `nil` for no initial data.

#### `Rule(data map[string]any) ApicurioRegistryEntity`

Create a new `Rule` entity instance. Pass `nil` for no initial data.

#### `SearchedBranch(data map[string]any) ApicurioRegistryEntity`

Create a new `SearchedBranch` entity instance. Pass `nil` for no initial data.

#### `SearchedGroup(data map[string]any) ApicurioRegistryEntity`

Create a new `SearchedGroup` entity instance. Pass `nil` for no initial data.

#### `SystemInfo(data map[string]any) ApicurioRegistryEntity`

Create a new `SystemInfo` entity instance. Pass `nil` for no initial data.

#### `UsageSummary(data map[string]any) ApicurioRegistryEntity`

Create a new `UsageSummary` entity instance. Pass `nil` for no initial data.

#### `UserInfo(data map[string]any) ApicurioRegistryEntity`

Create a new `UserInfo` entity instance. Pass `nil` for no initial data.

#### `UserInterfaceConfig(data map[string]any) ApicurioRegistryEntity`

Create a new `UserInterfaceConfig` entity instance. Pass `nil` for no initial data.

#### `Version(data map[string]any) ApicurioRegistryEntity`

Create a new `Version` entity instance. Pass `nil` for no initial data.

#### `WellKnown(data map[string]any) ApicurioRegistryEntity`

Create a new `WellKnown` entity instance. Pass `nil` for no initial data.

#### `WrappedVersionState(data map[string]any) ApicurioRegistryEntity`

Create a new `WrappedVersionState` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AdminEntity

```go
admin := client.Admin(nil)
fmt.Println(admin.GetName()) // "admin"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Admin(nil).Create(map[string]any{
    "role": "example_role",
    "value": "example_value",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Admin(nil).Update(map[string]any{
    "principal_id": "principal_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Admin(nil).Remove(map[string]any{"principal_id": "principal_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AdminEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AgentEntity

```go
agent := client.Agent(nil)
fmt.Println(agent.GetName()) // "agent"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `capabilities` | `map[string]any` | No | Capabilities of an A2A agent. |
| `createdOn` | `int` | No |  |
| `defaultInputModes` | `[]any` | No |  |
| `defaultOutputModes` | `[]any` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `groupId` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `map[string]any` | No | Provider of an A2A agent. |
| `securityRequirements` | `[]any` | No |  |
| `securitySchemes` | `map[string]any` | No |  |
| `signatures` | `[]any` | No |  |
| `skills` | `[]any` | No |  |
| `supportedInterfaces` | `[]any` | No |  |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Agent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AgentCardEntity

```go
agentCard := client.AgentCard(nil)
fmt.Println(agentCard.GetName()) // "agent_card"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `map[string]any` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `[]any` | No |  |
| `defaultOutputModes` | `[]any` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `map[string]any` | No | Provider of an A2A agent. |
| `securityRequirements` | `[]any` | No |  |
| `securitySchemes` | `map[string]any` | No |  |
| `signatures` | `[]any` | No |  |
| `skills` | `[]any` | No |  |
| `supportedInterfaces` | `[]any` | No |  |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AgentCard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgentCardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AiCatalogEntity

```go
aiCatalog := client.AiCatalog(nil)
fmt.Println(aiCatalog.GetName()) // "ai_catalog"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `[]any` | No |  |
| `description` | `string` | No |  |
| `displayName` | `string` | No |  |
| `identifier` | `string` | Yes |  |
| `representativeQueries` | `[]any` | No |  |
| `tags` | `[]any` | No |  |
| `type` | `string` | Yes |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AiCatalog(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AiCatalogEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArdExploreEntity

```go
ardExplore := client.ArdExplore(nil)
fmt.Println(ardExplore.GetName()) // "ard_explore"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `map[string]any` | No | ARD search query. |
| `resultType` | `map[string]any` | Yes | Requested result type for the ARD POST /explore endpoint. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ArdExplore(nil).Create(map[string]any{
    "resultType": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArdExploreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArdSearchEntity

```go
ardSearch := client.ArdSearch(nil)
fmt.Println(ardSearch.GetName()) // "ard_search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `federation` | `string` | No |  |
| `pageSize` | `int` | No |  |
| `pageToken` | `string` | No |  |
| `query` | `map[string]any` | Yes | ARD search query. |
| `results` | `[]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ArdSearch(nil).Create(map[string]any{
    "query": map[string]any{},
    "results": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArdSearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArtifactEntity

```go
artifact := client.Artifact(nil)
fmt.Println(artifact.GetName()) // "artifact"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `artifacts` | `[]any` | Yes | The artifacts returned in the result set. |
| `count` | `int` | Yes | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `map[string]any` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `versions` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Artifact(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Artifact(nil).Load(map[string]any{"global_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Artifact(nil).Create(map[string]any{
    "artifactId": "example_artifactId",
    "artifactType": "example_artifactType",
    "artifacts": []any{},
    "count": 1,
    "createdOn": "example_createdOn",
    "groupId": "example_groupId",
    "modifiedBy": "example_modifiedBy",
    "modifiedOn": "example_modifiedOn",
    "owner": "example_owner",
    "versions": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Artifact(nil).Remove(map[string]any{"group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArtifactEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArtifactReferenceEntity

```go
artifactReference := client.ArtifactReference(nil)
fmt.Println(artifactReference.GetName()) // "artifact_reference"
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
| `references` | `[]any` | No | Collection of references to other artifacts. |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ArtifactReference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ArtifactReference(nil).Create(map[string]any{
    "artifactId": "example_artifactId",
    "content": "example_content",
    "contentType": "example_contentType",
    "groupId": "example_groupId",
    "name": "example_name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArtifactReferenceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArtifactRuleEntity

```go
artifactRule := client.ArtifactRule(nil)
fmt.Println(artifactRule.GetName()) // "artifact_rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ArtifactRule(nil).Create(map[string]any{
    "group_id": "example_group_id",
    "id": "example_id",
    "config": "example_config",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ArtifactRule(nil).Remove(map[string]any{"group_id": "group_id", "id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArtifactRuleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArtifactTypeEntity

```go
artifactType := client.ArtifactType(nil)
fmt.Println(artifactType.GetName()) // "artifact_type"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ArtifactType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArtifactTypeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BranchEntity

```go
branch := client.Branch(nil)
fmt.Println(branch.GetName()) // "branch"
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
| `systemDefined` | `bool` | Yes |  |
| `versions` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Branch(nil).Load(map[string]any{"id": "branch_id", "artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Branch(nil).Create(map[string]any{
    "artifact_id": "example_artifact_id",
    "group_id": "example_group_id",
    "artifactId": "example_artifactId",
    "branchId": "example_branchId",
    "createdOn": "example_createdOn",
    "groupId": "example_groupId",
    "modifiedBy": "example_modifiedBy",
    "modifiedOn": "example_modifiedOn",
    "owner": "example_owner",
    "systemDefined": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Branch(nil).Update(map[string]any{
    "id": "branch_id",
    "artifact_id": "artifact_id",
    "group_id": "group_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Branch(nil).Remove(map[string]any{"id": "branch_id", "artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BranchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CommentEntity

```go
comment := client.Comment(nil)
fmt.Println(comment.GetName()) // "comment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Comment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Comment(nil).Create(map[string]any{
    "artifact_id": "example_artifact_id",
    "group_id": "example_group_id",
    "version_expression": "example_version_expression",
    "commentId": "example_commentId",
    "createdOn": "example_createdOn",
    "owner": "example_owner",
    "value": "example_value",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CommentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConfigurationPropertyEntity

```go
configurationProperty := client.ConfigurationProperty(nil)
fmt.Println(configurationProperty.GetName()) // "configuration_property"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConfigurationProperty(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ConfigurationProperty(nil).Load(map[string]any{"id": "configuration_property_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConfigurationPropertyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ConsumerVersionHeatmapEntity

```go
consumerVersionHeatmap := client.ConsumerVersionHeatmap(nil)
fmt.Println(consumerVersionHeatmap.GetName()) // "consumer_version_heatmap"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | Yes |  |
| `driftAlert` | `bool` | No |  |
| `versions` | `map[string]any` | No |  |
| `versionsBehind` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ConsumerVersionHeatmap(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ConsumerVersionHeatmapEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ContentEntity

```go
content := client.Content(nil)
fmt.Println(content.GetName()) // "content"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Content(nil).Create(map[string]any{
    "artifact_type": "example_artifact_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ContractEntity

```go
contract := client.Contract(nil)
fmt.Println(contract.GetName()) // "contract"
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
| `labels` | `map[string]any` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Contract(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Contract(nil).Load(map[string]any{"id": "contract_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Contract(nil).Create(map[string]any{
    "artifact_id": "example_artifact_id",
    "group_id": "example_group_id",
    "artifactId": "example_artifactId",
    "artifactType": "example_artifactType",
    "createdOn": "example_createdOn",
    "groupId": "example_groupId",
    "modifiedBy": "example_modifiedBy",
    "modifiedOn": "example_modifiedOn",
    "owner": "example_owner",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Contract(nil).Update(map[string]any{
    "id": "contract_id",
    "artifact_id": "artifact_id",
    "group_id": "group_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Contract(nil).Remove(map[string]any{"id": "contract_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContractEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ContractRuleEntity

```go
contractRule := client.ContractRule(nil)
fmt.Println(contractRule.GetName()) // "contract_rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No | The artifact ID containing the rule. |
| `globalId` | `int` | No | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | No | The group ID of the artifact containing the rule. |
| `rule` | `map[string]any` | Yes | A single contract rule definition. |
| `ruleCategory` | `string` | No | The rule category (DOMAIN or MIGRATION). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ContractRule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContractRuleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ContractRuleSetEntity

```go
contractRuleSet := client.ContractRuleSet(nil)
fmt.Println(contractRuleSet.GetName()) // "contract_rule_set"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domainRules` | `[]any` | No | Rules for domain validation. |
| `migrationRules` | `[]any` | No | Rules for version migration. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ContractRuleSet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ContractRuleSet(nil).Update(map[string]any{
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ContractRuleSetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CreateArtifactEntity

```go
createArtifact := client.CreateArtifact(nil)
fmt.Println(createArtifact.GetName()) // "create_artifact"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifact` | `map[string]any` | Yes |  |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | No |  |
| `description` | `string` | No |  |
| `firstVersion` | `map[string]any` | Yes |  |
| `labels` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `version` | `map[string]any` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CreateArtifact(nil).Create(map[string]any{
    "group_id": "example_group_id",
    "artifact": map[string]any{},
    "artifactId": "example_artifactId",
    "firstVersion": map[string]any{},
    "version": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CreateArtifactEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DeprecationReadinessEntity

```go
deprecationReadiness := client.DeprecationReadiness(nil)
fmt.Println(deprecationReadiness.GetName()) // "deprecation_readiness"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | No |  |
| `fetchCount` | `int` | No |  |
| `lastFetched` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DeprecationReadiness(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeprecationReadinessEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DownloadRefEntity

```go
downloadRef := client.DownloadRef(nil)
fmt.Println(downloadRef.GetName()) // "download_ref"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadId` | `string` | Yes |  |
| `href` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DownloadRef(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DownloadRefEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GitOpEntity

```go
gitOp := client.GitOp(nil)
fmt.Println(gitOp.GetName()) // "git_op"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ref` | `string` | Yes | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `string` | Yes | Repository ID to validate against. |
| `type` | `string` | No | Validation type. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.GitOp(nil).Create(map[string]any{
    "ref": "example_ref",
    "repoId": "example_repoId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.GitOp(nil).Remove(map[string]any{"task_id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GitOpEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GitOpsStatusEntity

```go
gitOpsStatus := client.GitOpsStatus(nil)
fmt.Println(gitOpsStatus.GetName()) // "git_ops_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | `string` | No | The file path or location where the error occurred. |
| `detail` | `string` | Yes | A human-readable description of the error. |
| `source` | `string` | No | The source ID (e.g., repository ID) where the error occurred. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GitOpsStatus(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GitOpsStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GitOpsValidateTaskEntity

```go
gitOpsValidateTask := client.GitOpsValidateTask(nil)
fmt.Println(gitOpsValidateTask.GetName()) // "git_ops_validate_task"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactCount` | `int` | No | Number of artifacts loaded during validation. |
| `completedAt` | `string` | No | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | No | ISO 8601 timestamp of when the task was created. |
| `errors` | `[]any` | No | Validation errors. |
| `groupCount` | `int` | No | Number of groups loaded during validation. |
| `ref` | `string` | No | Git ref being validated. |
| `repoId` | `string` | No | Repository ID being validated. |
| `result` | `string` | No | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Yes | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Yes | Unique identifier for the validation task. |
| `type` | `string` | No | Validation type (`pull` or `push`). |
| `versionCount` | `int` | No | Number of artifact versions loaded during validation. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GitOpsValidateTask(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GitOpsValidateTask(nil).Load(map[string]any{"task_id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GitOpsValidateTaskEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GlobalRuleEntity

```go
globalRule := client.GlobalRule(nil)
fmt.Println(globalRule.GetName()) // "global_rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.GlobalRule(nil).Create(map[string]any{
    "config": "example_config",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.GlobalRule(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GlobalRuleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GroupEntity

```go
group := client.Group(nil)
fmt.Println(group.GetName()) // "group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactsType` | `string` | No |  |
| `createdOn` | `string` | No |  |
| `description` | `string` | No |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `labels` | `map[string]any` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `owner` | `string` | No |  |
| `properties` | `map[string]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Group(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Group(nil).Load(map[string]any{"id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Group(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Group(nil).Update(map[string]any{
    "id": "group_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Group(nil).Remove(map[string]any{"id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GroupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GroupRuleEntity

```go
groupRule := client.GroupRule(nil)
fmt.Println(groupRule.GetName()) // "group_rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.GroupRule(nil).Create(map[string]any{
    "id": "example_id",
    "config": "example_config",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.GroupRule(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GroupRuleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## KafkaSqlEntity

```go
kafkaSql := client.KafkaSql(nil)
fmt.Println(kafkaSql.GetName()) // "kafka_sql"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshotId` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.KafkaSql(nil).Create(map[string]any{
    "snapshotId": "example_snapshotId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `KafkaSqlEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## McpToolEntity

```go
mcpTool := client.McpTool(nil)
fmt.Println(mcpTool.GetName()) // "mcp_tool"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `createdOn` | `int` | No |  |
| `description` | `string` | No |  |
| `groupId` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `parameters` | `[]any` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.McpTool(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `McpToolEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MetadataEntity

```go
metadata := client.Metadata(nil)
fmt.Println(metadata.GetName()) // "metadata"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `artifactType` | `string` | No |  |
| `contentId` | `int` | No |  |
| `contractMetadata` | `map[string]any` | No | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` | No |  |
| `description` | `string` | No |  |
| `globalId` | `int` | No |  |
| `groupId` | `string` | No |  |
| `labels` | `map[string]any` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `version` | `int` | No |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Metadata(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Metadata(nil).Create(map[string]any{
    "artifact_id": "example_artifact_id",
    "group_id": "example_group_id",
    "version_expression": "example_version_expression",
    "modifiedBy": "example_modifiedBy",
    "modifiedOn": "example_modifiedOn",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Metadata(nil).Update(map[string]any{
    "artifact_id": "artifact_id",
    "group_id": "group_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OdcsContractResultEntity

```go
odcsContractResult := client.OdcsContractResult(nil)
fmt.Println(odcsContractResult.GetName()) // "odcs_contract_result"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `labelsApplied` | `int` | No | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | `int` | No | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | `int` | No | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | `[]any` | No | Any warnings encountered during projection. |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OdcsContractResult(nil).Create(map[string]any{
    "group_id": "example_group_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.OdcsContractResult(nil).Update(map[string]any{
    "contract_id": "contract_id",
    "group_id": "group_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OdcsContractResultEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OdcsContractSummaryEntity

```go
odcsContractSummary := client.OdcsContractSummary(nil)
fmt.Println(odcsContractSummary.GetName()) // "odcs_contract_summary"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `string` | No | The contract artifact ID. |
| `name` | `string` | No | The contract display name. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.OdcsContractSummary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OdcsContractSummaryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReferenceGraphEntity

```go
referenceGraph := client.ReferenceGraph(nil)
fmt.Println(referenceGraph.GetName()) // "reference_graph"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `edges` | `[]any` | Yes | All edges (references) in the graph. |
| `metadata` | `map[string]any` | Yes | Metadata about the graph structure. |
| `nodes` | `[]any` | Yes | All nodes in the graph, including the root. |
| `root` | `map[string]any` | Yes | The root node of the graph (the artifact for which references were requested). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ReferenceGraph(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReferenceGraphEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RoleMappingEntity

```go
roleMapping := client.RoleMapping(nil)
fmt.Println(roleMapping.GetName()) // "role_mapping"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `principalId` | `string` | Yes |  |
| `principalName` | `string` | No | A friendly name for the principal. |
| `role` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.RoleMapping(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RoleMapping(nil).Load(map[string]any{"id": "role_mapping_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RoleMappingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RuleEntity

```go
rule := client.Rule(nil)
fmt.Println(rule.GetName()) // "rule"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Rule(nil).Load(map[string]any{"id": "rule_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Rule(nil).Update(map[string]any{
    "id": "rule_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RuleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchedBranchEntity

```go
searchedBranch := client.SearchedBranch(nil)
fmt.Println(searchedBranch.GetName()) // "searched_branch"
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
| `systemDefined` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SearchedBranch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchedBranchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchedGroupEntity

```go
searchedGroup := client.SearchedGroup(nil)
fmt.Println(searchedGroup.GetName()) // "searched_group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `labels` | `map[string]any` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SearchedGroup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchedGroupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SystemInfoEntity

```go
systemInfo := client.SystemInfo(nil)
fmt.Println(systemInfo.GetName()) // "system_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `builtOn` | `string` | No |  |
| `description` | `string` | No |  |
| `name` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SystemInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SystemInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UsageSummaryEntity

```go
usageSummary := client.UsageSummary(nil)
fmt.Println(usageSummary.GetName()) // "usage_summary"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `int` | Yes |  |
| `dead` | `int` | Yes |  |
| `stale` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UsageSummary(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserInfoEntity

```go
userInfo := client.UserInfo(nil)
fmt.Println(userInfo.GetName()) // "user_info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `bool` | No |  |
| `developer` | `bool` | No |  |
| `displayName` | `string` | No |  |
| `username` | `string` | No |  |
| `viewer` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UserInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserInfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserInterfaceConfigEntity

```go
userInterfaceConfig := client.UserInterfaceConfig(nil)
fmt.Println(userInterfaceConfig.GetName()) // "user_interface_config"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth` | `map[string]any` | Yes |  |
| `features` | `map[string]any` | No |  |
| `ui` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UserInterfaceConfig(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserInterfaceConfigEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VersionEntity

```go
version := client.Version(nil)
fmt.Println(version.GetName()) // "version"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `branches` | `[]any` | No |  |
| `content` | `map[string]any` | Yes |  |
| `contentId` | `int` | Yes |  |
| `count` | `int` | Yes | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `globalId` | `int` | Yes |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `isDraft` | `bool` | No |  |
| `labels` | `map[string]any` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `state` | `string` | Yes |  |
| `value` | `string` | Yes |  |
| `version` | `string` | No |  |
| `versions` | `[]any` | Yes | The collection of artifact versions returned in the result set. |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Version(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Version(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Version(nil).Create(map[string]any{
    "artifactId": "example_artifactId",
    "artifactType": "example_artifactType",
    "content": map[string]any{},
    "contentId": 1,
    "count": 1,
    "createdOn": "example_createdOn",
    "globalId": 1,
    "owner": "example_owner",
    "value": "example_value",
    "versions": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Version(nil).Update(map[string]any{
    "artifact_id": "artifact_id",
    "comment_id": "comment_id",
    "group_id": "group_id",
    "version_id": "version_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Version(nil).Remove(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VersionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WellKnownEntity

```go
wellKnown := client.WellKnown(nil)
fmt.Println(wellKnown.GetName()) // "well_known"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WellKnown(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WellKnownEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WrappedVersionStateEntity

```go
wrappedVersionState := client.WrappedVersionState(nil)
fmt.Println(wrappedVersionState.GetName()) // "wrapped_version_state"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `string` | Yes | Describes the state of an artifact or artifact version. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WrappedVersionState(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WrappedVersionStateEntity` instance with the same client and
options.

#### `GetName() string`

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

```go
client := sdk.NewApicurioRegistrySDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

