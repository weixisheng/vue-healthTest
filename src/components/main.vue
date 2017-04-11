<template>
  <div>
    <div class="vux-demo">
      <img class="logo"
           src="../assets/logo.jpg">
      <h2>{{msg}} </h2>
    </div>
    <group title="测试类型">

      <cell v-for="item in questions"
            :title="item.paperName"
            :value="item.paperCode"
            :class="item.state=='normal'?activeClass:''"
            :is-link="item.state=='normal'"
            :link="item.state=='normal'?'/start':''">
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import axios from 'axios'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: '健康测试',
      questions: [],
      activeClass: 'v-blue'
    }
  },
  created: function () {
    var self = this;
    axios.get('./static/question.json')
      .then((response) => {
        self.questions = response.data
      });
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/common.less';
.vux-demo {
  margin-top: 20px;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>