const selectRandom = (variants) => {
  if (Array.isArray(variants)) {
    return variants[Math.floor(Math.random() * variants.length)]
  }
  return variants[Object.keys(variants)[Math.floor(Math.random() * Object.keys(variants).length)]]
}
const getNodes = (state, theatre) => {
  return [{
    id: 1,
    latitude: 12.34,
    longitude: 23.54
  }]
}
const getOnlyTask = (node) => {
  return new Promise((resolve) => {
    let state = node.$store.state.generator
    let task = node.selectedTask
    let tasks = state.info.tasks
    if (task.OldID === 'random') {
      if (tasks.length) {
        console.log('task random but have choise')
        resolve(selectRandom(state.info.tasks))
      } else {
        console.log('task random and does not list')
        node.$edQuery({
          request: {
            method: 'getGenTasks',
            parameters: node.vehicle.id
          },
          success: (res) => {
            resolve(res.filter((el) => { return el.OldID === 'Intercept' })[0])
            // resolve(selectRandom(res))
          }
        })
      }
    } else {
      console.log('task selected')
      resolve(task)
    }
  })
}
const getTask = (node) => {
  return getOnlyTask(node).then((task) => {
    return new Promise((resolve) => {
      console.log('TASK', task)
      let params = node.selectedInterceptParams
      let state = node.$store.state.generator.info
      let obj = {
        task: task
      }
      if (task.OldID !== 'Intercept') {
        resolve(obj)
      }
      obj.altitude = params.altitude
        ? params.altitude
        : selectRandom([ { value: 1000 }, { value: 5000 }, { value: 10000 } ])
      obj.distance = params.distance
        ? params.distance
        : selectRandom([ { value: 10 }, { value: 50 }, { value: 100 } ])

      if (!params.typeAttack && !state.interceptParams.typeAttack) {
        node.$edQuery({
          request: {
            method: 'getGenTypeAttack'
          },
          success: (res) => {
            resolve({
              typeAttack: selectRandom(res),
              ...obj
            })
          }
        })
      } else {
        resolve({
          typeAttack: selectRandom(state.interceptParams.typeAttack),
          ...obj
        })
      }
    })
  })
}
const getPylons = (state) => {
  return new Promise((resolve) => {
    resolve({})
  })
}
const getCountry = (state) => {
  return {}
}
const getSkin = (state) => {
  return {}
}
const getSeason = (state) => {
  return {}
}
const getWeather = (state) => {
  return {}
}
const getPlace = (state) => {
  return {}
}
const getStartTime = (state) => {
  return {}
}
const getWingmen = (state) => {
  return {}
}
const getSkill = (state) => {
  return {}
}
const getForces = (state) => {
  return {}
}
const generate = (node) => {
  return new Promise((resolve) => {
    const state = node.$store.state.generator
    const maps = node.$store.state.maps.availableMaps
    let objToSend = {
      aircraft: null,
      theatreOfWar: null,
      nodesIds: [],
      countryId: null,
      wingmansCount: null,
      difficulty: null,
      takeoffFrom: null, // place
      taskOldID: null,
      playerAltitude: null, // for Intercept task
      nodeDistance: null, // for Intercept task
      typeAttack: null, // for Intercept task
      pylons: [],
      livery_id: null,
      wingmenDifficulty: null,
      season: null,
      weather: null,
      startTime: null,
      forces: null
    }
    const propNames = {
      aircraft: 'id',
      task: 'OldID',
      // pylons - array
      theatre: 'name',
      nodes: 'id',
      country: 'OldID',
      skin: 'id',
      season: 'id',
      weather: 'id',
      place: 'pointType',
      time: 'id', // but commit number
      skill: 'id',
      wingmen: 'id'
    }
    // aircraft
    let aircraft = state.selectedVehicle
    // theatre
    let theatre = state.selectedLocation[propNames.theatre] === 'random'
      ? selectRandom(maps)
      : state.selectedLocation
    // intercept task params
    Promise.all([
      getTask(node),
      getPylons(node),
      getNodes(node, theatre),
      getCountry(node),
      getSkin(node),
      getSeason(node),
      getWeather(node),
      getPlace(node),
      getStartTime(node),
      getWingmen(node),
      getSkill(node),
      getForces(node)
    ]).then(([ task, pylons, nodes, country, skin, season,
      weather, startFrom, time, wingmen, skill, forces ]) => {
      console.log('COMPLETE', task, pylons, nodes, country, skin, season,
        weather, startFrom, time, wingmen, skill, forces)
      // collect all together
      objToSend.aircraft = aircraft[propNames.aircraft]
      objToSend.taskOldID = task.task[propNames.task]
      objToSend.theatreOfWar = theatre[propNames.theatre]
      objToSend.wingmansCount = wingmen[propNames.wingmen]
      if (task.task[propNames.task] === 'Intercept') {
        objToSend.playerAltitude = task.altitude
        objToSend.nodeDistance = task.distance
        objToSend.typeAttack = task.typeAttack
      }
      objToSend.pylons = pylons
      objToSend.countryId = country[propNames.country]
      objToSend.livery_id = skin[propNames.skin]
      objToSend.wingmenDifficulty = skill[propNames.skill]
      objToSend.season = season[propNames.season]
      objToSend.weather = weather[propNames.weather]
      objToSend.startTime = time
      objToSend.takeoffFrom = startFrom[propNames.place]
      objToSend.forces = forces
      objToSend.nodesIds = nodes
      // !!!!! difficulty is not present in interface so it === null
      resolve(objToSend)
    })
  })

  // // pylons
  // let pylons = state.selectedProfile === 'random'
  //   ? selectRandom(state.info.weaponInfo)
  //   : getPylons(state)
  // // nodes
  // let nodes = state.selectedMapPoint[propNames.nodes] === 'random'
  //   ? getNodes(theatre)
  //   : state.selectedMapPoint
  // // country
  // let country = state.selectedCountry[propNames.country] === 'random'
  //   ? getCountry(state)
  //   : state.selectedCountry
  // // skin
  // let skin = state.selectedSkin[propNames.skin] === 'random'
  //   ? getSkin(state)
  //   : state.selectedSkin
  // // season
  // let season = state.selectedSeason[propNames.season] === 'random'
  //   ? getSeason(state)
  //   : state.selectedSeason
  // // weather
  // let weather = state.selectedWeather[propNames.weather] === 'random'
  //   ? getWeather(state)
  //   : state.selectedWeather
  // let startFrom = state.selectedPlace[propNames.place] === 'random'
  //   ? getPlace(state)
  //   : state.selectedPlace
  // let time = state.selectedStartTime[propNames.time] === 'random'
  //   ? getStartTime(state)
  //   : state.selectedStartTime
  // let wingmen = state.selectedPlace[propNames.wingmen] === 'random'
  //   ? getWingmen(state)
  //   : state.selectedWingmen
  // let skill = state.selectedSkill[propNames.skill] === 'random'
  //   ? getSkill(state)
  //   : state.selectedSkill
  // let forces = getForces(state)
}

async function generateIt (v) {
  let result = await generate(v)
  return result
}

export default generateIt
