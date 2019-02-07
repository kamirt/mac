import { createLocalVue } from '@vue/test-utils'

import edQueryPlugin from '@/plugins/ctransfer/edQuery'

const localVue = createLocalVue()
localVue.use(edQueryPlugin)
it('$edQuery exists in Vue instance', () => {
  expect(typeof localVue.prototype.$edQuery).toBe('function')
})
it('edQuery calls callbacks', () => {
  expect.hasAssertions()
  function callback (data) {
    expect(data).toBeDefined()
  }
  return localVue.prototype.$edQuery({ success: callback, failure: callback })
})
