# ApicurioRegistry Golang SDK



The Golang SDK for the ApicurioRegistry API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Admin(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/apicurio-registry-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/apicurio-registry-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/apicurio-registry-sdk/go=../apicurio-registry-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/apicurio-registry-sdk/go"
)

func main() {
    client := sdk.NewApicurioRegistrySDK(map[string]any{
    "server": map[string]any{
        "registry": "<registry>",
    },
    })

    // Create a admin.
    created, err := client.Admin(nil).Create(map[string]any{"role": "example_role", "value": "example_value"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a admin.
    updated, err := client.Admin(nil).Update(map[string]any{"principal_id": "example_principal_id", "role": "example_role"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)

    // Remove a admin.
    removed, err := client.Admin(nil).Remove(map[string]any{"principal_id": "example_principal_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
contractrules, err := client.ContractRule(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = contractrules
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

contractRule, err := client.ContractRule(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(contractRule) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewApicurioRegistrySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewApicurioRegistrySDK

```go
func NewApicurioRegistrySDK(options map[string]any) *ApicurioRegistrySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ApicurioRegistrySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ApicurioRegistrySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Admin` | `(data map[string]any) ApicurioRegistryEntity` | Create an Admin entity instance. |
| `Agent` | `(data map[string]any) ApicurioRegistryEntity` | Create an Agent entity instance. |
| `AgentCard` | `(data map[string]any) ApicurioRegistryEntity` | Create an AgentCard entity instance. |
| `AiCatalog` | `(data map[string]any) ApicurioRegistryEntity` | Create an AiCatalog entity instance. |
| `ArdExplore` | `(data map[string]any) ApicurioRegistryEntity` | Create an ArdExplore entity instance. |
| `ArdSearch` | `(data map[string]any) ApicurioRegistryEntity` | Create an ArdSearch entity instance. |
| `Artifact` | `(data map[string]any) ApicurioRegistryEntity` | Create an Artifact entity instance. |
| `ArtifactReference` | `(data map[string]any) ApicurioRegistryEntity` | Create an ArtifactReference entity instance. |
| `ArtifactRule` | `(data map[string]any) ApicurioRegistryEntity` | Create an ArtifactRule entity instance. |
| `ArtifactType` | `(data map[string]any) ApicurioRegistryEntity` | Create an ArtifactType entity instance. |
| `Branch` | `(data map[string]any) ApicurioRegistryEntity` | Create a Branch entity instance. |
| `Comment` | `(data map[string]any) ApicurioRegistryEntity` | Create a Comment entity instance. |
| `ConfigurationProperty` | `(data map[string]any) ApicurioRegistryEntity` | Create a ConfigurationProperty entity instance. |
| `ConsumerVersionHeatmap` | `(data map[string]any) ApicurioRegistryEntity` | Create a ConsumerVersionHeatmap entity instance. |
| `Content` | `(data map[string]any) ApicurioRegistryEntity` | Create a Content entity instance. |
| `Contract` | `(data map[string]any) ApicurioRegistryEntity` | Create a Contract entity instance. |
| `ContractRule` | `(data map[string]any) ApicurioRegistryEntity` | Create a ContractRule entity instance. |
| `ContractRuleSet` | `(data map[string]any) ApicurioRegistryEntity` | Create a ContractRuleSet entity instance. |
| `CreateArtifact` | `(data map[string]any) ApicurioRegistryEntity` | Create a CreateArtifact entity instance. |
| `DeprecationReadiness` | `(data map[string]any) ApicurioRegistryEntity` | Create a DeprecationReadiness entity instance. |
| `DownloadRef` | `(data map[string]any) ApicurioRegistryEntity` | Create a DownloadRef entity instance. |
| `GitOp` | `(data map[string]any) ApicurioRegistryEntity` | Create a GitOp entity instance. |
| `GitOpsStatus` | `(data map[string]any) ApicurioRegistryEntity` | Create a GitOpsStatus entity instance. |
| `GitOpsValidateTask` | `(data map[string]any) ApicurioRegistryEntity` | Create a GitOpsValidateTask entity instance. |
| `GlobalRule` | `(data map[string]any) ApicurioRegistryEntity` | Create a GlobalRule entity instance. |
| `Group` | `(data map[string]any) ApicurioRegistryEntity` | Create a Group entity instance. |
| `GroupRule` | `(data map[string]any) ApicurioRegistryEntity` | Create a GroupRule entity instance. |
| `KafkaSql` | `(data map[string]any) ApicurioRegistryEntity` | Create a KafkaSql entity instance. |
| `Metadata` | `(data map[string]any) ApicurioRegistryEntity` | Create a Metadata entity instance. |
| `OdcsContractResult` | `(data map[string]any) ApicurioRegistryEntity` | Create an OdcsContractResult entity instance. |
| `OdcsContractSummary` | `(data map[string]any) ApicurioRegistryEntity` | Create an OdcsContractSummary entity instance. |
| `ReferenceGraph` | `(data map[string]any) ApicurioRegistryEntity` | Create a ReferenceGraph entity instance. |
| `RoleMapping` | `(data map[string]any) ApicurioRegistryEntity` | Create a RoleMapping entity instance. |
| `Rule` | `(data map[string]any) ApicurioRegistryEntity` | Create a Rule entity instance. |
| `SearchedBranch` | `(data map[string]any) ApicurioRegistryEntity` | Create a SearchedBranch entity instance. |
| `SearchedGroup` | `(data map[string]any) ApicurioRegistryEntity` | Create a SearchedGroup entity instance. |
| `SystemInfo` | `(data map[string]any) ApicurioRegistryEntity` | Create a SystemInfo entity instance. |
| `UsageSummary` | `(data map[string]any) ApicurioRegistryEntity` | Create an UsageSummary entity instance. |
| `UserInfo` | `(data map[string]any) ApicurioRegistryEntity` | Create an UserInfo entity instance. |
| `UserInterfaceConfig` | `(data map[string]any) ApicurioRegistryEntity` | Create an UserInterfaceConfig entity instance. |
| `Version` | `(data map[string]any) ApicurioRegistryEntity` | Create a Version entity instance. |
| `WellKnown` | `(data map[string]any) ApicurioRegistryEntity` | Create a WellKnown entity instance. |
| `WrappedVersionState` | `(data map[string]any) ApicurioRegistryEntity` | Create a WrappedVersionState entity instance. |

### Entity interface (ApicurioRegistryEntity)

All entities implement the `ApicurioRegistryEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    admin, err := client.Admin(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // admin is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Admin

| Field | Description |
| --- | --- |
| `"role"` |  |
| `"value"` |  |

Operations: Create, Remove, Update.

API path: `/admin/import`

#### Agent

| Field | Description |
| --- | --- |
| `"capabilities"` | Capabilities of an A2A agent. |
| `"defaultInputModes"` |  |
| `"defaultOutputModes"` |  |
| `"description"` |  |
| `"documentationUrl"` |  |
| `"iconUrl"` |  |
| `"name"` |  |
| `"protocolVersion"` |  |
| `"provider"` | Provider of an A2A agent. |
| `"securityRequirements"` |  |
| `"securitySchemes"` |  |
| `"signatures"` |  |
| `"skills"` |  |
| `"supportedInterfaces"` |  |
| `"version"` |  |

Operations: List.

API path: `/well-known/agent.json`

#### AgentCard

| Field | Description |
| --- | --- |
| `"capabilities"` | Capabilities of an A2A agent. |
| `"defaultInputModes"` |  |
| `"defaultOutputModes"` |  |
| `"description"` |  |
| `"documentationUrl"` |  |
| `"iconUrl"` |  |
| `"name"` |  |
| `"protocolVersion"` |  |
| `"provider"` | Provider of an A2A agent. |
| `"securityRequirements"` |  |
| `"securitySchemes"` |  |
| `"signatures"` |  |
| `"skills"` |  |
| `"supportedInterfaces"` |  |
| `"version"` |  |

Operations: List.

API path: `/well-known/agent-card.json`

#### AiCatalog

| Field | Description |
| --- | --- |
| `"capabilities"` |  |
| `"description"` |  |
| `"displayName"` |  |
| `"identifier"` |  |
| `"representativeQueries"` |  |
| `"tags"` |  |
| `"type"` |  |
| `"updatedAt"` |  |
| `"url"` |  |
| `"version"` |  |

Operations: List.

API path: `/well-known/ard/agents`

#### ArdExplore

| Field | Description |
| --- | --- |
| `"facets"` | Facets keyed by the requested facet field name. |
| `"query"` | ARD search query. |
| `"resultType"` | Requested result type for the ARD POST /explore endpoint. |

Operations: Create.

API path: `/well-known/ard/explore`

#### ArdSearch

| Field | Description |
| --- | --- |
| `"federation"` |  |
| `"pageSize"` |  |
| `"pageToken"` |  |
| `"query"` | ARD search query. |
| `"results"` |  |

Operations: Create.

API path: `/well-known/ard/search`

#### Artifact

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"artifactType"` |  |
| `"artifacts"` | The artifacts returned in the result set. |
| `"count"` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"id"` |  |
| `"labels"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"versions"` |  |

Operations: Create, List, Load, Remove.

API path: `/search/artifacts`

#### ArtifactReference

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"content"` | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `"contentType"` | The content-type, such as `application/json` or `text/xml`. |
| `"encoding"` | Optional encoding for the content property. |
| `"groupId"` |  |
| `"name"` |  |
| `"references"` | Collection of references to other artifacts. |
| `"version"` |  |

Operations: Create, List.

API path: `/content/references`

#### ArtifactRule

| Field | Description |
| --- | --- |
| `"config"` |  |
| `"id"` |  |
| `"ruleType"` |  |

Operations: Create, Remove.

API path: `/groups/{groupId}/artifacts/{artifactId}/rules`

#### ArtifactType

| Field | Description |
| --- | --- |
| `"name"` |  |

Operations: List.

API path: `/admin/config/artifactTypes`

#### Branch

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"branchId"` |  |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"id"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"owner"` |  |
| `"systemDefined"` |  |
| `"versions"` |  |

Operations: Create, Load, Remove, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions`

#### Comment

| Field | Description |
| --- | --- |
| `"commentId"` |  |
| `"createdOn"` |  |
| `"owner"` |  |
| `"value"` |  |

Operations: Create, List.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments`

#### ConfigurationProperty

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"label"` |  |
| `"name"` |  |
| `"type"` |  |
| `"value"` |  |

Operations: List, Load.

API path: `/admin/config/properties`

#### ConsumerVersionHeatmap

| Field | Description |
| --- | --- |
| `"clientId"` |  |
| `"driftAlert"` |  |
| `"versions"` |  |
| `"versionsBehind"` |  |

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
| `"artifactId"` |  |
| `"artifactType"` |  |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"id"` |  |
| `"labels"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"name"` |  |
| `"owner"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute`

#### ContractRule

| Field | Description |
| --- | --- |
| `"artifactId"` | The artifact ID containing the rule. |
| `"globalId"` | The global ID of the version (null for artifact-level rules). |
| `"groupId"` | The group ID of the artifact containing the rule. |
| `"rule"` | A single contract rule definition. |
| `"ruleCategory"` | The rule category (DOMAIN or MIGRATION). |

Operations: List.

API path: `/search/contract/rules`

#### ContractRuleSet

| Field | Description |
| --- | --- |
| `"domainRules"` | Rules for domain validation. |
| `"migrationRules"` | Rules for version migration. |

Operations: List, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset`

#### CreateArtifact

| Field | Description |
| --- | --- |
| `"artifact"` |  |
| `"artifactId"` |  |
| `"artifactType"` |  |
| `"description"` |  |
| `"firstVersion"` |  |
| `"labels"` |  |
| `"name"` |  |
| `"version"` |  |

Operations: Create.

API path: `/groups/{groupId}/artifacts`

#### DeprecationReadiness

| Field | Description |
| --- | --- |
| `"clientId"` |  |
| `"fetchCount"` |  |
| `"lastFetched"` |  |

Operations: List.

API path: `/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness`

#### DownloadRef

| Field | Description |
| --- | --- |
| `"downloadId"` |  |
| `"href"` |  |

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
| `"context"` | The file path or location where the error occurred. |
| `"detail"` | A human-readable description of the error. |
| `"source"` | The source ID (e.g., repository ID) where the error occurred. |

Operations: List.

API path: `/admin/gitops/status`

#### GitOpsValidateTask

| Field | Description |
| --- | --- |
| `"artifactCount"` | Number of artifacts loaded during validation. |
| `"completedAt"` | ISO 8601 timestamp of when the task completed. |
| `"createdAt"` | ISO 8601 timestamp of when the task was created. |
| `"errors"` | Validation errors. |
| `"groupCount"` | Number of groups loaded during validation. |
| `"ref"` | Git ref being validated. |
| `"repoId"` | Repository ID being validated. |
| `"result"` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `"state"` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `"taskId"` | Unique identifier for the validation task. |
| `"type"` | Validation type (`pull` or `push`). |
| `"versionCount"` | Number of artifact versions loaded during validation. |

Operations: Create, List, Load.

API path: `/admin/gitops/validate`

#### GlobalRule

| Field | Description |
| --- | --- |
| `"config"` |  |
| `"id"` |  |
| `"ruleType"` |  |

Operations: Create, List, Remove.

API path: `/admin/rules`

#### Group

| Field | Description |
| --- | --- |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"id"` |  |
| `"labels"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"owner"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/groups`

#### GroupRule

| Field | Description |
| --- | --- |
| `"config"` |  |
| `"id"` |  |
| `"ruleType"` |  |

Operations: Create, Remove.

API path: `/groups/{groupId}/rules`

#### KafkaSql

| Field | Description |
| --- | --- |
| `"snapshotId"` |  |

Operations: Create.

API path: `/admin/snapshots`

#### Metadata

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"artifactType"` |  |
| `"contentId"` |  |
| `"contractMetadata"` | Contract metadata projected from the artifact labels. |
| `"createdOn"` |  |
| `"description"` |  |
| `"globalId"` |  |
| `"groupId"` |  |
| `"labels"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"state"` |  |
| `"version"` | A single version of an artifact. |

Operations: Create, Load, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render`

#### OdcsContractResult

| Field | Description |
| --- | --- |
| `"contractId"` | The contract artifact ID. |
| `"projection"` | Summary of the projection performed when an ODCS contract is applied. |
| `"version"` | The ODCS contract version. |

Operations: Create, Update.

API path: `/groups/{groupId}/contracts`

#### OdcsContractSummary

| Field | Description |
| --- | --- |
| `"contractId"` | The contract artifact ID. |
| `"name"` | The contract display name. |

Operations: List.

API path: `/groups/{groupId}/contracts`

#### ReferenceGraph

| Field | Description |
| --- | --- |
| `"edges"` | All edges (references) in the graph. |
| `"metadata"` | Metadata about the graph structure. |
| `"nodes"` | All nodes in the graph, including the root. |
| `"root"` | The root node of the graph (the artifact for which references were requested). |

Operations: List.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph`

#### RoleMapping

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"principalId"` |  |
| `"principalName"` | A friendly name for the principal. |
| `"role"` |  |

Operations: Create, List, Load.

API path: `/admin/roleMappings`

#### Rule

| Field | Description |
| --- | --- |
| `"config"` |  |
| `"id"` |  |
| `"ruleType"` |  |

Operations: List, Load, Update.

API path: `/groups/{groupId}/artifacts/{artifactId}/rules`

#### SearchedBranch

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"branchId"` |  |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"owner"` |  |
| `"systemDefined"` |  |

Operations: List.

API path: `/groups/{groupId}/artifacts/{artifactId}/branches`

#### SearchedGroup

| Field | Description |
| --- | --- |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"labels"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"owner"` |  |

Operations: List.

API path: `/search/groups`

#### SystemInfo

| Field | Description |
| --- | --- |
| `"builtOn"` |  |
| `"description"` |  |
| `"name"` |  |
| `"version"` |  |

Operations: Load.

API path: `/system/info`

#### UsageSummary

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"dead"` |  |
| `"stale"` |  |

Operations: Load.

API path: `/admin/usage/summary`

#### UserInfo

| Field | Description |
| --- | --- |
| `"admin"` |  |
| `"developer"` |  |
| `"displayName"` |  |
| `"username"` |  |
| `"viewer"` |  |

Operations: Load.

API path: `/users/me`

#### UserInterfaceConfig

| Field | Description |
| --- | --- |
| `"auth"` |  |
| `"features"` |  |
| `"ui"` |  |

Operations: Load.

API path: `/system/uiConfig`

#### Version

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"artifactType"` |  |
| `"branches"` |  |
| `"content"` |  |
| `"contentId"` |  |
| `"count"` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `"createdOn"` |  |
| `"description"` |  |
| `"globalId"` |  |
| `"groupId"` |  |
| `"id"` |  |
| `"isDraft"` |  |
| `"labels"` |  |
| `"modifiedBy"` |  |
| `"modifiedOn"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"state"` |  |
| `"value"` |  |
| `"version"` | A single version of an artifact. |
| `"versions"` | The collection of artifact versions returned in the result set. |

Operations: Create, List, Load, Remove, Update.

API path: `/search/versions`

#### WellKnown

| Field | Description |
| --- | --- |
| `"artifactId"` |  |
| `"capabilities"` | Capabilities of an A2A agent. |
| `"createdOn"` |  |
| `"description"` |  |
| `"groupId"` |  |
| `"id"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"parameters"` |  |
| `"skills"` |  |
| `"supportedInterfaces"` |  |
| `"title"` |  |
| `"version"` |  |

Operations: List, Load.

API path: `/well-known/agents`

#### WrappedVersionState

| Field | Description |
| --- | --- |
| `"state"` | Describes the state of an artifact or artifact version. |

Operations: Load.

API path: `/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state`



## Entities


### Admin

Create an instance: `admin := client.Admin(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `role` | `string` |  |
| `value` | `string` |  |

#### Example: Create

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


### Agent

Create an instance: `agent := client.Agent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `map[string]any` | Capabilities of an A2A agent. |
| `defaultInputModes` | `[]any` |  |
| `defaultOutputModes` | `[]any` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `map[string]any` | Provider of an A2A agent. |
| `securityRequirements` | `[]any` |  |
| `securitySchemes` | `map[string]any` |  |
| `signatures` | `[]any` |  |
| `skills` | `[]any` |  |
| `supportedInterfaces` | `[]any` |  |
| `version` | `string` |  |

#### Example: List

```go
agents, err := client.Agent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agents) // the array of records
```


### AgentCard

Create an instance: `agentCard := client.AgentCard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `map[string]any` | Capabilities of an A2A agent. |
| `defaultInputModes` | `[]any` |  |
| `defaultOutputModes` | `[]any` |  |
| `description` | `string` |  |
| `documentationUrl` | `string` |  |
| `iconUrl` | `string` |  |
| `name` | `string` |  |
| `protocolVersion` | `string` |  |
| `provider` | `map[string]any` | Provider of an A2A agent. |
| `securityRequirements` | `[]any` |  |
| `securitySchemes` | `map[string]any` |  |
| `signatures` | `[]any` |  |
| `skills` | `[]any` |  |
| `supportedInterfaces` | `[]any` |  |
| `version` | `string` |  |

#### Example: List

```go
agentCards, err := client.AgentCard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentCards) // the array of records
```


### AiCatalog

Create an instance: `aiCatalog := client.AiCatalog(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `[]any` |  |
| `description` | `string` |  |
| `displayName` | `string` |  |
| `identifier` | `string` |  |
| `representativeQueries` | `[]any` |  |
| `tags` | `[]any` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |
| `version` | `string` |  |

#### Example: List

```go
aiCatalogs, err := client.AiCatalog(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(aiCatalogs) // the array of records
```


### ArdExplore

Create an instance: `ardExplore := client.ArdExplore(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `facets` | `map[string]any` | Facets keyed by the requested facet field name. |
| `query` | `map[string]any` | ARD search query. |
| `resultType` | `string` | Requested result type for the ARD POST /explore endpoint. |

#### Example: Create

```go
result, err := client.ArdExplore(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### ArdSearch

Create an instance: `ardSearch := client.ArdSearch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `federation` | `string` |  |
| `pageSize` | `int` |  |
| `pageToken` | `string` |  |
| `query` | `map[string]any` | ARD search query. |
| `results` | `[]any` |  |

#### Example: Create

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


### Artifact

Create an instance: `artifact := client.Artifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `artifacts` | `[]any` | The artifacts returned in the result set. |
| `count` | `int` | The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `map[string]any` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `versions` | `[]any` |  |

#### Example: Load

```go
artifact, err := client.Artifact(nil).Load(map[string]any{"global_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifact) // the loaded record
```

#### Example: List

```go
artifacts, err := client.Artifact(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifacts) // the array of records
```

#### Example: Create

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


### ArtifactReference

Create an instance: `artifactReference := client.ArtifactReference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `content` | `string` | Raw content of the artifact version or a valid (and accessible) URL where the content can be found. |
| `contentType` | `string` | The content-type, such as `application/json` or `text/xml`. |
| `encoding` | `string` | Optional encoding for the content property. |
| `groupId` | `string` |  |
| `name` | `string` |  |
| `references` | `[]any` | Collection of references to other artifacts. |
| `version` | `string` |  |

#### Example: List

```go
artifactReferences, err := client.ArtifactReference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifactReferences) // the array of records
```

#### Example: Create

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


### ArtifactRule

Create an instance: `artifactRule := client.ArtifactRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: Create

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


### ArtifactType

Create an instance: `artifactType := client.ArtifactType(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |

#### Example: List

```go
artifactTypes, err := client.ArtifactType(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(artifactTypes) // the array of records
```


### Branch

Create an instance: `branch := client.Branch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `versions` | `[]any` |  |

#### Example: Load

```go
branch, err := client.Branch(nil).Load(map[string]any{"id": "branch_id", "artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(branch) // the loaded record
```

#### Example: Create

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


### Comment

Create an instance: `comment := client.Comment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `commentId` | `string` |  |
| `createdOn` | `string` |  |
| `owner` | `string` |  |
| `value` | `string` |  |

#### Example: List

```go
comments, err := client.Comment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(comments) // the array of records
```

#### Example: Create

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


### ConfigurationProperty

Create an instance: `configurationProperty := client.ConfigurationProperty(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
configurationProperty, err := client.ConfigurationProperty(nil).Load(map[string]any{"id": "configuration_property_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(configurationProperty) // the loaded record
```

#### Example: List

```go
configurationPropertys, err := client.ConfigurationProperty(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(configurationPropertys) // the array of records
```


### ConsumerVersionHeatmap

Create an instance: `consumerVersionHeatmap := client.ConsumerVersionHeatmap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `driftAlert` | `bool` |  |
| `versions` | `map[string]any` |  |
| `versionsBehind` | `int` |  |

#### Example: List

```go
consumerVersionHeatmaps, err := client.ConsumerVersionHeatmap(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(consumerVersionHeatmaps) // the array of records
```


### Content

Create an instance: `content := client.Content(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Content(nil).Create(map[string]any{
    "artifact_type": "example_artifact_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Contract

Create an instance: `contract := client.Contract(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `map[string]any` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```go
contract, err := client.Contract(nil).Load(map[string]any{"id": "contract_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(contract) // the loaded record
```

#### Example: List

```go
contracts, err := client.Contract(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(contracts) // the array of records
```

#### Example: Create

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


### ContractRule

Create an instance: `contractRule := client.ContractRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` | The artifact ID containing the rule. |
| `globalId` | `int` | The global ID of the version (null for artifact-level rules). |
| `groupId` | `string` | The group ID of the artifact containing the rule. |
| `rule` | `map[string]any` | A single contract rule definition. |
| `ruleCategory` | `string` | The rule category (DOMAIN or MIGRATION). |

#### Example: List

```go
contractRules, err := client.ContractRule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(contractRules) // the array of records
```


### ContractRuleSet

Create an instance: `contractRuleSet := client.ContractRuleSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domainRules` | `[]any` | Rules for domain validation. |
| `migrationRules` | `[]any` | Rules for version migration. |

#### Example: List

```go
contractRuleSets, err := client.ContractRuleSet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(contractRuleSets) // the array of records
```


### CreateArtifact

Create an instance: `createArtifact := client.CreateArtifact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifact` | `map[string]any` |  |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `description` | `string` |  |
| `firstVersion` | `map[string]any` |  |
| `labels` | `map[string]any` |  |
| `name` | `string` |  |
| `version` | `map[string]any` |  |

#### Example: Create

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


### DeprecationReadiness

Create an instance: `deprecationReadiness := client.DeprecationReadiness(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `fetchCount` | `int` |  |
| `lastFetched` | `int` |  |

#### Example: List

```go
deprecationReadinesss, err := client.DeprecationReadiness(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(deprecationReadinesss) // the array of records
```


### DownloadRef

Create an instance: `downloadRef := client.DownloadRef(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadId` | `string` |  |
| `href` | `string` |  |

#### Example: Load

```go
downloadRef, err := client.DownloadRef(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(downloadRef) // the loaded record
```


### GitOp

Create an instance: `gitOp := client.GitOp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Example: Create

```go
result, err := client.GitOp(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GitOpsStatus

Create an instance: `gitOpsStatus := client.GitOpsStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `context` | `string` | The file path or location where the error occurred. |
| `detail` | `string` | A human-readable description of the error. |
| `source` | `string` | The source ID (e.g., repository ID) where the error occurred. |

#### Example: List

```go
gitOpsStatuss, err := client.GitOpsStatus(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gitOpsStatuss) // the array of records
```


### GitOpsValidateTask

Create an instance: `gitOpsValidateTask := client.GitOpsValidateTask(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactCount` | `int` | Number of artifacts loaded during validation. |
| `completedAt` | `string` | ISO 8601 timestamp of when the task completed. |
| `createdAt` | `string` | ISO 8601 timestamp of when the task was created. |
| `errors` | `[]any` | Validation errors. |
| `groupCount` | `int` | Number of groups loaded during validation. |
| `ref` | `string` | Git ref being validated. |
| `repoId` | `string` | Repository ID being validated. |
| `result` | `string` | Validation result: `success` (all checks passed) or `failure` (validation errors found). |
| `state` | `string` | Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro… |
| `taskId` | `string` | Unique identifier for the validation task. |
| `type` | `string` | Validation type (`pull` or `push`). |
| `versionCount` | `int` | Number of artifact versions loaded during validation. |

#### Example: Load

```go
gitOpsValidateTask, err := client.GitOpsValidateTask(nil).Load(map[string]any{"task_id": "task_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(gitOpsValidateTask) // the loaded record
```

#### Example: List

```go
gitOpsValidateTasks, err := client.GitOpsValidateTask(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gitOpsValidateTasks) // the array of records
```

#### Example: Create

```go
result, err := client.GitOpsValidateTask(nil).Create(map[string]any{
    "state": "example_state",
    "taskId": "example_taskId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GlobalRule

Create an instance: `globalRule := client.GlobalRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: List

```go
globalRules, err := client.GlobalRule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(globalRules) // the array of records
```

#### Example: Create

```go
result, err := client.GlobalRule(nil).Create(map[string]any{
    "config": "example_config",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Group

Create an instance: `group := client.Group(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `labels` | `map[string]any` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```go
group, err := client.Group(nil).Load(map[string]any{"id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(group) // the loaded record
```

#### Example: List

```go
groups, err := client.Group(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(groups) // the array of records
```

#### Example: Create

```go
result, err := client.Group(nil).Create(map[string]any{
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


### GroupRule

Create an instance: `groupRule := client.GroupRule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: Create

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


### KafkaSql

Create an instance: `kafkaSql := client.KafkaSql(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `snapshotId` | `string` |  |

#### Example: Create

```go
result, err := client.KafkaSql(nil).Create(map[string]any{
    "snapshotId": "example_snapshotId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Metadata

Create an instance: `metadata := client.Metadata(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `contentId` | `int` |  |
| `contractMetadata` | `map[string]any` | Contract metadata projected from the artifact labels. |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `int` |  |
| `groupId` | `string` |  |
| `labels` | `map[string]any` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `version` | `string` | A single version of an artifact. |

#### Example: Load

```go
metadata, err := client.Metadata(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(metadata) // the loaded record
```

#### Example: Create

```go
result, err := client.Metadata(nil).Create(map[string]any{
    "artifact_id": "example_artifact_id",
    "group_id": "example_group_id",
    "version_expression": "example_version_expression",
    "artifactId": "example_artifactId",
    "artifactType": "example_artifactType",
    "contentId": 1,
    "createdOn": "example_createdOn",
    "globalId": 1,
    "owner": "example_owner",
    "version": "example_version",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### OdcsContractResult

Create an instance: `odcsContractResult := client.OdcsContractResult(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `string` | The contract artifact ID. |
| `projection` | `map[string]any` | Summary of the projection performed when an ODCS contract is applied. |
| `version` | `string` | The ODCS contract version. |

#### Example: Create

```go
result, err := client.OdcsContractResult(nil).Create(map[string]any{
    "group_id": "example_group_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### OdcsContractSummary

Create an instance: `odcsContractSummary := client.OdcsContractSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contractId` | `string` | The contract artifact ID. |
| `name` | `string` | The contract display name. |

#### Example: List

```go
odcsContractSummarys, err := client.OdcsContractSummary(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(odcsContractSummarys) // the array of records
```


### ReferenceGraph

Create an instance: `referenceGraph := client.ReferenceGraph(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `edges` | `[]any` | All edges (references) in the graph. |
| `metadata` | `map[string]any` | Metadata about the graph structure. |
| `nodes` | `[]any` | All nodes in the graph, including the root. |
| `root` | `map[string]any` | The root node of the graph (the artifact for which references were requested). |

#### Example: List

```go
referenceGraphs, err := client.ReferenceGraph(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(referenceGraphs) // the array of records
```


### RoleMapping

Create an instance: `roleMapping := client.RoleMapping(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `principalId` | `string` |  |
| `principalName` | `string` | A friendly name for the principal. |
| `role` | `string` |  |

#### Example: Load

```go
roleMapping, err := client.RoleMapping(nil).Load(map[string]any{"id": "role_mapping_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(roleMapping) // the loaded record
```

#### Example: List

```go
roleMappings, err := client.RoleMapping(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(roleMappings) // the array of records
```

#### Example: Create

```go
result, err := client.RoleMapping(nil).Create(map[string]any{
    "principalId": "example_principalId",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Rule

Create an instance: `rule := client.Rule(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `string` |  |
| `id` | `string` |  |
| `ruleType` | `string` |  |

#### Example: Load

```go
rule, err := client.Rule(nil).Load(map[string]any{"id": "rule_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(rule) // the loaded record
```

#### Example: List

```go
rules, err := client.Rule(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rules) // the array of records
```


### SearchedBranch

Create an instance: `searchedBranch := client.SearchedBranch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
searchedBranchs, err := client.SearchedBranch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(searchedBranchs) // the array of records
```


### SearchedGroup

Create an instance: `searchedGroup := client.SearchedGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `labels` | `map[string]any` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `owner` | `string` |  |

#### Example: List

```go
searchedGroups, err := client.SearchedGroup(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(searchedGroups) // the array of records
```


### SystemInfo

Create an instance: `systemInfo := client.SystemInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `builtOn` | `string` |  |
| `description` | `string` |  |
| `name` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
systemInfo, err := client.SystemInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(systemInfo) // the loaded record
```


### UsageSummary

Create an instance: `usageSummary := client.UsageSummary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `int` |  |
| `dead` | `int` |  |
| `stale` | `int` |  |

#### Example: Load

```go
usageSummary, err := client.UsageSummary(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(usageSummary) // the loaded record
```


### UserInfo

Create an instance: `userInfo := client.UserInfo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `bool` |  |
| `developer` | `bool` |  |
| `displayName` | `string` |  |
| `username` | `string` |  |
| `viewer` | `bool` |  |

#### Example: Load

```go
userInfo, err := client.UserInfo(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(userInfo) // the loaded record
```


### UserInterfaceConfig

Create an instance: `userInterfaceConfig := client.UserInterfaceConfig(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth` | `map[string]any` |  |
| `features` | `map[string]any` |  |
| `ui` | `map[string]any` |  |

#### Example: Load

```go
userInterfaceConfig, err := client.UserInterfaceConfig(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(userInterfaceConfig) // the loaded record
```


### Version

Create an instance: `version := client.Version(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `artifactType` | `string` |  |
| `branches` | `[]any` |  |
| `content` | `map[string]any` |  |
| `contentId` | `int` |  |
| `count` | `int` | The total number of versions that matched the query (may be more than the number of versions returned in the result set). |
| `createdOn` | `string` |  |
| `description` | `string` |  |
| `globalId` | `int` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `isDraft` | `bool` |  |
| `labels` | `map[string]any` |  |
| `modifiedBy` | `string` |  |
| `modifiedOn` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `state` | `string` |  |
| `value` | `string` |  |
| `version` | `string` | A single version of an artifact. |
| `versions` | `[]any` | The collection of artifact versions returned in the result set. |

#### Example: Load

```go
version, err := client.Version(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(version) // the loaded record
```

#### Example: List

```go
versions, err := client.Version(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(versions) // the array of records
```

#### Example: Create

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
    "version": "example_version",
    "versions": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### WellKnown

Create an instance: `wellKnown := client.WellKnown(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `artifactId` | `string` |  |
| `capabilities` | `map[string]any` | Capabilities of an A2A agent. |
| `createdOn` | `int` |  |
| `description` | `string` |  |
| `groupId` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `parameters` | `[]any` |  |
| `skills` | `[]any` |  |
| `supportedInterfaces` | `[]any` |  |
| `title` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
wellKnown, err := client.WellKnown(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(wellKnown) // the loaded record
```

#### Example: List

```go
wellKnowns, err := client.WellKnown(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(wellKnowns) // the array of records
```


### WrappedVersionState

Create an instance: `wrappedVersionState := client.WrappedVersionState(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `state` | `string` | Describes the state of an artifact or artifact version. |

#### Example: Load

```go
wrappedVersionState, err := client.WrappedVersionState(nil).Load(map[string]any{"artifact_id": "artifact_id", "group_id": "group_id", "version_expression": "version_expression"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(wrappedVersionState) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/apicurio-registry-sdk/go/
├── apicurio-registry.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/apicurio-registry-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
contractrule := client.ContractRule(nil)
contractrule.List(nil, nil)

// contractrule.Data() now returns the contractrule data from the last list
// contractrule.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
