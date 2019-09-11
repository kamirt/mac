<template lang="pug">
  div(id="app", class="app-container", onselectstart="return false")
    preloader()
    system-menu
    profile
    main-menu
    div(v-if="this.$route.name==='home'", class="offset-4 vehicles", onselectstart="return false")
      vehicle-menu(items="")
    transition(name="fade")
      router-view
</template>
<script>
import mainMenu from '@/components/menus/mainMenu'
import systemMenu from '@/components/menus/systemMenu'
import vehicleMenu from '@/components/menus/carousel'
import profile from '@/components/profile/Profile'

export default {
  components: {
    mainMenu,
    systemMenu,
    vehicleMenu,
    profile
  },
  data () {
    return {
      isHome: true
    }
  },
  created () {
    // ask API for vehicle list
    this.$edQuery({
      request: {
        method: 'getAircraft'
      },
      success: (e) => {
        this.$store.commit('SET_VEHICLES', e)
      },
      failure (error) {
        console.log(error.message)
      },
      persistent: false
    })
    this.$edQuery({
      request: {
        method: 'getMissions'
      },
      success: (missions) => {
        this.$store.commit('SET_MISSIONS', missions)
        if (missions.length) {
          this.mission = missions[0]
        }
      }
    })
  }
}
</script>
<style lang="sass">
  body
   background: url('./assets/img/backgrounds/home-back.png') center/cover, #000

  .app-container
    margin: $top-margin $side-margin
  .vehicles
    position: absolute
    bottom: 5%
    width: 80%
    z-index: 1
    height: 250px
</style>
