# apicurio-registry-mcp

[MCP](https://modelcontextprotocol.io) server exposing the ApicurioRegistry SDK as
two agent tools — `apicurio-registry_list` and `apicurio-registry_load` — built on the
[official Go MCP SDK](https://github.com/modelcontextprotocol/go-sdk) and the
sibling Go SDK at `../go`. Runs over **stdio** (default, for spawnable installs)
or **streamable HTTP** (one shared server for several agents).

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/apicurio-registry-mcp)
make build

# 2. Provide credentials via the environment
export APICURIO_REGISTRY_APIKEY=sk_live_xxx

# 3a. Install into Claude Code over stdio (most common)
claude mcp add --scope user apicurio-registry \
  -- /absolute/path/to/apicurio-registry-mcp -transport stdio

# 3b. …or run a shared HTTP server instead
./apicurio-registry-mcp -transport http -addr :8080
```

Tool-call arguments (what an agent sends):

```jsonc
// apicurio-registry_list: first page of records
{ "entity": "agent" }
{ "entity": "agent", "query": { } }

// apicurio-registry_load: one record by id
{ "entity": "artifact", "query": { "id": 1 } }
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: install and call a tool

1. **Build** the server from this `go-mcp/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/apicurio-registry-mcp
   ```

2. **Set your API key:**

   ```sh
   export APICURIO_REGISTRY_APIKEY=sk_live_xxx
   ```

3. **Install it into Claude Code** (stdio transport):

   ```sh
   claude mcp add --scope user apicurio-registry \
     -- "$PWD"/dist/*/apicurio-registry-mcp -transport stdio
   ```

4. **Restart Claude Code.** The `apicurio-registry_list` and `apicurio-registry_load` tools now appear
   in new sessions. Ask the agent to *"list agent using apicurio-registry"*
   and it calls `apicurio-registry_list` with `{"entity":"agent"}`.

## How-to guides

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export APICURIO_REGISTRY_APIKEY=sk_live_xxx            # API key
export APICURIO_REGISTRY_BASE=https://api.example.com  # optional: override the API base URL
```

Set these in the shell that launches the server (or in the `claude mcp add`
environment) so every tool call is authenticated.

### Run as a shared HTTP server

```sh
./apicurio-registry-mcp -transport http -addr :8080
```

Streamable HTTP lets several agents share one running process; stdio (the
default) spawns a fresh process per client.

### Call the `apicurio-registry_list` tool

Args: `entity` (required), `query` (optional filter map). Returns the first
page of records as JSON:

```jsonc
{ "entity": "agent" }
```

### Call the `apicurio-registry_load` tool

Args: `entity` (required), `query` = `{"id":N}` (required). Returns the single
record as JSON:

```jsonc
{ "entity": "artifact", "query": { "id": 1 } }
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

## Reference

### Tools

| Tool | Args | Returns |
|------|------|---------|
| `apicurio-registry_list` | `entity` (required), `query` (optional map) | First page of records as JSON |
| `apicurio-registry_load` | `entity` (required), `query` = `{id:N}` | Single record as JSON |

On error, a tool returns an MCP error result (`isError: true`) whose text is the
failure message (e.g. unknown entity, or an API error).

### `Args` schema

Both tools take the same argument object:

| Field | Type | Notes |
|-------|------|-------|
| `entity` | string | One of the 44 supported entities (see below). |
| `query` | object | Optional match map. `{"id":N}` for load; omit or `{}` for list. |

JSON schemas are emitted by the SDK from the `Args` struct's `json` /
`jsonschema` tags — no schema is hand-written.

### Transports & flags

| Flag | Default | Purpose |
|------|---------|---------|
| `-transport` | `stdio` | `stdio` (spawnable) or `http` (streamable HTTP). |
| `-addr` | `:8080` | Listen address for the `http` transport. |

### Environment variables

| Variable | Purpose |
|----------|---------|
| `APICURIO_REGISTRY_APIKEY` | API key sent with every request. |
| `APICURIO_REGISTRY_BASE` | Optional override of the API base URL. |

### Entities

The 44 entities valid as the `entity` argument:

admin | agent | agent_card | ai_catalog | ard_explore | ard_search | artifact | artifact_reference | artifact_rule | artifact_type | branch | comment | configuration_property | consumer_version_heatmap | content | contract | contract_rule | contract_rule_set | create_artifact | deprecation_readiness | download_ref | git_op | git_ops_status | git_ops_validate_task | global_rule | group | group_rule | kafka_sql | mcp_tool | metadata | odcs_contract_result | odcs_contract_summary | reference_graph | role_mapping | rule | searched_branch | searched_group | system_info | usage_summary | user_info | user_interface_config | version | well_known | wrapped_version_state

### Smoke test via HTTP (raw JSON-RPC)

```sh
./apicurio-registry-mcp -transport http -addr :18080 &

# initialize, grab the session id
curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -D headers \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"0"}}}'

SESSION=$(awk '/Mcp-Session-Id/ {print $2}' headers | tr -d '\r')

curl -sN -X POST http://localhost:18080 \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Mcp-Session-Id: $SESSION" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"apicurio-registry_load","arguments":{"entity":"artifact","query":{"id":1}}}}'
```

## Explanation

### How tools map to the SDK

`main.go` builds the SDK client (configured from the environment) and registers
two tools. Each dispatches on the `entity` argument to the matching entity in
the sibling Go SDK at `../go`, calls `List` or `Load`, unwraps the `Entity`
wrappers to plain data, and returns it as pretty-printed JSON.

### Why two transports

**stdio** is the standard for agent hosts that spawn a server per client
(Claude Code's `claude mcp add`). **streamable HTTP** keeps one process running
that many agents can share — handy for a long-lived deployment.

### Schema generation

The input schema is derived from the `Args` Go struct's `json` / `jsonschema`
tags at registration time, so the advertised tool schema can never drift from
the code that consumes it.

## Generated by

sdkgen `go-mcp` target. See the target source under `.sdk/src/cmp/go-mcp/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-mcp/`.
