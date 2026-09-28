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
(0, node_test_1.describe)('CreateArtifactEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.CreateArtifact();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'create_artifact.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artifact": { "a": true, "h": "Artifact", "n": "artifact", "r": true, "t": "`$OBJECT`", "key$": "artifact", "index$": 0 }, "artifactId": { "a": true, "h": "Artifact Id", "n": "artifactId", "r": true, "t": "`$STRING`", "key$": "artifactId", "index$": 1 }, "artifactType": { "a": true, "h": "Artifact Type", "n": "artifactType", "r": false, "t": "`$STRING`", "key$": "artifactType", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 3 }, "firstVersion": { "a": true, "h": "First Version", "n": "firstVersion", "r": true, "t": "`$OBJECT`", "key$": "firstVersion", "index$": 4 }, "labels": { "a": true, "h": "Labels", "n": "labels", "r": false, "t": "`$OBJECT`", "key$": "labels", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 6 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$OBJECT`", "key$": "version", "index$": 7 } }, "name": "create_artifact", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /groups/{groupId}/artifacts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "canonical", "or": "canonical", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "dry_run", "or": "dry_run", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "k": "query", "n": "if_exist", "or": "if_exist", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/groups/{groupId}/artifacts", "q": { "exist": ["canonical", "dry_run", "group_id", "if_exist"] }, "r": { "param": { "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.group"]] }, "key$": "create_artifact", "name__orig": "create_artifact", "Name": "CreateArtifact", "name_": "create_artifact", "name-": "create-artifact", "NAME": "CREATE_ARTIFACT", "index$": 18 }, { "active": true, "entity": "create_artifact", "key$": "BasicCreateArtifactFlow", "kind": "basic", "name": "BasicCreateArtifactFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "create_artifact_ref01" }, "m": { "group_id": "group01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CreateArtifact', { "POST /groups/{groupId}/artifacts": { "protocol": "http", "requestBody": { "description": "The artifact being created.", "content": { "application/json": { "schema": { "description": "Data sent when creating a new artifact.", "required": ["artifactId"], "type": "object", "properties": { "artifactId": { "description": "", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId", "key$": "artifactId" }, "artifactType": { "description": "", "type": "string", "example": "AVRO", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/ArtifactType", "key$": "artifactType" }, "name": { "description": "", "type": "string", "key$": "name" }, "description": { "description": "", "type": "string", "key$": "description" }, "labels": { "description": "", "type": "object", "additionalProperties": { "type": "string", "key$": "additionalProperties" }, "x-codegen-inline": true, "x-codegen-type": "StringMap", "x-ref": "#/components/schemas/Labels", "key$": "labels" }, "firstVersion": { "description": "", "required": ["content"], "type": "object", "properties": { "version": { "description": "", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"3.1.6\"", "x-ref": "#/components/schemas/Version", "key$": "version" }, "content": { "description": "", "required": ["content", "contentType"], "type": "object", "properties": { "content": {}, "references": {}, "contentType": {}, "encoding": {} }, "x-ref": "#/components/schemas/VersionContent", "key$": "content" }, "name": { "description": "", "type": "string", "key$": "name" }, "description": { "description": "", "type": "string", "key$": "description" }, "labels": { "description": "", "type": "object", "additionalProperties": { "type": "string", "key$": "additionalProperties" }, "x-codegen-inline": true, "x-codegen-type": "StringMap", "x-ref": "#/components/schemas/Labels", "key$": "labels" }, "branches": { "description": "", "type": "array", "items": { "type": "string" }, "key$": "branches" }, "isDraft": { "description": "", "type": "boolean", "key$": "isDraft" } }, "example": { "version": "1.0.1", "content": { "content": "{\"type\":\"record\",\"name\":\"ExampleType\",\"fields\":[{\"name\":\"foo\",\"type\":\"string\"}]}", "contentType": "application/json" }, "name": "Version 1.0.1", "description": "The latest version of this artifact.", "isDraft": false }, "x-ref": "#/components/schemas/CreateVersion", "key$": "firstVersion" } }, "example": { "artifactId": "mytopic-value", "artifactType": "AVRO", "name": "Invoice", "description": "A standard Acme invoice payload.", "labels": { "label-1": "value-1", "label-2": "value-2" }, "firstVersion": { "version": "1.0.0", "content": { "content": "{\"type\":\"record\",\"name\":\"ExampleType\",\"fields\":[{\"name\":\"sdfgfsdgsdg\",\"type\":\"string\"}]}", "contentType": "application/json", "references": [] }, "name": "ExampleType", "description": "A simple example of an Avro type.", "labels": {} } }, "x-ref": "#/components/schemas/CreateArtifact", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "ifExists", "description": "Set this option to instruct the server on what to do if the artifact already exists.", "schema": { "description": "", "enum": ["FAIL", "CREATE_VERSION", "FIND_OR_CREATE_VERSION"], "type": "string", "x-ref": "#/components/schemas/IfArtifactExists" }, "in": "query", "index$": 1 }, { "name": "canonical", "description": "Used only when the `ifExists` query parameter is set to `RETURN_OR_UPDATE`, this parameter can be set to `true` to indicate that the server should \"canonicalize\" the content when searching for a matching version.  The canonicalization algorithm is unique to each artifact type, but typically involves removing extra whitespace and formatting the content in a consistent manner.", "schema": { "type": "boolean" }, "in": "query", "index$": 2 }, { "name": "dryRun", "description": "When set to `true`, the operation will not result in any changes. Instead, it\nwill return a result based on whether the operation **would have succeeded**.", "schema": { "type": "boolean" }, "in": "query", "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const create_artifact_ref01_ent = client.CreateArtifact();
        let create_artifact_ref01_data = setup.data.new.create_artifact['create_artifact_ref01'];
        create_artifact_ref01_data['group_id'] = setup.idmap['group01'];
        create_artifact_ref01_data = (await create_artifact_ref01_ent.create(create_artifact_ref01_data)).data();
        (0, node_assert_1.default)(null != create_artifact_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/create_artifact/CreateArtifactTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['create_artifact01', 'create_artifact02', 'create_artifact03', 'group01', 'group02', 'group03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_CREATE_ARTIFACT_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_CREATE_ARTIFACT_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_CREATE_ARTIFACT_ENTID'];
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
//# sourceMappingURL=CreateArtifactEntity.test.js.map