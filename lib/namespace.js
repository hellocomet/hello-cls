const { createHook, executionAsyncId } = require('async_hooks')
const { Context } = require('./context')

class Namespace {
  constructor (name) {
    this.name = name
    this.contextsByAsyncId = new Map()
    this._hook = createHook({
      init: this._init.bind(this),
      before: this._before.bind(this),
      after: this._after.bind(this),
      destroy: this._destroy.bind(this)
    })

    this._currentContext = null

    this._hook.enable()
  }

  /**
   * Get value for a given key from the Namespace
   * @param {String} key
   * @returns {Any}
   */
  get (key) {
    if (!this._currentContext) return null
    return this._currentContext.store.get(key)
  }

  /**
   * Set value for a given key into the Namespace
   * @param {String} key
   * @param {Any} value
   * @returns {Any}
   */
  set (key, value) {
    if (!this._currentContext) return null
    this._currentContext.store.set(key, value)
    return value
  }

  /**
   * Init context
   * @returns {Context}
   */
  initContext () {
    const asyncId = executionAsyncId()
    const context = new Context(this, asyncId)
    this.contextsByAsyncId.set(asyncId, context)

    // HACK: this setTimeout helps ... don't know yet why, but without it we lost the context
    setTimeout(() => {}, 0)
    return context
  }

  /**
   * Private: init function used by the Hook
   * @param {String} asyncId
   * @param {Any} type
   * @param {Any} triggerId
   * @param {Any} resource
   */
  _init (asyncId, type, triggerId) {
    const context = this.contextsByAsyncId.get(triggerId)

    if (context) {
      this._currentContext = context
      this.contextsByAsyncId.set(asyncId, context)
      context.asyncIds.add(asyncId)
    }
  }

  /**
   * Private: before function used by the Hook
   * @param {String} asyncId
   */
  _before (asyncId) {
    const context = this.contextsByAsyncId.get(asyncId)

    if (context) {
      this._currentContext = context
    }
  }

  /**
   * Private: after function used by the Hook
   * @param {String} asyncId
   */
  _after (asyncId) {
    const context = this.contextsByAsyncId.get(asyncId)

    if (context) {
      this._currentContext = context
    }
  }

  /**
   * Private: destroy function used by the Hook
   * @param {String} asyncId
   */
  _destroy (asyncId) {
    const context = this.contextsByAsyncId.get(asyncId)

    if (context) {
      this._currentContext = context
      context.asyncIds.delete(asyncId)
      this.contextsByAsyncId.delete(asyncId)
    }
  }
}

module.exports = {
  Namespace
}
