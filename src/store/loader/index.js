export default {
  state: {
    showLoader: false
  },
  mutations: {
    SHOW_LOADER (state) {
      state.showLoader = true
    },
    HIDE_LOADER (state) {
      state.showLoader = false
    }
  }
}
