<template lang="pug">
  div(style="height: 100%; width: 100%")
    swiper(:options="swiperOption", v-if="carouselReady")
      swiper-slide(v-for="(item, key) in vehicles", class="slide")
        tooltip(:content="alternative ? '' : fullDescription")
          div(class="vehicle", :class="{ alternative: alternative }")
            div(v-visible="selectedItem.id == item.id && !alternative", class="vehicle__fly",
            @click="flySimple(item)")
              span {{ $content.globals.fly }}
            div(class="vehicle__pic", :class="{ blocked: item.blocked, 'buy-only': item['buy_only'] }")
              div(class="vehicle__overlay")
                div(v-if="selectedItem.id == item.id", class="selected-child-arrow")
                  span {{ item.name }}
              div(v-if="item['buy_only']", class="unlock")
              img(:src="getVehiclePic(item)", :class="hoveredItem == item.id ? 'full-opacity' : null", style="width: 100%; height: 100%")
            div(class="vehicle__details"
            :class="hoveredItem == item.id ? 'vehicle__details--hovered' : null")
              div(v-visible="selectedItem.id != item.id",
              class="vehicle__details--small") {{ item.name }}
              p(v-if="!alternative", class="vehicle__name") {{ selectedItem.id === item.id ? item.name : '&nbsp;' }}
              p(v-if="!alternative", class="vehicle__desc") {{ item.description.slice(0, descShort) + '...' }}
