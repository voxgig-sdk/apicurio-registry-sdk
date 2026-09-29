# ApicurioRegistry TypeScript SDK Reference

Complete API reference for the ApicurioRegistry TypeScript SDK.


## ApicurioRegistrySDK

### Constructor

```ts
new ApicurioRegistrySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApicurioRegistrySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ApicurioRegistrySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ApicurioRegistrySDK` instance in test mode.


### Instance Methods

#### `Admin(data?: object)`

Create a new `Admin` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AdminEntity` instance.

#### `Agent(data?: object)`

Create a new `Agent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentEntity` instance.

#### `AgentCard(data?: object)`

Create a new `AgentCard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgentCardEntity` instance.

#### `AiCatalog(data?: object)`

Create a new `AiCatalog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AiCatalogEntity` instance.

#### `ArdExplore(data?: object)`

Create a new `ArdExplore` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArdExploreEntity` instance.

#### `ArdSearch(data?: object)`

Create a new `ArdSearch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArdSearchEntity` instance.

#### `Artifact(data?: object)`

Create a new `Artifact` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArtifactEntity` instance.

#### `ArtifactReference(data?: object)`

Create a new `ArtifactReference` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArtifactReferenceEntity` instance.

#### `ArtifactRule(data?: object)`

Create a new `ArtifactRule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArtifactRuleEntity` instance.

#### `ArtifactType(data?: object)`

Create a new `ArtifactType` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArtifactTypeEntity` instance.

#### `Branch(data?: object)`

Create a new `Branch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BranchEntity` instance.

#### `Comment(data?: object)`

Create a new `Comment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommentEntity` instance.

#### `ConfigurationProperty(data?: object)`

Create a new `ConfigurationProperty` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConfigurationPropertyEntity` instance.

#### `ConsumerVersionHeatmap(data?: object)`

Create a new `ConsumerVersionHeatmap` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConsumerVersionHeatmapEntity` instance.

#### `Content(data?: object)`

Create a new `Content` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContentEntity` instance.

#### `Contract(data?: object)`

Create a new `Contract` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContractEntity` instance.

#### `ContractRule(data?: object)`

Create a new `ContractRule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContractRuleEntity` instance.

#### `ContractRuleSet(data?: object)`

Create a new `ContractRuleSet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContractRuleSetEntity` instance.

#### `CreateArtifact(data?: object)`

Create a new `CreateArtifact` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateArtifactEntity` instance.

#### `DeprecationReadiness(data?: object)`

Create a new `DeprecationReadiness` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeprecationReadinessEntity` instance.

#### `DownloadRef(data?: object)`

Create a new `DownloadRef` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DownloadRefEntity` instance.

#### `GitOp(data?: object)`

Create a new `GitOp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GitOpEntity` instance.

#### `GitOpsStatus(data?: object)`

Create a new `GitOpsStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GitOpsStatusEntity` instance.

#### `GitOpsValidateTask(data?: object)`

Create a new `GitOpsValidateTask` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GitOpsValidateTaskEntity` instance.

#### `GlobalRule(data?: object)`

Create a new `GlobalRule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GlobalRuleEntity` instance.

#### `Group(data?: object)`

Create a new `Group` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupEntity` instance.

#### `GroupRule(data?: object)`

Create a new `GroupRule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupRuleEntity` instance.

#### `KafkaSql(data?: object)`

Create a new `KafkaSql` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `KafkaSqlEntity` instance.

#### `Metadata(data?: object)`

Create a new `Metadata` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetadataEntity` instance.

#### `OdcsContractResult(data?: object)`

Create a new `OdcsContractResult` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OdcsContractResultEntity` instance.

#### `OdcsContractSummary(data?: object)`

Create a new `OdcsContractSummary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OdcsContractSummaryEntity` instance.

#### `ReferenceGraph(data?: object)`

Create a new `ReferenceGraph` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReferenceGraphEntity` instance.

#### `RoleMapping(data?: object)`

Create a new `RoleMapping` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RoleMappingEntity` instance.

#### `Rule(data?: object)`

