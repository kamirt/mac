<template lang="pug">
  div(class="missions")
    p Missions
</template>

<script>

export default {
  name: 'missions',
  components: {
  },
  mounted () {
    console.log(this.$edQuery)
  }
}

</script>
<style lang="sass">
  .missions
    height: 100%
    background: url('../assets/img/backgrounds/home-back.png')
</style>
