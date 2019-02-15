<template lang="pug">
  div(class="news-block")
    div(class="news-block__overlay")
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
  mounted () {

  }
}
</script>

<style lang="sass">
  .news-block
    display: flex
    &__overlay
      position: absolute
      width: 100%
      height: 100%
      position: absolute
      content: ''
      width: 100%
      height: 100%
      background-image: url('../../assets/icons/dot_grid_blue.svg')
      background-size: 17px 17px
      opacity: .7
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
      font-size: 14px
      color: $blue
      display: flex
      align-items: center
      margin-top: -20px
  .date
    &__day
      font-size: 60px
    &__month
      font-size: 32px
      margin-top: -10px

</style>
