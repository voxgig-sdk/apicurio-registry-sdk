

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


describe('AiCatalogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.AiCatalog()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ai_catalog.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":false,"t":"`$ARRAY`","key$":"capabilities","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":1},"displayName":{"a":true,"h":"Display Name","n":"displayName","r":false,"t":"`$STRING`","key$":"displayName","index$":2},"identifier":{"a":true,"h":"Identifier","n":"identifier","r":true,"t":"`$STRING`","key$":"identifier","index$":3},"representativeQueries":{"a":true,"h":"Representative Queries","n":"representativeQueries","r":false,"t":"`$ARRAY`","key$":"representativeQueries","index$":4},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"t":"`$ARRAY`","key$":"tags","index$":5},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":6},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":false,"t":"`$STRING`","key$":"updatedAt","index$":7},"url":{"a":true,"h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":8},"version":{"a":true,"h":"Version","n":"version","r":false,"t":"`$STRING`","key$":"version","index$":9}},"name":"ai_catalog","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /well-known/ard/agents","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter","or":"filter","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"order_by","or":"order_by","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":20,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"page_token","or":"page_token","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/well-known/ard/agents","q":{"exist":["filter","order_by","page_size","page_token"]},"r":{},"s":[{"lit":"well-known"},{"lit":"ard"},{"lit":"agents"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /well-known/ai-catalog.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/well-known/ai-catalog.json","q":{},"r":{},"s":[{"lit":"well-known"},{"lit":"ai-catalog.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /well-known/ard.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/well-known/ard.json","q":{},"r":{},"s":[{"lit":"well-known"},{"lit":"ard.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ai_catalog","name__orig":"ai_catalog","Name":"AiCatalog","name_":"ai_catalog","name-":"ai-catalog","NAME":"AI_CATALOG","index$":3}, {"active":true,"entity":"ai_catalog","key$":"BasicAiCatalogFlow","kind":"basic","name":"BasicAiCatalogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ai_catalog_ref01"}}],"index$":0}]}, 'AiCatalog', {"GET /well-known/ard/agents":{"protocol":"http","parameters":[{"name":"filter","schema":{"type":"string"},"in":"query","index$":0},{"name":"orderBy","schema":{"type":"string"},"in":"query","index$":1},{"name":"pageSize","schema":{"default":20,"type":"integer"},"in":"query","required":false,"index$":2},{"name":"pageToken","schema":{"type":"string"},"in":"query","index$":3}]},"GET /well-known/ai-catalog.json":{"protocol":"http","parameters":[]},"GET /well-known/ard.json":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ai_catalog_ref01_data = Object.values(setup.data.existing.ai_catalog)[0] as any

    // LIST
    const ai_catalog_ref01_ent = client.AiCatalog()
    const ai_catalog_ref01_match: any = {}

    const ai_catalog_ref01_list = (await ai_catalog_ref01_ent.list(ai_catalog_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ai_catalog/AiCatalogTestData.json')

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
    ['ai_catalog01','ai_catalog02','ai_catalog03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_AI_CATALOG_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_AI_CATALOG_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_AI_CATALOG_ENTID']
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
  
