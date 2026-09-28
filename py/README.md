# ApicurioRegistry Python SDK



The Python SDK for the ApicurioRegistry API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Admin()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/apicurio-registry-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from apicurioregistry_sdk import ApicurioRegistrySDK

client = ApicurioRegistrySDK({
    "server": {
        "registry": "<registry>",
    },
})
```

### 3. Load an artifact

Artifact is nested under global, so provide the `global_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    artifact = client.Artifact().load({"global_id": 1})
    print(artifact)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Admin().create({"role": "example_role", "value": "example_value"})

# Update
client.Admin().update({"principal_id": "example_principal_id", "role": "example_role"})

# Remove
client.Admin().remove({"principal_id": "example_principal_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    contractrules = client.ContractRule().list()
    print(contractrules)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ApicurioRegistrySDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
contractrule = client.ContractRule().list()
# contractrule contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ApicurioRegistrySDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ApicurioRegistrySDK

```python
from apicurioregistry_sdk import ApicurioRegistrySDK

client = ApicurioRegistrySDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ApicurioRegistrySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ApicurioRegistrySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `admin = client.Admin()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `str` |  |
| `value` | `str` |  |

#### Example: Create

```python
admin = client.Admin().create({
    "role": "example_role",  # str
    "value": "example_value",  # str
})
```


### Agent

Create an instance: `agent = client.Agent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `capabilities` | `dict` | Capabilities of an A2A agent. |
| `createdOn` | `int` |  |
| `defaultInputModes` | `list` |  |
| `defaultOutputModes` | `list` |  |
| `description` | `str` |  |
| `documentationUrl` | `str` |  |
| `groupId` | `str` |  |
| `iconUrl` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |
| `protocolVersion` | `str` |  |
| `provider` | `dict` | Provider of an A2A agent. |
| `securityRequirements` | `list` |  |
| `securitySchemes` | `dict` |  |
| `signatures` | `list` |  |
| `skills` | `list` |  |
| `supportedInterfaces` | `list` |  |
| `version` | `str` |  |

#### Example: List

```python
agents = client.Agent().list()
```


### AgentCard

Create an instance: `agent_card = client.AgentCard()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `dict` | Capabilities of an A2A agent. |
| `defaultInputModes` | `list` |  |
| `defaultOutputModes` | `list` |  |
| `description` | `str` |  |
| `documentationUrl` | `str` |  |
| `iconUrl` | `str` |  |
| `name` | `str` |  |
| `protocolVersion` | `str` |  |
| `provider` | `dict` | Provider of an A2A agent. |
| `securityRequirements` | `list` |  |
| `securitySchemes` | `dict` |  |
| `signatures` | `list` |  |
| `skills` | `list` |  |
| `supportedInterfaces` | `list` |  |
| `version` | `str` |  |

#### Example: List

```python
agent_cards = client.AgentCard().list()
```


### AiCatalog

Create an instance: `ai_catalog = client.AiCatalog()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `list` |  |
| `description` | `str` |  |
| `displayName` | `str` |  |
| `identifier` | `str` |  |
| `representativeQueries` | `list` |  |
| `tags` | `list` |  |
| `type` | `str` |  |
| `updatedAt` | `str` |  |
| `url` | `str` |  |
| `version` | `str` |  |

#### Example: List

```python
ai_catalogs = client.AiCatalog().list()
```


### ArdExplore

Create an instance: `ard_explore = client.ArdExplore()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `query` | `dict` | ARD search query. |
| `resultType` | `dict` | Requested result type for the ARD POST /explore endpoint. |

#### Example: Create

```python
ard_explore = client.ArdExplore().create({
    "resultType": {},  # dict
})
```


### ArdSearch

Create an instance: `ard_search = client.ArdSearch()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `federation` | `str` |  |
| `pageSize` | `int` |  |
| `pageToken` | `str` |  |
| `query` | `dict` | ARD search query. |
| `results` | `list` |  |

#### Example: Create

```python
ard_search = client.ArdSearch().create({
    "query": {},  # dict
    "results": [],  # list
})
```


### Artifact

Create an instance: `artifact = client.Artifact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `artifactType` | `str` |  |
| `artifacts` | `list` | The artifacts returned in the result set. |
| `count` | `int` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `id` | `str` |  |
| `labels` | `dict` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |
| `versions` | `list` |  |

#### Example: Load

```python
artifact = client.Artifact().load({"global_id": 1})
```

#### Example: List

```python
artifacts = client.Artifact().list()
```

#### Example: Create

```python
artifact = client.Artifact().create({
    "artifactId": "example_artifactId",  # str
    "artifactType": "example_artifactType",  # str
    "artifacts": [],  # list
    "count": 1,  # int
    "createdOn": "example_createdOn",  # str
    "groupId": "example_groupId",  # str
    "modifiedBy": "example_modifiedBy",  # str
    "modifiedOn": "example_modifiedOn",  # str
    "owner": "example_owner",  # str
    "versions": [],  # list
})
```


### ArtifactReference

Create an instance: `artifact_reference = client.ArtifactReference()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `content` | `str` | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `str` | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `str` | Optional encoding for the content property. |
| `groupId` | `str` |  |
| `name` | `str` |  |
| `references` | `list` | Collection of references to other artifacts. |
| `version` | `str` |  |

#### Example: List

```python
artifact_references = client.ArtifactReference().list({"global_id_id": 1})
```

#### Example: Create

```python
artifact_reference = client.ArtifactReference().create({
    "artifactId": "example_artifactId",  # str
    "content": "example_content",  # str
    "contentType": "example_contentType",  # str
    "groupId": "example_groupId",  # str
    "name": "example_name",  # str
})
```


### ArtifactRule

Create an instance: `artifact_rule = client.ArtifactRule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `str` |  |
| `id` | `str` |  |
| `ruleType` | `str` |  |

#### Example: Create

```python
artifact_rule = client.ArtifactRule().create({
    "group_id": "example_group_id",  # str
    "id": "example_id",  # str
    "config": "example_config",  # str
})
```


### ArtifactType

Create an instance: `artifact_type = client.ArtifactType()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` |  |

#### Example: List

```python
artifact_types = client.ArtifactType().list()
```


### Branch

Create an instance: `branch = client.Branch()`

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
| `artifactId` | `str` |  |
| `branchId` | `str` |  |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `id` | `str` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `owner` | `str` |  |
| `systemDefined` | `bool` |  |
| `versions` | `list` |  |

#### Example: Load

```python
branch = client.Branch().load({"id": "branch_id", "artifact_id": "artifact_id", "group_id": "group_id"})
```

#### Example: Create

```python
branch = client.Branch().create({
    "artifact_id": "example_artifact_id",  # str
    "group_id": "example_group_id",  # str
    "artifactId": "example_artifactId",  # str
    "branchId": "example_branchId",  # str
    "createdOn": "example_createdOn",  # str
    "groupId": "example_groupId",  # str
    "modifiedBy": "example_modifiedBy",  # str
    "modifiedOn": "example_modifiedOn",  # str
    "owner": "example_owner",  # str
    "systemDefined": True,  # bool
})
```


### Comment

Create an instance: `comment = client.Comment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commentId` | `str` |  |
| `createdOn` | `str` |  |
| `owner` | `str` |  |
| `value` | `str` |  |

#### Example: List

```python
comments = client.Comment().list({"artifact_id": "example", "group_id": "example", "version_expression": "example"})
```

#### Example: Create

```python
comment = client.Comment().create({
    "artifact_id": "example_artifact_id",  # str
    "group_id": "example_group_id",  # str
    "version_expression": "example_version_expression",  # str
    "commentId": "example_commentId",  # str
    "createdOn": "example_createdOn",  # str
    "owner": "example_owner",  # str
    "value": "example_value",  # str
})
```


### ConfigurationProperty

Create an instance: `configuration_property = client.ConfigurationProperty()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `id` | `str` |  |
| `label` | `str` |  |
| `name` | `str` |  |
| `type` | `str` |  |
| `value` | `str` |  |

#### Example: Load

```python
configuration_property = client.ConfigurationProperty().load({"id": "configuration_property_id"})
```

#### Example: List

```python
configuration_propertys = client.ConfigurationProperty().list()
```


### ConsumerVersionHeatmap

Create an instance: `consumer_version_heatmap = client.ConsumerVersionHeatmap()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `str` |  |
| `driftAlert` | `bool` |  |
| `versions` | `dict` |  |
| `versionsBehind` | `int` |  |

#### Example: List

```python
consumer_version_heatmaps = client.ConsumerVersionHeatmap().list({"artifact_id": "example", "group_id": "example"})
```


### Content

Create an instance: `content = client.Content()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
content = client.Content().create({
    "artifact_type": "example_artifact_type",  # str
})
```


### Contract

Create an instance: `contract = client.Contract()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `artifactType` | `str` |  |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `id` | `str` |  |
| `labels` | `dict` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |

#### Example: Load

```python
contract = client.Contract().load({"id": "contract_id", "group_id": "group_id"})
```

#### Example: List

```python
contracts = client.Contract().list()
```

#### Example: Create

```python
contract = client.Contract().create({
    "artifact_id": "example_artifact_id",  # str
    "group_id": "example_group_id",  # str
    "artifactId": "example_artifactId",  # str
    "artifactType": "example_artifactType",  # str
    "createdOn": "example_createdOn",  # str
    "groupId": "example_groupId",  # str
    "modifiedBy": "example_modifiedBy",  # str
    "modifiedOn": "example_modifiedOn",  # str
    "owner": "example_owner",  # str
})
```


### ContractRule

Create an instance: `contract_rule = client.ContractRule()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` | The artifact ID containing the rule. |
| `globalId` | `int` | The global ID of the version (null for artifact-level rules). |
| `groupId` | `str` | The group ID of the artifact containing the rule. |
| `rule` | `dict` | A single contract rule definition. |
| `ruleCategory` | `str` | The rule category (DOMAIN or MIGRATION). |

#### Example: List

```python
contract_rules = client.ContractRule().list({"tag": "example"})
```


### ContractRuleSet

Create an instance: `contract_rule_set = client.ContractRuleSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domainRules` | `list` | Rules for domain validation. |
| `migrationRules` | `list` | Rules for version migration. |

#### Example: List

```python
contract_rule_sets = client.ContractRuleSet().list()
```


### CreateArtifact

Create an instance: `create_artifact = client.CreateArtifact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifact` | `dict` |  |
| `artifactId` | `str` |  |
| `artifactType` | `str` |  |
| `description` | `str` |  |
| `firstVersion` | `dict` |  |
| `labels` | `dict` |  |
| `name` | `str` |  |
| `version` | `dict` |  |

#### Example: Create

```python
create_artifact = client.CreateArtifact().create({
    "group_id": "example_group_id",  # str
    "artifact": {},  # dict
    "artifactId": "example_artifactId",  # str
    "firstVersion": {},  # dict
    "version": {},  # dict
})
```


### DeprecationReadiness

Create an instance: `deprecation_readiness = client.DeprecationReadiness()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `str` |  |
| `fetchCount` | `int` |  |
| `lastFetched` | `int` |  |

#### Example: List

```python
deprecation_readinesss = client.DeprecationReadiness().list({"artifact_id": "example", "group_id": "example", "version_id": "example"})
```


### DownloadRef

Create an instance: `download_ref = client.DownloadRef()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadId` | `str` |  |
| `href` | `str` |  |

#### Example: Load

```python
download_ref = client.DownloadRef().load()
```


### GitOp

Create an instance: `git_op = client.GitOp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ref` | `str` | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `str` | Repository ID to validate against. |
| `type` | `str` | Validation type. |

#### Example: Create

```python
git_op = client.GitOp().create({
    "ref": "example_ref",  # str
    "repoId": "example_repoId",  # str
})
```


### GitOpsStatus

Create an instance: `git_ops_status = client.GitOpsStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `context` | `str` | The file path or location where the error occurred. |
| `detail` | `str` | A human-readable description of the error. |
| `source` | `str` | The source ID (e.g., repository ID) where the error occurred. |

#### Example: List

```python
git_ops_statuss = client.GitOpsStatus().list()
```


### GitOpsValidateTask

Create an instance: `git_ops_validate_task = client.GitOpsValidateTask()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactCount` | `int` | Number of artifacts loaded during validation. |
| `completedAt` | `str` | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `str` | ISO 8601 timestamp of when the task was created. |
| `errors` | `list` | Validation errors. |
| `groupCount` | `int` | Number of groups loaded during validation. |
| `ref` | `str` | Git ref being validated. |
| `repoId` | `str` | Repository ID being validated. |
| `result` | `str` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `str` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `str` | Unique identifier for the validation task. |
| `type` | `str` | Validation type (`pull` or `push`). |
| `versionCount` | `int` | Number of artifact versions loaded during validation. |

#### Example: Load

```python
git_ops_validate_task = client.GitOpsValidateTask().load({"task_id": "task_id"})
```

#### Example: List

```python
git_ops_validate_tasks = client.GitOpsValidateTask().list()
```


### GlobalRule

Create an instance: `global_rule = client.GlobalRule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `str` |  |
| `id` | `str` |  |
| `ruleType` | `str` |  |

#### Example: Create

```python
global_rule = client.GlobalRule().create({
    "config": "example_config",  # str
})
```


### Group

Create an instance: `group = client.Group()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactsType` | `str` |  |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `id` | `str` |  |
| `labels` | `dict` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `owner` | `str` |  |
| `properties` | `dict` |  |

#### Example: Load

```python
group = client.Group().load({"id": "group_id"})
```

#### Example: List

```python
groups = client.Group().list()
```

#### Example: Create

```python
group = client.Group().create({
})
```


### GroupRule

Create an instance: `group_rule = client.GroupRule()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `str` |  |
| `id` | `str` |  |
| `ruleType` | `str` |  |

#### Example: Create

```python
group_rule = client.GroupRule().create({
    "id": "example_id",  # str
    "config": "example_config",  # str
})
```


### KafkaSql

Create an instance: `kafka_sql = client.KafkaSql()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `snapshotId` | `str` |  |

#### Example: Create

```python
kafka_sql = client.KafkaSql().create({
    "snapshotId": "example_snapshotId",  # str
})
```


### McpTool

Create an instance: `mcp_tool = client.McpTool()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `createdOn` | `int` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |
| `parameters` | `list` |  |
| `title` | `str` |  |

#### Example: List

```python
mcp_tools = client.McpTool().list()
```


### Metadata

Create an instance: `metadata = client.Metadata()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `artifactType` | `str` |  |
| `contentId` | `int` |  |
| `contractMetadata` | `dict` | Contract metadata projected from the artifact labels. |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `globalId` | `int` |  |
| `groupId` | `str` |  |
| `labels` | `dict` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |
| `version` | `int` |  |

#### Example: Load

```python
metadata = client.Metadata().load({"artifact_id": "artifact_id", "group_id": "group_id"})
```

#### Example: Create

```python
metadata = client.Metadata().create({
    "artifact_id": "example_artifact_id",  # str
    "group_id": "example_group_id",  # str
    "version_expression": "example_version_expression",  # str
    "modifiedBy": "example_modifiedBy",  # str
    "modifiedOn": "example_modifiedOn",  # str
})
```


### OdcsContractResult

Create an instance: `odcs_contract_result = client.OdcsContractResult()`

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
| `warnings` | `list` | Any warnings encountered during projection. |

#### Example: Create

```python
odcs_contract_result = client.OdcsContractResult().create({
    "group_id": "example_group_id",  # str
})
```


### OdcsContractSummary

Create an instance: `odcs_contract_summary = client.OdcsContractSummary()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `str` | The contract artifact ID. |
| `name` | `str` | The contract display name. |

#### Example: List

```python
odcs_contract_summarys = client.OdcsContractSummary().list({"group_id": "example"})
```


### ReferenceGraph

Create an instance: `reference_graph = client.ReferenceGraph()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `edges` | `list` | All edges (references) in the graph. |
| `metadata` | `dict` | Metadata about the graph structure. |
| `nodes` | `list` | All nodes in the graph, including the root. |
| `root` | `dict` | The root node of the graph (the artifact for which references were requested). |

#### Example: List

```python
reference_graphs = client.ReferenceGraph().list({"artifact_id": "example", "group_id": "example", "version_id": "example"})
```


### RoleMapping

Create an instance: `role_mapping = client.RoleMapping()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `principalId` | `str` |  |
| `principalName` | `str` | A friendly name for the principal. |
| `role` | `str` |  |

#### Example: Load

```python
role_mapping = client.RoleMapping().load({"id": "role_mapping_id"})
```

#### Example: List

```python
role_mappings = client.RoleMapping().list()
```


### Rule

Create an instance: `rule = client.Rule()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `str` |  |
| `id` | `str` |  |
| `ruleType` | `str` |  |

#### Example: Load

```python
rule = client.Rule().load({"id": "rule_id"})
```

#### Example: List

```python
rules = client.Rule().list()
```


### SearchedBranch

Create an instance: `searched_branch = client.SearchedBranch()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `branchId` | `str` |  |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `owner` | `str` |  |
| `systemDefined` | `bool` |  |

#### Example: List

```python
searched_branchs = client.SearchedBranch().list({"artifact_id": "example", "group_id": "example"})
```


### SearchedGroup

Create an instance: `searched_group = client.SearchedGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `groupId` | `str` |  |
| `labels` | `dict` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `owner` | `str` |  |

#### Example: List

```python
searched_groups = client.SearchedGroup().list()
```


### SystemInfo

Create an instance: `system_info = client.SystemInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `builtOn` | `str` |  |
| `description` | `str` |  |
| `name` | `str` |  |
| `version` | `str` |  |

#### Example: Load

```python
system_info = client.SystemInfo().load()
```


### UsageSummary

Create an instance: `usage_summary = client.UsageSummary()`

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

```python
usage_summary = client.UsageSummary().load()
```


### UserInfo

Create an instance: `user_info = client.UserInfo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `bool` |  |
| `developer` | `bool` |  |
| `displayName` | `str` |  |
| `username` | `str` |  |
| `viewer` | `bool` |  |

#### Example: Load

```python
user_info = client.UserInfo().load()
```


### UserInterfaceConfig

Create an instance: `user_interface_config = client.UserInterfaceConfig()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth` | `dict` |  |
| `features` | `dict` |  |
| `ui` | `dict` |  |

#### Example: Load

```python
user_interface_config = client.UserInterfaceConfig().load()
```


### Version

Create an instance: `version = client.Version()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `str` |  |
| `artifactType` | `str` |  |
| `branches` | `list` |  |
| `content` | `dict` |  |
| `contentId` | `int` |  |
| `count` | `int` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `str` |  |
| `description` | `str` |  |
| `globalId` | `int` |  |
| `groupId` | `str` |  |
| `id` | `str` |  |
| `isDraft` | `bool` |  |
| `labels` | `dict` |  |
| `modifiedBy` | `str` |  |
| `modifiedOn` | `str` |  |
| `name` | `str` |  |
| `owner` | `str` |  |
| `state` | `str` |  |
| `value` | `str` |  |
| `version` | `str` |  |
| `versions` | `list` | The collection of artifact versions returned in the result set. |

#### Example: Load

```python
version = client.Version().load({"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"})
```

#### Example: List

```python
versions = client.Version().list()
```

#### Example: Create

```python
version = client.Version().create({
    "artifactId": "example_artifactId",  # str
    "artifactType": "example_artifactType",  # str
    "content": {},  # dict
    "contentId": 1,  # int
    "count": 1,  # int
    "createdOn": "example_createdOn",  # str
    "globalId": 1,  # int
    "owner": "example_owner",  # str
    "value": "example_value",  # str
    "versions": [],  # list
})
```


### WellKnown

Create an instance: `well_known = client.WellKnown()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
well_known = client.WellKnown().load({"artifact_id": "artifact_id", "group_id": "group_id"})
```


### WrappedVersionState

Create an instance: `wrapped_version_state = client.WrappedVersionState()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `state` | `str` | Describes the state of an artifact or artifact version. |

#### Example: Load

```python
wrapped_version_state = client.WrappedVersionState().load({"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"})
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── apicurioregistry_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`apicurioregistry_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
contractrule = client.ContractRule()
contractrule.list()

# contractrule.data_get() now returns the contractrule data from the last list
# contractrule.match_get() returns the last match criteria
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
