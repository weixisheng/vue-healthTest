<template>
  <div id="app">
    <x-header :left-options="{showBack:showBack}"
    :right-options="{showMore:showMore}"
              @on-click-more="clickMore">{{pageTitle}}
    </x-header>
    <div class="main">
   
      <transition mode="out-in"
                  :name="transitionName">
                  <!-- <keep-alive> -->
        <router-view></router-view>
                  <!-- </keep-alive>   -->
      </transition>
      
    </div>
     <tabbar class="fix-footer">
            <tabbar-item selected link="/home">
                 <i slot="icon"
                      class="fa fa-home"></i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/music">
                <i slot="icon"
                      class="fa fa-music"></i>
                <span slot="label">音乐</span>
            </tabbar-item>
            <tabbar-item link="/health">
                <i slot="icon"
                      class="fa fa-thermometer"></i>
                <span slot="label">健康测试</span>
            </tabbar-item>
            <tabbar-item link="/me">
                <i slot="icon"
                      class="fa fa-user-o"></i>
                <span slot="label">我的</span>
            </tabbar-item>
    
        </tabbar>
    <modal v-model="showModal" @modal-hide="onHide">
      <h1 slot="header">扫一扫获取测试链接</h1>
      <div class="qr-box text-center" slot="main" style="padding:10px;">
        <qrcode value="https://emcs-test.infinitus.com.cn/h5/www/product/pages/module_healthTestBf/index.html"
                type='canvas'></qrcode>
      </div>
    </modal>
   <loading v-model="isLoading"></loading> 
  </div>
</template>

<script>
import zepto from "zepto/src/zepto"
import {Loading, XHeader, Qrcode,Tabbar,TabbarItem } from 'vux'
import { mapState,mapGetters } from 'vuex'
import Modal from './components/modal'
export default {
  name: 'app',
  components: {Loading, XHeader, Qrcode, Modal,Tabbar,TabbarItem },
  computed: {
    ...mapState({
      isLoading:state=>state.ajaxLoading.isLoading
    }),
    ...mapGetters(['pageTitle', 'showMore','showBack','showModal'])
  },
  data(){
    return {
      transitionName:'fade'
    }
    
  },
watch:{
      '$route' (to,from){
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        if(toDepth<fromDepth) this.transitionName='slide-right';
        else if(toDepth>fromDepth) this.transitionName='slide-left';
        else this.transitionName = 'fade';
      }
    },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    clickMore() {
      this.$store.commit('showModal',true)
    },
    onHide(){
      this.$store.commit('showModal',false)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/less/common.less';
@import './assets/font-awesome-4.7.0/less/font-awesome.less';

body {
  background-color: #fff;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.slide-left-enter-active,
.slide-right-enter-active{
  transition:transform .5s;
}
.slide-left-enter{
  transform: translateX(100%);
}
.slide-left-leave-active, .slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active{
  transform: translateX(100%);
}
.vux-header {
  position: fixed!important;
  height: 44px;
  line-height: 44px;
  left: 0;
  right: 0;
  z-index: 100;
}

.main {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow: auto;
}
.fix-footer{
  position: fixed!important;
}
::-webkit-scrollbar  
{  
    width: 0;  
    background-color: #F5F5F5;  
} 
</style>
