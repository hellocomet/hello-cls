const EventEmitter = require('events')
const { randomWait } = require('./mock.service')
const { namespace } = require('../../../lib/cls')

class BaseModel extends EventEmitter {
  constructor (item = '🍺') {
    super()
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
