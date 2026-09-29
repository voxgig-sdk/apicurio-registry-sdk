# ApicurioRegistry TypeScript SDK



The TypeScript SDK for the ApicurioRegistry API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Admin()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/apicurio-registry-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/apicurio-registry-sdk
npm install ./apicurio-registry-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ApicurioRegistrySDK } from '@voxgig-sdk/apicurio-registry-sdk'

const client = new ApicurioRegistrySDK({
  // Required: this API's server URL is templated on these.
  server: {
    registry: '<registry>',
  },
})
```

### 3. Load an artifact

Artifact is nested under global, so provide the `global_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const artifact = await client.Artifact().load({
    global_id: 1,
  })
  console.log(artifact)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Admin ENTITY (.data() for the record)
const created = await client.Admin().create({
  role: 'example_role',
  value: 'example_value',
})

// Update
const updated = await client.Admin().update({
  principal_id: 'example_principal_id',
  role: 'example_role',
})

// Remove
await client.Admin().remove({
  principal_id: 'example_principal_id',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const contractrules = await client.ContractRule().list()
  console.log(contractrules)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ApicurioRegistrySDK.test()

const contractrule = await client.ContractRule().list()
// contractrule is the entity, populated with mock response data
// — call contractrule.data() for the record itself
console.log(contractrule)
```

You can also use the instance method:

```ts
const client = new ApicurioRegistrySDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.ContractRule()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ApicurioRegistrySDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
APICURIO_REGISTRY_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### ApicurioRegistrySDK

#### Constructor

```ts
new ApicurioRegistrySDK(options?: {
  server?: { registry: string }
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `server` | `object` | **Required.** Values for the server-URL variables: `registry`. The API base URL is a template over them. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Admin(data?)` | `AdminEntity` | Create an Admin entity instance. |
| `Agent(data?)` | `AgentEntity` | Create an Agent entity instance. |
| `AgentCard(data?)` | `AgentCardEntity` | Create an AgentCard entity instance. |
| `AiCatalog(data?)` | `AiCatalogEntity` | Create an AiCatalog entity instance. |
| `ArdExplore(data?)` | `ArdExploreEntity` | Create an ArdExplore entity instance. |
| `ArdSearch(data?)` | `ArdSearchEntity` | Create an ArdSearch entity instance. |
| `Artifact(data?)` | `ArtifactEntity` | Create an Artifact entity instance. |
| `ArtifactReference(data?)` | `ArtifactReferenceEntity` | Create an ArtifactReference entity instance. |
| `ArtifactRule(data?)` | `ArtifactRuleEntity` | Create an ArtifactRule entity instance. |
| `ArtifactType(data?)` | `ArtifactTypeEntity` | Create an ArtifactType entity instance. |
| `Branch(data?)` | `BranchEntity` | Create a Branch entity instance. |
| `Comment(data?)` | `CommentEntity` | Create a Comment entity instance. |
| `ConfigurationProperty(data?)` | `ConfigurationPropertyEntity` | Create a ConfigurationProperty entity instance. |
| `ConsumerVersionHeatmap(data?)` | `ConsumerVersionHeatmapEntity` | Create a ConsumerVersionHeatmap entity instance. |
| `Content(data?)` | `ContentEntity` | Create a Content entity instance. |
| `Contract(data?)` | `ContractEntity` | Create a Contract entity instance. |
| `ContractRule(data?)` | `ContractRuleEntity` | Create a ContractRule entity instance. |
| `ContractRuleSet(data?)` | `ContractRuleSetEntity` | Create a ContractRuleSet entity instance. |
| `CreateArtifact(data?)` | `CreateArtifactEntity` | Create a CreateArtifact entity instance. |
| `DeprecationReadiness(data?)` | `DeprecationReadinessEntity` | Create a DeprecationReadiness entity instance. |
| `DownloadRef(data?)` | `DownloadRefEntity` | Create a DownloadRef entity instance. |
| `GitOp(data?)` | `GitOpEntity` | Create a GitOp entity instance. |
| `GitOpsStatus(data?)` | `GitOpsStatusEntity` | Create a GitOpsStatus entity instance. |
| `GitOpsValidateTask(data?)` | `GitOpsValidateTaskEntity` | Create a GitOpsValidateTask entity instance. |
| `GlobalRule(data?)` | `GlobalRuleEntity` | Create a GlobalRule entity instance. |
| `Group(data?)` | `GroupEntity` | Create a Group entity instance. |
| `GroupRule(data?)` | `GroupRuleEntity` | Create a GroupRule entity instance. |
| `KafkaSql(data?)` | `KafkaSqlEntity` | Create a KafkaSql entity instance. |
| `Metadata(data?)` | `MetadataEntity` | Create a Metadata entity instance. |
| `OdcsContractResult(data?)` | `OdcsContractResultEntity` | Create an OdcsContractResult entity instance. |
| `OdcsContractSummary(data?)` | `OdcsContractSummaryEntity` | Create an OdcsContractSummary entity instance. |
| `ReferenceGraph(data?)` | `ReferenceGraphEntity` | Create a ReferenceGraph entity instance. |
| `RoleMapping(data?)` | `RoleMappingEntity` | Create a RoleMapping entity instance. |
| `Rule(data?)` | `RuleEntity` | Create a Rule entity instance. |
| `SearchedBranch(data?)` | `SearchedBranchEntity` | Create a SearchedBranch entity instance. |
| `SearchedGroup(data?)` | `SearchedGroupEntity` | Create a SearchedGroup entity instance. |
| `SystemInfo(data?)` | `SystemInfoEntity` | Create a SystemInfo entity instance. |
| `UsageSummary(data?)` | `UsageSummaryEntity` | Create an UsageSummary entity instance. |
| `UserInfo(data?)` | `UserInfoEntity` | Create an UserInfo entity instance. |
| `UserInterfaceConfig(data?)` | `UserInterfaceConfigEntity` | Create an UserInterfaceConfig entity instance. |
| `Version(data?)` | `VersionEntity` | Create a Version entity instance. |
| `WellKnown(data?)` | `WellKnownEntity` | Create a WellKnown entity instance. |
| `WrappedVersionState(data?)` | `WrappedVersionStateEntity` | Create a WrappedVersionState entity instance. |
| `tester(testopts?, sdkopts?)` | `ApicurioRegistrySDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ApicurioRegistrySDK.test(testopts?, sdkopts?)` | `ApicurioRegistrySDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ApicurioRegistrySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Admin

| Field | Description |
| --- | --- |
| `role` |  |
| `value` |  |

Operations: create, remove, update.

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/well-known/ard/agents`

#### ArdExplore

| Field | Description |
| --- | --- |
| `facets` | Facets keyed by the requested facet field name. |
| `query` | ARD search query. |
| `resultType` | Requested result type for the ARD POST /explore endpoint. |

Operations: create.

API path: `/well-known/ard/explore`

#### ArdSearch

| Field | Description |
| --- | --- |
| `federation` |  |
| `pageSize` |  |
| `pageToken` |  |
| `query` | ARD search query. |
| `results` |  |

Operations: create.

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

Operations: create, list, load, remove.

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

Operations: create, list.

API path: `/content/references`

#### ArtifactRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: create, remove.

API path: `/groups/{groupId}/artifacts/{artifactId}/rules`

#### ArtifactType

| Field | Description |
| --- | --- |
| `name` |  |

Operations: list.

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

Operations: create, load, remove, update.

API path: `/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions`

#### Comment

| Field | Description |
| --- | --- |
| `commentId` |  |
| `createdOn` |  |
| `owner` |  |
| `value` |  |

Operations: create, list.

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

Operations: list, load.

API path: `/admin/config/properties`

#### ConsumerVersionHeatmap

| Field | Description |
| --- | --- |
| `clientId` |  |
| `driftAlert` |  |
| `versions` |  |
| `versionsBehind` |  |

Operations: list.

API path: `/admin/usage/artifacts/{groupId}/{artifactId}/heatmap`

#### Content

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: create, list, load, remove, update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute`

#### ContractRule

| Field | Description |
| --- | --- |
| `artifactId` | The artifact ID containing the rule. |
| `globalId` | The global ID of the version (null for artifact-level rules). |
| `groupId` | The group ID of the artifact containing the rule. |
| `rule` | A single contract rule definition. |
| `ruleCategory` | The rule category (DOMAIN or MIGRATION). |

Operations: list.

API path: `/search/contract/rules`

#### ContractRuleSet

| Field | Description |
| --- | --- |
| `domainRules` | Rules for domain validation. |
| `migrationRules` | Rules for version migration. |

Operations: list, update.

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

Operations: create.

API path: `/groups/{groupId}/artifacts`

#### DeprecationReadiness

| Field | Description |
| --- | --- |
| `clientId` |  |
| `fetchCount` |  |
| `lastFetched` |  |

Operations: list.

API path: `/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness`

#### DownloadRef

| Field | Description |
| --- | --- |
| `downloadId` |  |
| `href` |  |

Operations: load.

API path: `/admin/export`

#### GitOp

| Field | Description |
| --- | --- |

Operations: create, remove.

API path: `/admin/gitops/sync`

#### GitOpsStatus

| Field | Description |
| --- | --- |
| `context` | The file path or location where the error occurred. |
| `detail` | A human-readable description of the error. |
| `source` | The source ID (e.g., repository ID) where the error occurred. |

Operations: list.

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

Operations: create, list, load.

API path: `/admin/gitops/validate`

#### GlobalRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: create, list, remove.

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

Operations: create, list, load, remove, update.

API path: `/groups`

#### GroupRule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: create, remove.

API path: `/groups/{groupId}/rules`

#### KafkaSql

| Field | Description |
| --- | --- |
| `snapshotId` |  |

Operations: create.

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

Operations: create, load, update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render`

#### OdcsContractResult

| Field | Description |
| --- | --- |
| `contractId` | The contract artifact ID. |
| `projection` | Summary of the projection performed when an ODCS contract is applied. |
| `version` | The ODCS contract version. |

Operations: create, update.

API path: `/groups/{groupId}/contracts`

#### OdcsContractSummary

| Field | Description |
| --- | --- |
| `contractId` | The contract artifact ID. |
| `name` | The contract display name. |

Operations: list.

API path: `/groups/{groupId}/contracts`

#### ReferenceGraph

| Field | Description |
| --- | --- |
| `edges` | All edges (references) in the graph. |
| `metadata` | Metadata about the graph structure. |
| `nodes` | All nodes in the graph, including the root. |
| `root` | The root node of the graph (the artifact for which references were requested). |

Operations: list.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph`

#### RoleMapping

| Field | Description |
| --- | --- |
| `id` |  |
| `principalId` |  |
| `principalName` | A friendly name for the principal. |
| `role` |  |

Operations: create, list, load.

API path: `/admin/roleMappings`

#### Rule

| Field | Description |
| --- | --- |
| `config` |  |
| `id` |  |
| `ruleType` |  |

Operations: list, load, update.

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

Operations: list.

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

Operations: list.

API path: `/search/groups`

#### SystemInfo

| Field | Description |
| --- | --- |
| `builtOn` |  |
| `description` |  |
| `name` |  |
| `version` |  |

Operations: load.

API path: `/system/info`

#### UsageSummary

| Field | Description |
| --- | --- |
| `active` |  |
| `dead` |  |
| `stale` |  |

Operations: load.

API path: `/admin/usage/summary`

#### UserInfo

| Field | Description |
| --- | --- |
| `admin` |  |
| `developer` |  |
| `displayName` |  |
| `username` |  |
| `viewer` |  |

Operations: load.

API path: `/users/me`

#### UserInterfaceConfig

| Field | Description |
| --- | --- |
| `auth` |  |
| `features` |  |
| `ui` |  |

Operations: load.

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

Operations: create, list, load, remove, update.

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

Operations: list, load.

API path: `/well-known/agents`

#### WrappedVersionState

| Field | Description |
| --- | --- |
| `state` | Describes the state of an artifact or artifact version. |

Operations: load.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state`



## Entities


### Admin

Create an instance: `const admin = client.Admin()`

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

```ts
const admin = await client.Admin().create({
  role: 'example_role',
  value: 'example_value',
})
```


### Agent

Create an instance: `const agent = client.Agent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Record<string, any>` | Capabilities of an A2A agent. |
| `defaultInputModes` | `any[]` |  |
| `defaultOutputModes` | `any[]` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `Record<string, any>` | Provider of an A2A agent. |
| `securityRequirements` | `any[]` |  |
| `securitySchemes` | `Record<string, any>` |  |
| `signatures` | `any[]` |  |
| `skills` | `any[]` |  |
| `supportedInterfaces` | `any[]` |  |
| `version` | `string` |  |

#### Example: List

```ts
const agents = await client.Agent().list()
```


### AgentCard

Create an instance: `const agent_card = client.AgentCard()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Record<string, any>` | Capabilities of an A2A agent. |
| `defaultInputModes` | `any[]` |  |
| `defaultOutputModes` | `any[]` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `Record<string, any>` | Provider of an A2A agent. |
| `securityRequirements` | `any[]` |  |
| `securitySchemes` | `Record<string, any>` |  |
| `signatures` | `any[]` |  |
| `skills` | `any[]` |  |
| `supportedInterfaces` | `any[]` |  |
| `version` | `string` |  |

#### Example: List

```ts
const agent_cards = await client.AgentCard().list()
```


### AiCatalog

Create an instance: `const ai_catalog = client.AiCatalog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `any[]` |  |
| `description` | `string` |  |
| `displayName` | `string` |  |
| `identifier` | `string` |  |
| `representativeQueries` | `any[]` |  |
| `tags` | `any[]` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |
| `version` | `string` |  |

#### Example: List

```ts
const ai_catalogs = await client.AiCatalog().list()
```


### ArdExplore

Create an instance: `const ard_explore = client.ArdExplore()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `facets` | `Record<string, any>` | Facets keyed by the requested facet field name. |
| `query` | `Record<string, any>` | ARD search query. |
| `resultType` | `string` | Requested result type for the ARD POST /explore endpoint. |

#### Example: Create

```ts
const ard_explore = await client.ArdExplore().create({
})
```


### ArdSearch

Create an instance: `const ard_search = client.ArdSearch()`

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
| `query` | `Record<string, any>` | ARD search query. |
| `results` | `any[]` |  |

#### Example: Create

```ts
const ard_search = await client.ArdSearch().create({
  query: {},
  results: [],
})
```


### Artifact

Create an instance: `const artifact = client.Artifact()`

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
| `artifacts` | `any[]` | The artifacts returned in the result set. |
| `count` | `number` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `Record<string, any>` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `versions` | `any[]` |  |

#### Example: Load

```ts
const artifact = await client.Artifact().load({ global_id: 1 })
```

#### Example: List

```ts
const artifacts = await client.Artifact().list()
```

#### Example: Create

```ts
const artifact = await client.Artifact().create({
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


### ArtifactReference

Create an instance: `const artifact_reference = client.ArtifactReference()`

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
| `references` | `any[]` | Collection of references to other artifacts. |
| `version` | `string` |  |

#### Example: List

```ts
const artifact_references = await client.ArtifactReference().list({ global_id_id: 1 })
```

#### Example: Create

```ts
const artifact_reference = await client.ArtifactReference().create({
  artifactId: 'example_artifactId',
  content: 'example_content',
  contentType: 'example_contentType',
  groupId: 'example_groupId',
  name: 'example_name',
})
```


### ArtifactRule

Create an instance: `const artifact_rule = client.ArtifactRule()`

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

```ts
const artifact_rule = await client.ArtifactRule().create({
  group_id: 'example_group_id',
  id: 'example_id',
  config: 'example_config',
})
```


### ArtifactType

Create an instance: `const artifact_type = client.ArtifactType()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```ts
const artifact_types = await client.ArtifactType().list()
```


### Branch

Create an instance: `const branch = client.Branch()`

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
| `versions` | `any[]` |  |

#### Example: Load

```ts
const branch = await client.Branch().load({ id: 'branch_id', artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### Example: Create

```ts
const branch = await client.Branch().create({
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


### Comment

Create an instance: `const comment = client.Comment()`

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

```ts
const comments = await client.Comment().list({ artifact_id: "example", group_id: "example", version_expression: "example" })
```

#### Example: Create

```ts
const comment = await client.Comment().create({
  artifact_id: 'example_artifact_id',
  group_id: 'example_group_id',
  version_expression: 'example_version_expression',
  commentId: 'example_commentId',
  createdOn: 'example_createdOn',
  owner: 'example_owner',
  value: 'example_value',
})
```


### ConfigurationProperty

Create an instance: `const configuration_property = client.ConfigurationProperty()`

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

```ts
const configuration_property = await client.ConfigurationProperty().load({ id: 'configuration_property_id' })
```

#### Example: List

```ts
const configuration_propertys = await client.ConfigurationProperty().list()
```


### ConsumerVersionHeatmap

Create an instance: `const consumer_version_heatmap = client.ConsumerVersionHeatmap()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `driftAlert` | `boolean` |  |
| `versions` | `Record<string, any>` |  |
| `versionsBehind` | `number` |  |

#### Example: List

```ts
const consumer_version_heatmaps = await client.ConsumerVersionHeatmap().list({ artifact_id: "example", group_id: "example" })
```


### Content

Create an instance: `const content = client.Content()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const content = await client.Content().create({
  artifact_type: 'example_artifact_type',
})
```


### Contract

Create an instance: `const contract = client.Contract()`

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
| `labels` | `Record<string, any>` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```ts
const contract = await client.Contract().load({ id: 'contract_id', group_id: 'group_id' })
```

#### Example: List

```ts
const contracts = await client.Contract().list()
```

#### Example: Create

```ts
const contract = await client.Contract().create({
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


### ContractRule

Create an instance: `const contract_rule = client.ContractRule()`

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
| `rule` | `Record<string, any>` | A single contract rule definition. |
| `ruleCategory` | `string` | The rule category (DOMAIN or MIGRATION). |

#### Example: List

```ts
const contract_rules = await client.ContractRule().list({ tag: "example" })
```


### ContractRuleSet

Create an instance: `const contract_rule_set = client.ContractRuleSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domainRules` | `any[]` | Rules for domain validation. |
| `migrationRules` | `any[]` | Rules for version migration. |

#### Example: List

```ts
const contract_rule_sets = await client.ContractRuleSet().list()
```


### CreateArtifact

Create an instance: `const create_artifact = client.CreateArtifact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifact` | `Record<string, any>` |  |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `description` | `string` |  |
| `firstVersion` | `Record<string, any>` |  |
| `labels` | `Record<string, any>` |  |
| `name` | `string` |  |
| `version` | `Record<string, any>` |  |

#### Example: Create

```ts
const create_artifact = await client.CreateArtifact().create({
  group_id: 'example_group_id',
  artifact: {},
  artifactId: 'example_artifactId',
  firstVersion: {},
  version: {},
})
```


### DeprecationReadiness

Create an instance: `const deprecation_readiness = client.DeprecationReadiness()`

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

```ts
const deprecation_readinesss = await client.DeprecationReadiness().list({ artifact_id: "example", group_id: "example", version_id: "example" })
```


### DownloadRef

Create an instance: `const download_ref = client.DownloadRef()`

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

```ts
const download_ref = await client.DownloadRef().load()
```


### GitOp

Create an instance: `const git_op = client.GitOp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Example: Create

```ts
const git_op = await client.GitOp().create({
})
```


### GitOpsStatus

Create an instance: `const git_ops_status = client.GitOpsStatus()`

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

```ts
const git_ops_statuss = await client.GitOpsStatus().list()
```


### GitOpsValidateTask

Create an instance: `const git_ops_validate_task = client.GitOpsValidateTask()`

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
| `errors` | `any[]` | Validation errors. |
| `groupCount` | `number` | Number of groups loaded during validation. |
| `ref` | `string` | Git ref being validated. |
| `repoId` | `string` | Repository ID being validated. |
| `result` | `string` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Unique identifier for the validation task. |
| `type` | `string` | Validation type (`pull` or `push`). |
| `versionCount` | `number` | Number of artifact versions loaded during validation. |

#### Example: Load

```ts
const git_ops_validate_task = await client.GitOpsValidateTask().load({ task_id: 'task_id' })
```

#### Example: List

```ts
const git_ops_validate_tasks = await client.GitOpsValidateTask().list()
```

#### Example: Create

```ts
const git_ops_validate_task = await client.GitOpsValidateTask().create({
  state: 'example_state',
  taskId: 'example_taskId',
})
```


### GlobalRule

Create an instance: `const global_rule = client.GlobalRule()`

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

```ts
const global_rules = await client.GlobalRule().list()
```

#### Example: Create

```ts
const global_rule = await client.GlobalRule().create({
  config: 'example_config',
})
```


### Group

Create an instance: `const group = client.Group()`

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
| `labels` | `Record<string, any>` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```ts
const group = await client.Group().load({ id: 'group_id' })
```

#### Example: List

```ts
const groups = await client.Group().list()
```

#### Example: Create

```ts
const group = await client.Group().create({
  createdOn: 'example_createdOn',
  groupId: 'example_groupId',
  modifiedBy: 'example_modifiedBy',
  modifiedOn: 'example_modifiedOn',
  owner: 'example_owner',
})
```


### GroupRule

Create an instance: `const group_rule = client.GroupRule()`

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

```ts
const group_rule = await client.GroupRule().create({
  id: 'example_id',
  config: 'example_config',
})
```


### KafkaSql

Create an instance: `const kafka_sql = client.KafkaSql()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `snapshotId` | `string` |  |

#### Example: Create

```ts
const kafka_sql = await client.KafkaSql().create({
  snapshotId: 'example_snapshotId',
})
```


### Metadata

Create an instance: `const metadata = client.Metadata()`

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
| `contractMetadata` | `Record<string, any>` | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `number` |  |
| `groupId` | `string` |  |
| `labels` | `Record<string, any>` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `version` | `string` | A single version of an artifact. |

#### Example: Load

```ts
const metadata = await client.Metadata().load({ artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### Example: Create

```ts
const metadata = await client.Metadata().create({
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


### OdcsContractResult

Create an instance: `const odcs_contract_result = client.OdcsContractResult()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `string` | The contract artifact ID. |
| `projection` | `Record<string, any>` | Summary of the projection performed when an ODCS contract is applied. |
| `version` | `string` | The ODCS contract version. |

#### Example: Create

```ts
const odcs_contract_result = await client.OdcsContractResult().create({
  group_id: 'example_group_id',
})
```


### OdcsContractSummary

Create an instance: `const odcs_contract_summary = client.OdcsContractSummary()`

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

```ts
const odcs_contract_summarys = await client.OdcsContractSummary().list({ group_id: "example" })
```


### ReferenceGraph

Create an instance: `const reference_graph = client.ReferenceGraph()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `edges` | `any[]` | All edges (references) in the graph. |
| `metadata` | `Record<string, any>` | Metadata about the graph structure. |
| `nodes` | `any[]` | All nodes in the graph, including the root. |
| `root` | `Record<string, any>` | The root node of the graph (the artifact for which references were requested). |

#### Example: List

```ts
const reference_graphs = await client.ReferenceGraph().list({ artifact_id: "example", group_id: "example", version_id: "example" })
```


### RoleMapping

Create an instance: `const role_mapping = client.RoleMapping()`

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

```ts
const role_mapping = await client.RoleMapping().load({ id: 'role_mapping_id' })
```

#### Example: List

```ts
const role_mappings = await client.RoleMapping().list()
```

#### Example: Create

```ts
const role_mapping = await client.RoleMapping().create({
  principalId: 'example_principalId',
  role: 'example_role',
})
```


### Rule

Create an instance: `const rule = client.Rule()`

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

```ts
const rule = await client.Rule().load({ id: 'rule_id' })
```

#### Example: List

```ts
const rules = await client.Rule().list({ group_id: "example" })
```


### SearchedBranch

Create an instance: `const searched_branch = client.SearchedBranch()`

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

```ts
const searched_branchs = await client.SearchedBranch().list({ artifact_id: "example", group_id: "example" })
```


### SearchedGroup

Create an instance: `const searched_group = client.SearchedGroup()`

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
| `labels` | `Record<string, any>` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: List

```ts
const searched_groups = await client.SearchedGroup().list()
```


### SystemInfo

Create an instance: `const system_info = client.SystemInfo()`

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

```ts
const system_info = await client.SystemInfo().load()
```


### UsageSummary

Create an instance: `const usage_summary = client.UsageSummary()`

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

```ts
const usage_summary = await client.UsageSummary().load()
```


### UserInfo

Create an instance: `const user_info = client.UserInfo()`

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

```ts
const user_info = await client.UserInfo().load()
```


### UserInterfaceConfig

Create an instance: `const user_interface_config = client.UserInterfaceConfig()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth` | `Record<string, any>` |  |
| `features` | `Record<string, any>` |  |
| `ui` | `Record<string, any>` |  |

#### Example: Load

```ts
const user_interface_config = await client.UserInterfaceConfig().load()
```


### Version

Create an instance: `const version = client.Version()`

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
| `branches` | `any[]` |  |
| `content` | `Record<string, any>` |  |
| `contentId` | `number` |  |
| `count` | `number` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `number` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `isDraft` | `boolean` |  |
| `labels` | `Record<string, any>` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `value` | `string` |  |
| `version` | `string` | A single version of an artifact. |
| `versions` | `any[]` | The collection of artifact versions returned in the result set. |

#### Example: Load

```ts
const version = await client.Version().load({ artifact_id: 'artifact_id', group_id: 'group_id', version_expression: 'version_expression' })
```

#### Example: List

```ts
const versions = await client.Version().list()
```

#### Example: Create

```ts
const version = await client.Version().create({
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


### WellKnown

Create an instance: `const well_known = client.WellKnown()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `capabilities` | `Record<string, any>` | Capabilities of an A2A agent. |
| `createdOn` | `number` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `parameters` | `any[]` |  |
| `skills` | `any[]` |  |
| `supportedInterfaces` | `any[]` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const well_known = await client.WellKnown().load({ artifact_id: 'artifact_id', group_id: 'group_id' })
```

#### Example: List

```ts
const well_knowns = await client.WellKnown().list()
```


### WrappedVersionState

Create an instance: `const wrapped_version_state = client.WrappedVersionState()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `state` | `string` | Describes the state of an artifact or artifact version. |

#### Example: Load

```ts
const wrapped_version_state = await client.WrappedVersionState().load({ artifact_id: 'artifact_id', group_id: 'group_id', version_expression: 'version_expression' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
apicurio-registry/
├── src/
│   ├── ApicurioRegistrySDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ApicurioRegistrySDK } from '@voxgig-sdk/apicurio-registry-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const contractrule = client.ContractRule()
await contractrule.list()

// contractrule.data() now returns the contractrule data from the last `list`
// contractrule.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
