import Vue from 'vue'
import Vuex from 'vuex'
import { firebase, db } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    selectedRoundtable: null,
    selectedExpert: null,
    roundtableRef: null,
    expertEditMode: null
  },
  mutations: {
    setExpertEditMode(state, payload) {
      state.expertEditMode = payload
    },
    setSelectedRoundtable(state, payload) {
      state.selectedRoundtable = payload
    },
    setSelectedExpert(state, payload) {
      state.selectedExpert = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_ROUNDTABLE(state, payload) {
      state.roundtableRef = payload
    }
  },
  getters: {
    selectedRoundtable: state => {
      return state.selectedRoundtable
    }
  },
  actions: {
    async login({commit, state}, credentials) {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        commit('SET_USER', user)
        console.log('Login Page: ', user)
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
    },
    async uploadImage({state}, payload) {
      const ext = payload.name.slice(payload.name.lastIndexOf('.'))
      fileData = firebase.storage().ref(
        state.user.uid +
        '/roundtables/' +
        '/' + state.selectedRoundtable.id +
        '/' + state.selectedExpert.id +
        '.' + ext).put(payload)
      const imageUrl = await fileData.ref.getDownloadUrl()
      state.roundtableRef
      .doc(state.selectedRoundtable.id)
      .collection('experts')
      .doc(state.selectedExpert.id)
      .update({image: imageUrl})
    }
  }
})