Create a new `Rule` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RuleEntity` instance.

#### `SearchedBranch(data?: object)`

Create a new `SearchedBranch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchedBranchEntity` instance.

#### `SearchedGroup(data?: object)`

Create a new `SearchedGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchedGroupEntity` instance.

#### `SystemInfo(data?: object)`

Create a new `SystemInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SystemInfoEntity` instance.

#### `UsageSummary(data?: object)`

Create a new `UsageSummary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsageSummaryEntity` instance.

#### `UserInfo(data?: object)`

Create a new `UserInfo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserInfoEntity` instance.

#### `UserInterfaceConfig(data?: object)`

Create a new `UserInterfaceConfig` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserInterfaceConfigEntity` instance.

#### `Version(data?: object)`

Create a new `Version` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VersionEntity` instance.

#### `WellKnown(data?: object)`

Create a new `WellKnown` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WellKnownEntity` instance.

#### `WrappedVersionState(data?: object)`

Create a new `WrappedVersionState` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WrappedVersionStateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ApicurioRegistrySDK.test()`.

**Returns:** `ApicurioRegistrySDK` instance in test mode.


---

## AdminEntity

```ts
const admin = client.Admin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `import` | `/admin/import` | `client.Admin().create({ $action: 'import', ... })` |

An action returns that action's OWN response, which is not necessarily a
Admin record — check the API definition for its shape.

```ts
const result = await client.Admin().create({
  $action: 'import',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Admin().create({
  role: 'example_role',
  value: 'example_value',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Admin().remove({ principal_id: 'principal_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Admin().update({
  principal_id: 'principal_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AdminEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentEntity

```ts
const agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `Record<string, any>` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `any[]` | No |  |
| `defaultOutputModes` | `any[]` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `Record<string, any>` | No | Provider of an A2A agent. |
| `securityRequirements` | `any[]` | No |  |
| `securitySchemes` | `Record<string, any>` | No |  |
| `signatures` | `any[]` | No |  |
| `skills` | `any[]` | No |  |
| `supportedInterfaces` | `any[]` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Agent().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AgentCardEntity

```ts
const agent_card = client.AgentCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `Record<string, any>` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `any[]` | No |  |
| `defaultOutputModes` | `any[]` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `Record<string, any>` | No | Provider of an A2A agent. |
| `securityRequirements` | `any[]` | No |  |
| `securitySchemes` | `Record<string, any>` | No |  |
| `signatures` | `any[]` | No |  |
| `skills` | `any[]` | No |  |
| `supportedInterfaces` | `any[]` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AgentCard().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgentCardEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AiCatalogEntity

```ts
const ai_catalog = client.AiCatalog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `any[]` | No |  |
| `description` | `string` | No |  |
| `displayName` | `string` | No |  |
| `identifier` | `string` | Yes |  |
| `representativeQueries` | `any[]` | No |  |
| `tags` | `any[]` | No |  |
| `type` | `string` | Yes |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AiCatalog().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AiCatalogEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArdExploreEntity

