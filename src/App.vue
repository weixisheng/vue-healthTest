<template>
  <div id="app">
    <x-header>{{pageTitle}}</x-header>
    <div class="main">
      <transition mode="out-in"
                  name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import zepto from "zepto/src/zepto"
import {XHeader} from 'vux'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  components:{XHeader},
  computed:{
    ...mapGetters(['pageTitle'])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
.main{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}

</style>
