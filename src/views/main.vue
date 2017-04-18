<template>
  <div>
    <!--['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']-->
    <spinner class="hv-cen"
             type='lines'></spinner>
    <div class="test-container">
      <circle-box v-for="(item,index) in questions"
                  :state='item.state'
                  :code='item.paperCode'
                  :paper-name="item.paperName"
                  @click.native="goTest"></circle-box>
    </div>
  
  </div>
</template>

<script>
import { Group, Cell, Spinner } from 'vux'
import axios from 'axios'
import circleBox from '../components/circleBox'
import {mapMutations} from 'vuex'
export default {
  components: {
    Group,
    Cell,
    Spinner,
    circleBox
  },
  data() {
    return {
      questions: [],
    }
  },
  computed:{
    ...mapMutations(['setPageTitle'])
  },
  created: function () {
            this.$store.commit('setPageTitle','健康测试')
    if (window.sessionStorage.getItem('username') !== 'admin') {
      this.$router.push({ name: 'index' })
      return
    }
    var self = this;
    setTimeout(() => {
      axios.get('./static/question.json')
        .then((response) => {
          self.questions = response.data
          document.querySelector('.vux-spinner').style.visibility = 'hidden'
        });
    }, 1000)

  },
  methods: {
    goTest(event) {
      if (event.currentTarget.classList.contains('open'))
        this.$router.push({ name: 'start' });
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/common.less';
.test-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 12px;
}
</style>