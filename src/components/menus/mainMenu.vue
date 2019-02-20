<template lang="pug">
  aside(class="main-menu-wrapper")
    div(v-show="hidden", class="main-menu main-menu--small", @click="toggleMenu")
      svg-icon(name="hamburger")
    transition(name="left")
      ul(v-show="!hidden", class="main-menu")
        li(v-for="(item, key) in Object.keys(content)",
           :key="key",
           class="main-menu__item")
          router-link(:to="item") {{ content[item] }}
</template>

<script>
export default {
  name: 'main-menu',
  data () {
    const content = this.$content['main_menu']
    return {
      hidden: false,
      content: content
    }
  },
  watch: {
    $route (to, from) {
      this.hidden = to.name !== 'home'
    }
  },
  methods: {
    toggleMenu () {
      this.hidden = !this.hidden
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to, from)
  }
}
</script>

<style lang="sass" scoped>
  .main-menu
    @include make-font('Roboto Condensed', 300)
    color: $blue
    position: absolute
    bottom: 5%
    text-transform: capitalize
    font-size: calcsize(20)
    z-index: 3
    height: 43%
    margin: 0
    &__item
      display: flex
      align-items: center
      justify-content: flex-start
      padding: 12px 32px 12px 0
      &:last-child
        position: absolute
        bottom: 0
      &:hover
        color: #fff
        text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 25px
    &--small
      bottom: 0
      left: -$side-margin
      z-index: 3
      cursor: pointer
  .svg-icon--common
    &.svg-icon--hamburger
      width: 25px
      fill: $blue!important
      &:hover
        fill: white!important
</style>
