import Vue from 'vue'
import Vuex from 'vuex'

import { firebase, db } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    expertEditMode: null,
    clientRef: null,
    cart: {},
    cartCount: 0
  },
  mutations: {
    addToCart(state, payload) {
      state.cart[payload.id] = payload
      state.cartCount = Object.keys(state.cart).length
    },
    removeCartItem(state, payload) {
      delete state.cart[payload]
      state.cartCount = Object.keys(state.cart).length
    },
    setExpertEditMode(state, payload) {
      state.expertEditMode = payload
    },
    SET_USER(state, payload) {
      state.user = payload
      console.log('SET_USER Says: ', payload)
      state.clientRef = db
      .collection("users")
      .doc(payload.uid)
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
    async uploadFile({state}, payload) {
      let fileData = await firebase.storage().ref(
        state.user.uid + '/imports/' + payload.name).put(payload)
      const fileUrl = await fileData.ref.getDownloadURL()
      return fileUrl
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
