import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import index from '../views/index'
import Home from '../views/components/Home'
import DefaultApplication from '../views/components/DefaultApplication'
import DefaultRenewalApplication from '../views/components/DefaultRenewalApplication'
import DataSearch from '../views/components/DataSearch'
import DefaultStatistics from '../views/components/DefaultStatistics'
import DefaultApplicationReview from '../views/components/DefaultApplicationReview'
import DefaultRenewalApplicationReview from '../views/components/DefaultRenewalApplicationReview'
import DefaultReasons from '../views/components/DefaultReasons'

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
        path:'/default/appliciton',
        name:'DefaultApplication',
        component: DefaultApplication
      },
      {
        path:'/default/renewalAppliciton',
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
    ]
  },
    
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
