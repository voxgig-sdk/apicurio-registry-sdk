

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


describe('ContractRuleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.ContractRule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contract_rule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artifactId":{"a":true,"h":"Artifact Id","n":"artifactId","r":false,"sh":"The artifact ID containing the rule.","t":"`$STRING`","key$":"artifactId","index$":0},"globalId":{"a":true,"fo":"int64","h":"Global Id","n":"globalId","r":false,"sh":"The global ID of the version (null for artifact-level rules).","t":"`$INTEGER`","key$":"globalId","index$":1},"groupId":{"a":true,"h":"Group Id","n":"groupId","r":false,"sh":"The group ID of the artifact containing the rule.","t":"`$STRING`","key$":"groupId","index$":2},"rule":{"a":true,"h":"Rule","n":"rule","r":true,"sh":"A single contract rule definition.","t":"`$OBJECT`","key$":"rule","index$":3},"ruleCategory":{"a":true,"h":"Rule Category","n":"ruleCategory","r":false,"sh":"The rule category (DOMAIN or MIGRATION).","t":"`$STRING`","key$":"ruleCategory","index$":4}},"name":"contract_rule","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search/contract/rules","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"tag","or":"tag","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/search/contract/rules","q":{"exist":["tag"]},"r":{},"s":[{"lit":"search"},{"lit":"contract"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"contract_rule","name__orig":"contract_rule","Name":"ContractRule","name_":"contract_rule","name-":"contract-rule","NAME":"CONTRACT_RULE","index$":16}, {"active":true,"entity":"contract_rule","key$":"BasicContractRuleFlow","kind":"basic","name":"BasicContractRuleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"contract_rule_ref01"}}],"index$":0}]}, 'ContractRule', {"GET /search/contract/rules":{"protocol":"http","parameters":[{"name":"tag","description":"The tag value to search for in contract rules.","schema":{"type":"string"},"in":"query","required":true,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let contract_rule_ref01_data = Object.values(setup.data.existing.contract_rule)[0] as any

    // LIST
    const contract_rule_ref01_ent = client.ContractRule()
    const contract_rule_ref01_match: any = {}

    const contract_rule_ref01_list = (await contract_rule_ref01_ent.list(contract_rule_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/contract_rule/ContractRuleTestData.json')

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
    ['contract_rule01','contract_rule02','contract_rule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_CONTRACT_RULE_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_CONTRACT_RULE_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_CONTRACT_RULE_ENTID']
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
  
