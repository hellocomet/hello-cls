/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions, promise/param-names */

const { expect } = require('chai')
const { namespace } = require('../../lib/cls')

const KEY = 'fruit'
function getContextValue () {
  return namespace.get(KEY)
}
function setContextValue(value) {
  namespace.set(KEY, value)
}

describe('when nested contexts are initialized', () => {

  let resolvedPromiseResultValue, promise1ContextValue, promise2ContextValue, promise3ContextValue, afterAwaitContextValue, resolvedPromiseContextValue
  beforeEach(async () => {
    resolvedPromiseResultValue = promise1ContextValue = promise2ContextValue = promise3ContextValue = afterAwaitContextValue = resolvedPromiseContextValue =null
    namespace.initContext()
    setContextValue('bananas')
    const p1 = new Promise((r1) => {
      promise1ContextValue = getContextValue()
      namespace.initContext()
      setContextValue('oranges')
      const p2 = new Promise((r2) => {
        promise2ContextValue = getContextValue()
        setContextValue('apples')
        const p3 = new Promise((r3) => {
          promise3ContextValue = getContextValue()
          r3(getContextValue())
        })
        r2(p3)
      })
      r1(p2)
    }).then(result => {
      resolvedPromiseContextValue = getContextValue()
      resolvedPromiseResultValue = result
      setContextValue('strawberries')
    })
    await p1
    afterAwaitContextValue = getContextValue()
  })

  it('then context value at the beginning of promise 1 is "bananas"', () => {
    expect(promise1ContextValue).to.equal('bananas')
  })

  it('then context value at the beginning of promise 2 is "oranges"', () => {
    expect(promise2ContextValue).to.equal('oranges')
  })

  it('then context value at the beginning of promise 3 is "apples"', () => {
    expect(promise3ContextValue).to.equal('apples')
  })

  it('then resolved promise value is "apples"', () => {
    expect(resolvedPromiseResultValue).to.equal('apples')
  })

  it('then context value at promise 3 resolution is "bananas"', () => {
    expect(resolvedPromiseContextValue).to.equal('bananas')
  })

  it('then context value after awaiting promise 1 resolution is "strawberries"', () => {
    expect(afterAwaitContextValue).to.equal('strawberries')
  })

})
