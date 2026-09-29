

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


describe('UsageSummaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.UsageSummary()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'usage_summary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active":{"a":true,"fo":"int32","h":"Active","n":"active","r":true,"t":"`$INTEGER`","key$":"active","index$":0},"dead":{"a":true,"fo":"int32","h":"Dead","n":"dead","r":true,"t":"`$INTEGER`","key$":"dead","index$":1},"stale":{"a":true,"fo":"int32","h":"Stale","n":"stale","r":true,"t":"`$INTEGER`","key$":"stale","index$":2}},"name":"usage_summary","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /admin/usage/summary","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/admin/usage/summary","q":{},"r":{},"s":[{"lit":"admin"},{"lit":"usage"},{"lit":"summary"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"usage_summary","name__orig":"usage_summary","Name":"UsageSummary","name_":"usage_summary","name-":"usage-summary","NAME":"USAGE_SUMMARY","index$":37}, {"active":true,"entity":"usage_summary","key$":"BasicUsageSummaryFlow","kind":"basic","name":"BasicUsageSummaryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"usage_summary_ref01","srcdatavar":"usage_summary_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-usage_summary_ref01"}}],"index$":0}]}, 'UsageSummary', {"GET /admin/usage/summary":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let usage_summary_ref01_data = Object.values(setup.data.existing.usage_summary)[0] as any

    // LOAD
    const usage_summary_ref01_ent = client.UsageSummary()
    const usage_summary_ref01_match_dt0: any = {}
    const usage_summary_ref01_data_dt0 = (await usage_summary_ref01_ent.load(usage_summary_ref01_match_dt0)).data()
    assert(null != usage_summary_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/usage_summary/UsageSummaryTestData.json')

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
    ['usage_summary01','usage_summary02','usage_summary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_USAGE_SUMMARY_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_USAGE_SUMMARY_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_USAGE_SUMMARY_ENTID']
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
  
