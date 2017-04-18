import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        pageTitle:'',
        cartCount:0,
        showMore:false,
        showModal:false
        
    },
    getters:{
        pageTitle:state=>state.pageTitle,
        cartCount:state=>state.cartCount,
        showMore:state=>state.showMore,
        showModal:state=>state.showModal
    },
    mutations: {
       setPageTitle(state,title){
           state.pageTitle = title;
       },
       setCartCount (state,cartCount){
           state.cartCount = cartCount;
       },
       addCartCount(state){
        state.cartCount++;
       },
       showRight(state,a){
           state.showMore = a;
       },
       showModal(state,m){
           state.showModal =m;
       }
    }
});
export default store;
