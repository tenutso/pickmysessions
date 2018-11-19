<template>
<div>
  <div v-if="user">
    <div class="text-right">
    <img :src="user.photoURL" alt="avatar" style="width: 30px; height: 30px; border-radius: 50%;">
    <b-btn @click="signOut">Sign Out</b-btn>
    </div>
  </div>
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
      this.$router.push('/admin/sign-in')
    }
  }
}
</script>

<style>

</style>
