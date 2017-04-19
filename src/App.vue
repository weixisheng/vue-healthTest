<template>
  <div id="app">
    <x-header :right-options="{showMore:showMore}"
              @on-click-more="clickMore">{{pageTitle}}</x-header>
    <div class="main">
    <div>
      <transition mode="out-in"
                  name="fade">
        <router-view></router-view>
      </transition>
      </div>
    </div>
    <modal v-model="showModal" @modal-hide="onHide">
      <h1 slot="header">扫一扫</h1>
      <div class="qr-box text-center" slot="main" style="padding:10px;">
        <qrcode value="https://emcs-test.infinitus.com.cn/h5/www/product/pages/module_healthTestBf/index.html"
                type='canvas'></qrcode>
      </div>
  
    </modal>
  </div>
</template>

<script>
import zepto from "zepto/src/zepto"
import { XHeader, Qrcode } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import Modal from './components/modal'
export default {
  name: 'app',
  components: { XHeader, Qrcode, Modal },
  computed: {
    ...mapGetters(['pageTitle', 'showMore','showModal'])
  },
  data(){
    return {
     
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
  bottom: 0;
}
</style>
