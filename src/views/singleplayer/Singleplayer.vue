<template lang="pug">
  - var corners = {1: 'right-top', 2: 'right-bottom', 3: 'left-top', 4: 'left-bottom'}
  videomenu
    div(slot="topCenter", scope="topCenter",  class="videomenu-block campaign")
      div(class="video")
        div(class="video__poster video__poster--campaign")
        video(loop muted, data-source="campaign")
          source(:src="videoSources.campaign")
      div(class="videomenu-block__text")
        span {{ $content.missions.campaign }}
    div(slot="topRight", class="videomenu-block")
      div(class="corners")
        each val, index in corners
          svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
    div(slot="centerCenter", class="videomenu-block continue")
      div(class="corners")
        each val, index in corners
          svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
      div(class="videomenu-block__text")
        span {{ $content.missions.continue_current }}
    div(slot="centerRight", scope="centerRight", class="videomenu-block generator")
      div(class="video")
        div(class="video__poster video__poster--generator")
        video(loop muted, data-source="generator")
          source(:src="videoSources.generator")
      div(class="videomenu-block__text")
        span {{ $content.missions.mission_generator }}
    div(slot="bottomLeft", scope="bottomLeft", class="videomenu-block training")
      div(class="corners")
        svg-icon(name="frame_corner", class="corner corner--right-top corner--left-offset")
      div(class="video")
        div(class="video__poster video__poster--training")
        video(loop muted, data-source="training")
          source(:src="videoSources.training")
      div(class="videomenu-block__text")
        span {{ $content.missions.training }}
    div(slot="bottomCenter",
    scope="bottomCenter",
    class="videomenu-block mission",
    @click="goTo('missions')")
      div(class="video")
        div(class="video__poster video__poster--mission")
        video(loop muted, data-source="mission")
          source(:src="videoSources.mission")
      div(class="videomenu-block__text")
        span {{ $content.missions.mission }}
    div(slot="bottomRight", class="missions-block")
      div(class="corners")
        each val, index in corners
          if val != 'right-top'
            svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
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
        campaign: 'static/video/flight.webm',
        generator: 'static/video/flight.webm',
        training: 'static/video/flight.webm',
        mission: 'static/video/flight.webm'
      }
    }
  },
  methods: {
    goTo (page) {
      this.$router.push({ name: 'missions' })
    }
  }
}
</script>
<style lang="sass" scoped>
  .campaign
    & .videomenu-block__text
      top: -2rem
      right: -.5%
  .generator
    & .videomenu-block__text
      bottom: -20%
      right: 0
      & span
        position: absolute
        right: -1%
        bottom: 0
  .mission
    & .videomenu-block__text
      top: 5%
      left: -2px
  .training
    & .videomenu-block__text
      height: 100%
      width: 100%
      & span
        position: absolute
        bottom: -.5rem
        left: -20%
  .continue
    & .videomenu-block__text
      @include make-font('Roboto', 200)
      color: $blue
      display: flex
      align-items: center
      justify-content: center
      height: 100%
      width: 100%
      & span
        font-size: 1rem
        text-align: center
      &:hover
        color: #fff
        text-shadow: rgba(255, 255, 255, 0.75) 0px 0px 25px
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
      &--campaign
        background: url(../../assets/img/backgrounds/campaign.png) center/cover
      &--generator
        background: url(../../assets/img/backgrounds/generator.png) center/cover
      &--training
        background: url(../../assets/img/backgrounds/training.png) center/cover
      &--mission
        background: url(../../assets/img/backgrounds/mission.png) center/cover
</style>
