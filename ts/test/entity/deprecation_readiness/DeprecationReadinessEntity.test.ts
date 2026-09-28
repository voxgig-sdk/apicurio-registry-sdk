

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


describe('DeprecationReadinessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.DeprecationReadiness()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deprecation_readiness.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clientId":{"a":true,"h":"Client Id","n":"clientId","r":false,"t":"`$STRING`","key$":"clientId","index$":0},"fetchCount":{"a":true,"fo":"int64","h":"Fetch Count","n":"fetchCount","r":false,"t":"`$INTEGER`","key$":"fetchCount","index$":1},"lastFetched":{"a":true,"fo":"int64","h":"Last Fetched","n":"lastFetched","r":false,"t":"`$INTEGER`","key$":"lastFetched","index$":2}},"name":"deprecation_readiness","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"artifact_id","or":"artifact_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"group_id","or":"group_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"version_id","or":"version","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness","q":{"exist":["artifact_id","group_id","version_id"]},"r":{"param":{"artifactId":"artifact_id","groupId":"group_id","version":"version_id"}},"s":[{"lit":"admin"},{"lit":"usage"},{"lit":"artifacts"},{"var":"group_id"},{"var":"artifact_id"},{"lit":"versions"},{"var":"version_id"},{"lit":"deprecation-readiness"}],"t":{"req":"`reqdata`","res":"`body.activeConsumers`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.artifact","$.main.kit.entity.version"]]},"key$":"deprecation_readiness","name__orig":"deprecation_readiness","Name":"DeprecationReadiness","name_":"deprecation_readiness","name-":"deprecation-readiness","NAME":"DEPRECATION_READINESS","index$":19}, {"active":true,"entity":"deprecation_readiness","key$":"BasicDeprecationReadinessFlow","kind":"basic","name":"BasicDeprecationReadinessFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"artifact_id":"artifact01","group_id":"group01","version_id":"version01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deprecation_readiness_ref01"}}],"index$":0}]}, 'DeprecationReadiness', {"GET /admin/usage/artifacts/{groupId}/{artifactId}/versions/{version}/deprecation-readiness":{"protocol":"http","parameters":[{"name":"groupId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artifactId","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"version","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deprecation_readiness_ref01_data = Object.values(setup.data.existing.deprecation_readiness)[0] as any

    // LIST
    const deprecation_readiness_ref01_ent = client.DeprecationReadiness()
    const deprecation_readiness_ref01_match: any = {}
    deprecation_readiness_ref01_match['artifact_id'] = setup.idmap['artifact01']
    deprecation_readiness_ref01_match['group_id'] = setup.idmap['group01']
    deprecation_readiness_ref01_match['version_id'] = setup.idmap['version01']

    const deprecation_readiness_ref01_list = (await deprecation_readiness_ref01_ent.list(deprecation_readiness_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deprecation_readiness/DeprecationReadinessTestData.json')

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
    ['deprecation_readiness01','deprecation_readiness02','deprecation_readiness03','artifact01','artifact02','artifact03','version01','version02','version03','group01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_DEPRECATION_READINESS_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_DEPRECATION_READINESS_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_DEPRECATION_READINESS_ENTID']
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
  
