/* eslint-env node, mocha */

const { expect } = require('chai')
const { namespace } = require('../../lib/cls')

describe('When namespace initializes a context', () => {
  let context
  beforeEach(() => {
    context = namespace.initContext()
  })

  it('then undefined should be returned when "beer" is retrieved from the namespace', () => {
    expect(namespace.get('beer')).to.be.undefined
  })

  describe('and the value "🍺" is set for the key "beer"', () => {
    beforeEach(() => {
      namespace.set('beer', '🍺')
    })
    it('then "🍺" should be returned when "beer" is retrieved from the namespace', () => {
      expect(namespace.get('beer')).to.equal('🍺')
    })

    describe('and then the context is closed with flush', () => {
      beforeEach(() => {
        context.close(true)
      })
      it('then undefined should be returned when "beer" is retrieved from the namespace', () => {
        expect(namespace.get('beer')).to.be.null
      })
    })
  })
})
