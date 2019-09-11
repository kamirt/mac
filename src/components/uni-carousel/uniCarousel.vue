<template lang="pug">
  div(id="carousel",
  @mousedown="handleMouseDown")
    div(class="carousel-wrapper")
      div(class="carousel", ref="carousel",
      :class="{ alternative: alternative }", :style="transform")
        div(class="slide", v-for="(item, key) in slides",
        :key="key",
        @mouseup="(e) => handleMouseUp(e, item)",
        @mouseenter="(e) => handleMouseEnter(e, item)",
        @mouseleave="(e) => handleMouseLeave(e)")
          slot
</template>
<script>
import _ from 'lodash'
export default {
  name: 'carousel',
  props: {
    items: null,
    perPage: {
      type: Number,
      default: 7
    }
  },
  computed: {
    transform () {
      return `transform: translateX(${this.offset}px)`
    }
  },
  data () {
    let slideFunc = _.debounce((e) => {
      this.slideOnes(e)
    }, 400, { leading: true, maxWait: 400 })
    return {
      down: false, // detects if mouse button pressed
      xPos: 0,
      offset: 0, // offset of carousel
      dragged: 0,
      wheel: 0, // detects mouse wheel scroll
      itemWidth: null, // width of the only item of carousel
      totalWidth: 0,
      itemOffset: 0,
      moving: false,
      timeoutScroll: true,
      carouselCreated: false,
      maxOffset: 0,
      slideFunc
    }
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.slideOnes)
  },
  mounted () {
    if (!this.carouselCreated) {
      this.carouselCreated = true
      this.initCarousel()
    }
  },
  methods: {
    initCarousel () {
      window.addEventListener('mousemove', this.handleMove)
      window.addEventListener('keydown', this.slideFunc)
      window.addEventListener('mouseup', this.handleMouseUp)
      window.addEventListener('resize', (e) => {
        this.fitCarousel(e)
      })
      this.$el.addEventListener('wheel', (e) => {
        if (this.timeoutScroll) {
          this.timeoutScroll = false
          setTimeout(() => {
            this.timeoutScroll = true
          }, 100)
          if (e.wheelDelta > 0) {
            this.slideFunc({ key: 'ArrowLeft' })
            return
          }
          this.slideFunc({ key: 'ArrowRight' })
        }
      })
      this.fitCarousel()
    },
    fitCarousel (e) {
      this.carousel = this.$el.querySelector('.carousel')
      this.carousel.setAttribute('will-change', true)
      const slides = this.carousel.querySelectorAll('.slide')
      if (!slides.length) console.error('CAROUSEL ERROR: wrong elements passed to carousel initialization function')
      this.totalWidth = this.carousel.parentNode.clientWidth
      // console.log(this.totalWidth, this.perPage)
      this.itemWidth = this.totalWidth / this.perPage
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = this.totalWidth / this.perPage + 'px'
      }
      this.maxOffset = ((this.itemWidth * slides.length) - this.totalWidth) + this.itemWidth * 1.5
      this.carousel.style.height = '100%'
    },
    handleMove (e) {
      if (this.down) {
        this.moving = true
        requestAnimationFrame(() => {
          let offset = e.clientX - this.xPos
          let total = this.dragged + offset
          if (total > 0) {
            total = 0
            this.dragged = 0
          }
          if (total < this.maxOffset * -1) {
            total = this.maxOffset * -1
            this.dragged = this.maxOffset * -1
          }
          this.offset = total
        })
      }
    },
    handleMouseDown (e) {
      this.down = true
      this.xPos = e.clientX
      this.dragged = this.offset
    },
    handleMouseUp (e, item) {
      if (item && !this.moving) {
        this.handleClick(e, item)
      }
      this.down = false
      this.dragged = this.offset
      this.moving = false
    },
    handleMouseEnter (e, item) {
      this.makeTooltip(e, item)
      if (item.id === this.selectedItem) return
      this.hoveredItem = item.id
    },
    handleMouseLeave (e) {
      this.hoveredItem = null
      this.removeTooltip(e)
    },
    slideOnes (e) {
      let total
      if (e.key === 'ArrowLeft') {
        total = this.offset + this.itemWidth
        if (total > 0) {
          total = 0
          this.dragged = 0
        }
        this.offset = total
        this.dragged = total
      }
      if (e.key === 'ArrowRight') {
        total = this.offset - this.itemWidth
        if (total < this.maxOffset * -1) {
          total = this.maxOffset * -1
          this.dragged = this.maxOffset * -1
        }
        this.offset = total
        this.dragged = total
      }
      // console.log(e.key, this.offset)
    },
    handleClick (e, item) {
      this.selectedItem = item
      this.$emit('onselect', item)
    }
  }
}
</script>
<style lang="sass" scoped>
  #carousel
    width: 100%
    height: 100%
    overflow: hidden
    .carousel
      display: flex
      padding-top: 0
      //padding-top: calcsize(100)
      position: absolute
      z-index: 0
      transition: transform .3s
      &-wrapper
        overflow: hidden
        position: absolute
        width: 100%
        height: 100%
      & .slide
        height: 100%
        padding: 0 .3rem
        position: relative
</style>
