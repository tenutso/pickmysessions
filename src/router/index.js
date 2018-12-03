import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminIndex from '@/components/Admin/AdminIndex'
import AdminHome from '@/components/Admin/AdminHome'
import SignIn from '@/components/SignIn'
import RoundTableList from '@/components/Admin/RoundTable/RoundTableList'
import ExpertCreate from '@/components/Admin/RoundTable/ExpertCreate'
import ExpertList from '@/components/Admin/RoundTable/ExpertList'
import ExpertEdit from '@/components/Admin/RoundTable/ExpertEdit'

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
      component: AdminIndex,
      name: 'AdminIndex',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'AdminHome',
          component: AdminHome,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'roundtables',
          name: 'RoundTableList',
          component: RoundTableList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'roundtables/experts',
          name: 'ExpertList',
          component: ExpertList,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },

    // Manage Experts
    {
      path: '/admin/roundtable/:id/experts/create',
      name: 'ExpertCreate',
      component: ExpertCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/roundtable/:rid/experts/edit/:eid',
      name: 'ExpertEdit',
      component: ExpertEdit,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
