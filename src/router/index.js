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
      name: 'login',
      component: require('../views/login')
    }, {
      path: '/information',
      name: 'information',
      component: require('../views/media/information')
    }, {
      path: '/information/detail',
      name: 'informationDetail',
      component: require('../views/media/information-detail')
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
    }, {
      path: '/health/distribution',
      name: 'distribution',
      component: require('../views/health/distribution')
    }, {
      path: '/product/detail',
      name: 'productDetail',
      component: require('../views/product/detail')
    }, {
      path: '/product/balance',
      name: 'balance',
      component: require('../views/product/balance')
    },{
      path: '/me/store/setting',
      name: 'storeSetting',
      component: require('../views/me/store-setting')
    }, {
      path: '/me/store/map',
      name: 'storeMap',
      component: require('../views/me/store-map')
    }, {
      path: '/me',
      name: 'me',
      component: require('../views/me/me'),
      meta: {
        requireAuth: true
      }
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
    }, {
      path: '/music',
      name: 'music',
      component: require('../views/media/music')
    }, {
      path: '/movie',
      name: 'movie',
      component: require('../views/media/movie')
    }, {
      path: '/movie/detail',
      name: 'movieDetail',
      component: require('../views/media/movie-detail')
    }, {
      path: '*',
      redirect: '/login'
    }
  ]
});

export default router;
