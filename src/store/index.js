import Vue from 'vue'
import Vuex from 'vuex'
import { firebase, db } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    selectedRoundtable: null,
    roundtableRef: null
  },
  mutations: {
    selectedRoundtable(state, payload) {
      state.selectedRoundtable = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_ROUNDTABLE(state, payload) {
      state.roundtableRef = payload
    }
  },
  getters: {
    userState: state => {
      
      return state.user
    }
  },
  actions: {
    init ({commit, state}) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('SET_USER', user)
          console.log('init', user)
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
    },
    initFirestore({commit, state}) {
      const ref = db
      .collection("users")
      .doc(state.user.uid)
      .collection("roundtables")
      commit('SET_ROUNDTABLE', ref)
    }
  }
})
