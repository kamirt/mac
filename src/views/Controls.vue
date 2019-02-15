<template lang="pug">
  div(class="row controls-wrapper")
    div(class="col-4")
      h1 {{ $content.globals.controls }}
      div(class="row align-center router-back", @click="fullBack")
        div(class="col-4")
          div
            svg-icon(name="back_arrow")
        div(class="col-4 space-no-wrap")
          h2 {{ $content.globals.special_options }}
    div(class="col-12 column")
      div(class="vehicles-wrapper")
        vehicle-menu(vertical, @onselect="onVehicleSelect")
      div(class="relative")
        div(class="controls-table-wrapper", style="z-index: 10")
          table(class="grid", cellspacing="0", cellpadding="0")
            tr(class="grid__row")
              td(v-for="(item, index) in headers",
                :key="item",
                :data-index="index",
                class="grid__cell grid__cell--headers",
                @mouseenter="onCellEnter") {{ item }}
            tr(class="grid__row grid__row--filters")
              td(class="grid__cell grid__cell--filters",
              @mouseenter="onCellEnter",
              data-index="0")
                input-select(:items="state.presets", @selectItem="onSelectPreset")
              td(class="grid__cell grid__cell--filters",
              @mouseenter="onCellEnter",
              data-index="1")
                input-select(:items="state.category", @selectItem="onSelectCategory", empty="All")
              td(class="grid__cell grid__cell--filters", v-for="conf in headers.slice(2)")
          div(class="grid-wrapper")
            div(class="grid-wrapper__scroll")
              table(class="grid", cellspacing="0", cellpadding="0")
                tr(v-for="row in filteredConfig" :key="row['action set']")
                  td(v-for="(val, key, index) in row",
                    :key="key",
                    :data-index="index",
                    :class="{'grid__cell--editable': key !== 'category' && key !== 'action set'}",
                    class="grid__cell",
                    @mouseenter="(e) => onCellEnter(e, key, val)",
                    @click="(e) => onCellClick(e, key, val, index, row)")
                    div(class="grid__cell__inner")
                      span {{ getValue(key, val) }}
                        ul(class="cell-menu",
                           v-if=`row['action set'] === editingRow['action set'] &&
                             parseInt(index) === parseInt(editingCell.dataset.index)`)
                          li Add
                          li Reset to default
                          li Clear
</template>

