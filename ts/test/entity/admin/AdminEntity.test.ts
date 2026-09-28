

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


describe('AdminEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.Admin()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['create', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'admin.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":0},"value":{"a":true,"h":"Value","n":"value","r":true,"t":"`$STRING`","key$":"value","index$":1}},"name":"admin","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /admin/import","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"x_registry_preserve_content_id","or":"x_registry_preserve_content_id","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"header","n":"x_registry_preserve_global_id","or":"x_registry_preserve_global_id","r":false,"t":"`$BOOLEAN`","index$":1}],"query":[{"a":true,"k":"query","n":"require_empty_registry","or":"require_empty_registry","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"POST","o":"/admin/import","q":{"$action":"import","exist":["require_empty_registry","x_registry_preserve_content_id","x_registry_preserve_global_id"]},"r":{},"s":[{"lit":"admin"},{"lit":"import"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /admin/roleMappings","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/admin/roleMappings","q":{"$action":"role_mapping"},"r":{},"s":[{"lit":"admin"},{"lit":"roleMappings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /admin/roleMappings/{principalId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"principal_id","or":"principal_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/admin/roleMappings/{principalId}","q":{"exist":["principal_id"]},"r":{"param":{"principalId":"principal_id"}},"s":[{"lit":"admin"},{"lit":"roleMappings"},{"var":"principal_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /admin/config/properties/{propertyName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"property_name","or":"property_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/admin/config/properties/{propertyName}","q":{"exist":["property_name"]},"r":{"param":{"propertyName":"property_name"}},"s":[{"lit":"admin"},{"lit":"config"},{"lit":"properties"},{"var":"property_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"DELETE /admin/contracts/ruleset","source":"openapi3","version":2},"g":{},"k":"http","m":"DELETE","o":"/admin/contracts/ruleset","q":{},"r":{},"s":[{"lit":"admin"},{"lit":"contracts"},{"lit":"ruleset"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /admin/roleMappings/{principalId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"principal_id","or":"principal_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/admin/roleMappings/{principalId}","q":{"exist":["principal_id"]},"r":{"param":{"principalId":"principal_id"}},"s":[{"lit":"admin"},{"lit":"roleMappings"},{"var":"principal_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PUT /admin/config/properties/{propertyName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"property_name","or":"property_name","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/admin/config/properties/{propertyName}","q":{"exist":["property_name"]},"r":{"param":{"propertyName":"property_name"}},"s":[{"lit":"admin"},{"lit":"config"},{"lit":"properties"},{"var":"property_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.role_mapping"]]},"key$":"admin","name__orig":"admin","Name":"Admin","name_":"admin","name-":"admin","NAME":"ADMIN","index$":0}, {"active":true,"entity":"admin","key$":"BasicAdminFlow","kind":"basic","name":"BasicAdminFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"admin_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"admin_ref01","srcdatavar":"admin_ref01_data","suffix":"_up0","textfield":"role"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-admin_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"admin_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":2}]}, 'Admin', {"POST /admin/import":{"protocol":"http","requestBody":{"description":"The ZIP file representing the previously exported registry data.","content":{"application/zip":{"schema":{"format":"binary","type":"string","x-codegen-inline":true,"x-ref":"#/components/schemas/FileContent"}}},"required":true},"parameters":[{"name":"X-Registry-Preserve-GlobalId","description":"If this header is set to false, global ids of imported data will be ignored and replaced by next id in global id sequence. This allows to import any data even thought the global ids would cause a conflict.","schema":{"type":"boolean"},"in":"header","index$":0},{"name":"X-Registry-Preserve-ContentId","description":"If this header is set to false, content ids of imported data will be ignored and replaced by next id in content id sequence. The mapping between content and artifacts will be preserved. This allows to import any data even thought the content ids would cause a conflict.","schema":{"type":"boolean"},"in":"header","required":false,"index$":1},{"name":"requireEmptyRegistry","description":"Query parameter indicating whether the registry must be empty before allowing\ndata to be imported.  Defaults to `true` if omitted.","schema":{"type":"boolean"},"in":"query","required":false,"index$":2}]},"POST /admin/roleMappings":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"description":"The mapping between a user/principal and their role.","required":["principalId","role"],"type":"object","properties":{"principalId":{"description":"","type":"string","key$":"principalId"},"role":{"description":"","enum":["READ_ONLY","DEVELOPER","ADMIN"],"type":"string","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/RoleType","key$":"role"},"principalName":{"description":"A friendly name for the principal.","type":"string","key$":"principalName"}},"example":{"principalId":"svc_account_84874587_123484","principalName":"famartin-svc-account","role":"READ_ONLY"},"x-ref":"#/components/schemas/RoleMapping"}}},"required":true},"parameters":[]},"DELETE /admin/roleMappings/{principalId}":{"protocol":"http","parameters":[{"name":"principalId","description":"Unique id of a principal (typically either a user or service account).","schema":{"type":"string"},"in":"path","required":true,"index$":0}]},"DELETE /admin/config/properties/{propertyName}":{"protocol":"http","parameters":[{"name":"propertyName","description":"The name of a configuration property.","schema":{"type":"string"},"in":"path","required":true,"index$":0}]},"DELETE /admin/contracts/ruleset":{"protocol":"http","parameters":[]},"PUT /admin/roleMappings/{principalId}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"title":"Root Type for UpdateRole","description":"","required":["role"],"type":"object","properties":{"role":{"description":"","enum":["READ_ONLY","DEVELOPER","ADMIN"],"type":"string","x-codegen-package":"io.apicurio.registry.types","x-ref":"#/components/schemas/RoleType","key$":"role"}},"example":{"role":"READ_ONLY"},"x-ref":"#/components/schemas/UpdateRole","index$":1}}},"required":true},"parameters":[{"name":"principalId","description":"Unique id of a principal (typically either a user or service account).","schema":{"type":"string"},"in":"path","required":true,"index$":0}]},"PUT /admin/config/properties/{propertyName}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"title":"Root Type for UpdateConfigurationProperty","description":"","required":["value"],"type":"object","properties":{"value":{"type":"string","key$":"value"}},"example":{"value":"true"},"x-ref":"#/components/schemas/UpdateConfigurationProperty","index$":1}}},"required":true},"parameters":[{"name":"propertyName","description":"The name of a configuration property.","schema":{"type":"string"},"in":"path","required":true,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const admin_ref01_ent = client.Admin()
    let admin_ref01_data = setup.data.new.admin['admin_ref01']

    admin_ref01_data = (await admin_ref01_ent.create(admin_ref01_data)).data()
    assert(null != admin_ref01_data)


    // UPDATE
    const admin_ref01_data_up0: any = {}

    const admin_ref01_markdef_up0 = { name: 'role', value: 'Mark01-admin_ref01_' + setup.now }
    ;(admin_ref01_data_up0 as any)[admin_ref01_markdef_up0.name] = admin_ref01_markdef_up0.value

    const admin_ref01_resdata_up0 = (await admin_ref01_ent.update(admin_ref01_data_up0)).data()
    assert(null != admin_ref01_resdata_up0)

    assert((admin_ref01_resdata_up0 as any)[admin_ref01_markdef_up0.name] === admin_ref01_markdef_up0.value)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/admin/AdminTestData.json')

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
    ['admin01','admin02','admin03','role_mapping01','role_mapping02','role_mapping03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_ADMIN_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_ADMIN_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_ADMIN_ENTID']
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
  
