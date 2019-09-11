import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
/*
 Paths and names
 must be the same as in the translations
 because they're used to display menu points
*/
export default new Router({
  // mode: 'history',
  base: process.env.NODE_ENV === 'development' ? process.env.BASE_URL : 'mac/dist/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/singleplayer',
      component: () => import('./components/blocks/page.vue'),
      children: [
        {
          path: '/',
          name: 'singleplayer',
          component: () => import('./views/singleplayer/Singleplayer.vue'),
          meta: { header: 'main_menu.singleplayer' }
        },
        {
          path: 'missions',
          name: 'missions',
          component: () => import('./views/singleplayer/Missions.vue'),
          meta: { header: 'main_menu.singleplayer', subheader: 'globals.missions' }
        },
        {
          path: 'debrief',
          name: 'debrief',
          component: () => import('./views/singleplayer/Debrief.vue'),
          props: (route) => ({ query: route.query.q }),
          meta: { header: 'main_menu.singleplayer', subheader: 'globals.debrief' }
        },
        {
          path: '/briefing',
          name: 'briefing',
          component: () => import('./views/singleplayer/Briefing.vue'),
          meta: { header: 'globals.briefing' }
        }
      ]
    },
    {
      path: '/multiplayer',
      component: () => import('./components/blocks/page.vue'),
      children: [
        {
          path: '/',
          name: 'multiplayer',
          component: () => import('./views/multiplayer/Multiplayer.vue'),
          meta: { header: 'main_menu.multiplayer' }
        }
      ]
    },
    {
      path: '/aircraft_settings',
      name: 'aircraft settings',
      component: () => import('./views/Controls.vue'),
      meta: { header: 'main_menu.aircraft_settings' }
    },
    {
      path: '/game_settings',
      name: 'game settings',
      component: () => import('./views/Controls.vue')
    }
  ]
})
