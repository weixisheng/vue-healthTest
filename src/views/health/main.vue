<template>
  <div class="main-wrapper">
    <div class="test-container">
      <div v-for="(item,index) in questions" class="test-item v-bg-lightgray" :class="item.state=='normal'?'open':'half'" :key="index" @click="goTest">
        <div v-if="item.state=='normal'" class="test-active v-bg-yellow circle-box v-fz-18 v-white">开始测试</div>
        <div v-else class="circle-box v-fz-18 v-white" >暂未开通</div>
        <h3 class="v-gray">{{item.paperName}}</h3>
      </div>
    </div>
  </div>
</template>

<script>

import config from '../../config/service'
export default {

  data() {
    return {
      questions: []
    }
  },

  created: function () {
    this.$store.commit('setPageTitle', '健康测试')
    var vm = this;
    this.$store.commit('updateLoading', { isLoading: true });

    this.axios.get('/health/test/querstion')
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
.test-item {
    float: left;
    width: 100%;
    margin-top: 4%;
    padding-top: 5%;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 0 3px 2px rgba(223, 223, 221, .55);
    &.half {
        width: calc((100% - 5px)/2);
        .circle-box {
            width: 6.1rem;
            height: 6.1rem;
            line-height: 6.1rem;
            background: #dfdfdf;
        }
    }
}

.circle-box {
    position: relative;
    width: 7rem;
    height: 7rem;
    line-height: 7rem;
    margin: 0 auto;
    border: 1px solid transparent;
    /*解决部分oppo机型渲染问题*/
    border-radius: 50%;
    box-shadow: 0 0 5px 5px rgba(223, 223, 221, .64);
    &.test-active {
        box-shadow: 0 0 5px 5px rgba(228, 187, 145, .64);
    }
}

h3 {
    line-height: 1.2;
    font-weight: normal;
    margin: .5rem 0;
    font-size: .8rem;
}
</style>
