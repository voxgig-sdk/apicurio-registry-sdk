

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


describe('OdcsContractResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.OdcsContractResult()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'odcs_contract_result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"contractId":{"a":true,"h":"Contract Id","n":"contractId","r":false,"sh":"The contract artifact ID.","t":"`$STRING`","key$":"contractId","index$":0},"projection":{"a":true,"h":"Projection","n":"projection","r":false,"sh":"Summary of the projection performed when an ODCS contract is applied.","t":"`$OBJECT`","key$":"projection","index$":1},"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"The ODCS contract version.","t":"`$STRING`","key$":"version","index$":2}},"name":"odcs_contract_result","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /groups/{groupId}/contracts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/groups/{groupId}/contracts","q":{"exist":["group_id"]},"r":{"param":{"groupId":"group_id"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"contracts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /groups/{groupId}/contracts/{contractId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"contract_id","or":"contractId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/groups/{groupId}/contracts/{contractId}","q":{"exist":["contract_id","group_id"]},"r":{"param":{"contractId":"contract_id","groupId":"group_id"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"contracts"},{"var":"contract_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.group"],["$.main.kit.entity.group","$.main.kit.entity.contract"]]},"key$":"odcs_contract_result","name__orig":"odcs_contract_result","Name":"OdcsContractResult","name_":"odcs_contract_result","name-":"odcs-contract-result","NAME":"ODCS_CONTRACT_RESULT","index$":29}, {"active":true,"entity":"odcs_contract_result","key$":"BasicOdcsContractResultFlow","kind":"basic","name":"BasicOdcsContractResultFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"odcs_contract_result_ref01"},"m":{"group_id":"group01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"group_id":"group01"},"i":{"ref":"odcs_contract_result_ref01","srcdatavar":"odcs_contract_result_ref01_data","suffix":"_up0","textfield":"contractId"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-odcs_contract_result_ref01"}}],"v":[],"index$":1}]}, 'OdcsContractResult', {"POST /groups/{groupId}/contracts":{"protocol":"http","requestBody":{"content":{"application/x-yaml":{"schema":{"type":"string"}}},"required":true},"parameters":[{"name":"groupId","description":"The group ID.","schema":{"type":"string"},"in":"path","required":true,"index$":0}]},"PUT /groups/{groupId}/contracts/{contractId}":{"protocol":"http","requestBody":{"content":{"application/x-yaml":{"schema":{"type":"string"}}},"required":true},"parameters":[{"name":"groupId","description":"The group ID.","schema":{"type":"string"},"in":"path","required":true,"index$":0},{"name":"contractId","description":"The contract ID.","schema":{"type":"string"},"in":"path","required":true,"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const odcs_contract_result_ref01_ent = client.OdcsContractResult()
    let odcs_contract_result_ref01_data = setup.data.new.odcs_contract_result['odcs_contract_result_ref01']
    odcs_contract_result_ref01_data['group_id'] = setup.idmap['group01']

    odcs_contract_result_ref01_data = (await odcs_contract_result_ref01_ent.create(odcs_contract_result_ref01_data)).data()
    assert(null != odcs_contract_result_ref01_data)


    // UPDATE
    const odcs_contract_result_ref01_data_up0: any = {}
    odcs_contract_result_ref01_data_up0 ['group_id'] = setup.idmap['group_id']

    const odcs_contract_result_ref01_markdef_up0 = { name: 'contractId', value: 'Mark01-odcs_contract_result_ref01_' + setup.now }
    ;(odcs_contract_result_ref01_data_up0 as any)[odcs_contract_result_ref01_markdef_up0.name] = odcs_contract_result_ref01_markdef_up0.value

    const odcs_contract_result_ref01_resdata_up0 = (await odcs_contract_result_ref01_ent.update(odcs_contract_result_ref01_data_up0)).data()
    assert(null != odcs_contract_result_ref01_resdata_up0)

    assert((odcs_contract_result_ref01_resdata_up0 as any)[odcs_contract_result_ref01_markdef_up0.name] === odcs_contract_result_ref01_markdef_up0.value)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/odcs_contract_result/OdcsContractResultTestData.json')

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
    ['odcs_contract_result01','odcs_contract_result02','odcs_contract_result03','group01','group02','group03','contract01','contract02','contract03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_ODCS_CONTRACT_RESULT_ENTID']
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
  
