"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WellKnownEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.WellKnown();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'well_known.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id", "parts": ["group_id", "artifact_id"], "sep": "/" }, "name": "well_known", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /well-known/agents/{groupId}/{artifactId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/well-known/agents/{groupId}/{artifactId}", "q": { "exist": ["artifact_id", "group_id", "version"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "well-known" }, { "lit": "agents" }, { "var": "group_id" }, { "var": "artifact_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /well-known/mcp-tools/{groupId}/{artifactId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/well-known/mcp-tools/{groupId}/{artifactId}", "q": { "exist": ["artifact_id", "group_id", "version"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "well-known" }, { "lit": "mcp-tools" }, { "var": "group_id" }, { "var": "artifact_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /well-known/schemas/{schemaType}/{version}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "schema_type", "or": "schema_type", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "version", "or": "version", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/well-known/schemas/{schemaType}/{version}", "q": { "exist": ["schema_type", "version"] }, "r": { "param": { "schemaType": "schema_type" } }, "s": [{ "lit": "well-known" }, { "lit": "schemas" }, { "var": "schema_type" }, { "var": "version" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.agent"], ["$.main.kit.entity.mcp_tool"]] }, "key$": "well_known", "name__orig": "well_known", "Name": "WellKnown", "name_": "well_known", "name-": "well-known", "NAME": "WELL_KNOWN", "index$": 42 }, { "active": true, "entity": "well_known", "key$": "BasicWellKnownFlow", "kind": "basic", "name": "BasicWellKnownFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "well_known_ref01", "srcdatavar": "well_known_ref01_data", "suffix": "_dt0" }, "m": { "id": "well_known01", "schema_type": "schema_type01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-well_known_ref01" } }], "index$": 0 }] }, 'WellKnown', { "GET /well-known/agents/{groupId}/{artifactId}": { "protocol": "http", "parameters": [{ "name": "groupId", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }, { "name": "version", "schema": { "type": "string" }, "in": "query", "index$": 2 }] }, "GET /well-known/mcp-tools/{groupId}/{artifactId}": { "protocol": "http", "parameters": [{ "name": "groupId", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }, { "name": "version", "schema": { "type": "string" }, "in": "query", "index$": 2 }] }, "GET /well-known/schemas/{schemaType}/{version}": { "protocol": "http", "parameters": [{ "name": "schemaType", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "version", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let well_known_ref01_data = Object.values(setup.data.existing.well_known)[0];
        // LOAD
        const well_known_ref01_ent = client.WellKnown();
        const well_known_ref01_match_dt0 = {};
        well_known_ref01_match_dt0.id = well_known_ref01_data.id;
        const well_known_ref01_data_dt0 = (await well_known_ref01_ent.load(well_known_ref01_match_dt0)).data();
        (0, node_assert_1.default)(well_known_ref01_data_dt0.id === well_known_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/well_known/WellKnownTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['well_known01', 'well_known02', 'well_known03', 'agent01', 'agent02', 'agent03', 'mcp_tool01', 'mcp_tool02', 'mcp_tool03', 'schema_type01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_WELL_KNOWN_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ApicurioRegistrySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                server: {
                    registry: env.APICURIO_REGISTRY_SERVER_REGISTRY,
                },
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.APICURIO_REGISTRY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WellKnownEntity.test.js.map