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
(0, node_test_1.describe)('AdminEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.Admin();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'admin.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "role": { "a": true, "h": "Role", "n": "role", "r": true, "t": "`$STRING`", "key$": "role", "index$": 0 }, "value": { "a": true, "h": "Value", "n": "value", "r": true, "t": "`$STRING`", "key$": "value", "index$": 1 } }, "name": "admin", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /admin/import", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "x_registry_preserve_content_id", "or": "X-Registry-Preserve-ContentId", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "header", "n": "x_registry_preserve_global_id", "or": "X-Registry-Preserve-GlobalId", "r": false, "t": "`$BOOLEAN`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "require_empty_registry", "or": "requireEmptyRegistry", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/admin/import", "q": { "$action": "import", "exist": ["require_empty_registry", "x_registry_preserve_content_id", "x_registry_preserve_global_id"] }, "r": {}, "s": [{ "lit": "admin" }, { "lit": "import" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /admin/roleMappings/{principalId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "principal_id", "or": "principalId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/admin/roleMappings/{principalId}", "q": { "exist": ["principal_id"] }, "r": { "param": { "principalId": "principal_id" } }, "s": [{ "lit": "admin" }, { "lit": "roleMappings" }, { "var": "principal_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /admin/config/properties/{propertyName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "property_name", "or": "propertyName", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/admin/config/properties/{propertyName}", "q": { "exist": ["property_name"] }, "r": { "param": { "propertyName": "property_name" } }, "s": [{ "lit": "admin" }, { "lit": "config" }, { "lit": "properties" }, { "var": "property_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "DELETE /admin/contracts/ruleset", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "DELETE", "o": "/admin/contracts/ruleset", "q": {}, "r": {}, "s": [{ "lit": "admin" }, { "lit": "contracts" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /admin/roleMappings/{principalId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "principal_id", "or": "principalId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/admin/roleMappings/{principalId}", "q": { "exist": ["principal_id"] }, "r": { "param": { "principalId": "principal_id" } }, "s": [{ "lit": "admin" }, { "lit": "roleMappings" }, { "var": "principal_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /admin/config/properties/{propertyName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "property_name", "or": "propertyName", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/admin/config/properties/{propertyName}", "q": { "exist": ["property_name"] }, "r": { "param": { "propertyName": "property_name" } }, "s": [{ "lit": "admin" }, { "lit": "config" }, { "lit": "properties" }, { "var": "property_name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.role_mapping"]] }, "key$": "admin", "name__orig": "admin", "Name": "Admin", "name_": "admin", "name-": "admin", "NAME": "ADMIN", "index$": 0 }, { "active": true, "entity": "admin", "key$": "BasicAdminFlow", "kind": "basic", "name": "BasicAdminFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "admin_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "admin_ref01", "srcdatavar": "admin_ref01_data", "suffix": "_up0", "textfield": "role" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-admin_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "admin_ref01", "suffix": "_rm0" }, "m": {}, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'Admin', { "POST /admin/import": { "protocol": "http", "requestBody": { "description": "The ZIP file representing the previously exported registry data.", "content": { "application/zip": { "schema": { "format": "binary", "type": "string", "x-codegen-inline": true, "x-ref": "#/components/schemas/FileContent" } } }, "required": true }, "parameters": [{ "name": "X-Registry-Preserve-GlobalId", "description": "If this header is set to false, global ids of imported data will be ignored and replaced by next id in global id sequence. This allows to import any data even thought the global ids would cause a conflict.", "schema": { "type": "boolean" }, "in": "header", "index$": 0 }, { "name": "X-Registry-Preserve-ContentId", "description": "If this header is set to false, content ids of imported data will be ignored and replaced by next id in content id sequence. The mapping between content and artifacts will be preserved. This allows to import any data even thought the content ids would cause a conflict.", "schema": { "type": "boolean" }, "in": "header", "required": false, "index$": 1 }, { "name": "requireEmptyRegistry", "description": "Query parameter indicating whether the registry must be empty before allowing\ndata to be imported.  Defaults to `true` if omitted.", "schema": { "type": "boolean" }, "in": "query", "required": false, "index$": 2 }] }, "DELETE /admin/roleMappings/{principalId}": { "protocol": "http", "parameters": [{ "name": "principalId", "description": "Unique id of a principal (typically either a user or service account).", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] }, "DELETE /admin/config/properties/{propertyName}": { "protocol": "http", "parameters": [{ "name": "propertyName", "description": "The name of a configuration property.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] }, "DELETE /admin/contracts/ruleset": { "protocol": "http", "parameters": [] }, "PUT /admin/roleMappings/{principalId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for UpdateRole", "description": "", "required": ["role"], "type": "object", "properties": { "role": { "description": "", "enum": ["READ_ONLY", "DEVELOPER", "ADMIN"], "type": "string", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RoleType", "key$": "role" } }, "example": { "role": "READ_ONLY" }, "x-ref": "#/components/schemas/UpdateRole", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "principalId", "description": "Unique id of a principal (typically either a user or service account).", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] }, "PUT /admin/config/properties/{propertyName}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for UpdateConfigurationProperty", "description": "", "required": ["value"], "type": "object", "properties": { "value": { "type": "string", "key$": "value" } }, "example": { "value": "true" }, "x-ref": "#/components/schemas/UpdateConfigurationProperty", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "propertyName", "description": "The name of a configuration property.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const admin_ref01_ent = client.Admin();
        let admin_ref01_data = setup.data.new.admin['admin_ref01'];
        admin_ref01_data = (await admin_ref01_ent.create(admin_ref01_data)).data();
        (0, node_assert_1.default)(null != admin_ref01_data);
        // UPDATE
        const admin_ref01_data_up0 = {};
        const admin_ref01_markdef_up0 = { name: 'role', value: 'Mark01-admin_ref01_' + setup.now };
        admin_ref01_data_up0[admin_ref01_markdef_up0.name] = admin_ref01_markdef_up0.value;
        const admin_ref01_resdata_up0 = (await admin_ref01_ent.update(admin_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != admin_ref01_resdata_up0);
        (0, node_assert_1.default)(admin_ref01_resdata_up0[admin_ref01_markdef_up0.name] === admin_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/admin/AdminTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['admin01', 'admin02', 'admin03', 'role_mapping01', 'role_mapping02', 'role_mapping03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_ADMIN_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_ADMIN_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_ADMIN_ENTID'];
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
//# sourceMappingURL=AdminEntity.test.js.map