import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import SignIn from '@/components/SignIn'
import RoundTableCreate from '@/components/RoundTable/RoundTableCreate'
import RoundTableList from '@/components/RoundTable/RoundTableList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        layout: 'admin'
      }
    },
    {
      path: '/admin/roundtable/create',
      name: 'RoundTableCreate',
      component: RoundTableCreate,
      meta: {
        requiresAuth: true,
        layout: 'admin'
      }
    },
    {
      path: '/admin/roundtable/list',
      name: 'RoundTableList',
      component: RoundTableList,
      meta: {
        requiresAuth: true,
        layout: 'admin'
      }
    }
  ]
})
