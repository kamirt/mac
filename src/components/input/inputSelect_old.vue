<template lang="pug">
  div(class="input-select", @mouseleave="onMouseLeave")
    div(class="input-select__container" :class="{'with-arrow': empty}")
      input(:placeholder="$content.globals.search",
        class="input-select__selected",
        @click="onClick",
        @focus="listenKeyboard",
        @input="listenInput",
        @blur="onBlur",
        v-model="val")
      ul(ref="options",
         :class="{ 'is-blured': blured }",
         class="input-select__options",
         @mouseenter="onMouseEnter",
         @mouseleave="onMouseLeave")
        li(v-if="empty", data-optionid="false", @click="selectItem") {{ empty }}
        li(v-for="(option, key) in searched",
           :key="key"
           :data-optionid="option[optionId]",
           @click="selectItem") {{ option[name] }}
</template>

<script>
export default {
  name: 'input-select',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: () => 'name'
    },
    optionId: {
      type: String,
      default: () => 'id'
    },
    selectedIndex: {
      type: Number,
      default: () => 0
    },
    empty: {
      type: String
    },
    ignoreInput: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      selected: {},
      val: '',
      blured: true,
      hovered: false
    }
  },
  computed: {
    searched () {
      // function that filters the 'items' property
      // by each inputted word
      if (this.ignoreInput) {
        return this.items
      }
      if (!this.val.length || this.val === this.empty) {
        this.$emit('selectItem', false)
        return this.items
      }
      let filtered = this.items.filter((el) => {
        let elem = el[this.name].toLowerCase()
        let value = this.val.toLowerCase()
        let vals = value.split(' ')
        for (let i in vals) {
          if (vals[i] && elem.indexOf(vals[i]) >= 0) return true
        }
      })
      if (!filtered) return this.items
      return filtered
    }
  },
  mounted () {
    if (this.empty) {
      this.val = this.empty
      return
    }
    this.selected = this.items[this.selectedIndex]
    this.val = this.selected ? this.selected[this.name] : ''
  },
  methods: {
    onClick (e) {
      this.blured = false
      window.listenKeyboard = false
    },
    listenInput (e) {
      this.$emit('input', this.val)
    },
    onMouseLeave (e) {
      // hiding options list when container
      // is not in focus
      if (e.target.className === 'input-select__options') this.hovered = false
      setTimeout(() => {
        if (!this.hovered) this.blured = true
      }, 300)
    },
    onMouseEnter () {
      this.hovered = true
    },
    onBlur () {
      window.listenKeyboard = true
    },
    listenKeyboard () {
      // window.addEventListener('keydown', (e) => {
      //   if (e.key === 'ArrowDown') {
      //     this.$emit('')
      //   }
      // })
    },
    selectItem (e) {
      // finding selected value by data-key attribute
      this.selected = this.items.filter(el => {
        return el[this.optionId] == e.target.dataset.optionid
      })[0]
      if (!this.selected) {
        this.refreshValue()
        return
      }
      // hiding options list
      this.blured = true
      // setting value
      this.val = this.selected[this.name]
      // emitting event with selected data
      this.$emit('selectItem', this.selected)
    },
    refreshValue () {
      this.selected = { name: this.empty }
      this.blured = true
      this.val = this.selected[this.name]
      this.$emit('selectItem', this.selected)
    }
  }
}
</script>

<style lang="sass" scoped>
  .input-select
    position: relative
    outline: none
    font-size: calcsize(14)
    width: 100%
    &__container
      display: flex
      &.with-arrow:after
        content: ""
        border: none
        border-top: .3rem solid $blue
        border-left: .3rem solid transparent
        border-right: .3rem solid transparent
        top: calc( 50% - .15rem )
        right: 0
        position: absolute
    &__selected
      color: $orange
      background: transparent
      border: none
      font-size: inherit
      outline: none
      width: 100%
      position: relative
      z-index: 2
      &::placeholder
        opacity: 1
        color: rgba(255, 255, 255, .35)
        text-transform: uppercase
        font-size: .7rem
    &__search
      display: flex
      align-items: center
      height: 100%
      color: $blue
      position: absolute
      left: .3rem
    &__options
      transition: opacity .2s
      display: block
      position: absolute
      background: #2F6186
      width: calc( 100% + 10px )
      color: $orange
      margin: 0 -5px
      z-index: 4
      &.is-blured
        display: none
      & li
        padding: 5px
        &:hover
          background: #3a78a8
  .svg-icon-search
    width: .8rem!important
    height: .8rem
</style>
