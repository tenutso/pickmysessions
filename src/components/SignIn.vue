<template>
<div id="signIn" class="container">
    <b-form class= "form-signin" @submit="onSubmit">
      <div class="text-center mb-4">
        <img class="mb-4" src="" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Floating labels</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
      </div>
      <b-form-group id="inputEmailGroup"
                    label="Email address"
                    label-for="inputEmail">
        <b-form-input id="inputEmail"
                      type="text"
                      v-model="form.email"
                      placeholder="Email Address">
        </b-form-input>
      </b-form-group>
      <b-form-group id="inputPasswordGroup"
                    label="Password"
                    label-for="inputPassword">
        <b-form-input id="inputPassword"
                      type="password"
                      v-model="form.password"
                      placeholder="Password">
        </b-form-input>
      </b-form-group>
      <b-button class="btn btn-lg btn-primary btn-block" type="submit" variant="primary">Sign in</b-button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </b-form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: 'SignIn',
  data: function() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  beforeCreate: function() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        alert('You are already logged in')
        this.$router.push('/admin')
        // console.log(user)
      }
    })
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).catch(function(error) {
      // Handle Errors here.
      console.log(error)
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
      });
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
