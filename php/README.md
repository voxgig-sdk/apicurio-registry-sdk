# ApicurioRegistry PHP SDK



The PHP SDK for the ApicurioRegistry API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Admin()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/apicurio-registry-sdk/releases](https://github.com/voxgig-sdk/apicurio-registry-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'apicurioregistry_sdk.php';

$client = new ApicurioRegistrySDK();
```

### 3. Load an artifact

Artifact is nested under global, so provide the `global_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Artifact record (throws on error).
    $artifact = $client->Artifact()->load(["global_id" => 1]);
    print_r($artifact->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Admin record.
$created = $client->Admin()->create(["role" => "example_role", "value" => "example_value"]);

// Update
$client->Admin()->update(["principal_id" => "example_principal_id", "role" => "example_role"]);

// Remove
$client->Admin()->remove(["principal_id" => "example_principal_id"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $contractrules = $client->ContractRule()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ApicurioRegistrySDK::test([
    "entity" => ["branch" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$branch = $client->Branch()->load(["id" => "test01", "artifact_id" => "example", "group_id" => "example"]);
print_r($branch->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ApicurioRegistrySDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
APICURIO_REGISTRY_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ApicurioRegistrySDK

```php
require_once 'apicurioregistry_sdk.php';
$client = new ApicurioRegistrySDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ApicurioRegistrySDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ApicurioRegistrySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Admin` | `($data): AdminEntity` | Create an Admin entity instance. |
| `Agent` | `($data): AgentEntity` | Create an Agent entity instance. |
| `AgentCard` | `($data): AgentCardEntity` | Create an AgentCard entity instance. |
| `AiCatalog` | `($data): AiCatalogEntity` | Create an AiCatalog entity instance. |
| `ArdExplore` | `($data): ArdExploreEntity` | Create an ArdExplore entity instance. |
| `ArdSearch` | `($data): ArdSearchEntity` | Create an ArdSearch entity instance. |
| `Artifact` | `($data): ArtifactEntity` | Create an Artifact entity instance. |
| `ArtifactReference` | `($data): ArtifactReferenceEntity` | Create an ArtifactReference entity instance. |
| `ArtifactRule` | `($data): ArtifactRuleEntity` | Create an ArtifactRule entity instance. |
| `ArtifactType` | `($data): ArtifactTypeEntity` | Create an ArtifactType entity instance. |
| `Branch` | `($data): BranchEntity` | Create a Branch entity instance. |
| `Comment` | `($data): CommentEntity` | Create a Comment entity instance. |
| `ConfigurationProperty` | `($data): ConfigurationPropertyEntity` | Create a ConfigurationProperty entity instance. |
| `ConsumerVersionHeatmap` | `($data): ConsumerVersionHeatmapEntity` | Create a ConsumerVersionHeatmap entity instance. |
| `Content` | `($data): ContentEntity` | Create a Content entity instance. |
| `Contract` | `($data): ContractEntity` | Create a Contract entity instance. |
| `ContractRule` | `($data): ContractRuleEntity` | Create a ContractRule entity instance. |
| `ContractRuleSet` | `($data): ContractRuleSetEntity` | Create a ContractRuleSet entity instance. |
| `CreateArtifact` | `($data): CreateArtifactEntity` | Create a CreateArtifact entity instance. |
| `DeprecationReadiness` | `($data): DeprecationReadinessEntity` | Create a DeprecationReadiness entity instance. |
| `DownloadRef` | `($data): DownloadRefEntity` | Create a DownloadRef entity instance. |
| `GitOp` | `($data): GitOpEntity` | Create a GitOp entity instance. |
| `GitOpsStatus` | `($data): GitOpsStatusEntity` | Create a GitOpsStatus entity instance. |
| `GitOpsValidateTask` | `($data): GitOpsValidateTaskEntity` | Create a GitOpsValidateTask entity instance. |
| `GlobalRule` | `($data): GlobalRuleEntity` | Create a GlobalRule entity instance. |
| `Group` | `($data): GroupEntity` | Create a Group entity instance. |
| `GroupRule` | `($data): GroupRuleEntity` | Create a GroupRule entity instance. |
| `KafkaSql` | `($data): KafkaSqlEntity` | Create a KafkaSql entity instance. |
| `McpTool` | `($data): McpToolEntity` | Create a McpTool entity instance. |
| `Metadata` | `($data): MetadataEntity` | Create a Metadata entity instance. |
| `OdcsContractResult` | `($data): OdcsContractResultEntity` | Create an OdcsContractResult entity instance. |
| `OdcsContractSummary` | `($data): OdcsContractSummaryEntity` | Create an OdcsContractSummary entity instance. |
| `ReferenceGraph` | `($data): ReferenceGraphEntity` | Create a ReferenceGraph entity instance. |
| `RoleMapping` | `($data): RoleMappingEntity` | Create a RoleMapping entity instance. |
| `Rule` | `($data): RuleEntity` | Create a Rule entity instance. |
| `SearchedBranch` | `($data): SearchedBranchEntity` | Create a SearchedBranch entity instance. |
| `SearchedGroup` | `($data): SearchedGroupEntity` | Create a SearchedGroup entity instance. |
| `SystemInfo` | `($data): SystemInfoEntity` | Create a SystemInfo entity instance. |
| `UsageSummary` | `($data): UsageSummaryEntity` | Create an UsageSummary entity instance. |
| `UserInfo` | `($data): UserInfoEntity` | Create an UserInfo entity instance. |
| `UserInterfaceConfig` | `($data): UserInterfaceConfigEntity` | Create an UserInterfaceConfig entity instance. |
| `Version` | `($data): VersionEntity` | Create a Version entity instance. |
| `WellKnown` | `($data): WellKnownEntity` | Create a WellKnown entity instance. |
| `WrappedVersionState` | `($data): WrappedVersionStateEntity` | Create a WrappedVersionState entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$admin = $client->Admin();`

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

```php
$admin = $client->Admin()->create([
    "role" => null, // string
    "value" => null, // string
]);
```


### Agent

Create an instance: `$agent = $client->Agent();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `capabilities` | `array` | Capabilities of an A2A agent. |
| `createdOn` | `int` |  |
| `defaultInputModes` | `array` |  |
| `defaultOutputModes` | `array` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `groupId` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `array` | Provider of an A2A agent. |
| `securityRequirements` | `array` |  |
| `securitySchemes` | `array` |  |
| `signatures` | `array` |  |
| `skills` | `array` |  |
| `supportedInterfaces` | `array` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of Agent records (throws on error).
$agents = $client->Agent()->list();
```


### AgentCard

Create an instance: `$agent_card = $client->AgentCard();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `array` | Capabilities of an A2A agent. |
| `defaultInputModes` | `array` |  |
| `defaultOutputModes` | `array` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `array` | Provider of an A2A agent. |
| `securityRequirements` | `array` |  |
| `securitySchemes` | `array` |  |
| `signatures` | `array` |  |
| `skills` | `array` |  |
| `supportedInterfaces` | `array` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of AgentCard records (throws on error).
$agent_cards = $client->AgentCard()->list();
```


### AiCatalog

Create an instance: `$ai_catalog = $client->AiCatalog();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `array` |  |
| `description` | `string` |  |
| `displayName` | `string` |  |
| `identifier` | `string` |  |
| `representativeQueries` | `array` |  |
| `tags` | `array` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of AiCatalog records (throws on error).
$ai_catalogs = $client->AiCatalog()->list();
```


### ArdExplore

Create an instance: `$ard_explore = $client->ArdExplore();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `query` | `array` | ARD search query. |
| `resultType` | `array` | Requested result type for the ARD POST /explore endpoint. |

#### Example: Create

```php
$ard_explore = $client->ArdExplore()->create([
    "resultType" => null, // array
]);
```


### ArdSearch

Create an instance: `$ard_search = $client->ArdSearch();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `federation` | `string` |  |
| `pageSize` | `int` |  |
| `pageToken` | `string` |  |
| `query` | `array` | ARD search query. |
| `results` | `array` |  |

#### Example: Create

```php
$ard_search = $client->ArdSearch()->create([
    "query" => null, // array
    "results" => null, // array
]);
```


### Artifact

Create an instance: `$artifact = $client->Artifact();`

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
| `artifacts` | `array` | The artifacts returned in the result set. |
| `count` | `int` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `array` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `versions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Artifact record (throws on error).
$artifact = $client->Artifact()->load(["global_id" => 1]);
```

#### Example: List

```php
// list() returns an array of Artifact records (throws on error).
$artifacts = $client->Artifact()->list();
```

#### Example: Create

```php
$artifact = $client->Artifact()->create([
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


### ArtifactReference

Create an instance: `$artifact_reference = $client->ArtifactReference();`

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
| `references` | `array` | Collection of references to other artifacts. |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of ArtifactReference records (throws on error).
$artifact_references = $client->ArtifactReference()->list();
```

#### Example: Create

```php
$artifact_reference = $client->ArtifactReference()->create([
    "artifactId" => null, // string
    "content" => null, // string
    "contentType" => null, // string
    "groupId" => null, // string
    "name" => null, // string
]);
```


### ArtifactRule

Create an instance: `$artifact_rule = $client->ArtifactRule();`

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

```php
$artifact_rule = $client->ArtifactRule()->create([
    "group_id" => null, // string
    "id" => null, // string
    "config" => null, // string
]);
```


### ArtifactType

Create an instance: `$artifact_type = $client->ArtifactType();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of ArtifactType records (throws on error).
$artifact_types = $client->ArtifactType()->list();
```


### Branch

Create an instance: `$branch = $client->Branch();`

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
| `systemDefined` | `bool` |  |
| `versions` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Branch record (throws on error).
$branch = $client->Branch()->load(["id" => "branch_id", "artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

#### Example: Create

```php
$branch = $client->Branch()->create([
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


### Comment

Create an instance: `$comment = $client->Comment();`

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

```php
// list() returns an array of Comment records (throws on error).
$comments = $client->Comment()->list();
```

#### Example: Create

```php
$comment = $client->Comment()->create([
    "artifact_id" => null, // string
    "group_id" => null, // string
    "version_expression" => null, // string
    "commentId" => null, // string
    "createdOn" => null, // string
    "owner" => null, // string
    "value" => null, // string
]);
```


### ConfigurationProperty

Create an instance: `$configuration_property = $client->ConfigurationProperty();`

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

```php
// load() returns the ENTITY — call data_get() for the ConfigurationProperty record (throws on error).
$configuration_property = $client->ConfigurationProperty()->load(["id" => "configuration_property_id"]);
```

#### Example: List

```php
// list() returns an array of ConfigurationProperty records (throws on error).
$configuration_propertys = $client->ConfigurationProperty()->list();
```


### ConsumerVersionHeatmap

Create an instance: `$consumer_version_heatmap = $client->ConsumerVersionHeatmap();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `driftAlert` | `bool` |  |
| `versions` | `array` |  |
| `versionsBehind` | `int` |  |

#### Example: List

```php
// list() returns an array of ConsumerVersionHeatmap records (throws on error).
$consumer_version_heatmaps = $client->ConsumerVersionHeatmap()->list();
```


### Content

Create an instance: `$content = $client->Content();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$content = $client->Content()->create([
    "artifact_type" => null, // string
]);
```


### Contract

Create an instance: `$contract = $client->Contract();`

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
| `labels` | `array` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Contract record (throws on error).
$contract = $client->Contract()->load(["id" => "contract_id", "group_id" => "group_id"]);
```

#### Example: List

```php
// list() returns an array of Contract records (throws on error).
$contracts = $client->Contract()->list();
```

#### Example: Create

```php
$contract = $client->Contract()->create([
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


### ContractRule

Create an instance: `$contract_rule = $client->ContractRule();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` | The artifact ID containing the rule. |
| `globalId` | `int` | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | The group ID of the artifact containing the rule. |
| `rule` | `array` | A single contract rule definition. |
| `ruleCategory` | `string` | The rule category (DOMAIN or MIGRATION). |

#### Example: List

```php
// list() returns an array of ContractRule records (throws on error).
$contract_rules = $client->ContractRule()->list();
```


### ContractRuleSet

Create an instance: `$contract_rule_set = $client->ContractRuleSet();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domainRules` | `array` | Rules for domain validation. |
| `migrationRules` | `array` | Rules for version migration. |

#### Example: List

```php
// list() returns an array of ContractRuleSet records (throws on error).
$contract_rule_sets = $client->ContractRuleSet()->list();
```


### CreateArtifact

Create an instance: `$create_artifact = $client->CreateArtifact();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifact` | `array` |  |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `description` | `string` |  |
| `firstVersion` | `array` |  |
| `labels` | `array` |  |
| `name` | `string` |  |
| `version` | `array` |  |

#### Example: Create

```php
$create_artifact = $client->CreateArtifact()->create([
    "group_id" => null, // string
    "artifact" => null, // array
    "artifactId" => null, // string
    "firstVersion" => null, // array
    "version" => null, // array
]);
```


### DeprecationReadiness

Create an instance: `$deprecation_readiness = $client->DeprecationReadiness();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `fetchCount` | `int` |  |
| `lastFetched` | `int` |  |

#### Example: List

```php
// list() returns an array of DeprecationReadiness records (throws on error).
$deprecation_readinesss = $client->DeprecationReadiness()->list();
```


### DownloadRef

Create an instance: `$download_ref = $client->DownloadRef();`

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

```php
// load() returns the ENTITY — call data_get() for the DownloadRef record (throws on error).
$download_ref = $client->DownloadRef()->load();
```


### GitOp

Create an instance: `$git_op = $client->GitOp();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ref` | `string` | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `string` | Repository ID to validate against. |
| `type` | `string` | Validation type. |

#### Example: Create

```php
$git_op = $client->GitOp()->create([
    "ref" => null, // string
    "repoId" => null, // string
]);
```


### GitOpsStatus

Create an instance: `$git_ops_status = $client->GitOpsStatus();`

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

```php
// list() returns an array of GitOpsStatus records (throws on error).
$git_ops_statuss = $client->GitOpsStatus()->list();
```


### GitOpsValidateTask

Create an instance: `$git_ops_validate_task = $client->GitOpsValidateTask();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactCount` | `int` | Number of artifacts loaded during validation. |
| `completedAt` | `string` | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | ISO 8601 timestamp of when the task was created. |
| `errors` | `array` | Validation errors. |
| `groupCount` | `int` | Number of groups loaded during validation. |
| `ref` | `string` | Git ref being validated. |
| `repoId` | `string` | Repository ID being validated. |
| `result` | `string` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Unique identifier for the validation task. |
| `type` | `string` | Validation type (`pull` or `push`). |
| `versionCount` | `int` | Number of artifact versions loaded during validation. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GitOpsValidateTask record (throws on error).
$git_ops_validate_task = $client->GitOpsValidateTask()->load(["task_id" => "task_id"]);
```

#### Example: List

```php
// list() returns an array of GitOpsValidateTask records (throws on error).
$git_ops_validate_tasks = $client->GitOpsValidateTask()->list();
```


### GlobalRule

Create an instance: `$global_rule = $client->GlobalRule();`

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

```php
$global_rule = $client->GlobalRule()->create([
    "config" => null, // string
]);
```


### Group

Create an instance: `$group = $client->Group();`

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
| `artifactsType` | `string` |  |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `array` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |
| `properties` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Group record (throws on error).
$group = $client->Group()->load(["id" => "group_id"]);
```

#### Example: List

```php
// list() returns an array of Group records (throws on error).
$groups = $client->Group()->list();
```

#### Example: Create

```php
$group = $client->Group()->create([
]);
```


### GroupRule

Create an instance: `$group_rule = $client->GroupRule();`

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

```php
$group_rule = $client->GroupRule()->create([
    "id" => null, // string
    "config" => null, // string
]);
```


### KafkaSql

Create an instance: `$kafka_sql = $client->KafkaSql();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `snapshotId` | `string` |  |

#### Example: Create

```php
$kafka_sql = $client->KafkaSql()->create([
    "snapshotId" => null, // string
]);
```


### McpTool

Create an instance: `$mcp_tool = $client->McpTool();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `createdOn` | `int` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `parameters` | `array` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of McpTool records (throws on error).
$mcp_tools = $client->McpTool()->list();
```


### Metadata

Create an instance: `$metadata = $client->Metadata();`

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
| `contentId` | `int` |  |
| `contractMetadata` | `array` | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `int` |  |
| `groupId` | `string` |  |
| `labels` | `array` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `version` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Metadata record (throws on error).
$metadata = $client->Metadata()->load(["artifact_id" => "artifact_id", "group_id" => "group_id"]);
```

#### Example: Create

```php
$metadata = $client->Metadata()->create([
    "artifact_id" => null, // string
    "group_id" => null, // string
    "version_expression" => null, // string
    "modifiedBy" => null, // string
    "modifiedOn" => null, // string
]);
```


### OdcsContractResult

Create an instance: `$odcs_contract_result = $client->OdcsContractResult();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `labelsApplied` | `int` | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | `int` | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | `int` | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | `array` | Any warnings encountered during projection. |

#### Example: Create

```php
$odcs_contract_result = $client->OdcsContractResult()->create([
    "group_id" => null, // string
]);
```


### OdcsContractSummary

Create an instance: `$odcs_contract_summary = $client->OdcsContractSummary();`

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

```php
// list() returns an array of OdcsContractSummary records (throws on error).
$odcs_contract_summarys = $client->OdcsContractSummary()->list();
```


### ReferenceGraph

Create an instance: `$reference_graph = $client->ReferenceGraph();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `edges` | `array` | All edges (references) in the graph. |
| `metadata` | `array` | Metadata about the graph structure. |
| `nodes` | `array` | All nodes in the graph, including the root. |
| `root` | `array` | The root node of the graph (the artifact for which references were requested). |

#### Example: List

```php
// list() returns an array of ReferenceGraph records (throws on error).
$reference_graphs = $client->ReferenceGraph()->list();
```


### RoleMapping

Create an instance: `$role_mapping = $client->RoleMapping();`

#### Operations

| Method | Description |
| --- | --- |
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

```php
// load() returns the ENTITY — call data_get() for the RoleMapping record (throws on error).
$role_mapping = $client->RoleMapping()->load(["id" => "role_mapping_id"]);
```

#### Example: List

```php
// list() returns an array of RoleMapping records (throws on error).
$role_mappings = $client->RoleMapping()->list();
```


### Rule

Create an instance: `$rule = $client->Rule();`

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

```php
// load() returns the ENTITY — call data_get() for the Rule record (throws on error).
$rule = $client->Rule()->load(["id" => "rule_id"]);
```

#### Example: List

```php
// list() returns an array of Rule records (throws on error).
$rules = $client->Rule()->list();
```


### SearchedBranch

Create an instance: `$searched_branch = $client->SearchedBranch();`

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
| `systemDefined` | `bool` |  |

#### Example: List

```php
// list() returns an array of SearchedBranch records (throws on error).
$searched_branchs = $client->SearchedBranch()->list();
```


### SearchedGroup

Create an instance: `$searched_group = $client->SearchedGroup();`

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
| `labels` | `array` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: List

```php
// list() returns an array of SearchedGroup records (throws on error).
$searched_groups = $client->SearchedGroup()->list();
```


### SystemInfo

Create an instance: `$system_info = $client->SystemInfo();`

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

```php
// load() returns the ENTITY — call data_get() for the SystemInfo record (throws on error).
$system_info = $client->SystemInfo()->load();
```


### UsageSummary

Create an instance: `$usage_summary = $client->UsageSummary();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `int` |  |
| `dead` | `int` |  |
| `stale` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the UsageSummary record (throws on error).
$usage_summary = $client->UsageSummary()->load();
```


### UserInfo

Create an instance: `$user_info = $client->UserInfo();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `bool` |  |
| `developer` | `bool` |  |
| `displayName` | `string` |  |
| `username` | `string` |  |
| `viewer` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the UserInfo record (throws on error).
$user_info = $client->UserInfo()->load();
```


### UserInterfaceConfig

Create an instance: `$user_interface_config = $client->UserInterfaceConfig();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth` | `array` |  |
| `features` | `array` |  |
| `ui` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the UserInterfaceConfig record (throws on error).
$user_interface_config = $client->UserInterfaceConfig()->load();
```


### Version

Create an instance: `$version = $client->Version();`

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
| `branches` | `array` |  |
| `content` | `array` |  |
| `contentId` | `int` |  |
| `count` | `int` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `int` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `isDraft` | `bool` |  |
| `labels` | `array` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `value` | `string` |  |
| `version` | `string` |  |
| `versions` | `array` | The collection of artifact versions returned in the result set. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Version record (throws on error).
$version = $client->Version()->load(["artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression"]);
```

#### Example: List

```php
// list() returns an array of Version records (throws on error).
$versions = $client->Version()->list();
```

#### Example: Create

```php
$version = $client->Version()->create([
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


### WellKnown

Create an instance: `$well_known = $client->WellKnown();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WellKnown record (throws on error).
$well_known = $client->WellKnown()->load(["artifact_id" => "artifact_id", "group_id" => "group_id"]);
```


### WrappedVersionState

Create an instance: `$wrapped_version_state = $client->WrappedVersionState();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `state` | `string` | Describes the state of an artifact or artifact version. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WrappedVersionState record (throws on error).
$wrapped_version_state = $client->WrappedVersionState()->load(["artifact_id" => "artifact_id", "group_id" => "group_id", "version_expression" => "version_expression"]);
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

Features are the extension mechanism. A feature is a PHP class
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

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── apicurioregistry_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`apicurioregistry_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$contractrule = $client->ContractRule();
$contractrule->list();

// $contractrule->data_get() now returns the contractrule data from the last list
// $contractrule->match_get() returns the last match criteria
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
