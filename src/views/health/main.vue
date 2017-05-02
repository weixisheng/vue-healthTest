<template>
  <div class="main-wrapper">
    <div class="test-container">
      <!--<div class="sd">
        <div class="sd1">松开后刷新</div>
        <div class="sd2">加载中...</div>
      </div>-->
      <circle-box v-for="(item,index) in questions"
                  :state='item.state'
                  :code='item.paperCode'
                  :paper-name="item.paperName"
                  @click.native="goTest"></circle-box>
    </div>
  </div>
</template>

<script>
import { Group, Cell} from 'vux'
import circleBox from '../../components/circleBox'
import { mapMutations } from 'vuex'
import {config} from '../../config/service'
export default {
  components: {
    Group,
    Cell,
    circleBox
  },
  data() {
    return {
      questions: [],
    }
  },
  computed: {
    ...mapMutations(['setPageTitle', 'showRight'])
  },
  created: function () {
    this.$store.commit('setPageTitle', '健康测试')
    var self = this;
    this.$store.commit('updateLoading',{isLoading:true});
    setTimeout(() => {
      this.axios.get(config.question)
        .then((response) => {
          self.questions = response.data
          self.$store.commit('updateLoading',{isLoading:false})
        });
    }, 500)
  },
  methods: {
    goTest(event) {
      if (event.currentTarget.classList.contains('open'))
        this.$router.push({ name: 'start' });
    }
  },
  beforeRouteEnter:function (to, from, next){
    next(vm => {
      vm.$store.commit('showLeft',false);
      vm.$store.commit('showRight', true);
    })
  },
  mounted() {
  //   function slideDownStep1(d) {
  //     var sd1 = document.querySelector('.sd1'), sd2 = document.querySelector('.sd2');
  //     sd2.style.display = 'none';
  //     sd1.style.display = 'block';
  //     sd1.style.height = - parseInt(d) + "px";
  //   }
  //   function slideDownStep2() {
  //     var sd1 = document.querySelector('.sd1'), sd2 = document.querySelector('.sd2');
  //     sd1.style.display = 'none';
  //     sd1.style.height = "20px";
  //     sd2.style.display = 'block';
  //   }
  //   function slideDownStep3() {
  //     var sd1 = document.querySelector('.sd1'), sd2 = document.querySelector('.sd2');
  //     sd1.style.display = 'none';
  //     sd2.style.display = 'none';
  //   }
  //   function k_touch(wrapper) {
  //     var _start = 0, _end = 0;
  //     var _content = /#/.test(wrapper) ? document.getElementById(wrapper) : document.querySelector(wrapper);
  //     _content.addEventListener("touchstart", touchStart, false);
  //     _content.addEventListener("touchmove", touchMove, false);
  //     _content.addEventListener("touchend", touchEnd, false);

  //     function touchStart(event) {
  //       event.preventDefault();
  //       if (!event.targetTouches.length) return;
  //       var touch = event.targetTouches[0];
  //       _start = touch.pageY;
  //     }
  //     function touchMove(event) {
  //       event.preventDefault();
  //       if (!event.targetTouches.length) return;
  //       var touch = event.targetTouches[0];
  //       _end = _start - touch.pageY;
  //       if (_end < 0 && _end > -40) {
  //         slideDownStep1(_end)
  //       }
  //     }
  //     function touchEnd(event) {
  //       if (_end < 0) {
  //         slideDownStep2();
  //         setTimeout(() => {
  //           slideDownStep3();
  //           console.log('刷新完成')
  //         }, 1000);
  //       }
  //     }
  //   }
  //   k_touch('.main-wrapper')
  }
}


</script>

<style lang="less" scoped>
.main-wrapper{
  overflow: hidden;
}
.test-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 12px;
}

.sd {
  margin-top: 0;
  width: 100%;
  text-align: center;
}

.sd1,
.sd2 {
  width: 100%;
  height: 40px;
  background: #e9f4f7;
  display: none;
}

.sd1 {
  height: 20px;
}
</style>