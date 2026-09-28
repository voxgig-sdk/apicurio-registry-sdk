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
(0, node_test_1.describe)('ContractRuleSetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.ContractRuleSet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'contract_rule_set.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "domainRules": { "a": true, "h": "Domain Rules", "n": "domainRules", "r": false, "sh": "Rules for domain validation.", "t": "`$ARRAY`", "key$": "domainRules", "index$": 0 }, "migrationRules": { "a": true, "h": "Migration Rules", "n": "migrationRules", "r": false, "sh": "Rules for version migration.", "t": "`$ARRAY`", "key$": "migrationRules", "index$": 1 } }, "name": "contract_rule_set", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "version_id", "or": "version_expression", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset", "q": { "exist": ["artifact_id", "group_id", "version_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id", "versionExpression": "version_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "versions" }, { "var": "version_id" }, { "lit": "contract" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/contract/ruleset", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset", "q": { "exist": ["artifact_id", "group_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "contract" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /admin/contracts/ruleset", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/admin/contracts/ruleset", "q": {}, "r": {}, "s": [{ "lit": "admin" }, { "lit": "contracts" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "version_id", "or": "version_expression", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset", "q": { "exist": ["artifact_id", "group_id", "version_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id", "versionExpression": "version_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "versions" }, { "var": "version_id" }, { "lit": "contract" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /groups/{groupId}/artifacts/{artifactId}/contract/ruleset", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}/artifacts/{artifactId}/contract/ruleset", "q": { "exist": ["artifact_id", "group_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "contract" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "PUT /admin/contracts/ruleset", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PUT", "o": "/admin/contracts/ruleset", "q": {}, "r": {}, "s": [{ "lit": "admin" }, { "lit": "contracts" }, { "lit": "ruleset" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.group", "$.main.kit.entity.artifact"], ["$.main.kit.entity.group", "$.main.kit.entity.artifact", "$.main.kit.entity.version"]] }, "key$": "contract_rule_set", "name__orig": "contract_rule_set", "Name": "ContractRuleSet", "name_": "contract_rule_set", "name-": "contract-rule-set", "NAME": "CONTRACT_RULE_SET", "index$": 17 }, { "active": true, "entity": "contract_rule_set", "key$": "BasicContractRuleSetFlow", "kind": "basic", "name": "BasicContractRuleSetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "contract_rule_set_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "contract_rule_set_ref01", "srcdatavar": "contract_rule_set_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-contract_rule_set_ref01" } }], "v": [], "index$": 1 }] }, 'ContractRuleSet', { "GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }, { "name": "versionExpression", "description": "An expression resolvable to a specific version ID within the given group and artifact. The following rules apply:\n\n - If the expression is in the form \"branch={branchId}\", and artifact branch {branchId} exists: The expression is resolved to a version that the branch points to.\n - Otherwise: The expression is resolved to a version with the same ID, which must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 2 }] }, "GET /groups/{groupId}/artifacts/{artifactId}/contract/ruleset": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }] }, "GET /admin/contracts/ruleset": { "protocol": "http", "parameters": [] }, "PUT /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/contract/ruleset": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "ContractRuleSet", "description": "A set of contract rules, divided into domain and migration categories.", "type": "object", "properties": { "domainRules": { "description": "Rules for domain validation.", "items": { "description": "A single contract rule definition.", "properties": { "disabled": { "description": "Whether the rule is disabled.", "type": "boolean" }, "expr": { "description": "The rule expression.", "type": "string" }, "kind": { "description": "The rule kind.", "enum": [], "type": "string" }, "mode": { "description": "When the rule is applied.", "enum": [], "type": "string" }, "name": { "description": "The rule name.", "type": "string" }, "onFailure": { "description": "Action on rule failure.", "enum": [], "type": "string" }, "onSuccess": { "description": "Action on rule success.", "enum": [], "type": "string" }, "params": { "additionalProperties": {}, "description": "Rule parameters.", "type": "object" }, "tags": { "description": "Tags for categorizing the rule.", "items": {}, "type": "array" }, "type": { "description": "Rule executor type (CEL, CEL_FIELD, ENCRYPT, etc.).", "type": "string" } }, "required": ["name", "kind", "type", "mode"], "title": "ContractRule", "type": "object", "x-ref": "#/components/schemas/ContractRule" }, "key$": "domainRules", "type": "array" }, "migrationRules": { "description": "Rules for version migration.", "items": { "description": "A single contract rule definition.", "properties": { "disabled": { "description": "Whether the rule is disabled.", "type": "boolean" }, "expr": { "description": "The rule expression.", "type": "string" }, "kind": { "description": "The rule kind.", "enum": [], "type": "string" }, "mode": { "description": "When the rule is applied.", "enum": [], "type": "string" }, "name": { "description": "The rule name.", "type": "string" }, "onFailure": { "description": "Action on rule failure.", "enum": [], "type": "string" }, "onSuccess": { "description": "Action on rule success.", "enum": [], "type": "string" }, "params": { "additionalProperties": {}, "description": "Rule parameters.", "type": "object" }, "tags": { "description": "Tags for categorizing the rule.", "items": {}, "type": "array" }, "type": { "description": "Rule executor type (CEL, CEL_FIELD, ENCRYPT, etc.).", "type": "string" } }, "required": ["name", "kind", "type", "mode"], "title": "ContractRule", "type": "object", "x-ref": "#/components/schemas/ContractRule" }, "key$": "migrationRules", "type": "array" } }, "x-ref": "#/components/schemas/ContractRuleSet", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }, { "name": "versionExpression", "description": "An expression resolvable to a specific version ID within the given group and artifact. The following rules apply:\n\n - If the expression is in the form \"branch={branchId}\", and artifact branch {branchId} exists: The expression is resolved to a version that the branch points to.\n - Otherwise: The expression is resolved to a version with the same ID, which must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 2 }] }, "PUT /groups/{groupId}/artifacts/{artifactId}/contract/ruleset": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "ContractRuleSet", "description": "A set of contract rules, divided into domain and migration categories.", "type": "object", "properties": { "domainRules": { "description": "Rules for domain validation.", "items": { "description": "A single contract rule definition.", "properties": { "disabled": { "description": "Whether the rule is disabled.", "type": "boolean" }, "expr": { "description": "The rule expression.", "type": "string" }, "kind": { "description": "The rule kind.", "enum": [], "type": "string" }, "mode": { "description": "When the rule is applied.", "enum": [], "type": "string" }, "name": { "description": "The rule name.", "type": "string" }, "onFailure": { "description": "Action on rule failure.", "enum": [], "type": "string" }, "onSuccess": { "description": "Action on rule success.", "enum": [], "type": "string" }, "params": { "additionalProperties": {}, "description": "Rule parameters.", "type": "object" }, "tags": { "description": "Tags for categorizing the rule.", "items": {}, "type": "array" }, "type": { "description": "Rule executor type (CEL, CEL_FIELD, ENCRYPT, etc.).", "type": "string" } }, "required": ["name", "kind", "type", "mode"], "title": "ContractRule", "type": "object", "x-ref": "#/components/schemas/ContractRule" }, "key$": "domainRules", "type": "array" }, "migrationRules": { "description": "Rules for version migration.", "items": { "description": "A single contract rule definition.", "properties": { "disabled": { "description": "Whether the rule is disabled.", "type": "boolean" }, "expr": { "description": "The rule expression.", "type": "string" }, "kind": { "description": "The rule kind.", "enum": [], "type": "string" }, "mode": { "description": "When the rule is applied.", "enum": [], "type": "string" }, "name": { "description": "The rule name.", "type": "string" }, "onFailure": { "description": "Action on rule failure.", "enum": [], "type": "string" }, "onSuccess": { "description": "Action on rule success.", "enum": [], "type": "string" }, "params": { "additionalProperties": {}, "description": "Rule parameters.", "type": "object" }, "tags": { "description": "Tags for categorizing the rule.", "items": {}, "type": "array" }, "type": { "description": "Rule executor type (CEL, CEL_FIELD, ENCRYPT, etc.).", "type": "string" } }, "required": ["name", "kind", "type", "mode"], "title": "ContractRule", "type": "object", "x-ref": "#/components/schemas/ContractRule" }, "key$": "migrationRules", "type": "array" } }, "x-ref": "#/components/schemas/ContractRuleSet", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 1 }] }, "PUT /admin/contracts/ruleset": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "ContractRuleSet", "description": "A set of contract rules, divided into domain and migration categories.", "type": "object", "properties": { "domainRules": { "description": "Rules for domain validation.", "items": { "description": "A single contract rule definition.", "properties": { "disabled": { "description": "Whether the rule is disabled.", "type": "boolean" }, "expr": { "description": "The rule expression.", "type": "string" }, "kind": { "description": "The rule kind.", "enum": [], "type": "string" }, "mode": { "description": "When the rule is applied.", "enum": [], "type": "string" }, "name": { "description": "The rule name.", "type": "string" }, "onFailure": { "description": "Action on rule failure.", "enum": [], "type": "string" }, "onSuccess": { "description": "Action on rule success.", "enum": [], "type": "string" }, "params": { "additionalProperties": {}, "description": "Rule parameters.", "type": "object" }, "tags": { "description": "Tags for categorizing the rule.", "items": {}, "type": "array" }, "type": { "description": "Rule executor type (CEL, CEL_FIELD, ENCRYPT, etc.).", "type": "string" } }, "required": ["name", "kind", "type", "mode"], "title": "ContractRule", "type": "object", "x-ref": "#/components/schemas/ContractRule" }, "key$": "domainRules", "type": "array" }, "migrationRules": { "description": "Rules for version migration.", "items": { "description": "A single contract rule definition.", "properties": { "disabled": { "description": "Whether the rule is disabled.", "type": "boolean" }, "expr": { "description": "The rule expression.", "type": "string" }, "kind": { "description": "The rule kind.", "enum": [], "type": "string" }, "mode": { "description": "When the rule is applied.", "enum": [], "type": "string" }, "name": { "description": "The rule name.", "type": "string" }, "onFailure": { "description": "Action on rule failure.", "enum": [], "type": "string" }, "onSuccess": { "description": "Action on rule success.", "enum": [], "type": "string" }, "params": { "additionalProperties": {}, "description": "Rule parameters.", "type": "object" }, "tags": { "description": "Tags for categorizing the rule.", "items": {}, "type": "array" }, "type": { "description": "Rule executor type (CEL, CEL_FIELD, ENCRYPT, etc.).", "type": "string" } }, "required": ["name", "kind", "type", "mode"], "title": "ContractRule", "type": "object", "x-ref": "#/components/schemas/ContractRule" }, "key$": "migrationRules", "type": "array" } }, "x-ref": "#/components/schemas/ContractRuleSet", "index$": 1 } } }, "required": true }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let contract_rule_set_ref01_data = Object.values(setup.data.existing.contract_rule_set)[0];
        // LIST
        const contract_rule_set_ref01_ent = client.ContractRuleSet();
        const contract_rule_set_ref01_match = {};
        const contract_rule_set_ref01_list = (await contract_rule_set_ref01_ent.list(contract_rule_set_ref01_match)).map((e) => e.data());
        // UPDATE
        const contract_rule_set_ref01_data_up0 = {};
        const contract_rule_set_ref01_resdata_up0 = (await contract_rule_set_ref01_ent.update(contract_rule_set_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != contract_rule_set_ref01_resdata_up0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/contract_rule_set/ContractRuleSetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['contract_rule_set01', 'contract_rule_set02', 'contract_rule_set03', 'group01', 'group02', 'group03', 'artifact01', 'artifact02', 'artifact03', 'version01', 'version02', 'version03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_CONTRACT_RULE_SET_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_CONTRACT_RULE_SET_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_CONTRACT_RULE_SET_ENTID'];
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
//# sourceMappingURL=ContractRuleSetEntity.test.js.map