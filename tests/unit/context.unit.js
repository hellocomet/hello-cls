/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const { Namespace } = require('../../lib/namespace')
const { Context } = require('../../lib/context')

describe('Context', () => {
  beforeEach(() => {
    this.namespace = new Namespace('cookie')
    this.mockAsyncId = 1
  })
  describe('Static', () => {
    it(`should construct an instance`, () => {
      const context = new Context(this.namespace, this.mockAsyncId)

      expect(context).to.be.an.instanceOf(Context)
    })
  })

  describe('Instance', () => {
    beforeEach(() => {
      this.context = new Context(this.namespace, this.mockAsyncId)
    })

    it(`should have a private property _namespace`, () => {
      expect(this.context).to.have.a.property('_namespace').that.equals(this.namespace)
    })

    it(`should have a public property asyncIds`, () => {
      expect(this.context).to.have.a.property('asyncIds').that.is.an.instanceOf(Set)
      expect(this.context.asyncIds.size).to.equal(1)
      expect(this.context.asyncIds.has(this.mockAsyncId)).to.be.true
    })

    it(`should have a public property store`, () => {
      expect(this.context).to.have.a.property('store').that.is.an.instanceOf(Map)
      expect(this.context.store.size).to.equal(0)
    })

    it(`should have a public method close`, () => {
      expect(this.context).to.have.a.property('close').that.is.an.instanceOf(Function)
      // TODO: test it further
    })
  })
})
