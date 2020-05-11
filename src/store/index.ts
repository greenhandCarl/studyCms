import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTeacher: {}
  },
  mutations: {
    setTeacher (state, payload) {
      state.currentTeacher = payload.row
    }
  },
  actions: {
  },
  modules: {
  }
})
