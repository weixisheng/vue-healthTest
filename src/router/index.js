import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/*const foo = resolve => { require.ensure(['../views/foo.vue'], () => {resolve(require('../views/foo.vue')); }); }; 
{path:'/foo',compoennt:foo}*/
/*const bar = resolve => require(['../views/bar.vue'], resolve);
{path:'/bar',compoennt:bar}*/
const Login = r => require.ensure([], () => r(require('../views/login')),'group-login')

const Information = r => require.ensure([], () => r(require('../views/media/information')),'group-media')
const InformationDetail = r => require.ensure([], () => r(require('../views/media/information-detail')),'group-media')
const Music = r => require.ensure([], () => r(require('../views/media/music')),'group-media')
const Movie = r => require.ensure([], () => r(require('../views/media/movie')),'group-media')
const MovieDetail = r => require.ensure([], () => r(require('../views/media/movie-detail')),'group-media')

const Health = r => require.ensure([], () => r(require('../views/health/main')),'group-health')
const HealthStart = r => require.ensure([], () => r(require('../views/health/start')),'group-health')
const HealthResult = r => require.ensure([], () => r(require('../views/health/result')),'group-health')
const HealthDistribution = r => require.ensure([], () => r(require('../views/health/distribution')),'group-health')

const Me  = r => require.ensure([], () => r(require('../views/me/me')),'group-me')
const Money  = r => require.ensure([], () => r(require('../views/me/money')),'group-me')
const Picture  = r => require.ensure([], () => r(require('../views/me/pictures')),'group-me')
const Setting  = r => require.ensure([], () => r(require('../views/me/setting')),'group-me')
const XSS  = r => require.ensure([], () => r(require('../views/me/xss')),'group-me')

const StoreSetting  = r => require.ensure([], () => r(require('../views/me/store-setting')),'group-Store')
const StoreMap  = r => require.ensure([], () => r(require('../views/me/store-map')),'group-Store')

const ProductBalance  = r => require.ensure([], () => r(require('../views/product/balance')),'group-product')
const ProductDetail  = r => require.ensure([], () => r(require('../views/product/detail')),'group-product')

const router = new Router({
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: require('../views/test')
    },{
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/information',
      name: 'information',
      component: Information
    }, {
      path: '/information/detail',
      name: 'informationDetail',
      component: InformationDetail
    }, {
      path: '/health',
      name: 'health',
      component: Health
    }, {
      path: '/health/start',
      name: 'start',
      component: HealthStart
    }, {
      path: '/health/result',
      name: 'result',
      component: HealthResult
    }, {
      path: '/health/distribution',
      name: 'distribution',
      component: HealthDistribution
    }, {
      path: '/product/detail',
      name: 'productDetail',
      component: ProductDetail
    }, {
      path: '/product/balance',
      name: 'balance',
      component: ProductBalance
    },{
      path: '/me/store/setting',
      name: 'storeSetting',
      component: StoreSetting
    }, {
      path: '/me/store/map',
      name: 'storeMap',
      component: StoreMap
    }, {
      path: '/me',
      name: 'me',
      component: Me,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/me/money',
      name: 'money',
      component: Money
    }, {
      path: '/me/pictures',
      name: 'pictures',
      component: Picture
    }, {
      path: '/me/setting',
      name: 'setting',
      component: Setting
    }, {
      path: '/me/xss',
      name: 'xss',
      component: XSS
    }, {
      path: '/music',
      name: 'music',
      component: Music
    }, {
      path: '/movie',
      name: 'movie',
      component: Movie
    }, {
      path: '/movie/detail',
      name: 'movieDetail',
      component: MovieDetail
    }, {
      path: '*',
      redirect: '/login'
    }
  ]
});

export default router;
