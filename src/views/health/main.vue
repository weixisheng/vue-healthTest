<template>
  <div class="main-wrapper">
    <div class="test-container">
      <!--<div class="sd">
            <div class="sd1">松开后刷新</div>
            <div class="sd2">加载中...</div>
          </div>-->
      <circle-box v-for="(item,index) in questions" :state='item.state' :code='item.paperCode' :paper-name="item.paperName" @click.native="goTest"></circle-box>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import circleBox from 'components/circleBox'
import config from '../../config/service'
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
  },
  created: function () {
    this.$store.commit('setPageTitle', '健康测试')
    var vm = this;
    this.$store.commit('updateLoading', { isLoading: true });

    this.axios.get('/health/test/question')
      .then((response) => {
        vm.questions = response.data.returnObject
        vm.$store.commit('updateLoading', { isLoading: false })
      }).catch((error) => {
          setTimeout(() => {
        vm.axios.get(config.question).then((res) => {
          vm.questions = res.data;
            vm.$store.commit('updateLoading', { isLoading: false })
          }, 1500);
        })
      });

  },
  methods: {
    goTest(event) {
      if (event.currentTarget.classList.contains('open'))
        this.$router.push({ name: 'start' });
    }
  },
  beforeRouteEnter: function (to, from, next) {
    next(vm => {
      vm.$store.commit('showLeft', false);
      vm.$store.commit('showRight', true);
    })
  }
}


</script>

<style lang="less" scoped>
.main-wrapper {
  overflow: hidden;
}

.test-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 .6rem 1rem;
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
