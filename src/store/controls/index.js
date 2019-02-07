export default {
  state: {
    presets: [
      {
        name: 'A-10A Thunderbolt',
        id: 1
      },
      {
        name: 'Some another Thunderbolt',
        id: 2
      }
    ],
    config: [
      {
        'action set': 'Absolute Camera Vertical View',
        'category': 1,
        'keyboard': 3,
        'saitek pro-flight 1': 2,
        'saitek pro-flight 2': null,
        'mouse': null,
        'mouse2': 1
      },
      {
        'action set': 'Camera Zoom View',
        'category': 2,
        'keyboard': 8,
        'saitek pro-flight 1': 1,
        'saitek pro-flight 2': null,
        'mouse': null,
        'mouse2': 1
      },
      {
        'action set': 'Radar View1',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      },
      {
        'action set': 'Radar View2',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      },
      {
        'action set': 'Radar View3',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      },
      {
        'action set': 'Radar View4',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      },
      {
        'action set': 'Radar View5',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      },
      {
        'action set': 'Radar View',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      },
      {
        'action set': 'Radar View6',
        'category': 3,
        'keyboard': 13,
        'saitek pro-flight 1': 6,
        'saitek pro-flight 2': null,
        'mouse': 4,
        'mouse2': 1
      }
    ],
    category: [
      {
        name: 'Environment System',
        id: 1
      },
      {
        name: 'Flight Control',
        id: 2
      },
      {
        name: 'Targeting',
        id: 3
      }
    ],
    keyboard: [
      {
        key: 'Enter',
        code: 13
      },
      {
        key: 'Z',
        code: 8
      },
      {
        key: 'X',
        code: 3
      }
    ],
    'saitek pro-flight 1': [
      {
        key: 'Left',
        code: 2
      },
      {
        key: 'Up',
        code: 1
      },
      {
        key: 'Right',
        code: 6
      }
    ],
    'saitek pro-flight 2': [
      {
        key: 'Left',
        code: 2
      },
      {
        key: 'Up',
        code: 1
      },
      {
        key: 'Right',
        code: 6
      }
    ],
    'mouse': [
      {
        key: 'LClick',
        code: 1
      },
      {
        key: 'RClick',
        code: 2
      },
      {
        key: 'Dbl RClick',
        code: 3
      },
      {
        key: 'Dbl LClick',
        code: 4
      }
    ],
    'mouse2': [
      {
        key: 'LClick',
        code: 1
      },
      {
        key: 'RClick',
        code: 2
      },
      {
        key: 'Dbl RClick',
        code: 3
      },
      {
        key: 'Dbl LClick',
        code: 4
      }
    ]
  },
  mutations: {
    CHANGE_PRESET (state, payload) {
      console.log('setting new preset...')
      if (payload) {
        state.config = payload
      }
    }
  },
  actions: {
    GET_PRESET ({ commit }, id) {
      // ask for preset with the given ID
      commit('CHANGE_PRESET', false)
    }
  },
  getters: {
    getConfigByCategory: state => id => {
      if (!id) return state.config
      let filtered = state.config.filter(el => el.category === id)
      if (!filtered) return state.config
      return filtered
    }
  }
}
