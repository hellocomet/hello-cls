const { randomWait } = require('./mock.service')
const { BaseModel } = require('./base.model')

class MockModel extends BaseModel {
  constructor () {
    super('🍪')
  }

  async get () {
    return Promise
      .all([
        randomWait(),
        BaseModel.prototype.get.apply(this, arguments)
      ])
      .then(([, res]) => res)
  }
}

module.exports = {
  mockModel: new MockModel()
}
