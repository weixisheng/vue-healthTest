<template>
  <div>
    <baidu-map class="bm-view" ak="xVyOYxDsYKpFBx8zdICSlWxsqltd8QoC" :center="center" :zoom="16" @ready="handler">
      <bm-marker :position="center" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: '/static/locale.png', size: {width: 50, height: 50}}"></bm-marker>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
  </div>
</template>
<script>
import { BaiduMap ,BmMarker,BmGeolocation} from 'vue-baidu-map'
export default {
  name: "storeMap",
  data() {
    return {
      center: { lng: 0, lat: 0 }
    }
  },
  components: { BaiduMap,BmMarker,BmGeolocation },
  // beforeRouteEnter(to,from,next){
  //   next(vm=>{
  //     vm.center.lng = vm.$route.params.lng
  //     vm.center.lat = vm.$route.params.lat
  //   })
  // },
  created(){
    this.$store.commit('setPageTitle','查看位置')
  },
  methods: {
    handler({ BMap, map }) {
     this.center.lng = this.$route.query.lng
     this.center.lat = this.$route.query.lat
    }
  }
}
</script>
<style lang='less' scoped>
.bm-view {
  width: 100%;
  height: 400px;
}
</style>