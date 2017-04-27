<template>
  <div class="test-home">
    <div class="test-title v-yellow">
      <p>干性皮肤（Dry - D）</p>
      <p>VS.</p>
      <p>油性皮肤（Oil - O）</p>
    </div>
    <p class="test-description v-fz-15 v-gray">
      {{illustrate}}
    </p>
    <div class="btn-group flex">
      <button class="v-bg-yellow v-white v-fz-15 start"
              @click="history">查看历史</button>
      <button class="v-bg-yellow v-white v-fz-15 start"
              @click="start">开始测试</button>
    </div>
    <div class="share-test v-yellow"
         @click="showSheet">
      <span class="fa fa-paper-plane-o"></span>
    </div>
    <Actionsheet v-if="showAction" v-model='action'
                 :show-cancel="showCancel"
                 cancel-text="取消"
                 :menus='menus'
                 v-on:on-click-menu='onClickMenu'></Actionsheet>
    <loading :value="showLoading"
             :text="loadingText"></loading>
  
    <div class="test-cell v-gray v-fz-14"
         :data-index="index + 1"
         :data-id="paperItem.id"
         v-for="(paperItem,index) in paperItems"
         :class="[{hidden:hidden}]">
      <h3 class="quest-title v-gray v-fz-16">
                            {{index + 1}}.{{paperItem.question}}
                      </h3>
      <div v-for="ele in paperItem.items"
           class="quest-answer radio radio-primary clearfix">
        <input type="radio"
               :name="index"
               :data-code="ele.option"
               :id="'ques-'+index + ele.option">
        <label :for="'ques-'+index + ele.option">
          {{ele.content}}
        </label>
      </div>
      <img :src="paperItem.questionImg"
           alt=""
           onerror="src='/static/logo.jpg'">
    </div>
    <button class="v-bg-yellow v-white v-fz-15 submit"
            @click="submit"
            :class="{hidden:hidden}">提交测试</button>
    <Toast :value="showToast"
           type="warn"
           is-show-mask>请选择答案</Toast>
  </div>
</template>

<script>

import { Toast, Loading, Actionsheet } from 'vux';
import { go } from '../../../node_modules/vux/src/libs/router'

export default {
  name: 'start',
  components: {
    Toast, Loading, Actionsheet
  },

  data() {
    return {
      illustrate: '',
      paperItems: [],
      hidden: true,
      showToast: false,
      showLoading: false,
      loadingText: '加载中...',
      action: false,
      showAction:false,
      showCancel: true,
      menus: [{
        type: 'disabled',
        label: '分享链接到'
      }, {
        type: '',
        label: "<span class='fa fa-wechat v-green'></span>微信好友",
        value: 'wechat'
      }, {
        type: '',
        label: "<span class='fa fa-qq v-blue'></span>QQ好友",
        value: 'qq'
      }]
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm=>{
      vm.$store.commit('showLeft',true);
    })
  },

  created: function () {
    this.$store.commit('setPageTitle', '开始测试')
    var self = this;
    this.axios.get('/static/detail.json')
      .then((response) => {
        var result = response.data.data
        self.illustrate = result.desc;
        self.paperItems = result.paperItems;
      });
      setTimeout(function(){
        self.showAction = true;
      },800);
  },
  methods: {
    history: function () {
      this.$router.push({ name: 'history' });
    },
    start: function () {
      let a = document.querySelector(".test-title"),
        b = document.querySelector(".test-description"),
        c = document.querySelector(".btn-group"),
        d = document.querySelector(".share-test");
      a.classList.add("hidden");
      b.classList.add("hidden");
      c.classList.add("hidden");
      d.classList.add("hidden");
      this.showLoading = true;
      function tick(i, cb) {
        setTimeout(function () {
          i++
          cb(i)
          if (i < 100) {
            tick(i, cb)
          }
        }, 10)
      }
      tick(0, (percent) => {
        if (percent === 100) {
          this.showLoading = false;
          this.hidden = false;
          return
        }
        this.loadingText = `加载进度${percent}%`
      })
      
    },
    showSheet: function () {
      this.action = true;
    },
    onClickMenu: function (event) {
      console.log(event)
    },
    submit: function () {
      let a = Array.from(document.querySelectorAll("input"));
      let c = 0;
      a.forEach((i) => {
        i.checked ? c++ : c;
      })
      if (c !== this.paperItems.length) {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      }
      else {
        // go('result', this.$router);
        this.$router.push({ name: 'result' });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "less" scoped>
.test-home {
  padding: 0 4% 4%;
}

.test-title {
  padding-top: 10%;
  padding-bottom: 14%;
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
}

.test-description {
  letter-spacing: 3px;
  line-height: 24px;
}

.share-test {
  position: fixed;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  left: 0;
  bottom: 50px;
  border-radius: 50%;
  border: 1px solid currentColor;
  text-align: center;
  background: #fff;
  animation: c 1.5s infinite linear;
  z-index: 50;
}

@keyframes c {
  0% {
    box-shadow: 0 0 5px #23dfe0;
  }
  50% {
    box-shadow: 0 0 5px #31d41f;
  }
  100% {
    box-shadow: 0 0 15px #101ed8;
  }
}

.start,
.submit {
  display: block;
  margin: 0 auto;
  padding: 7px 10px 7px 15px;
  letter-spacing: 5px;
}

.start {
  margin-top: 30%;
}

.test-cell {
  margin-top: .2rem;
  margin-bottom: .1rem;
}

.test-cell .quest-title {
  margin-bottom: .1rem;
  text-align: justify;
  line-height: 1.5;
}

.test-cell .quest-answer {
  position: relative;
  margin-bottom: .2rem;
  line-height: 20px;
}

.quest-answer>input[type='radio'] {
  display: block;
  float: left;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: none;
  border-radius: 50%;
  background: url(../../assets/1.png);
  background-size: contain;
}

.quest-answer>input[type='radio']:checked {
  content: url(../../assets/2.png);
  background-color: #fff;
}

.quest-answer>label {
  position: relative;
  top: 1px;
  display: block;
  float: left;
  width: 89%;
}

.test-cell img {
  width: 100%;
  margin-top: 9%;
  margin-bottom: 16%;
}
</style>
