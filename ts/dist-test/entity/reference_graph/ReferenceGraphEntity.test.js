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
(0, node_test_1.describe)('ReferenceGraphEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('APICURIO_REGISTRY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ApicurioRegistrySDK.test();
        const ent = testsdk.ReferenceGraph();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reference_graph.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "edges": { "a": true, "h": "Edges", "n": "edges", "r": true, "sh": "All edges (references) in the graph.", "t": "`$ARRAY`", "key$": "edges", "index$": 0 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "sh": "Metadata about the graph structure.", "t": "`$OBJECT`", "key$": "metadata", "index$": 1 }, "nodes": { "a": true, "h": "Nodes", "n": "nodes", "r": true, "sh": "All nodes in the graph, including the root.", "t": "`$ARRAY`", "key$": "nodes", "index$": 2 }, "root": { "a": true, "h": "Root", "n": "root", "r": true, "sh": "The root node of the graph (the artifact for which references were requested).", "t": "`$OBJECT`", "key$": "root", "index$": 3 } }, "name": "reference_graph", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "\"example-artifact\"", "k": "param", "n": "artifact_id", "or": "artifactId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "\"my-group\"", "k": "param", "n": "group_id", "or": "groupId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "version_id", "or": "versionExpression", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "ex": 3, "k": "query", "n": "depth", "or": "depth", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "\"OUTBOUND\"", "k": "query", "n": "direction", "or": "direction", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph", "q": { "exist": ["artifact_id", "depth", "direction", "group_id", "version_id"] }, "r": { "param": { "artifactId": "artifact_id", "groupId": "group_id", "versionExpression": "version_id" } }, "s": [{ "lit": "groups" }, { "var": "group_id" }, { "lit": "artifacts" }, { "var": "artifact_id" }, { "lit": "versions" }, { "var": "version_id" }, { "lit": "references" }, { "lit": "graph" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.group", "$.main.kit.entity.artifact", "$.main.kit.entity.version"]] }, "key$": "reference_graph", "name__orig": "reference_graph", "Name": "ReferenceGraph", "name_": "reference_graph", "name-": "reference-graph", "NAME": "REFERENCE_GRAPH", "index$": 31 }, { "active": true, "entity": "reference_graph", "key$": "BasicReferenceGraphFlow", "kind": "basic", "name": "BasicReferenceGraphFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "artifact_id": "artifact01", "group_id": "group01", "version_id": "version01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "reference_graph_ref01" } }], "index$": 0 }] }, 'ReferenceGraph', { "GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph": { "protocol": "http", "parameters": [{ "name": "groupId", "description": "The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.", "schema": { "description": "An ID of a single artifact group.", "pattern": "^.{1,512}$", "type": "string", "example": "\"my-group\"", "x-ref": "#/components/schemas/GroupId" }, "in": "path", "required": true, "index$": 0 }, { "name": "artifactId", "description": "The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.", "schema": { "description": "The ID of a single artifact.", "pattern": "^.{1,512}$", "type": "string", "example": "\"example-artifact\"", "x-ref": "#/components/schemas/ArtifactId" }, "in": "path", "required": true, "index$": 1 }, { "name": "versionExpression", "description": "An expression resolvable to a specific version ID within the given group and artifact.", "schema": { "type": "string" }, "in": "path", "required": true, "index$": 2 }, { "name": "direction", "description": "The direction of references to include in the graph. Can be OUTBOUND (artifacts this version references), INBOUND (artifacts that reference this version), or BOTH. Defaults to OUTBOUND.", "schema": { "description": "The direction of references to include in the graph.", "enum": ["OUTBOUND", "INBOUND", "BOTH"], "type": "string", "example": "\"OUTBOUND\"", "x-codegen-package": "io.apicurio.registry.types", "x-ref": "#/components/schemas/ReferenceGraphDirection" }, "in": "query", "required": false, "index$": 3 }, { "name": "depth", "description": "The maximum depth of the reference graph to traverse. Can be 1, 2, 3, or 0 for unlimited. Defaults to 3.", "schema": { "type": "integer", "minimum": 0, "maximum": 10, "default": 3 }, "in": "query", "required": false, "index$": 4 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let reference_graph_ref01_data = Object.values(setup.data.existing.reference_graph)[0];
        // LIST
        const reference_graph_ref01_ent = client.ReferenceGraph();
        const reference_graph_ref01_match = {};
        reference_graph_ref01_match['artifact_id'] = setup.idmap['artifact01'];
        reference_graph_ref01_match['group_id'] = setup.idmap['group01'];
        reference_graph_ref01_match['version_id'] = setup.idmap['version01'];
        const reference_graph_ref01_list = (await reference_graph_ref01_ent.list(reference_graph_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reference_graph/ReferenceGraphTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ApicurioRegistrySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reference_graph01', 'reference_graph02', 'reference_graph03', 'group01', 'group02', 'group03', 'artifact01', 'artifact02', 'artifact03', 'version01', 'version02', 'version03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'APICURIO_REGISTRY_TEST_REFERENCE_GRAPH_ENTID': idmap,
        'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
        'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
        'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
    });
    idmap = env['APICURIO_REGISTRY_TEST_REFERENCE_GRAPH_ENTID'];
    const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['APICURIO_REGISTRY_TEST_REFERENCE_GRAPH_ENTID'];
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
//# sourceMappingURL=ReferenceGraphEntity.test.js.map