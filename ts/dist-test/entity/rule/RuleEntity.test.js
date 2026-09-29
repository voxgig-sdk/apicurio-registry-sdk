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
(0, node_test_1.describe)('RuleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.Rule();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "config": { "a": true, "h": "Config", "n": "config", "r": true, "t": "`$STRING`", "key$": "config", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "ruleType": { "a": true, "h": "Rule Type", "n": "ruleType", "r": false, "t": "`$STRING`", "key$": "ruleType", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "rule", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/rules", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/rules", "q": { "exist": ["artifact_id", "group_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /groups/{groupId}/rules", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/rules", "q": { "exist": ["group_id"] }, "r": { "param": { "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "id", "or": "ruleType", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}", "q": { "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id", "ruleType": "id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /groups/{groupId}/rules/{ruleType}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "ruleType", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/rules/{ruleType}", "q": { "exist": ["group_id", "id"] }, "r": { "param": { "groupId": "group_id", "ruleType": "id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /admin/rules/{ruleType}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "VALIDITY", "k": "param", "n": "id", "or": "ruleType", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/admin/rules/{ruleType}", "q": { "exist": ["id"] }, "r": { "param": { "ruleType": "id" } }, "s": [{ "lit": "admin" }, { "lit": "rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "id", "or": "ruleType", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}", "q": { "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id", "ruleType": "id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /groups/{groupId}/rules/{ruleType}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "ruleType", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}/rules/{ruleType}", "q": { "exist": ["group_id", "id"] }, "r": { "param": { "groupId": "group_id", "ruleType": "id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "PUT /admin/rules/{ruleType}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "VALIDITY", "k": "param", "n": "id", "or": "ruleType", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/admin/rules/{ruleType}", "q": { "exist": ["id"] }, "r": { "param": { "ruleType": "id" } }, "s": [{ "lit": "admin" }, { "lit": "rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.group"], ["$.main.kit.entity.group", "$.main.kit.entity.artifact"]] }, "key$": "rule", "name__orig": "rule", "Name": "Rule", "name_": "rule", "name-": "rule", "NAME": "RULE", "index$": 33 }, { "active": true, "entity": "rule", "key$": "BasicRuleFlow", "kind": "basic", "name": "BasicRuleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "group_id": "group01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "rule_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "rule_ref01", "srcdatavar": "rule_ref01_data", "suffix": "_up0", "textfield": "config" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-rule_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "rule_ref01", "srcdatavar": "rule_ref01_data", "suffix": "_dt0" }, "m": { "id": "rule01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-rule_ref01" } }], "index$": 2 }] }, 'Rule', { "GET /groups/{groupId}/artifacts/{artifactId}/rules": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }] }, "GET /groups/{groupId}/rules": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }] }, "GET /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "ruleType", "description": "The unique name/type of a rule.", "schema": { "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string" }, "in": "path", "required": true, "index$": 2 }] }, "GET /groups/{groupId}/rules/{ruleType}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "ruleType", "description": "The unique name/type of a rule.", "schema": { "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string" }, "in": "path", "required": true, "index$": 1 }] }, "GET /admin/rules/{ruleType}": { "protocol": "http", "parameters": [{ "name": "ruleType", "description": "The unique name/type of a rule.", "schema": { "description": "", "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string", "example": "VALIDITY", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RuleType" }, "in": "path", "required": true, "index$": 0 }] }, "PUT /groups/{groupId}/artifacts/{artifactId}/rules/{ruleType}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for Rule", "description": "", "required": ["config"], "type": "object", "properties": { "config": { "type": "string", "key$": "config" }, "ruleType": { "description": "", "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string", "example": "VALIDITY", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RuleType", "key$": "ruleType" } }, "example": { "ruleType": "VALIDITY", "config": "FULL" }, "x-ref": "#/components/schemas/Rule", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "ruleType", "description": "The unique name/type of a rule.", "schema": { "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string" }, "in": "path", "required": true, "index$": 2 }] }, "PUT /groups/{groupId}/rules/{ruleType}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for Rule", "description": "", "required": ["config"], "type": "object", "properties": { "config": { "type": "string", "key$": "config" }, "ruleType": { "description": "", "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string", "example": "VALIDITY", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RuleType", "key$": "ruleType" } }, "example": { "ruleType": "VALIDITY", "config": "FULL" }, "x-ref": "#/components/schemas/Rule", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "ruleType", "description": "The unique name/type of a rule.", "schema": { "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string" }, "in": "path", "required": true, "index$": 1 }] }, "PUT /admin/rules/{ruleType}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for Rule", "description": "", "required": ["config"], "type": "object", "properties": { "config": { "type": "string", "key$": "config" }, "ruleType": { "description": "", "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string", "example": "VALIDITY", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RuleType", "key$": "ruleType" } }, "example": { "ruleType": "VALIDITY", "config": "FULL" }, "x-ref": "#/components/schemas/Rule", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "ruleType", "description": "The unique name/type of a rule.", "schema": { "description": "", "enum": ["VALIDITY", "COMPATIBILITY", "INTEGRITY"], "type": "string", "example": "VALIDITY", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/RuleType" }, "in": "path", "required": true, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let rule_ref01_data = Object.values(setup.data.existing.rule)[0];
        // LIST
        const rule_ref01_ent = client.Rule();
        const rule_ref01_match = {};
        rule_ref01_match['group_id'] = setup.idmap['group01'];
        const rule_ref01_list = (await rule_ref01_ent.list(rule_ref01_match)).map((e) => e.data());
        // UPDATE
        const rule_ref01_data_up0 = {};
        rule_ref01_data_up0.id = rule_ref01_data.id;
        const rule_ref01_markdef_up0 = { name: 'config', value: 'Mark01-rule_ref01_' + setup.now };
        rule_ref01_data_up0[rule_ref01_markdef_up0.name] = rule_ref01_markdef_up0.value;
        const rule_ref01_resdata_up0 = (await rule_ref01_ent.update(rule_ref01_data_up0)).data();
        (0, node_assert_1.default)(rule_ref01_resdata_up0.id === rule_ref01_data_up0.id);
        (0, node_assert_1.default)(rule_ref01_resdata_up0[rule_ref01_markdef_up0.name] === rule_ref01_markdef_up0.value);
        // LOAD
        const rule_ref01_match_dt0 = {};
        rule_ref01_match_dt0.id = rule_ref01_data.id;
        const rule_ref01_data_dt0 = (await rule_ref01_ent.load(rule_ref01_match_dt0)).data();
        (0, node_assert_1.default)(rule_ref01_data_dt0.id === rule_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rule/RuleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rule01', 'rule02', 'rule03', 'group01', 'group02', 'group03', 'artifact01', 'artifact02', 'artifact03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_RULE_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_RULE_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_RULE_ENTID'];
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
//# sourceMappingURL=RuleEntity.test.js.map