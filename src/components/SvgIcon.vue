<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <slot></slot>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"/>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true
    },
    group: {
      type: String,
      default: 'common'
    }
  },
  data () {
    return {
      style: '',
      styleEl: {}
    }
  },
  computed: {
    iconPath () {
      return '#' + this.icon.id
    },
    icon () {
      return require(`@/assets/icons/${this.name}.svg`)
    },
    className () {
      return 'svg-icon svg-icon--' + this.name + ' svg-icon--' + this.group
    }
  }
}
</script>

<style lang="sass">
  .svg-icon
    fill: currentColor
</style>
