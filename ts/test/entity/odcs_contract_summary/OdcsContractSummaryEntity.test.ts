

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


describe('OdcsContractSummaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.OdcsContractSummary()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'odcs_contract_summary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"contractId":{"a":true,"h":"Contract Id","n":"contractId","r":false,"sh":"The contract artifact ID.","t":"`$STRING`","key$":"contractId","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The contract display name.","t":"`$STRING`","key$":"name","index$":1}},"name":"odcs_contract_summary","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /groups/{groupId}/contracts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/groups/{groupId}/contracts","q":{"exist":["group_id","limit","offset"]},"r":{"param":{"groupId":"group_id"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"contracts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.group"]]},"key$":"odcs_contract_summary","name__orig":"odcs_contract_summary","Name":"OdcsContractSummary","name_":"odcs_contract_summary","name-":"odcs-contract-summary","NAME":"ODCS_CONTRACT_SUMMARY","index$":30}, {"active":true,"entity":"odcs_contract_summary","key$":"BasicOdcsContractSummaryFlow","kind":"basic","name":"BasicOdcsContractSummaryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"group_id":"group01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"odcs_contract_summary_ref01"}}],"index$":0}]}, 'OdcsContractSummary', {"GET /groups/{groupId}/contracts":{"protocol":"http","parameters":[{"name":"groupId","description":"The group ID.","schema":{"type":"string"},"in":"path","required":true,"index$":0},{"name":"limit","description":"Maximum number of contracts to return (default 20, max 500).","schema":{"type":"integer","format":"int32"},"in":"query","index$":1},{"name":"offset","description":"Number of contracts to skip (for pagination).","schema":{"type":"integer","format":"int32"},"in":"query","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let odcs_contract_summary_ref01_data = Object.values(setup.data.existing.odcs_contract_summary)[0] as any

    // LIST
    const odcs_contract_summary_ref01_ent = client.OdcsContractSummary()
    const odcs_contract_summary_ref01_match: any = {}
    odcs_contract_summary_ref01_match['group_id'] = setup.idmap['group01']

    const odcs_contract_summary_ref01_list = (await odcs_contract_summary_ref01_ent.list(odcs_contract_summary_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/odcs_contract_summary/OdcsContractSummaryTestData.json')

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
    ['odcs_contract_summary01','odcs_contract_summary02','odcs_contract_summary03','group01','group02','group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_ODCS_CONTRACT_SUMMARY_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_ODCS_CONTRACT_SUMMARY_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_ODCS_CONTRACT_SUMMARY_ENTID']
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
  
