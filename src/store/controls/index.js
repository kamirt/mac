export default {
  state: {
    config: [],
    category: [],
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
    ]
  },
  mutations: {
    CHANGE_PRESET (state, payload) {
      console.log('setting new preset...')
      if (payload) {
        state.config = payload
      }
    },
    SET_CONFIG (state, payload) {
      state.config = payload // <config> array
    },
    SET_CATEGORIES (state, payload) {
      state.category = payload // <categories> array
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
