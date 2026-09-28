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
(0, node_test_1.describe)('ConsumerVersionHeatmapEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.ConsumerVersionHeatmap();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'consumer_version_heatmap.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "clientId": { "a": true, "h": "Client Id", "n": "clientId", "r": true, "t": "`$STRING`", "key$": "clientId", "index$": 0 }, "driftAlert": { "a": true, "h": "Drift Alert", "n": "driftAlert", "r": false, "t": "`$BOOLEAN`", "key$": "driftAlert", "index$": 1 }, "versions": { "a": true, "h": "Versions", "n": "versions", "r": false, "t": "`$OBJECT`", "key$": "versions", "index$": 2 }, "versionsBehind": { "a": true, "fo": "int32", "h": "Versions Behind", "n": "versionsBehind", "r": false, "t": "`$INTEGER`", "key$": "versionsBehind", "index$": 3 } }, "name": "consumer_version_heatmap", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /admin/usage/artifacts/{groupId}/{artifactId}/heatmap", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/admin/usage/artifacts/{groupId}/{artifactId}/heatmap", "q": { "exist": ["artifact_id", "group_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "admin" }, { "lit": "usage" }, { "lit": "artifacts" }, { "var": "group_id" }, { "var": "artifact_id" }, { "lit": "heatmap" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.artifact"]] }, "key$": "consumer_version_heatmap", "name__orig": "consumer_version_heatmap", "Name": "ConsumerVersionHeatmap", "name_": "consumer_version_heatmap", "name-": "consumer-version-heatmap", "NAME": "CONSUMER_VERSION_HEATMAP", "index$": 13 }, { "active": true, "entity": "consumer_version_heatmap", "key$": "BasicConsumerVersionHeatmapFlow", "kind": "basic", "name": "BasicConsumerVersionHeatmapFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "artifact_id": "artifact01", "group_id": "group01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "consumer_version_heatmap_ref01" } }], "index$": 0 }] }, 'ConsumerVersionHeatmap', { "GET /admin/usage/artifacts/{groupId}/{artifactId}/heatmap": { "protocol": "http", "parameters": [{ "name": "groupId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "artifactId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let consumer_version_heatmap_ref01_data = Object.values(setup.data.existing.consumer_version_heatmap)[0];
        // LIST
        const consumer_version_heatmap_ref01_ent = client.ConsumerVersionHeatmap();
        const consumer_version_heatmap_ref01_match = {};
        consumer_version_heatmap_ref01_match['artifact_id'] = setup.idmap['artifact01'];
        consumer_version_heatmap_ref01_match['group_id'] = setup.idmap['group01'];
        const consumer_version_heatmap_ref01_list = (await consumer_version_heatmap_ref01_ent.list(consumer_version_heatmap_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/consumer_version_heatmap/ConsumerVersionHeatmapTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['consumer_version_heatmap01', 'consumer_version_heatmap02', 'consumer_version_heatmap03', 'artifact01', 'artifact02', 'artifact03', 'group01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_CONSUMER_VERSION_HEATMAP_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_CONSUMER_VERSION_HEATMAP_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_CONSUMER_VERSION_HEATMAP_ENTID'];
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
//# sourceMappingURL=ConsumerVersionHeatmapEntity.test.js.map