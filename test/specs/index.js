import {expect} from 'chai'

describe('tablist', () => {
  it('should have the right role', () => {
    browser.url('/index.html')
    const role = browser.getAttribute('#tablist', 'role')
    expect(role).to.equal('tablist')
  })
})
