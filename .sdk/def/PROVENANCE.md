# Provenance of apicurio-registry-openapi.json

- **API:** Apicurio Registry, an open-source schema and API registry (apicur.io).
- **Source:** <https://raw.githubusercontent.com/Apicurio/apicurio-registry/688e5b50216080b391cff4918fc83d3312115620/common/src/main/resources/META-INF/openapi.json>
- **What it is:** The v3 definition in the registry's own repository at tag 3.3.3 (688e5b5), the file its SDKs are generated from.
- **Retrieved:** 2026-09-28T20:35:54Z
- **SHA-256:** `ff83e83c3e304bcfa053efb83e9955f24fead6b6d5e7694635806e5f58581531` as retrieved;
  `81cb9b7e9ed3a416c75c07def97502a83f797fe381d4807d057700696bd369f4` as committed, after the one change below.
- **Definition:** OpenAPI 3.0.3, `info.version` 3.3.x, 82 paths, 132 operations, 342 KB.
- **Licence:** Apache 2.0.
- **Changes:** one addition, nothing removed or altered. The definition ships no
  `servers`, because the registry is self-hosted, and apidef needs `servers[0].url`.
  Its own `info.description` states that the API "is available from
  `https://MY-REGISTRY-URL/apis/registry/v3` by default", so a `servers` entry
  saying exactly that was inserted after `openapi`, with the host as a server
  variable: `https://{registry}/apis/registry/v3`, default `MY-REGISTRY-URL`. The
  generated SDKs therefore require `server: { registry: '...' }` at construction, or
  a whole `base`. Every other byte is the vendor's. The same injection was made for
  `customs-window` in the cedar fleet.

## Why this SDK exists

It is on the admin repository's **vergleich** list: SDKs built with the Voxgig
toolchain to compare it with the generators on voxgig.com/sdk/comparisons, one
API per generator. This one is compared with **Kiota**.

- **Compared with:** `@apicurio/apicurio-registry-sdk` 3.3.3 (TypeScript, Kiota's preview target) and `apicurioregistrysdk` 3.3.3 (Python, a stable Kiota target), both in Apicurio/apicurio-registry. Its Go and Java SDKs are Kiota output too.
