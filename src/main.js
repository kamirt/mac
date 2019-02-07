import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svgIcon from '@/components/SvgIcon'
import { determineLocale } from './config/locale'
import edQueryPlugin from './plugins/ctransfer/edQuery'
import Utils from './plugins/utils'
import Velocity from './plugins/animations/velocity'

Vue.config.productionTip = false

Vue.use(edQueryPlugin)
Vue.use(Utils)
Vue.use(Velocity)
Vue.component('svg-icon', svgIcon)

let locale = determineLocale()
Vue.prototype.$content = require(`./config/translations_${locale}.json`)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
