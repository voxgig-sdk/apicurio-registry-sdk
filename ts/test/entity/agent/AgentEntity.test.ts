

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


describe('AgentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.Agent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artifactId":{"a":true,"h":"Artifact Id","n":"artifactId","r":false,"t":"`$STRING`","key$":"artifactId","index$":0},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":false,"sh":"Capabilities of an A2A agent.","t":"`$OBJECT`","key$":"capabilities","index$":1},"createdOn":{"a":true,"fo":"int64","h":"Created On","n":"createdOn","r":false,"t":"`$INTEGER`","key$":"createdOn","index$":2},"defaultInputModes":{"a":true,"h":"Default Input Modes","n":"defaultInputModes","r":false,"t":"`$ARRAY`","key$":"defaultInputModes","index$":3},"defaultOutputModes":{"a":true,"h":"Default Output Modes","n":"defaultOutputModes","r":false,"t":"`$ARRAY`","key$":"defaultOutputModes","index$":4},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":5},"documentationUrl":{"a":true,"h":"Documentation Url","n":"documentationUrl","r":false,"t":"`$STRING`","key$":"documentationUrl","index$":6},"groupId":{"a":true,"h":"Group Id","n":"groupId","r":false,"t":"`$STRING`","key$":"groupId","index$":7},"iconUrl":{"a":true,"h":"Icon Url","n":"iconUrl","r":false,"t":"`$STRING`","key$":"iconUrl","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":9},"owner":{"a":true,"h":"Owner","n":"owner","r":false,"t":"`$STRING`","key$":"owner","index$":10},"protocolVersion":{"a":true,"h":"Protocol Version","n":"protocolVersion","r":false,"t":"`$STRING`","key$":"protocolVersion","index$":11},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"sh":"Provider of an A2A agent.","t":"`$OBJECT`","key$":"provider","index$":12},"securityRequirements":{"a":true,"h":"Security Requirements","n":"securityRequirements","r":false,"t":"`$ARRAY`","key$":"securityRequirements","index$":13},"securitySchemes":{"a":true,"h":"Security Schemes","n":"securitySchemes","r":false,"t":"`$OBJECT`","key$":"securitySchemes","index$":14},"signatures":{"a":true,"h":"Signatures","n":"signatures","r":false,"t":"`$ARRAY`","key$":"signatures","index$":15},"skills":{"a":true,"h":"Skills","n":"skills","r":false,"t":"`$ARRAY`","key$":"skills","index$":16},"supportedInterfaces":{"a":true,"h":"Supported Interfaces","n":"supportedInterfaces","r":false,"t":"`$ARRAY`","key$":"supportedInterfaces","index$":17},"version":{"a":true,"h":"Version","n":"version","r":false,"t":"`$STRING`","key$":"version","index$":18}},"name":"agent","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /well-known/agents","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"capability","or":"capability","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"k":"query","n":"input_mode","or":"input_mode","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"output_mode","or":"output_mode","r":false,"t":"`$ARRAY`","index$":5},{"a":true,"k":"query","n":"skill","or":"skill","r":false,"t":"`$ARRAY`","index$":6}]},"k":"http","m":"GET","o":"/well-known/agents","q":{"exist":["capability","input_mode","limit","name","offset","output_mode","skill"]},"r":{},"s":[{"lit":"well-known"},{"lit":"agents"}],"t":{"req":"`reqdata`","res":"`body.agents`"},"index$":0},{"a":true,"co":{"id":"GET /well-known/agent.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/well-known/agent.json","q":{},"r":{},"s":[{"lit":"well-known"},{"lit":"agent.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"agent","name__orig":"agent","Name":"Agent","name_":"agent","name-":"agent","NAME":"AGENT","index$":1}, {"active":true,"entity":"agent","key$":"BasicAgentFlow","kind":"basic","name":"BasicAgentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_ref01"}}],"index$":0}]}, 'Agent', {"GET /well-known/agents":{"protocol":"http","parameters":[{"name":"offset","schema":{"default":0,"type":"integer"},"in":"query","required":false,"index$":0},{"name":"limit","schema":{"default":20,"type":"integer"},"in":"query","required":false,"index$":1},{"name":"name","schema":{"type":"string"},"in":"query","index$":2},{"name":"skill","schema":{"type":"array","items":{"type":"string"}},"in":"query","index$":3},{"name":"capability","schema":{"type":"array","items":{"type":"string"}},"in":"query","index$":4},{"name":"inputMode","schema":{"type":"array","items":{"type":"string"}},"in":"query","index$":5},{"name":"outputMode","schema":{"type":"array","items":{"type":"string"}},"in":"query","index$":6}]},"GET /well-known/agent.json":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_ref01_data = Object.values(setup.data.existing.agent)[0] as any

    // LIST
    const agent_ref01_ent = client.Agent()
    const agent_ref01_match: any = {}

    const agent_ref01_list = (await agent_ref01_ent.list(agent_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/agent/AgentTestData.json')

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
    ['agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_AGENT_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_AGENT_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_AGENT_ENTID']
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
  
