
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ApicurioRegistrySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ApicurioRegistrySDK.test()
    equal(testsdk instanceof ApicurioRegistrySDK, true,
      'ApicurioRegistrySDK.test() must return a client synchronously')
  })

})
