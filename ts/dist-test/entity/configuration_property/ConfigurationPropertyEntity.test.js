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
(0, node_test_1.describe)('ConfigurationPropertyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.ConfigurationProperty();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'configuration_property.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": true, "t": "`$STRING`", "key$": "description", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "label": { "a": true, "h": "Label", "n": "label", "r": true, "t": "`$STRING`", "key$": "label", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 3 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 4 }, "value": { "a": true, "h": "Value", "n": "value", "r": true, "t": "`$STRING`", "key$": "value", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "configuration_property", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /admin/config/properties", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/admin/config/properties", "q": {}, "r": {}, "s": [{ "lit": "admin" }, { "lit": "config" }, { "lit": "properties" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /admin/config/properties/{propertyName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "propertyName", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/admin/config/properties/{propertyName}", "q": { "exist": ["id"] }, "r": { "param": { "propertyName": "id" } }, "s": [{ "lit": "admin" }, { "lit": "config" }, { "lit": "properties" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "configuration_property", "name__orig": "configuration_property", "Name": "ConfigurationProperty", "name_": "configuration_property", "name-": "configuration-property", "NAME": "CONFIGURATION_PROPERTY", "index$": 12 }, { "active": true, "entity": "configuration_property", "key$": "BasicConfigurationPropertyFlow", "kind": "basic", "name": "BasicConfigurationPropertyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "configuration_property_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "configuration_property_ref01", "srcdatavar": "configuration_property_ref01_data", "suffix": "_dt0" }, "m": { "id": "configuration_property01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-configuration_property_ref01" } }], "index$": 1 }] }, 'ConfigurationProperty', { "GET /admin/config/properties": { "protocol": "http", "parameters": [] }, "GET /admin/config/properties/{propertyName}": { "protocol": "http", "parameters": [{ "name": "propertyName", "description": "The name of a configuration property.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let configuration_property_ref01_data = Object.values(setup.data.existing.configuration_property)[0];
        // LIST
        const configuration_property_ref01_ent = client.ConfigurationProperty();
        const configuration_property_ref01_match = {};
        const configuration_property_ref01_list = (await configuration_property_ref01_ent.list(configuration_property_ref01_match)).map((e) => e.data());
        // LOAD
        const configuration_property_ref01_match_dt0 = {};
        configuration_property_ref01_match_dt0.id = configuration_property_ref01_data.id;
        const configuration_property_ref01_data_dt0 = (await configuration_property_ref01_ent.load(configuration_property_ref01_match_dt0)).data();
        (0, node_assert_1.default)(configuration_property_ref01_data_dt0.id === configuration_property_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/configuration_property/ConfigurationPropertyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['configuration_property01', 'configuration_property02', 'configuration_property03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_CONFIGURATION_PROPERTY_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_CONFIGURATION_PROPERTY_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_CONFIGURATION_PROPERTY_ENTID'];
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
//# sourceMappingURL=ConfigurationPropertyEntity.test.js.map