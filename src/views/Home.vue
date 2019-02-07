<template lang="pug">
  div(class="home")
    news-block(:news="news", class="home-news-block")
</template>

<script>
import newsBlock from '@/components/news/newsBlock'
export default {
  name: 'home',
  components: {
    newsBlock
  },
  computed: {
    news () {
      return this.$store.state.news
    }
  },
  mounted () {
    // just test
    this.$edQuery({
      request: {
        method: 'getMaps'
      },
      success (e) {
        // console.log(e)
      },
      failure (e) {
        // console.log(e.message)
      },
      persistent: true
    })
  }

}
</script>

<style lang="sass">
  .home
    height: 100%
    width: 100%
    position: relative
    &-news-block
      position: absolute
      right: calcsize(-75)
      top: 30%
      width: 24.075vw
      height: 12.037vw
</style>
