<template lang="pug">
  div(class="row system-menu-wrapper")
    div(v-show="!($route.name==='home')")
      router-link(to="/")
        span(id="home-icon", class="svg-icon--system-menu system-menu__item")
    div(class="col-6")
      div(v-show="$route.name==='home'", class="system-menu-items")
        ul(class="system-menu")
          li(v-for="(item, key) in Object.keys(content)", :key="key", class="system-menu__item")
            router-link(:to="content[item]") {{ content[item] }}
        div(class="logo-container")
    div(class="col-2 offset-2")
      ul(v-show="$route.name==='home'", class="menu-logos")
        li(class="system-menu__item")
          router-link(to="dcs")
            svg-icon(name='dcs_logo', group="system-menu")
        li(class="system-menu__item")
          router-link(to="fl")
            svg-icon(name='fl_logo', group="system-menu")
</template>

<script>
import profileMenu from '../profile/profileMenu'
import mainMenu from './mainMenu'
export default {
  name: 'system-menu',
  components: {
    profileMenu,
    mainMenu
  },
  data () {
    const content = this.$content['system_menu']
    return {
      content: content
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="sass" scoped>
  .system-menu-wrapper
    width: 100%
    position: absolute
    top: 0
    left: 0
    color: $blue
    z-index: 3
    justify-content: flex-start!important
  .system-menu
    @include make-font('Roboto', 400)
    display: flex
    text-transform: uppercase
    font-size: calcsize(16)
    margin: 0
    width: 100%
    justify-content: space-between
    &__items
      height: 50%
      display: flex
      flex-direction: column
    &__item
      &:hover
        color: #fff
        text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 25px
  .menu-logos
    display: flex
    margin: 0
    height: 25px
    align-items: center
    position: relative
    li:not(:last-child)
      margin-right: 100px
  .system-menu__item
    &:hover
      filter: drop-shadow(0px 0px 25px rgba(255, 255, 255, 0.75))
  .svg-icon
    &--system-menu
      width: calcsize(50)
      height: calcsize(50)
    &--modern_air_combat_logo
      width: 652px
      height: 258px
      margin-top: 8%
  .logo-container
    margin-top: 17%
    width: 100%
    min-height: 40vh
    background: url("../../assets/img/backgrounds/modern_air_combat_logo.svg") center/100%
    background-repeat: no-repeat
    & svg
      width: 100%
  #home-icon
    display: block
    background: url("../../assets/img/backgrounds/mac_logo.svg") center/cover
    &:hover
      background: url("../../assets/img/backgrounds/mac_logo_white.svg") center/cover
</style>
