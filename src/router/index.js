import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import index from '../views/index'
import Home from '../views/components/Home'
import DefaultApplication from '../views/application/DefaultApplication'
import DefaultRenewalApplication from '../views/application/DefaultRenewalApplication'
import DataSearch from '../views/search/DataSearch'
import DefaultStatistics from '../views/search/DefaultStatistics'
import DefaultApplicationReview from '../views/review/DefaultApplicationReview'
import DefaultRenewalApplicationReview from '../views/review/DefaultRenewalApplicationReview'
import DefaultReasons from '../views/components/DefaultReasons'
import fillDetail from '../views/application/components/fillDetail'
import fillRenewalDetail from '../views/application/components/fillRenewalDetail'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    //导航
    path: '/index',
    name: 'index',
    component: index,
    children:[
      {
        path:'/home',
        name:'Home',
        component: Home
      },
      {
        path:'/application/default',
        name:'DefaultApplication',
        component: DefaultApplication
      },
      {
        path:'/application/defaultRenewal',
        name:'DefaultRenewalApplication',
        component: DefaultRenewalApplication
      },
      {
        path:'/dataSearch',
        name:'DataSearch',
        component: DataSearch
      },
      {
        path:'/statistics',
        name:'DefaultStatistics',
        component:DefaultStatistics

      },
      {
        path:'/review/defaultApplication',
        name:'DefaultApplicationReview',
        component:DefaultApplicationReview
      },
      {
        path:'/review/defaultRenewalApplication',
        name:'DefaultRenewalApplicationReview',
        component:DefaultRenewalApplicationReview
      },
      {
        path:'/reasons',
        name:'DefaultReasons',
        component:DefaultReasons
      },
      {
        path:'/application/default/fill',
        name:'fillDetail',
        component:fillDetail
      },
      {
        path:'/application/default/renewalFill',
        name:'fillRenewalDetail',
        component:fillRenewalDetail
      },
    ]
  },
    
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
