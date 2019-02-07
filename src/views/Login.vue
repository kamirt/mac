<template lang="pug">
  div(class="login") login window
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  computed: {
    news () {
      return this.$store.state.news
    }
  }
}
</script>

<style lang="sass">
</style>
