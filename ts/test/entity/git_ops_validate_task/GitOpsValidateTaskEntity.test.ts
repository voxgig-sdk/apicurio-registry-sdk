

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


describe('GitOpsValidateTaskEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ApicurioRegistrySDK.test()
    const ent = testsdk.GitOpsValidateTask()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.APICURIO_REGISTRY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'git_ops_validate_task.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artifactCount":{"a":true,"fo":"int32","h":"Artifact Count","n":"artifactCount","r":false,"sh":"Number of artifacts loaded during validation.","t":"`$INTEGER`","key$":"artifactCount","index$":0},"completedAt":{"a":true,"fo":"date-time","h":"Completed At","n":"completedAt","r":false,"sh":"ISO 8601 timestamp of when the task completed.","t":"`$STRING`","key$":"completedAt","index$":1},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"ISO 8601 timestamp of when the task was created.","t":"`$STRING`","key$":"createdAt","index$":2},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"sh":"Validation errors.","t":"`$ARRAY`","key$":"errors","index$":3},"groupCount":{"a":true,"fo":"int32","h":"Group Count","n":"groupCount","r":false,"sh":"Number of groups loaded during validation.","t":"`$INTEGER`","key$":"groupCount","index$":4},"ref":{"a":true,"h":"Ref","n":"ref","r":false,"sh":"Git ref being validated.","t":"`$STRING`","key$":"ref","index$":5},"repoId":{"a":true,"h":"Repo Id","n":"repoId","r":false,"sh":"Repository ID being validated.","t":"`$STRING`","key$":"repoId","index$":6},"result":{"a":true,"h":"Result","n":"result","r":false,"sh":"Validation result: `success` (all checks passed) or `failure` (validation errors found).","t":"`$STRING`","key$":"result","index$":7},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"Current task state: `pending` (queued, waiting for capacity), `submitted` (request sent to sidecar), `fetching` (sidecar is cloning), `validating` (registry is loading and validating), `completed` (finished with results), `failed` (an erro…","t":"`$STRING`","key$":"state","index$":8},"taskId":{"a":true,"h":"Task Id","n":"taskId","r":true,"sh":"Unique identifier for the validation task.","t":"`$STRING`","key$":"taskId","index$":9},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Validation type (`pull` or `push`).","t":"`$STRING`","key$":"type","index$":10},"versionCount":{"a":true,"fo":"int32","h":"Version Count","n":"versionCount","r":false,"sh":"Number of artifact versions loaded during validation.","t":"`$INTEGER`","key$":"versionCount","index$":11}},"name":"git_ops_validate_task","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /admin/gitops/validate","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/admin/gitops/validate","q":{},"r":{},"s":[{"lit":"admin"},{"lit":"gitops"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /admin/gitops/validate/{taskId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/admin/gitops/validate/{taskId}","q":{"exist":["task_id"]},"r":{"param":{"taskId":"task_id"}},"s":[{"lit":"admin"},{"lit":"gitops"},{"lit":"validate"},{"var":"task_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"git_ops_validate_task","name__orig":"git_ops_validate_task","Name":"GitOpsValidateTask","name_":"git_ops_validate_task","name-":"git-ops-validate-task","NAME":"GIT_OPS_VALIDATE_TASK","index$":23}, {"active":true,"entity":"git_ops_validate_task","key$":"BasicGitOpsValidateTaskFlow","kind":"basic","name":"BasicGitOpsValidateTaskFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"git_ops_validate_task_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"git_ops_validate_task_ref01","srcdatavar":"git_ops_validate_task_ref01_data","suffix":"_dt0"},"m":{"id":"git_ops_validate_task01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-git_ops_validate_task_ref01"}}],"index$":1}]}, 'GitOpsValidateTask', {"GET /admin/gitops/validate":{"protocol":"http","parameters":[]},"GET /admin/gitops/validate/{taskId}":{"protocol":"http","parameters":[{"name":"taskId","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let git_ops_validate_task_ref01_data = Object.values(setup.data.existing.git_ops_validate_task)[0] as any

    // LIST
    const git_ops_validate_task_ref01_ent = client.GitOpsValidateTask()
    const git_ops_validate_task_ref01_match: any = {}

    const git_ops_validate_task_ref01_list = (await git_ops_validate_task_ref01_ent.list(git_ops_validate_task_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/git_ops_validate_task/GitOpsValidateTaskTestData.json')

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
    ['git_ops_validate_task01','git_ops_validate_task02','git_ops_validate_task03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_GIT_OPS_VALIDATE_TASK_ENTID': idmap,
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_TEST_EXPLAIN': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  idmap = env['APICURIO_REGISTRY_TEST_GIT_OPS_VALIDATE_TASK_ENTID']

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['APICURIO_REGISTRY_TEST_GIT_OPS_VALIDATE_TASK_ENTID']
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
  
