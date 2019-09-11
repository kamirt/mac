<template lang="pug">
  div(class="tooltip", @mouseenter="handleEnter", @mouseleave="handleLeave")
    slot
</template>
<script>
export default {
  name: 'tooltip',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tooltipEl: null
    }
  },
  methods: {
    handleEnter (e) {
      let bounds = this.$el.firstChild.getBoundingClientRect()
      this.tooltipEl = document.createElement('div')
      this.tooltipEl.className = 'tooltip__content'

      let leftPos = window.innerWidth - e.clientX >= 400
      let width = this.$el.firstChild.clientWidth * 2
      let style = {
        color: '#fff',
        'font-size': '.7rem',
        background: 'rgba(0, 0, 0, .5)',
        position: 'fixed',
        left: `${bounds.left}px`,
        opacity: 0,
        transition: 'opacity .3s',
        width: `${width}px`,
        'z-index': 20,
        padding: '5px',
        'border-radius': '3px'
      }
      style = Object.keys(style).map(el => `${el}: ${style[el]}; `).join('')
      this.tooltipEl.style = style
      document.body.appendChild(this.tooltipEl)
      setTimeout(() => {
        this.tooltipEl.innerHTML = this.content
        this.tooltipEl.style.top = `${bounds.top - (this.tooltipEl.clientHeight + 10)}px`,
        this.$utils.addClass(this.tooltipEl, 'tooltip--visible')
      }, 200)
    },
    handleLeave () {
      // this.tooltipEl.remove()
      let tooltips = document.body.querySelectorAll('.tooltip__content')
      if (tooltips.length) {
        tooltips.forEach(el => {
          el.remove()
        })
      }
    }
  }
}
</script>
<style lang="sass">
  .tooltip
    width: 100%
    height: 100%
  .tooltip--visible
    opacity: 1!important
</style>
