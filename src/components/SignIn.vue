<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" prepend-icon="person" label="Email" type="email"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onSubmit" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db, firebase } from '@/firebaseConfig.js'
import { isUndefined } from 'util';
export default {
  name: 'SignIn',
  data: function() {
    return {
      valid: false,
      drawer: null,
      email: '',
      password: ''
    }
  },
  props: {
      source: String
  },
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // alert('You are already logged in')
        //this.$router.push('/admin')
        //console.log(user)
      }
    })
  },
  methods: {
    onSubmit: async function (evt) {
      console.log(this.password)
      evt.preventDefault()
      try {
        const user = await this.$store.dispatch('login', {email: this.email, password: this.password})
        // const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        // this.$store.state.currentUser = user.user
        // this.$router.go({path: this.$router.path})
        if (!isUndefined(this.$route.query.redirect)) {
          this.$router.replace(this.$route.query.redirect)
        } else {
          this.$router.replace('/admin')
        }
      } catch (error) {
        // Handle Errors here.
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      }
    }
  }
}
</script>

<style scoped>
:root {
  --input-padding-x: .75rem;
  --input-padding-y: .75rem;
}

html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
