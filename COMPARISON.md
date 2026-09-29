# Apicurio Registry: the Voxgig SDK and the Kiota SDK compared

Vergleich: Kiota. Compared with @apicurio/apicurio-registry-sdk 3.3.3 (TypeScript, Kiota preview) and apicurioregistrysdk 3.3.3 (Python). Spec: apicurio-registry tag 3.3.3 common/src/main/resources/META-INF/openapi.json, OAS 3.0.3, 82 paths / 132 ops, Apache 2.0. Added 2026-09-28. Rebuilt 2026-09-29 on sdkgen 4.32.1 and apidef 8.22.0.

This repository is on the admin **vergleich** list. It is built only to be compared, and it is not published.

## Scorecard

| | Voxgig | Kiota |
|---|---|---|
| SDK | this repository, commit `2277c42`: eight targets (go, go-cli, go-mcp, ts, py, rb, lua, php) | `@apicurio/apicurio-registry-sdk@3.3.3` (TypeScript) |
| Input | `apicurio-registry-openapi.json`: OAS 3.0.3, `info.version` 3.3.x, 82 paths, 132 operations | the vendor's own generation; the note above names the definition version it came from |
| Operations callable | 132 of 132 | 132 operation methods |
| Entities | 43 | not applicable |
| ts package | 2.74 MB, 416 files | 0.64 MB, 115 files |
| Runtime dependencies | 0 | 0 + 6 peer |
| Generated tests | ts 509 pass / 0 fail / 8 skipped; py 372 pass / 57 skipped; rb 396 runs / 0 fail; lua 370 pass / 0 fail; php 396 tests / 0 fail; go, go-cli, go-mcp build, vet and test | not run: a published package |
| Determinism | a second generation on the same toolchain is byte-identical | not measured |
| Scenario against a mock | 4 of 4 steps right, 0 returned wrong data, 0 request violations (static) | 4 of 4 steps right, 0 request violations (static) |

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

- **Voxgig, static:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
  - ✓ `remove`
- **Voxgig, dynamic:** 4 of 4 steps right, 0 request violations.
  - ✓ `list`
  - ✓ `load`
  - ✓ `create`
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

- **UNWRAP** (@voxgig/apidef). The response transform that says where an operation's data sits was inferred wrongly for several resources in the first build. Here: a group's load and create read `body.labels`, because `labels` is GroupMetaData's one object-valued property. Fixed in apidef 8.18.0 (voxgig/apidef#100), which reads a single item beside other data as a record.
- **QUERY-ECHO** (@voxgig/sdkgen, PrepareQuery). Every match field, path parameters included, was also sent as a query parameter, such as `?id=` on a load. Fixed in voxgig/sdkgen#222, released in 4.31.0: query parameters go out under the definition's names, and the rebuild's scenario requests carry no echoed parameter.
- **DOCS-QA** (@voxgig/docgen, the generated Documentation workflow). The generated API pages quote the vendor's own descriptions, and the workflow runs its prose checks over them, so the step fails on the vendor's identifiers and repeated words rather than on anything the generator wrote. Open: voxgig/docgen#33.
- **SERVERS** (@voxgig/apidef). apidef required servers[0].url, and Apicurio's definition ships none because the registry is self-hosted. apidef 8.20.0 accepts a definition with no server; this build keeps the server the definition's own description states, injected and recorded in PROVENANCE.md, and you pass your host as the `registry` server variable.

## Kiota SDK notes

- Gzips request bodies by default, which Prism cannot read; the README's documented opt-out (useDefaultMiddlewares = false) was used for the scenario. Its retry and telemetry come from Kiota's default middleware, not the SDK.

## How this was measured

- Operations: the definition's operations are counted over its paths. Voxgig's are the generated model's points, less those under an op no target generates. The compared SDK's are the operation methods in its published package, counted per generator (method declarations, request-builder verbs, or functions per operation).
- Package size and file count: `npm pack --dry-run` for the Voxgig ts target, and the registry's `dist.unpackedSize` and `dist.fileCount` for the compared package.
- Tests: `admin/scripts/cedar-test-all.sh` runs each target's generated suite.
- Features: read from the code of the published package, crediting a feature only for a mechanism, not a word in the API's own models.
- Rebuild: 2026-09-29, on create-sdkgen 0.30.4, sdkgen 4.32.1, apidef 8.22.0, model 12.0.0 and @tabnas/yaml 0.5.14, all as published, with no overlay.
- Tests on the rebuild: all eight targets, the lua suite under Lua 5.4 with busted 2.2.0.
- Scenario on the rebuild: the Voxgig side was re-run on 2026-09-29; the compared SDK's run is from 2026-09-28, and its package is unchanged. The generated create input honours the definition's minimums, which the first run did not.
