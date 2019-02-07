import Velocity from 'velocity-animate'

export default {
  install (Vue, opts) {
    Vue.prototype.$anim = Velocity
  }
}
