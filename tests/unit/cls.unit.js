/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const cls = require('../../lib/cls')
const { Namespace } = require('../../lib/namespace')

describe('CLS', () => {
  it(`should export Namespace static class`, () => {
    expect(cls).to.have.property('Namespace').that.equals(Namespace)
  })

  it(`should export a namespace instance`, async () => {
    expect(cls).to.have.property('namespace').that.is.an.instanceOf(Namespace)
    expect(cls.namespace).to.have.a.property('name').that.equals('default')
  })

  describe('Default namespace', () => {
    it(`should be able to set and get a value`, async () => {
      const value = { a: 'b' }
      const key = 'key'
      const context = cls.namespace.initContext()
      cls.namespace.set(key, value)
      const returnedValue = cls.namespace.get(key, value)
      context.close()

      expect(returnedValue).to.equals(value)
    })
  })
})
