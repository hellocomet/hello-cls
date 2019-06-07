/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const { Namespace } = require('../../lib/namespace')
const { Context } = require('../../lib/context')

describe('Namespace', () => {
  describe('Static', () => {
    it(`should construct an instance`, () => {
      const name = 'test'
      const namespace = new Namespace(name)
      expect(namespace).to.be.an.instanceOf(Namespace)
      expect(namespace).to.have.property('name').that.equals(name)
    })
  })

  describe('Instance', () => {
    beforeEach(() => {
      this.namespace = new Namespace('cookie')
    })

    it(`should have a public property name`, () => {
      expect(this.namespace).to.have.a.property('name').that.equals('cookie')
    })

    it(`should have a public property contextsByAsyncId`, () => {
      expect(this.namespace).to.have.a.property('contextsByAsyncId').that.is.an.instanceOf(Map)
    })

    it(`should have a public method set that does nothing without at least one context`, () => {
      const key = 'key'
      const value = { a: 'b' }
      const returnedValue = this.namespace.set(key, value)

      expect(this.namespace).to.have.property('set').that.is.an.instanceOf(Function)
      expect(returnedValue).to.equals(null)
    })

    it(`should have a public method set that does nothing without at least one context`, () => {
      const key = 'key'
      const value = { a: 'b' }
      const returnedValue = this.namespace.set(key, value)

      expect(this.namespace).to.have.property('set').that.is.an.instanceOf(Function)
      expect(returnedValue).to.equals(null)
    })

    it(`should have a public method set that returns the set value`, () => {
      this.namespace.initContext()
      const key = 'key'
      const value = { a: 'b' }
      const returnedValue = this.namespace.set(key, value)

      expect(this.namespace).to.have.property('set').that.is.an.instanceOf(Function)
      expect(returnedValue).to.equals(value)
    })

    it(`should have a public method get that returns a previously set value`, () => {
      this.namespace.initContext()
      const key = 'key'
      const value = { a: 'b' }
      this.namespace.set(key, value)
      const returnedValue = this.namespace.get(key)

      expect(this.namespace).to.have.property('get').that.is.an.instanceOf(Function)
      expect(returnedValue).to.equals(value)
    })

    it(`should have a public method get that does nothing without at least one context`, () => {
      const key = 'key'
      const value = { a: 'b' }
      this.namespace.set(key, value)
      const returnedValue = this.namespace.get(key)

      expect(this.namespace).to.have.property('get').that.is.an.instanceOf(Function)
      expect(returnedValue).to.equals(null)
    })

    it(`should have a public method initContext that returns an instance of Context`, () => {
      const returnedContext = this.namespace.initContext()

      expect(this.namespace).to.have.property('initContext').that.is.an.instanceOf(Function)
      expect(returnedContext).to.be.an.instanceOf(Context)
    })
  })
})
