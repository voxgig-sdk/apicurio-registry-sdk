

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


describe('GroupRuleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.GroupRule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'group_rule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$STRING`","key$":"config","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"ruleType":{"a":true,"h":"Rule Type","n":"ruleType","r":false,"t":"`$STRING`","key$":"ruleType","index$":2}},"id":{"field":"id","name":"id"},"name":"group_rule","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /groups/{groupId}/rules","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"my-group\"","k":"param","n":"id","or":"groupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/groups/{groupId}/rules","q":{"exist":["id"]},"r":{"param":{"groupId":"id"}},"s":[{"lit":"groups"},{"var":"id"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /groups/{groupId}/rules/{ruleType}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"my-group\"","k":"param","n":"group_id","or":"groupId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"ruleType","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/groups/{groupId}/rules/{ruleType}","q":{"exist":["group_id","id"]},"r":{"param":{"groupId":"group_id","ruleType":"id"}},"s":[{"lit":"groups"},{"var":"group_id"},{"lit":"rules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /groups/{groupId}/rules","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"\"my-group\"","k":"param","n":"id","or":"groupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/groups/{groupId}/rules","q":{"exist":["id"]},"r":{"param":{"groupId":"id"}},"s":[{"lit":"groups"},{"var":"id"},{"lit":"rules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.group"]]},"key$":"group_rule","name__orig":"group_rule","Name":"GroupRule","name_":"group_rule","name-":"group-rule","NAME":"GROUP_RULE","index$":26}, {"active":true,"entity":"group_rule","key$":"BasicGroupRuleFlow","kind":"basic","name":"BasicGroupRuleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"group_rule_ref01"},"m":{"group_id":"group01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"group_rule_ref01","suffix":"_rm0"},"m":{"id":"group_rule01"},"o":"remove","s":[],"v":[],"index$":1}]}, 'GroupRule', {"POST /groups/{groupId}/rules":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"title":"Root Type for Rule","description":"","required":["config"],"type":"object","properties":{"config":{"type":"string","key$":"config"},"ruleType":{"description":"","enum":["VALIDITY","COMPATIBILITY","INTEGRITY"],"type":"string","example":"VALIDITY","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/RuleType","key$":"ruleType"}},"example":{"ruleType":"VALIDITY","config":"FULL"},"x-ref":"#/components/schemas/CreateRule","index$":1}}},"required":true},"parameters":[{"name":"groupId","description":"The group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0}]},"DELETE /groups/{groupId}/rules/{ruleType}":{"protocol":"http","parameters":[{"name":"groupId","description":"The group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0},{"name":"ruleType","description":"The unique name/type of a rule.","schema":{"enum":["VALIDITY","COMPATIBILITY","INTEGRITY"],"type":"string"},"in":"path","required":true,"index$":1}]},"DELETE /groups/{groupId}/rules":{"protocol":"http","parameters":[{"name":"groupId","description":"The group ID.  Must be a string provided by the client, representing the name of the grouping of artifacts. Must follow the \".{1,512}\" pattern.","schema":{"description":"An ID of a single artifact group.","pattern":"^.{1,512}$","type":"string","example":"\"my-group\"","x-ref":"#/components/schemas/GroupId"},"in":"path","required":true,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const group_rule_ref01_ent = client.GroupRule()
    let group_rule_ref01_data = setup.data.new.group_rule['group_rule_ref01']
    group_rule_ref01_data['group_id'] = setup.idmap['group01']

    group_rule_ref01_data = (await group_rule_ref01_ent.create(group_rule_ref01_data)).data()
    assert(null != group_rule_ref01_data.id)


    // REMOVE
    const group_rule_ref01_match_rm0: any = { id: group_rule_ref01_data.id }
    await group_rule_ref01_ent.remove(group_rule_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/group_rule/GroupRuleTestData.json')

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
    ['group_rule01','group_rule02','group_rule03','group01','group02','group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_GROUP_RULE_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_GROUP_RULE_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_GROUP_RULE_ENTID']
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
  
