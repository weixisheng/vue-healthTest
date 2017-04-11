import Vue from 'vue'
import Router from 'vue-router'
import main from 'components/main'
import start from 'components/start'
import result from 'components/result'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: main
    },
    {
      path: '/start',
      name: 'start',
      component: start
    },
    {
      path: '/result',
      name: 'result',
      component: result
    }
  ]
})
