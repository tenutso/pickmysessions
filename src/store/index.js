import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    currentRoundtable: {}
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    setRoundtable(state, roundtable) {
      state.currentRoundtable = roundtable
    }
  },
  getters: {

  },
  actions: {
    init ({commit, state}) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('SET_USER', user)
        }
        else {
          commit('SET_USER', null)
        }
      })
    },
    async login({dispatch, state}, credentials) {
      try {
        await dispatch('init')
        const result = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        console.log('Performed Login: ', result)
      } catch (error) {
          console.log(error)
          state.error = error
      }
    }
  }
})
