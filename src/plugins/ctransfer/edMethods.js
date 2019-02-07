export default {
  getMaps () {
    return [
      {
        name: 'map1'
      },
      {
        name: 'map2'
      }
    ]
  },
  getAircraft () {
    return [
      {
        name: 'aircraft1'
      },
      {
        name: 'aircraft2'
      }
    ]
  },
  startMission (aircraftId, missionId) {
    return { success: true }
  },
  getVehicleList () {
    return {
      data: {
        selected: 1,
        vehicles: [
          {
            id: 1,
            name: 'A-10A',
            image: require('@/assets/img/temp/A-10A_corona_v3.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 2,
            name: 'A-10A',
            image: require('@/assets/img/temp/F_5E.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 3,
            name: 'A-10A',
            image: require('@/assets/img/temp/A-10A_corona_v3.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 4,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_27C.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 5,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_33.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 6,
            name: 'A-10A',
            image: require('@/assets/img/temp/A-10A_corona_v3.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 7,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_27C.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 8,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_33.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          }
        ]
      }
    }
  }
}
