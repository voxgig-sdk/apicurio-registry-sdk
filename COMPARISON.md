# Apicurio Registry: the Voxgig SDK and the Kiota SDK compared

Vergleich: Kiota. Compared with @apicurio/apicurio-registry-sdk 3.3.3 (TypeScript, Kiota preview) and apicurioregistrysdk 3.3.3 (Python). Spec: apicurio-registry tag 3.3.3 common/src/main/resources/META-INF/openapi.json, OAS 3.0.3, 82 paths / 132 ops, Apache 2.0. Added 2026-09-28.

This repository is on the admin **vergleich** list. It is built only to be compared, and it is not published.

## Scorecard

| | Voxgig | Kiota |
|---|---|---|
| SDK | this repository, commit `06c3c8a`: eight targets (go, go-cli, go-mcp, ts, py, rb, lua, php) | `@apicurio/apicurio-registry-sdk@3.3.3` (TypeScript) |
| Input | `apicurio-registry-openapi.json`: OAS 3.0.3, `info.version` 3.3.x, 82 paths, 132 operations | the vendor's own generation; the note above names the definition version it came from |
| Operations callable | 132 of 132 | 132 operation methods |
| Entities | 44 | not applicable |
| ts package | 2.71 MB, 420 files | 0.64 MB, 115 files |
| Runtime dependencies | 0 | 0 + 6 peer |
| Generated tests | ts 377 pass / 0 fail; py 372 pass; rb 396 runs / 0 fail; lua 370 pass / 0 fail; php 396 tests, 0 fail; go, go-cli, go-mcp build, vet and test | not run: a published package |
| Determinism | a second generation on the same toolchain is byte-identical | not measured |
| Scenario against a mock | 2 of 4 steps right, 2 returned wrong data, 0 request violations (static) | 4 of 4 steps right, 0 request violations (static) |

## Features

Voxgig's features are opt-in; these builds enable the standard set. The Kiota column is read from the published package, with the evidence below.

| Feature | Voxgig | Kiota |
|---|---|---|
| Retries | yes | partial |
| Timeouts | yes | no |
| Pagination helper | partial | no |
| Idempotency keys | yes | no |
| Rate-limit handling | yes | partial |
| Logging / debug | yes | no |
| Built-in offline test mode | yes | no |
| Metrics / telemetry | partial | partial |
| Cancellation | yes | no |
| Hooks / middleware | yes | yes |

**Evidence, Kiota.**

- Retries: Only via Kiota RetryHandler: createRegistryClient (dist/main.js) uses MiddlewareFactory.getPerformanceMiddlewares(), which README.md says includes retry; defaults are in the peer, not unpacked
- Timeouts: No timeout option: createRegistryClient(baseUrl, authProvider?, middlewares?, useDefaultMiddlewares?) has none, 'timeout' appears nowhere in dist/, and README's default chain lists no timeout
- Pagination helper: No iterator: search/list ops take limit/offset query params (e.g. dist/generated-client/search/artifacts/index.d.ts); 'paginated' only appears in endpoint descriptions
- Idempotency keys: Searched 'idempot' in dist/main.js and all dist/**/*.d.ts: no key generated or sent
- Rate-limit handling: No SDK code for it; any 429/Retry-After handling would come from Kiota's RetryHandler in getPerformanceMiddlewares() (dist/main.js), whose behaviour is in the peer (not unpacked)
- Logging / debug: No logger, log level or env var in dist/main.js or dist/sdk/factory.d.ts; README's default chain (retry, redirect, param decoding, user agent, headers inspection, compression) has no logging
- Built-in offline test mode: No mock or test mode in dist/; searched mock/fake/stub/testmode; the SDK wires no test middleware
- Metrics / telemetry: SDK wires none ('usage metrics' is an API endpoint); any tracing would be Kiota's own OpenTelemetry support in FetchRequestAdapter, built in dist/main.js (peer, not unpacked)
- Cancellation: No AbortSignal in dist/ (only model-doc hits); generated methods take requestConfiguration?, documented as 'headers, query parameters, and middleware options'
- Hooks / middleware: dist/sdk/factory.d.ts RegistryClientFactory.createRegistryClient(baseUrl, authProvider?, middlewares?: Middleware[], useDefaultMiddlewares?): custom Kiota middleware appended or replacing defaults
- Auth: Second argument of RegistryClientFactory.createRegistryClient: authProvider?: AuthenticationProvider (Kiota). When omitted it falls back to AnonymousAuthenticationProvider (dist/main.js). The SDK has no API-key or token helper of its own; createApicurioRegistryClient(requestAdapter) also accepts a caller-built Kiota adapter.
- Errors: Status-mapped, not typed per status: each operation's errorMappings (400/401/403/404/405/409/422/500) resolve to ProblemDetails, which extends Kiota ApiError (dist/generated-client/models/index.d.ts); two 400 mappings use RuleViolationProblemDetails.

