const { namespace } = require('../../../lib/cls')
const { randomWait } = require('./mock.service')
const { BaseModel } = require('./base.model')

class MockModel extends BaseModel {
  constructor () {
    super('🍪')
  }

  async get () {
    await randomWait()
    return BaseModel.prototype.get.apply(this, arguments)
  }

  async getWithEvent (id) {
    this.emit('setIdInCLS', id)
    return this.get()
  }
}

const mockModel = new MockModel()

mockModel.on('setIdInCLS', async (id) => {
  await randomWait(1)
  namespace.set('id', id)
})

module.exports = {
  mockModel
}
