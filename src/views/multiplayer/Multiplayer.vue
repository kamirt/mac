<template lang="pug">
  - var corners = {1: 'right-top', 2: 'right-bottom', 3: 'left-top', 4: 'left-bottom'}
  videomenu
    div(slot="topRight", class="videomenu-block")
      div(class="corners")
        each val, index in corners
          if val != 'right-bottom'
            svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
    div(slot="centerCenter", class="videomenu-block")
      div(class="corners")
        each val, index in corners
          if val != 'right-bottom' && val != 'left-top'
            svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
    div(slot="bottomLeft", scope="bottomLeft", class="videomenu-block joinserver")
      div(class="corners")
        svg-icon(name="frame_corner", class="corner corner--right-top corner--left-offset")
      div(class="video")
        div(class="video__poster video__poster--joinserver")
        video(loop muted, data-source="joinserver")
          source(:src="videoSources.joinserver")
      div(class="videomenu-block__text")
        span {{ $content.multiplayer.join }}
    div(slot="bottomCenter", scope="bottomCenter", class="videomenu-block startserver")
      div(class="video")
        div(class="video__poster video__poster--startserver")
        video(loop muted, data-source="startserver")
          source(:src="videoSources.startserver")
      div(class="videomenu-block__text")
        span {{ $content.multiplayer.start }}
</template>
<script>
import videomenu from '@/components/menus/videoMenu'
export default {
  components: {
    videomenu
  },
  data () {
    return {
      videoSources: {
        joinserver: 'static/video/flight.webm',
        startserver: 'static/video/flight.webm'
      }
    }
  },
  methods: {
    fullBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="sass" scoped>
  .joinserver
    & .videomenu-block__text
      top: -2rem
      right: -.5%
  .startserver
    & .videomenu-block__text
      top: -2rem
      right: -.5%
  .corners
    position: absolute
    width: 100%
    height: 100%
  .corner
    fill: $blue
    stroke: none
    width: 13px
    height: 13px
    position: absolute
    &--right-top
      right: 0
      top: 0
      transform: rotate(90deg)
    &--right-bottom
      right: 0
      bottom: 0
      transform: rotate(180deg)
    &--left-top
      left: 0
      top: 0
    &--left-bottom
      left: 0
      bottom: 0
      transform: rotate(270deg)
    &--left-offset
      left: -33px
  .video
    &__poster
      &--joinserver
        background: url(../../assets/img/backgrounds/multi_join.png) center/cover
      &--startserver
        background: url(../../assets/img/backgrounds/multi_start.png) center/cover
</style>
