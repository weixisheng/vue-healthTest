import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:require('../components/index')
    },
    {
      path: '/main',
      name:'main',
      component: require('../components/main')
    },
    {
      path: '/start',
      name: 'start',
      component: require('../components/start')
    },
    {
      path: '/result',
      name: 'result',
      component: require('../components/result')
    },{
        path: '*',
        redirect: '/index'
    }

  ]
})
