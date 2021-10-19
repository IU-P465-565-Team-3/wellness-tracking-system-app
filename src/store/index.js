import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: {
      namespaced: true,
      actions: {
        async login (ctx, {
          username,
          password
        }) {
          return api.post('/login', {
            username,
            password
          })
        },
        async register (ctx, {
          firstName,
          lastName,
          dateOfBirth,
          username,
          password,
          gender,
          role
        }) {
          return api.post('/register', {
            firstName,
            lastName,
            dateOfBirth,
            username,
            password,
            gender,
            roleName: role
          })
        }
      }
    }
  }
})
