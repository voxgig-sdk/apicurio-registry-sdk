

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


describe('RoleMappingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.RoleMapping()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'role_mapping.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"principalId":{"a":true,"h":"Principal Id","n":"principalId","r":true,"t":"`$STRING`","key$":"principalId","index$":1},"principalName":{"a":true,"h":"Principal Name","n":"principalName","r":false,"sh":"A friendly name for the principal.","t":"`$STRING`","key$":"principalName","index$":2},"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":3}},"id":{"field":"id","name":"id"},"name":"role_mapping","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /admin/roleMappings","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/admin/roleMappings","q":{"exist":["limit","offset"]},"r":{},"s":[{"lit":"admin"},{"lit":"roleMappings"}],"t":{"req":"`reqdata`","res":"`body.roleMappings`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /admin/roleMappings/{principalId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"principal_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/admin/roleMappings/{principalId}","q":{"exist":["id"]},"r":{"param":{"principalId":"id"}},"s":[{"lit":"admin"},{"lit":"roleMappings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"role_mapping","name__orig":"role_mapping","Name":"RoleMapping","name_":"role_mapping","name-":"role-mapping","NAME":"ROLE_MAPPING","index$":33}, {"active":true,"entity":"role_mapping","key$":"BasicRoleMappingFlow","kind":"basic","name":"BasicRoleMappingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"role_mapping_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"role_mapping_ref01","srcdatavar":"role_mapping_ref01_data","suffix":"_dt0"},"m":{"id":"role_mapping01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-role_mapping_ref01"}}],"index$":1}]}, 'RoleMapping', {"GET /admin/roleMappings":{"protocol":"http","parameters":[{"name":"limit","description":"The number of role mappings to return.  Defaults to 20.","schema":{"type":"integer"},"in":"query","index$":0},{"name":"offset","description":"The number of role mappings to skip before starting the result set.  Defaults to 0.","schema":{"type":"integer"},"in":"query","index$":1}]},"GET /admin/roleMappings/{principalId}":{"protocol":"http","parameters":[{"name":"principalId","description":"Unique id of a principal (typically either a user or service account).","schema":{"type":"string"},"in":"path","required":true,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let role_mapping_ref01_data = Object.values(setup.data.existing.role_mapping)[0] as any

    // LIST
    const role_mapping_ref01_ent = client.RoleMapping()
    const role_mapping_ref01_match: any = {}

    const role_mapping_ref01_list = (await role_mapping_ref01_ent.list(role_mapping_ref01_match)).map((e: any) => e.data())


    // LOAD
    const role_mapping_ref01_match_dt0: any = {}
    role_mapping_ref01_match_dt0.id = role_mapping_ref01_data.id
    const role_mapping_ref01_data_dt0 = (await role_mapping_ref01_ent.load(role_mapping_ref01_match_dt0)).data()
    assert(role_mapping_ref01_data_dt0.id === role_mapping_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/role_mapping/RoleMappingTestData.json')

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
    ['role_mapping01','role_mapping02','role_mapping03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_ROLE_MAPPING_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_ROLE_MAPPING_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_ROLE_MAPPING_ENTID']
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
  
