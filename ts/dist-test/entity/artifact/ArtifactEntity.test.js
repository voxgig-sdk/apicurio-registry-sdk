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
(0, node_test_1.describe)('ArtifactEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.Artifact();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'artifact.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artifactId": { "a": true, "h": "Artifact Id", "n": "artifactId", "r": true, "t": "`$STRING`", "key$": "artifactId", "index$": 0 }, "artifactType": { "a": true, "h": "Artifact Type", "n": "artifactType", "r": true, "t": "`$STRING`", "key$": "artifactType", "index$": 1 }, "artifacts": { "a": true, "h": "Artifacts", "n": "artifacts", "r": true, "sh": "The artifacts returned in the result set.", "t": "`$ARRAY`", "key$": "artifacts", "index$": 2 }, "count": { "a": true, "h": "Count", "n": "count", "r": true, "sh": "The total number of artifacts that matched the query that produced the result set (may be more than the number of artifacts in the result set).", "t": "`$INTEGER`", "key$": "count", "index$": 3 }, "createdOn": { "a": true, "fo": "date-time", "h": "Created On", "n": "createdOn", "r": true, "t": "`$STRING`", "key$": "createdOn", "index$": 4 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 5 }, "groupId": { "a": true, "h": "Group Id", "n": "groupId", "r": true, "t": "`$STRING`", "key$": "groupId", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "labels": { "a": true, "h": "Labels", "n": "labels", "r": false, "t": "`$OBJECT`", "key$": "labels", "index$": 8 }, "modifiedBy": { "a": true, "h": "Modified By", "n": "modifiedBy", "r": true, "t": "`$STRING`", "key$": "modifiedBy", "index$": 9 }, "modifiedOn": { "a": true, "fo": "date-time", "h": "Modified On", "n": "modifiedOn", "r": true, "t": "`$STRING`", "key$": "modifiedOn", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 11 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$STRING`", "key$": "owner", "index$": 12 }, "versions": { "a": true, "h": "Versions", "n": "versions", "r": true, "t": "`$ARRAY`", "key$": "versions", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "artifact", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /search/artifacts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "AVRO", "k": "query", "n": "artifact_type", "or": "artifact_type", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "canonical", "or": "canonical", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "k": "query", "n": "group_id", "or": "group_id", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "orderby", "or": "orderby", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": false, "k": "query", "n": "skip_count", "or": "skip_count", "r": false, "t": "`$BOOLEAN`", "index$": 7 }] }, "k": "http", "m": "POST", "o": "/search/artifacts", "q": { "exist": ["artifact_type", "canonical", "group_id", "limit", "offset", "order", "orderby", "skip_count"] }, "r": {}, "s": [{ "lit": "search" }, { "lit": "artifacts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /search/artifacts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "artifact_id", "or": "artifact_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "AVRO", "k": "query", "n": "artifact_type", "or": "artifact_type", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "content_id", "or": "content_id", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "description", "or": "description", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "global_id", "or": "global_id", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "group_id", "or": "group_id", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "label", "or": "label", "r": false, "t": "`$ARRAY`", "index$": 6 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 7 }, { "a": true, "k": "query", "n": "name", "or": "name", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 9 }, { "a": true, "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 10 }, { "a": true, "k": "query", "n": "orderby", "or": "orderby", "r": false, "t": "`$STRING`", "index$": 11 }, { "a": true, "ex": false, "k": "query", "n": "skip_count", "or": "skip_count", "r": false, "t": "`$BOOLEAN`", "index$": 12 }] }, "k": "http", "m": "GET", "o": "/search/artifacts", "q": { "exist": ["artifact_id", "artifact_type", "content_id", "description", "global_id", "group_id", "label", "limit", "name", "offset", "order", "orderby", "skip_count"] }, "r": {}, "s": [{ "lit": "search" }, { "lit": "artifacts" }], "t": { "req": "`reqdata`", "res": "`body.artifacts`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /groups/{groupId}/artifacts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "orderby", "or": "orderby", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": false, "k": "query", "n": "skip_count", "or": "skip_count", "r": false, "t": "`$BOOLEAN`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts", "q": { "exist": ["group_id", "limit", "offset", "order", "orderby", "skip_count"] }, "r": { "param": { "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }], "t": { "req": "`reqdata`", "res": "`body.artifacts`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /ids/globalIds/{globalId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "global_id", "or": "global_id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "reference", "or": "reference", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "return_artifact_type", "or": "return_artifact_type", "r": false, "t": "`$BOOLEAN`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/ids/globalIds/{globalId}", "q": { "exist": ["global_id", "reference", "return_artifact_type"] }, "r": { "param": { "globalId": "global_id" } }, "s": [{ "lit": "ids" }, { "lit": "globalIds" }, { "var": "global_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /admin/usage/artifacts/{groupId}/{artifactId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artifact_id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/admin/usage/artifacts/{groupId}/{artifactId}", "q": { "exist": ["artifact_id", "group_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id" } }, "s": [{ "lit": "admin" }, { "lit": "usage" }, { "lit": "artifacts" }, { "var": "group_id" }, { "var": "artifact_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /ids/contentHashes/{contentHash}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "content_hash", "or": "content_hash", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/ids/contentHashes/{contentHash}", "q": { "exist": ["content_hash"] }, "r": { "param": { "contentHash": "content_hash" } }, "s": [{ "lit": "ids" }, { "lit": "contentHashes" }, { "var": "content_hash" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /ids/contentIds/{contentId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "content_id", "or": "content_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/ids/contentIds/{contentId}", "q": { "exist": ["content_id"] }, "r": { "param": { "contentId": "content_id" } }, "s": [{ "lit": "ids" }, { "lit": "contentIds" }, { "var": "content_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /groups/{groupId}/artifacts/{artifactId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "id", "or": "artifact_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/groups/{groupId}/artifacts/{artifactId}", "q": { "exist": ["group_id", "id"] }, "r": { "param": { "artifactId": "id", "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /groups/{groupId}/artifacts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/groups/{groupId}/artifacts", "q": { "exist": ["group_id"] }, "r": { "param": { "groupId": "group_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.group"]] }, "key$": "artifact", "name__orig": "artifact", "Name": "Artifact", "name_": "artifact", "name-": "artifact", "NAME": "ARTIFACT", "index$": 6 }, { "active": true, "entity": "artifact", "key$": "BasicArtifactFlow", "kind": "basic", "name": "BasicArtifactFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "artifact_ref01" }, "m": { "group_id": "group01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "group_id": "group01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "artifact_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "artifact_ref01", "srcdatavar": "artifact_ref01_data", "suffix": "_dt0" }, "m": { "id": "artifact01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-artifact_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "artifact_ref01", "suffix": "_rm0" }, "m": { "id": "artifact01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "group_id": "group01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "artifact_ref01" } }], "index$": 4 }] }, 'Artifact', { "POST /search/artifacts": { "protocol": "http", "requestBody": { "description": "The content to search for.", "content": { "*/*": { "schema": { "format": "binary", "type": "string", "x-codegen-inline": true, "x-ref": "#/components/schemas/FileContent" } } }, "required": true }, "parameters": [{ "name": "canonical", "description": "Parameter that can be set to `true` to indicate that the server should \"canonicalize\" the content when searching for matching artifacts.  Canonicalization is unique to each artifact type, but typically involves removing any extra whitespace and formatting the content in a consistent manner.  Must be used along with the `artifactType` query parameter.", "schema": { "type": "boolean" }, "in": "query", "index$": 0 }, { "name": "artifactType", "description": "Indicates the type of artifact represented by the content being used for the search.  This is only needed when using the `canonical` query parameter, so that the server knows how to canonicalize the content prior to searching for matching artifacts.", "schema": { "description": "", "type": "string", "example": "AVRO", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/ArtifactType" }, "in": "query", "index$": 1 }, { "name": "groupId", "description": "Filter by artifact group.", "schema": { "type": "string" }, "in": "query", "index$": 2 }, { "name": "offset", "description": "The number of artifacts to skip before starting to collect the result set.  Defaults to 0.", "schema": { "default": 0, "type": "integer" }, "in": "query", "required": false, "index$": 3 }, { "name": "limit", "description": "The number of artifacts to return.  Defaults to 20.", "schema": { "default": 20, "type": "integer" }, "in": "query", "required": false, "index$": 4 }, { "name": "order", "description": "Sort order, ascending (`asc`) or descending (`desc`).", "schema": { "description": "", "enum": ["asc", "desc"], "type": "string", "x-ref": "#/components/schemas/SortOrder" }, "in": "query", "index$": 5 }, { "name": "orderby", "description": "The field to sort by.  Can be one of:\n\n* `name`\n* `createdOn`\n", "schema": { "description": "", "enum": ["groupId", "artifactId", "createdOn", "modifiedOn", "artifactType", "name"], "type": "string", "x-ref": "#/components/schemas/ArtifactSortBy" }, "in": "query", "index$": 6 }, { "name": "skipCount", "description": "Indicates whether to skip the total count query.  When true, the total count is not computed and count will be 0 in the response.  This can improve performance for large datasets.", "schema": { "default": false, "type": "boolean" }, "in": "query", "required": false, "index$": 7 }] }, "GET /search/artifacts": { "protocol": "http", "parameters": [{ "name": "name", "description": "Filter by artifact name.", "schema": { "type": "string" }, "in": "query", "index$": 0 }, { "name": "offset", "description": "The number of artifacts to skip before starting to collect the result set.  Defaults to 0.", "schema": { "default": 0, "type": "integer" }, "in": "query", "required": false, "index$": 1 }, { "name": "limit", "description": "The number of artifacts to return.  Defaults to 20.", "schema": { "default": 20, "type": "integer" }, "in": "query", "required": false, "index$": 2 }, { "name": "order", "description": "Sort order, ascending (`asc`) or descending (`desc`).", "schema": { "description": "", "enum": ["asc", "desc"], "type": "string", "x-ref": "#/components/schemas/SortOrder" }, "in": "query", "index$": 3 }, { "name": "orderby", "description": "The field to sort by.  Can be one of:\n\n* `name`\n* `createdOn`\n", "schema": { "description": "", "enum": ["groupId", "artifactId", "createdOn", "modifiedOn", "artifactType", "name"], "type": "string", "x-ref": "#/components/schemas/ArtifactSortBy" }, "in": "query", "index$": 4 }, { "name": "labels", "description": "Filter by one or more name/value label. Separate each name/value pair using a colon, which splits on the last colon (e.g. `labels=foo:bar` matches key `foo` and value `bar`). Note: the key:value query treats the last colon as the delimiter, so values containing colons cannot be matched via this syntax (they remain matchable via key-only queries).", "schema": { "type": "array", "items": { "type": "string" } }, "in": "query", "index$": 5 }, { "name": "description", "description": "Filter by description.", "schema": { "type": "string" }, "in": "query", "index$": 6 }, { "name": "groupId", "description": "Filter by artifact group.", "schema": { "type": "string" }, "in": "query", "index$": 7 }, { "name": "globalId", "description": "Filter by globalId.", "schema": { "format": "int64", "type": "integer" }, "in": "query", "index$": 8 }, { "name": "contentId", "description": "Filter by contentId.", "schema": { "format": "int64", "type": "integer" }, "in": "query", "required": false, "index$": 9 }, { "name": "artifactId", "description": "Filter by artifactId.", "schema": { "type": "string" }, "in": "query", "index$": 10 }, { "name": "artifactType", "description": "Filter by artifact type (`AVRO`, `JSON`, etc).", "schema": { "description": "", "type": "string", "example": "AVRO", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/ArtifactType" }, "in": "query", "index$": 11 }, { "name": "skipCount", "description": "Indicates whether to skip the total count query.  When true, the total count is not computed and count will be 0 in the response.  This can improve performance for large datasets.", "schema": { "default": false, "type": "boolean" }, "in": "query", "required": false, "index$": 12 }] }, "GET /groups/{groupId}/artifacts": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "limit", "description": "The number of artifacts to return.  Defaults to 20.", "schema": { "type": "integer" }, "in": "query", "index$": 1 }, { "name": "offset", "description": "The number of artifacts to skip before starting the result set.  Defaults to 0.", "schema": { "type": "integer" }, "in": "query", "index$": 2 }, { "name": "order", "description": "Sort order, ascending (`asc`) or descending (`desc`).", "schema": { "description": "", "enum": ["asc", "desc"], "type": "string", "x-ref": "#/components/schemas/SortOrder" }, "in": "query", "index$": 3 }, { "name": "orderby", "description": "The field to sort by.  Can be one of:\n\n* `name`\n* `createdOn`\n", "schema": { "description": "", "enum": ["groupId", "artifactId", "createdOn", "modifiedOn", "artifactType", "name"], "type": "string", "x-ref": "#/components/schemas/ArtifactSortBy" }, "in": "query", "index$": 4 }, { "name": "skipCount", "description": "Indicates whether to skip the total count query.  When true, the total count is not computed and count will be 0 in the response.  This can improve performance for large datasets.", "schema": { "default": false, "type": "boolean" }, "in": "query", "required": false, "index$": 5 }] }, "GET /ids/globalIds/{globalId}": { "protocol": "http", "parameters": [{ "name": "globalId", "description": "Global identifier for an artifact version.", "schema": { "format": "int64", "type": "integer" }, "in": "path", "required": true, "index$": 0 }, { "name": "references", "description": "Allows the user to specify how references in the content should be treated.", "schema": { "description": "How to handle references when retrieving content.  References can either be\nleft unchanged (`PRESERVE`), re-written so they are valid in the context of the\nregistry (`REWRITE`), or fully dereferenced such that all externally referenced\ncontent is internalized (`DEREFERENCE`).", "enum": ["PRESERVE", "DEREFERENCE", "REWRITE"], "type": "string", "x-ref": "#/components/schemas/HandleReferencesType" }, "in": "query", "index$": 1 }, { "name": "returnArtifactType", "description": "When set to `true`, the HTTP response will include a header named `X-Registry-ArtifactType`\nthat contains the type of the artifact being returned.", "schema": { "type": "boolean" }, "in": "query", "index$": 2 }] }, "GET /admin/usage/artifacts/{groupId}/{artifactId}": { "protocol": "http", "parameters": [{ "name": "groupId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "artifactId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /ids/contentHashes/{contentHash}": { "protocol": "http", "parameters": [{ "name": "contentHash", "description": "SHA-256 content hash for a single artifact content.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 0 }] }, "GET /ids/contentIds/{contentId}": { "protocol": "http", "parameters": [{ "name": "contentId", "description": "Global identifier for a single artifact content.", "schema": { "format": "int64", "type": "integer" }, "in": "path", "required": true, "index$": 0 }] }, "DELETE /groups/{groupId}/artifacts/{artifactId}": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }] }, "DELETE /groups/{groupId}/artifacts": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const artifact_ref01_ent = client.Artifact();
        let artifact_ref01_data = setup.data.new.artifact['artifact_ref01'];
        artifact_ref01_data['group_id'] = setup.idmap['group01'];
        artifact_ref01_data = (await artifact_ref01_ent.create(artifact_ref01_data)).data();
        (0, node_assert_1.default)(null != artifact_ref01_data.id);
        // LIST
        const artifact_ref01_match = {};
        artifact_ref01_match['group_id'] = setup.idmap['group01'];
        const artifact_ref01_list = (await artifact_ref01_ent.list(artifact_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(artifact_ref01_list, { id: artifact_ref01_data.id })));
        // LOAD
        const artifact_ref01_match_dt0 = {};
        artifact_ref01_match_dt0.id = artifact_ref01_data.id;
        const artifact_ref01_data_dt0 = (await artifact_ref01_ent.load(artifact_ref01_match_dt0)).data();
        (0, node_assert_1.default)(artifact_ref01_data_dt0.id === artifact_ref01_data.id);
        // REMOVE
        const artifact_ref01_match_rm0 = { id: artifact_ref01_data.id };
        await artifact_ref01_ent.remove(artifact_ref01_match_rm0);
        // LIST
        const artifact_ref01_match_rt0 = {};
        artifact_ref01_match_rt0['group_id'] = setup.idmap['group01'];
        const artifact_ref01_list_rt0 = (await artifact_ref01_ent.list(artifact_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(artifact_ref01_list_rt0, { id: artifact_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/artifact/ArtifactTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['artifact01', 'artifact02', 'artifact03', 'group01', 'group02', 'group03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_ARTIFACT_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_ARTIFACT_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_ARTIFACT_ENTID'];
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
//# sourceMappingURL=ArtifactEntity.test.js.map