</template>
<script>
import _ from 'lodash'
import tooltip from '../utils/tooltip'
import uniCarousel from '@/components/uni-carousel/uniCarousel'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'vehicle-menu',
  components: {
    tooltip,
    uniCarousel,
    swiper,
    swiperSlide
  },
  props: {
    alternative: {
      type: Boolean
    },
    items: null,
    perPage: {
      type: Number,
      default: 7
    }
  },
  computed: {
    vehicles () {
      return this.items && this.items.length ? this.items : this.$store.state.vehicles.vehicles
    },
    selectedItem () {
      return this.$store.state.generator.selectedVehicle
    },
    descShort () {
      return window.innerWidth < 1450 ? 25 : 35
    }
  },
  watch: {

  },
  data () {
    return {
      fullDescription: '',
      hoveredItem: null,
      carouselReady: false,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        mousewheel: true,
        keyboard: {
          enabled: true
        },
        loopAdditionalSlides: 6,
        //slidesPerGroup: 1,
        loop: true,
        //loopFillGroupWithBlank: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.carouselReady = true
    }, 1000)
  },
  methods: {
    getVehiclePic (item) {
      let pic
      try {
        pic = require('@/assets/img/planes/' + item.id + '.png')
      } catch (e) {
        pic = require('@/assets/img/planes/A-10A.png')
      }
      return pic
    },
    handleMouseUp (e, item) {
      if (item && !this.moving) {
        this.handleClick(e, item)
      }
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
    makeTooltip (e, item) {
      // e.target.querySelector('.vehicle__desc').style.opacity = 0
      this.fullDescription = item.description
    },
    removeTooltip (e) {
      this.fullDescription = ''
    },
    handleClick (e, vehicle) {
      console.log(vehicle)
      // this.selectedItem = vehicle.id
      this.$store.commit('SET_VEHICLE', vehicle)
      this.$emit('onselect', vehicle)
    },
    flySimple (vehicle) {
      this.$store.commit('SHOW_LOADER')
      setTimeout(() => {
        this.$edQuery({
          request: {
            method: 'flySimpleGen',
            parameters: [vehicle.id, 'Chizh']
          },
          success: (e) => {
            this.$store.commit('HIDE_LOADER')
            if (e[0] === false) {
              this.store.commit('SHOW_POPUP', { header: this.$content.globals.error, text: `${e[2]}, node: ${e[1]}` })
            }
            // this.$router.push({ name: 'debrief', params: { level: 'child' } })
          }
        })
      }, 500)
    }
  }
}
</script>
<style lang="sass" scoped>
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
    .vehicle
      @include make-font('Roboto', normal)
      font-size: 1.5rem
      //padding: 0 10px
      width: 100%
      height: 100%
      position: relative
      box-sizing: content-box
      transition: all .5s
      position: static
      &.alternative
        padding: 0
        & .tooltip
          position: absolute
        & .selected-child-arrow
          & span
            font-size: calcsize(16)
            width: 100%
            display: block
            top: -2rem
          &:after
            bottom: calc( 50% - .25rem )
            display: block
            border-top: .35rem solid transparent
            border-right: .35rem solid $orange
            border-bottom: .35rem solid transparent
        & .vehicle__pic
          align-items: center
          background-size: 195%
          background-position: center
          width: 80%
          height: 40%
          margin-top: 25%
          padding: .5rem 0
        & .vehicle__fly
          margin: 0
          display: none
        & .vehicle__details
          &--small
            font-size: calcsize(14)
            margin-top: .5rem
      &__details
        height: 33.3333%
        width: 100%
        &--small
          color: $blue
          font-size: 1.12rem
          //margin-top: -.8rem
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
        height: 18.3333%
        @include make-font('Roboto Condensed', bold)
        color: $blue
        font-size: 2.8rem
        position: relative
        margin: 0 0 15% 0
        text-transform: uppercase
        &:hover span
          //color: #fff
          background: transparent
        & span
          display: flex
          position: absolute
          background: $base
          height: 100%
          align-items: center
          cursor: pointer
          padding: 0 .6vw
          border-radius: calcsize(3)
          transition: color .3s, background 1s
        &:before
          content: ''
          position: absolute
          bottom: -35%
          left: .9rem
          border-top: .4rem solid $orange
          border-left: .4rem solid transparent
          border-right: .4rem solid transparent
      &__pic
        display: flex
        align-items: center
        justify-content: center
        position: relative
        width: 100%
        height: 40%
        border-radius: 3px
        &.blocked:not(.buy-only):before
          content: ""
          width: 100%
          height: 100%
          position: absolute
          background: rgba(0, 0, 0, 0.3)
        & img
          transition: transform .5s
          width: 80%
          //margin: -10px 0 0 -10px
          pointer-events: none
          opacity: 0.7
          &.full-opacity
            opacity: 1
      &__name
        color: $orange
        margin: 5px 0 5px 0
        visibility: hidden
      &__desc
        font-size: .8rem
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
          /*margin-top: 5px*/
          color: $orange
          opacity: 1
          visibility: visible!important
        & .vehicle__desc
          opacity: 1
          visibility: visible!important
      & .vehicle__overlay
        top: 0
        left: 1px
        position: absolute
        width: 100%
        height: 100%
        border: .05rem solid rgba(255, 195, 100, .3)
        border-radius: 4px
        &:before
          content: ''
          position: absolute
          width: .61rem
          height: .61rem
          top: -1px
          left: -1px
          background: url("../../assets/img/icons/frame_corner.svg") no-repeat center/contain
        &:after
          content: ''
          position: absolute
          width: .61rem
          height: .61rem
          top: -1px
          right: -1px
          background: url("../../assets/img/icons/frame_corner.svg") no-repeat center/contain
          transform: rotate(90deg)
    .selected-child-arrow
      box-sizing: border-box
      //padding: 10px
      position: absolute
      width: 100%
      display: flex
      align-items: center
      justify-content: flex-end
      flex-direction: column
      height: 100%
      & span
        display: none
        color: $orange
        font-size: .87rem
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
        //border-top: 6px solid transparent
        //border-right: 6px solid $orange
        //border-bottom: 6px solid transparent
        //bottom: 13px
        right: -1rem
    .selected .vehicle__pic:before, .selected .vehicle__pic:after
      content: ''
      position: absolute
      width: .61rem
      height: .61rem
      bottom: -2px
    .selected .vehicle__pic:before
      left: 1px
      background: url("../../assets/img/icons/frame_corner.svg") no-repeat center/contain
      transform: rotate(270deg)
    .selected .vehicle__pic:after
      right: -3px
      background: url("../../assets/img/icons/frame_corner.svg") no-repeat center/contain
      transform: rotate(180deg)
    @media (min-width: 1250px) and (max-width: 1400px)
      #carousel
        & .vehicle__desc
          font-size: 1rem
    @media screen and (max-aspect-ratio: 16/9)
      #carousel
        & .vehicle__fly
          &:before
            bottom: -20%
</style>
