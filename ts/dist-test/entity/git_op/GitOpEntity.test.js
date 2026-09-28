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
(0, node_test_1.describe)('GitOpEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.GitOp();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'git_op.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ref": { "a": true, "h": "Ref", "n": "ref", "r": true, "sh": "Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`).", "t": "`$STRING`", "key$": "ref", "index$": 0 }, "repoId": { "a": true, "h": "Repo Id", "n": "repoId", "r": true, "sh": "Repository ID to validate against.", "t": "`$STRING`", "key$": "repoId", "index$": 1 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Validation type.", "t": "`$STRING`", "key$": "type", "index$": 2 } }, "name": "git_op", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /admin/gitops/sync", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/admin/gitops/sync", "q": {}, "r": {}, "s": [{ "lit": "admin" }, { "lit": "gitops" }, { "lit": "sync" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /admin/gitops/validate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/admin/gitops/validate", "q": {}, "r": {}, "s": [{ "lit": "admin" }, { "lit": "gitops" }, { "lit": "validate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /admin/gitops/validate/{taskId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "task_id", "or": "task_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/admin/gitops/validate/{taskId}", "q": { "exist": ["task_id"] }, "r": { "param": { "taskId": "task_id" } }, "s": [{ "lit": "admin" }, { "lit": "gitops" }, { "lit": "validate" }, { "var": "task_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "git_op", "name__orig": "git_op", "Name": "GitOp", "name_": "git_op", "name-": "git-op", "NAME": "GIT_OP", "index$": 21 }, { "active": true, "entity": "git_op", "key$": "BasicGitOpFlow", "kind": "basic", "name": "BasicGitOpFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "git_op_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "git_op_ref01", "suffix": "_rm0" }, "m": { "id": "git_op01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'GitOp', { "POST /admin/gitops/sync": { "protocol": "http", "parameters": [] }, "POST /admin/gitops/validate": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for GitOpsValidateRequest", "description": "Request body for creating a dry-run validation task.", "type": "object", "properties": { "type": { "description": "Validation type. Currently only `pull` is supported.", "type": "string", "enum": ["pull"], "key$": "type" }, "repoId": { "description": "Repository ID to validate against. Must match a configured repository.", "type": "string", "key$": "repoId" }, "ref": { "description": "Git ref to validate (branch name, tag, or PR ref like `refs/pull/42/head`).", "type": "string", "key$": "ref" } }, "required": ["repoId", "ref"], "x-ref": "#/components/schemas/GitOpsValidateRequest", "index$": 1 } } }, "required": true }, "parameters": [] }, "DELETE /admin/gitops/validate/{taskId}": { "protocol": "http", "parameters": [{ "name": "taskId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const git_op_ref01_ent = client.GitOp();
        let git_op_ref01_data = setup.data.new.git_op['git_op_ref01'];
        git_op_ref01_data = (await git_op_ref01_ent.create(git_op_ref01_data)).data();
        (0, node_assert_1.default)(null != git_op_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/git_op/GitOpTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['git_op01', 'git_op02', 'git_op03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_GIT_OP_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_GIT_OP_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_GIT_OP_ENTID'];
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
//# sourceMappingURL=GitOpEntity.test.js.map