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
(0, node_test_1.describe)('GroupEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.Group();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'group.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artifactsType": { "a": true, "h": "Artifacts Type", "n": "artifactsType", "r": false, "t": "`$STRING`", "key$": "artifactsType", "index$": 0 }, "createdOn": { "a": true, "fo": "date-time", "h": "Created On", "n": "createdOn", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "createdOn", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 2 }, "groupId": { "a": true, "h": "Group Id", "n": "groupId", "op": { "create": { "req": true, "type": "`$STRING`" }, "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "groupId", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "labels": { "a": true, "h": "Labels", "n": "labels", "r": false, "t": "`$OBJECT`", "key$": "labels", "index$": 5 }, "modifiedBy": { "a": true, "h": "Modified By", "n": "modifiedBy", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "modifiedBy", "index$": 6 }, "modifiedOn": { "a": true, "fo": "date-time", "h": "Modified On", "n": "modifiedOn", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "modifiedOn", "index$": 7 }, "owner": { "a": true, "h": "Owner", "n": "owner", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "owner", "index$": 8 }, "properties": { "a": true, "h": "Properties", "n": "properties", "r": false, "t": "`$OBJECT`", "key$": "properties", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "group", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /groups", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/groups", "q": {}, "r": {}, "s": [{ "lit": "groups" }], "t": { "req": "`reqdata`", "res": "`body.labels`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /groups", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "orderby", "or": "orderby", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/groups", "q": { "exist": ["limit", "offset", "order", "orderby"] }, "r": {}, "s": [{ "lit": "groups" }], "t": { "req": "`reqdata`", "res": "`body.groups`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}", "q": { "exist": ["id"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.labels`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /groups/{groupId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/groups/{groupId}", "q": { "exist": ["id"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /groups/{groupId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}", "q": { "exist": ["id"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "group", "name__orig": "group", "Name": "Group", "name_": "group", "name-": "group", "NAME": "GROUP", "index$": 25 }, { "active": true, "entity": "group", "key$": "BasicGroupFlow", "kind": "basic", "name": "BasicGroupFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "group_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "group_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "group_ref01", "srcdatavar": "group_ref01_data", "suffix": "_up0", "textfield": "artifactsType" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-group_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "group_ref01", "srcdatavar": "group_ref01_data", "suffix": "_dt0" }, "m": { "id": "group01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-group_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "group_ref01", "suffix": "_rm0" }, "m": { "id": "group01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "group_ref01" } }], "index$": 5 }] }, 'Group', { "POST /groups": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for CreateGroupMetaData", "description": "", "required": ["groupId"], "type": "object", "properties": { "description": { "type": "string", "key$": "description" }, "labels": { "description": "", "type": "object", "additionalProperties": { "type": "string", "key$": "additionalProperties" }, "x-codegen-inline": true, "x-codegen-type": "StringMap", "x-ref": "#/components/schemas/Labels", "key$": "labels" }, "groupId": { "description": "", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId", "key$": "groupId" } }, "example": { "groupId": "group-identifier", "description": "The description of the artifact.", "labels": { "custom-1": "foo", "custom-2": "bar" } }, "x-ref": "#/components/schemas/CreateGroup", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /groups": { "protocol": "http", "parameters": [{ "name": "limit", "description": "The number of groups to return.  Defaults to 20.", "schema": { "type": "integer" }, "in": "query", "index$": 0 }, { "name": "offset", "description": "The number of groups to skip before starting the result set.  Defaults to 0.", "schema": { "type": "integer" }, "in": "query", "index$": 1 }, { "name": "order", "description": "Sort order, ascending (`asc`) or descending (`desc`).", "schema": { "description": "", "enum": ["asc", "desc"], "type": "string", "x-ref": "#/components/schemas/SortOrder" }, "in": "query", "index$": 2 }, { "name": "orderby", "description": "The field to sort by.  Can be one of:\n\n* `name`\n* `createdOn`\n", "schema": { "description": "", "enum": ["groupId", "createdOn", "modifiedOn"], "type": "string", "x-ref": "#/components/schemas/GroupSortBy" }, "in": "query", "index$": 3 }] }, "GET /groups/{groupId}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }] }, "DELETE /groups/{groupId}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }] }, "PUT /groups/{groupId}": { "protocol": "http", "requestBody": { "description": "The new group metadata.", "content": { "application/json": { "schema": { "title": "Root Type for EditableGroupMetaData", "description": "", "type": "object", "properties": { "description": { "type": "string", "key$": "description" }, "labels": { "description": "", "type": "object", "additionalProperties": { "type": "string", "key$": "additionalProperties" }, "x-codegen-inline": true, "x-codegen-type": "StringMap", "x-ref": "#/components/schemas/Labels", "key$": "labels" }, "owner": { "description": "", "type": "string", "key$": "owner" } }, "example": { "description": "The description of the group.", "owner": "user-1", "labels": { "custom-1": "foo", "custom-2": "bar" } }, "x-ref": "#/components/schemas/EditableGroupMetaData", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const group_ref01_ent = client.Group();
        let group_ref01_data = setup.data.new.group['group_ref01'];
        group_ref01_data = (await group_ref01_ent.create(group_ref01_data)).data();
        (0, node_assert_1.default)(null != group_ref01_data.id);
        // LIST
        const group_ref01_match = {};
        const group_ref01_list = (await group_ref01_ent.list(group_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(group_ref01_list, { id: group_ref01_data.id })));
        // UPDATE
        const group_ref01_data_up0 = {};
        group_ref01_data_up0.id = group_ref01_data.id;
        const group_ref01_markdef_up0 = { name: 'artifactsType', value: 'Mark01-group_ref01_' + setup.now };
        group_ref01_data_up0[group_ref01_markdef_up0.name] = group_ref01_markdef_up0.value;
        const group_ref01_resdata_up0 = (await group_ref01_ent.update(group_ref01_data_up0)).data();
        (0, node_assert_1.default)(group_ref01_resdata_up0.id === group_ref01_data_up0.id);
        (0, node_assert_1.default)(group_ref01_resdata_up0[group_ref01_markdef_up0.name] === group_ref01_markdef_up0.value);
        // LOAD
        const group_ref01_match_dt0 = {};
        group_ref01_match_dt0.id = group_ref01_data.id;
        const group_ref01_data_dt0 = (await group_ref01_ent.load(group_ref01_match_dt0)).data();
        (0, node_assert_1.default)(group_ref01_data_dt0.id === group_ref01_data.id);
        // REMOVE
        const group_ref01_match_rm0 = { id: group_ref01_data.id };
        await group_ref01_ent.remove(group_ref01_match_rm0);
        // LIST
        const group_ref01_match_rt0 = {};
        const group_ref01_list_rt0 = (await group_ref01_ent.list(group_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(group_ref01_list_rt0, { id: group_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/group/GroupTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['group01', 'group02', 'group03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_GROUP_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_GROUP_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_GROUP_ENTID'];
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
//# sourceMappingURL=GroupEntity.test.js.map