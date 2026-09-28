

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


describe('ArdSearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.ArdSearch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ard_search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"federation":{"a":true,"h":"Federation","n":"federation","r":false,"t":"`$STRING`","key$":"federation","index$":0},"pageSize":{"a":true,"h":"Page Size","n":"pageSize","r":false,"t":"`$INTEGER`","key$":"pageSize","index$":1},"pageToken":{"a":true,"h":"Page Token","n":"pageToken","r":false,"t":"`$STRING`","key$":"pageToken","index$":2},"query":{"a":true,"h":"Query","n":"query","r":true,"sh":"ARD search query.","t":"`$OBJECT`","key$":"query","index$":3},"results":{"a":true,"h":"Results","n":"results","r":true,"t":"`$ARRAY`","key$":"results","index$":4}},"name":"ard_search","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /well-known/ard/search","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/well-known/ard/search","q":{},"r":{},"s":[{"lit":"well-known"},{"lit":"ard"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"ard_search","name__orig":"ard_search","Name":"ArdSearch","name_":"ard_search","name-":"ard-search","NAME":"ARD_SEARCH","index$":5}, {"active":true,"entity":"ard_search","key$":"BasicArdSearchFlow","kind":"basic","name":"BasicArdSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ard_search_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ArdSearch', {"POST /well-known/ard/search":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"Request body for the ARD POST /search endpoint.","required":["query"],"type":"object","properties":{"query":{"description":"ARD search query.","type":"object","properties":{"text":{"type":"string"},"filter":{"description":"ARD search filter map; keys are filter names (type, tags, capabilities, publisher) and values are the list of accepted values for that filter (OR semantics within a key, AND semantics across keys).","type":"object","additionalProperties":{"type":"array","items":{}},"x-ref":"#/components/schemas/ArdFilter"}},"x-ref":"#/components/schemas/ArdSearchQuery","key$":"query"},"federation":{"type":"string","key$":"federation"},"pageSize":{"default":10,"type":"integer","key$":"pageSize"},"pageToken":{"type":"string","key$":"pageToken"}},"x-ref":"#/components/schemas/ArdSearchRequest","index$":1}}},"required":true},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const ard_search_ref01_ent = client.ArdSearch()
    let ard_search_ref01_data = setup.data.new.ard_search['ard_search_ref01']

    ard_search_ref01_data = (await ard_search_ref01_ent.create(ard_search_ref01_data)).data()
    assert(null != ard_search_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ard_search/ArdSearchTestData.json')

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
    ['ard_search01','ard_search02','ard_search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_ARD_SEARCH_ENTID']
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
  
