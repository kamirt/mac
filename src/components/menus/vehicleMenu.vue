<template lang="pug">
  div(id="vehicles-carousel",
       @mousedown="handleMouseDown",
       @mousemove="handleMove",
       @mouseup="handleMouseUp",
       @mouseleave="handleMouseUp")
    div(class="carousel",
      ref="carousel",
      :class="{ vertical: vertical }",
      :style="getTransform")
      div(v-for="item in vehicles",
           :key="item.id",
           class="vehicle",
           :class="selectedVehicle == item.id ? 'selected' : ''",
           @mouseup="(e) => handleMouseUp(e, item)")
        transition(name="fade")
          div(v-show="selectedVehicle == item.id && !vertical", class="vehicle__fly") {{ $content.globals.fly }}
        div(class="vehicle__pic", :class="{ blocked: item.blocked, 'buy-only': item['buy_only'] }")
          div(class="vehicle__overlay")
            div(v-if="selectedVehicle == item.id", class="selected-child-arrow")
              span {{ item.name }}
          div(v-if="item['buy_only']", class="unlock")
          img(:src="item.image", alt="")
        div(v-if="!vertical", class="vehicle__details")
          p(v-if="selectedVehicle == item.id", class="vehicle__name") {{ item.name }}
          p(v-if="selectedVehicle == item.id", class="vehicle__desc") {{ item.description }}
</template>
<script>
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
    },
    getTransform () {
      return `transform: translateX(${this.offset}px)`
    }
  },
  data () {
    return {
      down: false,
      xPos: 0,
      offset: 0,
      dragged: 0,
      totalWidth: 0,
      selectedVehicle: null,
      moving: false
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
  mounted () {
    const config = { childList: true }
    const callback = (mutationList, observer) => {
      this.initCarousel()
    }
    const observer = new MutationObserver(callback)
    observer.observe(this.$refs.carousel, config)
    this.initCarousel()
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.slideOnes)
  },
  methods: {
    initCarousel () {
      const vEls = this.$el.querySelectorAll('.vehicle')
      if (!vEls.length) return
      this.totalWidth = vEls.length * vEls[0].clientWidth
      window.addEventListener('keyup', this.slideOnes)
    },
    handleMove (e) {
      if (this.down) {
        this.moving = true
        requestAnimationFrame(() => {
          let offset = e.clientX - this.xPos
          let maximum = this.totalWidth - 250
          let total = this.dragged + offset
          if (total > 0) {
            total = 0
            this.dragged = 0
          }
          if (total < maximum * -1) {
            total = maximum * -1
            this.dragged = maximum * -1
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
    slideOnes (e) {
      let total
      const max = this.totalWidth - 250
      if (e.code === 'ArrowLeft') {
        total = this.offset + 250
        if (total > 0) {
          total = 0
          this.dragged = 0
        }
        this.offset = total
        this.dragged = total
      }
      if (e.code === 'ArrowRight') {
        total = this.offset - 250
        if (total < max * -1) {
          total = max * -1
          this.dragged = max * -1
        }
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
  #vehicles-carousel
    width: 100%
    overflow-x: hidden
  .carousel
    display: flex
    padding-top: 0
    padding-bottom: calcsize(150)
    padding-top: calcsize(100)
    transition: transform .1s
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
    padding: 10px
    position: relative
    box-sizing: content-box
    &__details
      position: absolute
      margin-left: -10px
    &__fly
      @include make-font('Roboto Condensed', bold)
      color: $blue
      font-size: calcsize(55)
      position: absolute
      top: calcsize(-80)
      margin: 0 0 27px -13px
      text-transform: uppercase
      &:before
        content: ''
        position: absolute
        bottom: -5px
        left: 28px
        border-top: 10px solid $orange
        border-left: 11px solid transparent
        border-right: 11px solid transparent
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
        width: 75%
        pointer-events: none
    &__name
      color: $orange
      margin: 20px 0 10px 0
    &__desc
      font-size: calcsize(12)
      color: #fff
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
    & .vehicle__pic
      //background: url('../../assets/icons/dot_grid.svg')
      &:before
        content: ''
        position: absolute
        width: 10px
        height: 10px
        bottom: -2px
        left: -10px
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
        right: -2px
        border-bottom: 2px solid
        border-right: 2px solid
        border-color: $orange
        border-radius: 0 0 4px 0
    & .vehicle__overlay
      top: -10px
      left: -10px
      position: absolute
      width: calc( 100% + 10px )
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
      background: url('../../assets/img/backgrounds/dot_grid.svg')
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