**Evidence, Voxgig.**

- Retries: retry feature: 408, 425, 429 and 5xx, honouring Retry-After.
- Timeouts: timeout feature: 30 s per attempt by default.
- Pagination helper: paging feature: page and cursor state carried between calls (ctrl.paging); no iterator.
- Idempotency keys: idempotency feature: generates an Idempotency-Key for mutating calls, stable across retries.
- Rate-limit handling: ratelimit feature: client-side token bucket; retry honours Retry-After on 429.
- Logging / debug: debug feature: request and response logging with auth headers redacted.
- Built-in offline test mode: test feature: an offline mock transport; every generated suite runs on it.
- Metrics / telemetry: metrics feature: per-operation counts and timings; no OpenTelemetry.
- Cancellation: an AbortSignal per call (callopts.signal).
- Hooks / middleware: extend: custom features hook every pipeline stage.

## Scenario

✓ right, ⚠ returned without error but with the wrong data, ✗ failed.

Each SDK lists one resource, loads and removes the first item it listed, and creates one from the definition's own example or required fields, against a mock built from the same vendor definition. The mock is Prism: static mode answers with the definition's examples, and dynamic mode generates schema-valid data. Each SDK is credited with its better mode. Request violations are Prism's verdicts on what the SDK sent.

- **Voxgig, static:** 2 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ⚠ `load`: returned the group's labels map (empty), not the group
  - ⚠ `create`: returned the group's labels map, not the group
  - ✓ `remove`
- **Voxgig, dynamic:** 2 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ⚠ `load`: returned the group's labels map (empty), not the group
  - ⚠ `create`: returned the group's labels map, not the group
  - ✓ `remove`
- **Kiota, static:** 4 of 4 steps right, 0 request violations.
  - ✗ `create-default-compressed`: {"additionalData":{"error":{"code":"invalid_json","message":"Invalid JSON"}},"responseStatusCode":400,"responseHeaders":{"access-control-allow-credentials":["tr
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
  - ✓ `remove`
- **Kiota, dynamic:** 4 of 4 steps right, 0 request violations.
  - ✗ `create-default-compressed`: {"additionalData":{"error":{"code":"invalid_json","message":"Invalid JSON"}},"responseStatusCode":400,"responseHeaders":{"access-control-allow-credentials":["tr
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
  - ✓ `remove`

## Voxgig toolchain findings

- **UNWRAP** (@voxgig/apidef 8.17.2). The response transform that says where an operation's data sits is inferred wrongly for several resources, in both directions. A schema whose one object-valued property is ordinary data is taken for an envelope (Apicurio's `labels`, SaladCloud's `container`), and a real envelope is missed when it is composed with allOf (Lob) or sits beside another property (Neon's `projects` beside `pagination`). The SDKs' own tests cannot see it, because they mock from the same model; a mock built from the vendor definition does. Here: apicurio group load and create: `body.labels`, the group's labels map, because `labels` is GroupMetaData's one object-valued property. Reported, not changed: heuristic design in apidef.
- **QUERY-ECHO** (@voxgig/sdkgen 4.30.2 (PrepareQuery: ts, js and rb read the field; other targets not checked)). Every match field, path parameters included, is also sent as a query parameter: GET /video/v1/assets/a1?id=a1 (Mux), GET /assistant/asst_1?id=asst_1 (Vapi), DELETE .../containers/web?id=web&organization_name=acme&project_id=demo (SaladCloud). prepareQuery excludes names in point.params, but the generated config carries path parameters in point.args.params (which prepareParams reads), so nothing is excluded. Harmless to a lenient server, rejected by a strict one. Prism logs paths without query strings, so its runs did not show it. Reported, not changed: the same exclusion exists per target.
- **SERVERS** (@voxgig/apidef 8.17.2). apidef requires servers[0].url; Apicurio's definition ships none because the registry is self-hosted. The server its own description states was injected, as the cedar fleet did for customs-window. Recorded in PROVENANCE.md.

## Kiota SDK notes

- Gzips request bodies by default, which Prism cannot read; the README's documented opt-out (useDefaultMiddlewares = false) was used for the scenario. Its retry and telemetry come from Kiota's default middleware, not the SDK.

## How this was measured

- Operations: the definition's operations are counted over its paths. Voxgig's are the generated model's points, less those under an op no target generates. The compared SDK's are the operation methods in its published package, counted per generator (method declarations, request-builder verbs, or functions per operation).
- Package size and file count: `npm pack --dry-run` for the Voxgig ts target, and the registry's `dist.unpackedSize` and `dist.fileCount` for the compared package.
- Tests: `admin/scripts/cedar-test-all.sh` runs each target's generated suite.
- Features: read from the code of the published package, crediting a feature only for a mechanism, not a word in the API's own models.

