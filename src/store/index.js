import Vue from 'vue'
import Vuex from 'vuex'

import { firebase, db } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    expertEditMode: null,
    roundtableRef: null,
    cart: [],
    cartCount: 0
  },
  mutations: {
    addToCart(state, payload) {
      let cart = payload
      payload.id = payload.id
      state.cart.push(payload)
      state.cartCount = state.cart.length
    },
    setExpertEditMode(state, payload) {
      state.expertEditMode = payload
    },
    SET_USER(state, payload) {
      state.user = payload
      console.log('SET_USER Says: ', payload)
      state.roundtableRef = db
      .collection("users")
      .doc(payload.uid)
      .collection("roundtables")
    }
  },
  getters: {
    roundtable:  (state) => async (id) => {
      const snapshot = await state.roundtableRef.doc(id).get()
      return snapshot.docs.map(doc => doc.data())
    }
  },
  actions: {
    async login({commit, state}, credentials) {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      } catch (error) {
          console.log(error)
          state.error = error
      }
    },
    async uploadImage({state}, payload) {
      const ext = payload.image.name.slice(payload.image.name.lastIndexOf('.'))
      let fileData = await firebase.storage().ref(
        state.user.uid +
        '/roundtables/' +
        '/' + payload.roundtableId +
        '/' + payload.expertId +
        '.' + ext).put(payload.image)
      const imageUrl = await fileData.ref.getDownloadURL()
      state.roundtableRef
      .doc(payload.roundtableId)
      .collection('experts')
      .doc(payload.expertId)
      .update({image: imageUrl})
    }
  }
})
