<template>
  <div>
    <article>
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
              <span class="publish-time">{{this.$route.query.time.slice(5)}}</span>
            </p>
          </div>
        </div>
      </header>
      <main>
        <div v-if="!detailInfo.video_play_count"  v-html="detailInfo.content"></div>
        
      </main>
      <footer></footer>
    </article>
  </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      detailInfo: {}
    }
  },
  created() {
    this.$store.commit('showLeft', true);
    this.$store.commit('setPageTitle', '资讯详情');
    this.getNewsDetail(this.$route.query.hash);
  },

  methods: {
    getNewsDetail(hash) {
      let vm = this;
      this.axios.get(`/toutiaoAPI/i${hash}/info/`).then(res => {
        vm.detailInfo = res.data.data;
        vm.$nextTick(function () {
          Array.from(document.querySelectorAll("img")).forEach(function (e) {
            e.style.width = '100%';
          })
        })
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
  main {
    margin-top: 10px;
    color: #333;
    font-size: 18px;
    line-height: 1.5;
  }
}
</style>