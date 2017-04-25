import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [{
      path: '/index',
      name: 'index',
      component: require('../views/index')
    },
    {
      path: '/home',
      name: 'home',
      component: require('../views/home')
    },
    {
      path: '/health/main',
      name: 'main',
      component: require('../views/health/main')
    },
    {
      path: '/health/start',
      name: 'start',
      component: require('../views/health/start')
    },
    {
      path: '/health/history',
      name: 'history',
      component: require('../views/health/history')
    },
    {
      path: '/health/result',
      name: 'result',
      component: require('../views/health/result')
    },
    {
      path: '/me',
      name: 'me',
      component: require('../views/me/me')
    },
    {
        path: '/me/setting',
        name:'setting',
        component: require('../views/me/setting')
      },
    {
      path: '/music',
      name: 'music',
      component: require('../views/music')
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

export {router}