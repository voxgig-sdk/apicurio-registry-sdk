

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


describe('ArtifactReferenceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.ArtifactReference()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'artifact_reference.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artifactId":{"a":true,"h":"Artifact Id","n":"artifactId","r":true,"t":"`$STRING`","key$":"artifactId","index$":0},"content":{"a":true,"h":"Content","n":"content","r":true,"sh":"Raw content of the artifact version or a valid (and accessible) URL where the content can be found.","t":"`$STRING`","key$":"content","index$":1},"contentType":{"a":true,"h":"Content Type","n":"contentType","r":true,"sh":"The content-type, such as `application/json` or `text/xml`.","t":"`$STRING`","key$":"contentType","index$":2},"encoding":{"a":true,"h":"Encoding","n":"encoding","r":false,"sh":"Optional encoding for the content property.","t":"`$STRING`","key$":"encoding","index$":3},"groupId":{"a":true,"h":"Group Id","n":"groupId","r":true,"t":"`$STRING`","key$":"groupId","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":5},"references":{"a":true,"h":"References","n":"references","r":false,"sh":"Collection of references to other artifacts.","t":"`$ARRAY`","key$":"references","index$":6},"version":{"a":true,"h":"Version","n":"version","r":false,"t":"`$STRING`","key$":"version","index$":7}},"name":"artifact_reference","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /content/references","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"artifact_type","or":"artifact_type","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/content/references","q":{"exist":["artifact_type"]},"r":{},"s":[{"lit":"content"},{"lit":"references"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example-artifact\"","k":"param","n":"artifact_id","or":"artifact_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"my-group\"","k":"param","n":"group_id","or":"group_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"version_expression","or":"version_expression","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"ex":"\"INBOUND\"","k":"query","n":"ref_type","or":"ref_type","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references","q":{"exist":["artifact_id","group_id","ref_type","version_expression"]},"r":{"param":{"artifactId":"artifact_id","groupId":"group_id","versionExpression":"version_expression"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"artifacts"},{"var":"artifact_id"},{"lit":"versions"},{"var":"version_expression"},{"lit":"references"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /ids/globalIds/{globalId}/references","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"global_id_id","or":"global_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"\"INBOUND\"","k":"query","n":"ref_type","or":"ref_type","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ids/globalIds/{globalId}/references","q":{"exist":["global_id_id","ref_type"]},"r":{"param":{"globalId":"global_id_id"}},"s":[{"lit":"ids"},{"lit":"globalIds"},{"var":"global_id_id"},{"lit":"references"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /ids/contentHashes/{contentHash}/references","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"content_hash_id","or":"content_hash","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ids/contentHashes/{contentHash}/references","q":{"exist":["content_hash_id"]},"r":{"param":{"contentHash":"content_hash_id"}},"s":[{"lit":"ids"},{"lit":"contentHashes"},{"var":"content_hash_id"},{"lit":"references"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /ids/contentIds/{contentId}/references","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"content_id_id","or":"content_id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/ids/contentIds/{contentId}/references","q":{"exist":["content_id_id"]},"r":{"param":{"contentId":"content_id_id"}},"s":[{"lit":"ids"},{"lit":"contentIds"},{"var":"content_id_id"},{"lit":"references"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.group","$.main.kit.entity.artifact","$.main.kit.entity.version"]]},"key$":"artifact_reference","name__orig":"artifact_reference","Name":"ArtifactReference","name_":"artifact_reference","name-":"artifact-reference","NAME":"ARTIFACT_REFERENCE","index$":7}, {"active":true,"entity":"artifact_reference","key$":"BasicArtifactReferenceFlow","kind":"basic","name":"BasicArtifactReferenceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"artifact_reference_ref01"},"m":{"artifact_id":"artifact01","content_hash_id":"content_hash01","content_id_id":"content_id01","global_id_id":"global_id01","group_id":"group01","version_expression":"version_expression01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"content_id_id":"content_id01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"artifact_reference_ref01"}}],"index$":1}]}, 'ArtifactReference', {"POST /content/references":{"protocol":"http","requestBody":{"description":"The content to analyze for external references.","content":{"application/json":{"schema":{"description":"","required":["content","contentType"],"type":"object","properties":{"content":{"description":"Raw content of the artifact version or a valid (and accessible) URL where the content can be found.","type":"string","example":"","key$":"content"},"references":{"description":"Collection of references to other artifacts.","type":"array","items":{"title":"Root Type for ArtifactReference","description":"A reference to a different artifact. Typically used with artifact types that can have dependencies like Protobuf.","required":["artifactId","groupId","name"],"type":"object","properties":{"groupId":{"type":"string","key$":"groupId"},"artifactId":{"type":"string","key$":"artifactId"},"version":{"type":"string","key$":"version"},"name":{"type":"string","key$":"name"}},"example":{"groupId":"mygroup","artifactId":"13842090-2ce3-11ec-8d3d-0242ac130003","version":"2","name":"foo.bar.Open"},"x-ref":"#/components/schemas/ArtifactReference"},"key$":"references"},"contentType":{"description":"The content-type, such as `application/json` or `text/xml`.","type":"string","key$":"contentType"},"encoding":{"description":"Optional encoding for the content property. When set to 'base64', the content value will be base64-decoded by the server before processing.","type":"string","enum":["base64"],"key$":"encoding"}},"x-ref":"#/components/schemas/VersionContent","index$":1}}},"required":true},"parameters":[{"name":"artifactType","description":"The type of artifact represented by the content.  If not provided, the server will attempt to auto-detect the type from the content.","schema":{"type":"string"},"in":"query","index$":0}]},"GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/references":{"protocol":"http","parameters":[{"name":"groupId","description":"The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0},{"name":"artifactId","description":"The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.","schema":{"description":"The ID of a single artifact.","pattern":"^.{1,512}$","type":"string","example":"\"example-artifact\"","x-ref":"#/components/schemas/ArtifactId"},"in":"path","required":true,"index$":1},{"name":"versionExpression","description":"An expression resolvable to a specific version ID within the given group and artifact. The following rules apply:\n\n - If the expression is in the form \"branch={branchId}\", and artifact branch {branchId} exists: The expression is resolved to a version that the branch points to.\n - Otherwise: The expression is resolved to a version with the same ID, which must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.","schema":{"type":"string"},"in":"path","required":true,"index$":2},{"name":"refType","description":"Determines the type of reference to return, either INBOUND or OUTBOUND.  Defaults to OUTBOUND.","schema":{"description":"","enum":["OUTBOUND","INBOUND"],"type":"string","example":"\"INBOUND\"","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/ReferenceType"},"in":"query","required":false,"index$":3}]},"GET /ids/globalIds/{globalId}/references":{"protocol":"http","parameters":[{"name":"globalId","description":"Global identifier for an artifact version.","schema":{"format":"int64","type":"integer"},"in":"path","required":true,"index$":0},{"name":"refType","description":"Determines the type of reference to return, either INBOUND or OUTBOUND.  Defaults to OUTBOUND.","schema":{"description":"","enum":["OUTBOUND","INBOUND"],"type":"string","example":"\"INBOUND\"","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/ReferenceType"},"in":"query","index$":1}]},"GET /ids/contentHashes/{contentHash}/references":{"protocol":"http","parameters":[{"name":"contentHash","description":"SHA-256 content hash for a single artifact content.","schema":{"type":"string"},"in":"path","required":true,"index$":0}]},"GET /ids/contentIds/{contentId}/references":{"protocol":"http","parameters":[{"name":"contentId","description":"Global identifier for a single artifact content.","schema":{"format":"int64","type":"integer"},"in":"path","required":true,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const artifact_reference_ref01_ent = client.ArtifactReference()
    let artifact_reference_ref01_data = setup.data.new.artifact_reference['artifact_reference_ref01']
    artifact_reference_ref01_data['artifact_id'] = setup.idmap['artifact01']
    artifact_reference_ref01_data['content_hash_id'] = setup.idmap['content_hash01']
    artifact_reference_ref01_data['content_id_id'] = setup.idmap['content_id01']
    artifact_reference_ref01_data['global_id_id'] = setup.idmap['global_id01']
    artifact_reference_ref01_data['group_id'] = setup.idmap['group01']
    artifact_reference_ref01_data['version_expression'] = setup.idmap['version_expression01']

    artifact_reference_ref01_data = (await artifact_reference_ref01_ent.create(artifact_reference_ref01_data)).data()
    assert(null != artifact_reference_ref01_data)


    // LIST
    const artifact_reference_ref01_match: any = {}
    artifact_reference_ref01_match['content_id_id'] = setup.idmap['content_id01']

    const artifact_reference_ref01_list = (await artifact_reference_ref01_ent.list(artifact_reference_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/artifact_reference/ArtifactReferenceTestData.json')

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
    ['artifact_reference01','artifact_reference02','artifact_reference03','group01','group02','group03','artifact01','artifact02','artifact03','version01','version02','version03','content_hash01','content_id01','global_id01','version_expression01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_ARTIFACT_REFERENCE_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_ARTIFACT_REFERENCE_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_ARTIFACT_REFERENCE_ENTID']
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
  
