export default {
  state: {
    missionList: []
  },
  mutations: {
    SET_MISSIONS (state, payload) {
      console.log(payload)
      state.missionList = payload
    }
  },
  getters: {
    getSingleTasks: state => vehicleId => {
      let tasks = {}
      if (state.missionList[vehicleId] !== undefined) {
        let missionsForVehicle = state.missionList[vehicleId].Single
        for (let i = 0; i < missionsForVehicle.length; i++) {
          tasks[missionsForVehicle[i].task] = i
        }
        return Object.keys(tasks).map(el => { return { name: el, id: tasks[el] } })
      }
      return []
    },
    getSingleMissions: state => vehicleId => {
      if (state.missionList[vehicleId] !== undefined) {
        return state.missionList[vehicleId].Single
      } return []
    },
    getMissionsByTask: (state, getters) => (vehicleId, task) => {
      let filtered = getters.getSingleMissions(vehicleId)
      if (task) {
        return filtered.filter(el => el.task === task)
      } return filtered
    }
  }
}
