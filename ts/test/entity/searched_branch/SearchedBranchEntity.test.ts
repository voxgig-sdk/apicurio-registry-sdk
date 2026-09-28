

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


describe('SearchedBranchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.SearchedBranch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'searched_branch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artifactId":{"a":true,"h":"Artifact Id","n":"artifactId","r":true,"t":"`$STRING`","key$":"artifactId","index$":0},"branchId":{"a":true,"h":"Branch Id","n":"branchId","r":true,"t":"`$STRING`","key$":"branchId","index$":1},"createdOn":{"a":true,"fo":"date-time","h":"Created On","n":"createdOn","r":true,"t":"`$STRING`","key$":"createdOn","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":3},"groupId":{"a":true,"h":"Group Id","n":"groupId","r":true,"t":"`$STRING`","key$":"groupId","index$":4},"modifiedBy":{"a":true,"h":"Modified By","n":"modifiedBy","r":true,"t":"`$STRING`","key$":"modifiedBy","index$":5},"modifiedOn":{"a":true,"fo":"date-time","h":"Modified On","n":"modifiedOn","r":true,"t":"`$STRING`","key$":"modifiedOn","index$":6},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$STRING`","key$":"owner","index$":7},"systemDefined":{"a":true,"h":"System Defined","n":"systemDefined","r":true,"t":"`$BOOLEAN`","key$":"systemDefined","index$":8}},"name":"searched_branch","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /groups/{groupId}/artifacts/{artifactId}/branches","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"example-artifact\"","k":"param","n":"artifact_id","or":"artifact_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"\"my-group\"","k":"param","n":"group_id","or":"group_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/groups/{groupId}/artifacts/{artifactId}/branches","q":{"exist":["artifact_id","group_id","limit","offset"]},"r":{"param":{"artifactId":"artifact_id","groupId":"group_id"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"artifacts"},{"var":"artifact_id"},{"lit":"branches"}],"t":{"req":"`reqdata`","res":"`body.branches`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.group","$.main.kit.entity.artifact"]]},"key$":"searched_branch","name__orig":"searched_branch","Name":"SearchedBranch","name_":"searched_branch","name-":"searched-branch","NAME":"SEARCHED_BRANCH","index$":35}, {"active":true,"entity":"searched_branch","key$":"BasicSearchedBranchFlow","kind":"basic","name":"BasicSearchedBranchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"artifact_id":"artifact01","group_id":"group01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"searched_branch_ref01"}}],"index$":0}]}, 'SearchedBranch', {"GET /groups/{groupId}/artifacts/{artifactId}/branches":{"protocol":"http","parameters":[{"name":"groupId","description":"The artifact group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0},{"name":"artifactId","description":"The artifact ID.  Can be a string (client-provided) or UUID (server-generated), representing the unique artifact identifier. Must follow the \".{1,512}\" pattern.","schema":{"description":"The ID of a single artifact.","pattern":"^.{1,512}$","type":"string","example":"\"example-artifact\"","x-ref":"#/components/schemas/ArtifactId"},"in":"path","required":true,"index$":1},{"name":"offset","description":"The number of branches to skip before starting to collect the result set.  Defaults to 0.","schema":{"type":"integer"},"in":"query","required":false,"index$":2},{"name":"limit","description":"The number of branches to return.  Defaults to 20.","schema":{"type":"integer"},"in":"query","required":false,"index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let searched_branch_ref01_data = Object.values(setup.data.existing.searched_branch)[0] as any

    // LIST
    const searched_branch_ref01_ent = client.SearchedBranch()
    const searched_branch_ref01_match: any = {}
    searched_branch_ref01_match['artifact_id'] = setup.idmap['artifact01']
    searched_branch_ref01_match['group_id'] = setup.idmap['group01']

    const searched_branch_ref01_list = (await searched_branch_ref01_ent.list(searched_branch_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/searched_branch/SearchedBranchTestData.json')

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
    ['searched_branch01','searched_branch02','searched_branch03','group01','group02','group03','artifact01','artifact02','artifact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_SEARCHED_BRANCH_ENTID']
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
  
