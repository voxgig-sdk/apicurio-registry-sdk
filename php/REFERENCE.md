# ApicurioRegistry PHP SDK Reference

Complete API reference for the ApicurioRegistry PHP SDK.


## ApicurioRegistrySDK

### Constructor

```php
require_once __DIR__ . '/apicurioregistry_sdk.php';

$client = new ApicurioRegistrySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApicurioRegistrySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ApicurioRegistrySDK::test();
```


### Instance Methods

#### `Admin($data = null)`

Create a new `AdminEntity` instance. Pass `null` for no initial data.

#### `Agent($data = null)`

Create a new `AgentEntity` instance. Pass `null` for no initial data.

#### `AgentCard($data = null)`

Create a new `AgentCardEntity` instance. Pass `null` for no initial data.

#### `AiCatalog($data = null)`

Create a new `AiCatalogEntity` instance. Pass `null` for no initial data.

#### `ArdExplore($data = null)`

Create a new `ArdExploreEntity` instance. Pass `null` for no initial data.

#### `ArdSearch($data = null)`

Create a new `ArdSearchEntity` instance. Pass `null` for no initial data.

#### `Artifact($data = null)`

Create a new `ArtifactEntity` instance. Pass `null` for no initial data.

#### `ArtifactReference($data = null)`

Create a new `ArtifactReferenceEntity` instance. Pass `null` for no initial data.

#### `ArtifactRule($data = null)`

Create a new `ArtifactRuleEntity` instance. Pass `null` for no initial data.

#### `ArtifactType($data = null)`

Create a new `ArtifactTypeEntity` instance. Pass `null` for no initial data.

#### `Branch($data = null)`

Create a new `BranchEntity` instance. Pass `null` for no initial data.

#### `Comment($data = null)`

Create a new `CommentEntity` instance. Pass `null` for no initial data.

#### `ConfigurationProperty($data = null)`

Create a new `ConfigurationPropertyEntity` instance. Pass `null` for no initial data.

#### `ConsumerVersionHeatmap($data = null)`

Create a new `ConsumerVersionHeatmapEntity` instance. Pass `null` for no initial data.

#### `Content($data = null)`

Create a new `ContentEntity` instance. Pass `null` for no initial data.

#### `Contract($data = null)`

Create a new `ContractEntity` instance. Pass `null` for no initial data.

#### `ContractRule($data = null)`

Create a new `ContractRuleEntity` instance. Pass `null` for no initial data.

#### `ContractRuleSet($data = null)`

Create a new `ContractRuleSetEntity` instance. Pass `null` for no initial data.

#### `CreateArtifact($data = null)`

Create a new `CreateArtifactEntity` instance. Pass `null` for no initial data.

#### `DeprecationReadiness($data = null)`

Create a new `DeprecationReadinessEntity` instance. Pass `null` for no initial data.

#### `DownloadRef($data = null)`

Create a new `DownloadRefEntity` instance. Pass `null` for no initial data.

#### `GitOp($data = null)`

Create a new `GitOpEntity` instance. Pass `null` for no initial data.

#### `GitOpsStatus($data = null)`

Create a new `GitOpsStatusEntity` instance. Pass `null` for no initial data.

#### `GitOpsValidateTask($data = null)`

Create a new `GitOpsValidateTaskEntity` instance. Pass `null` for no initial data.

#### `GlobalRule($data = null)`

Create a new `GlobalRuleEntity` instance. Pass `null` for no initial data.

#### `Group($data = null)`

Create a new `GroupEntity` instance. Pass `null` for no initial data.

#### `GroupRule($data = null)`

Create a new `GroupRuleEntity` instance. Pass `null` for no initial data.

#### `KafkaSql($data = null)`

Create a new `KafkaSqlEntity` instance. Pass `null` for no initial data.

#### `McpTool($data = null)`

Create a new `McpToolEntity` instance. Pass `null` for no initial data.

#### `Metadata($data = null)`

Create a new `MetadataEntity` instance. Pass `null` for no initial data.

#### `OdcsContractResult($data = null)`

Create a new `OdcsContractResultEntity` instance. Pass `null` for no initial data.

#### `OdcsContractSummary($data = null)`

Create a new `OdcsContractSummaryEntity` instance. Pass `null` for no initial data.

#### `ReferenceGraph($data = null)`

Create a new `ReferenceGraphEntity` instance. Pass `null` for no initial data.

#### `RoleMapping($data = null)`

Create a new `RoleMappingEntity` instance. Pass `null` for no initial data.

#### `Rule($data = null)`

Create a new `RuleEntity` instance. Pass `null` for no initial data.

