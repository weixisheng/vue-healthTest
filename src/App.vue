<template>
  <div id="app">
    <x-header :left-options="{showBack:showBack}" :right-options="{showMore:showMore}" @on-click-more="clickMore" @on-click-title='goTop'>
      {{pageTitle}}
    </x-header>
    <div class="main">
      <!--<transition mode="out-in" :name="transitionName">-->
        <transition>
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive>   -->
      </transition>
    </div>
  
    <tabbar class="fix-footer">
      <tabbar-item link="/home" :selected="/\/home/.test($route.path)">
        <i slot="icon" class="fa fa-home"></i>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/music" :selected="/music/.test($route.path)">
        <i slot="icon" class="fa fa-music"></i>
        <span slot="label">音乐</span>
      </tabbar-item>
      <tabbar-item link="/movie" :selected="/movie/.test($route.path)">
        <i slot="icon" class="fa fa-file-movie-o"></i>
        <span slot="label">电影</span>
      </tabbar-item>
      <tabbar-item link="/health" :selected="/health/.test($route.path)">
        <i slot="icon" class="fa fa-thermometer"></i>
        <span slot="label">健康测试</span>
      </tabbar-item>
      <tabbar-item link="/me" :selected="/\/me/.test($route.path)">
        <i slot="icon" class="fa fa-user-o"></i>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <modal v-model="showModal" @modal-hide="onHide">
      <h1 slot="header">扫一扫获取测试链接</h1>
      <div class="qr-box text-center" slot="main" style="padding:10px;">
        <qrcode value="https://emcs-test.infinitus.com.cn/h5/www/product/pages/module_healthTestBf/index.html" type='canvas'></qrcode>
      </div>
    </modal>
    <loading v-model="isLoading" :text='text'></loading>
  </div>
</template>

<script>
import {XHeader, Qrcode, Tabbar, TabbarItem } from 'vux'
import { mapState, mapGetters } from 'vuex'
import Modal from 'components/modal'
import Loading from 'components/loading'
import SimpleCell from 'components/simpleCell'

export default {
  name: 'app',
  components: { Loading, XHeader, Qrcode, Modal, Tabbar, TabbarItem, SimpleCell },
  computed: {
    ...mapState({
      isLoading: state => state.ajaxLoading.isLoading,
      text: state => state.ajaxLoading.text
    }),
    ...mapGetters(['showBack','showMore', 'pageTitle', 'showModal'])
  },
  data() {
    return {
      transitionName: 'fade'
    }
  },
  watch: {
    //已经使用vuet插件替换
    '$route'(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      if (toDepth < fromDepth) this.transitionName = 'slide-right';
      else if (toDepth > fromDepth) this.transitionName = 'slide-left';
      else this.transitionName = 'fade';
    }
  },
  methods: {
    goTop() {
      // document.querySelector('.main').scrollTop = 0;
      /*let timer = null;
      const m = document.querySelector('.main').firstChild;
      timer = setInterval(function(){
        var ct = m.scrollTop;
        ct-=20;
        if(ct > 0)
          m.scrollTop=ct;
        else{
          m.scrollTop=0;
          clearInterval(timer);
        }
      },16);*/
      var timer = null;
      const m = document.querySelector('.main').firstChild;
      window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAniamtionFrame;
      window.cancelAnimationFrame(timer);
      timer = window.requestAnimationFrame(function smoothScroll() {
        var ct = m.scrollTop;
        if (ct > 0) {
         timer= window.requestAnimationFrame(smoothScroll);
          m.scrollTop -= ct / 5;
        }
        else {
          window.cancelAnimationFrame(timer);
        }
      })

      if ($('div[jroll-id]').length > 0) {
        $('div[jroll-id]')[0].jroll.scrollTo(0, 0, 200);
      }
    },
    clickMore() {
      this.$store.commit('showModal', true)
    },
    onHide() {
      this.$store.commit('showModal', false)
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
  bottom: 50px;
  overflow: hidden;
  >div:first-child {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
  }
}

.fix-footer {
  position: fixed!important;
}

::-webkit-scrollbar {
  width: 0;
  background-color: #F5F5F5;
}
</style>
