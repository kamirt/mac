<template lang="pug">
  div(class="profile", @click="toggleProfileMenu", @mouseenter="toggleProfileMenu(false)", @mouseleave="toggleProfileMenu(false)")
    router-link(to="profile",
    class="profile__link") {{ profile.username }}
      span(class="profile__image",
      :style="{ backgroundImage: 'url(' + profile.ava_small + ')' }")
    profile-menu(v-if="showProfileMenu", @mouseleave="toggleProfileMenu(true)", @mouseenter="profileMenuHovered=true")
</template>
<script>
import profileMenu from './profileMenu'

export default {
  name: 'profile',
  components: {
    profileMenu
  },
  data () {
    return {
      showProfileMenu: false,
      profileMenuHovered: false
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  methods: {
    toggleProfileMenu (hide) {
      if (hide) this.profileMenuHovered = false
      this.showProfileMenu || hide
        ? setTimeout(() => {
          this.showProfileMenu = this.profileMenuHovered
        }, 300)
        : this.showProfileMenu = true
    }
  }
}
</script>
<style lang="sass">
  .profile
    position: absolute
    right: -3vw
    top: calcsize(-10)
    z-index: 2
    &__link
      font-size: .7rem
      display: flex
      align-items: center
    &__image
      display: block
      width: calcsize(40)
      height: calcsize(40)
      background-size: cover
      border-radius: 5px
      margin-left: calcsize(20)
</style>
