

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


describe('SearchedGroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.SearchedGroup()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'searched_group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdOn":{"a":true,"fo":"date-time","h":"Created On","n":"createdOn","r":true,"t":"`$STRING`","key$":"createdOn","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":1},"groupId":{"a":true,"h":"Group Id","n":"groupId","r":true,"t":"`$STRING`","key$":"groupId","index$":2},"labels":{"a":true,"h":"Labels","n":"labels","r":false,"t":"`$OBJECT`","key$":"labels","index$":3},"modifiedBy":{"a":true,"h":"Modified By","n":"modifiedBy","r":true,"t":"`$STRING`","key$":"modifiedBy","index$":4},"modifiedOn":{"a":true,"fo":"date-time","h":"Modified On","n":"modifiedOn","r":true,"t":"`$STRING`","key$":"modifiedOn","index$":5},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$STRING`","key$":"owner","index$":6}},"name":"searched_group","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search/groups","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"description","or":"description","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"group_id","or":"groupId","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"label","or":"labels","r":false,"t":"`$ARRAY`","index$":2},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"orderby","or":"orderby","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/search/groups","q":{"exist":["description","group_id","label","limit","offset","order","orderby"]},"r":{},"s":[{"lit":"search"},{"lit":"groups"}],"t":{"req":"`reqdata`","res":"`body.groups`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"searched_group","name__orig":"searched_group","Name":"SearchedGroup","name_":"searched_group","name-":"searched-group","NAME":"SEARCHED_GROUP","index$":35}, {"active":true,"entity":"searched_group","key$":"BasicSearchedGroupFlow","kind":"basic","name":"BasicSearchedGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"searched_group_ref01"}}],"index$":0}]}, 'SearchedGroup', {"GET /search/groups":{"protocol":"http","parameters":[{"name":"offset","description":"The number of artifacts to skip before starting to collect the result set.  Defaults to 0.","schema":{"default":0,"type":"integer"},"in":"query","required":false,"index$":0},{"name":"limit","description":"The number of artifacts to return.  Defaults to 20.","schema":{"default":20,"type":"integer"},"in":"query","required":false,"index$":1},{"name":"order","description":"Sort order, ascending (`asc`) or descending (`desc`).","schema":{"description":"","enum":["asc","desc"],"type":"string","x-ref":"#/components/schemas/SortOrder"},"in":"query","index$":2},{"name":"orderby","description":"The field to sort by.  Can be one of:\n\n* `name`\n* `createdOn`\n","schema":{"description":"","enum":["groupId","createdOn","modifiedOn"],"type":"string","x-ref":"#/components/schemas/GroupSortBy"},"in":"query","index$":3},{"name":"labels","description":"Filter by one or more name/value label. Separate each name/value pair using a colon, which splits on the last colon (e.g. `labels=foo:bar` matches key `foo` and value `bar`). Note: the key:value query treats the last colon as the delimiter, so values containing colons cannot be matched via this syntax (they remain matchable via key-only queries).","schema":{"type":"array","items":{"type":"string"}},"in":"query","index$":4},{"name":"description","description":"Filter by description.","schema":{"type":"string"},"in":"query","index$":5},{"name":"groupId","description":"Filter by group name.","schema":{"type":"string"},"in":"query","index$":6}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let searched_group_ref01_data = Object.values(setup.data.existing.searched_group)[0] as any

    // LIST
    const searched_group_ref01_ent = client.SearchedGroup()
    const searched_group_ref01_match: any = {}

    const searched_group_ref01_list = (await searched_group_ref01_ent.list(searched_group_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/searched_group/SearchedGroupTestData.json')

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
    ['searched_group01','searched_group02','searched_group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_SEARCHED_GROUP_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_SEARCHED_GROUP_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_SEARCHED_GROUP_ENTID']
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
  
