

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ApicurioRegistrySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ReferenceGraphEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.ReferenceGraph()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reference_graph.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"edges":{"a":true,"h":"Edges","n":"edges","r":true,"sh":"All edges (references) in the graph.","t":"`$ARRAY`","key$":"edges","index$":0},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":true,"sh":"Metadata about the graph structure.","t":"`$OBJECT`","key$":"metadata","index$":1},"nodes":{"a":true,"h":"Nodes","n":"nodes","r":true,"sh":"All nodes in the graph, including the root.","t":"`$ARRAY`","key$":"nodes","index$":2},"root":{"a":true,"h":"Root","n":"root","r":true,"sh":"The root node of the graph (the artifact for which references were requested).","t":"`$OBJECT`","key$":"root","index$":3}},"name":"reference_graph","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example-artifact\"","k":"param","n":"artifact_id","or":"artifactId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"my-group\"","k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"version_id","or":"versionExpression","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"ex":3,"k":"query","n":"depth","or":"depth","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"\"OUTBOUND\"","k":"query","n":"direction","or":"direction","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph","q":{"exist":["artifact_id","depth","direction","group_id","version_id"]},"r":{"param":{"artifactId":"artifact_id","groupId":"group_id","versionExpression":"version_id"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"artifacts"},{"var":"artifact_id"},{"lit":"versions"},{"var":"version_id"},{"lit":"references"},{"lit":"graph"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.group","$.main.kit.entity.artifact","$.main.kit.entity.version"]]},"key$":"reference_graph","name__orig":"reference_graph","Name":"ReferenceGraph","name_":"reference_graph","name-":"reference-graph","NAME":"REFERENCE_GRAPH","index$":31}, {"active":true,"entity":"reference_graph","key$":"BasicReferenceGraphFlow","kind":"basic","name":"BasicReferenceGraphFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"artifact_id":"artifact01","group_id":"group01","version_id":"version01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"reference_graph_ref01"}}],"index$":0}]}, 'ReferenceGraph', {"GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references/graph":{"protocol":"http","parameters":[{"name":"groupId","description":"The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0},{"name":"artifactId","description":"The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.","schema":{"description":"The ID of a single artifact.","pattern":"^.{1,512}$","type":"string","example":"\"example-artifact\"","x-ref":"#/components/schemas/ArtifactId"},"in":"path","required":true,"index$":1},{"name":"versionExpression","description":"An expression resolvable to a specific version ID within the given group and artifact.","schema":{"type":"string"},"in":"path","required":true,"index$":2},{"name":"direction","description":"The direction of references to include in the graph. Can be OUTBOUND (artifacts this version references), INBOUND (artifacts that reference this version), or BOTH. Defaults to OUTBOUND.","schema":{"description":"The direction of references to include in the graph.","enum":["OUTBOUND","INBOUND","BOTH"],"type":"string","example":"\"OUTBOUND\"","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/ReferenceGraphDirection"},"in":"query","required":false,"index$":3},{"name":"depth","description":"The maximum depth of the reference graph to traverse. Can be 1, 2, 3, or 0 for unlimited. Defaults to 3.","schema":{"type":"integer","minimum":0,"maximum":10,"default":3},"in":"query","required":false,"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let reference_graph_ref01_data = Object.values(setup.data.existing.reference_graph)[0] as any

    // LIST
    const reference_graph_ref01_ent = client.ReferenceGraph()
    const reference_graph_ref01_match: any = {}
    reference_graph_ref01_match['artifact_id'] = setup.idmap['artifact01']
    reference_graph_ref01_match['group_id'] = setup.idmap['group01']
    reference_graph_ref01_match['version_id'] = setup.idmap['version01']

    const reference_graph_ref01_list = (await reference_graph_ref01_ent.list(reference_graph_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/reference_graph/ReferenceGraphTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ApicurioRegistrySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['reference_graph01','reference_graph02','reference_graph03','group01','group02','group03','artifact01','artifact02','artifact03','version01','version02','version03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_REFERENCE_GRAPH_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_REFERENCE_GRAPH_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_REFERENCE_GRAPH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ApicurioRegistrySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
