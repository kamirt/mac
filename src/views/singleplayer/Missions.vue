<template lang="pug">
  div(style="height: 100%")
    div(class="row" style="height: 25%")
      div(class="maps col-9 offset-4")
        div(v-for="map in maps", class="maps__map", :class="{ 'maps__map--locked': map.lock }")
          div(class="maps__icon-wrapper")
            svg-icon(:name="'missions/' + map.name", class="maps__icon", :class="map.name.split(' ').join('-')")
          div(class="maps__icon__name") {{ map.name }}
    div(class="row" style="height: 50%")
      div(class="col-8 offset-4" style="height: 100%")
        div(class="grid-header")
          table(class="grid", cellspacing="0", cellpadding="0")
            tr(class="grid__row grid__row--headers")
              th {{ missions.length }}
              th task
              th score
            tr(class="grid__row--filters")
              td
              td
                div(class="input-wrapper")
                  input-select(ref="selector", :items="tasks", empty="All", @selectItem="onTaskSelect")
              td
                svg-icon(name="missions/shield", class="icon-shield")
        div(class="grid-wrapper")
          div(class="grid-scroll")
            transition(name="fade")
              table(class="grid", cellspacing="0", cellpadding="0")
                tr(v-for="(mission, index) in missions",
                   class="grid__row",
                   :class="index === selectedIndex ? 'selected': null",
                   @click="select(mission, index)")
                  td(class="grid__cell grid__cell--name")
                    div(class="cell-wrapper")
                      span(class="cell-wrapper") {{ index + 1 }}.
                        // v-if="mission.new" ?????
                        span(class="dot") &#9675;
                      span {{ getSliced(mission.dispName, 20) }}
                  td(class="grid__cell grid__cell--task")
                    span {{ getSliced(mission.task, 10) }}
                  td(class="grid__cell grid__cell--score")
                    div(class="cell-wrapper")
                      // v-if="mission.sertificated" ?????
                      svg-icon(name="missions/shield", class="icon-shield--grey")
                      // v-if="mission.score" ?????
                      span() 11111
        div(class="grid__line-bottom")
      div(class="col-3 offset-1" style="height: 100%")
        div(class="mission-desc")
          h3 {{ $content.mission.description }}
          div(class="mission-description-wrapper")
            p {{ mission ? mission.description : '' }}
    div(class="row row-absolute-bottom" style="height: 25%; margin-top: 5px")
      div(class="col-8 offset-4")
          div(class="vehicles")
            vehicle-carousel(alternative, @onselect="selectVehicle")
      div(class="col-3 offset-1")
        div(class="button-wrapper", style="height: 100%")
          div(class="button button--fly", @click="startMission") {{ $content.globals.fly }}
          div(class="button button--brief", @click="startBriefing") {{ $content.globals.briefing }}
