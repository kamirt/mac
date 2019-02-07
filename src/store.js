import Vue from 'vue'
import Vuex from 'vuex'
import profile from './store/profile/index'
import news from './store/news/index'
import vehicles from './store/vehicles/index'
import controls from './store/controls/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile,
    news,
    vehicles,
    controls
  }
})
