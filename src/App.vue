<template lang="pug">
  div(id="app", class="app-container", onselectstart="return false")
    system-menu
    profile
    main-menu
    div(v-if="this.$route.name==='home'", class="offset-4 vehicles", onselectstart="return false")
      vehicle-menu
    transition(name="fade")
      router-view
</template>
<script>
import mainMenu from '@/components/menus/mainMenu'
import systemMenu from '@/components/menus/systemMenu'
import vehicleMenu from '@/components/menus/vehicleCarousel'
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
  }

}
</script>
<style lang="sass">
  @import './assets/css/fonts'
  @import './assets/css/lib/bootstrap/bootstrap-grid.scss'

  body
   background: url('./assets/img/backgrounds/home-back.png') center/cover, #000

  .app-container
    margin: calcsize(33) $side-margin
  .vehicles
    position: absolute
    bottom: 5%
    width: 80%
    z-index: 1
</style>
