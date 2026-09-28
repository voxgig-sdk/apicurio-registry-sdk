# ApicurioRegistry SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ApicurioRegistry",
            "slug": "apicurio-registry",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{registry}/apis/registry/v3",
            "server": {
                "registry": "MY-REGISTRY-URL",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "admin": {},
                "agent": {},
                "agent_card": {},
                "ai_catalog": {},
                "ard_explore": {},
                "ard_search": {},
                "artifact": {},
                "artifact_reference": {},
                "artifact_rule": {},
                "artifact_type": {},
                "branch": {},
                "comment": {},
                "configuration_property": {},
                "consumer_version_heatmap": {},
                "content": {},
                "contract": {},
                "contract_rule": {},
                "contract_rule_set": {},
                "create_artifact": {},
                "deprecation_readiness": {},
                "download_ref": {},
                "git_op": {},
                "git_ops_status": {},
                "git_ops_validate_task": {},
                "global_rule": {},
                "group": {},
                "group_rule": {},
                "kafka_sql": {},
                "mcp_tool": {},
                "metadata": {},
                "odcs_contract_result": {},
                "odcs_contract_summary": {},
                "reference_graph": {},
                "role_mapping": {},
                "rule": {},
                "searched_branch": {},
                "searched_group": {},
                "system_info": {},
                "usage_summary": {},
                "user_info": {},
                "user_interface_config": {},
                "version": {},
                "well_known": {},
                "wrapped_version_state": {},
            },
        },
        "entity": {
      "admin": {
        "fields": [
          {
            "name": "role",
            "title": "Role",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "admin",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/admin/import",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "import",
                  },
                ],
                "parts": [
                  "admin",
                  "import",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "x_registry_preserve_content_id",
                      "orig": "x_registry_preserve_content_id",
                      "type": "`$BOOLEAN`",
                      "kind": "header",
                    },
                    {
                      "name": "x_registry_preserve_global_id",
                      "orig": "x_registry_preserve_global_id",
                      "type": "`$BOOLEAN`",
                      "kind": "header",
                    },
                  ],
                  "query": [
                    {
                      "name": "require_empty_registry",
                      "orig": "require_empty_registry",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "import",
                  "exist": [
                    "require_empty_registry",
                    "x_registry_preserve_content_id",
                    "x_registry_preserve_global_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/admin/roleMappings",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "roleMappings",
                  },
                ],
                "parts": [
                  "admin",
                  "roleMappings",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "role_mapping",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/admin/roleMappings/{principalId}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "roleMappings",
                  },
                  {
                    "var": "principal_id",
                  },
                ],
                "parts": [
                  "admin",
                  "roleMappings",
                  "{principal_id}",
                ],
                "rename": {
                  "param": {
                    "principalId": "principal_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "principal_id",
                      "orig": "principal_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "principal_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/admin/config/properties/{propertyName}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "config",
                  },
                  {
                    "lit": "properties",
                  },
                  {
                    "var": "property_name",
                  },
                ],
                "parts": [
                  "admin",
                  "config",
                  "properties",
                  "{property_name}",
                ],
                "rename": {
                  "param": {
                    "propertyName": "property_name",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "property_name",
                      "orig": "property_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "property_name",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/admin/contracts/ruleset",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "contracts",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "admin",
                  "contracts",
                  "ruleset",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/admin/roleMappings/{principalId}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "roleMappings",
                  },
                  {
                    "var": "principal_id",
                  },
                ],
                "parts": [
                  "admin",
                  "roleMappings",
                  "{principal_id}",
                ],
                "rename": {
                  "param": {
                    "principalId": "principal_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "principal_id",
                      "orig": "principal_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "principal_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/admin/config/properties/{propertyName}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "config",
                  },
                  {
                    "lit": "properties",
                  },
                  {
                    "var": "property_name",
                  },
                ],
                "parts": [
                  "admin",
                  "config",
                  "properties",
                  "{property_name}",
                ],
                "rename": {
                  "param": {
                    "propertyName": "property_name",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "property_name",
                      "orig": "property_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "property_name",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.role_mapping",
            ],
          ],
        },
      },
      "agent": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
          },
          {
            "name": "capabilities",
            "title": "Capabilities",
            "type": "`$OBJECT`",
            "short": "Capabilities of an A2A agent.",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$INTEGER`",
            "format": "int64",
          },
          {
            "name": "defaultInputModes",
            "title": "Default Input Modes",
            "type": "`$ARRAY`",
          },
          {
            "name": "defaultOutputModes",
            "title": "Default Output Modes",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "documentationUrl",
            "title": "Documentation Url",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
          },
          {
            "name": "iconUrl",
            "title": "Icon Url",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
          },
          {
            "name": "protocolVersion",
            "title": "Protocol Version",
            "type": "`$STRING`",
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$OBJECT`",
            "short": "Provider of an A2A agent.",
          },
          {
            "name": "securityRequirements",
            "title": "Security Requirements",
            "type": "`$ARRAY`",
          },
          {
            "name": "securitySchemes",
            "title": "Security Schemes",
            "type": "`$OBJECT`",
          },
          {
            "name": "signatures",
            "title": "Signatures",
            "type": "`$ARRAY`",
          },
          {
            "name": "skills",
            "title": "Skills",
            "type": "`$ARRAY`",
          },
          {
            "name": "supportedInterfaces",
            "title": "Supported Interfaces",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
          },
        ],
        "name": "agent",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/agents",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "agents",
                  },
                ],
                "parts": [
                  "well-known",
                  "agents",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.agents`",
                },
                "args": {
                  "query": [
                    {
                      "name": "capability",
                      "orig": "capability",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "input_mode",
                      "orig": "input_mode",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "output_mode",
                      "orig": "output_mode",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "skill",
                      "orig": "skill",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "capability",
                    "input_mode",
                    "limit",
                    "name",
                    "offset",
                    "output_mode",
                    "skill",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/agent.json",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "agent.json",
                  },
                ],
                "parts": [
                  "well-known",
                  "agent.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "agent_card": {
        "fields": [
          {
            "name": "capabilities",
            "title": "Capabilities",
            "type": "`$OBJECT`",
            "short": "Capabilities of an A2A agent.",
          },
          {
            "name": "defaultInputModes",
            "title": "Default Input Modes",
            "type": "`$ARRAY`",
          },
          {
            "name": "defaultOutputModes",
            "title": "Default Output Modes",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "documentationUrl",
            "title": "Documentation Url",
            "type": "`$STRING`",
          },
          {
            "name": "iconUrl",
            "title": "Icon Url",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "protocolVersion",
            "title": "Protocol Version",
            "type": "`$STRING`",
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$OBJECT`",
            "short": "Provider of an A2A agent.",
          },
          {
            "name": "securityRequirements",
            "title": "Security Requirements",
            "type": "`$ARRAY`",
          },
          {
            "name": "securitySchemes",
            "title": "Security Schemes",
            "type": "`$OBJECT`",
          },
          {
            "name": "signatures",
            "title": "Signatures",
            "type": "`$ARRAY`",
          },
          {
            "name": "skills",
            "title": "Skills",
            "type": "`$ARRAY`",
          },
          {
            "name": "supportedInterfaces",
            "title": "Supported Interfaces",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
          },
        ],
        "name": "agent_card",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/agent-card.json",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "agent-card.json",
                  },
                ],
                "parts": [
                  "well-known",
                  "agent-card.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ai_catalog": {
        "fields": [
          {
            "name": "capabilities",
            "title": "Capabilities",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "displayName",
            "title": "Display Name",
            "type": "`$STRING`",
          },
          {
            "name": "identifier",
            "title": "Identifier",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "representativeQueries",
            "title": "Representative Queries",
            "type": "`$ARRAY`",
          },
          {
            "name": "tags",
            "title": "Tags",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
          },
        ],
        "name": "ai_catalog",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/ard/agents",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "ard",
                  },
                  {
                    "lit": "agents",
                  },
                ],
                "parts": [
                  "well-known",
                  "ard",
                  "agents",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "filter",
                      "orig": "filter",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "order_by",
                      "orig": "order_by",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "page_token",
                      "orig": "page_token",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "filter",
                    "order_by",
                    "page_size",
                    "page_token",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/ai-catalog.json",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "ai-catalog.json",
                  },
                ],
                "parts": [
                  "well-known",
                  "ai-catalog.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/ard.json",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "ard.json",
                  },
                ],
                "parts": [
                  "well-known",
                  "ard.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ard_explore": {
        "fields": [
          {
            "name": "query",
            "title": "Query",
            "type": "`$OBJECT`",
            "short": "ARD search query.",
          },
          {
            "name": "resultType",
            "title": "Result Type",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Requested result type for the ARD POST /explore endpoint.",
          },
        ],
        "name": "ard_explore",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/well-known/ard/explore",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "ard",
                  },
                  {
                    "lit": "explore",
                  },
                ],
                "parts": [
                  "well-known",
                  "ard",
                  "explore",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.facets`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ard_search": {
        "fields": [
          {
            "name": "federation",
            "title": "Federation",
            "type": "`$STRING`",
          },
          {
            "name": "pageSize",
            "title": "Page Size",
            "type": "`$INTEGER`",
          },
          {
            "name": "pageToken",
            "title": "Page Token",
            "type": "`$STRING`",
          },
          {
            "name": "query",
            "title": "Query",
            "type": "`$OBJECT`",
            "req": True,
            "short": "ARD search query.",
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "ard_search",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/well-known/ard/search",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "ard",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "well-known",
                  "ard",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "artifact": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "artifactType",
            "title": "Artifact Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "artifacts",
            "title": "Artifacts",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The artifacts returned in the result set.",
          },
          {
            "name": "count",
            "title": "Count",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set).",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "versions",
            "title": "Versions",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "artifact",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/search/artifacts",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "artifacts",
                  },
                ],
                "parts": [
                  "search",
                  "artifacts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artifact_type",
                      "orig": "artifact_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "AVRO",
                    },
                    {
                      "name": "canonical",
                      "orig": "canonical",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "skip_count",
                      "orig": "skip_count",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_type",
                    "canonical",
                    "group_id",
                    "limit",
                    "offset",
                    "order",
                    "orderby",
                    "skip_count",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search/artifacts",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "artifacts",
                  },
                ],
                "parts": [
                  "search",
                  "artifacts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.artifacts`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "artifact_type",
                      "orig": "artifact_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "AVRO",
                    },
                    {
                      "name": "content_id",
                      "orig": "content_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "description",
                      "orig": "description",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "global_id",
                      "orig": "global_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "label",
                      "orig": "label",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "skip_count",
                      "orig": "skip_count",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
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
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.artifacts`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "skip_count",
                      "orig": "skip_count",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "limit",
                    "offset",
                    "order",
                    "orderby",
                    "skip_count",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ids/globalIds/{globalId}",
                "segments": [
                  {
                    "lit": "ids",
                  },
                  {
                    "lit": "globalIds",
                  },
                  {
                    "var": "global_id",
                  },
                ],
                "parts": [
                  "ids",
                  "globalIds",
                  "{global_id}",
                ],
                "rename": {
                  "param": {
                    "globalId": "global_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "global_id",
                      "orig": "global_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "reference",
                      "orig": "reference",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "return_artifact_type",
                      "orig": "return_artifact_type",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "global_id",
                    "reference",
                    "return_artifact_type",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/usage/artifacts/{groupId}/{artifactId}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "usage",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "var": "artifact_id",
                  },
                ],
                "parts": [
                  "admin",
                  "usage",
                  "artifacts",
                  "{group_id}",
                  "{artifact_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ids/contentHashes/{contentHash}",
                "segments": [
                  {
                    "lit": "ids",
                  },
                  {
                    "lit": "contentHashes",
                  },
                  {
                    "var": "content_hash",
                  },
                ],
                "parts": [
                  "ids",
                  "contentHashes",
                  "{content_hash}",
                ],
                "rename": {
                  "param": {
                    "contentHash": "content_hash",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "content_hash",
                      "orig": "content_hash",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "content_hash",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ids/contentIds/{contentId}",
                "segments": [
                  {
                    "lit": "ids",
                  },
                  {
                    "lit": "contentIds",
                  },
                  {
                    "var": "content_id",
                  },
                ],
                "parts": [
                  "ids",
                  "contentIds",
                  "{content_id}",
                ],
                "rename": {
                  "param": {
                    "contentId": "content_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "content_id",
                      "orig": "content_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "content_id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
          ],
        },
      },
      "artifact_reference": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$STRING`",
            "req": True,
            "short": "Raw content of the artifact version or a valid (and accessible) URL where the content can be found.",
          },
          {
            "name": "contentType",
            "title": "Content Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The content-type, such as `application/json` or `text/xml`.",
          },
          {
            "name": "encoding",
            "title": "Encoding",
            "type": "`$STRING`",
            "short": "Optional encoding for the content property.",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "references",
            "title": "References",
            "type": "`$ARRAY`",
            "short": "Collection of references to other artifacts.",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
          },
        ],
        "name": "artifact_reference",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/content/references",
                "segments": [
                  {
                    "lit": "content",
                  },
                  {
                    "lit": "references",
                  },
                ],
                "parts": [
                  "content",
                  "references",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artifact_type",
                      "orig": "artifact_type",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_type",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "references",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "references",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "ref_type",
                      "orig": "ref_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"INBOUND\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "ref_type",
                    "version_expression",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ids/globalIds/{globalId}/references",
                "segments": [
                  {
                    "lit": "ids",
                  },
                  {
                    "lit": "globalIds",
                  },
                  {
                    "var": "global_id_id",
                  },
                  {
                    "lit": "references",
                  },
                ],
                "parts": [
                  "ids",
                  "globalIds",
                  "{global_id_id}",
                  "references",
                ],
                "rename": {
                  "param": {
                    "globalId": "global_id_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "global_id_id",
                      "orig": "global_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "ref_type",
                      "orig": "ref_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"INBOUND\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "global_id_id",
                    "ref_type",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ids/contentHashes/{contentHash}/references",
                "segments": [
                  {
                    "lit": "ids",
                  },
                  {
                    "lit": "contentHashes",
                  },
                  {
                    "var": "content_hash_id",
                  },
                  {
                    "lit": "references",
                  },
                ],
                "parts": [
                  "ids",
                  "contentHashes",
                  "{content_hash_id}",
                  "references",
                ],
                "rename": {
                  "param": {
                    "contentHash": "content_hash_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "content_hash_id",
                      "orig": "content_hash",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "content_hash_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/ids/contentIds/{contentId}/references",
                "segments": [
                  {
                    "lit": "ids",
                  },
                  {
                    "lit": "contentIds",
                  },
                  {
                    "var": "content_id_id",
                  },
                  {
                    "lit": "references",
                  },
                ],
                "parts": [
                  "ids",
                  "contentIds",
                  "{content_id_id}",
                  "references",
                ],
                "rename": {
                  "param": {
                    "contentId": "content_id_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "content_id_id",
                      "orig": "content_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "content_id_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "artifact_rule": {
        "fields": [
          {
            "name": "config",
            "title": "Config",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ruleType",
            "title": "Rule Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "artifact_rule",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/rules",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{id}",
                  "rules",
                ],
                "rename": {
                  "param": {
                    "artifactId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/rules",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{id}",
                  "rules",
                ],
                "rename": {
                  "param": {
                    "artifactId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
          ],
        },
      },
      "artifact_type": {
        "fields": [
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
        ],
        "name": "artifact_type",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/config/artifactTypes",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "config",
                  },
                  {
                    "lit": "artifactTypes",
                  },
                ],
                "parts": [
                  "admin",
                  "config",
                  "artifactTypes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "branch": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "branchId",
            "title": "Branch Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "systemDefined",
            "title": "System Defined",
            "type": "`$BOOLEAN`",
            "req": True,
          },
          {
            "name": "versions",
            "title": "Versions",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "branch",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                  "{id}",
                  "versions",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "branchId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "branch_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"latest\"",
                    },
                  ],
                },
                "select": {
                  "$action": "version",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "branchId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "branch_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"latest\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "branchId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "branch_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"latest\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "branchId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "branch_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"latest\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                  "{id}",
                  "versions",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "branchId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "branch_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"latest\"",
                    },
                  ],
                },
                "select": {
                  "$action": "version",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
          ],
        },
      },
      "comment": {
        "fields": [
          {
            "name": "commentId",
            "title": "Comment Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "comment",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "comments",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "comments",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "comments",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "comments",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "configuration_property": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "label",
            "title": "Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "configuration_property",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/config/properties",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "config",
                  },
                  {
                    "lit": "properties",
                  },
                ],
                "parts": [
                  "admin",
                  "config",
                  "properties",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/config/properties/{propertyName}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "config",
                  },
                  {
                    "lit": "properties",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "admin",
                  "config",
                  "properties",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "propertyName": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "property_name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "consumer_version_heatmap": {
        "fields": [
          {
            "name": "clientId",
            "title": "Client Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "driftAlert",
            "title": "Drift Alert",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "versions",
            "title": "Versions",
            "type": "`$OBJECT`",
          },
          {
            "name": "versionsBehind",
            "title": "Versions Behind",
            "type": "`$INTEGER`",
            "format": "int32",
          },
        ],
        "name": "consumer_version_heatmap",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/usage/artifacts/{groupId}/{artifactId}/heatmap",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "usage",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "heatmap",
                  },
                ],
                "parts": [
                  "admin",
                  "usage",
                  "artifacts",
                  "{group_id}",
                  "{artifact_id}",
                  "heatmap",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.artifact",
            ],
          ],
        },
      },
      "content": {
        "fields": [],
        "name": "content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/content/canonicalize",
                "segments": [
                  {
                    "lit": "content",
                  },
                  {
                    "lit": "canonicalize",
                  },
                ],
                "parts": [
                  "content",
                  "canonicalize",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artifact_type",
                      "orig": "artifact_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "AVRO",
                    },
                  ],
                },
                "select": {
                  "$action": "canonicalize",
                  "exist": [
                    "artifact_type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "contract": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "artifactType",
            "title": "Artifact Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "contract",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/execute",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "execute",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "contract",
                  "execute",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "execute",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/migrate",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "migrate",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "migrate",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "migrate",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/promote",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "promote",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "promote",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "promote",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/status",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "status",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "status",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "status",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search/contracts",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "contracts",
                  },
                ],
                "parts": [
                  "search",
                  "contracts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.artifacts`",
                },
                "args": {
                  "query": [
                    {
                      "name": "compatibility_group",
                      "orig": "compatibility_group",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "owner_team",
                      "orig": "owner_team",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "compatibility_group",
                    "limit",
                    "offset",
                    "order",
                    "orderby",
                    "owner_team",
                    "status",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/audit",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "audit",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "audit",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                  ],
                },
                "select": {
                  "$action": "audit",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "limit",
                    "offset",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "compatibility-group",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "compatibility-group",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "contract_id",
                      "orig": "contract_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "compatibility_group",
                  "exist": [
                    "artifact_id",
                    "contract_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/quality",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "quality",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "quality",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "contract_id",
                      "orig": "contract_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "quality",
                  "exist": [
                    "artifact_id",
                    "contract_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/export",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "export",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "export",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "export",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/metadata",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "metadata",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "metadata",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "metadata",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/contracts/{contractId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "contracts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "contracts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "contractId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "contract_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "contract",
                  "ruleset",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "ruleset",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "ruleset",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "ruleset",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/contracts/{contractId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "contracts",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "contracts",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "contractId": "id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "id",
                      "orig": "contract_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/compatibility-group",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "compatibility-group",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "compatibility-group",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "compatibility_group",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/metadata",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "metadata",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "metadata",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "metadata",
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "contract_rule": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "short": "The artifact ID containing the rule.",
          },
          {
            "name": "globalId",
            "title": "Global Id",
            "type": "`$INTEGER`",
            "short": "The global ID of the version (null for artifact-level rules).",
            "format": "int64",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "short": "The group ID of the artifact containing the rule.",
          },
          {
            "name": "rule",
            "title": "Rule",
            "type": "`$OBJECT`",
            "req": True,
            "short": "A single contract rule definition.",
          },
          {
            "name": "ruleCategory",
            "title": "Rule Category",
            "type": "`$STRING`",
            "short": "The rule category (DOMAIN or MIGRATION).",
          },
        ],
        "name": "contract_rule",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search/contract/rules",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "search",
                  "contract",
                  "rules",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "tag",
                      "orig": "tag",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "tag",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "contract_rule_set": {
        "fields": [
          {
            "name": "domainRules",
            "title": "Domain Rules",
            "type": "`$ARRAY`",
            "short": "Rules for domain validation.",
          },
          {
            "name": "migrationRules",
            "title": "Migration Rules",
            "type": "`$ARRAY`",
            "short": "Rules for version migration.",
          },
        ],
        "name": "contract_rule_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "contract",
                  "ruleset",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "ruleset",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/contracts/ruleset",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "contracts",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "admin",
                  "contracts",
                  "ruleset",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "contract",
                  "ruleset",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "contract",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "contract",
                  "ruleset",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/admin/contracts/ruleset",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "contracts",
                  },
                  {
                    "lit": "ruleset",
                  },
                ],
                "parts": [
                  "admin",
                  "contracts",
                  "ruleset",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "create_artifact": {
        "fields": [
          {
            "name": "artifact",
            "title": "Artifact",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "artifactType",
            "title": "Artifact Type",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "firstVersion",
            "title": "First Version",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$OBJECT`",
            "req": True,
          },
        ],
        "name": "create_artifact",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                  "query": [
                    {
                      "name": "canonical",
                      "orig": "canonical",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "dry_run",
                      "orig": "dry_run",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "if_exist",
                      "orig": "if_exist",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "canonical",
                    "dry_run",
                    "group_id",
                    "if_exist",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
          ],
        },
      },
      "deprecation_readiness": {
        "fields": [
          {
            "name": "clientId",
            "title": "Client Id",
            "type": "`$STRING`",
          },
          {
            "name": "fetchCount",
            "title": "Fetch Count",
            "type": "`$INTEGER`",
            "format": "int64",
          },
          {
            "name": "lastFetched",
            "title": "Last Fetched",
            "type": "`$INTEGER`",
            "format": "int64",
          },
        ],
        "name": "deprecation_readiness",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "usage",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "deprecation-readiness",
                  },
                ],
                "parts": [
                  "admin",
                  "usage",
                  "artifacts",
                  "{group_id}",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "deprecation-readiness",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "version": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.activeConsumers`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "version_id",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "download_ref": {
        "fields": [
          {
            "name": "downloadId",
            "title": "Download Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "href",
            "title": "Href",
            "type": "`$STRING`",
          },
        ],
        "name": "download_ref",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/export",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "export",
                  },
                ],
                "parts": [
                  "admin",
                  "export",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "for_browser",
                      "orig": "for_browser",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "for_browser",
                    "group_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "git_op": {
        "fields": [
          {
            "name": "ref",
            "title": "Ref",
            "type": "`$STRING`",
            "req": True,
            "short": "Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`).",
          },
          {
            "name": "repoId",
            "title": "Repo Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Repository ID to validate against.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Validation type.",
          },
        ],
        "name": "git_op",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/admin/gitops/sync",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "gitops",
                  },
                  {
                    "lit": "sync",
                  },
                ],
                "parts": [
                  "admin",
                  "gitops",
                  "sync",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/admin/gitops/validate",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "gitops",
                  },
                  {
                    "lit": "validate",
                  },
                ],
                "parts": [
                  "admin",
                  "gitops",
                  "validate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/admin/gitops/validate/{taskId}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "gitops",
                  },
                  {
                    "lit": "validate",
                  },
                  {
                    "var": "task_id",
                  },
                ],
                "parts": [
                  "admin",
                  "gitops",
                  "validate",
                  "{task_id}",
                ],
                "rename": {
                  "param": {
                    "taskId": "task_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "task_id",
                      "orig": "task_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "task_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "git_ops_status": {
        "fields": [
          {
            "name": "context",
            "title": "Context",
            "type": "`$STRING`",
            "short": "The file path or location where the error occurred.",
          },
          {
            "name": "detail",
            "title": "Detail",
            "type": "`$STRING`",
            "req": True,
            "short": "A human-readable description of the error.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "short": "The source ID (e.g., repository ID) where the error occurred.",
          },
        ],
        "name": "git_ops_status",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/gitops/status",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "gitops",
                  },
                  {
                    "lit": "status",
                  },
                ],
                "parts": [
                  "admin",
                  "gitops",
                  "status",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "git_ops_validate_task": {
        "fields": [
          {
            "name": "artifactCount",
            "title": "Artifact Count",
            "type": "`$INTEGER`",
            "short": "Number of artifacts loaded during validation.",
            "format": "int32",
          },
          {
            "name": "completedAt",
            "title": "Completed At",
            "type": "`$STRING`",
            "short": "ISO 8601 timestamp of when the task completed.",
            "format": "date-time",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "ISO 8601 timestamp of when the task was created.",
            "format": "date-time",
          },
          {
            "name": "errors",
            "title": "Errors",
            "type": "`$ARRAY`",
            "short": "Validation errors.",
          },
          {
            "name": "groupCount",
            "title": "Group Count",
            "type": "`$INTEGER`",
            "short": "Number of groups loaded during validation.",
            "format": "int32",
          },
          {
            "name": "ref",
            "title": "Ref",
            "type": "`$STRING`",
            "short": "Git ref being validated.",
          },
          {
            "name": "repoId",
            "title": "Repo Id",
            "type": "`$STRING`",
            "short": "Repository ID being validated.",
          },
          {
            "name": "result",
            "title": "Result",
            "type": "`$STRING`",
            "short": "Validation result: `success` (all checks passed) or `failure` (validation errors found).",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
            "short": "Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro…",
          },
          {
            "name": "taskId",
            "title": "Task Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for the validation task.",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Validation type (`pull` or `push`).",
          },
          {
            "name": "versionCount",
            "title": "Version Count",
            "type": "`$INTEGER`",
            "short": "Number of artifact versions loaded during validation.",
            "format": "int32",
          },
        ],
        "name": "git_ops_validate_task",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/gitops/validate",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "gitops",
                  },
                  {
                    "lit": "validate",
                  },
                ],
                "parts": [
                  "admin",
                  "gitops",
                  "validate",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/gitops/validate/{taskId}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "gitops",
                  },
                  {
                    "lit": "validate",
                  },
                  {
                    "var": "task_id",
                  },
                ],
                "parts": [
                  "admin",
                  "gitops",
                  "validate",
                  "{task_id}",
                ],
                "rename": {
                  "param": {
                    "taskId": "task_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "task_id",
                      "orig": "task_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "task_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "global_rule": {
        "fields": [
          {
            "name": "config",
            "title": "Config",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ruleType",
            "title": "Rule Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "global_rule",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/admin/rules",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "admin",
                  "rules",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/admin/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "admin",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "VALIDITY",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/admin/rules",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "admin",
                  "rules",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "group": {
        "fields": [
          {
            "name": "artifactsType",
            "title": "Artifacts Type",
            "type": "`$STRING`",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "format": "date-time",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "group",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups",
                "segments": [
                  {
                    "lit": "groups",
                  },
                ],
                "parts": [
                  "groups",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.labels`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups",
                "segments": [
                  {
                    "lit": "groups",
                  },
                ],
                "parts": [
                  "groups",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.groups`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "order",
                    "orderby",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "groupId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.labels`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "groupId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "groupId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "group_rule": {
        "fields": [
          {
            "name": "config",
            "title": "Config",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ruleType",
            "title": "Rule Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "group_rule",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/rules",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "groups",
                  "{id}",
                  "rules",
                ],
                "rename": {
                  "param": {
                    "groupId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/rules",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "groups",
                  "{id}",
                  "rules",
                ],
                "rename": {
                  "param": {
                    "groupId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
          ],
        },
      },
      "kafka_sql": {
        "fields": [
          {
            "name": "snapshotId",
            "title": "Snapshot Id",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "kafka_sql",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/admin/snapshots",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "snapshots",
                  },
                ],
                "parts": [
                  "admin",
                  "snapshots",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mcp_tool": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$INTEGER`",
            "format": "int64",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
          },
          {
            "name": "parameters",
            "title": "Parameters",
            "type": "`$ARRAY`",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
          },
        ],
        "name": "mcp_tool",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/mcp-tools",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "mcp-tools",
                  },
                ],
                "parts": [
                  "well-known",
                  "mcp-tools",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tools`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "parameter",
                      "orig": "parameter",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "name",
                    "offset",
                    "parameter",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "metadata": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "op": {
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "artifactType",
            "title": "Artifact Type",
            "type": "`$STRING`",
            "op": {
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "contentId",
            "title": "Content Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "contractMetadata",
            "title": "Contract Metadata",
            "type": "`$OBJECT`",
            "short": "Contract metadata projected from the artifact labels.",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "op": {
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "globalId",
            "title": "Global Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "op": {
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "op": {
              "load": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$INTEGER`",
          },
        ],
        "name": "metadata",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/render",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "render",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "render",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "render",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.labels`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "state",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "state",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "dry_run",
                      "orig": "dry_run",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "state",
                  "exist": [
                    "artifact_id",
                    "dry_run",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "content",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "content",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "content",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "odcs_contract_result": {
        "fields": [
          {
            "name": "labelsApplied",
            "title": "Labels Applied",
            "type": "`$INTEGER`",
            "short": "Number of contract.* labels set on the schema artifact.",
            "format": "int32",
          },
          {
            "name": "rulesApplied",
            "title": "Rules Applied",
            "type": "`$INTEGER`",
            "short": "Number of CEL quality rules projected onto the schema artifact.",
            "format": "int32",
          },
          {
            "name": "tagsApplied",
            "title": "Tags Applied",
            "type": "`$INTEGER`",
            "short": "Number of field-tag.* labels set on the schema artifact version.",
            "format": "int32",
          },
          {
            "name": "warnings",
            "title": "Warnings",
            "type": "`$ARRAY`",
            "short": "Any warnings encountered during projection.",
          },
        ],
        "name": "odcs_contract_result",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/contracts",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "contracts",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "contracts",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.projection`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/contracts/{contractId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "contracts",
                  },
                  {
                    "var": "contract_id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "contracts",
                  "{contract_id}",
                ],
                "rename": {
                  "param": {
                    "contractId": "contract_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.projection`",
                },
                "args": {
                  "params": [
                    {
                      "name": "contract_id",
                      "orig": "contract_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "contract_id",
                    "group_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.contract",
            ],
          ],
        },
      },
      "odcs_contract_summary": {
        "fields": [
          {
            "name": "contractId",
            "title": "Contract Id",
            "type": "`$STRING`",
            "short": "The contract artifact ID.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The contract display name.",
          },
        ],
        "name": "odcs_contract_summary",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/contracts",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "contracts",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "contracts",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "limit",
                    "offset",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
          ],
        },
      },
      "reference_graph": {
        "fields": [
          {
            "name": "edges",
            "title": "Edges",
            "type": "`$ARRAY`",
            "req": True,
            "short": "All edges (references) in the graph.",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Metadata about the graph structure.",
          },
          {
            "name": "nodes",
            "title": "Nodes",
            "type": "`$ARRAY`",
            "req": True,
            "short": "All nodes in the graph, including the root.",
          },
          {
            "name": "root",
            "title": "Root",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The root node of the graph (the artifact for which references were requested).",
          },
        ],
        "name": "reference_graph",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "references",
                  },
                  {
                    "lit": "graph",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "references",
                  "graph",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "depth",
                      "orig": "depth",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 3,
                    },
                    {
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"OUTBOUND\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "depth",
                    "direction",
                    "group_id",
                    "version_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
      "role_mapping": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "principalId",
            "title": "Principal Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "principalName",
            "title": "Principal Name",
            "type": "`$STRING`",
            "short": "A friendly name for the principal.",
          },
          {
            "name": "role",
            "title": "Role",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "role_mapping",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/roleMappings",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "roleMappings",
                  },
                ],
                "parts": [
                  "admin",
                  "roleMappings",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.roleMappings`",
                },
                "args": {
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/roleMappings/{principalId}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "roleMappings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "admin",
                  "roleMappings",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "principalId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "principal_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "rule": {
        "fields": [
          {
            "name": "config",
            "title": "Config",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "ruleType",
            "title": "Rule Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "rule",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/rules",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "rules",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/rules",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "rules",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/rules",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "rules",
                  },
                ],
                "parts": [
                  "admin",
                  "rules",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "admin",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "VALIDITY",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "groupId": "group_id",
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "group_id",
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/admin/rules/{ruleType}",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "rules",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "admin",
                  "rules",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ruleType": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "rule_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "VALIDITY",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
          ],
        },
      },
      "searched_branch": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "branchId",
            "title": "Branch Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "systemDefined",
            "title": "System Defined",
            "type": "`$BOOLEAN`",
            "req": True,
          },
        ],
        "name": "searched_branch",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.branches`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "limit",
                    "offset",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
          ],
        },
      },
      "searched_group": {
        "fields": [
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "searched_group",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search/groups",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "groups",
                  },
                ],
                "parts": [
                  "search",
                  "groups",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.groups`",
                },
                "args": {
                  "query": [
                    {
                      "name": "description",
                      "orig": "description",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "label",
                      "orig": "label",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "description",
                    "group_id",
                    "label",
                    "limit",
                    "offset",
                    "order",
                    "orderby",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "system_info": {
        "fields": [
          {
            "name": "builtOn",
            "title": "Built On",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
          },
        ],
        "name": "system_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/system/info",
                "segments": [
                  {
                    "lit": "system",
                  },
                  {
                    "lit": "info",
                  },
                ],
                "parts": [
                  "system",
                  "info",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "usage_summary": {
        "fields": [
          {
            "name": "active",
            "title": "Active",
            "type": "`$INTEGER`",
            "req": True,
            "format": "int32",
          },
          {
            "name": "dead",
            "title": "Dead",
            "type": "`$INTEGER`",
            "req": True,
            "format": "int32",
          },
          {
            "name": "stale",
            "title": "Stale",
            "type": "`$INTEGER`",
            "req": True,
            "format": "int32",
          },
        ],
        "name": "usage_summary",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/admin/usage/summary",
                "segments": [
                  {
                    "lit": "admin",
                  },
                  {
                    "lit": "usage",
                  },
                  {
                    "lit": "summary",
                  },
                ],
                "parts": [
                  "admin",
                  "usage",
                  "summary",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user_info": {
        "fields": [
          {
            "name": "admin",
            "title": "Admin",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "developer",
            "title": "Developer",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "displayName",
            "title": "Display Name",
            "type": "`$STRING`",
          },
          {
            "name": "username",
            "title": "Username",
            "type": "`$STRING`",
          },
          {
            "name": "viewer",
            "title": "Viewer",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "user_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/users/me",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "lit": "me",
                  },
                ],
                "parts": [
                  "users",
                  "me",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user_interface_config": {
        "fields": [
          {
            "name": "auth",
            "title": "Auth",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "features",
            "title": "Features",
            "type": "`$OBJECT`",
          },
          {
            "name": "ui",
            "title": "Ui",
            "type": "`$OBJECT`",
          },
        ],
        "name": "user_interface_config",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/system/uiConfig",
                "segments": [
                  {
                    "lit": "system",
                  },
                  {
                    "lit": "uiConfig",
                  },
                ],
                "parts": [
                  "system",
                  "uiConfig",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "version": {
        "fields": [
          {
            "name": "artifactId",
            "title": "Artifact Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "artifactType",
            "title": "Artifact Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "branches",
            "title": "Branches",
            "type": "`$ARRAY`",
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "contentId",
            "title": "Content Id",
            "type": "`$INTEGER`",
            "req": True,
            "format": "int64",
          },
          {
            "name": "count",
            "title": "Count",
            "type": "`$INTEGER`",
            "req": True,
            "short": "The total number of versions that matched the query (may be more than the number of versions returned in the result set).",
          },
          {
            "name": "createdOn",
            "title": "Created On",
            "type": "`$STRING`",
            "req": True,
            "format": "date-time",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "globalId",
            "title": "Global Id",
            "type": "`$INTEGER`",
            "req": True,
            "format": "int64",
          },
          {
            "name": "groupId",
            "title": "Group Id",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "isDraft",
            "title": "Is Draft",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "labels",
            "title": "Labels",
            "type": "`$OBJECT`",
          },
          {
            "name": "modifiedBy",
            "title": "Modified By",
            "type": "`$STRING`",
          },
          {
            "name": "modifiedOn",
            "title": "Modified On",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "title": "Owner",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "value",
            "title": "Value",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "version",
            "title": "Version",
            "type": "`$STRING`",
            "op": {
              "list": {
                "req": True,
                "type": "`$STRING`",
              },
            },
          },
          {
            "name": "versions",
            "title": "Versions",
            "type": "`$ARRAY`",
            "req": True,
            "short": "The collection of artifact versions returned in the result set.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "version",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/search/versions",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "search",
                  "versions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "artifact_type",
                      "orig": "artifact_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "AVRO",
                    },
                    {
                      "name": "canonical",
                      "orig": "canonical",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "skip_count",
                      "orig": "skip_count",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
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
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": {
                    "version": "`reqdata`",
                  },
                  "res": "`body.labels`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                  "query": [
                    {
                      "name": "dry_run",
                      "orig": "dry_run",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "dry_run",
                    "group_id",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/search/versions",
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "search",
                  "versions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.versions`",
                },
                "args": {
                  "query": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "artifact_type",
                      "orig": "artifact_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "AVRO",
                    },
                    {
                      "name": "content",
                      "orig": "content",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "content_id",
                      "orig": "content_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "description",
                      "orig": "description",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "global_id",
                      "orig": "global_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "label",
                      "orig": "label",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "skip_count",
                      "orig": "skip_count",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "structure",
                      "orig": "structure",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "\"3.1.6\"",
                    },
                  ],
                },
                "select": {
                  "exist": [
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
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.versions`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "orderby",
                      "orig": "orderby",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "skip_count",
                      "orig": "skip_count",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "limit",
                    "offset",
                    "order",
                    "orderby",
                    "skip_count",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "branches",
                  },
                  {
                    "var": "branch_id",
                  },
                  {
                    "lit": "versions",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "branches",
                  "{branch_id}",
                  "versions",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "branchId": "branch_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.versions`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "branch_id",
                      "orig": "branch_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"latest\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "branch_id",
                    "group_id",
                    "limit",
                    "offset",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/content",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "content",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "content",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "canonical",
                      "orig": "canonical",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "reference",
                      "orig": "reference",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "content",
                  "exist": [
                    "artifact_id",
                    "canonical",
                    "group_id",
                    "reference",
                    "version_expression",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/export",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "export",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "export",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "export",
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "comment_id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "comments",
                  "{comment_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "commentId": "comment_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "comment_id",
                      "orig": "comment_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "comment_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PUT",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments/{commentId}",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_id",
                  },
                  {
                    "lit": "comments",
                  },
                  {
                    "var": "comment_id",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_id}",
                  "comments",
                  "{comment_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "commentId": "comment_id",
                    "groupId": "group_id",
                    "versionExpression": "version_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "comment_id",
                      "orig": "comment_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_id",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "comment_id",
                    "group_id",
                    "version_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.branch",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
            ],
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.comment",
            ],
          ],
        },
      },
      "well_known": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
          "parts": [
            "group_id",
            "artifact_id",
          ],
          "sep": "/",
        },
        "name": "well_known",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/agents/{groupId}/{artifactId}",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "agents",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "var": "artifact_id",
                  },
                ],
                "parts": [
                  "well-known",
                  "agents",
                  "{group_id}",
                  "{artifact_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/mcp-tools/{groupId}/{artifactId}",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "mcp-tools",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "var": "artifact_id",
                  },
                ],
                "parts": [
                  "well-known",
                  "mcp-tools",
                  "{group_id}",
                  "{artifact_id}",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/well-known/schemas/{schemaType}/{version}",
                "segments": [
                  {
                    "lit": "well-known",
                  },
                  {
                    "lit": "schemas",
                  },
                  {
                    "var": "schema_type",
                  },
                  {
                    "var": "version",
                  },
                ],
                "parts": [
                  "well-known",
                  "schemas",
                  "{schema_type}",
                  "{version}",
                ],
                "rename": {
                  "param": {
                    "schemaType": "schema_type",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "schema_type",
                      "orig": "schema_type",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "version",
                      "orig": "version",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "schema_type",
                    "version",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.agent",
            ],
            [
              "$.main.kit.entity.mcp_tool",
            ],
          ],
        },
      },
      "wrapped_version_state": {
        "fields": [
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "req": True,
            "short": "Describes the state of an artifact or artifact version.",
          },
        ],
        "name": "wrapped_version_state",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state",
                "segments": [
                  {
                    "lit": "groups",
                  },
                  {
                    "var": "group_id",
                  },
                  {
                    "lit": "artifacts",
                  },
                  {
                    "var": "artifact_id",
                  },
                  {
                    "lit": "versions",
                  },
                  {
                    "var": "version_expression",
                  },
                  {
                    "lit": "state",
                  },
                ],
                "parts": [
                  "groups",
                  "{group_id}",
                  "artifacts",
                  "{artifact_id}",
                  "versions",
                  "{version_expression}",
                  "state",
                ],
                "rename": {
                  "param": {
                    "artifactId": "artifact_id",
                    "groupId": "group_id",
                    "versionExpression": "version_expression",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "artifact_id",
                      "orig": "artifact_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"example-artifact\"",
                    },
                    {
                      "name": "group_id",
                      "orig": "group_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "\"my-group\"",
                    },
                    {
                      "name": "version_expression",
                      "orig": "version_expression",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "artifact_id",
                    "group_id",
                    "version_expression",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.group",
              "$.main.kit.entity.artifact",
              "$.main.kit.entity.version",
            ],
          ],
        },
      },
    },
    }
