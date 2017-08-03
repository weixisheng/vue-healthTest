<template>
  <div ref="top">
    <article v-if="status">
      <header>
        <h2>{{detailInfo.title}}</h2>
        <div class="author">
          <div class="author-img">
            <img :src="detailInfo.media_user.avatar_url" :alt="detailInfo.media_user.screen_name">
          </div>
          <div class="author-info">
            <p>
              <span>{{detailInfo.media_user.screen_name}}</span>
              <span class="toutiao-label">头条号</span>
            </p>
            <p>
              <span class="origin-label" v-show="detailInfo.is_original">原创</span>
              <span class="publish-time">{{this.$route.params.time.slice(5)}}</span>
            </p>
          </div>
        </div>
      </header>
      <main>
        <div v-html="detailInfo.content"></div>
      </main>
    </article>
  
    <article class="related-container" v-else>
      <h2 class="tips-header">这条资讯跑了，看看其他的吧...</h2>
      <section v-for="(item,index) in otherInfo" :key="index">
        <header class="related-header" @click="toggleCollapse(index)" :class="openIndex==index?'open':''">
          <h3 class="related-title ellipsis2">{{item.title}}</h3>
          <span class="collapse-arrow"></span>
        </header>
        <div class="related-abstract" v-show="openIndex==index">{{item.abstract}}</div>
        <ul class="img-list" v-if="item.image_list.length">
          <li v-for="(e,i) in item.image_list" :key="i">
            <img :src="e.url">
          </li>
        </ul>
        <ul class="img-list" v-else>
          <li v-for="(e,i) in item.large_image_list" :key="i">
            <img :src="e.url">
          </li>
        </ul>
        <div class="media-info">
          <span class="media-name" :class="{'toutiao':/头条/.test(item.source)?'red':''}">{{item.media_name || item.source}}</span>
        </div>
      </section>
    </article>
    <transition name="rotate">
      <footer @click="goTop" v-show="showTop">
        <div class="top-icon">
          <span class="top-text">回到顶部</span>
        </div>
      </footer>
    </transition>
  
  </div>
</template>
<script>
import throttle from 'lodash/throttle'
export default {
  name: "detail",
  data() {
    return {
      status: false,
      detailInfo: {},
      otherInfo: [],
      openIndex: -1,
      showTop: false
    }
  },
  created() {
    this.$store.commit('showLeft', true);
    this.$store.commit('setPageTitle', '资讯详情');
    this.getNewsDetail(this.$route.params.hash);
  },
  computed: {

  },
  mounted() {
    const topWrapper = this.$refs.top;
    topWrapper.addEventListener('scroll', throttle(() => {
      if (topWrapper.scrollTop > 500) this.showTop = true;
      else this.showTop = false;
    }, 500), false)
  },
  methods: {
    async getNewsDetail(hash) {
      let vm = this;
      this.$store.commit('updateLoading', { isLoading: true })
      let res = await this.axios.get(`/toutiaoAPI/i${hash}/info/`);
      this.status = res.data.success;
      if (this.status) {
        this.detailInfo = res.data.data;
        this.$nextTick(function () {
          Array.from(document.querySelectorAll("img")).forEach(function (e) {
            e.style.width = '100%';
          })
        })
        this.$store.commit('updateLoading', { isLoading: false })
      }
      else {
        this.axios.get(`https://m.toutiao.com/related/common/${hash}/`, {
          params: {
            offset: 0,
            count: 3,
            format: 'json',
            parent_rid: 31557229500254819560,
            aid: 13,
            city: '广州',
            page_type: 'article',
            related_article_count: 15,
            app_special_count: 5,
            slide_banner_count: 3,
          }
        }).then(res => {
          vm.otherInfo = res.data.data.related_article;
          this.$store.commit('updateLoading', { isLoading: false })
        })
      }
    },
    toggleCollapse(i) {
      if (this.openIndex == i) {
        this.openIndex = -1;
      }
      else this.openIndex = i;
    },

    goTop() {
      let w = this.$refs.top,
        timer = null;
      window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAniamtionFrame;
      window.cancelAnimationFrame(timer);
      timer = window.requestAnimationFrame(function smoothScroll() {
        var ct = w.scrollTop;
        if (ct > 0) {
          timer = window.requestAnimationFrame(smoothScroll);
          w.scrollTop -= ct / 5;
        }
        else {
          window.cancelAnimationFrame(timer);
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
article {
  padding: .5rem;
  header {
    h2 {
      font-size: 1rem;
      line-height: 1.2;
    }
    .author {
      display: flex;
      margin-top: 10px;
      .author-img {
        width: 2rem;
        height: 2rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .author-info {
        margin-left: 8px;
        font-size: 14px;
        .toutiao-label {
          margin-left: 5px;
          font-size: 12px;
          color: #fff;
          background-color: #ed4040;
          padding: 1px 2px;
          border-radius: 3px;
        }
        .origin-label {
          font-size: 10px;
          color: #333;
          border: 1px solid currentColor;
          padding: 0 2px;
          border-radius: 5px;
        }
        .publish-time {
          color: #999;
          vertical-align: middle;
        }
      }
    }
  }
  .tips-header {
    position: relative;
    margin-bottom: 1.5rem;
    font-size: .8rem;
    &::after {
      position: absolute;
      content: '相关阅读';
      width: 100%;
      left: 50%;
      top: 1rem;
      transform: translateX(-50%);
      color: #ccc;
      font-weight: normal;
      text-align: center;
      border-bottom: 1px solid #e3f1ed;
    }
  }
  main {
    margin-top: 10px;
    color: #333;
    font-size: 18px;
    line-height: 1.5;
  }
}

footer {
  position: fixed;
  right: 10px;
  bottom: 50px;
  .top-icon {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;
    &::before {
      position: absolute;
      content: '';
      top: 13px;
      left: 17px;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
    }
    &::after {
      position: absolute;
      content: '';
      top: 13px;
      left: 24px;
      width: 1px;
      height: 20px;
      background-color: #ccc;
    }
  }
  .top-text {
    position: absolute;
    left: 10px;
    bottom: 8px;
    font-size: 8px;
  }
}

.related-container {
  section {
    position: relative;
    padding: 5px 0;
    .related-header {
      display: flex;
      align-items: center;
      margin: 5px 0;
      .related-title {
        position: relative;

        line-height: 1.2;
        font-size: 18px;
        font-weight: normal;
        width: 90%;
        text-align: justify;
        flex: 1;
        margin-right: 10px;
      }
      .collapse-arrow {
        height: 8px;
        width: 8px;
        border-top: 1px solid #222;
        border-left: 1px solid #222;
        transform: rotate(45deg);
        transition: transform .2s;
      }
      &.open {
        .collapse-arrow {
          transform: rotate(225deg);
        }
      }
    }
    .related-abstract {
      color: #888;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .img-list {
      display: flex;
      li {
        margin: 0 5px;
        img {
          width: 100%;
        }
      }
    }
    .media-info {

      .media-name {
        font-size: 10px;
        padding: 2px 3px;
        border-radius: 3px;
        background-color: #8f2ef1;
        color: #fff;
        &.toutiao {
          background-color: red;
          border-bottom-left-radius: 0;
          border-top-left-radius: 7px;
          border-bottom-right-radius: 7px;
          border-top-right-radius: 0;
          padding: 2px 5px;
        }
      }
    }
    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #eee;
      transform: scaleY(.5);
    }
  }
}

.rotate-leave {
  transform: translateX(100px);
}

.rotate-enter {
  transform: rotate(1turn);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all .4s;
}
</style>