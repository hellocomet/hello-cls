const GRACEFULL_CLOSE_TIMEOUT = 2000

class Context {
  constructor (namespace, initialAsyncId) {
    this.store = new Map()
    this.asyncIds = new Set([initialAsyncId])
    this._namespace = namespace
  }

  /**
   * Close context and flush content
   * @param {Boolean} force
   */
  close (force = false) {
    if (force) {
      this._flush()
    } else {
      setTimeout(() => {
        this._flush()
      }, GRACEFULL_CLOSE_TIMEOUT)
    }
  }

  /**
   * Private: flush context and free memory allocation
   */
  _flush () {
    this.store.clear()
    if (this._namespace._currentContext === this) {
      this._namespace._currentContext = null
    }
    this.asyncIds.forEach((asyncId) => {
      this._namespace.contextsByAsyncId.delete(asyncId)
    })
  }
}

module.exports = {
  Context
}
