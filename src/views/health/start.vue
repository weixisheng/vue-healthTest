<template>
  <div id='start-wrapper'>
    <div class="test-home">
      <section v-if="!i">
        <div class="test-title v-yellow">
          <p>干性皮肤（Dry - D）</p>
          <p>VS.</p>
          <p>油性皮肤（Oil - O）</p>
        </div>
        <p class="test-description v-fz-15 v-gray">
          {{illustrate}}
        </p>
        <div class="btn-group flex">
          <button class="v-bg-yellow v-white v-fz-15 start" @click="start">开始测试</button>
        </div>
      </section>
      <section v-else>
        <div class="pro">
          <div class="progress progress-primary">
            <div class="progress-bar  v-bg-yellow" :style="{width: percent+'%'}"></div>
          </div>
          <div class="progress-text v-fz-12">
            第{{i}}题/共{{length}}题
          </div>
        </div>
  
        <div class="test-cell v-gray v-fz-14" v-for="(paperItem,index) in paperItems" :class="{'is-current':index==i-1}" :data-index="index + 1" :data-id="paperItem.id" :key="index">
          <h3 class="quest-title v-gray v-fz-16">
            {{index + 1}}.{{paperItem.question}}
          </h3>
          <div v-for="ele in paperItem.items" class="quest-answer radio radio-primary clearfix">
            <input type="radio" :name="index" :data-code="ele.option" :id="'ques-'+index + ele.option">
            <label :for="'ques-'+index + ele.option">
              {{ele.content}}
            </label>
          </div>
          <img :src="paperItem.questionImg" alt="" onerror="src='/static/logo.jpg'">
        </div>
  
        <div class="btn-groups">
          <button class="btn prev v-bg-yellow v-white" v-if="i>1&&i<length" @click="prev">上一题</button>
          <button class="btn v-bg-yellow v-white" v-if="i>=1&&i<length" @click="next">下一题</button>
          <button class="btn v-bg-yellow v-white" v-if="i==length" @click="submit">提交测试</button>
        </div>
        <Toast :value="showToast" type="warn" is-show-mask>请选择答案</Toast>
      </section>
    </div>
  </div>
</template>

<script>

import { Toast, Loading } from 'vux';

export default {
  name: 'start',
  components: {
    Toast, Loading
  },
  data() {
    return {
      illustrate: '',
      paperItems: [],
      i: 0,
      showToast: false,
      length: 0
    }
  },
  created: function () {
    this.$store.commit('setPageTitle', '开始测试')
    this.$store.commit('showLeft', true)
    var self = this;
    this.axios.get('/health/test/detail?paperCode=JKCSPFCS')
      .then((response) => {
        var result = response.data.returnObject;
        self.illustrate = result.illustrate || '通过回答这部分的问题可以准确分析皮肤的含水状况和出油程度。别让自己的那些成见或其他的想法影响你的回答，只要根据实际情况来选择就对了。';
        self.paperItems = result.paperItems;
        self.length = self.paperItems.length;
      });

  },
  computed: {
    percent() {
      return (this.i / this.length) * 100;
    }
  },
  methods: {
    start: function () {
      this.i++;
    },
    prev() {
      this.i--;
    },
    next() {
      if (document.querySelectorAll(":checked").length < this.i) {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 1500);
        return
      }
      this.i++;
    },
    submit: function () {
      let a = Array.from(document.querySelectorAll("input"));
      let count = 0;
      a.forEach((i) => {
        i.checked ? count++ : count;
      })
      if (count !== this.paperItems.length) {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 1500);
      }
      else {
        // go('result', this.$router);
        this.$router.push({ name: 'result' });
      }
    }
  }
}
</script>

<style lang = "less">
.test-home {
  padding: 0 4% 4%;
}

.start {
  display: block;
  margin: 0 auto;
  margin-top: 30%;
  padding: 7px 10px 7px 15px;
  letter-spacing: 5px;
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


.btn-groups {
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  padding: 5px 0;
  justify-content: center;
  .btn {
    position: relative;
    border-radius: 5px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    font-weight: bold;
    width: 125px;
    height: 30px;
    line-height: 30px;
  }
  .prev {
    margin-right: -5%;
  }
}

.test-cell {
  margin: 2.5rem .8rem .1rem 0;
  display: none;
  transition: all .5s;
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
  &:checked {
    content: url(../../assets/2.png);
    background-color: #fff;
  }
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

.is-current {
  display: block;
}

.pro {
  position: fixed;
  z-index: 999;
  top: 44px;
  right: 0;
  left: 0;
  width: 100%;
  padding: 10px 4%;
  .progress {
    box-sizing: border-box;
    height: 8px;
    margin-bottom: .2rem;
    border-radius: 6px;
    .progress-bar {
      height: 6px;
      transition: width 800ms;
      border-radius: 6px;
    }
    &.progress-primary {
      border: 1px solid #ecbb91;
    }
  }
  .progress-text {
    letter-spacing: 3px;
    color: #888;
  }
}
</style>
