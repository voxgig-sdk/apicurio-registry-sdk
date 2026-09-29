package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ApicurioRegistry",
			"slug": "apicurio-registry",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://{registry}/apis/registry/v3",
			"server": map[string]any{
				"registry": "MY-REGISTRY-URL",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"admin": map[string]any{},
				"agent": map[string]any{},
				"agent_card": map[string]any{},
				"ai_catalog": map[string]any{},
				"ard_explore": map[string]any{},
				"ard_search": map[string]any{},
				"artifact": map[string]any{},
				"artifact_reference": map[string]any{},
				"artifact_rule": map[string]any{},
				"artifact_type": map[string]any{},
				"branch": map[string]any{},
				"comment": map[string]any{},
				"configuration_property": map[string]any{},
				"consumer_version_heatmap": map[string]any{},
				"content": map[string]any{},
				"contract": map[string]any{},
				"contract_rule": map[string]any{},
				"contract_rule_set": map[string]any{},
				"create_artifact": map[string]any{},
				"deprecation_readiness": map[string]any{},
				"download_ref": map[string]any{},
				"git_op": map[string]any{},
				"git_ops_status": map[string]any{},
				"git_ops_validate_task": map[string]any{},
				"global_rule": map[string]any{},
				"group": map[string]any{},
				"group_rule": map[string]any{},
				"kafka_sql": map[string]any{},
				"metadata": map[string]any{},
				"odcs_contract_result": map[string]any{},
				"odcs_contract_summary": map[string]any{},
				"reference_graph": map[string]any{},
				"role_mapping": map[string]any{},
				"rule": map[string]any{},
				"searched_branch": map[string]any{},
				"searched_group": map[string]any{},
				"system_info": map[string]any{},
				"usage_summary": map[string]any{},
				"user_info": map[string]any{},
				"user_interface_config": map[string]any{},
				"version": map[string]any{},
				"well_known": map[string]any{},
				"wrapped_version_state": map[string]any{},
			},
		},
		"entity": map[string]any{
			"admin": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "admin",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/admin/import",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "import",
									},
								},
								"parts": []any{
									"admin",
									"import",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "x_registry_preserve_content_id",
											"orig": "X-Registry-Preserve-ContentId",
											"type": "`$BOOLEAN`",
											"kind": "header",
										},
										map[string]any{
											"name": "x_registry_preserve_global_id",
											"orig": "X-Registry-Preserve-GlobalId",
											"type": "`$BOOLEAN`",
											"kind": "header",
										},
									},
									"query": []any{
										map[string]any{
											"name": "require_empty_registry",
											"orig": "requireEmptyRegistry",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "import",
									"exist": []any{
										"require_empty_registry",
										"x_registry_preserve_content_id",
										"x_registry_preserve_global_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/admin/roleMappings/{principalId}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "roleMappings",
									},
									map[string]any{
										"var": "principal_id",
									},
								},
								"parts": []any{
									"admin",
									"roleMappings",
									"{principal_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"principalId": "principal_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "principal_id",
											"orig": "principalId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"principal_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/admin/config/properties/{propertyName}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "properties",
									},
									map[string]any{
										"var": "property_name",
									},
								},
								"parts": []any{
									"admin",
									"config",
									"properties",
									"{property_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"propertyName": "property_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "property_name",
											"orig": "propertyName",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"property_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/admin/contracts/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "contracts",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"admin",
									"contracts",
									"ruleset",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/admin/roleMappings/{principalId}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "roleMappings",
									},
									map[string]any{
										"var": "principal_id",
									},
								},
								"parts": []any{
									"admin",
									"roleMappings",
									"{principal_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"principalId": "principal_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "principal_id",
											"orig": "principalId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"principal_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/admin/config/properties/{propertyName}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "properties",
									},
									map[string]any{
										"var": "property_name",
									},
								},
								"parts": []any{
									"admin",
									"config",
									"properties",
									"{property_name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"propertyName": "property_name",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "property_name",
											"orig": "propertyName",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"property_name",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.role_mapping",
						},
					},
				},
			},
			"agent": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capabilities",
						"title": "Capabilities",
						"type": "`$OBJECT`",
						"short": "Capabilities of an A2A agent.",
					},
					map[string]any{
						"name": "defaultInputModes",
						"title": "Default Input Modes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "defaultOutputModes",
						"title": "Default Output Modes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "documentationUrl",
						"title": "Documentation Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iconUrl",
						"title": "Icon Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "protocolVersion",
						"title": "Protocol Version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$OBJECT`",
						"short": "Provider of an A2A agent.",
					},
					map[string]any{
						"name": "securityRequirements",
						"title": "Security Requirements",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "securitySchemes",
						"title": "Security Schemes",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "signatures",
						"title": "Signatures",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "supportedInterfaces",
						"title": "Supported Interfaces",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"name": "agent",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/agent.json",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "agent.json",
									},
								},
								"parts": []any{
									"well-known",
									"agent.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"agent_card": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capabilities",
						"title": "Capabilities",
						"type": "`$OBJECT`",
						"short": "Capabilities of an A2A agent.",
					},
					map[string]any{
						"name": "defaultInputModes",
						"title": "Default Input Modes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "defaultOutputModes",
						"title": "Default Output Modes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "documentationUrl",
						"title": "Documentation Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iconUrl",
						"title": "Icon Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "protocolVersion",
						"title": "Protocol Version",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$OBJECT`",
						"short": "Provider of an A2A agent.",
					},
					map[string]any{
						"name": "securityRequirements",
						"title": "Security Requirements",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "securitySchemes",
						"title": "Security Schemes",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "signatures",
						"title": "Signatures",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "supportedInterfaces",
						"title": "Supported Interfaces",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"name": "agent_card",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/agent-card.json",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "agent-card.json",
									},
								},
								"parts": []any{
									"well-known",
									"agent-card.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ai_catalog": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capabilities",
						"title": "Capabilities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "displayName",
						"title": "Display Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "identifier",
						"title": "Identifier",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "representativeQueries",
						"title": "Representative Queries",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"name": "ai_catalog",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/ard/agents",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "ard",
									},
									map[string]any{
										"lit": "agents",
									},
								},
								"parts": []any{
									"well-known",
									"ard",
									"agents",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter",
											"orig": "filter",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "order_by",
											"orig": "orderBy",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "pageSize",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "page_token",
											"orig": "pageToken",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter",
										"order_by",
										"page_size",
										"page_token",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/ai-catalog.json",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "ai-catalog.json",
									},
								},
								"parts": []any{
									"well-known",
									"ai-catalog.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/ard.json",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "ard.json",
									},
								},
								"parts": []any{
									"well-known",
									"ard.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ard_explore": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "facets",
						"title": "Facets",
						"type": "`$OBJECT`",
						"short": "Facets keyed by the requested facet field name.",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$OBJECT`",
						"short": "ARD search query.",
					},
					map[string]any{
						"name": "resultType",
						"title": "Result Type",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
						"short": "Requested result type for the ARD POST /explore endpoint.",
					},
				},
				"name": "ard_explore",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/well-known/ard/explore",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "ard",
									},
									map[string]any{
										"lit": "explore",
									},
								},
								"parts": []any{
									"well-known",
									"ard",
									"explore",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ard_search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "federation",
						"title": "Federation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pageSize",
						"title": "Page Size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pageToken",
						"title": "Page Token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "query",
						"title": "Query",
						"type": "`$OBJECT`",
						"req": true,
						"short": "ARD search query.",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "ard_search",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/well-known/ard/search",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "ard",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"well-known",
									"ard",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"artifact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "artifactType",
						"title": "Artifact Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "artifacts",
						"title": "Artifacts",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The artifacts returned in the result set.",
					},
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set).",
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "versions",
						"title": "Versions",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "artifact",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/search/artifacts",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "artifacts",
									},
								},
								"parts": []any{
									"search",
									"artifacts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artifact_type",
											"orig": "artifactType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "AVRO",
										},
										map[string]any{
											"name": "canonical",
											"orig": "canonical",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_count",
											"orig": "skipCount",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_type",
										"canonical",
										"group_id",
										"limit",
										"offset",
										"order",
										"orderby",
										"skip_count",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/artifacts",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "artifacts",
									},
								},
								"parts": []any{
									"search",
									"artifacts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artifacts`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "artifact_type",
											"orig": "artifactType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "AVRO",
										},
										map[string]any{
											"name": "content_id",
											"orig": "contentId",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "description",
											"orig": "description",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "global_id",
											"orig": "globalId",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "label",
											"orig": "labels",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_count",
											"orig": "skipCount",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"artifact_type",
										"content_id",
										"description",
										"global_id",
										"group_id",
										"label",
										"limit",
										"name",
										"offset",
										"order",
										"orderby",
										"skip_count",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artifacts`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_count",
											"orig": "skipCount",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"limit",
										"offset",
										"order",
										"orderby",
										"skip_count",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ids/globalIds/{globalId}",
								"segments": []any{
									map[string]any{
										"lit": "ids",
									},
									map[string]any{
										"lit": "globalIds",
									},
									map[string]any{
										"var": "global_id",
									},
								},
								"parts": []any{
									"ids",
									"globalIds",
									"{global_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"globalId": "global_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "global_id",
											"orig": "globalId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "reference",
											"orig": "references",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "return_artifact_type",
											"orig": "returnArtifactType",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"global_id",
										"reference",
										"return_artifact_type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/usage/artifacts/{groupId}/{artifactId}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "usage",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"var": "artifact_id",
									},
								},
								"parts": []any{
									"admin",
									"usage",
									"artifacts",
									"{group_id}",
									"{artifact_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ids/contentHashes/{contentHash}",
								"segments": []any{
									map[string]any{
										"lit": "ids",
									},
									map[string]any{
										"lit": "contentHashes",
									},
									map[string]any{
										"var": "content_hash",
									},
								},
								"parts": []any{
									"ids",
									"contentHashes",
									"{content_hash}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contentHash": "content_hash",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "content_hash",
											"orig": "contentHash",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"content_hash",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ids/contentIds/{contentId}",
								"segments": []any{
									map[string]any{
										"lit": "ids",
									},
									map[string]any{
										"lit": "contentIds",
									},
									map[string]any{
										"var": "content_id",
									},
								},
								"parts": []any{
									"ids",
									"contentIds",
									"{content_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contentId": "content_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "content_id",
											"orig": "contentId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"content_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
					},
				},
			},
			"artifact_reference": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"req": true,
						"short": "Raw content of the artifact version or a valid (and accessible) URL where the content can be found.",
					},
					map[string]any{
						"name": "contentType",
						"title": "Content Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The content-type, such as `application/json` or `text/xml`.",
					},
					map[string]any{
						"name": "encoding",
						"title": "Encoding",
						"type": "`$STRING`",
						"short": "Optional encoding for the content property.",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "references",
						"title": "References",
						"type": "`$ARRAY`",
						"short": "Collection of references to other artifacts.",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"name": "artifact_reference",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/content/references",
								"segments": []any{
									map[string]any{
										"lit": "content",
									},
									map[string]any{
										"lit": "references",
									},
								},
								"parts": []any{
									"content",
									"references",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artifact_type",
											"orig": "artifactType",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_type",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "references",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"references",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "ref_type",
											"orig": "refType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"INBOUND\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"ref_type",
										"version_expression",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ids/globalIds/{globalId}/references",
								"segments": []any{
									map[string]any{
										"lit": "ids",
									},
									map[string]any{
										"lit": "globalIds",
									},
									map[string]any{
										"var": "global_id_id",
									},
									map[string]any{
										"lit": "references",
									},
								},
								"parts": []any{
									"ids",
									"globalIds",
									"{global_id_id}",
									"references",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"globalId": "global_id_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "global_id_id",
											"orig": "globalId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "ref_type",
											"orig": "refType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"INBOUND\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"global_id_id",
										"ref_type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ids/contentHashes/{contentHash}/references",
								"segments": []any{
									map[string]any{
										"lit": "ids",
									},
									map[string]any{
										"lit": "contentHashes",
									},
									map[string]any{
										"var": "content_hash_id",
									},
									map[string]any{
										"lit": "references",
									},
								},
								"parts": []any{
									"ids",
									"contentHashes",
									"{content_hash_id}",
									"references",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contentHash": "content_hash_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "content_hash_id",
											"orig": "contentHash",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"content_hash_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ids/contentIds/{contentId}/references",
								"segments": []any{
									map[string]any{
										"lit": "ids",
									},
									map[string]any{
										"lit": "contentIds",
									},
									map[string]any{
										"var": "content_id_id",
									},
									map[string]any{
										"lit": "references",
									},
								},
								"parts": []any{
									"ids",
									"contentIds",
									"{content_id_id}",
									"references",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contentId": "content_id_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "content_id_id",
											"orig": "contentId",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"content_id_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"artifact_rule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ruleType",
						"title": "Rule Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "artifact_rule",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/rules",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{id}",
									"rules",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/rules",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{id}",
									"rules",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
					},
				},
			},
			"artifact_type": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
				},
				"name": "artifact_type",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/config/artifactTypes",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "artifactTypes",
									},
								},
								"parts": []any{
									"admin",
									"config",
									"artifactTypes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"branch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "branchId",
						"title": "Branch Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "systemDefined",
						"title": "System Defined",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "versions",
						"title": "Versions",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "branch",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
									"{id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"branchId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "branchId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"latest\"",
										},
									},
								},
								"select": map[string]any{
									"$action": "version",
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"branchId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "branchId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"latest\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"branchId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "branchId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"latest\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"branchId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "branchId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"latest\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
									"{id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"branchId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "branchId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"latest\"",
										},
									},
								},
								"select": map[string]any{
									"$action": "version",
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
					},
				},
			},
			"comment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "commentId",
						"title": "Comment Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "comment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "comments",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"comments",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "comments",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"comments",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"configuration_property": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "label",
						"title": "Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "configuration_property",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/config/properties",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "properties",
									},
								},
								"parts": []any{
									"admin",
									"config",
									"properties",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/config/properties/{propertyName}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "properties",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"admin",
									"config",
									"properties",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"propertyName": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "propertyName",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"consumer_version_heatmap": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clientId",
						"title": "Client Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "driftAlert",
						"title": "Drift Alert",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "versions",
						"title": "Versions",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "versionsBehind",
						"title": "Versions Behind",
						"type": "`$INTEGER`",
						"format": "int32",
					},
				},
				"name": "consumer_version_heatmap",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/usage/artifacts/{groupId}/{artifactId}/heatmap",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "usage",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "heatmap",
									},
								},
								"parts": []any{
									"admin",
									"usage",
									"artifacts",
									"{group_id}",
									"{artifact_id}",
									"heatmap",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.artifact",
						},
					},
				},
			},
			"content": map[string]any{
				"fields": []any{},
				"name": "content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/content/canonicalize",
								"segments": []any{
									map[string]any{
										"lit": "content",
									},
									map[string]any{
										"lit": "canonicalize",
									},
								},
								"parts": []any{
									"content",
									"canonicalize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artifact_type",
											"orig": "artifactType",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "AVRO",
										},
									},
								},
								"select": map[string]any{
									"$action": "canonicalize",
									"exist": []any{
										"artifact_type",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"contract": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "artifactType",
						"title": "Artifact Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "contract",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "execute",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"contract",
									"execute",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "execute",
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/migrate",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "migrate",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"migrate",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "migrate",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/promote",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "promote",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"promote",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "promote",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/status",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "status",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/contracts",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "contracts",
									},
								},
								"parts": []any{
									"search",
									"contracts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.artifacts`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "compatibility_group",
											"orig": "compatibilityGroup",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "owner_team",
											"orig": "ownerTeam",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"compatibility_group",
										"limit",
										"offset",
										"order",
										"orderby",
										"owner_team",
										"status",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/audit",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "audit",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"audit",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"$action": "audit",
									"exist": []any{
										"artifact_id",
										"group_id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "compatibility-group",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"compatibility-group",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "contract_id",
											"orig": "contractId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "compatibility_group",
									"exist": []any{
										"artifact_id",
										"contract_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/quality",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "quality",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"quality",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "contract_id",
											"orig": "contractId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "quality",
									"exist": []any{
										"artifact_id",
										"contract_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/export",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "export",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"export",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "export",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/metadata",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "metadata",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"metadata",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "metadata",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/contracts/{contractId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "contracts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"contracts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contractId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "contractId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"contract",
									"ruleset",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "ruleset",
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"ruleset",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "ruleset",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/contracts/{contractId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "contracts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"contracts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contractId": "id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "contractId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "compatibility-group",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"compatibility-group",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "compatibility_group",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/metadata",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "metadata",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"metadata",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "metadata",
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"contract_rule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"short": "The artifact ID containing the rule.",
					},
					map[string]any{
						"name": "globalId",
						"title": "Global Id",
						"type": "`$INTEGER`",
						"short": "The global ID of the version (null for artifact-level rules).",
						"format": "int64",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"short": "The group ID of the artifact containing the rule.",
					},
					map[string]any{
						"name": "rule",
						"title": "Rule",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A single contract rule definition.",
					},
					map[string]any{
						"name": "ruleCategory",
						"title": "Rule Category",
						"type": "`$STRING`",
						"short": "The rule category (DOMAIN or MIGRATION).",
					},
				},
				"name": "contract_rule",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/contract/rules",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"search",
									"contract",
									"rules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "tag",
											"orig": "tag",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"tag",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"contract_rule_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domainRules",
						"title": "Domain Rules",
						"type": "`$ARRAY`",
						"short": "Rules for domain validation.",
					},
					map[string]any{
						"name": "migrationRules",
						"title": "Migration Rules",
						"type": "`$ARRAY`",
						"short": "Rules for version migration.",
					},
				},
				"name": "contract_rule_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"contract",
									"ruleset",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"ruleset",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/contracts/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "contracts",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"admin",
									"contracts",
									"ruleset",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"contract",
									"ruleset",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "contract",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"contract",
									"ruleset",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/admin/contracts/ruleset",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "contracts",
									},
									map[string]any{
										"lit": "ruleset",
									},
								},
								"parts": []any{
									"admin",
									"contracts",
									"ruleset",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"create_artifact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifact",
						"title": "Artifact",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "artifactType",
						"title": "Artifact Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstVersion",
						"title": "First Version",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$OBJECT`",
						"req": true,
					},
				},
				"name": "create_artifact",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
									"query": []any{
										map[string]any{
											"name": "canonical",
											"orig": "canonical",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "dry_run",
											"orig": "dryRun",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "if_exist",
											"orig": "ifExists",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"canonical",
										"dry_run",
										"group_id",
										"if_exist",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
					},
				},
			},
			"deprecation_readiness": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clientId",
						"title": "Client Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fetchCount",
						"title": "Fetch Count",
						"type": "`$INTEGER`",
						"format": "int64",
					},
					map[string]any{
						"name": "lastFetched",
						"title": "Last Fetched",
						"type": "`$INTEGER`",
						"format": "int64",
					},
				},
				"name": "deprecation_readiness",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "usage",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "deprecation-readiness",
									},
								},
								"parts": []any{
									"admin",
									"usage",
									"artifacts",
									"{group_id}",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"deprecation-readiness",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"version": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.activeConsumers`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "version_id",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"download_ref": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "downloadId",
						"title": "Download Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "href",
						"title": "Href",
						"type": "`$STRING`",
					},
				},
				"name": "download_ref",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/export",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "export",
									},
								},
								"parts": []any{
									"admin",
									"export",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "for_browser",
											"orig": "forBrowser",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"for_browser",
										"group_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"git_op": map[string]any{
				"fields": []any{},
				"name": "git_op",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/admin/gitops/sync",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "gitops",
									},
									map[string]any{
										"lit": "sync",
									},
								},
								"parts": []any{
									"admin",
									"gitops",
									"sync",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/admin/gitops/validate/{taskId}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "gitops",
									},
									map[string]any{
										"lit": "validate",
									},
									map[string]any{
										"var": "task_id",
									},
								},
								"parts": []any{
									"admin",
									"gitops",
									"validate",
									"{task_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"taskId": "task_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "task_id",
											"orig": "taskId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"task_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"git_ops_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "context",
						"title": "Context",
						"type": "`$STRING`",
						"short": "The file path or location where the error occurred.",
					},
					map[string]any{
						"name": "detail",
						"title": "Detail",
						"type": "`$STRING`",
						"req": true,
						"short": "A human-readable description of the error.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"short": "The source ID (e.g., repository ID) where the error occurred.",
					},
				},
				"name": "git_ops_status",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/gitops/status",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "gitops",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"admin",
									"gitops",
									"status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"git_ops_validate_task": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactCount",
						"title": "Artifact Count",
						"type": "`$INTEGER`",
						"short": "Number of artifacts loaded during validation.",
						"format": "int32",
					},
					map[string]any{
						"name": "completedAt",
						"title": "Completed At",
						"type": "`$STRING`",
						"short": "ISO 8601 timestamp of when the task completed.",
						"format": "date-time",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "ISO 8601 timestamp of when the task was created.",
						"format": "date-time",
					},
					map[string]any{
						"name": "errors",
						"title": "Errors",
						"type": "`$ARRAY`",
						"short": "Validation errors.",
					},
					map[string]any{
						"name": "groupCount",
						"title": "Group Count",
						"type": "`$INTEGER`",
						"short": "Number of groups loaded during validation.",
						"format": "int32",
					},
					map[string]any{
						"name": "ref",
						"title": "Ref",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Git ref being validated.",
					},
					map[string]any{
						"name": "repoId",
						"title": "Repo Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Repository ID being validated.",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$STRING`",
						"short": "Validation result: `success` (all checks passed) or `failure` (validation errors found).",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro…",
					},
					map[string]any{
						"name": "taskId",
						"title": "Task Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier for the validation task.",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Validation type (`pull` or `push`).",
					},
					map[string]any{
						"name": "versionCount",
						"title": "Version Count",
						"type": "`$INTEGER`",
						"short": "Number of artifact versions loaded during validation.",
						"format": "int32",
					},
				},
				"name": "git_ops_validate_task",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/admin/gitops/validate",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "gitops",
									},
									map[string]any{
										"lit": "validate",
									},
								},
								"parts": []any{
									"admin",
									"gitops",
									"validate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/gitops/validate",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "gitops",
									},
									map[string]any{
										"lit": "validate",
									},
								},
								"parts": []any{
									"admin",
									"gitops",
									"validate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/gitops/validate/{taskId}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "gitops",
									},
									map[string]any{
										"lit": "validate",
									},
									map[string]any{
										"var": "task_id",
									},
								},
								"parts": []any{
									"admin",
									"gitops",
									"validate",
									"{task_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"taskId": "task_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "task_id",
											"orig": "taskId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"task_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"global_rule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ruleType",
						"title": "Rule Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "global_rule",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/admin/rules",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"admin",
									"rules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/rules",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"admin",
									"rules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/admin/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"admin",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "VALIDITY",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/admin/rules",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"admin",
									"rules",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"group": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "group",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.groups`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"order",
										"orderby",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"group_rule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ruleType",
						"title": "Rule Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "group_rule",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/rules",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
									"rules",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/rules",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
									"rules",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
					},
				},
			},
			"kafka_sql": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "snapshotId",
						"title": "Snapshot Id",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "kafka_sql",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/admin/snapshots",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "snapshots",
									},
								},
								"parts": []any{
									"admin",
									"snapshots",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"metadata": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "artifactType",
						"title": "Artifact Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "contentId",
						"title": "Content Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "contractMetadata",
						"title": "Contract Metadata",
						"type": "`$OBJECT`",
						"short": "Contract metadata projected from the artifact labels.",
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "globalId",
						"title": "Global Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"op": map[string]any{
							"load": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"op": map[string]any{
							"load": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"op": map[string]any{
							"load": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"format": "date-time",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"update": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"short": "A single version of an artifact.",
					},
				},
				"name": "metadata",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "render",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"render",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "render",
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "state",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"state",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "dryRun",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "state",
									"exist": []any{
										"artifact_id",
										"dry_run",
										"group_id",
										"version_expression",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "content",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"content",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "content",
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"odcs_contract_result": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "contractId",
						"title": "Contract Id",
						"type": "`$STRING`",
						"short": "The contract artifact ID.",
					},
					map[string]any{
						"name": "projection",
						"title": "Projection",
						"type": "`$OBJECT`",
						"short": "Summary of the projection performed when an ODCS contract is applied.",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"short": "The ODCS contract version.",
					},
				},
				"name": "odcs_contract_result",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/contracts",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "contracts",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"contracts",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/contracts/{contractId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "contracts",
									},
									map[string]any{
										"var": "contract_id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"contracts",
									"{contract_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"contractId": "contract_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "contract_id",
											"orig": "contractId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"contract_id",
										"group_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.contract",
						},
					},
				},
			},
			"odcs_contract_summary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "contractId",
						"title": "Contract Id",
						"type": "`$STRING`",
						"short": "The contract artifact ID.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The contract display name.",
					},
				},
				"name": "odcs_contract_summary",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/contracts",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "contracts",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"contracts",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
					},
				},
			},
			"reference_graph": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "edges",
						"title": "Edges",
						"type": "`$ARRAY`",
						"req": true,
						"short": "All edges (references) in the graph.",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Metadata about the graph structure.",
					},
					map[string]any{
						"name": "nodes",
						"title": "Nodes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "All nodes in the graph, including the root.",
					},
					map[string]any{
						"name": "root",
						"title": "Root",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The root node of the graph (the artifact for which references were requested).",
					},
				},
				"name": "reference_graph",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "references",
									},
									map[string]any{
										"lit": "graph",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"references",
									"graph",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "depth",
											"orig": "depth",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 3,
										},
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"OUTBOUND\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"depth",
										"direction",
										"group_id",
										"version_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
			"role_mapping": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "principalId",
						"title": "Principal Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "principalName",
						"title": "Principal Name",
						"type": "`$STRING`",
						"short": "A friendly name for the principal.",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "role_mapping",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/admin/roleMappings",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "roleMappings",
									},
								},
								"parts": []any{
									"admin",
									"roleMappings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "role_mapping",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/roleMappings",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "roleMappings",
									},
								},
								"parts": []any{
									"admin",
									"roleMappings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.roleMappings`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "role_mapping",
									"exist": []any{
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/roleMappings/{principalId}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "roleMappings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"admin",
									"roleMappings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"principalId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "principalId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rule": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"title": "Config",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ruleType",
						"title": "Rule Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "rule",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/rules",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"rules",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/rules",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "rules",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"rules",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"admin",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "VALIDITY",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/admin/rules/{ruleType}",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "rules",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"admin",
									"rules",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ruleType": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ruleType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "VALIDITY",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
					},
				},
			},
			"searched_branch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "branchId",
						"title": "Branch Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "systemDefined",
						"title": "System Defined",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "searched_branch",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.branches`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
					},
				},
			},
			"searched_group": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "searched_group",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/groups",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"search",
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.groups`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "description",
											"orig": "description",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "label",
											"orig": "labels",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"description",
										"group_id",
										"label",
										"limit",
										"offset",
										"order",
										"orderby",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"system_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "builtOn",
						"title": "Built On",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"name": "system_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/system/info",
								"segments": []any{
									map[string]any{
										"lit": "system",
									},
									map[string]any{
										"lit": "info",
									},
								},
								"parts": []any{
									"system",
									"info",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"usage_summary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "active",
						"title": "Active",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
					map[string]any{
						"name": "dead",
						"title": "Dead",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
					map[string]any{
						"name": "stale",
						"title": "Stale",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
				},
				"name": "usage_summary",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/admin/usage/summary",
								"segments": []any{
									map[string]any{
										"lit": "admin",
									},
									map[string]any{
										"lit": "usage",
									},
									map[string]any{
										"lit": "summary",
									},
								},
								"parts": []any{
									"admin",
									"usage",
									"summary",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin",
						"title": "Admin",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "developer",
						"title": "Developer",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "displayName",
						"title": "Display Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"title": "Username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "viewer",
						"title": "Viewer",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "user_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/me",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"users",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_interface_config": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auth",
						"title": "Auth",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "features",
						"title": "Features",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "ui",
						"title": "Ui",
						"type": "`$OBJECT`",
					},
				},
				"name": "user_interface_config",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/system/uiConfig",
								"segments": []any{
									map[string]any{
										"lit": "system",
									},
									map[string]any{
										"lit": "uiConfig",
									},
								},
								"parts": []any{
									"system",
									"uiConfig",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"version": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "artifactType",
						"title": "Artifact Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "branches",
						"title": "Branches",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "contentId",
						"title": "Content Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The total number of versions that matched the query (may be more than the number of versions returned in the result set).",
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$STRING`",
						"req": true,
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "globalId",
						"title": "Global Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isDraft",
						"title": "Is Draft",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "modifiedBy",
						"title": "Modified By",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modifiedOn",
						"title": "Modified On",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "A single version of an artifact.",
					},
					map[string]any{
						"name": "versions",
						"title": "Versions",
						"type": "`$ARRAY`",
						"req": true,
						"short": "The collection of artifact versions returned in the result set.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "version",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/search/versions",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"search",
									"versions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "artifact_type",
											"orig": "artifactType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "AVRO",
										},
										map[string]any{
											"name": "canonical",
											"orig": "canonical",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_count",
											"orig": "skipCount",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"artifact_type",
										"canonical",
										"group_id",
										"limit",
										"offset",
										"order",
										"orderby",
										"skip_count",
										"state",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
									"query": []any{
										map[string]any{
											"name": "dry_run",
											"orig": "dryRun",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"dry_run",
										"group_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search/versions",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"search",
									"versions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.versions`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "artifact_type",
											"orig": "artifactType",
											"type": "`$STRING`",
											"kind": "query",
											"example": "AVRO",
										},
										map[string]any{
											"name": "content",
											"orig": "content",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "content_id",
											"orig": "contentId",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "description",
											"orig": "description",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "global_id",
											"orig": "globalId",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "label",
											"orig": "labels",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_count",
											"orig": "skipCount",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "structure",
											"orig": "structure",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "\"3.1.6\"",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"artifact_type",
										"content",
										"content_id",
										"description",
										"global_id",
										"group_id",
										"label",
										"limit",
										"name",
										"offset",
										"order",
										"orderby",
										"skip_count",
										"state",
										"structure",
										"version",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.versions`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "orderby",
											"orig": "orderby",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "skip_count",
											"orig": "skipCount",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"limit",
										"offset",
										"order",
										"orderby",
										"skip_count",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "branches",
									},
									map[string]any{
										"var": "branch_id",
									},
									map[string]any{
										"lit": "versions",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"branches",
									"{branch_id}",
									"versions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"branchId": "branch_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.versions`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "branch_id",
											"orig": "branchId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"latest\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"branch_id",
										"group_id",
										"limit",
										"offset",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "content",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"content",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "canonical",
											"orig": "canonical",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "reference",
											"orig": "references",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "content",
									"exist": []any{
										"artifact_id",
										"canonical",
										"group_id",
										"reference",
										"version_expression",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/export",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "export",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"export",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "export",
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "comment_id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"comments",
									"{comment_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"commentId": "comment_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "comment_id",
											"orig": "commentId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"comment_id",
										"group_id",
										"version_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_id",
									},
									map[string]any{
										"lit": "comments",
									},
									map[string]any{
										"var": "comment_id",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_id}",
									"comments",
									"{comment_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"commentId": "comment_id",
										"groupId": "group_id",
										"versionExpression": "version_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "comment_id",
											"orig": "commentId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_id",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"comment_id",
										"group_id",
										"version_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.branch",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
						},
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.comment",
						},
					},
				},
			},
			"well_known": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "artifactId",
						"title": "Artifact Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "capabilities",
						"title": "Capabilities",
						"type": "`$OBJECT`",
						"short": "Capabilities of an A2A agent.",
					},
					map[string]any{
						"name": "createdOn",
						"title": "Created On",
						"type": "`$INTEGER`",
						"format": "int64",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "groupId",
						"title": "Group Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parameters",
						"title": "Parameters",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "supportedInterfaces",
						"title": "Supported Interfaces",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"artifact_id": "artifactId",
						"group_id": "groupId",
					},
					"name": "id",
					"parts": []any{
						"group_id",
						"artifact_id",
					},
					"sep": "/",
				},
				"name": "well_known",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/agents",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "agents",
									},
								},
								"parts": []any{
									"well-known",
									"agents",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.agents`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "capability",
											"orig": "capability",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "input_mode",
											"orig": "inputMode",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "output_mode",
											"orig": "outputMode",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "skill",
											"orig": "skill",
											"type": "`$ARRAY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"capability",
										"input_mode",
										"limit",
										"name",
										"offset",
										"output_mode",
										"skill",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/mcp-tools",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "mcp-tools",
									},
								},
								"parts": []any{
									"well-known",
									"mcp-tools",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tools`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "parameter",
											"orig": "parameter",
											"type": "`$ARRAY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"name",
										"offset",
										"parameter",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/agents/{groupId}/{artifactId}",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "agents",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"var": "artifact_id",
									},
								},
								"parts": []any{
									"well-known",
									"agents",
									"{group_id}",
									"{artifact_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/mcp-tools/{groupId}/{artifactId}",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "mcp-tools",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"var": "artifact_id",
									},
								},
								"parts": []any{
									"well-known",
									"mcp-tools",
									"{group_id}",
									"{artifact_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/well-known/schemas/{schemaType}/{version}",
								"segments": []any{
									map[string]any{
										"lit": "well-known",
									},
									map[string]any{
										"lit": "schemas",
									},
									map[string]any{
										"var": "schema_type",
									},
									map[string]any{
										"var": "version",
									},
								},
								"parts": []any{
									"well-known",
									"schemas",
									"{schema_type}",
									"{version}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"schemaType": "schema_type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "schema_type",
											"orig": "schemaType",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"schema_type",
										"version",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.agent",
						},
					},
				},
			},
			"wrapped_version_state": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "Describes the state of an artifact or artifact version.",
					},
				},
				"name": "wrapped_version_state",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "artifacts",
									},
									map[string]any{
										"var": "artifact_id",
									},
									map[string]any{
										"lit": "versions",
									},
									map[string]any{
										"var": "version_expression",
									},
									map[string]any{
										"lit": "state",
									},
								},
								"parts": []any{
									"groups",
									"{group_id}",
									"artifacts",
									"{artifact_id}",
									"versions",
									"{version_expression}",
									"state",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"artifactId": "artifact_id",
										"groupId": "group_id",
										"versionExpression": "version_expression",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "artifact_id",
											"orig": "artifactId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"example-artifact\"",
										},
										map[string]any{
											"name": "group_id",
											"orig": "groupId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "\"my-group\"",
										},
										map[string]any{
											"name": "version_expression",
											"orig": "versionExpression",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"artifact_id",
										"group_id",
										"version_expression",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
							"$.main.kit.entity.artifact",
							"$.main.kit.entity.version",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
