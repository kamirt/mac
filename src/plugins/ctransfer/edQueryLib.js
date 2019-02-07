import edMethods from './edMethods'

export default (opts) => {
  return new Promise((resolve, reject) => {
    if (!opts.request) reject(Error('you should pass REQUEST parameter with METHOD attribute'))
    const request = opts.request
    let result = edMethods[request.method]()
    // not persistent, one callback call
    if (!opts.persistent) {
      setTimeout(() => {
        resolve(opts.success(result))
      }, 500)
      // persistent, two calback calls
    } else {
      let counter = 0
      let interval = setInterval(() => {
        counter++
        if (counter > 2) {
          clearInterval(interval)
        }
        resolve(opts.success(result))
      }, 500)
    }
  })
}
