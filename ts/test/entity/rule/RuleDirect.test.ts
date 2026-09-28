

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'


import { ApicurioRegistrySDK } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  maybeSkipControl,
  skipIfMissingIds,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('RuleDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when APICURIO_REGISTRY_TEST_LIVE=TRUE.
  afterEach(liveDelay('APICURIO_REGISTRY_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new ApicurioRegistrySDK({
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-rule', async (t: any) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup({ id: 'direct01' })
    if (maybeSkipControl(t, 'direct', 'direct-load-rule', setup.live)) return
    if (skipIfMissingIds(t, setup, ["artifact01","group01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      const listResult: any = await client.direct({
        path: 'groups/{group_id}/artifacts/{artifact_id}/rules',
        method: 'GET',
        params: {
        artifact_id: setup.idmap['artifact01'],
        group_id: setup.idmap['group01'],
        },
      })
      assert(listResult.ok && listResult.status >= 200 && listResult.status < 300,
        'Live list discovery failed')
      const listArr = unwrapListData(listResult.data)
      if (null == listArr || listArr.length === 0) {
        throw new Error('Live load blocked: discovery returned no entities')
      }
      const candidateId = listArr[0]?.id ?? listArr[0]?.id
      if (null == candidateId) {
        throw new Error('Live load blocked: discovery returned no usable identity')
      }
      params.id = candidateId
      params.artifact_id = setup.idmap['artifact01']
      params.group_id = setup.idmap['group01']
    } else {
      params.artifact_id = 'direct01'
      params.group_id = 'direct02'
      params.id = 'direct03'
    }

    const result: any = await client.direct({
      path: 'groups/{group_id}/artifacts/{artifact_id}/rules/{id}',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // STRICT live mode: a non-2xx is a real failure - this project owns
      // the server it points at, so there is nothing to be lenient about.
      //
      // What is NOT asserted here is the MOCK's own fixtures. `direct01`
      // is a scripted id and `calls` records the mock transport; neither
      // exists on a live run, so asserting them made strict mode mean
      // "compare the live server against the mock's script" - a suite that
      // could not pass against any real API, including this project's own.
      assert(result.ok === true,
        'Live request failed: HTTP ' + result.status)
      assert(result.status >= 200 && result.status < 300)
      assert(null != result.data)
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
      assert(calls[0].url.includes('direct03'))
    }
  })

  test('direct-list-rule', async (t: any) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    if (maybeSkipControl(t, 'direct', 'direct-list-rule', setup.live)) return
    if (skipIfMissingIds(t, setup, ["artifact01","group01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      params.artifact_id = setup.idmap['artifact01']
      params.group_id = setup.idmap['group01']
    } else {
      params.artifact_id = 'direct01'
      params.group_id = 'direct02'
    }

    const result: any = await client.direct({
      path: 'groups/{group_id}/artifacts/{artifact_id}/rules',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // STRICT live mode: a non-2xx is a real failure - this project owns
      // the server it points at, so there is nothing to be lenient about.
      //
      // What is NOT asserted here is the MOCK's own fixtures. `direct01`
      // is a scripted id and `calls` records the mock transport; neither
      // exists on a live run, so asserting them made strict mode mean
      // "compare the live server against the mock's script" - a suite that
      // could not pass against any real API, including this project's own.
      assert(result.ok === true,
        'Live request failed: HTTP ' + result.status)
      assert(result.status >= 200 && result.status < 300)
      assert(Array.isArray(unwrapListData(result.data)), 'Expected live list response')
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      const listArr = unwrapListData(result.data)
      assert(Array.isArray(listArr))
      assert(listArr!.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
    }
  })

})



function liveScenariosActive() { return false && process.env.APICURIO_REGISTRY_TEST_LIVE === 'TRUE' }
function directSetup(mockres?: any) {
  const calls: any[] = []

  const env = envOverride({
    'APICURIO_REGISTRY_TEST_RULE_ENTID': {},
    'APICURIO_REGISTRY_TEST_LIVE': 'FALSE',
    'APICURIO_REGISTRY_SERVER_REGISTRY': "MY-REGISTRY-URL",
  })

  const live = 'TRUE' === env.APICURIO_REGISTRY_TEST_LIVE

  if (live) {
    const transport = createLiveTransport()
    // Merged so the generated fields win: sdk-test-control.json's
    // test.client.options adds to the live client, it does not redirect it.
    const client = new ApicurioRegistrySDK(
      Object.assign({}, liveClientOptions(), { system: { fetch: transport.fetch },
      server: {
        registry: env.APICURIO_REGISTRY_SERVER_REGISTRY,
      },
      }))

    let idmap: any = env['APICURIO_REGISTRY_TEST_RULE_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap, transport }
  }

  const mockFetch = async (url: string, init: any) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new ApicurioRegistrySDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} as any }
}

// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data: any): any[] | null {
  if (Array.isArray(data)) return data
  if (data && 'object' === typeof data) {
    for (const v of Object.values(data)) {
      if (Array.isArray(v)) return v as any[]
    }
  }
  return null
}
  
