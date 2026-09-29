"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "admin",
        "accessor": "Admin",
        "op": "create",
        "method": "POST",
        "path": "/admin/import",
        "action": "import",
        "args": [],
        "select": {
            "require_empty_registry": "v1"
        },
        "headers": [
            {
                "name": "x_registry_preserve_content_id",
                "wire": "X-Registry-Preserve-ContentId",
                "value": "h1"
            },
            {
                "name": "x_registry_preserve_global_id",
                "wire": "X-Registry-Preserve-GlobalId",
                "value": "h2"
            }
        ],
        "query": [
            "requireEmptyRegistry"
        ],
        "auth": null,
        "status": 201,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "admin",
        "accessor": "Admin",
        "op": "remove",
        "method": "DELETE",
        "path": "/admin/roleMappings/{principalId}",
        "args": [
            {
                "name": "principal_id",
                "wire": "principalId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "admin",
        "accessor": "Admin",
        "op": "remove",
        "method": "DELETE",
        "path": "/admin/config/properties/{propertyName}",
        "args": [
            {
                "name": "property_name",
                "wire": "propertyName",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "admin",
        "accessor": "Admin",
        "op": "remove",
        "method": "DELETE",
        "path": "/admin/contracts/ruleset",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "admin",
        "accessor": "Admin",
        "op": "update",
        "method": "PUT",
        "path": "/admin/roleMappings/{principalId}",
        "args": [
            {
                "name": "principal_id",
                "wire": "principalId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "admin",
        "accessor": "Admin",
        "op": "update",
        "method": "PUT",
        "path": "/admin/config/properties/{propertyName}",
        "args": [
            {
                "name": "property_name",
                "wire": "propertyName",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "agent",
        "accessor": "Agent",
        "op": "list",
        "method": "GET",
        "path": "/well-known/agent.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "description": "x",
            "version": "x",
            "protocolVersion": "x",
            "provider": {
                "organization": "x",
                "url": "x"
            },
            "capabilities": {
                "extendedAgentCard": true,
                "extensions": [
                    {
                        "description": "x",
                        "params": {},
                        "required": true,
                        "uri": "x"
                    }
                ],
                "pushNotifications": true,
                "streaming": true
            },
            "skills": [
                {
                    "description": "x",
                    "examples": [
                        "x"
                    ],
                    "id": "x",
                    "inputModes": [
                        "x"
                    ],
                    "name": "x",
                    "outputModes": [
                        "x"
                    ],
                    "securityRequirements": [
                        {
                            "schemes": {}
                        }
                    ],
                    "tags": [
                        "x"
                    ]
                }
            ],
            "defaultInputModes": [
                "x"
            ],
            "defaultOutputModes": [
                "x"
            ],
            "supportedInterfaces": [
                {
                    "protocolBinding": "x",
                    "protocolVersion": "x",
                    "tenant": "x",
                    "url": "x"
                }
            ],
            "securitySchemes": {},
            "securityRequirements": [
                {
                    "schemes": {}
                }
            ],
            "iconUrl": "x",
            "documentationUrl": "x",
            "signatures": [
                {
                    "header": {},
                    "protected": "x",
                    "signature": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "agent_card",
        "accessor": "AgentCard",
        "op": "list",
        "method": "GET",
        "path": "/well-known/agent-card.json",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "x",
            "description": "x",
            "version": "x",
            "protocolVersion": "x",
            "provider": {
                "organization": "x",
                "url": "x"
            },
            "capabilities": {
                "extendedAgentCard": true,
                "extensions": [
                    {
                        "description": "x",
                        "params": {},
                        "required": true,
                        "uri": "x"
                    }
                ],
                "pushNotifications": true,
                "streaming": true
            },
            "skills": [
                {
                    "description": "x",
                    "examples": [
                        "x"
                    ],
                    "id": "x",
                    "inputModes": [
                        "x"
                    ],
                    "name": "x",
                    "outputModes": [
                        "x"
                    ],
                    "securityRequirements": [
                        {
                            "schemes": {}
                        }
                    ],
                    "tags": [
                        "x"
                    ]
                }
            ],
            "defaultInputModes": [
                "x"
            ],
            "defaultOutputModes": [
                "x"
            ],
            "supportedInterfaces": [
                {
                    "protocolBinding": "x",
                    "protocolVersion": "x",
                    "tenant": "x",
                    "url": "x"
                }
            ],
            "securitySchemes": {},
            "securityRequirements": [
                {
                    "schemes": {}
                }
            ],
            "iconUrl": "x",
            "documentationUrl": "x",
            "signatures": [
                {
                    "header": {},
                    "protected": "x",
                    "signature": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "ai_catalog",
        "accessor": "AiCatalog",
        "op": "list",
        "method": "GET",
        "path": "/well-known/ard/agents",
        "args": [],
        "select": {
            "filter": "v1",
            "order_by": "v1",
            "page_size": "v1",
            "page_token": "v1"
        },
        "headers": [],
        "query": [
            "filter",
            "orderBy",
            "pageSize",
            "pageToken"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "specVersion": "x",
            "host": {
                "displayName": "x",
                "documentationUrl": "x",
                "identifier": "x",
                "logoUrl": "x"
            },
            "entries": [
                {
                    "capabilities": [
                        "x"
                    ],
                    "description": "x",
                    "displayName": "x",
                    "identifier": "x",
                    "representativeQueries": [
                        "x"
                    ],
                    "tags": [
                        "x"
                    ],
                    "type": "x",
                    "updatedAt": "x",
                    "url": "x",
                    "version": "x"
                }
            ],
            "nextPageToken": "x"
        },
        "idField": "id"
    },
    {
        "entity": "ard_explore",
        "accessor": "ArdExplore",
        "op": "create",
        "method": "POST",
        "path": "/well-known/ard/explore",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "resultType": "x",
            "facets": {}
        },
        "idField": "id"
    },
    {
        "entity": "ard_search",
        "accessor": "ArdSearch",
        "op": "create",
        "method": "POST",
        "path": "/well-known/ard/search",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "results": [
                {
                    "identifier": "x",
                    "displayName": "x",
                    "type": "x",
                    "url": "x",
                    "description": "x",
                    "tags": [
                        "x"
                    ],
                    "capabilities": [
                        "x"
                    ],
                    "version": "x",
                    "updatedAt": "x",
                    "score": 1,
                    "source": "x"
                }
            ],
            "pageToken": "x"
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "create",
        "method": "POST",
        "path": "/search/artifacts",
        "args": [],
        "select": {
            "artifact_type": "v1",
            "canonical": "v1",
            "group_id": "v1",
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "skip_count": "v1"
        },
        "headers": [],
        "query": [
            "canonical",
            "artifactType",
            "groupId",
            "offset",
            "limit",
            "order",
            "orderby",
            "skipCount"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "artifacts": [
                {
                    "artifactId": "Procurement-Invoice",
                    "artifactType": "AVRO",
                    "createdOn": "2019-03-22T12:51:19Z",
                    "description": "Description of the artifact",
                    "groupId": "My-Group",
                    "modifiedBy": "user2",
                    "modifiedOn": "2019-04-01T12:51:19Z",
                    "name": "Artifact Name",
                    "owner": "user1"
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "list",
        "method": "GET",
        "path": "/search/artifacts",
        "args": [],
        "select": {
            "artifact_id": "v1",
            "artifact_type": "v1",
            "content_id": "v1",
            "description": "v1",
            "global_id": "v1",
            "group_id": "v1",
            "label": "v1",
            "limit": "v1",
            "name": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "skip_count": "v1"
        },
        "headers": [],
        "query": [
            "name",
            "offset",
            "limit",
            "order",
            "orderby",
            "labels",
            "description",
            "groupId",
            "globalId",
            "contentId",
            "artifactId",
            "artifactType",
            "skipCount"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "artifacts": [
                {
                    "artifactId": "Procurement-Invoice",
                    "artifactType": "AVRO",
                    "createdOn": "2019-03-22T12:51:19Z",
                    "description": "Description of the artifact",
                    "groupId": "My-Group",
                    "modifiedBy": "user2",
                    "modifiedOn": "2019-04-01T12:51:19Z",
                    "name": "Artifact Name",
                    "owner": "user1"
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "skip_count": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset",
            "order",
            "orderby",
            "skipCount"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "artifacts": [
                {
                    "artifactId": "Procurement-Invoice",
                    "artifactType": "AVRO",
                    "createdOn": "2019-03-22T12:51:19Z",
                    "description": "Description of the artifact",
                    "groupId": "My-Group",
                    "modifiedBy": "user2",
                    "modifiedOn": "2019-04-01T12:51:19Z",
                    "name": "Artifact Name",
                    "owner": "user1"
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "load",
        "method": "GET",
        "path": "/ids/globalIds/{globalId}",
        "args": [
            {
                "name": "global_id",
                "wire": "globalId",
                "value": "p1"
            }
        ],
        "select": {
            "reference": "v1",
            "return_artifact_type": "v1"
        },
        "headers": [],
        "query": [
            "references",
            "returnArtifactType"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "openapi": "3.0.2",
            "info": {
                "title": "Empty API",
                "version": "1.0.0",
                "description": "An example API design using OpenAPI."
            }
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "load",
        "method": "GET",
        "path": "/admin/usage/artifacts/{groupId}/{artifactId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "x",
            "artifactId": "x",
            "versions": [
                {
                    "version": "x",
                    "globalId": 1,
                    "totalFetches": 1,
                    "uniqueClients": 1,
                    "firstFetchedOn": 1,
                    "lastFetchedOn": 1,
                    "clients": [
                        "x"
                    ],
                    "classification": "ACTIVE"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "load",
        "method": "GET",
        "path": "/ids/contentHashes/{contentHash}",
        "args": [
            {
                "name": "content_hash",
                "wire": "contentHash",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "openapi": "3.0.2",
            "info": {
                "title": "Empty API",
                "version": "1.0.0",
                "description": "An example API design using OpenAPI."
            }
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "load",
        "method": "GET",
        "path": "/ids/contentIds/{contentId}",
        "args": [
            {
                "name": "content_id",
                "wire": "contentId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "openapi": "3.0.2",
            "info": {
                "title": "Empty API",
                "version": "1.0.0",
                "description": "An example API design using OpenAPI."
            }
        },
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "artifact",
        "accessor": "Artifact",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "artifact_reference",
        "accessor": "ArtifactReference",
        "op": "create",
        "method": "POST",
        "path": "/content/references",
        "args": [],
        "select": {
            "artifact_type": "v1"
        },
        "headers": [],
        "query": [
            "artifactType"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "groupId": "mygroup",
                "artifactId": "13842090-2ce3-11ec-8d3d-0242ac130003",
                "version": "2",
                "name": "foo.bar.Open"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "artifact_reference",
        "accessor": "ArtifactReference",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {
            "ref_type": "v1"
        },
        "headers": [],
        "query": [
            "refType"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "groupId": "mygroup",
                "artifactId": "13842090-2ce3-11ec-8d3d-0242ac130003",
                "version": "2",
                "name": "foo.bar.Open"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "artifact_reference",
        "accessor": "ArtifactReference",
        "op": "list",
        "method": "GET",
        "path": "/ids/globalIds/{globalId}/references",
        "args": [
            {
                "name": "global_id_id",
                "wire": "globalId",
                "value": "p1"
            }
        ],
        "select": {
            "ref_type": "v1"
        },
        "headers": [],
        "query": [
            "refType"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "groupId": "mygroup",
                "artifactId": "13842090-2ce3-11ec-8d3d-0242ac130003",
                "version": "2",
                "name": "foo.bar.Open"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "artifact_reference",
        "accessor": "ArtifactReference",
        "op": "list",
        "method": "GET",
        "path": "/ids/contentHashes/{contentHash}/references",
        "args": [
            {
                "name": "content_hash_id",
                "wire": "contentHash",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "groupId": "mygroup",
                "artifactId": "13842090-2ce3-11ec-8d3d-0242ac130003",
                "version": "2",
                "name": "foo.bar.Open"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "artifact_reference",
        "accessor": "ArtifactReference",
        "op": "list",
        "method": "GET",
        "path": "/ids/contentIds/{contentId}/references",
        "args": [
            {
                "name": "content_id_id",
                "wire": "contentId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "groupId": "mygroup",
                "artifactId": "13842090-2ce3-11ec-8d3d-0242ac130003",
                "version": "2",
                "name": "foo.bar.Open"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "artifact_rule",
        "accessor": "ArtifactRule",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/rules",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "artifact_rule",
        "accessor": "ArtifactRule",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "ruleType",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "artifact_rule",
        "accessor": "ArtifactRule",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/rules",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "artifact_type",
        "accessor": "ArtifactType",
        "op": "list",
        "method": "GET",
        "path": "/admin/config/artifactTypes",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "name": "AVRO"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "branch",
        "accessor": "Branch",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
        "action": "version",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "branchId",
                "value": "\"latest\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "branch",
        "accessor": "Branch",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "ExampleGroup",
            "artifactId": "ExampleArtifact",
            "branchId": "1.0.x",
            "description": "Just an example branch.",
            "systemDefined": false,
            "createdOn": "2018-02-10T09:30Z",
            "modifiedBy": "user1",
            "modifiedOn": "2020-02-10T09:30Z",
            "owner": "user2"
        },
        "idField": "id"
    },
    {
        "entity": "branch",
        "accessor": "Branch",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "branchId",
                "value": "\"latest\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "ExampleGroup",
            "artifactId": "ExampleArtifact",
            "branchId": "1.0.x",
            "description": "Just an example branch.",
            "systemDefined": false,
            "createdOn": "2018-02-10T09:30Z",
            "modifiedBy": "user1",
            "modifiedOn": "2020-02-10T09:30Z",
            "owner": "user2"
        },
        "idField": "id"
    },
    {
        "entity": "branch",
        "accessor": "Branch",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "branchId",
                "value": "\"latest\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "branch",
        "accessor": "Branch",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "branchId",
                "value": "\"latest\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "branch",
        "accessor": "Branch",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
        "action": "version",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "branchId",
                "value": "\"latest\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "comment",
        "accessor": "Comment",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "commentId": "12345",
            "value": "This is a comment on an artifact version.",
            "owner": "bwayne",
            "createdOn": "2023-07-01T15:22:01Z"
        },
        "idField": "id"
    },
    {
        "entity": "comment",
        "accessor": "Comment",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "commentId": "12345",
                "value": "This is a comment on an artifact version.",
                "owner": "bwayne",
                "createdOn": "2023-07-01T15:22:01Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "configuration_property",
        "accessor": "ConfigurationProperty",
        "op": "list",
        "method": "GET",
        "path": "/admin/config/properties",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "name": "registry.auth.owner-only-authorization",
                "value": "true",
                "type": "boolean",
                "label": "Owner Only Authorization",
                "description": "When enabled, the registry will allow only the artifact owner (creator) to modify an artifact."
            }
        ],
        "idField": "id"
    },
    {
        "entity": "configuration_property",
        "accessor": "ConfigurationProperty",
        "op": "load",
        "method": "GET",
        "path": "/admin/config/properties/{propertyName}",
        "args": [
            {
                "name": "id",
                "wire": "propertyName",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "registry.auth.owner-only-authorization",
            "value": "true",
            "type": "boolean",
            "label": "Owner Only Authorization",
            "description": "When enabled, the registry will allow only the artifact owner (creator) to modify an artifact."
        },
        "idField": "id"
    },
    {
        "entity": "consumer_version_heatmap",
        "accessor": "ConsumerVersionHeatmap",
        "op": "list",
        "method": "GET",
        "path": "/admin/usage/artifacts/{groupId}/{artifactId}/heatmap",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "x",
            "artifactId": "x",
            "versions": [
                "x"
            ],
            "consumers": [
                {
                    "clientId": "x",
                    "driftAlert": true,
                    "versions": {},
                    "versionsBehind": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "content",
        "accessor": "Content",
        "op": "create",
        "method": "POST",
        "path": "/content/canonicalize",
        "action": "canonicalize",
        "args": [],
        "select": {
            "artifact_type": "v1"
        },
        "headers": [],
        "query": [
            "artifactType"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "openapi": "3.0.2",
            "info": {
                "title": "Empty API",
                "version": "1.0.0",
                "description": "An example API design using OpenAPI."
            }
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute",
        "action": "execute",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "passed": true,
            "transformedRecord": {},
            "violations": [
                {
                    "ruleName": "x",
                    "message": "x",
                    "action": "x"
                }
            ],
            "executedRules": 1,
            "failedRules": 1
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/migrate",
        "action": "migrate",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "passed": true,
            "transformedRecord": {},
            "violations": [
                {
                    "ruleName": "x",
                    "message": "x",
                    "action": "x"
                }
            ],
            "executedRules": 1,
            "failedRules": 1
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/promote",
        "action": "promote",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "stage": "x"
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/status",
        "action": "status",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "status": "DRAFT",
            "ownerTeam": "x",
            "ownerDomain": "x",
            "supportContact": "x",
            "classification": "PUBLIC",
            "stage": "DEV",
            "stableDate": "x",
            "deprecatedDate": "x",
            "deprecationReason": "x",
            "compatibilityGroup": "x"
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "list",
        "method": "GET",
        "path": "/search/contracts",
        "args": [],
        "select": {
            "compatibility_group": "v1",
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "owner_team": "v1",
            "status": "v1"
        },
        "headers": [],
        "query": [
            "status",
            "ownerTeam",
            "compatibilityGroup",
            "offset",
            "limit",
            "order",
            "orderby"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "artifacts": [
                {
                    "artifactId": "Procurement-Invoice",
                    "artifactType": "AVRO",
                    "createdOn": "2019-03-22T12:51:19Z",
                    "description": "Description of the artifact",
                    "groupId": "My-Group",
                    "modifiedBy": "user2",
                    "modifiedOn": "2019-04-01T12:51:19Z",
                    "name": "Artifact Name",
                    "owner": "user1"
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/audit",
        "action": "audit",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "auditId": 1,
                "groupId": "x",
                "artifactId": "x",
                "version": "x",
                "action": "x",
                "principal": "x",
                "details": "x",
                "createdOn": "2026-01-01T00:00:00Z"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group",
        "action": "compatibility_group",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {
            "contract_id": "v1"
        },
        "headers": [],
        "query": [
            "contractId"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "compatibilityGroup": "x"
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/quality",
        "action": "quality",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {
            "contract_id": "v1"
        },
        "headers": [],
        "query": [
            "contractId"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "overall": 1,
            "completeness": 1,
            "compliance": 1,
            "stability": 1
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/export",
        "action": "export",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/metadata",
        "action": "metadata",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "status": "DRAFT",
            "ownerTeam": "x",
            "ownerDomain": "x",
            "supportContact": "x",
            "classification": "PUBLIC",
            "stage": "DEV",
            "stableDate": "x",
            "deprecatedDate": "x",
            "deprecationReason": "x",
            "compatibilityGroup": "x"
        },
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/contracts/{contractId}",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "contractId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
        "action": "ruleset",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
        "action": "ruleset",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/contracts/{contractId}",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "contractId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group",
        "action": "compatibility_group",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "contract",
        "accessor": "Contract",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/metadata",
        "action": "metadata",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "status": "DRAFT",
            "ownerTeam": "x",
            "ownerDomain": "x",
            "supportContact": "x",
            "classification": "PUBLIC",
            "stage": "DEV",
            "stableDate": "x",
            "deprecatedDate": "x",
            "deprecationReason": "x",
            "compatibilityGroup": "x"
        },
        "idField": "id"
    },
    {
        "entity": "contract_rule",
        "accessor": "ContractRule",
        "op": "list",
        "method": "GET",
        "path": "/search/contract/rules",
        "args": [],
        "select": {
            "tag": "v1"
        },
        "headers": [],
        "query": [
            "tag"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "groupId": "x",
                "artifactId": "x",
                "globalId": 1,
                "ruleCategory": "DOMAIN",
                "rule": {
                    "name": "x",
                    "kind": "CONDITION",
                    "type": "x",
                    "mode": "WRITE",
                    "expr": "x",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "onSuccess": "NONE",
                    "onFailure": "NONE",
                    "disabled": true
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "contract_rule_set",
        "accessor": "ContractRuleSet",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "domainRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ],
            "migrationRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "contract_rule_set",
        "accessor": "ContractRuleSet",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "domainRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ],
            "migrationRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "contract_rule_set",
        "accessor": "ContractRuleSet",
        "op": "list",
        "method": "GET",
        "path": "/admin/contracts/ruleset",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "domainRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ],
            "migrationRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "contract_rule_set",
        "accessor": "ContractRuleSet",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "domainRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ],
            "migrationRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "contract_rule_set",
        "accessor": "ContractRuleSet",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "domainRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ],
            "migrationRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "contract_rule_set",
        "accessor": "ContractRuleSet",
        "op": "update",
        "method": "PUT",
        "path": "/admin/contracts/ruleset",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "domainRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ],
            "migrationRules": [
                {
                    "disabled": true,
                    "expr": "x",
                    "kind": "CONDITION",
                    "mode": "WRITE",
                    "name": "x",
                    "onFailure": "NONE",
                    "onSuccess": "NONE",
                    "params": {},
                    "tags": [
                        "x"
                    ],
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "create_artifact",
        "accessor": "CreateArtifact",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {
            "canonical": "v1",
            "dry_run": "v1",
            "if_exist": "v1"
        },
        "headers": [],
        "query": [
            "ifExists",
            "canonical",
            "dryRun"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "artifact": {
                "groupId": "My-Group",
                "artifactId": "Procurement-Invoice",
                "name": "Artifact Name",
                "description": "Description of the artifact",
                "artifactType": "AVRO",
                "owner": "user1",
                "createdOn": "2019-03-22T12:51:19Z",
                "modifiedBy": "user2",
                "modifiedOn": "2019-07-19T15:09:00Z",
                "labels": {
                    "custom-1": "foo",
                    "custom-2": "bar"
                }
            },
            "version": {
                "groupId": "My-Group",
                "artifactId": "my-artifact-id",
                "version": 1221432,
                "artifactType": "PROTOBUF",
                "name": "Artifact Name",
                "description": "The description of the artifact",
                "owner": "user1",
                "createdOn": "2019-05-17T12:00:00Z",
                "globalId": 183282932983,
                "contentId": 12347,
                "labels": {
                    "custom-1": "foo",
                    "custom-2": "bar"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "deprecation_readiness",
        "accessor": "DeprecationReadiness",
        "op": "list",
        "method": "GET",
        "path": "/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            },
            {
                "name": "version_id",
                "wire": "version",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "x",
            "artifactId": "x",
            "version": "x",
            "globalId": 1,
            "activeConsumers": [
                {
                    "clientId": "x",
                    "fetchCount": 1,
                    "lastFetched": 1
                }
            ],
            "safeToDeprecate": true
        },
        "idField": "id"
    },
    {
        "entity": "download_ref",
        "accessor": "DownloadRef",
        "op": "load",
        "method": "GET",
        "path": "/admin/export",
        "args": [],
        "select": {
            "for_browser": "v1",
            "group_id": "v1"
        },
        "headers": [],
        "query": [
            "forBrowser",
            "groupId"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "downloadId": "247-4987490-297845",
            "href": "https://54321.registry.examples.org/apis/registry/v3/downloads/247-4987490-297845"
        },
        "idField": "id"
    },
    {
        "entity": "git_op",
        "accessor": "GitOp",
        "op": "create",
        "method": "POST",
        "path": "/admin/gitops/sync",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "git_op",
        "accessor": "GitOp",
        "op": "remove",
        "method": "DELETE",
        "path": "/admin/gitops/validate/{taskId}",
        "args": [
            {
                "name": "task_id",
                "wire": "taskId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "git_ops_status",
        "accessor": "GitOpsStatus",
        "op": "list",
        "method": "GET",
        "path": "/admin/gitops/status",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "syncState": "x",
            "lastSuccessfulSync": "2026-01-01T00:00:00Z",
            "lastSyncAttempt": "2026-01-01T00:00:00Z",
            "groupCount": 1,
            "artifactCount": 1,
            "versionCount": 1,
            "errors": [
                {
                    "context": "x",
                    "detail": "x",
                    "source": "x"
                }
            ],
            "sources": {}
        },
        "idField": "id"
    },
    {
        "entity": "git_ops_validate_task",
        "accessor": "GitOpsValidateTask",
        "op": "create",
        "method": "POST",
        "path": "/admin/gitops/validate",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 202,
        "sample": {
            "taskId": "x",
            "type": "x",
            "repoId": "x",
            "ref": "x",
            "state": "pending",
            "result": "success",
            "createdAt": "2026-01-01T00:00:00Z",
            "completedAt": "2026-01-01T00:00:00Z",
            "groupCount": 1,
            "artifactCount": 1,
            "versionCount": 1,
            "errors": [
                {
                    "detail": "x",
                    "source": "x",
                    "context": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "git_ops_validate_task",
        "accessor": "GitOpsValidateTask",
        "op": "list",
        "method": "GET",
        "path": "/admin/gitops/validate",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "taskId": "x",
                "type": "x",
                "repoId": "x",
                "ref": "x",
                "state": "pending",
                "result": "success",
                "createdAt": "2026-01-01T00:00:00Z",
                "completedAt": "2026-01-01T00:00:00Z",
                "groupCount": 1,
                "artifactCount": 1,
                "versionCount": 1,
                "errors": [
                    {
                        "detail": "x",
                        "source": "x",
                        "context": "x"
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "git_ops_validate_task",
        "accessor": "GitOpsValidateTask",
        "op": "load",
        "method": "GET",
        "path": "/admin/gitops/validate/{taskId}",
        "args": [
            {
                "name": "task_id",
                "wire": "taskId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "taskId": "x",
            "type": "x",
            "repoId": "x",
            "ref": "x",
            "state": "pending",
            "result": "success",
            "createdAt": "2026-01-01T00:00:00Z",
            "completedAt": "2026-01-01T00:00:00Z",
            "groupCount": 1,
            "artifactCount": 1,
            "versionCount": 1,
            "errors": [
                {
                    "detail": "x",
                    "source": "x",
                    "context": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "global_rule",
        "accessor": "GlobalRule",
        "op": "create",
        "method": "POST",
        "path": "/admin/rules",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "global_rule",
        "accessor": "GlobalRule",
        "op": "list",
        "method": "GET",
        "path": "/admin/rules",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "VALIDITY"
        ],
        "idField": "id"
    },
    {
        "entity": "global_rule",
        "accessor": "GlobalRule",
        "op": "remove",
        "method": "DELETE",
        "path": "/admin/rules/{ruleType}",
        "args": [
            {
                "name": "id",
                "wire": "ruleType",
                "value": "VALIDITY"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "global_rule",
        "accessor": "GlobalRule",
        "op": "remove",
        "method": "DELETE",
        "path": "/admin/rules",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/groups",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "group-identifier",
            "description": "Description of the group",
            "artifactsType": "AVRO",
            "owner": "user1",
            "createdOn": "2019-03-22T12:51:19Z",
            "modifiedBy": "user2",
            "modifiedOn": "2019-07-19T15:09:00Z",
            "properties": {
                "custom-1": "foo",
                "custom-2": "bar"
            }
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "list",
        "method": "GET",
        "path": "/groups",
        "args": [],
        "select": {
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset",
            "order",
            "orderby"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "groups": [
                {
                    "createdOn": "2019-03-22T12:51:19Z",
                    "description": "Description of the group",
                    "groupId": "My-Group",
                    "modifiedBy": "user1",
                    "modifiedOn": "2019-03-22T12:51:19Z",
                    "name": "Group Name",
                    "owner": "user1"
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}",
        "args": [
            {
                "name": "id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "group-identifier",
            "description": "Description of the group",
            "artifactsType": "AVRO",
            "owner": "user1",
            "createdOn": "2019-03-22T12:51:19Z",
            "modifiedBy": "user2",
            "modifiedOn": "2019-07-19T15:09:00Z",
            "properties": {
                "custom-1": "foo",
                "custom-2": "bar"
            }
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}",
        "args": [
            {
                "name": "id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}",
        "args": [
            {
                "name": "id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group_rule",
        "accessor": "GroupRule",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/rules",
        "args": [
            {
                "name": "id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group_rule",
        "accessor": "GroupRule",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/rules/{ruleType}",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "ruleType",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group_rule",
        "accessor": "GroupRule",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/rules",
        "args": [
            {
                "name": "id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "kafka_sql",
        "accessor": "KafkaSql",
        "op": "create",
        "method": "POST",
        "path": "/admin/snapshots",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "snapshotId": "snp-1137292771"
        },
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render",
        "action": "render",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "rendered": "Style: concise\nMaximum length: 100 words\nDocument: The quick brown fox jumps over the lazy dog.",
            "groupId": "default",
            "artifactId": "summarization-v1",
            "version": "1.2",
            "validationErrors": []
        },
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "My-Group",
            "artifactId": "my-artifact-id",
            "version": 1221432,
            "artifactType": "PROTOBUF",
            "name": "Artifact Name",
            "description": "The description of the artifact",
            "owner": "user1",
            "createdOn": "2019-05-17T12:00:00Z",
            "globalId": 183282932983,
            "contentId": 12347,
            "labels": {
                "custom-1": "foo",
                "custom-2": "bar"
            }
        },
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "My-Group",
            "artifactId": "Procurement-Invoice",
            "name": "Artifact Name",
            "description": "Description of the artifact",
            "artifactType": "AVRO",
            "owner": "user1",
            "createdOn": "2019-03-22T12:51:19Z",
            "modifiedBy": "user2",
            "modifiedOn": "2019-07-19T15:09:00Z",
            "labels": {
                "custom-1": "foo",
                "custom-2": "bar"
            }
        },
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state",
        "action": "state",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {
            "dry_run": "v1"
        },
        "headers": [],
        "query": [
            "dryRun"
        ],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content",
        "action": "content",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "metadata",
        "accessor": "Metadata",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "odcs_contract_result",
        "accessor": "OdcsContractResult",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/contracts",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "contractId": "x",
            "version": "x",
            "projection": {
                "rulesApplied": 1,
                "labelsApplied": 1,
                "tagsApplied": 1,
                "warnings": [
                    "x"
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "odcs_contract_result",
        "accessor": "OdcsContractResult",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/contracts/{contractId}",
        "args": [
            {
                "name": "contract_id",
                "wire": "contractId",
                "value": "p1"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "contractId": "x",
            "version": "x",
            "projection": {
                "rulesApplied": 1,
                "labelsApplied": 1,
                "tagsApplied": 1,
                "warnings": [
                    "x"
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "odcs_contract_summary",
        "accessor": "OdcsContractSummary",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/contracts",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "p1"
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "contractId": "x",
                "name": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "reference_graph",
        "accessor": "ReferenceGraph",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {
            "depth": "v1",
            "direction": "\"OUTBOUND\""
        },
        "headers": [],
        "query": [
            "direction",
            "depth"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "root": {
                "id": "root",
                "groupId": "mygroup",
                "artifactId": "my-artifact",
                "version": "1.0",
                "isRoot": true
            },
            "nodes": [
                {
                    "id": "root",
                    "groupId": "mygroup",
                    "artifactId": "my-artifact",
                    "version": "1.0",
                    "isRoot": true
                },
                {
                    "id": "node-1",
                    "groupId": "mygroup",
                    "artifactId": "referenced-artifact",
                    "version": "2.0",
                    "isRoot": false
                }
            ],
            "edges": [
                {
                    "sourceNodeId": "root",
                    "targetNodeId": "node-1",
                    "name": "common.proto"
                }
            ],
            "metadata": {
                "totalNodes": 2,
                "totalEdges": 1,
                "maxDepth": 1,
                "hasCycles": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "role_mapping",
        "accessor": "RoleMapping",
        "op": "create",
        "method": "POST",
        "path": "/admin/roleMappings",
        "action": "role_mapping",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "role_mapping",
        "accessor": "RoleMapping",
        "op": "list",
        "method": "GET",
        "path": "/admin/roleMappings",
        "action": "role_mapping",
        "args": [],
        "select": {
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "limit",
            "offset"
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "role_mapping",
        "accessor": "RoleMapping",
        "op": "load",
        "method": "GET",
        "path": "/admin/roleMappings/{principalId}",
        "args": [
            {
                "name": "id",
                "wire": "principalId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "principalId": "svc_account_84874587_123484",
            "principalName": "famartin-svc-account",
            "role": "READ_ONLY"
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/rules",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "VALIDITY"
        ],
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/rules",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "VALIDITY"
        ],
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "ruleType",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ruleType": "VALIDITY",
            "config": "FULL"
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/rules/{ruleType}",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "ruleType",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ruleType": "VALIDITY",
            "config": "FULL"
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "load",
        "method": "GET",
        "path": "/admin/rules/{ruleType}",
        "args": [
            {
                "name": "id",
                "wire": "ruleType",
                "value": "VALIDITY"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ruleType": "VALIDITY",
            "config": "FULL"
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "ruleType",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ruleType": "VALIDITY",
            "config": "FULL"
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/rules/{ruleType}",
        "args": [
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "ruleType",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ruleType": "VALIDITY",
            "config": "FULL"
        },
        "idField": "id"
    },
    {
        "entity": "rule",
        "accessor": "Rule",
        "op": "update",
        "method": "PUT",
        "path": "/admin/rules/{ruleType}",
        "args": [
            {
                "name": "id",
                "wire": "ruleType",
                "value": "VALIDITY"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ruleType": "VALIDITY",
            "config": "FULL"
        },
        "idField": "id"
    },
    {
        "entity": "searched_branch",
        "accessor": "SearchedBranch",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "branches": [
                {
                    "artifactId": "ExampleArtifact",
                    "branchId": "1.0.x",
                    "createdOn": "2018-02-10T09:30Z",
                    "description": "A really nice branch.",
                    "groupId": "ExampleGroup",
                    "modifiedBy": "user2",
                    "modifiedOn": "2019-03-11T09:30Z",
                    "owner": "user1",
                    "systemDefined": false
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "searched_group",
        "accessor": "SearchedGroup",
        "op": "list",
        "method": "GET",
        "path": "/search/groups",
        "args": [],
        "select": {
            "description": "v1",
            "group_id": "v1",
            "label": "v1",
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit",
            "order",
            "orderby",
            "labels",
            "description",
            "groupId"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "groups": [
                {
                    "createdOn": "2019-03-22T12:51:19Z",
                    "description": "Description of the group",
                    "groupId": "My-Group",
                    "modifiedBy": "user1",
                    "modifiedOn": "2019-03-22T12:51:19Z",
                    "name": "Group Name",
                    "owner": "user1"
                }
            ],
            "count": 1
        },
        "idField": "id"
    },
    {
        "entity": "system_info",
        "accessor": "SystemInfo",
        "op": "load",
        "method": "GET",
        "path": "/system/info",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "name": "Apicurio Registry (SQL)",
            "description": "The Apicurio Registry application.",
            "version": "2.0.0.Final",
            "builtOn": "2021-03-19T12:55:00Z"
        },
        "idField": "id"
    },
    {
        "entity": "usage_summary",
        "accessor": "UsageSummary",
        "op": "load",
        "method": "GET",
        "path": "/admin/usage/summary",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "active": 1,
            "stale": 1,
            "dead": 1
        },
        "idField": "id"
    },
    {
        "entity": "user_info",
        "accessor": "UserInfo",
        "op": "load",
        "method": "GET",
        "path": "/users/me",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "username": "dprince",
            "displayName": "Diana Prince",
            "admin": true,
            "developer": false,
            "viewer": false
        },
        "idField": "id"
    },
    {
        "entity": "user_interface_config",
        "accessor": "UserInterfaceConfig",
        "op": "load",
        "method": "GET",
        "path": "/system/uiConfig",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "ui": {
                "contextPath": "/",
                "navPrefixPath": "/",
                "oaiDocsUrl": "https://registry.apicur.io/docs",
                "editorsUrl": "https://registry.apicur.io/editors"
            },
            "auth": {
                "type": "oidc",
                "rbacEnabled": true,
                "obacEnabled": false,
                "options": {
                    "url": "https://auth.apicur.io/realms/apicurio",
                    "redirectUri": "http://registry.apicur.io",
                    "clientId": "apicurio-registry-ui"
                }
            },
            "features": {
                "readOnly": false,
                "breadcrumbs": true,
                "roleManagement": false,
                "settings": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "create",
        "method": "POST",
        "path": "/search/versions",
        "args": [],
        "select": {
            "artifact_id": "v1",
            "artifact_type": "v1",
            "canonical": "v1",
            "group_id": "v1",
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "skip_count": "v1",
            "state": "v1"
        },
        "headers": [],
        "query": [
            "canonical",
            "artifactType",
            "offset",
            "limit",
            "order",
            "orderby",
            "groupId",
            "artifactId",
            "state",
            "skipCount"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "versions": [
                {
                    "artifactId": "demo-artifact-id",
                    "artifactType": "AVRO",
                    "contentId": 62,
                    "createdOn": "2018-02-10T09:30Z",
                    "description": "Description of the artifact version",
                    "globalId": 37,
                    "groupId": "DemoGroup",
                    "name": "Artifact Version Name",
                    "owner": "some text",
                    "state": "ENABLED",
                    "version": "1.0.7"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "create",
        "method": "POST",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {
            "dry_run": "v1"
        },
        "headers": [],
        "query": [
            "dryRun"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "groupId": "My-Group",
            "artifactId": "my-artifact-id",
            "version": 1221432,
            "artifactType": "PROTOBUF",
            "name": "Artifact Name",
            "description": "The description of the artifact",
            "owner": "user1",
            "createdOn": "2019-05-17T12:00:00Z",
            "globalId": 183282932983,
            "contentId": 12347,
            "labels": {
                "custom-1": "foo",
                "custom-2": "bar"
            }
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "list",
        "method": "GET",
        "path": "/search/versions",
        "args": [],
        "select": {
            "artifact_id": "v1",
            "artifact_type": "v1",
            "content": "v1",
            "content_id": "v1",
            "description": "v1",
            "global_id": "v1",
            "group_id": "v1",
            "label": "v1",
            "limit": "v1",
            "name": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "skip_count": "v1",
            "state": "v1",
            "structure": "v1",
            "version": "\"3.1.6\""
        },
        "headers": [],
        "query": [
            "version",
            "offset",
            "limit",
            "order",
            "orderby",
            "labels",
            "description",
            "groupId",
            "globalId",
            "contentId",
            "artifactId",
            "name",
            "state",
            "artifactType",
            "content",
            "structure",
            "skipCount"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "versions": [
                {
                    "artifactId": "demo-artifact-id",
                    "artifactType": "AVRO",
                    "contentId": 62,
                    "createdOn": "2018-02-10T09:30Z",
                    "description": "Description of the artifact version",
                    "globalId": 37,
                    "groupId": "DemoGroup",
                    "name": "Artifact Version Name",
                    "owner": "some text",
                    "state": "ENABLED",
                    "version": "1.0.7"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1",
            "order": "v1",
            "orderby": "v1",
            "skip_count": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit",
            "order",
            "orderby",
            "skipCount"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "versions": [
                {
                    "artifactId": "demo-artifact-id",
                    "artifactType": "AVRO",
                    "contentId": 62,
                    "createdOn": "2018-02-10T09:30Z",
                    "description": "Description of the artifact version",
                    "globalId": 37,
                    "groupId": "DemoGroup",
                    "name": "Artifact Version Name",
                    "owner": "some text",
                    "state": "ENABLED",
                    "version": "1.0.7"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "list",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "branch_id",
                "wire": "branchId",
                "value": "\"latest\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            }
        ],
        "select": {
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "versions": [
                {
                    "artifactId": "demo-artifact-id",
                    "artifactType": "AVRO",
                    "contentId": 62,
                    "createdOn": "2018-02-10T09:30Z",
                    "description": "Description of the artifact version",
                    "globalId": 37,
                    "groupId": "DemoGroup",
                    "name": "Artifact Version Name",
                    "owner": "some text",
                    "state": "ENABLED",
                    "version": "1.0.7"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content",
        "action": "content",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {
            "canonical": "v1",
            "reference": "v1"
        },
        "headers": [],
        "query": [
            "references",
            "canonical"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "openapi": "3.0.2",
            "info": {
                "title": "Empty API",
                "version": "1.0.0",
                "description": "An example API design using OpenAPI."
            }
        },
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/export",
        "action": "export",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "comment_id",
                "wire": "commentId",
                "value": "p2"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "remove",
        "method": "DELETE",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "id",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "version",
        "accessor": "Version",
        "op": "update",
        "method": "PUT",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "comment_id",
                "wire": "commentId",
                "value": "p2"
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_id",
                "wire": "versionExpression",
                "value": "p4"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "well_known",
        "accessor": "WellKnown",
        "op": "list",
        "method": "GET",
        "path": "/well-known/agents",
        "args": [],
        "select": {
            "capability": "v1",
            "input_mode": "v1",
            "limit": "v1",
            "name": "v1",
            "offset": "v1",
            "output_mode": "v1",
            "skill": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit",
            "name",
            "skill",
            "capability",
            "inputMode",
            "outputMode"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "agents": [
                {
                    "artifactId": "x",
                    "capabilities": {
                        "extendedAgentCard": true,
                        "extensions": [
                            {
                                "description": "x",
                                "params": {},
                                "required": true,
                                "uri": "x"
                            }
                        ],
                        "pushNotifications": true,
                        "streaming": true
                    },
                    "createdOn": 1,
                    "description": "x",
                    "groupId": "x",
                    "name": "x",
                    "owner": "x",
                    "skills": [
                        "x"
                    ],
                    "supportedInterfaces": [
                        {
                            "protocolBinding": "x",
                            "protocolVersion": "x",
                            "tenant": "x",
                            "url": "x"
                        }
                    ],
                    "version": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "well_known",
        "accessor": "WellKnown",
        "op": "list",
        "method": "GET",
        "path": "/well-known/mcp-tools",
        "args": [],
        "select": {
            "limit": "v1",
            "name": "v1",
            "offset": "v1",
            "parameter": "v1"
        },
        "headers": [],
        "query": [
            "offset",
            "limit",
            "name",
            "parameter"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "tools": [
                {
                    "artifactId": "x",
                    "createdOn": 1,
                    "description": "x",
                    "groupId": "x",
                    "name": "x",
                    "owner": "x",
                    "parameters": [
                        "x"
                    ],
                    "title": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "well_known",
        "accessor": "WellKnown",
        "op": "load",
        "method": "GET",
        "path": "/well-known/schemas/{schemaType}/{version}",
        "args": [
            {
                "name": "schema_type",
                "wire": "schemaType",
                "value": "p1"
            },
            {
                "name": "version",
                "wire": "version",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "wrapped_version_state",
        "accessor": "WrappedVersionState",
        "op": "load",
        "method": "GET",
        "path": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state",
        "args": [
            {
                "name": "artifact_id",
                "wire": "artifactId",
                "value": "\"example-artifact\""
            },
            {
                "name": "group_id",
                "wire": "groupId",
                "value": "\"my-group\""
            },
            {
                "name": "version_expression",
                "wire": "versionExpression",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "state": "ENABLED"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map