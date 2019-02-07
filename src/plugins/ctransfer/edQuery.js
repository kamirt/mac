import edQueryLib from './edQueryLib'

const EdQuery = {
  install: function (Vue, options) {
    Vue.prototype.$edQuery = function (opts) {
      if (window.edQuery) {
        return window.edQuery({
          request: JSON.stringify(opts.request),
          persistent: opts.persistent || false,
          onSuccess: opts.success,
          onFailure: opts.failure
        })
      }
      // mockup for edQuery function
      return edQueryLib(opts).catch(e => opts.failure(e))
    }
  }
}

export default EdQuery
