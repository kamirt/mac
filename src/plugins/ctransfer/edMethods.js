import controlConfig from './warehouse/config.json'
import categories from './warehouse/confCategory.json'

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
  getControls () {
    return controlConfig
  },
  getControlsCategories () {
    return categories
  },
  getVehicleList () {
    return {
      data: {
        selected: 1,
        vehicles: [
          {
            id: 1,
            order: 1,
            name: 'A-10A',
            image: require('@/assets/img/temp/A-10A_corona_v3.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles. lalalalalallalala lalalalala lalalalala allalalalalal'
          },
          {
            id: 2,
            order: 2,
            name: 'A-10A',
            image: require('@/assets/img/temp/F_5E.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 3,
            order: 3,
            name: 'A-10A',
            image: require('@/assets/img/temp/A-10A_corona_v3.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 4,
            order: 4,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_27C.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 5,
            order: 5,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_33.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 6,
            order: 6,
            name: 'A-10A',
            image: require('@/assets/img/temp/A-10A_corona_v3.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 7,
            order: 7,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_27C.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          },
          {
            id: 8,
            order: 8,
            name: 'A-10A',
            image: require('@/assets/img/temp/SU_33.png'),
            description: 'Is intended for use against groud targets, but especially tanks and other armored vehicles.'
          }
        ]
      }
    }
  }
}
