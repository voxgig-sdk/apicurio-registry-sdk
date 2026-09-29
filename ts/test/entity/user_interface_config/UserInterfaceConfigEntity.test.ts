

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


describe('UserInterfaceConfigEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.UserInterfaceConfig()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user_interface_config.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auth":{"a":true,"h":"Auth","n":"auth","r":true,"t":"`$OBJECT`","key$":"auth","index$":0},"features":{"a":true,"h":"Features","n":"features","r":false,"t":"`$OBJECT`","key$":"features","index$":1},"ui":{"a":true,"h":"Ui","n":"ui","r":false,"t":"`$OBJECT`","key$":"ui","index$":2}},"name":"user_interface_config","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /system/uiConfig","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/system/uiConfig","q":{},"r":{},"s":[{"lit":"system"},{"lit":"uiConfig"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"user_interface_config","name__orig":"user_interface_config","Name":"UserInterfaceConfig","name_":"user_interface_config","name-":"user-interface-config","NAME":"USER_INTERFACE_CONFIG","index$":39}, {"active":true,"entity":"user_interface_config","key$":"BasicUserInterfaceConfigFlow","kind":"basic","name":"BasicUserInterfaceConfigFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_interface_config_ref01","srcdatavar":"user_interface_config_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_interface_config_ref01"}}],"index$":0}]}, 'UserInterfaceConfig', {"GET /system/uiConfig":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_interface_config_ref01_data = Object.values(setup.data.existing.user_interface_config)[0] as any

    // LOAD
    const user_interface_config_ref01_ent = client.UserInterfaceConfig()
    const user_interface_config_ref01_match_dt0: any = {}
    const user_interface_config_ref01_data_dt0 = (await user_interface_config_ref01_ent.load(user_interface_config_ref01_match_dt0)).data()
    assert(null != user_interface_config_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user_interface_config/UserInterfaceConfigTestData.json')

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
    ['user_interface_config01','user_interface_config02','user_interface_config03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_USER_INTERFACE_CONFIG_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_USER_INTERFACE_CONFIG_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_USER_INTERFACE_CONFIG_ENTID']
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
  
