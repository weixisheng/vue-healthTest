// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import vueg from 'vueg';
import 'vueg/css/transition-min.css'
import VueLazyload from 'vue-lazyload'
import App from './App';
import './config/rem.js';

import router from "./router";
import store from './store';
import axios from 'axios';

Vue.use(VueRouter)
Vue.use(vueg, router);
Vue.use(VeeValidate);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '/static/loading.gif',
    attempt: 1,
    listenEvents: ['touchmove']
})

FastClick.attach(document.body);
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' };
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box');