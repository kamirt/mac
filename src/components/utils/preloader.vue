<template lang="pug">
  transition(name="fade-slow", appear)
    div(v-if="showLoader", class="loader-wrapper")
      div(class="loader") &nbsp;
      p loading...
</template>

<script>
export default {
  name: 'preloader',
  computed: {
    showLoader () {
      return this.$store.state.loader.showLoader
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    showLoader (from, to) {
      if (to) {
        this.show = true
        return
      }
      setTimeout(() => {
        this.show = false
      }, 1000)
    }
  }
}
</script>
<style lang="sass">
  @keyframes rotate
    50%
      transform: rotate(180deg) scale(.5)
    100%
      transform: rotate(360deg)
  .loader
    width: 50px
    height: 50px
    position: absolute
    top: calc( 50% - 25px )
    left: calc( 50% - 25px )
    border: 5px solid $blue
    border-radius: 15px
    animation: rotate 1s infinite
    &:before
      content: ''
      width: 5px
      height: 5px
      background: $blue
      position: absolute
      top: 10px
      left: 10px
    &-wrapper
      position: fixed
      width: 100%
      height: 100%
      background: #1D1D1D
      z-index: 1000
      left: 0
      top: 0
      & p
        color: $blue
        font-weight: 200
        text-transform: uppercase
        position: absolute
        top: calc( 50% + 50px )
        left: 50%
</style>
