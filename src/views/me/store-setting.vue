<template>
  <div style="background-color:#f2f2f2">
    <section class="basic-info flex">
      <aside>
        <div class="head">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)" ref="head">
          <p class="hv-cen text-center">点击上传你
            <br>的个人头像</p>
        </div>
        <div class="rating text-center">
          <rater v-model="rating" :max="5" active-color="#bc2826" :margin="0" :font-size="20"></rater>
        </div>
      </aside>
      <main>
        <ul>
          <li>
            <span>姓&emsp;&emsp;名:</span>
            <span>张三</span>
            <a class="icon fa fa-address-card v-red text-center"></a>
          </li>
          <li>
            <span>电&emsp;&emsp;话:</span>
            <span>13544445555</span>
            <a class="icon fa fa-phone-square v-red text-center" href="tel:13544445555"></a>
          </li>
          <li>
            <span>微&emsp;&emsp;信:</span>
            <span v-if="wechat" class="ellipsis" style="display: inline-block;width: 60%;vertical-align: middle;padding-right: 2%;">{{wechat}}</span>
            <span v-else class="v-red">请添加您的微信号</span>
            <a class="icon fa fa-pencil-square-o v-red text-center" @click="toggleModal"></a>
          </li>
          <li>
            <span>店铺地址:</span>
            <span style="display:inline-block;width:60%;vertical-align: middle;">广州市天河区珠江西路17号广晟国际大厦</span>
            <router-link :to="{path:'/me/store/map',query:{lng:113.329257,lat:23.131119}}" class="icon fa fa-map-marker v-red text-center" style="width:20px;"></router-link>
          </li>
        </ul>
      </main>
    </section>
    <section class="">
      <h3>店铺形象</h3>
      <ul class="gallery f-wrap just-between">
        <li class="list-item">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)">
          <img src="/static/plus.png" alt="">
          <p class="ellipsis">门面全景</p>
        </li>
        <li class="list-item">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)">
          <img src="/static/plus.png" alt="">
          <p class="ellipsis">门头LOGO近景</p>
        </li>
        <li class="list-item">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)">
          <img src="/static/plus.png" alt="">
          <p class="ellipsis">营业区--全景</p>
        </li>
        <li class="list-item">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)">
          <img src="/static/plus.png" alt="">
          <p class="ellipsis">门面全景</p>
        </li>
        <li class="list-item">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)">
          <img src="/static/plus.png" alt="">
          <p class="ellipsis">门头LOGO近景</p>
        </li>
        <li class="list-item">
          <input type="file" accept="image/*" class="hv-cen" @change="showImg($event)">
          <img src="/static/plus.png" alt="">
          <p class="ellipsis">营业区--全景</p>
        </li>
      </ul>
    </section>
    <section style="padding-bottom: 10px;">
      <h3>店铺资讯</h3>
      <ul class="information-list">
        <li class="list-item flex" v-for="n in 3" :key="n">
          <div class="img-cover">
            <img src="/static/u199.png" alt="">
          </div>
          <div class="information-head flex just-between">
            <h3>
              <span>热门</span>2016年希望之旅：畅游曼谷 天使之城“泰”惊艳</h3>
            <p>2016年9月3日 21：30</p>
          </div>
        </li>
      </ul>
      <router-link :to="{path:'/information'}" class="text-center more-information v-fz-16" tag='div'>更多资讯</router-link>
    </section>
    <section style="padding: .25rem .25rem .5rem;">
      <h3>店铺活动</h3>
      <div class="activity-list swiper-container" v-for="item in activity" :key="item.id">
        <div v-if="item.detail.length" class="swiper-wrapper">
          <div class="list-item flex swiper-slide" v-for="(el,index) in item.detail" :key="el.id">
            <div class="img-cover">
              <img :src="item.img" alt="" class="hv-cen">
            </div>
            <div class="activity-info">
              <h2>{{item.name}}</h2>
              <div>
                <p class="ellipsis">主题：{{el.title}}</p>
                <p class="ellipsis">时间：{{el.time}}</p>
                <p class="ellipsis">地点：{{el.place}}</p>
                <p class="ellipsis">报名人数：{{el.people}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="swiper-wrapper">
          <div class="list-item flex swiper-slide">
            <div class="img-cover">
              <img :src="item.img" alt="" class="hv-cen">
            </div>
            <div class="activity-info">
              <h2>{{item.name}}</h2>
              <div class="text-center">
                暂无活动信息
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </section>
    <section>
      <h3>热门产品</h3>
      <ul class="product-list f-wrap just-around text-center">
        <li>
          <div class="img-cover">
            <img src="/static/u213.png" alt="">
          </div>
          <p>无限极健康产品</p>
        </li>
        <li>
          <div class="img-cover">
            <img src="/static/u221.png" alt="">
          </div>
          <p>心维雅护肤品</p>
        </li>
        <li>
          <div class="img-cover">
            <img src="/static/u223.png" alt="">
          </div>
          <p>萃雅护肤品</p>
        </li>
        <li>
          <div class="img-cover">
            <img src="/static/u225.png" alt="">
          </div>
          <p>享优乐养生用品</p>
        </li>
        <li>
          <div class="img-cover">
            <img src="/static/u233.png" alt="">
          </div>
          <p>帮得佳家居用品</p>
        </li>
        <li>
          <div class="img-cover">
            <img src="/static/u235.png" alt="">
          </div>
          <p>植雅个人护理品</p>
        </li>
      </ul>
    </section>
    <modal v-model="md">
      <h3 slot="header">添加微信号</h3>
      <form action="" class="wechat-form">
        <label for="" class="v-fz-16">请输入您的微信号</label>
        <input type="text" v-model="newWechat" placeholder="请输入您的微信号...">
      </form>
      <div slot="footer" class="wechat-btns flex just-around">
        <button class="btn v-fz-16" @click="toggleModal">取消</button>
        <button class="btn v-fz-16" @click="confirmWechat">确认</button>
      </div>
    </modal>
  </div>
</template>
<script>
import { Rater } from 'vux'

import Modal from 'components/modal'
import '../../plugins/swiper.min.js'
import '../../plugins/swiper.min.css'
export default {
  name: "storeSetting",
  components: { Rater, Modal },
  data() {
    return {
      rating: 0,
      wechat: '就哈哈哈哈哈',
      newWechat: '',
      activity: [],
      md: false
    }
  },
  computed: {

  },
  created() {
    this.$store.commit('setPageTitle', '店铺设置')
    this.getActivity();
  },
  methods: {
    showImg(event) {
      let file = event.target.files[0]
      if (!/image\/\w+/.test(file.type)) {
        alert('请上传图片');
        return;
      }
      let img = URL.createObjectURL(file)
      const head = event.currentTarget.parentElement;
      if (head.classList.contains('head'))
        head.querySelector('p').style.display = 'none';
      else
        head.querySelector('img').style.display = 'none';
      head.style.backgroundImage = `url(${img})`;
    },
    toggleModal() {
      this.md = !this.md;
    },
    confirmWechat() {
      this.wechat = this.newWechat;
      this.toggleModal();
    },
    getActivity() {
      this.axios.get('/static/activity.json').then(res => {
        this.activity = res.data.data;
      }).then(() => {
        new Swiper('.swiper-container', {
          loop: false,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next'
        });

      })
    }
  }
}
</script>
<style lang='less' scoped>
section {
  background-color: #fff;
  margin-bottom: 10px;
  >h3{
        color: #24bfe4;
    font-weight: normal;
    padding-left: .4rem;
    font-size: 1rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

input[type=file] {
  opacity: 0;
  z-index: 20;
}

.basic-info {
  padding: 15px 0 5px;
  aside {
    width: 6rem;
    .head {
      position: relative;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      margin: 10px auto;
      background-color: rgba(228, 223, 223, 0.8);
      background-size: cover;
      input {
        width: 5rem;
        height: 5rem;
      }
      p {
        width: 100%;
        color: #b1adad;
        padding: 5px;
        font-size: .8rem;
      }
    }
  }
  main {
    flex: 1;
    li {
      position: relative;
      vertical-align: top;
      margin-top: 10px;
      font-size: 16px;
      color: #333;
      span {
        &:first-child {
          display: inline-block;
          color: #333;
          font-weight: bold;
          vertical-align: top;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
      .icon {
          position: absolute;
          right: .1rem;
          top: .1rem;
          font-size: 1.1rem;
        }
    }
  }
}

.gallery {
  padding: 0 10px;
  width: 100%;
  .list-item {
    position: relative;
    overflow: hidden;
    margin: 10px 0;
    width: 30%;
    height: 4rem;
    border: 1px dashed #333;
    background-size: cover;
    background-position: center;
    input {
      width: 100%;
      height: 100%;
      vertical-align: 5px;
    }
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
  .list-item {
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
          vertical-align: 2px;
          padding: 2px 6px 0;
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
  color: #0092db;
  &::before {
    position: absolute;
    content: '';
    right: 7rem;
    top: 43%;
    width: 10px;
    height: 10px;
    border-top: 1px solid #0092db;
    border-right: 1px solid #0092db;
    transform: rotate(45deg) translateY(-50%);
  }
}

.activity-list {
  border: 1px dashed #ccc;
  color: #333;
  .list-item {
    padding: 10px 2rem;
    .img-cover {
      position: relative;
      padding-top: 25%;
      width: 5rem;
      margin-right: .4rem;
    }
    .activity-info {
      flex: 1;
      width: 1%;
      h2 {
        font-size: 14px;
        font-weight: normal;
      }
      div {
        font-size: 10px;
      }
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    transform: scale(.5);
    &.swiper-button-disabled {
      opacity: 0;
    }
  }
}

.product-list {
  font-size: 13px;
  color: #333;
  li {
    width: 30%;
    margin: .8rem 0;
    .img-cover {
      height: 5rem;
      img {
        height: 100%;
      }
    }
  }
}

.wechat-form {
  margin: 0 1rem;
  input {
    border: 1px solid #ccc;
    width: 95%;
    font-size: 14px;
    padding: .5rem;
    border-radius: 5px;
    &:focus {
      border-color: #1AAD19;
    }
  }
}

.wechat-btns {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #ccc;
  .btn {
    width: 50%;
    padding: .5rem 0;
    &:first-child {
      border-right: 1px solid #ccc;
    }
    &:active {
      background: #ccc;
    }
  }
}
</style>