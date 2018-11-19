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
import AdminLayout from './layouts/Admin'
import MainLayout from './layouts/Main'

Vue.component('admin-layout', AdminLayout)
Vue.component('main-layout', MainLayout)

let currentUser = ''
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user
    console.log(currentUser)
  }
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/admin/sign-in')
  } else {
    next()
  }
})

Vue.use(BootstrapVue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
