

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


describe('CommentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.Comment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'comment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"commentId":{"a":true,"h":"Comment Id","n":"commentId","r":true,"t":"`$STRING`","key$":"commentId","index$":0},"createdOn":{"a":true,"fo":"date-time","h":"Created On","n":"createdOn","r":true,"t":"`$STRING`","key$":"createdOn","index$":1},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$STRING`","key$":"owner","index$":2},"value":{"a":true,"h":"Value","n":"value","r":true,"t":"`$STRING`","key$":"value","index$":3}},"name":"comment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example-artifact\"","k":"param","n":"artifact_id","or":"artifactId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"my-group\"","k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"version_expression","or":"versionExpression","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments","q":{"exist":["artifact_id","group_id","version_expression"]},"r":{"param":{"artifactId":"artifact_id","groupId":"group_id","versionExpression":"version_expression"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"artifacts"},{"var":"artifact_id"},{"lit":"versions"},{"var":"version_expression"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example-artifact\"","k":"param","n":"artifact_id","or":"artifactId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"my-group\"","k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"version_expression","or":"versionExpression","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments","q":{"exist":["artifact_id","group_id","version_expression"]},"r":{"param":{"artifactId":"artifact_id","groupId":"group_id","versionExpression":"version_expression"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"artifacts"},{"var":"artifact_id"},{"lit":"versions"},{"var":"version_expression"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.group","$.main.kit.entity.artifact","$.main.kit.entity.version"]]},"key$":"comment","name__orig":"comment","Name":"Comment","name_":"comment","name-":"comment","NAME":"COMMENT","index$":11}, {"active":true,"entity":"comment","key$":"BasicCommentFlow","kind":"basic","name":"BasicCommentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"comment_ref01"},"m":{"artifact_id":"artifact01","group_id":"group01","version_expression":"version_expression01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"artifact_id":"artifact01","group_id":"group01","version_expression":"version_expression01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"comment_ref01"}}],"index$":1}]}, 'Comment', {"POST /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"title":"Root Type for NewComment","description":"","required":["value"],"type":"object","properties":{"value":{"type":"string","key$":"value"}},"example":{"value":"This is a new comment on an existing artifact version."},"x-ref":"#/components/schemas/NewComment","index$":1}}},"required":true},"parameters":[{"name":"groupId","description":"The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0},{"name":"artifactId","description":"The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.","schema":{"description":"The ID of a single artifact.","pattern":"^.{1,512}$","type":"string","example":"\"example-artifact\"","x-ref":"#/components/schemas/ArtifactId"},"in":"path","required":true,"index$":1},{"name":"versionExpression","description":"An expression resolvable to a specific version ID within the given group and artifact. The following rules apply:\n\n - If the expression is in the form \"branch={branchId}\", and artifact branch {branchId} exists: The expression is resolved to a version that the branch points to.\n - Otherwise: The expression is resolved to a version with the same ID, which must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.","schema":{"type":"string"},"in":"path","required":true,"index$":2}]},"GET /groups/{groupId}/artifacts/{artifactId}/versions/{versionExpression}/comments":{"protocol":"http","parameters":[{"name":"groupId","description":"The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0},{"name":"artifactId","description":"The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.","schema":{"description":"The ID of a single artifact.","pattern":"^.{1,512}$","type":"string","example":"\"example-artifact\"","x-ref":"#/components/schemas/ArtifactId"},"in":"path","required":true,"index$":1},{"name":"versionExpression","description":"An expression resolvable to a specific version ID within the given group and artifact. The following rules apply:\n\n - If the expression is in the form \"branch={branchId}\", and artifact branch {branchId} exists: The expression is resolved to a version that the branch points to.\n - Otherwise: The expression is resolved to a version with the same ID, which must follow the \"[a-zA-Z0-9._\\\\-+]{1,256}\" pattern.","schema":{"type":"string"},"in":"path","required":true,"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const comment_ref01_ent = client.Comment()
    let comment_ref01_data = setup.data.new.comment['comment_ref01']
    comment_ref01_data['artifact_id'] = setup.idmap['artifact01']
    comment_ref01_data['group_id'] = setup.idmap['group01']
    comment_ref01_data['version_expression'] = setup.idmap['version_expression01']

    comment_ref01_data = (await comment_ref01_ent.create(comment_ref01_data)).data()
    assert(null != comment_ref01_data)


    // LIST
    const comment_ref01_match: any = {}
    comment_ref01_match['artifact_id'] = setup.idmap['artifact01']
    comment_ref01_match['group_id'] = setup.idmap['group01']
    comment_ref01_match['version_expression'] = setup.idmap['version_expression01']

    const comment_ref01_list = (await comment_ref01_ent.list(comment_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/comment/CommentTestData.json')

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
    ['comment01','comment02','comment03','group01','group02','group03','artifact01','artifact02','artifact03','version01','version02','version03','version_expression01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_COMMENT_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_COMMENT_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_COMMENT_ENTID']
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
  
