<template lang="pug">
  -
    var cells = [['topLeft', 'topCenter', 'topRight'],
    ['centerLeft', 'centerCenter', 'centerRight'],
    ['bottomLeft', 'bottomCenter', 'bottomRight']]
  div(class="videomenu col-12 offset-4")
    each row in cells
      div(class="row")
        each cell in row
          div(class="col", @mouseenter='handleEnter', @mouseleave='handleLeave')
            slot(name=`${cell}`, position=`${cell}`)
</template>

<script>
export default {
  name: 'videoMenu',
  data () {
    let videoScope = {}
    for (let i in this.$slots) {
      let video = this.$slots[i][0].data.attrs.scope
      if (video !== undefined) {
        videoScope[i] = '00'
      }
    }
    return {
      playing: {
        ...videoScope
      }
    }
  },
  mounted () {
    for (let i in this.playing) {
      this.$watch(`playing.${i}`, (next, prev) => {
        if (next === '10') { // playing but not hovered
          let video = document.querySelector(`[scope=${i}]`).querySelector('video')
          setTimeout(_ => {
            video.load()
          }, 300)
        }
      })
    }
  },
  methods: {
    handleEnter (e) {
      let video = e.target.getElementsByTagName('video')
      let scope = video.length ? e.target.firstChild.getAttribute('scope') : null
      function hidePosterNPlay () {
        let poster = e.target.querySelector('.video__poster')
        this.$anim(poster,
          { opacity: 0 },
          { begin: () => {
            video = video[0]
            let playPromise = video.play()
            if (playPromise) {
              playPromise.then(_ => {
                this.playing[scope] = '1' + this.playing[scope].split('')[1] // playing but hovering is unknown
              })
            }
          } })
      }

      if (video.length) {
        this.playing[scope] = this.playing[scope].split('')[0] + '1' // hovered but not playing yet
        hidePosterNPlay.call(this)
      }
    },
    handleLeave (e) {
      const video = e.target.querySelector('video')
      if (video) {
        let scope = e.target.firstChild.getAttribute('scope')
        this.playing[scope] = this.playing[scope].split('')[0] + '0' // does not hovered but playing is unknown
        let poster = e.target.querySelector('.video__poster')
        this.$anim(poster, 'stop')
        this.$anim(poster, { opacity: 1 }, { duration: 200 })
      }
    }
  }
}

</script>
<style lang="sass" scoped>
  .col
    width: 33.3333%
  .row
    margin-bottom: 2vh
    .content
      height: 100%
      .singleplayer-menu
        width: 69%
    table
      background: red
    .videomenu
      margin-top: 26.4vh
    .videomenu-block
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
  svg
    transition: fill .2s
  .video
    position: absolute
    width: 100%
    height: 100%
    overflow: hidden
    & video
      object-fit: cover
      height: 100%
      width: 100%
    &__poster
      position: absolute
      width: 100%
      height: 100%
  @media screen and (max-aspect-ratio: 16/9)
    .videomenu-block__text
      span
        font-size: 2.7rem
</style>
