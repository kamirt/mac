<template lang="pug">
  transition(name="fade")
    div(class="profile-menu-wrapper", @mouseleave="onMouseLeave", @mouseenter="onMouseEnter")
      div(class="profile-menu__border-wrapper")
        span(class="profile-menu__border profile-menu__border--left")
        span(class="profile-menu__border profile-menu__border--right")
      ul(class="profile-menu")
        li(v-for="(item, key) in items",
        :key="key",
        class="main-menu__item")
          router-link(:to="item.name") {{item.name}}
</template>

<script>
export default {
  name: 'profile-menu',
  props: {
    profile: {
      type: Object,
      default () {
        return {
          username: '',
          ava_small: ''
        }
      }
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    onMouseLeave () {
      this.$emit('mouseleave')
    },
    onMouseEnter () {
      this.$emit('mouseenter')
    }
  }
}
</script>

<style lang="sass">
  .profile-menu-wrapper
    position: absolute
    top: 100px
    right: 0
  .profile-menu
    width: 313px
    min-height: 30px
    background: $base
    position: relative
    border-radius: 0 0 4px 4px
    &:before
      position: absolute
      content: ''
      top: -10px
      left: 0
      width: 240px
      border-bottom: 10px solid $base
      border-right: 10px solid transparent
      border-radius: 4px 0 0 0
    &:after
      position: absolute
      content: ''
      top: -10px
      right: 0
      width: 52px
      border-bottom: 10px solid $base
      border-left: 10px solid transparent
      border-radius: 0 4px 0 0
</style>
