import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminIndex from '@/components/Admin/AdminIndex'
import AdminHome from '@/components/Admin/AdminHome'
import SignIn from '@/components/SignIn'
import RoundTableList from '@/components/Admin/RoundTable/RoundTableList'
import ExpertList from '@/components/Admin/RoundTable/ExpertList'
import EmailList from '@/components/Admin/EmailList/EmailList'
import AddressList from '@/components/Admin/EmailList/AddressList'


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
          path: 'roundtables/:id/experts',
          name: 'ExpertList',
          component: ExpertList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'lists',
          name: 'EmailList',
          component: EmailList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'lists/:id',
          name: 'AddressList',
          component: AddressList,
          meta: {
            requiresAuth: true
          }
        },
      ]
    }
  ]
})
