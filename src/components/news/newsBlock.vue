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

<style lang="sass" scoped>
  .news-block
    &__content
      display: flex
      height: 100%
    &__overlay
      position: absolute
      width: 100%
      height: 100%
      content: ''
      background-size: 3.5%
      opacity: .7
      z-index: 0
      &:before
        content: ''
        background-image: url('../../assets/img/backgrounds/news_frame.svg')
        opacity: .35
        background-repeat: no-repeat
        background-size: 100%
        position: absolute
        width: 100%
        height: 100%
    &__date
      @include make-font('Roboto Condensed', 100)
      color: $orange
      padding: 15px
    &__text
      font-size: 1rem
      font-weight: 300
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
    cursor: pointer
    display: block
    position: absolute
    width: 13px
    height: 13px
    right: 0
    top: 0
    opacity: .35
    transition: opacity .2s
    z-index: 3
    &:hover
      opacity: 1
    & svg
      width: 100%
      height: 100%
  .svg-icon--news_hide
    fill: $blue!important
  @media screen and (min-width: 1250px) and (max-width: 1600px)
    .news-block__text
      font-size: 1rem
</style>
