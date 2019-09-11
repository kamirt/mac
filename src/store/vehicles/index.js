export default {
  state: {
    vehicles: [],
    selected: null
  },
  mutations: {
    SET_VEHICLES (state, payload) {
      state.selected = payload.selected // <id> number
      state.vehicles = payload // <array> objects
    }
  }
}
