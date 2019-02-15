<template lang="pug">
  - var corners = {1: 'right-top', 2: 'right-bottom', 3: 'left-top', 4: 'left-bottom'}
  div(class="row singleplayer-wrapper")
    div(class="col-4")
      h1 {{ $content.main_menu.singleplayer }}
      div(class="row align-center router-back", @click="fullBack")
        div(class="col-4")
          div
            svg-icon(name="back_arrow")
    div(class="col-12")
      div(class="missions")
        div(class="row")
          div(class="col missions-offset")
            div(class="missions-block campaign", @mouseenter='handleEnter', @mouseleave='handleLeave')
              div(class="video")
                video(poster="../assets/img/backgrounds/campaign.png", preload)
                  source(:src="videoSources.campaign")
              div(class="missions-block__text")
                span {{ $content.missions.campaign }}
          div(class="col")
            div(class="missions-block")
              div(class="corners")
                each val, index in corners
                  svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
        div(class="row")
          div(class="col missions-offset")
            div(class="missions-block continue", @mouseenter='handleEnter', @mouseleave='handleLeave')
              div(class="corners")
                each val, index in corners
                  svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
              div(class="missions-block__text")
                span {{ $content.missions.continue_current }}
          div(class="col")
            div(class="missions-block generator", @mouseenter='handleEnter', @mouseleave='handleLeave')
              div(class="video")
                video(poster="../assets/img/backgrounds/generator.png", preload)
                  source(:src="videoSources.generator")
              div(class="missions-block__text")
                span {{ $content.missions.mission_generator }}
        div(class="row")
          div(class="col")
            div(class="missions-block training", @mouseenter='handleEnter', @mouseleave='handleLeave')
              div(class="corners")
                svg-icon(name="frame_corner", class="corner corner--right-top corner--left-offset")
              div(class="video")
                video(poster="../assets/img/backgrounds/training.png", preload)
                  source(:src="videoSources.training")
              div(class="missions-block__text") 
                span {{ $content.missions.training }}
          div(class="col")
            div(class="missions-block mission", @mouseenter='handleEnter', @mouseleave='handleLeave')
              div(class="video")
                video(poster="../assets/img/backgrounds/mission.png", preload)
                  source(:src="videoSources.mission")
              div(class="missions-block__text")
                span {{ $content.missions.mission }}
          div(class="col")
            div(class="missions-block")
              div(class="corners")
                each val, index in corners
                  if val != 'right-top'
                    svg-icon(name="frame_corner", data-index=index, class=`corner corner--${val}`)
</template>

<script>
import videoSrc from '../assets/img/video/flight.m4v'
export default {
  name: 'singleplayer',
  data () {
    return {
      videoSources: {
        campaign: videoSrc,
        generator: videoSrc,
        training: videoSrc,
        mission: videoSrc
      }
    }
  },
  mounted () {
    console.log(videoSrc)
  },
  methods: {
    fullBack () {
      this.$router.back()
    },
    handleEnter (e) {
      let className = e.target.className.split(' ')[1]
      const video = e.target.querySelector('video')
      if (video) video.play()
    },
    handleLeave (e) {
      const video = e.target.querySelector('video')
      if (video) {
        video.pause()
        video.currentTime = 0
        video.load()
      }
    }
  }
}

</script>
<style lang="sass" scoped>
  .row
    margin-bottom: 2vh
  .content
    height: 100%
    .singleplayer-menu
      width: 69%
  table
    background: red
  .missions
    margin-top: 26.4vh
  .missions-offset
    margin-left: 33.33%
  .missions-block
    height: 20vh
    position: relative
    width: 100%
    &:hover
      & svg
        fill: #ffffff
    &__text
      @include make-font('Roboto Condensed', 700)
      font-size: 3.5rem
      position: absolute
      text-transform: uppercase
      line-height: 1
  .campaign
    & .missions-block__text
      top: -2rem
      right: -.5%
  .generator
    & .missions-block__text
      bottom: -20%
      right: 0
      & span
        position: absolute
        right: -1%
        bottom: 0
  .mission
    & .missions-block__text
      top: 5%
      left: -2px
  .training
    & .missions-block__text
      height: 100%
      width: 100%
      & span
        position: absolute
        bottom: -.5rem
        left: -20%
  .continue
    & .missions-block__text
      @include make-font('Roboto', 200)
      font-size: 1rem
      color: $blue
      display: flex
      align-items: center
      justify-content: center
      height: 100%
      width: 100%
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
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
    & video
      object-fit: cover
      height: 100%
      width: 100%
  svg
    transition: fill .2s
</style>
