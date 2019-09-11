import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import svgIcon from '@/components/utils/SvgIcon'
import preloader from '@/components/utils/preloader'
import { determineLocale } from './config/locale'
import edQueryPlugin from './plugins/ctransfer/edQuery'
import Utils from './plugins/utils'
import Velocity from './plugins/animations/velocity'
import VueCarousel from 'vue-carousel'

Vue.config.productionTip = false

Vue.use(VueCarousel)
Vue.use(edQueryPlugin)
Vue.use(Utils)
Vue.use(Velocity)
Vue.component('svg-icon', svgIcon)
Vue.component('preloader', preloader)
let vue = new Vue({
  router,
  store,
  render: h => h(App)
})

// hide animated preloader after each page loaded
router.afterEach((to, from) => {
  vue.$store.commit('HIDE_LOADER')
})

// making query for locale and mounting app to DOM
determineLocale(vue)
