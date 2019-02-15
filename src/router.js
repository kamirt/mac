import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? process.env.BASE_URL : 'mac/dist/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/singleplayer',
      name: 'singleplayer',
      component: () => import('./views/Singleplayer.vue')
    },
    {
      path: '/aircraft_settings',
      name: 'controls',
      component: () => import('./views/Controls.vue')
    }
  ]
})
