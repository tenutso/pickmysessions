import Vue from 'vue'
import Router from 'vue-router'
import RoundtablesIndex from '@/components/Roundtables/Index'
import AdminIndex from '@/components/Admin/AdminIndex'
import AdminHome from '@/components/Admin/AdminHome'
import SignIn from '@/components/SignIn'
import RoundTableList from '@/components/Admin/RoundTable/RoundTableList'
import ExpertList from '@/components/Admin/RoundTable/ExpertList'
import EmailList from '@/components/Admin/EmailList/EmailList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      component: AdminIndex,
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
          path: 'roundtables/:id/experts',
          name: 'ExpertList',
          component: ExpertList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'roundtables/:id/list',
          name: 'EmailList',
          component: EmailList,
          meta: {
            requiresAuth: true
        }

        },
      ]
    },
    {
      path: '/:id',
      name: 'RoundtablesIndex',
      component: RoundtablesIndex
    },
    {
      path: '/admin/sign-in',
      name: 'SignIn',
      component: SignIn
    },
  ]
})
