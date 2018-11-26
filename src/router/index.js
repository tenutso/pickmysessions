import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminIndex from '@/components/Admin/AdminIndex'
import SignIn from '@/components/SignIn'
import RoundTableCreate from '@/components/Admin/RoundTable/RoundTableCreate'
import RoundTableEdit from '@/components/Admin/RoundTable/RoundTableEdit'
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
      }
    },
    {
      path: '/admin/roundtable/create',
      name: 'RoundTableCreate',
      component: RoundTableCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/roundtable/edit/:id',
      name: 'RoundTableEdit',
      component: RoundTableEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/roundtable/list',
      name: 'RoundTableList',
      component: RoundTableList,
      meta: {
        requiresAuth: true
      }
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
    },
    {
      path: '/admin/roundtable/:id/experts',
      name: 'ExpertList',
      component: ExpertList,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