```ts
const ard_explore = client.ArdExplore()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `facets` | `Record<string, any>` | No | Facets keyed by the requested facet field name. |
| `query` | `Record<string, any>` | No | ARD search query. |
| `resultType` | `string` | No | Requested result type for the ARD POST /explore endpoint. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `facets` | - |
| `query` | - |
| `resultType` | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ArdExplore().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArdExploreEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArdSearchEntity

```ts
const ard_search = client.ArdSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `federation` | `string` | No |  |
| `pageSize` | `number` | No |  |
| `pageToken` | `string` | No |  |
| `query` | `Record<string, any>` | Yes | ARD search query. |
| `results` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ArdSearch().create({
  query: {},
  results: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArdSearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArtifactEntity

```ts
const artifact = client.Artifact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `artifacts` | `any[]` | Yes | The artifacts returned in the result set. |
| `count` | `number` | Yes | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `Record<string, any>` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `versions` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Artifact().create({
  artifactId: 'example_artifactId',
  artifactType: 'example_artifactType',
  artifacts: [],
  count: 1,
  createdOn: 'example_createdOn',
  groupId: 'example_groupId',
  modifiedBy: 'example_modifiedBy',
  modifiedOn: 'example_modifiedOn',
  owner: 'example_owner',
  versions: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Artifact().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Artifact().load({ global_id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Artifact().remove({ group_id: 'group_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArtifactEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArtifactReferenceEntity

```ts
const artifact_reference = client.ArtifactReference()
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
| `references` | `any[]` | No | Collection of references to other artifacts. |
| `version` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ArtifactReference().create({
  artifactId: 'example_artifactId',
  content: 'example_content',
  contentType: 'example_contentType',
  groupId: 'example_groupId',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ArtifactReference().list({ global_id_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArtifactReferenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArtifactRuleEntity

```ts
const artifact_rule = client.ArtifactRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ArtifactRule().create({
  group_id: 'example_group_id',
  id: 'example_id',
  config: 'example_config',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ArtifactRule().remove({ group_id: 'group_id', id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArtifactRuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArtifactTypeEntity

```ts
const artifact_type = client.ArtifactType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ArtifactType().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArtifactTypeEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BranchEntity

```ts
const branch = client.Branch()
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
| `versions` | `any[]` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `version` | `/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions` | `client.Branch().create({ $action: 'version', ... })` |
| `version` | `/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions` | `client.Branch().update({ $action: 'version', ... })` |

An action returns that action's OWN response, which is not necessarily a
Branch record — check the API definition for its shape.

```ts
const result = await client.Branch().create({
  $action: 'version',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Branch().create({
  artifact_id: 'example_artifact_id',
  group_id: 'example_group_id',
  artifactId: 'example_artifactId',
  branchId: 'example_branchId',
  createdOn: 'example_createdOn',
  groupId: 'example_groupId',
  modifiedBy: 'example_modifiedBy',
  modifiedOn: 'example_modifiedOn',
  owner: 'example_owner',
  systemDefined: true,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Branch().load({ id: 'branch_id', artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Branch().remove({ id: 'branch_id', artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Branch().update({
  id: 'branch_id',
  artifact_id: 'artifact_id',
  group_id: 'group_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BranchEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommentEntity

```ts
const comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Comment().create({
  artifact_id: 'example_artifact_id',
  group_id: 'example_group_id',
  version_expression: 'example_version_expression',
  commentId: 'example_commentId',
  createdOn: 'example_createdOn',
  owner: 'example_owner',
  value: 'example_value',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Comment().list({ artifact_id: "example", group_id: "example", version_expression: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConfigurationPropertyEntity

```ts
const configuration_property = client.ConfigurationProperty()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ConfigurationProperty().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ConfigurationProperty().load({ id: 'configuration_property_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConfigurationPropertyEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConsumerVersionHeatmapEntity

```ts
const consumer_version_heatmap = client.ConsumerVersionHeatmap()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | Yes |  |
| `driftAlert` | `boolean` | No |  |
| `versions` | `Record<string, any>` | No |  |
| `versionsBehind` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ConsumerVersionHeatmap().list({ artifact_id: "example", group_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConsumerVersionHeatmapEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContentEntity

```ts
const content = client.Content()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `canonicalize` | `/content/canonicalize` | `client.Content().create({ $action: 'canonicalize', ... })` |

An action returns that action's OWN response, which is not necessarily a
Content record — check the API definition for its shape.

```ts
const result = await client.Content().create({
  $action: 'canonicalize',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Content().create({
  artifact_type: 'example_artifact_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContentEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContractEntity

```ts
const contract = client.Contract()
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
| `labels` | `Record<string, any>` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `execute` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute` | `client.Contract().create({ $action: 'execute', ... })` |
| `migrate` | `/groups/{groupId}/artifacts/{artifactId}/contract/migrate` | `client.Contract().create({ $action: 'migrate', ... })` |
| `promote` | `/groups/{groupId}/artifacts/{artifactId}/contract/promote` | `client.Contract().create({ $action: 'promote', ... })` |
| `status` | `/groups/{groupId}/artifacts/{artifactId}/contract/status` | `client.Contract().create({ $action: 'status', ... })` |
| `audit` | `/groups/{groupId}/artifacts/{artifactId}/contract/audit` | `client.Contract().list({ $action: 'audit', ... })` |
| `compatibility_group` | `/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group` | `client.Contract().load({ $action: 'compatibility_group', ... })` |
| `export` | `/groups/{groupId}/artifacts/{artifactId}/contract/export` | `client.Contract().load({ $action: 'export', ... })` |
| `metadata` | `/groups/{groupId}/artifacts/{artifactId}/contract/metadata` | `client.Contract().load({ $action: 'metadata', ... })` |
| `quality` | `/groups/{groupId}/artifacts/{artifactId}/contract/quality` | `client.Contract().load({ $action: 'quality', ... })` |
| `ruleset` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset` | `client.Contract().remove({ $action: 'ruleset', ... })` |
| `ruleset` | `/groups/{groupId}/artifacts/{artifactId}/contract/ruleset` | `client.Contract().remove({ $action: 'ruleset', ... })` |
| `compatibility_group` | `/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group` | `client.Contract().update({ $action: 'compatibility_group', ... })` |
| `metadata` | `/groups/{groupId}/artifacts/{artifactId}/contract/metadata` | `client.Contract().update({ $action: 'metadata', ... })` |

An action returns that action's OWN response, which is not necessarily a
Contract record — check the API definition for its shape.

```ts
const result = await client.Contract().create({
  $action: 'execute',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Contract().create({
  artifact_id: 'example_artifact_id',
  group_id: 'example_group_id',
  artifactId: 'example_artifactId',
  artifactType: 'example_artifactType',
  createdOn: 'example_createdOn',
  groupId: 'example_groupId',
  modifiedBy: 'example_modifiedBy',
  modifiedOn: 'example_modifiedOn',
  owner: 'example_owner',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Contract().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Contract().load({ id: 'contract_id', group_id: 'group_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Contract().remove({ id: 'contract_id', group_id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Contract().update({
  id: 'contract_id',
  artifact_id: 'artifact_id',
  group_id: 'group_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContractEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContractRuleEntity

```ts
const contract_rule = client.ContractRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No | The artifact ID containing the rule. |
| `globalId` | `number` | No | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | No | The group ID of the artifact containing the rule. |
| `rule` | `Record<string, any>` | Yes | A single contract rule definition. |
| `ruleCategory` | `string` | No | The rule category (DOMAIN or MIGRATION). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ContractRule().list({ tag: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContractRuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContractRuleSetEntity

```ts
const contract_rule_set = client.ContractRuleSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domainRules` | `any[]` | No | Rules for domain validation. |
| `migrationRules` | `any[]` | No | Rules for version migration. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ContractRuleSet().list()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ContractRuleSet().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContractRuleSetEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateArtifactEntity

```ts
const create_artifact = client.CreateArtifact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifact` | `Record<string, any>` | Yes |  |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | No |  |
| `description` | `string` | No |  |
| `firstVersion` | `Record<string, any>` | Yes |  |
| `labels` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `version` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CreateArtifact().create({
  group_id: 'example_group_id',
  artifact: {},
  artifactId: 'example_artifactId',
  firstVersion: {},
  version: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateArtifactEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeprecationReadinessEntity

```ts
const deprecation_readiness = client.DeprecationReadiness()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | No |  |
| `fetchCount` | `number` | No |  |
| `lastFetched` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DeprecationReadiness().list({ artifact_id: "example", group_id: "example", version_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeprecationReadinessEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DownloadRefEntity

```ts
const download_ref = client.DownloadRef()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadId` | `string` | Yes |  |
| `href` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DownloadRef().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DownloadRefEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GitOpEntity

```ts
const git_op = client.GitOp()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.GitOp().create({
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.GitOp().remove({ task_id: 'task_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GitOpEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GitOpsStatusEntity

```ts
const git_ops_status = client.GitOpsStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | `string` | No | The file path or location where the error occurred. |
| `detail` | `string` | Yes | A human-readable description of the error. |
| `source` | `string` | No | The source ID (e.g., repository ID) where the error occurred. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GitOpsStatus().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GitOpsStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GitOpsValidateTaskEntity

```ts
const git_ops_validate_task = client.GitOpsValidateTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactCount` | `number` | No | Number of artifacts loaded during validation. |
| `completedAt` | `string` | No | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | No | ISO 8601 timestamp of when the task was created. |
| `errors` | `any[]` | No | Validation errors. |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.GitOpsValidateTask().create({
  state: 'example_state',
  taskId: 'example_taskId',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GitOpsValidateTask().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GitOpsValidateTask().load({ task_id: 'task_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GitOpsValidateTaskEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GlobalRuleEntity

```ts
const global_rule = client.GlobalRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.GlobalRule().create({
  config: 'example_config',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GlobalRule().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.GlobalRule().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GlobalRuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupEntity

```ts
const group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `Record<string, any>` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Group().create({
  createdOn: 'example_createdOn',
  groupId: 'example_groupId',
  modifiedBy: 'example_modifiedBy',
  modifiedOn: 'example_modifiedOn',
  owner: 'example_owner',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Group().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Group().load({ id: 'group_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Group().remove({ id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Group().update({
  id: 'group_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupRuleEntity

```ts
const group_rule = client.GroupRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.GroupRule().create({
  id: 'example_id',
  config: 'example_config',
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.GroupRule().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupRuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## KafkaSqlEntity

```ts
const kafka_sql = client.KafkaSql()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshotId` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.KafkaSql().create({
  snapshotId: 'example_snapshotId',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `KafkaSqlEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetadataEntity

```ts
const metadata = client.Metadata()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `contentId` | `number` | Yes |  |
| `contractMetadata` | `Record<string, any>` | No | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `globalId` | `number` | Yes |  |
| `groupId` | `string` | No |  |
| `labels` | `Record<string, any>` | No |  |
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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `render` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render` | `client.Metadata().create({ $action: 'render', ... })` |
| `content` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content` | `client.Metadata().update({ $action: 'content', ... })` |
| `state` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state` | `client.Metadata().update({ $action: 'state', ... })` |

An action returns that action's OWN response, which is not necessarily a
Metadata record — check the API definition for its shape.

```ts
const result = await client.Metadata().create({
  $action: 'render',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Metadata().create({
  artifact_id: 'example_artifact_id',
  group_id: 'example_group_id',
  version_expression: 'example_version_expression',
  artifactId: 'example_artifactId',
  artifactType: 'example_artifactType',
  contentId: 1,
  createdOn: 'example_createdOn',
  globalId: 1,
  owner: 'example_owner',
  version: 'example_version',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Metadata().load({ artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Metadata().update({
  artifact_id: 'artifact_id',
  group_id: 'group_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetadataEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OdcsContractResultEntity

```ts
const odcs_contract_result = client.OdcsContractResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `string` | No | The contract artifact ID. |
| `projection` | `Record<string, any>` | No | Summary of the projection performed when an ODCS contract is applied. |
| `version` | `string` | No | The ODCS contract version. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OdcsContractResult().create({
  group_id: 'example_group_id',
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.OdcsContractResult().update({
  contract_id: 'contract_id',
  group_id: 'group_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OdcsContractResultEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OdcsContractSummaryEntity

```ts
const odcs_contract_summary = client.OdcsContractSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `string` | No | The contract artifact ID. |
| `name` | `string` | No | The contract display name. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OdcsContractSummary().list({ group_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OdcsContractSummaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReferenceGraphEntity

```ts
const reference_graph = client.ReferenceGraph()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `edges` | `any[]` | Yes | All edges (references) in the graph. |
| `metadata` | `Record<string, any>` | Yes | Metadata about the graph structure. |
| `nodes` | `any[]` | Yes | All nodes in the graph, including the root. |
| `root` | `Record<string, any>` | Yes | The root node of the graph (the artifact for which references were requested). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ReferenceGraph().list({ artifact_id: "example", group_id: "example", version_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReferenceGraphEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RoleMappingEntity

```ts
const role_mapping = client.RoleMapping()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `principalId` | `string` | Yes |  |
| `principalName` | `string` | No | A friendly name for the principal. |
| `role` | `string` | Yes |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `role_mapping` | `/admin/roleMappings` | `client.RoleMapping().create({ $action: 'role_mapping', ... })` |
| `role_mapping` | `/admin/roleMappings` | `client.RoleMapping().list({ $action: 'role_mapping', ... })` |

An action returns that action's OWN response, which is not necessarily a
RoleMapping record — check the API definition for its shape.

```ts
const result = await client.RoleMapping().create({
  $action: 'role_mapping',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.RoleMapping().create({
  principalId: 'example_principalId',
  role: 'example_role',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RoleMapping().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RoleMapping().load({ id: 'role_mapping_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RoleMappingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RuleEntity

```ts
const rule = client.Rule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Rule().list({ group_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Rule().load({ id: 'rule_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Rule().update({
  id: 'rule_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RuleEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchedBranchEntity

```ts
const searched_branch = client.SearchedBranch()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SearchedBranch().list({ artifact_id: "example", group_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchedBranchEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchedGroupEntity

```ts
const searched_group = client.SearchedGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `labels` | `Record<string, any>` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SearchedGroup().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchedGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SystemInfoEntity

```ts
const system_info = client.SystemInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `builtOn` | `string` | No |  |
| `description` | `string` | No |  |
| `name` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SystemInfo().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SystemInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsageSummaryEntity

```ts
const usage_summary = client.UsageSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `number` | Yes |  |
| `dead` | `number` | Yes |  |
| `stale` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UsageSummary().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserInfoEntity

```ts
const user_info = client.UserInfo()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UserInfo().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserInfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserInterfaceConfigEntity

```ts
const user_interface_config = client.UserInterfaceConfig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth` | `Record<string, any>` | Yes |  |
| `features` | `Record<string, any>` | No |  |
| `ui` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UserInterfaceConfig().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserInterfaceConfigEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VersionEntity

```ts
const version = client.Version()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `branches` | `any[]` | No |  |
| `content` | `Record<string, any>` | Yes |  |
| `contentId` | `number` | Yes |  |
| `count` | `number` | Yes | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `globalId` | `number` | Yes |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `isDraft` | `boolean` | No |  |
| `labels` | `Record<string, any>` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `state` | `string` | No |  |
| `value` | `string` | Yes |  |
| `version` | `string` | Yes | A single version of an artifact. |
| `versions` | `any[]` | Yes | The collection of artifact versions returned in the result set. |

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

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `content` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content` | `client.Version().load({ $action: 'content', ... })` |
| `export` | `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/export` | `client.Version().load({ $action: 'export', ... })` |

An action returns that action's OWN response, which is not necessarily a
Version record — check the API definition for its shape.

```ts
const result = await client.Version().load({
  $action: 'content',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Version().create({
  artifactId: 'example_artifactId',
  artifactType: 'example_artifactType',
  content: {},
  contentId: 1,
  count: 1,
  createdOn: 'example_createdOn',
  globalId: 1,
  owner: 'example_owner',
  value: 'example_value',
  version: 'example_version',
  versions: [],
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Version().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Version().load({ artifact_id: 'artifact_id', group_id: 'group_id', version_expression: 'version_expression' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Version().remove({ artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Version().update({
  artifact_id: 'artifact_id',
  comment_id: 'comment_id',
  group_id: 'group_id',
  version_id: 'version_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VersionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WellKnownEntity

```ts
const well_known = client.WellKnown()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `capabilities` | `Record<string, any>` | No | Capabilities of an A2A agent. |
| `createdOn` | `number` | No |  |
| `description` | `string` | No |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `parameters` | `any[]` | No |  |
| `skills` | `any[]` | No |  |
| `supportedInterfaces` | `any[]` | No |  |
| `title` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WellKnown().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WellKnown().load({ artifact_id: 'artifact_id', group_id: 'group_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WellKnownEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WrappedVersionStateEntity

```ts
const wrapped_version_state = client.WrappedVersionState()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `string` | Yes | Describes the state of an artifact or artifact version. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WrappedVersionState().load({ artifact_id: 'artifact_id', group_id: 'group_id', version_expression: 'version_expression' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WrappedVersionStateEntity` instance with the same client and
options.

#### `client()`

Return the parent `ApicurioRegistrySDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new ApicurioRegistrySDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

