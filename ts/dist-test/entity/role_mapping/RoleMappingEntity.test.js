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
(0, node_test_1.describe)('RoleMappingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.RoleMapping();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'role_mapping.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "principalId": { "a": true, "h": "Principal Id", "n": "principalId", "r": true, "t": "`$STRING`", "key$": "principalId", "index$": 1 }, "principalName": { "a": true, "h": "Principal Name", "n": "principalName", "r": false, "sh": "A friendly name for the principal.", "t": "`$STRING`", "key$": "principalName", "index$": 2 }, "role": { "a": true, "h": "Role", "n": "role", "r": true, "t": "`$STRING`", "key$": "role", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "role_mapping", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /admin/roleMappings", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/admin/roleMappings", "q": { "$action": "role_mapping" }, "r": {}, "s": [{ "lit": "admin" }, { "lit": "roleMappings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /admin/roleMappings", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/admin/roleMappings", "q": { "$action": "role_mapping", "exist": ["limit", "offset"] }, "r": {}, "s": [{ "lit": "admin" }, { "lit": "roleMappings" }], "t": { "req": "`reqdata`", "res": "`body.roleMappings`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /admin/roleMappings/{principalId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "principalId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/admin/roleMappings/{principalId}", "q": { "exist": ["id"] }, "r": { "param": { "principalId": "id" } }, "s": [{ "lit": "admin" }, { "lit": "roleMappings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "role_mapping", "name__orig": "role_mapping", "Name": "RoleMapping", "name_": "role_mapping", "name-": "role-mapping", "NAME": "ROLE_MAPPING", "index$": 32 }, { "active": true, "entity": "role_mapping", "key$": "BasicRoleMappingFlow", "kind": "basic", "name": "BasicRoleMappingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "role_mapping_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "role_mapping_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "role_mapping_ref01", "srcdatavar": "role_mapping_ref01_data", "suffix": "_dt0" }, "m": { "id": "role_mapping01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-role_mapping_ref01" } }], "index$": 2 }] }, 'RoleMapping', { "POST /admin/roleMappings": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "description": "The mapping between a user/principal and their role.", "required": ["principalId", "role"], "type": "object", "properties": { "principalId": { "description": "", "type": "string", "key$": "principalId" }, "role": { "description": "", "enum": ["READ_ONLY", "DEVELOPER", "ADMIN"], "type": "string", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RoleType", "key$": "role" }, "principalName": { "description": "A friendly name for the principal.", "type": "string", "key$": "principalName" } }, "example": { "principalId": "svc_account_84874587_123484", "principalName": "famartin-svc-account", "role": "READ_ONLY" }, "x-ref": "#/components/schemas/RoleMapping" } } }, "required": true }, "parameters": [] }, "GET /admin/roleMappings": { "protocol": "http", "parameters": [{ "name": "limit", "description": "The number of role mappings to return.  Defaults to 20.", "schema": { "type": "integer" }, "in": "query", "index$": 0 }, { "name": "offset", "description": "The number of role mappings to skip before starting the result set.  Defaults to 0.", "schema": { "type": "integer" }, "in": "query", "index$": 1 }] }, "GET /admin/roleMappings/{principalId}": { "protocol": "http", "parameters": [{ "name": "principalId", "description": "Unique id of a principal (typically either a user or service account).", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const role_mapping_ref01_ent = client.RoleMapping();
        let role_mapping_ref01_data = setup.data.new.role_mapping['role_mapping_ref01'];
        role_mapping_ref01_data = (await role_mapping_ref01_ent.create(role_mapping_ref01_data)).data();
        (0, node_assert_1.default)(null != role_mapping_ref01_data.id);
        // LIST
        const role_mapping_ref01_match = {};
        const role_mapping_ref01_list = (await role_mapping_ref01_ent.list(role_mapping_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(role_mapping_ref01_list, { id: role_mapping_ref01_data.id })));
        // LOAD
        const role_mapping_ref01_match_dt0 = {};
        role_mapping_ref01_match_dt0.id = role_mapping_ref01_data.id;
        const role_mapping_ref01_data_dt0 = (await role_mapping_ref01_ent.load(role_mapping_ref01_match_dt0)).data();
        (0, node_assert_1.default)(role_mapping_ref01_data_dt0.id === role_mapping_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/role_mapping/RoleMappingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['role_mapping01', 'role_mapping02', 'role_mapping03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_ROLE_MAPPING_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_ROLE_MAPPING_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_ROLE_MAPPING_ENTID'];
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
//# sourceMappingURL=RoleMappingEntity.test.js.map