</template>
<script>
import inputSelect from '@/components/input/inputSelect'
import vehicleCarousel from '@/components/menus/vehicleCarousel'
export default {
  components: {
    inputSelect,
    vehicleCarousel
  },
  data () {
    return {
      maps: [
        {
          name: 'caucasus',
          lock: false
        },
        {
          name: 'las vegas',
          lock: false
        },
        {
          name: 'islands',
          lock: false
        },
        {
          name: 'persian gulf',
          lock: true
        },
        {
          name: 'nevada',
          lock: true
        }
      ],
      selectedIndex: 0,
      mission: {},
      missions: [],
      vehicle: {}
    }
  },
  computed: {
    tasks () {
      if (this.vehicle.id) {
        return this.$store.getters.getSingleTasks(this.vehicle.id)
      } return []
    }
  },
  created () {
    // this.$edQuery({
    //   request: {
    //     method: 'getTheatres'
    //   },
    //   success: (theatres) => {
    //     console.log(theatres)
    //   }
    // })
  },
  mounted () {
    //console.log(this.$refs.preloader)
    //console.log(this.$refs.preloader.getPreloader())
  },
  methods: {
    getSliced (str, len) {
      return str.length > len ? str.slice(0, len) + '...' : str
    },
    select (mission, index) {
      this.selectedIndex = index
      this.mission = mission
    },
    selectVehicle (vehicle) {
      this.vehicle = vehicle
      this.missions = this.$store.getters.getSingleMissions(vehicle.id)
      // emitation of click event
      this.$refs.selector.refreshValue()
      this.mission = this.missions[0]
    },
    onTaskSelect (task) {
      if (!task && this.vehicle.id) {
        this.missions = this.$store.getters.getSingleMissions(this.vehicle.id)
      }
      let taskName = task.name
      this.missions = this.$store.getters.getMissionsByTask(this.vehicle.id, taskName)
      this.mission = this.missions[0] || {}
    },
    startMission () {
      this.$store.commit('SHOW_LOADER')
      setTimeout(_ => {
        this.$edQuery({
          request: {
            method: 'flySingle',
            parameters: [this.mission.fileName, 'username']
          },
          success: (unknown) => {
            this.$router.push({ name: 'debrief', params: { level: 'child' } })
          }
        })
      }, 800)
    },
    startBriefing () {
      this.$router.push({ name: 'briefing' })
    }
  }
}
</script>
<style lang="sass" scoped>
  .maps
    display: flex
    width: 75%
    height: 100%
    &__icon__name
      font-size: 1.2rem
      color: $blue
      text-transform: uppercase
      height: 20%
      width: 100%
      text-align: center
      @include make-font('Roboto Condensed', regular)
    &__map
      width: 25%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      height: 100%
      flex-wrap: wrap
      &--locked
        color: rgba(255, 255, 255, .35)
        & .maps__icon
          stroke: rgba(255, 255, 255, .35)
          stroke-width: 2px
        & .maps__icon__name
          color: rgba(255, 255, 255, .35)
        &:hover
          color: rgba(255, 255, 255, .75)!important
          & .maps__icon
            stroke: rgba(255, 255, 255, .75)!important
          & .maps__icon__name
            color: rgba(255, 255, 255, .75)!important
      &:hover
        color: $orange
        & .maps__icon
          stroke: $orange
        & .maps__icon__name
          color: $orange
    &__icon
      fill: transparent!important
      stroke: $blue
      height: 100%
      width: 100%
      position: absolute
      transition: stroke .5s
      &-wrapper
        position: relative
        height: 80%
        width: 100%
      &.caucasus
        width: 70%
        margin-left: 15%
      &.islands
        width: 30%
        margin-left: 35%
      &.las-vegas
        width: 30%
        margin-left: 35%
      &.nevada
        width: 30%
        margin-left: 35%
      &.persian-gulf
        width: 50%
        margin-left: 25%
  .grid
    width: 100%
    &-wrapper
      position: relative
      z-index: 2
      overflow: hidden
      overflow-y: scroll
      height: calc( 100% - 68px )
    &__line-bottom
      background: linear-gradient(to left, rgba(255, 255, 255, 0.01) 10%, rgba(255, 255, 255, 0.1) 77%, rgba(255, 255, 255, 0.1) 100%)
      height: 5px
    & tr
      color: $blue
      transition: background .5s
      &:hover
        background: rgba(255, 255, 255, .05)
      &.selected
        color: $orange
        background: rgba(255, 255, 255, .05)
    & th
      padding: .5rem .5rem
      text-transform: uppercase
      font-size: .7rem
      font-weight: 300
      color: #ffffff
      opacity: .35
      text-align: left
      &:first-child
        width: 60%
        padding-left: 1vw
      &:nth-child(2)
        width: 20%
    & td
      padding: .6rem .5rem
      font-size: .8rem
      &:first-child
        font-size: 1rem
        width: 60%
      &:nth-child(2)
        width: 20%
    &__row
      &--filters
        border-top: 1px solid rgba(255, 255, 255, .35)
        border-bottom: 1px solid rgba(255, 255, 255, .35)
        background: rgba(0, 0, 0, .1)
        & .input-wrapper
          width: 70%
    &__cell
      &--name
        span:first-child
          margin-right: .5vw
          margin-left: 1vw
      &--score
        padding-left: .8rem!important
        & span
          margin-left: 10px
  .icon-shield
    fill: none
    stroke: $blue
    width: 1vw
    height: 1vw
    &--grey
      stroke: rgba(255, 255, 255, .5)
      fill: none!important
      width: .8vw
      height: .8vw
  .cell-wrapper
    display: flex
    align-items: center
    position: relative
  .dot
    color: #ffffff
    font-size: .8rem
    position: absolute
    left: -1.8vw
  .grid-header
    margin-top: 2%
    height: 68px
  .mission-desc
    margin-top: 15px
    height: 100%
    & h3
      height: 35px
      margin-top: 5px
      text-transform: uppercase
      font-weight: 300
      font-size: 1.8rem
      margin: 0
      opacity: .35
      border-bottom: .5px solid #fff
      margin-bottom: 1rem
    & .mission-description-wrapper
      position: relative
      overflow-y: scroll
      height: calc( 100% - 55px )
      & p
        margin: 0
        opacity: .79
        font-size: .8rem
  .button
    display: flex
    align-items: center
    justify-content: center
    text-transform: uppercase
    letter-spacing: 1px
    color: $blue
    transition: all .5s
    cursor: pointer
    &-wrapper
      width: 55%
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
    &--fly
      background: $dark-blue
      height: 50px
      font-size: 2.5rem
      @include make-font('Roboto Condensed', bold)
      &:hover
        opacity: .75
        color: #ffffff
    &--brief
      margin-top: 20px
      height: 35px
      border: 1px solid $blue
      font-size: 1rem
      &:hover
        color: #ffffff
        border: 1px solid #ffffff
  #vehicles-carousel
    margin-top: -70px
  .vehicles
    width: 100%
    height: 100px
    margin-bottom: 10px
  .row-absolute-bottom
    position: relative
    margin-bottom: 0
    width: 100%
  @media (max-aspect-ratio: 16/9)
    .grid-wrapper
      //height: 100%
</style>
