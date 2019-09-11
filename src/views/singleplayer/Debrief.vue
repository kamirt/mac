<template lang="pug">
  div(class="wrapper")
    div(class="row")
      div(class="col-12 offset-4")
        div(v-for="(param, name) in params")
          span {{ name }} - {{ param }}
</template>
<script>
export default {
  data () {
    return {
      params: []
    }
  },
  mounted () {
    let params = this.$route.query
    this.params = params
  }
}
</script>
<style lang="sass" scoped>
  span
    font-size: 2rem
</style>
