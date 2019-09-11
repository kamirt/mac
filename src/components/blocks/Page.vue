<template lang="pug">
  div(class="row")
    div(class="col-4 left-aside")
      div(class="headers")
        div(ref="header", class="headers__header", :class="{ 'headers__header--small': isChild }")
          h1 {{ header }}
        div(ref="subheader", class="headers__subheader", :class="{ 'headers__subheader--visible': isChild }")
          h2 {{ subheader }}
      div(class="align-center router-back", @click="fullBack")
        svg-icon(name="back_arrow")
    div(class="wrapper" id="wrapper")
      transition(name="fade")
        router-view
</template>
<script>
export default {
  data () {
    return {
      isChild: false,
      header: '',
      subheader: ''
    }
  },
  created () {
    this.setHeaders(this.$route)
  },
  methods: {
    fullBack () {
      this.$router.back()
    },
    getLocalized (name) {
      let path = name.split('.')
      let prev = ''
      path.forEach((el) => {
        prev = prev ? prev[el] : this.$content[el]
      })
      return prev
    },
    setHeaders (to) {
      console.log('change headers', to)
      if (to.meta && to.meta.header) {
        this.header = this.getLocalized(to.meta.header)
      } else {
        this.header = ''
      }
      if (to.meta && to.meta.subheader) {
        this.subheader = this.getLocalized(to.meta.subheader)
        requestAnimationFrame(() => {
          this.isChild = true
        })
      } else {
        this.subheader = ''
        requestAnimationFrame(() => {
          this.isChild = false
        })
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.setHeaders(to)
    return next()
  }
}
</script>
<style lang="sass" scoped>
  .left-aside
    position: relative
    z-index: 2
</style>
