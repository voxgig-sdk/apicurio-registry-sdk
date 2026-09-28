# ApicurioRegistry Python SDK Reference

Complete API reference for the ApicurioRegistry Python SDK.


## ApicurioRegistrySDK

### Constructor

```python
from apicurioregistry_sdk import ApicurioRegistrySDK

client = ApicurioRegistrySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ApicurioRegistrySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ApicurioRegistrySDK.test()
```


### Instance Methods

#### `Admin(data=None)`

Create a new `AdminEntity` instance. Pass `None` for no initial data.

#### `Agent(data=None)`

Create a new `AgentEntity` instance. Pass `None` for no initial data.

#### `AgentCard(data=None)`

Create a new `AgentCardEntity` instance. Pass `None` for no initial data.

#### `AiCatalog(data=None)`

Create a new `AiCatalogEntity` instance. Pass `None` for no initial data.

#### `ArdExplore(data=None)`

Create a new `ArdExploreEntity` instance. Pass `None` for no initial data.

#### `ArdSearch(data=None)`

Create a new `ArdSearchEntity` instance. Pass `None` for no initial data.

#### `Artifact(data=None)`

Create a new `ArtifactEntity` instance. Pass `None` for no initial data.

#### `ArtifactReference(data=None)`

Create a new `ArtifactReferenceEntity` instance. Pass `None` for no initial data.

#### `ArtifactRule(data=None)`

Create a new `ArtifactRuleEntity` instance. Pass `None` for no initial data.

#### `ArtifactType(data=None)`

Create a new `ArtifactTypeEntity` instance. Pass `None` for no initial data.

#### `Branch(data=None)`

Create a new `BranchEntity` instance. Pass `None` for no initial data.

#### `Comment(data=None)`

Create a new `CommentEntity` instance. Pass `None` for no initial data.

#### `ConfigurationProperty(data=None)`

Create a new `ConfigurationPropertyEntity` instance. Pass `None` for no initial data.

#### `ConsumerVersionHeatmap(data=None)`

Create a new `ConsumerVersionHeatmapEntity` instance. Pass `None` for no initial data.

#### `Content(data=None)`

Create a new `ContentEntity` instance. Pass `None` for no initial data.

#### `Contract(data=None)`

Create a new `ContractEntity` instance. Pass `None` for no initial data.

#### `ContractRule(data=None)`

Create a new `ContractRuleEntity` instance. Pass `None` for no initial data.

#### `ContractRuleSet(data=None)`

Create a new `ContractRuleSetEntity` instance. Pass `None` for no initial data.

#### `CreateArtifact(data=None)`

Create a new `CreateArtifactEntity` instance. Pass `None` for no initial data.

#### `DeprecationReadiness(data=None)`

Create a new `DeprecationReadinessEntity` instance. Pass `None` for no initial data.

#### `DownloadRef(data=None)`

Create a new `DownloadRefEntity` instance. Pass `None` for no initial data.

#### `GitOp(data=None)`

Create a new `GitOpEntity` instance. Pass `None` for no initial data.

#### `GitOpsStatus(data=None)`

Create a new `GitOpsStatusEntity` instance. Pass `None` for no initial data.

#### `GitOpsValidateTask(data=None)`

Create a new `GitOpsValidateTaskEntity` instance. Pass `None` for no initial data.

#### `GlobalRule(data=None)`

Create a new `GlobalRuleEntity` instance. Pass `None` for no initial data.

#### `Group(data=None)`

Create a new `GroupEntity` instance. Pass `None` for no initial data.

#### `GroupRule(data=None)`

Create a new `GroupRuleEntity` instance. Pass `None` for no initial data.

#### `KafkaSql(data=None)`

Create a new `KafkaSqlEntity` instance. Pass `None` for no initial data.

#### `McpTool(data=None)`

Create a new `McpToolEntity` instance. Pass `None` for no initial data.

#### `Metadata(data=None)`

Create a new `MetadataEntity` instance. Pass `None` for no initial data.

#### `OdcsContractResult(data=None)`

Create a new `OdcsContractResultEntity` instance. Pass `None` for no initial data.

#### `OdcsContractSummary(data=None)`

Create a new `OdcsContractSummaryEntity` instance. Pass `None` for no initial data.

#### `ReferenceGraph(data=None)`

Create a new `ReferenceGraphEntity` instance. Pass `None` for no initial data.

