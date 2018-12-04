// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import VueFire from 'vuefire'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './stylus/main.styl'

Vue.use(BootstrapVue);
Vue.use(VueFire)
Vue.use(Vuetify)

Vue.config.productionTip = false
/*
let currentUser = ''
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch('init')
    await store.dispatch('initFirestore')
    currentUser = user
  }
})
*/

store.dispatch('init')
  .then(() => { 
    console.log('next initfirestore', store.state.user)
    store.dispatch('initFirestore', ) 
  })
  .then(() => {
    router.beforeEach((to, from, next) => {
      console.log('inituser', store.state.user)
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
      if (requiresAuth && !store.state.user) {
        console.log("Not logged in", store.state.user);
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
