<template>
  <div style="background-color:#f2f2f2">
    <section class="basic-info flex">
      <aside>
        <div class="head">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)" ref="head">
          <p class="hv-cen">点击上传你
            <br>的个人头像</p>
        </div>
        <div class="rating">
          <rater v-model="rating" :max="5" active-color="#bc2826"></rater>
        </div>
      </aside>
      <main>
        <ul>
          <li>
            <span>姓&emsp;&emsp;名：</span>
            <span>张三</span>
          </li>
          <li>
            <span>电&emsp;&emsp;话：</span>
            <span>13544445555</span>
          </li>
          <li>
            <span>微&emsp;&emsp;信：</span>
            <span v-if="wechat" class="ellipsis" style="display: inline-block;width: 5.5rem;vertical-align: middle;">{{wechat}}</span>
            <span v-else class="v-red">请添加您的微信号</span>
            <span class="fa fa-pencil-square-o v-red v-fz-22" style="vertical-align: middle"></span>
          </li>
          <li>
            <span>店铺地址：</span>
            <span>广州市天河区珠江新城无限极中心1506</span>
          </li>
        </ul>
      </main>
    </section>
    <section class="">
      <ul class="gallery f-wrap just-between">
        <li>
          <img src="/static/plus.png" alt="">
          <p>门面全景</p>
        </li>
        <li>
          <img src="/static/plus.png" alt="">
          <p>门头LOGO近景</p>
        </li>
        <li>
          <img src="/static/plus.png" alt="">
          <p>营业区--全景</p>
        </li>
        <li>
          <img src="/static/plus.png" alt="">
          <p>门面全景</p>
        </li>
        <li>
          <img src="/static/plus.png" alt="">
          <p>门头LOGO近景</p>
        </li>
        <li>
          <img src="/static/plus.png" alt="">
          <p>营业区--全景</p>
        </li>
      </ul>
    </section>
    <section>
      <ul class="information-list">
        <li class="flex">
          <div class="img-cover">
            <img src="/static/1.jpg" alt="">
          </div>
          <div class="information-head flex just-between">
            <h3>
              <span>热门</span>2016年希望之旅：畅游曼谷 天使之城“泰”惊艳</h3>
            <p>2016年9月3日 21：30</p>
          </div>
        </li>
        <li class="flex">
          <div class="img-cover">
            <img src="/static/1.jpg" alt="">
          </div>
          <div class="information-head flex just-between">
            <h3>
              <span>热门</span>2016年希望之旅：畅游曼谷 天使之城“泰”惊艳</h3>
            <p>2016年9月3日 21：30</p>
          </div>
        </li>
        <li class="flex">
          <div class="img-cover">
            <img src="/static/1.jpg" alt="">
          </div>
          <div class="information-head flex just-between">
            <h3>
              <span>热门</span>2016年希望之旅：畅游曼谷 天使之城“泰”惊艳</h3>
            <p>2016年9月3日 21：30</p>
          </div>
        </li>
      </ul>
      <router-link :to="{path:'/information'}" class="text-center more-information" tag='div'>更多资讯</router-link>
    </section>
    <section>
      <ul class="activity-list" v-for="item in activity" :key="item.id">
        <li class="flex" v-for="(el,index) in item.detail" :key="el.id">
          <div class="img-cover">
            <img src="/static/1.jpg" alt="" class="hv-cen">
          </div>
          <div class="activity-info">
            <h2>{{item.name}}</h2>
            <div>
              <p>主题：{{el.title}}</p>
              <p>时间：{{el.time}}</p>
              <p>地点：{{el.place}}</p>
              <p>报名人数：{{el.people}}</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section>
      <ul class="product-list f-wrap just-around text-center">
        <li>
          <div><img src="/static/1.jpg" alt=""></div>
          <p>无限极健康产品</p>
        </li>
        <li>
          <div><img src="/static/1.jpg" alt=""></div>
          <p>心维雅护肤品</p>
        </li>
        <li>
          <div><img src="/static/1.jpg" alt=""></div>
          <p>萃雅护肤品</p>
        </li>
        <li>
          <div><img src="/static/1.jpg" alt=""></div>
          <p>享优乐养生用品</p>
        </li>
        <li>
          <div><img src="/static/1.jpg" alt=""></div>
          <p>帮得佳家居用品</p>
        </li>
        <li>
          <div><img src="/static/1.jpg" alt=""></div>
          <p>植雅个人护理品</p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { Rater } from 'vux'
