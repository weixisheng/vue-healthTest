import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        pageTitle:'',
        cartCount:0
    },
    getters:{
        pageTitle:state=>state.pageTitle,
        cartCount:state=>state.cartCount
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
       }
    }
});
export default store;
