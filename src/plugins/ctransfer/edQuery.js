import edQueryLib from './edQueryLib'

const EdQuery = {
  install: function (Vue, options) {
    Vue.prototype.$edQuery = function (opts) {
      if (window.edQuery) {
        return window.edQuery({
          request: JSON.stringify(opts.request),
          persistent: opts.persistent || false,
          onSuccess: (res) => {
            if (opts.success) opts.success(JSON.parse(res))
          },
          onFailure: (e) => {
            if (opts.failure) {
              opts.failure(e)
            }
          }
        })
      }
      // mockup for edQuery function
      return edQueryLib(opts).catch(e => {
        if (opts.failure) {
          opts.failure(e)
        }
      })
    }
  }
}

export default EdQuery
