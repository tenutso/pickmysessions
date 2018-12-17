// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import VueFire from 'vuefire'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './stylus/main.styl'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueFire)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

let currentUser = ''
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    currentUser = user
    store.commit('SET_USER', currentUser)
  }
  router.beforeEach((to, from, next) => {
    console.log('beforeEach', currentUser)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      console.log("Not logged in", currentUser);
      next({
        path: '/admin/sign-in',
        query: {
          redirect: to.fullPath
        }
      })

    } else {
      next()
    }
  })
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App: { template: '<div><router-view></router-view></div>'}
    },
    template: '<App/>'
  })
})





