import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      name:'index',
      component:require('../views/index')
    },
    {
      path: '/main',
      name:'main',
      component: require('../views/main')
    },
    {
      path: '/start',
      name: 'start',
      component: require('../views/start')
    },
    {
      path: '/history',
      name: 'history',
      component: require('../views/history')
    },
    {
      path: '/result',
      name: 'result',
      component: require('../views/result')
    },{
        path: '*',
        redirect: '/index'
    }

  ]
})
