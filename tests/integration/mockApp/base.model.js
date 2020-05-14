const { asyncLocalStorage } = require('./store')
const EventEmitter = require('events')
const { randomWait } = require('./mock.service')

class BaseModel extends EventEmitter {
  constructor (item = '🍺') {
    super()
    this.item = item
  }

  async get () {
    await randomWait()
    return `${this.item}.${asyncLocalStorage.getStore().id}`
  }
}

module.exports = {
  BaseModel
}
