<template lang="pug">
  div(id="vehicles-carousel",
       @mousedown="handleMouseDown")
    div(class="carousel", ref="carousel",
    :class="{ vertical: vertical }")
      div(class="vehicle", v-for="(item, key) in vehicles",
        :key="item.id",
        :class="selectedVehicle == item.id ? 'selected' : ''",
        @mouseup="(e) => handleMouseUp(e, item)",
        @mouseenter="(e) => handleMouseEnter(e, item)")
        div(v-visible="selectedVehicle == item.id && !vertical", class="vehicle__fly")
          span {{ $content.globals.fly }}
        transition(name="fade", appear, @after-enter="onAfterEnter")
          div(class="vehicle__pic", :class="{ blocked: item.blocked, 'buy-only': item['buy_only'] }")
            div(class="vehicle__overlay")
              div(v-if="selectedVehicle == item.id", class="selected-child-arrow")
                span {{ item.name }}
            div(v-if="item['buy_only']", class="unlock")
            img(:src="item.image", :class="hoveredVehicle == item.id ? 'full-opacity' : null")
        div(v-if="!vertical",
            class="vehicle__details"
            :class="hoveredVehicle == item.id ? 'vehicle__details--hovered' : null")
          div(v-visible="selectedVehicle != item.id",
              class="vehicle__details--small") {{ item.name }}
          p(class="vehicle__name") {{ selectedVehicle != item.id && hoveredVehicle == item.id ? item.index : item.name }}
          p(class="vehicle__desc") {{ item.description }}
