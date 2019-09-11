import Vue from 'vue'
import Vuex from 'vuex'
import profile from './store/profile/index'
import news from './store/news/index'
import vehicles from './store/vehicles/index'
import controls from './store/controls/index'
import missions from './store/missions/index'
import loader from './store/loader/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile,
    news,
    vehicles,
    controls,
    missions,
    loader
  }
})