export default {
  name: "storeSetting",
  components: { Rater },
  data() {
    return {
      rating: 0,
      wechat: '656656565653',
      activity: []
    }
  },
  created() {
    this.$store.commit('setPageTitle', '店铺设置')
    this.$store.commit('showLeft', true)
    this.getActivity();
  },
  methods: {
    showImg(event) {
      let file = this.$refs.head.files[0]
      if (!/image\/\w+/.test(file.type)) {
        alert('请上传图片');
        return;
      }
      let img = URL.createObjectURL(file)
      const head = document.querySelector('.head')
      head.querySelector('p').style.display = 'none';
      head.style.backgroundImage = `url(${img})`
    },
    getActivity() {
      this.axios.get('/static/activity.json').then(res => {
        this.activity = res.data.data;
      })
    }
  }
}
</script>
<style lang='less' scoped>
section {
  background-color: #fff;
  margin-bottom: 10px;
}

.basic-info {
  padding: 15px 5px 5px;
  aside {
    width: 38%;
    .head {
      position: relative;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      margin: 10px auto;
      background-color: #ccc;
      background-size: cover;
      input {
        opacity: 0;
        z-index: 20;
        width: 5rem;
        height: 5rem;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #333;
        padding: 5px;
      }
    }
  }
  main {
    flex: 1;
    li {
      margin-top: 10px;
      font-size: 16px;
      color: #333;
      span {
        &:first-child {
          display: inline-block;
          color: #333;
          font-weight: bold;
          text-align: justify;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }
}

.gallery {
  padding: 0 10px;
  width: 100%;
  li {
    position: relative;
    overflow: hidden;
    margin: 10px 0;
    width: 30%;
    height: 4rem;
    border: 1px dashed #333;
    img {
      position: absolute;
      width: 40px;
      height: 40px;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
    }
    p {
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(215, 215, 215, 1);
      color: #fff;
      text-align: center;
      font-size: 14px;
    }
  }
}

.information-list {
  li {
    padding: 8px;
    margin-bottom: 5px;
    .img-cover {
      width: 40%;
    }
    .information-head {
      flex-direction: column;
      margin-left: 5px;
      h3 {
        font-size: 15px;
        span {
          display: inline-block;
          vertical-align: middle;
          padding: 2px 10px;
          border-radius: 10px;
          background: rgba(255, 51, 51, 1);
          color: #fff;
          font-size: 9px;
        }
      }
      p {
        color: #333;
        font-size: 10px;
      }
    }
  }
}

.more-information {
  position: relative;
  padding-bottom: 10px;
  color: #ccc;
  &::before {
    position: absolute;
    content: '';
    right: 35%;
    width: 15px;
    height: 15px;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    transform: skewX(0) rotate(45deg);
    transform-origin: left;
  }
}

.activity-list {
  border: 1px dashed #ccc;
  color: #333;
  li {
    padding: 10px 2rem;
    .img-cover {
      position: relative;
      padding-top: 25%;
      width: 5rem;
      margin-right: .4rem;
    }
    .activity-info {
      flex: 1;
      h2 {
        font-size: 14px;
        font-weight: normal;
      }
      div {
        font-size: 10px;
      }
    }
  }
}
.product-list{
  font-size: 13px;
  color: #333;
  li{
    width:30%;
    margin: .8rem 0;
  }
}
</style>