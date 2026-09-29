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
(0, node_test_1.describe)('WrappedVersionStateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.WrappedVersionState();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'wrapped_version_state.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "Describes the state of an artifact or artifact version.", "t": "`$STRING`", "key$": "state", "index$": 0 } }, "name": "wrapped_version_state", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "version_expression", "or": "versionExpression", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state", "q": { "exist": ["artifact_id", "group_id", "version_expression"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id", "versionExpression": "version_expression" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "versions" }, { "var": "version_expression" }, { "lit": "state" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.group", "$.main.kit.entity.artifact", "$.main.kit.entity.version"]] }, "key$": "wrapped_version_state", "name__orig": "wrapped_version_state", "Name": "WrappedVersionState", "name_": "wrapped_version_state", "name-": "wrapped-version-state", "NAME": "WRAPPED_VERSION_STATE", "index$": 42 }, { "active": true, "entity": "wrapped_version_state", "key$": "BasicWrappedVersionStateFlow", "kind": "basic", "name": "BasicWrappedVersionStateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "wrapped_version_state_ref01", "srcdatavar": "wrapped_version_state_ref01_data", "suffix": "_dt0" }, "m": { "artifact_id": "artifact01", "group_id": "group01", "id": "wrapped_version_state01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-wrapped_version_state_ref01" } }], "index$": 0 }] }, 'WrappedVersionState', { "GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/state": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "versionExpression", "description": "An expression resolvable to a specific version ID within the given group and artifact. The following rules apply:\n\n - If the expression is in the form \"branch={branchId}\", and artifact branch {branchId} exists: The expression is resolved to a version that the branch points to.\n - Otherwise: The expression is resolved to a version with the same ID, which must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let wrapped_version_state_ref01_data = Object.values(setup.data.existing.wrapped_version_state)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const wrapped_version_state_ref01_ent = client.WrappedVersionState();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/wrapped_version_state/WrappedVersionStateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['wrapped_version_state01', 'wrapped_version_state02', 'wrapped_version_state03', 'group01', 'group02', 'group03', 'artifact01', 'artifact02', 'artifact03', 'version01', 'version02', 'version03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_WRAPPED_VERSION_STATE_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_WRAPPED_VERSION_STATE_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_WRAPPED_VERSION_STATE_ENTID'];
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
//# sourceMappingURL=WrappedVersionStateEntity.test.js.map