<script>
import inputSelect from '@/components/input/inputSelect'
import vehicleMenu from '@/components/menus/vehicleMenu'
export default {
  name: 'controls',
  components: {
    inputSelect,
    vehicleMenu
  },
  computed: {
    headers () {
      return this.state.config.length ? Object.keys(this.state.config[0]) : []
    },
    state () {
      return this.$store.state.controls
    }
  },
  data () {
    return {
      filteredConfig: [],
      editingCell: {},
      editingRow: {}
    }
  },
  created () {
    this.$edQuery({
      request: {
        method: 'getControls'
      },
      success: (e) => {
        this.$store.commit('SET_CONFIG', e)
      },
      failure (error) {
        console.log(error.message)
      }
    })
    this.$edQuery({
      request: {
        method: 'getControlsCategories'
      },
      success: (e) => {
        this.$store.commit('SET_CATEGORIES', e)
      },
      failure (error) {
        console.log(error.message)
      }
    })
  },
  methods: {
    getValue (key, val) {
      if (!val) return ''
      if (key === 'category') {
        let res = this.state[key].filter(el => el.id === val)[0]
        return res && res.name
      }
      if (key === 'action set') return val
      return this.state[key] ? this.state[key].filter(el => el.code === val)[0].key : 'none'
    },
    onCellEnter (e, device, keycode) {
      this.editingRow = {}
      const hoveredClass = 'grid__cell--hovered'
      const highlightedClass = 'highlighted'
      const el = e.target
      const row = el.parentNode
      const cells = this.$el.querySelectorAll(`[data-index="${el.dataset.index}"]`)
      const prevSelected = this.$el.querySelectorAll(`.${hoveredClass}`)
      const prevCells = this.$el.querySelectorAll(`.${highlightedClass}`)
      if (prevCells) this.$utils.removeClass(prevCells, highlightedClass)
      if (prevSelected) this.$utils.removeClass(prevSelected, hoveredClass)
      this.$utils.addClass(el, hoveredClass)
      this.$utils.addClass(cells, highlightedClass)
      this.$utils.addClass(row.querySelectorAll('.grid__cell'), highlightedClass)
      if (this.$utils.hasClass(el, 'grid__cell--editable')) this.makeEditable(el.firstChild, device, keycode)
    },
    onCellClick (event, device, keycode, column, row) {
      // first two columns uneditable
      if (column < 2) return
      if (!keycode) {
        let action = row['action set']
        this.addNewAssoc(device, action, event, column)
        return
      }
      this.openCellMenu(device, row, column, keycode, event)
    },
    makeEditable (cell, device, keycode) {
      let prevEditable = this.$el.querySelectorAll('.editable')
      let prevAdded = this.$el.querySelectorAll('.added')
      this.$utils.removeClass(prevEditable, 'editable')
      this.$utils.removeClass(prevAdded, 'added')
      keycode
        ? this.$utils.addClass(cell, 'editable')
        : this.$utils.addClass(cell, 'added')
    },
    onSelectPreset (e) {
      this.$store.dispatch('GET_PRESET', e.id)
    },
    onSelectCategory (e) {
      let filtered = this.$store.getters.getConfigByCategory(e.id)
      if (!filtered.length) {
        this.filteredConfig = [filtered]
        return
      }
      this.filteredConfig = filtered
    },
    openCellMenu (device, row, column, keycode, event) {
      event.target.hasAttribute('data-index')
        ? this.editingCell = event.target
        : this.editingCell = event.target.parentNode
      this.editingRow = row
      console.log(this.editingRow)
    },
    addNewAssoc (device, action, event, column) {
      console.log('add new association with: "' + device + '", action is: "' + action + '"')
    },
    onVehicleSelect (e, e2) {
      console.log(e, e2)
    },
    fullBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="sass">
  .controls-wrapper
    height: 100%
  .vehicles-wrapper
    margin-top: 50px
    margin-bottom: 40px
  .column
    display: flex
    flex-direction: column
  .relative
    position: relative
    height: 100%
  .controls-table-wrapper
    width: calc( 100% - 20px )
    position: relative
    top: 0
    height: 100%
    overflow-x: scroll
    overflow-y: hidden
    &::-webkit-scrollbar
      box-shadow: none
      -webkit-box-shadow: none
      width: 6px
      height: 6px
      bottom: 6px
    &::-webkit-scrollbar-track
      background: rgba(255, 255, 255, 0.05)
    &::-webkit-scrollbar-thumb
      background: rgba(255, 255, 255, 0.15)
    &::-webkit-scrollbar-thumb:hover
      background: rgba(255, 255, 255, 0.35)
  .grid
    @include make-font('Roboto', 300)
    &-wrapper
      height: 100%
      position: relative
      &__scroll
        position: absolute
        overflow-x: visible
        overflow-y: scroll
        height: 100%
        &::-webkit-scrollbar
          position: fixed
          right: 0
          z-index: 5
          box-shadow: none
          -webkit-box-shadow: none
          width: 6px
          height: 6px
          bottom: 6px
        &::-webkit-scrollbar-track
          background: rgba(255, 255, 255, 0.05)
        &::-webkit-scrollbar-thumb
          background: rgba(255, 255, 255, 0.15)
        &::-webkit-scrollbar-thumb:hover
          background: rgba(255, 255, 255, 0.35)
    &__cell
      min-width: calcsize(200)
      font-size: calcsize(14)
      color: #ffffff
      padding: calcsize(10) 5px
      transition: background .2s
      &--filters
        background: rgba(0, 0, 0, .1)
        border: 1px solid rgba(126, 230, 255, .35)
        border-right: none
        border-left: none
        font-size: calcsize(18)
      &__inner
        display: flex
        justify-content: space-between
        align-items: center
        position: relative
        & span
          display: block
      &:first-child
        min-width: calcsize(300)
      &--hovered
        background: #2F6186
      &--editable
        color: $blue
      &--headers
        text-transform: uppercase
        font-size: calcsize(12)
        color: rgba(126, 230, 255, 0.35)
  .highlighted:not(.grid__cell--hovered)
    background: rgba(255, 255, 255, .15)
  .editable
    position: relative
    &:after
      content: "..."
      position: relative
      font-size: calcsize(18)
      right: calcsize(5)
      line-height: 0
      margin-top: calcsize(-9)
  .added
    position: relative
    &:after
      content: "+"
      position: relative
      font-size: calcsize(18)
      line-height: 0
  .cell-menu
    position: absolute
    margin: 0
    background: #2F6186
    width: calc( 100% + 10px )
    top: 100%
    margin-left: -5px
    z-index: 10
    & li
      padding: 5px
      text-align: right
      &:last-child
        margin-top: calcsize(20)
        padding: 10px 5px 10px 10px
      &:hover
        background: #3a78a8
  .svg-icon--back_arrow
    width: 50%
    height: 10px
    cursor: pointer
    stroke: $blue
</style>
