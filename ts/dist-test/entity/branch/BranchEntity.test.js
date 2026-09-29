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
(0, node_test_1.describe)('BranchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.Branch();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'branch.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artifactId": { "a": true, "h": "Artifact Id", "n": "artifactId", "r": true, "t": "`$STRING`", "key$": "artifactId", "index$": 0 }, "branchId": { "a": true, "h": "Branch Id", "n": "branchId", "r": true, "t": "`$STRING`", "key$": "branchId", "index$": 1 }, "createdOn": { "a": true, "fo": "date-time", "h": "Created On", "n": "createdOn", "r": true, "t": "`$STRING`", "key$": "createdOn", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 3 }, "groupId": { "a": true, "h": "Group Id", "n": "groupId", "r": true, "t": "`$STRING`", "key$": "groupId", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "modifiedBy": { "a": true, "h": "Modified By", "n": "modifiedBy", "r": true, "t": "`$STRING`", "key$": "modifiedBy", "index$": 6 }, "modifiedOn": { "a": true, "fo": "date-time", "h": "Modified On", "n": "modifiedOn", "r": true, "t": "`$STRING`", "key$": "modifiedOn", "index$": 7 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$STRING`", "key$": "owner", "index$": 8 }, "systemDefined": { "a": true, "h": "System Defined", "n": "systemDefined", "r": true, "t": "`$BOOLEAN`", "key$": "systemDefined", "index$": 9 }, "versions": { "a": true, "h": "Versions", "n": "versions", "r": false, "t": "`$ARRAY`", "key$": "versions", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "branch", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "\"latest\"", "k": "param", "n": "id", "or": "branchId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions", "q": { "$action": "version", "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "branchId": "id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "branches" }, { "var": "id" }, { "lit": "versions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /groups/{groupId}/artifacts/{artifactId}/branches", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/groups/{groupId}/artifacts/{artifactId}/branches", "q": { "exist": ["artifact_id", "group_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "branches" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "\"latest\"", "k": "param", "n": "id", "or": "branchId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}", "q": { "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "branchId": "id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "branches" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "\"latest\"", "k": "param", "n": "id", "or": "branchId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}", "q": { "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "branchId": "id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "branches" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "\"latest\"", "k": "param", "n": "id", "or": "branchId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}", "q": { "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "branchId": "id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "branches" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "\"latest\"", "k": "param", "n": "id", "or": "branchId", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions", "q": { "$action": "version", "exist": ["artifact_id", "group_id", "id"] }, "r": { "param": { "artifactId": "artifact_id", "branchId": "id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "branches" }, { "var": "id" }, { "lit": "versions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.group", "$.main.kit.entity.artifact"]] }, "key$": "branch", "name__orig": "branch", "Name": "Branch", "name_": "branch", "name-": "branch", "NAME": "BRANCH", "index$": 10 }, { "active": true, "entity": "branch", "key$": "BasicBranchFlow", "kind": "basic", "name": "BasicBranchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "branch_ref01" }, "m": { "artifact_id": "artifact01", "group_id": "group01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "artifact_id": "artifact01", "group_id": "group01" }, "i": { "ref": "branch_ref01", "srcdatavar": "branch_ref01_data", "suffix": "_up0", "textfield": "artifactId" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-branch_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "branch_ref01", "srcdatavar": "branch_ref01_data", "suffix": "_dt0" }, "m": { "artifact_id": "artifact01", "group_id": "group01", "id": "branch01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-branch_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "branch_ref01", "suffix": "_rm0" }, "m": { "artifact_id": "artifact01", "group_id": "group01", "id": "branch01" }, "o": "remove", "s": [], "v": [], "index$": 3 }] }, 'Branch', { "POST /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions": { "protocol": "http", "requestBody": { "description": "The version to add to the branch.", "content": { "application/json": { "schema": { "description": "", "required": ["version"], "type": "object", "properties": { "version": { "description": "", "type": "string" } }, "x-ref": "#/components/schemas/AddVersionToBranch" } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "branchId", "description": "Artifact branch ID.  Must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "description": "The ID of a single artifact branch.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"latest\"", "x-ref": "#/components/schemas/BranchId" }, "in": "path", "required": true, "index$": 2 }] }, "POST /groups/{groupId}/artifacts/{artifactId}/branches": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for CreateBranch", "description": "", "required": ["branchId"], "type": "object", "properties": { "description": { "type": "string", "key$": "description" }, "branchId": { "description": "", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"latest\"", "x-ref": "#/components/schemas/BranchId", "key$": "branchId" }, "versions": { "description": "", "type": "array", "items": { "description": "A single version of an artifact.  Can be provided by the client when creating a new version,\nor it can be server-generated.  The value can be any string unique to the artifact, but it is\nrecommended to use a simple integer or a semver value.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"3.1.6\"", "x-ref": "#/components/schemas/Version" }, "key$": "versions" } }, "example": { "branchId": "1.0.x", "description": "The description of the branch." }, "x-ref": "#/components/schemas/CreateBranch", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }] }, "GET /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "branchId", "description": "Artifact branch ID.  Must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "description": "The ID of a single artifact branch.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"latest\"", "x-ref": "#/components/schemas/BranchId" }, "in": "path", "required": true, "index$": 2 }] }, "DELETE /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "branchId", "description": "Artifact branch ID.  Must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "description": "The ID of a single artifact branch.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"latest\"", "x-ref": "#/components/schemas/BranchId" }, "in": "path", "required": true, "index$": 2 }] }, "PUT /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "title": "Root Type for EditableArtifactMetaData", "description": "", "type": "object", "properties": { "description": { "type": "string", "key$": "description" } }, "example": { "description": "The description of the group." }, "x-ref": "#/components/schemas/EditableBranchMetaData", "index$": 1 } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "branchId", "description": "Artifact branch ID.  Must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "description": "The ID of a single artifact branch.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"latest\"", "x-ref": "#/components/schemas/BranchId" }, "in": "path", "required": true, "index$": 2 }] }, "PUT /groups/{groupId}/artifacts/{artifactId}/branches/{branchId}/versions": { "protocol": "http", "requestBody": { "description": "A new list of versions that should be on the branch.", "content": { "application/json": { "schema": { "description": "", "required": ["versions"], "type": "object", "properties": { "versions": { "description": "", "type": "array", "items": { "description": "A single version of an artifact.  Can be provided by the client when creating a new version,\nor it can be server-generated.  The value can be any string unique to the artifact, but it is\nrecommended to use a simple integer or a semver value.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"3.1.6\"", "x-ref": "#/components/schemas/Version" } } }, "x-ref": "#/components/schemas/ReplaceBranchVersions" } } }, "required": true }, "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "branchId", "description": "Artifact branch ID.  Must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.", "schema": { "description": "The ID of a single artifact branch.", "pattern": "^[a-zA-Z0-9._\\-+]{1,256}$", "type": "string", "example": "\"latest\"", "x-ref": "#/components/schemas/BranchId" }, "in": "path", "required": true, "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const branch_ref01_ent = client.Branch();
        let branch_ref01_data = setup.data.new.branch['branch_ref01'];
        branch_ref01_data['artifact_id'] = setup.idmap['artifact01'];
        branch_ref01_data['group_id'] = setup.idmap['group01'];
        branch_ref01_data = (await branch_ref01_ent.create(branch_ref01_data)).data();
        (0, node_assert_1.default)(null != branch_ref01_data.id);
        // UPDATE
        const branch_ref01_data_up0 = {};
        branch_ref01_data_up0.id = branch_ref01_data.id;
        branch_ref01_data_up0['artifact_id'] = setup.idmap['artifact_id'];
        branch_ref01_data_up0['group_id'] = setup.idmap['group_id'];
        const branch_ref01_markdef_up0 = { name: 'artifactId', value: 'Mark01-branch_ref01_' + setup.now };
        branch_ref01_data_up0[branch_ref01_markdef_up0.name] = branch_ref01_markdef_up0.value;
        const branch_ref01_resdata_up0 = (await branch_ref01_ent.update(branch_ref01_data_up0)).data();
        (0, node_assert_1.default)(branch_ref01_resdata_up0.id === branch_ref01_data_up0.id);
        (0, node_assert_1.default)(branch_ref01_resdata_up0[branch_ref01_markdef_up0.name] === branch_ref01_markdef_up0.value);
        // LOAD
        const branch_ref01_match_dt0 = {};
        branch_ref01_match_dt0.id = branch_ref01_data.id;
        const branch_ref01_data_dt0 = (await branch_ref01_ent.load(branch_ref01_match_dt0)).data();
        (0, node_assert_1.default)(branch_ref01_data_dt0.id === branch_ref01_data.id);
        // REMOVE
        const branch_ref01_match_rm0 = { id: branch_ref01_data.id };
        await branch_ref01_ent.remove(branch_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/branch/BranchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['branch01', 'branch02', 'branch03', 'group01', 'group02', 'group03', 'artifact01', 'artifact02', 'artifact03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_BRANCH_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_BRANCH_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_BRANCH_ENTID'];
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
//# sourceMappingURL=BranchEntity.test.js.map