import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/*const foo = resolve => { require.ensure(['../views/foo.vue'], () => {resolve(require('../views/foo.vue')); }); }; 
{path:'/foo',compoennt:foo}*/
/*const bar =resolve=>require(['../views/bar.vue'],resolve);
{path:'/bar',compoennt:bar}*/
const router = new Router({
  routes: [{
    path: '/login',
    name: 'index',
    component: require('../views/login')
  }, {
    path: '/home',
    name: 'home',
    component: require('../views/home')
  }, {
    path: '/health',
    name: 'main',
    component: require('../views/health/main')
  }, {
    path: '/health/start',
    name: 'start',
    component: require('../views/health/start')
  }, {
    path: '/health/history',
    name: 'history',
    component: require('../views/health/history')
  }, {
    path: '/health/result',
    name: 'result',
    component: require('../views/health/result')
  },{
    path: '/health/distribution',
    name: 'distribution',
    component: require('../views/health/distribution')
  }, {
    path: '/me',
    name: 'me',
    component: require('../views/me/me')
  }, {
    path: '/me/money',
    name: 'money',
    component: require('../views/me/money')
  }, {
    path: '/me/pictures',
    name: 'pictures',
    component: require('../views/me/pictures')
  }, {
    path: '/me/setting',
    name: 'setting',
    component: require('../views/me/setting')
  }, {
    path: '/me/xss',
    name: 'xss',
    component: require('../views/me/xss')
  },{
    path: '/music',
    name: 'music',
    component: require('../views/music')
  }, {
    path: '/movie',
    name: 'movie',
    component: require('../views/movie')
  }, {
    path: '*',
    redirect: '/login'
  }]
});
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
  // console.log(to.path);
  if (to.path !== '/login' && !window.sessionStorage.getItem('username')) {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})
export default router;
