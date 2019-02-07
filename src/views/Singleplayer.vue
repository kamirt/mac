<template lang="pug">
  div(class="row singleplayer-wrapper")
    div(class="col-4")
      h1 {{ $content.main_menu.singleplayer }}
      div(class="row align-center router-back", @click="fullBack")
        div(class="col-4")
          div
            svg-icon(name="back_arrow")
    div(class="col-12")
</template>

<script>

export default {
  name: 'singleplayer',
  methods: {
    fullBack () {
      this.$router.back()
    }
  }
}

</script>
<style lang="sass">
  .content
    height: 100%
    .singleplayer-menu
      width: 69%
</style>
