<template>
  <div v-if="user">
    <v-img v-if="user.photoURL" :src="user.photoURL" alt="avatar" style="width: 30px; height: 30px; border-radius: 50%;"></v-img>
    <v-btn class="secondary" @click="signOut">Sign Out</v-btn>
  </div>
</template>

<script>
import { db, firebase } from '../firebaseConfig.js'
export default {
  name: 'SignIn',
  data: function () {
    return {
      user: null
    }
  },
  beforeCreate: async function () {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.user = user

      }
    })
  },
  methods: {
    signOut: async function () {
      await firebase.auth().signOut()
      this.user = null
      this.$store.state.currentUser = ''
      this.$router.replace('/admin/sign-in')
    }
  }
}
</script>

<style>

</style>
