const { randomWait } = require('./mock.service')
const { namespace } = require('../../../lib/cls')

class BaseModel {
  constructor (item = '🍺') {
    this.item = item
  }

  async get () {
    await randomWait()
    return `${this.item}.${namespace.get('id')}`
  }
}

module.exports = {
  BaseModel
}