#### `RoleMapping(data=None)`

Create a new `RoleMappingEntity` instance. Pass `None` for no initial data.

#### `Rule(data=None)`

Create a new `RuleEntity` instance. Pass `None` for no initial data.

#### `SearchedBranch(data=None)`

Create a new `SearchedBranchEntity` instance. Pass `None` for no initial data.

#### `SearchedGroup(data=None)`

Create a new `SearchedGroupEntity` instance. Pass `None` for no initial data.

#### `SystemInfo(data=None)`

Create a new `SystemInfoEntity` instance. Pass `None` for no initial data.

#### `UsageSummary(data=None)`

Create a new `UsageSummaryEntity` instance. Pass `None` for no initial data.

#### `UserInfo(data=None)`

Create a new `UserInfoEntity` instance. Pass `None` for no initial data.

#### `UserInterfaceConfig(data=None)`

Create a new `UserInterfaceConfigEntity` instance. Pass `None` for no initial data.

#### `Version(data=None)`

Create a new `VersionEntity` instance. Pass `None` for no initial data.

#### `WellKnown(data=None)`

Create a new `WellKnownEntity` instance. Pass `None` for no initial data.

#### `WrappedVersionState(data=None)`

Create a new `WrappedVersionStateEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AdminEntity

```python
admin = client.Admin()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `role` | `str` | Yes |  |
| `value` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Admin().create({
    "role": "example_role",  # str
    "value": "example_value",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Admin().remove({"principal_id": "principal_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Admin().update({
    "principal_id": "principal_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AdminEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentEntity

```python
agent = client.Agent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | No |  |
| `capabilities` | `dict` | No | Capabilities of an A2A agent. |
| `createdOn` | `int` | No |  |
| `defaultInputModes` | `list` | No |  |
| `defaultOutputModes` | `list` | No |  |
| `description` | `str` | No |  |
| `documentationUrl` | `str` | No |  |
| `groupId` | `str` | No |  |
| `iconUrl` | `str` | No |  |
| `name` | `str` | No |  |
| `owner` | `str` | No |  |
| `protocolVersion` | `str` | No |  |
| `provider` | `dict` | No | Provider of an A2A agent. |
| `securityRequirements` | `list` | No |  |
| `securitySchemes` | `dict` | No |  |
| `signatures` | `list` | No |  |
| `skills` | `list` | No |  |
| `supportedInterfaces` | `list` | No |  |
| `version` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Agent().list()
for agent in results:
    print(agent)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AgentCardEntity

```python
agent_card = client.AgentCard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `dict` | No | Capabilities of an A2A agent. |
| `defaultInputModes` | `list` | No |  |
| `defaultOutputModes` | `list` | No |  |
| `description` | `str` | No |  |
| `documentationUrl` | `str` | No |  |
| `iconUrl` | `str` | No |  |
| `name` | `str` | No |  |
| `protocolVersion` | `str` | No |  |
| `provider` | `dict` | No | Provider of an A2A agent. |
| `securityRequirements` | `list` | No |  |
| `securitySchemes` | `dict` | No |  |
| `signatures` | `list` | No |  |
| `skills` | `list` | No |  |
| `supportedInterfaces` | `list` | No |  |
| `version` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AgentCard().list()
for agent_card in results:
    print(agent_card)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgentCardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AiCatalogEntity

```python
ai_catalog = client.AiCatalog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `list` | No |  |
| `description` | `str` | No |  |
| `displayName` | `str` | No |  |
| `identifier` | `str` | Yes |  |
| `representativeQueries` | `list` | No |  |
| `tags` | `list` | No |  |
| `type` | `str` | Yes |  |
| `updatedAt` | `str` | No |  |
| `url` | `str` | No |  |
| `version` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AiCatalog().list()
for ai_catalog in results:
    print(ai_catalog)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AiCatalogEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArdExploreEntity

```python
ard_explore = client.ArdExplore()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `dict` | No | ARD search query. |
| `resultType` | `dict` | Yes | Requested result type for the ARD POST /explore endpoint. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ArdExplore().create({
    "resultType": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArdExploreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArdSearchEntity

```python
ard_search = client.ArdSearch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `federation` | `str` | No |  |
| `pageSize` | `int` | No |  |
| `pageToken` | `str` | No |  |
| `query` | `dict` | Yes | ARD search query. |
| `results` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ArdSearch().create({
    "query": {},  # dict
    "results": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArdSearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArtifactEntity

```python
artifact = client.Artifact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | Yes |  |
| `artifactType` | `str` | Yes |  |
| `artifacts` | `list` | Yes | The artifacts returned in the result set. |
| `count` | `int` | Yes | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `str` | Yes |  |
| `description` | `str` | No |  |
| `groupId` | `str` | Yes |  |
| `id` | `str` | No |  |
| `labels` | `dict` | No |  |
| `modifiedBy` | `str` | Yes |  |
| `modifiedOn` | `str` | Yes |  |
| `name` | `str` | No |  |
| `owner` | `str` | Yes |  |
| `versions` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Artifact().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Artifact().list()
for artifact in results:
    print(artifact)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Artifact().load({"global_id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Artifact().remove({"group_id": "group_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArtifactReferenceEntity

```python
artifact_reference = client.ArtifactReference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | Yes |  |
| `content` | `str` | Yes | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `str` | Yes | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `str` | No | Optional encoding for the content property. |
| `groupId` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `references` | `list` | No | Collection of references to other artifacts. |
| `version` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ArtifactReference().create({
    "artifactId": "example_artifactId",  # str
    "content": "example_content",  # str
    "contentType": "example_contentType",  # str
    "groupId": "example_groupId",  # str
    "name": "example_name",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ArtifactReference().list({"global_id_id": 1})
for artifact_reference in results:
    print(artifact_reference)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactReferenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArtifactRuleEntity

```python
artifact_rule = client.ArtifactRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `str` | Yes |  |
| `id` | `str` | No |  |
| `ruleType` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ArtifactRule().create({
    "group_id": "example_group_id",  # str
    "id": "example_id",  # str
    "config": "example_config",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ArtifactRule().remove({"group_id": "group_id", "id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactRuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArtifactTypeEntity

```python
artifact_type = client.ArtifactType()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ArtifactType().list()
for artifact_type in results:
    print(artifact_type)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArtifactTypeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BranchEntity

```python
branch = client.Branch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | Yes |  |
| `branchId` | `str` | Yes |  |
| `createdOn` | `str` | Yes |  |
| `description` | `str` | No |  |
| `groupId` | `str` | Yes |  |
| `id` | `str` | No |  |
| `modifiedBy` | `str` | Yes |  |
| `modifiedOn` | `str` | Yes |  |
| `owner` | `str` | Yes |  |
| `systemDefined` | `bool` | Yes |  |
| `versions` | `list` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Branch().create({
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Branch().load({"id": "branch_id", "artifact_id": "artifact_id", "group_id": "group_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Branch().remove({"id": "branch_id", "artifact_id": "artifact_id", "group_id": "group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Branch().update({
    "id": "branch_id",
    "artifact_id": "artifact_id",
    "group_id": "group_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BranchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CommentEntity

```python
comment = client.Comment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | `str` | Yes |  |
| `createdOn` | `str` | Yes |  |
| `owner` | `str` | Yes |  |
| `value` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Comment().create({
    "artifact_id": "example_artifact_id",  # str
    "group_id": "example_group_id",  # str
    "version_expression": "example_version_expression",  # str
    "commentId": "example_commentId",  # str
    "createdOn": "example_createdOn",  # str
    "owner": "example_owner",  # str
    "value": "example_value",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Comment().list({"artifact_id": "example", "group_id": "example", "version_expression": "example"})
for comment in results:
    print(comment)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CommentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConfigurationPropertyEntity

```python
configuration_property = client.ConfigurationProperty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | Yes |  |
| `id` | `str` | No |  |
| `label` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `type` | `str` | Yes |  |
| `value` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ConfigurationProperty().list()
for configuration_property in results:
    print(configuration_property)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ConfigurationProperty().load({"id": "configuration_property_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConfigurationPropertyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConsumerVersionHeatmapEntity

```python
consumer_version_heatmap = client.ConsumerVersionHeatmap()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `str` | Yes |  |
| `driftAlert` | `bool` | No |  |
| `versions` | `dict` | No |  |
| `versionsBehind` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ConsumerVersionHeatmap().list({"artifact_id": "example", "group_id": "example"})
for consumer_version_heatmap in results:
    print(consumer_version_heatmap)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConsumerVersionHeatmapEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContentEntity

```python
content = client.Content()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Content().create({
    "artifact_type": "example_artifact_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContractEntity

```python
contract = client.Contract()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | Yes |  |
| `artifactType` | `str` | Yes |  |
| `createdOn` | `str` | Yes |  |
| `description` | `str` | No |  |
| `groupId` | `str` | Yes |  |
| `id` | `str` | No |  |
| `labels` | `dict` | No |  |
| `modifiedBy` | `str` | Yes |  |
| `modifiedOn` | `str` | Yes |  |
| `name` | `str` | No |  |
| `owner` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Contract().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Contract().list()
for contract in results:
    print(contract)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Contract().load({"id": "contract_id", "group_id": "group_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Contract().remove({"id": "contract_id", "group_id": "group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Contract().update({
    "id": "contract_id",
    "artifact_id": "artifact_id",
    "group_id": "group_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContractEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContractRuleEntity

```python
contract_rule = client.ContractRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | No | The artifact ID containing the rule. |
| `globalId` | `int` | No | The global ID of the version (null for artifact-level rules). |
| `groupId` | `str` | No | The group ID of the artifact containing the rule. |
| `rule` | `dict` | Yes | A single contract rule definition. |
| `ruleCategory` | `str` | No | The rule category (DOMAIN or MIGRATION). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ContractRule().list({"tag": "example"})
for contract_rule in results:
    print(contract_rule)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContractRuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContractRuleSetEntity

```python
contract_rule_set = client.ContractRuleSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domainRules` | `list` | No | Rules for domain validation. |
| `migrationRules` | `list` | No | Rules for version migration. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ContractRuleSet().list()
for contract_rule_set in results:
    print(contract_rule_set)
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ContractRuleSet().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContractRuleSetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateArtifactEntity

```python
create_artifact = client.CreateArtifact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifact` | `dict` | Yes |  |
| `artifactId` | `str` | Yes |  |
| `artifactType` | `str` | No |  |
| `description` | `str` | No |  |
| `firstVersion` | `dict` | Yes |  |
| `labels` | `dict` | No |  |
| `name` | `str` | No |  |
| `version` | `dict` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CreateArtifact().create({
    "group_id": "example_group_id",  # str
    "artifact": {},  # dict
    "artifactId": "example_artifactId",  # str
    "firstVersion": {},  # dict
    "version": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateArtifactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeprecationReadinessEntity

```python
deprecation_readiness = client.DeprecationReadiness()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `str` | No |  |
| `fetchCount` | `int` | No |  |
| `lastFetched` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DeprecationReadiness().list({"artifact_id": "example", "group_id": "example", "version_id": "example"})
for deprecation_readiness in results:
    print(deprecation_readiness)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeprecationReadinessEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DownloadRefEntity

```python
download_ref = client.DownloadRef()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadId` | `str` | Yes |  |
| `href` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DownloadRef().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DownloadRefEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GitOpEntity

```python
git_op = client.GitOp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ref` | `str` | Yes | Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`). |
| `repoId` | `str` | Yes | Repository ID to validate against. |
| `type` | `str` | No | Validation type. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.GitOp().create({
    "ref": "example_ref",  # str
    "repoId": "example_repoId",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.GitOp().remove({"task_id": "task_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GitOpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GitOpsStatusEntity

```python
git_ops_status = client.GitOpsStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | `str` | No | The file path or location where the error occurred. |
| `detail` | `str` | Yes | A human-readable description of the error. |
| `source` | `str` | No | The source ID (e.g., repository ID) where the error occurred. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GitOpsStatus().list()
for git_ops_status in results:
    print(git_ops_status)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GitOpsStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GitOpsValidateTaskEntity

```python
git_ops_validate_task = client.GitOpsValidateTask()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactCount` | `int` | No | Number of artifacts loaded during validation. |
| `completedAt` | `str` | No | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `str` | No | ISO 8601 timestamp of when the task was created. |
| `errors` | `list` | No | Validation errors. |
| `groupCount` | `int` | No | Number of groups loaded during validation. |
| `ref` | `str` | No | Git ref being validated. |
| `repoId` | `str` | No | Repository ID being validated. |
| `result` | `str` | No | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `str` | Yes | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `str` | Yes | Unique identifier for the validation task. |
| `type` | `str` | No | Validation type (`pull` or `push`). |
| `versionCount` | `int` | No | Number of artifact versions loaded during validation. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GitOpsValidateTask().list()
for git_ops_validate_task in results:
    print(git_ops_validate_task)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GitOpsValidateTask().load({"task_id": "task_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GitOpsValidateTaskEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GlobalRuleEntity

```python
global_rule = client.GlobalRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `str` | Yes |  |
| `id` | `str` | No |  |
| `ruleType` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.GlobalRule().create({
    "config": "example_config",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.GlobalRule().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GlobalRuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GroupEntity

```python
group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactsType` | `str` | No |  |
| `createdOn` | `str` | No |  |
| `description` | `str` | No |  |
| `groupId` | `str` | No |  |
| `id` | `str` | No |  |
| `labels` | `dict` | No |  |
| `modifiedBy` | `str` | No |  |
| `modifiedOn` | `str` | No |  |
| `owner` | `str` | No |  |
| `properties` | `dict` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Group().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Group().list()
for group in results:
    print(group)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Group().load({"id": "group_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Group().remove({"id": "group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Group().update({
    "id": "group_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GroupRuleEntity

```python
group_rule = client.GroupRule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `str` | Yes |  |
| `id` | `str` | No |  |
| `ruleType` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.GroupRule().create({
    "id": "example_id",  # str
    "config": "example_config",  # str
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.GroupRule().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupRuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## KafkaSqlEntity

```python
kafka_sql = client.KafkaSql()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshotId` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.KafkaSql().create({
    "snapshotId": "example_snapshotId",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `KafkaSqlEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## McpToolEntity

```python
mcp_tool = client.McpTool()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | No |  |
| `createdOn` | `int` | No |  |
| `description` | `str` | No |  |
| `groupId` | `str` | No |  |
| `name` | `str` | No |  |
| `owner` | `str` | No |  |
| `parameters` | `list` | No |  |
| `title` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.McpTool().list()
for mcp_tool in results:
    print(mcp_tool)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `McpToolEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MetadataEntity

```python
metadata = client.Metadata()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | No |  |
| `artifactType` | `str` | No |  |
| `contentId` | `int` | No |  |
| `contractMetadata` | `dict` | No | Contract metadata projected from the artifact labels. |
| `createdOn` | `str` | No |  |
| `description` | `str` | No |  |
| `globalId` | `int` | No |  |
| `groupId` | `str` | No |  |
| `labels` | `dict` | No |  |
| `modifiedBy` | `str` | Yes |  |
| `modifiedOn` | `str` | Yes |  |
| `name` | `str` | No |  |
| `owner` | `str` | No |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Metadata().create({
    "artifact_id": "example_artifact_id",  # str
    "group_id": "example_group_id",  # str
    "version_expression": "example_version_expression",  # str
    "modifiedBy": "example_modifiedBy",  # str
    "modifiedOn": "example_modifiedOn",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Metadata().load({"artifact_id": "artifact_id", "group_id": "group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Metadata().update({
    "artifact_id": "artifact_id",
    "group_id": "group_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MetadataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OdcsContractResultEntity

```python
odcs_contract_result = client.OdcsContractResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `labelsApplied` | `int` | No | Number of contract.* labels set on the schema artifact. |
| `rulesApplied` | `int` | No | Number of CEL quality rules projected onto the schema artifact. |
| `tagsApplied` | `int` | No | Number of field-tag.* labels set on the schema artifact version. |
| `warnings` | `list` | No | Any warnings encountered during projection. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OdcsContractResult().create({
    "group_id": "example_group_id",  # str
})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.OdcsContractResult().update({
    "contract_id": "contract_id",
    "group_id": "group_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OdcsContractResultEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OdcsContractSummaryEntity

```python
odcs_contract_summary = client.OdcsContractSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contractId` | `str` | No | The contract artifact ID. |
| `name` | `str` | No | The contract display name. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.OdcsContractSummary().list({"group_id": "example"})
for odcs_contract_summary in results:
    print(odcs_contract_summary)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OdcsContractSummaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReferenceGraphEntity

```python
reference_graph = client.ReferenceGraph()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `edges` | `list` | Yes | All edges (references) in the graph. |
| `metadata` | `dict` | Yes | Metadata about the graph structure. |
| `nodes` | `list` | Yes | All nodes in the graph, including the root. |
| `root` | `dict` | Yes | The root node of the graph (the artifact for which references were requested). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ReferenceGraph().list({"artifact_id": "example", "group_id": "example", "version_id": "example"})
for reference_graph in results:
    print(reference_graph)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReferenceGraphEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RoleMappingEntity

```python
role_mapping = client.RoleMapping()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `principalId` | `str` | Yes |  |
| `principalName` | `str` | No | A friendly name for the principal. |
| `role` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RoleMapping().list()
for role_mapping in results:
    print(role_mapping)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RoleMapping().load({"id": "role_mapping_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RoleMappingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RuleEntity

```python
rule = client.Rule()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `str` | Yes |  |
| `id` | `str` | No |  |
| `ruleType` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Rule().list()
for rule in results:
    print(rule)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Rule().load({"id": "rule_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Rule().update({
    "id": "rule_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RuleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchedBranchEntity

```python
searched_branch = client.SearchedBranch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | Yes |  |
| `branchId` | `str` | Yes |  |
| `createdOn` | `str` | Yes |  |
| `description` | `str` | No |  |
| `groupId` | `str` | Yes |  |
| `modifiedBy` | `str` | Yes |  |
| `modifiedOn` | `str` | Yes |  |
| `owner` | `str` | Yes |  |
| `systemDefined` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SearchedBranch().list({"artifact_id": "example", "group_id": "example"})
for searched_branch in results:
    print(searched_branch)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchedBranchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchedGroupEntity

```python
searched_group = client.SearchedGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdOn` | `str` | Yes |  |
| `description` | `str` | No |  |
| `groupId` | `str` | Yes |  |
| `labels` | `dict` | No |  |
| `modifiedBy` | `str` | Yes |  |
| `modifiedOn` | `str` | Yes |  |
| `owner` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SearchedGroup().list()
for searched_group in results:
    print(searched_group)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchedGroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SystemInfoEntity

```python
system_info = client.SystemInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `builtOn` | `str` | No |  |
| `description` | `str` | No |  |
| `name` | `str` | No |  |
| `version` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SystemInfo().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SystemInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageSummaryEntity

```python
usage_summary = client.UsageSummary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `int` | Yes |  |
| `dead` | `int` | Yes |  |
| `stale` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.UsageSummary().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageSummaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserInfoEntity

```python
user_info = client.UserInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `bool` | No |  |
| `developer` | `bool` | No |  |
| `displayName` | `str` | No |  |
| `username` | `str` | No |  |
| `viewer` | `bool` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.UserInfo().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserInterfaceConfigEntity

```python
user_interface_config = client.UserInterfaceConfig()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth` | `dict` | Yes |  |
| `features` | `dict` | No |  |
| `ui` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.UserInterfaceConfig().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserInterfaceConfigEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VersionEntity

```python
version = client.Version()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `artifactId` | `str` | Yes |  |
| `artifactType` | `str` | Yes |  |
| `branches` | `list` | No |  |
| `content` | `dict` | Yes |  |
| `contentId` | `int` | Yes |  |
| `count` | `int` | Yes | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `str` | Yes |  |
| `description` | `str` | No |  |
| `globalId` | `int` | Yes |  |
| `groupId` | `str` | No |  |
| `id` | `str` | No |  |
| `isDraft` | `bool` | No |  |
| `labels` | `dict` | No |  |
| `modifiedBy` | `str` | No |  |
| `modifiedOn` | `str` | No |  |
| `name` | `str` | No |  |
| `owner` | `str` | Yes |  |
| `state` | `str` | Yes |  |
| `value` | `str` | Yes |  |
| `version` | `str` | No |  |
| `versions` | `list` | Yes | The collection of artifact versions returned in the result set. |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Version().create({
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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Version().list()
for version in results:
    print(version)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Version().load({"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Version().remove({"artifact_id": "artifact_id", "group_id": "group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Version().update({
    "artifact_id": "artifact_id",
    "comment_id": "comment_id",
    "group_id": "group_id",
    "version_id": "version_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VersionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WellKnownEntity

```python
well_known = client.WellKnown()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WellKnown().load({"artifact_id": "artifact_id", "group_id": "group_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WellKnownEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WrappedVersionStateEntity

```python
wrapped_version_state = client.WrappedVersionState()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | `str` | Yes | Describes the state of an artifact or artifact version. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WrappedVersionState().load({"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WrappedVersionStateEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = ApicurioRegistrySDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

