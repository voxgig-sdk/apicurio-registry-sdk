

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


describe('ContentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.Content()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'content.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"content","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /content/canonicalize","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"AVRO","k":"query","n":"artifact_type","or":"artifactType","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/content/canonicalize","q":{"$action":"canonicalize","exist":["artifact_type"]},"r":{},"s":[{"lit":"content"},{"lit":"canonicalize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"content","name__orig":"content","Name":"Content","name_":"content","name-":"content","NAME":"CONTENT","index$":14}, {"active":true,"entity":"content","key$":"BasicContentFlow","kind":"basic","name":"BasicContentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"content_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Content', {"POST /content/canonicalize":{"protocol":"http","requestBody":{"description":"The content to canonicalize.","content":{"*/*":{"schema":{"format":"binary","type":"string","x-codegen-inline":true,"x-ref":"#/components/schemas/FileContent"}}},"required":true},"parameters":[{"name":"artifactType","description":"Indicates the type of artifact represented by the content.  The server uses this to determine how to canonicalize the content.","schema":{"description":"","type":"string","example":"AVRO","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/ArtifactType"},"in":"query","required":true,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const content_ref01_ent = client.Content()
    let content_ref01_data = setup.data.new.content['content_ref01']

    content_ref01_data = (await content_ref01_ent.create(content_ref01_data)).data()
    assert(null != content_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/content/ContentTestData.json')

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
    ['content01','content02','content03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_CONTENT_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_CONTENT_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_CONTENT_ENTID']
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
  
