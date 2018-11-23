import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminIndex from '@/components/Admin/AdminIndex'
import SignIn from '@/components/SignIn'
import RoundTableCreate from '@/components/Admin/RoundTable/RoundTableCreate'
import RoundTableEdit from '@/components/Admin/RoundTable/RoundTableEdit'
import RoundTableList from '@/components/Admin/RoundTable/RoundTableList'

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
      components: AdminIndex,
      name: 'AdminIndex',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/roundtable/create',
      name: 'RoundTableCreate',
      components: RoundTableCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/roundtable/edit/:id',
      name: 'RoundTableEdit',
      components: RoundTableEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/roundtable/list',
      name: 'RoundTableList',
      components: RoundTableList,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
