

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


describe('McpToolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.McpTool()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mcp_tool.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artifactId":{"a":true,"h":"Artifact Id","n":"artifactId","r":false,"t":"`$STRING`","key$":"artifactId","index$":0},"createdOn":{"a":true,"fo":"int64","h":"Created On","n":"createdOn","r":false,"t":"`$INTEGER`","key$":"createdOn","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":2},"groupId":{"a":true,"h":"Group Id","n":"groupId","r":false,"t":"`$STRING`","key$":"groupId","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":4},"owner":{"a":true,"h":"Owner","n":"owner","r":false,"t":"`$STRING`","key$":"owner","index$":5},"parameters":{"a":true,"h":"Parameters","n":"parameters","r":false,"t":"`$ARRAY`","key$":"parameters","index$":6},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":7}},"name":"mcp_tool","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /well-known/mcp-tools","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"parameter","or":"parameter","r":false,"t":"`$ARRAY`","index$":3}]},"k":"http","m":"GET","o":"/well-known/mcp-tools","q":{"exist":["limit","name","offset","parameter"]},"r":{},"s":[{"lit":"well-known"},{"lit":"mcp-tools"}],"t":{"req":"`reqdata`","res":"`body.tools`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mcp_tool","name__orig":"mcp_tool","Name":"McpTool","name_":"mcp_tool","name-":"mcp-tool","NAME":"MCP_TOOL","index$":28}, {"active":true,"entity":"mcp_tool","key$":"BasicMcpToolFlow","kind":"basic","name":"BasicMcpToolFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mcp_tool_ref01"}}],"index$":0}]}, 'McpTool', {"GET /well-known/mcp-tools":{"protocol":"http","parameters":[{"name":"offset","schema":{"default":0,"type":"integer"},"in":"query","required":false,"index$":0},{"name":"limit","schema":{"default":20,"type":"integer"},"in":"query","required":false,"index$":1},{"name":"name","schema":{"type":"string"},"in":"query","index$":2},{"name":"parameter","schema":{"type":"array","items":{"type":"string"}},"in":"query","index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mcp_tool_ref01_data = Object.values(setup.data.existing.mcp_tool)[0] as any

    // LIST
    const mcp_tool_ref01_ent = client.McpTool()
    const mcp_tool_ref01_match: any = {}

    const mcp_tool_ref01_list = (await mcp_tool_ref01_ent.list(mcp_tool_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mcp_tool/McpToolTestData.json')

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
    ['mcp_tool01','mcp_tool02','mcp_tool03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_MCP_TOOL_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_MCP_TOOL_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_MCP_TOOL_ENTID']
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
  
