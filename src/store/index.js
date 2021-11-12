import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import { Role } from '../enums'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    user (state) {
      return state.user
    },
    isClient (state) {
      return state.user.role === Role.Client
    },
    isProfessional (state) {
      return state.user.role === Role.Professional
    },
    isAdmin (state) {
      return state.user.role === Role.Admin
    }
  },
  mutations: {
    setUser (state, payload) {
      Object.assign(state.user, payload)
      localStorage.setItem('user', JSON.stringify(payload))
    }
  },
  actions: {
    retrieveUser (ctx) {
      let user
      if ((user = localStorage.getItem('user'))) {
        ctx.commit('setUser', JSON.parse(user))
      }
    }
  },
  modules: {
    auth: {
      namespaced: true,
      actions: {
        async login (ctx, {
          username,
          password
        }) {
          try {
            const response = await api.post('/login', {
              username,
              password
            })
            let user
            if ((user = response.data)) {
              ctx.commit('setUser', user, { root: true })
            }
            return Promise.resolve()
          } catch (err) {
            return Promise.reject(err)
          }
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
            role
          })
        }
      }
    }
  }
})
