

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


describe('GlobalRuleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.GlobalRule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'global_rule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$STRING`","key$":"config","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"ruleType":{"a":true,"h":"Rule Type","n":"ruleType","r":false,"t":"`$STRING`","key$":"ruleType","index$":2}},"id":{"field":"id","name":"id"},"name":"global_rule","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /admin/rules","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/admin/rules","q":{},"r":{},"s":[{"lit":"admin"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /admin/rules","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/admin/rules","q":{},"r":{},"s":[{"lit":"admin"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /admin/rules/{ruleType}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"VALIDITY","k":"param","n":"id","or":"ruleType","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/admin/rules/{ruleType}","q":{"exist":["id"]},"r":{"param":{"ruleType":"id"}},"s":[{"lit":"admin"},{"lit":"rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /admin/rules","source":"openapi3","version":2},"g":{},"k":"http","m":"DELETE","o":"/admin/rules","q":{},"r":{},"s":[{"lit":"admin"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"global_rule","name__orig":"global_rule","Name":"GlobalRule","name_":"global_rule","name-":"global-rule","NAME":"GLOBAL_RULE","index$":24}, {"active":true,"entity":"global_rule","key$":"BasicGlobalRuleFlow","kind":"basic","name":"BasicGlobalRuleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"global_rule_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"global_rule_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"global_rule_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"global_rule_ref01"}}],"index$":3}]}, 'GlobalRule', {"POST /admin/rules":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"title":"Root Type for Rule","description":"","required":["config"],"type":"object","properties":{"config":{"type":"string","key$":"config"},"ruleType":{"description":"","enum":["VALIDITY","COMPATIBILITY","INTEGRITY"],"type":"string","example":"VALIDITY","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/RuleType","key$":"ruleType"}},"example":{"ruleType":"VALIDITY","config":"FULL"},"x-ref":"#/components/schemas/CreateRule","index$":1}}},"required":true},"parameters":[]},"GET /admin/rules":{"protocol":"http","parameters":[]},"DELETE /admin/rules/{ruleType}":{"protocol":"http","parameters":[{"name":"ruleType","description":"The unique name/type of a rule.","schema":{"description":"","enum":["VALIDITY","COMPATIBILITY","INTEGRITY"],"type":"string","example":"VALIDITY","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/RuleType"},"in":"path","required":true,"index$":0}]},"DELETE /admin/rules":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const global_rule_ref01_ent = client.GlobalRule()
    let global_rule_ref01_data = setup.data.new.global_rule['global_rule_ref01']

    global_rule_ref01_data = (await global_rule_ref01_ent.create(global_rule_ref01_data)).data()
    assert(null != global_rule_ref01_data.id)


    // LIST
    const global_rule_ref01_match: any = {}

    const global_rule_ref01_list = (await global_rule_ref01_ent.list(global_rule_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(global_rule_ref01_list, { id: global_rule_ref01_data.id })))


    // REMOVE
    const global_rule_ref01_match_rm0: any = { id: global_rule_ref01_data.id }
    await global_rule_ref01_ent.remove(global_rule_ref01_match_rm0)
  

    // LIST
    const global_rule_ref01_match_rt0: any = {}

    const global_rule_ref01_list_rt0 = (await global_rule_ref01_ent.list(global_rule_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(global_rule_ref01_list_rt0, { id: global_rule_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/global_rule/GlobalRuleTestData.json')

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
    ['global_rule01','global_rule02','global_rule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_GLOBAL_RULE_ENTID']
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
  
