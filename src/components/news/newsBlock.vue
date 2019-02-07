<template lang="pug">
  div(class="news-block")
    span(class="news-block__toggle", @click="toggleNews")
      svg-icon(name="news_hide")
    transition(@before-enter="beforeEnter",
      @enter="enter",
      @leave="leave",
      :css="false")
      div(v-if="show" class="news-block__content")
        div(v-if="show", class="news-block__overlay")
        div(class="news-block__date")
          p(class="date__day") {{ newsDay }}
          p(class="date__month") {{ newsMonth }}
        div(class="news-block__text")
          span {{ news.text }}
</template>

<script>
export default {
  name: 'news-block',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    newsDay () {
      return new Date(this.news.date).getDate()
    },
    newsMonth () {
      return this.$utils.monthList.en[new Date(this.news.date).getMonth()]
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    toggleNews () {
      this.show = !this.show
    },
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.transform = 'translateX("-100px")'
    },
    enter (el, done) {
      this.$anim(el, { translateX: '0px', opacity: 1 }, {
        complete: done
      })
    },
    leave (el, done) {
      this.$anim(el, { translateX: '100px', opacity: 0 }, {
        complete: done
      })
    }
  }
}
</script>

<style lang="sass">
  .news-block
    &__content
      display: flex
      height: 100%
    &__overlay
      position: absolute
      width: 100%
      height: 100%
      position: absolute
      content: ''
      width: 100%
      height: 100%
      background-image: url('../../assets/img/backgrounds/dot_grid_blue.svg')
      background-size: auto
      opacity: .7
      z-index: 0
      &:before
        content: ''
        position: absolute
        width: 10px
        height: 10px
        top: -1px
        left: -1px
        border-top: 1px solid
        border-left: 1px solid
        border-color: rgba(126, 230, 255, .5)
        border-radius: 4px 0 0 0
      &:after
        content: ''
        position: absolute
        width: 10px
        height: 10px
        bottom: -1px
        left: -1px
        border-bottom: 1px solid
        border-left: 1px solid
        border-color: rgba(126, 230, 255, .5)
        border-radius: 0 0 0 4px
    &__date
      @include make-font('Roboto Condensed', 100)
      color: $orange
      padding: 15px
    &__text
      font-size: .79vw
      color: $blue
      display: flex
      align-items: center
      padding-right: 30%
  .date
    &__day
      font-size: calcsize(60)
    &__month
      font-size: calcsize(32)
      margin-top: -10px
  .news-block__toggle
    display: block
    position: absolute
    width: 17px
    height: 17px
    right: 20px
    top: 17px
    opacity: .5
    transition: opacity .2s
    z-index: 3
    &:hover
      opacity: 1
    & svg
      width: 100%
      height: 100%
  .svg-icon--news_hide
    stroke: $blue
    fill: none!important
</style>
