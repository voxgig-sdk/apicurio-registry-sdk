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
(0, node_test_1.describe)('ArdExploreEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.ArdExplore();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ard_explore.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "facets": { "a": true, "h": "Facets", "n": "facets", "r": false, "sh": "Facets keyed by the requested facet field name.", "t": "`$OBJECT`", "key$": "facets", "index$": 0 }, "query": { "a": true, "h": "Query", "n": "query", "r": false, "sh": "ARD search query.", "t": "`$OBJECT`", "key$": "query", "index$": 1 }, "resultType": { "a": true, "h": "Result Type", "n": "resultType", "op": { "create": { "req": true, "type": "`$OBJECT`" } }, "r": false, "sh": "Requested result type for the ARD POST /explore endpoint.", "t": "`$STRING`", "key$": "resultType", "index$": 2 } }, "name": "ard_explore", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /well-known/ard/explore", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/well-known/ard/explore", "q": {}, "r": {}, "s": [{ "lit": "well-known" }, { "lit": "ard" }, { "lit": "explore" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "ard_explore", "name__orig": "ard_explore", "Name": "ArdExplore", "name_": "ard_explore", "name-": "ard-explore", "NAME": "ARD_EXPLORE", "index$": 4 }, { "active": true, "entity": "ard_explore", "key$": "BasicArdExploreFlow", "kind": "basic", "name": "BasicArdExploreFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ard_explore_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ArdExplore', { "POST /well-known/ard/explore": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "Request body for the ARD POST /explore endpoint.", "required": ["resultType"], "type": "object", "properties": { "query": { "description": "ARD search query.", "type": "object", "properties": { "text": { "type": "string" }, "filter": { "description": "ARD search filter map; keys are filter names (type, tags, capabilities, publisher) and values are the list of accepted values for that filter (OR semantics within a key, AND semantics across keys).", "type": "object", "additionalProperties": { "type": "array", "items": {} }, "x-ref": "#/components/schemas/ArdFilter" } }, "x-ref": "#/components/schemas/ArdSearchQuery", "key$": "query" }, "resultType": { "description": "Requested result type for the ARD POST /explore endpoint.", "required": ["facets"], "type": "object", "properties": { "facets": { "type": "array", "items": { "description": "A single facet request for the ARD POST /explore endpoint.", "required": [], "type": "object", "properties": {}, "x-ref": "#/components/schemas/ArdFacetRequest" } } }, "x-ref": "#/components/schemas/ArdResultType", "key$": "resultType" } }, "x-ref": "#/components/schemas/ArdExploreRequest", "index$": 1 } } }, "required": true }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ard_explore_ref01_ent = client.ArdExplore();
        let ard_explore_ref01_data = setup.data.new.ard_explore['ard_explore_ref01'];
        ard_explore_ref01_data = (await ard_explore_ref01_ent.create(ard_explore_ref01_data)).data();
        (0, node_assert_1.default)(null != ard_explore_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ard_explore/ArdExploreTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ard_explore01', 'ard_explore02', 'ard_explore03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_ARD_EXPLORE_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_ARD_EXPLORE_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_ARD_EXPLORE_ENTID'];
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
//# sourceMappingURL=ArdExploreEntity.test.js.map