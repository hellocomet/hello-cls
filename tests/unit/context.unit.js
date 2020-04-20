/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const { Namespace } = require('../../lib/namespace')
const { Context } = require('../../lib/context')
const { describe, beforeEach, it } = require('mocha')

describe('Context', () => {
  let namespace, mockAsyncId

  beforeEach(() => {
    namespace = new Namespace('cookie')
    mockAsyncId = 1
  })
  describe('Static', () => {
    it(`should construct an instance`, () => {
      const context = new Context(namespace, mockAsyncId)
      expect(context).to.be.an.instanceOf(Context)
    })
  })

  describe('Instance', () => {
    let context

    beforeEach(() => {
      context = new Context(namespace, mockAsyncId)
    })

    it(`should have a private property _namespace`, () => {
      expect(context).to.have.a.property('_namespace').that.equals(namespace)
    })

    it(`should have a public property asyncIds`, () => {
      expect(context).to.have.a.property('asyncIds').that.is.an.instanceOf(Set)
      expect(context.asyncIds.size).to.equal(1)
      expect(context.asyncIds.has(mockAsyncId)).to.be.true
    })

    it(`should have a public property store`, () => {
      expect(context).to.have.a.property('store').that.is.an.instanceOf(Map)
      expect(context.store.size).to.equal(0)
    })

    it(`should have a public method close`, () => {
      expect(context).to.have.a.property('close').that.is.an.instanceOf(Function)
      // TODO: test it further
    })

    function contextClosedWithFlush () {
      context.close(true)
    }

    describe('has values stored', () => {
      let testName, testValue

      beforeEach(() => {
        testName = 'testName'
        testValue = 'testValue'
        context.store.set(testName, testValue)
      })

      describe('and is closed with flush', () => {
        beforeEach(contextClosedWithFlush)

        it(`the store map should be empty`, () => {
          expect(context.store.size).to.equal(0)
        })
      })
    })

    describe('is the current context in namespace', () => {
      beforeEach(() => {
        namespace._currentContext = context
      })

      describe('and is closed with flush', () => {
        beforeEach(contextClosedWithFlush)

        it(`should no longer be set as current namespace context`, () => {
          expect(namespace._currentContext).to.be.null
        })
      })
    })

    describe('is not the current context in namespace', () => {
      let otherContext
      beforeEach(() => {
        let otherMockAsyncId = 2
        otherContext = new Context(namespace, otherMockAsyncId)
        namespace._currentContext = otherContext
      })

      describe('and is closed with flush', () => {
        beforeEach(contextClosedWithFlush)

        it(`the current namespace context should be the same`, () => {
          expect(namespace._currentContext).to.equal(otherContext)
        })
      })
    })
  })
})