#### `SearchedBranch($data = null)`

Create a new `SearchedBranchEntity` instance. Pass `null` for no initial data.

#### `SearchedGroup($data = null)`

Create a new `SearchedGroupEntity` instance. Pass `null` for no initial data.

#### `SystemInfo($data = null)`

Create a new `SystemInfoEntity` instance. Pass `null` for no initial data.

#### `UsageSummary($data = null)`

Create a new `UsageSummaryEntity` instance. Pass `null` for no initial data.

#### `UserInfo($data = null)`

Create a new `UserInfoEntity` instance. Pass `null` for no initial data.

#### `UserInterfaceConfig($data = null)`

Create a new `UserInterfaceConfigEntity` instance. Pass `null` for no initial data.

#### `Version($data = null)`

Create a new `VersionEntity` instance. Pass `null` for no initial data.

#### `WellKnown($data = null)`

Create a new `WellKnownEntity` instance. Pass `null` for no initial data.

#### `WrappedVersionState($data = null)`

Create a new `WrappedVersionStateEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ApicurioRegistryUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AdminEntity

```php
$admin = $client->Admin();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Admin()->create([
  "role" => null, // string
  "value" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Admin()->remove(["principal_id" => "principal_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Admin()->update([
  "principal_id" => "principal_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AdminEntity`

Create a new `AdminEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentEntity

```php
$agent = $client->Agent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `capabilities` | `array` | No | Capabilities of an A2A agent. |
| `createdOn` | `int` | No |  |
| `defaultInputModes` | `array` | No |  |
| `defaultOutputModes` | `array` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `groupId` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `array` | No | Provider of an A2A agent. |
| `securityRequirements` | `array` | No |  |
| `securitySchemes` | `array` | No |  |
| `signatures` | `array` | No |  |
| `skills` | `array` | No |  |
| `supportedInterfaces` | `array` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Agent()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentEntity`

Create a new `AgentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentCardEntity

```php
$agent_card = $client->AgentCard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `array` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `array` | No |  |
| `defaultOutputModes` | `array` | No |  |
| `description` | `string` | No |  |
| `documentationUrl` | `string` | No |  |
| `iconUrl` | `string` | No |  |
| `name` | `string` | No |  |
| `protocolVersion` | `string` | No |  |
| `provider` | `array` | No | Provider of an A2A agent. |
| `securityRequirements` | `array` | No |  |
| `securitySchemes` | `array` | No |  |
| `signatures` | `array` | No |  |
| `skills` | `array` | No |  |
| `supportedInterfaces` | `array` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AgentCard()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentCardEntity`

Create a new `AgentCardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AiCatalogEntity

```php
$ai_catalog = $client->AiCatalog();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `array` | No |  |
| `description` | `string` | No |  |
| `displayName` | `string` | No |  |
| `identifier` | `string` | Yes |  |
| `representativeQueries` | `array` | No |  |
| `tags` | `array` | No |  |
| `type` | `string` | Yes |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AiCatalog()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AiCatalogEntity`

Create a new `AiCatalogEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArdExploreEntity

```php
$ard_explore = $client->ArdExplore();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `array` | No | ARD search query. |
| `resultType` | `array` | Yes | Requested result type for the ARD POST /explore endpoint. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ArdExplore()->create([
  "resultType" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArdExploreEntity`

Create a new `ArdExploreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArdSearchEntity

```php
$ard_search = $client->ArdSearch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `federation` | `string` | No |  |
| `pageSize` | `int` | No |  |
| `pageToken` | `string` | No |  |
| `query` | `array` | Yes | ARD search query. |
| `results` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ArdSearch()->create([
  "query" => null, // array
  "results" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArdSearchEntity`

Create a new `ArdSearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArtifactEntity

```php
$artifact = $client->Artifact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `artifacts` | `array` | Yes | The artifacts returned in the result set. |
| `count` | `int` | Yes | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `id` | `string` | No |  |
| `labels` | `array` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `versions` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Artifact()->create([
  "artifactId" => null, // string
  "artifactType" => null, // string
  "artifacts" => null, // array
  "count" => null, // int
  "createdOn" => null, // string
  "groupId" => null, // string
  "modifiedBy" => null, // string
  "modifiedOn" => null, // string
  "owner" => null, // string
  "versions" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Artifact()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Artifact()->load(["global_id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Artifact()->remove(["group_id" => "group_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArtifactEntity`

Create a new `ArtifactEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArtifactReferenceEntity

```php
$artifact_reference = $client->ArtifactReference();
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
| `references` | `array` | No | Collection of references to other artifacts. |
| `version` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ArtifactReference()->create([
  "artifactId" => null, // string
  "content" => null, // string
  "contentType" => null, // string
  "groupId" => null, // string
  "name" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ArtifactReference()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArtifactReferenceEntity`

Create a new `ArtifactReferenceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArtifactRuleEntity

```php
$artifact_rule = $client->ArtifactRule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ArtifactRule()->create([
  "group_id" => null, // string
  "id" => null, // string
  "config" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ArtifactRule()->remove(["group_id" => "group_id", "id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArtifactRuleEntity`

Create a new `ArtifactRuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArtifactTypeEntity

```php
$artifact_type = $client->ArtifactType();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ArtifactType()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArtifactTypeEntity`

Create a new `ArtifactTypeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BranchEntity

```php
$branch = $client->Branch();
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
| `versions` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Branch()->create([
  "artifact_id" => null, // string
  "group_id" => null, // string
  "artifactId" => null, // string
  "branchId" => null, // string
  "createdOn" => null, // string
  "groupId" => null, // string
  "modifiedBy" => null, // string
  "modifiedOn" => null, // string
  "owner" => null, // string
  "systemDefined" => null, // bool
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Branch()->load(["id" => "branch_id", "artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Branch()->remove(["id" => "branch_id", "artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Branch()->update([
  "id" => "branch_id",
  "artifact_id" => "artifact_id",
  "group_id" => "group_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BranchEntity`

Create a new `BranchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CommentEntity

```php
$comment = $client->Comment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | `string` | Yes |  |
| `createdOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |
| `value` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Comment()->create([
  "artifact_id" => null, // string
  "group_id" => null, // string
  "version_expression" => null, // string
  "commentId" => null, // string
  "createdOn" => null, // string
  "owner" => null, // string
  "value" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Comment()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CommentEntity`

Create a new `CommentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConfigurationPropertyEntity

```php
$configuration_property = $client->ConfigurationProperty();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ConfigurationProperty()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ConfigurationProperty()->load(["id" => "configuration_property_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConfigurationPropertyEntity`

Create a new `ConfigurationPropertyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConsumerVersionHeatmapEntity

```php
$consumer_version_heatmap = $client->ConsumerVersionHeatmap();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | Yes |  |
| `driftAlert` | `bool` | No |  |
| `versions` | `array` | No |  |
| `versionsBehind` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ConsumerVersionHeatmap()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConsumerVersionHeatmapEntity`

Create a new `ConsumerVersionHeatmapEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContentEntity

```php
$content = $client->Content();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Content()->create([
  "artifact_type" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContentEntity`

Create a new `ContentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContractEntity

```php
$contract = $client->Contract();
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
| `labels` | `array` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Contract()->create([
  "artifact_id" => null, // string
  "group_id" => null, // string
  "artifactId" => null, // string
  "artifactType" => null, // string
  "createdOn" => null, // string
  "groupId" => null, // string
  "modifiedBy" => null, // string
  "modifiedOn" => null, // string
  "owner" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Contract()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Contract()->load(["id" => "contract_id", "group_id" => "group_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Contract()->remove(["id" => "contract_id", "group_id" => "group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Contract()->update([
  "id" => "contract_id",
  "artifact_id" => "artifact_id",
  "group_id" => "group_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContractEntity`

Create a new `ContractEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContractRuleEntity

```php
$contract_rule = $client->ContractRule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No | The artifact ID containing the rule. |
| `globalId` | `int` | No | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | No | The group ID of the artifact containing the rule. |
| `rule` | `array` | Yes | A single contract rule definition. |
| `ruleCategory` | `string` | No | The rule category (DOMAIN or MIGRATION). |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ContractRule()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContractRuleEntity`

Create a new `ContractRuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ContractRuleSetEntity

```php
$contract_rule_set = $client->ContractRuleSet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domainRules` | `array` | No | Rules for domain validation. |
| `migrationRules` | `array` | No | Rules for version migration. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ContractRuleSet()->list();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ContractRuleSet()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ContractRuleSetEntity`

Create a new `ContractRuleSetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CreateArtifactEntity

```php
$create_artifact = $client->CreateArtifact();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifact` | `array` | Yes |  |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | No |  |
| `description` | `string` | No |  |
| `firstVersion` | `array` | Yes |  |
| `labels` | `array` | No |  |
| `name` | `string` | No |  |
| `version` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CreateArtifact()->create([
  "group_id" => null, // string
  "artifact" => null, // array
  "artifactId" => null, // string
  "firstVersion" => null, // array
  "version" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CreateArtifactEntity`

Create a new `CreateArtifactEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeprecationReadinessEntity

```php
$deprecation_readiness = $client->DeprecationReadiness();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | No |  |
| `fetchCount` | `int` | No |  |
| `lastFetched` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->DeprecationReadiness()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeprecationReadinessEntity`

Create a new `DeprecationReadinessEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DownloadRefEntity

```php
$download_ref = $client->DownloadRef();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadId` | `string` | Yes |  |
| `href` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->DownloadRef()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DownloadRefEntity`

Create a new `DownloadRefEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GitOpEntity

```php
$git_op = $client->GitOp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ref` | `string` | Yes | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `string` | Yes | Repository ID to validate against. |
| `type` | `string` | No | Validation type. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->GitOp()->create([
  "ref" => null, // string
  "repoId" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->GitOp()->remove(["task_id" => "task_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GitOpEntity`

Create a new `GitOpEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GitOpsStatusEntity

```php
$git_ops_status = $client->GitOpsStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | `string` | No | The file path or location where the error occurred. |
| `detail` | `string` | Yes | A human-readable description of the error. |
| `source` | `string` | No | The source ID (e.g., repository ID) where the error occurred. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->GitOpsStatus()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GitOpsStatusEntity`

Create a new `GitOpsStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GitOpsValidateTaskEntity

```php
$git_ops_validate_task = $client->GitOpsValidateTask();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactCount` | `int` | No | Number of artifacts loaded during validation. |
| `completedAt` | `string` | No | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | No | ISO 8601 timestamp of when the task was created. |
| `errors` | `array` | No | Validation errors. |
| `groupCount` | `int` | No | Number of groups loaded during validation. |
| `ref` | `string` | No | Git ref being validated. |
| `repoId` | `string` | No | Repository ID being validated. |
| `result` | `string` | No | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Yes | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Yes | Unique identifier for the validation task. |
| `type` | `string` | No | Validation type (`pull` or `push`). |
| `versionCount` | `int` | No | Number of artifact versions loaded during validation. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->GitOpsValidateTask()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GitOpsValidateTask()->load(["task_id" => "task_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GitOpsValidateTaskEntity`

Create a new `GitOpsValidateTaskEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GlobalRuleEntity

```php
$global_rule = $client->GlobalRule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->GlobalRule()->create([
  "config" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->GlobalRule()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GlobalRuleEntity`

Create a new `GlobalRuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GroupEntity

```php
$group = $client->Group();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactsType` | `string` | No |  |
| `createdOn` | `string` | No |  |
| `description` | `string` | No |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `labels` | `array` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `owner` | `string` | No |  |
| `properties` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Group()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Group()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Group()->load(["id" => "group_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Group()->remove(["id" => "group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Group()->update([
  "id" => "group_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GroupEntity`

Create a new `GroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GroupRuleEntity

```php
$group_rule = $client->GroupRule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->GroupRule()->create([
  "id" => null, // string
  "config" => null, // string
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->GroupRule()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GroupRuleEntity`

Create a new `GroupRuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## KafkaSqlEntity

```php
$kafka_sql = $client->KafkaSql();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshotId` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->KafkaSql()->create([
  "snapshotId" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): KafkaSqlEntity`

Create a new `KafkaSqlEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## McpToolEntity

```php
$mcp_tool = $client->McpTool();
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
| `parameters` | `array` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->McpTool()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): McpToolEntity`

Create a new `McpToolEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MetadataEntity

```php
$metadata = $client->Metadata();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | No |  |
| `artifactType` | `string` | No |  |
| `contentId` | `int` | No |  |
| `contractMetadata` | `array` | No | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` | No |  |
| `description` | `string` | No |  |
| `globalId` | `int` | No |  |
| `groupId` | `string` | No |  |
| `labels` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Metadata()->create([
  "artifact_id" => null, // string
  "group_id" => null, // string
  "version_expression" => null, // string
  "modifiedBy" => null, // string
  "modifiedOn" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Metadata()->load(["artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Metadata()->update([
  "artifact_id" => "artifact_id",
  "group_id" => "group_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MetadataEntity`

Create a new `MetadataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OdcsContractResultEntity

```php
$odcs_contract_result = $client->OdcsContractResult();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `labelsApplied` | `int` | No | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | `int` | No | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | `int` | No | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | `array` | No | Any warnings encountered during projection. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->OdcsContractResult()->create([
  "group_id" => null, // string
]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->OdcsContractResult()->update([
  "contract_id" => "contract_id",
  "group_id" => "group_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OdcsContractResultEntity`

Create a new `OdcsContractResultEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OdcsContractSummaryEntity

```php
$odcs_contract_summary = $client->OdcsContractSummary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `string` | No | The contract artifact ID. |
| `name` | `string` | No | The contract display name. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->OdcsContractSummary()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OdcsContractSummaryEntity`

Create a new `OdcsContractSummaryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReferenceGraphEntity

```php
$reference_graph = $client->ReferenceGraph();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `edges` | `array` | Yes | All edges (references) in the graph. |
| `metadata` | `array` | Yes | Metadata about the graph structure. |
| `nodes` | `array` | Yes | All nodes in the graph, including the root. |
| `root` | `array` | Yes | The root node of the graph (the artifact for which references were requested). |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ReferenceGraph()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReferenceGraphEntity`

Create a new `ReferenceGraphEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RoleMappingEntity

```php
$role_mapping = $client->RoleMapping();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `principalId` | `string` | Yes |  |
| `principalName` | `string` | No | A friendly name for the principal. |
| `role` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RoleMapping()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RoleMapping()->load(["id" => "role_mapping_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RoleMappingEntity`

Create a new `RoleMappingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RuleEntity

```php
$rule = $client->Rule();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ruleType` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Rule()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Rule()->load(["id" => "rule_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Rule()->update([
  "id" => "rule_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RuleEntity`

Create a new `RuleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchedBranchEntity

```php
$searched_branch = $client->SearchedBranch();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SearchedBranch()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchedBranchEntity`

Create a new `SearchedBranchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchedGroupEntity

```php
$searched_group = $client->SearchedGroup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `groupId` | `string` | Yes |  |
| `labels` | `array` | No |  |
| `modifiedBy` | `string` | Yes |  |
| `modifiedOn` | `string` | Yes |  |
| `owner` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SearchedGroup()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchedGroupEntity`

Create a new `SearchedGroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SystemInfoEntity

```php
$system_info = $client->SystemInfo();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `builtOn` | `string` | No |  |
| `description` | `string` | No |  |
| `name` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SystemInfo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SystemInfoEntity`

Create a new `SystemInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UsageSummaryEntity

```php
$usage_summary = $client->UsageSummary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `int` | Yes |  |
| `dead` | `int` | Yes |  |
| `stale` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->UsageSummary()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UsageSummaryEntity`

Create a new `UsageSummaryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserInfoEntity

```php
$user_info = $client->UserInfo();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->UserInfo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserInfoEntity`

Create a new `UserInfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserInterfaceConfigEntity

```php
$user_interface_config = $client->UserInterfaceConfig();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth` | `array` | Yes |  |
| `features` | `array` | No |  |
| `ui` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->UserInterfaceConfig()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserInterfaceConfigEntity`

Create a new `UserInterfaceConfigEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VersionEntity

```php
$version = $client->Version();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `string` | Yes |  |
| `artifactType` | `string` | Yes |  |
| `branches` | `array` | No |  |
| `content` | `array` | Yes |  |
| `contentId` | `int` | Yes |  |
| `count` | `int` | Yes | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` | Yes |  |
| `description` | `string` | No |  |
| `globalId` | `int` | Yes |  |
| `groupId` | `string` | No |  |
| `id` | `string` | No |  |
| `isDraft` | `bool` | No |  |
| `labels` | `array` | No |  |
| `modifiedBy` | `string` | No |  |
| `modifiedOn` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | Yes |  |
| `state` | `string` | Yes |  |
| `value` | `string` | Yes |  |
| `version` | `string` | No |  |
| `versions` | `array` | Yes | The collection of artifact versions returned in the result set. |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Version()->create([
  "artifactId" => null, // string
  "artifactType" => null, // string
  "content" => null, // array
  "contentId" => null, // int
  "count" => null, // int
  "createdOn" => null, // string
  "globalId" => null, // int
  "owner" => null, // string
  "value" => null, // string
  "versions" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Version()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Version()->load(["artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Version()->remove(["artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Version()->update([
  "artifact_id" => "artifact_id",
  "comment_id" => "comment_id",
  "group_id" => "group_id",
  "version_id" => "version_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VersionEntity`

Create a new `VersionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WellKnownEntity

```php
$well_known = $client->WellKnown();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WellKnown()->load(["artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WellKnownEntity`

Create a new `WellKnownEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WrappedVersionStateEntity

```php
$wrapped_version_state = $client->WrappedVersionState();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `string` | Yes | Describes the state of an artifact or artifact version. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WrappedVersionState()->load(["artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WrappedVersionStateEntity`

Create a new `WrappedVersionStateEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new ApicurioRegistrySDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