</template>
<script>
import _ from 'lodash'
export default {
  name: 'vehicle-menu',
  props: {
    vertical: {
      type: Boolean
    }
  },
  computed: {
    vehicles () {
      return this.$store.state.vehicles.vehicles
    },
    selected () {
      return this.$store.state.vehicles.selected
    }
  },
  data () {
    let spinFunc = _.debounce((itemOffset, direction) => {
      this.spinCarousel(itemOffset, direction)
    }, 250, { leading: true, maxWait: 250 })
    return {
      down: false, // detects if mouse button pressed
      xPos: 0,
      offset: 0, // offset of carousel
      dragged: 0,
      wheel: 0, // detects mouse wheel scroll
      itemWidth: null, // width of the only item of carousel
      itemOffset: 0,
      selectedVehicle: null,
      hoveredVehicle: null,
      moving: false,
      timeoutScroll: true,
      carouselCreated: false,
      spinFunc
    }
  },
  watch: {
    offset (next, prev) {
      let direction = next > prev ? 1 : -1
      this.spinFunc(direction)
    },
    vehicles (next, prev) {
      if (!prev.length && next.length) {
        let indexed = this.vehicles.map((el, index) => { return { index: index + 1, ...el } })
        this.$store.commit('SET_VEHICLES', { vehicles: indexed, selected: this.selected })
      }
    }
  },
  created () {
    // ask API for vehicle list
    this.$edQuery({
      request: {
        method: 'getVehicleList'
      },
      success: (e) => {
        this.$store.commit('SET_VEHICLES', e.data)
        this.selectedVehicle = this.selected
      },
      failure (error) {
        console.log(error.message)
      },
      persistent: false
    })
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.slideOnes)
  },
  methods: {
    onAfterEnter () {
      if (!this.carouselCreated) {
        this.carouselCreated = true
        const vEls = this.$el.querySelectorAll('.vehicle')
        this.initCarousel(vEls)
      }
    },
    initCarousel (vEls) {
      if (!vEls.length) console.error('wrong elements passed to carousel initialization function')
      this.itemWidth = vEls[0].clientWidth
      window.addEventListener('mousemove', this.handleMove)
      window.addEventListener('keydown', this.slideOnes)
      window.addEventListener('mouseup', this.handleMouseUp)
      this.$el.addEventListener('wheel', (e) => {
        if (this.timeoutScroll) {
          this.timeoutScroll = false
          setTimeout(() => {
            this.timeoutScroll = true
          }, 100)
          if (e.wheelDelta > 0) {
            this.slideOnes({ code: 'ArrowLeft' })
            return
          }
          this.slideOnes({ code: 'ArrowRight' })
        }
      })
    },
    spinCarousel (direction) {
      /*
        because we want to cycle carousel not by slide pages as usual
        we have to move right or left DOM element from one side to another
        depends on direction
      */
      let carousel = this.$refs.carousel
      let beginOffset = direction * this.itemWidth * -1
      // moving carousel right to one vehicle
      if (direction === -1) {
        let sliced = _.slice(this.vehicles, 1, this.vehicles.length)
        let first = _.first(this.vehicles)
        this.$store.commit('SET_VEHICLES', { vehicles: _.concat(sliced, first), selected: this.selected })
        // moving it left
      } else {
        let sliced = this.vehicles.slice(0, this.vehicles.length - 1)
        let last = _.last(this.vehicles)
        this.$store.commit('SET_VEHICLES', { vehicles: _.concat(last, sliced), selected: this.selected })
      }
      /*
        we should move carousel to the opposite direction
        like the element is not added yet
      */
      carousel.style.transform = `translateX(${beginOffset}px)`
      // and then animate moving
      this.$anim(carousel, { translateX: ['0px', `${beginOffset}px`], opacity: [1, 0.75] }, { duration: 200 })
    },
    handleMove (e) {
      if (this.down) {
        // triggering that mouse both down and move
        this.moving = true
        // deleting current mouse position from previous saved
        // to calculate offset
        let offset = e.clientX - this.xPos
        // dragged is previous offset so adding it
        // to not starting from beginning
        let total = this.dragged + offset
        this.offset = total
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
      if (item.id === this.selectedVehicle) return
      this.hoveredVehicle = item.id
    },
    slideOnes (e) {
      let total
      if (e.code === 'ArrowLeft') {
        total = this.offset + this.itemWidth
        this.offset = total
        this.dragged = total
      }
      if (e.code === 'ArrowRight') {
        total = this.offset - this.itemWidth
        this.offset = total
        this.dragged = total
      }
    },
    handleClick (e, vehicle) {
      this.selectedVehicle = vehicle.id
      this.$emit('onselect', vehicle)
    }
  }
}
</script>
<style lang="sass" scoped>
  .carousel-item-wrapper
    display: flex
  #vehicles-carousel
    width: 100%
    overflow-x: hidden
  .carousel
    display: flex
    padding-top: 0
    padding-top: calcsize(100)
    &.offset-left
      transform: translateX(-100px)
    &.offset-right
      transform: translateX(100px)
    &.vertical
      padding: 0
      & .vehicle
        padding: 10px 35px
        &__pic
          width: calcsize(92)
          height: calcsize(120)
          align-items: flex-start
          background-size: 195%
          background-position: center
          & img
            margin-top: 10px
      .selected-child-arrow
        & span
          display: block
        &:after
          display: block
  .vehicle
    @include make-font('Roboto', normal)
    font-size: calcsize(32)
    padding: 0 10px
    position: relative
    box-sizing: content-box
    &__details
      width: 100%
      &--small
        color: $blue
        font-size: 18px
        margin-top: -1.2vw
        text-align: center
        opacity: .7
      &--hovered
        & .vehicle__name
          visibility: visible
          color: #ffffff
          opacity: .15
        & .vehicle__desc
          visibility: visible
          opacity: .7
        & .vehicle__details--small
          opacity: 1
    &__fly
      @include make-font('Roboto Condensed', bold)
      color: $blue
      font-size: calcsize(55)
      position: relative
      margin: 0 0 38px 0
      text-transform: uppercase
      height: 5vw
      & span
        display: flex
        position: absolute
        background: $base
        height: 100%
        align-items: center
        padding: 0 .6vw
        border-radius: calcsize(3)
      &:before
        content: ''
        position: absolute
        bottom: -1vw
        left: 15px
        border-top: 8px solid $orange
        border-left: 8px solid transparent
        border-right: 8px solid transparent
    &__pic
      display: flex
      align-items: center
      justify-content: center
      position: relative
      width: calcsize(200)
      height: calcsize(120)
      border-radius: 3px
      &.blocked:not(.buy-only):before
        content: ""
        width: 100%
        height: 100%
        position: absolute
        background: rgba(0, 0, 0, 0.3)
      & img
        transition: transform .5s
        width: 60%
        //margin: -10px 0 0 -10px
        pointer-events: none
        opacity: 0.7
        &.full-opacity
          opacity: 1
    &__name
      color: $orange
      margin: 10px 0 10px 0
      visibility: hidden
    &__desc
      font-size: calcsize(12)
      color: #fff
      visibility: hidden
  .unlock
    position: absolute
    width: 100%
    height: 100%
    & p
      padding: 4px 20px 0
    & .btn
      margin: 0 5%
      width: 90%
  .selected
    & img
      transform: scale(1.1)
      opacity: 1
    & .vehicle__details
      & .vehicle__name
        margin-top: 10px
        color: $orange
        opacity: 1
        visibility: visible!important
      & .vehicle__desc
        opacity: 1
        visibility: visible!important
    & .vehicle__pic
      &:before
        content: ''
        position: absolute
        width: 10px
        height: 10px
        bottom: -2px
        left: 1px
        border-bottom: 2px solid
        border-left: 2px solid
        border-color: $orange
        border-radius: 0 0 0 4px
      &:after
        content: ''
        position: absolute
        width: 10px
        height: 10px
        bottom: -2px
        right: -4px
        border-bottom: 2px solid
        border-right: 2px solid
        border-color: $orange
        border-radius: 0 0 4px 0
    & .vehicle__overlay
      top: -10px
      left: 1px
      position: absolute
      width: 100%
      height: calc( 100% + 10px )
      border: 1px solid rgba(255, 195, 100, .3)
      border-radius: 4px
      &:before
        content: ''
        position: absolute
        width: 10px
        height: 10px
        top: -1px
        left: -1px
        border-top: 2px solid
        border-left: 2px solid
        border-color: $orange
        border-radius: 4px 0 0 0
      &:after
        content: ''
        position: absolute
        width: 10px
        height: 10px
        top: -1px
        right: -1px
        border-top: 2px solid
        border-right: 2px solid
        border-color: $orange
        border-radius: 0 4px 0 0
  .selected-child-arrow
    box-sizing: border-box
    padding: 10px
    position: relative
    width: 100%
    display: flex
    align-items: center
    justify-content: flex-end
    flex-direction: column
    height: 100%
    & span
      display: none
      color: $orange
      font-size: 14px
      position: absolute
    &:before
      content: ''
      //background: url('../../assets/img/backgrounds/dot_grid.svg')
      background-size: 7%
      width: 100%
      height: 100%
    &:after
      display: none
      content: ""
      width: 1px
      height: 1px
      position: absolute
      border-top: 6px solid transparent
      border-right: 6px solid $orange
      border-bottom: 6px solid transparent
      bottom: 13px
      right: -20px
</style>
