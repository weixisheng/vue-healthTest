<template>
  <div class="detail-container">
    <section class="flex">
      <div class="main-pic">
        <img :src="mInfo.images.medium" alt="mInfo.title">
      </div>
      <div class="main-info">
        <rater :value="str2num(mInfo.rating.stars)" :max="5" active-color="#F56D4C" :font-size="12" disabled></rater>
        <span :style="{color:'#F56D4C',marginRight:'10px'}">{{mInfo.rating.average}}</span>
        <span>{{mInfo.ratings_count}}人评分</span>
        <ul>
          <li>上映时间：{{mInfo.year}}</li>
          <li>制作国家/地区：
            <span v-for="(i,ii) in mInfo.countries" :key="ii">{{i}}</span>
          </li>
          <li :style="{marginTop:'10px'}">影片类型：
            <span v-for="(j,jj) in mInfo.genres" class="type-label" :key="jj">{{j}}</span>
          </li>
        </ul>
        <p>
          <span :style="{color:'#f25'}">{{mInfo.wish_count}}</span>人想看</p>
        <p>
          <span :style="{color:'#2f5'}">{{mInfo.collect_count}}</span>人看过</p>
      </div>
    </section>
    <section>
      <div class="summary">{{mInfo.summary}}</div>
      <ul class="people-list director-list">
        <li v-for="(c,ci) in mInfo.directors" :key="ci">
          <img :src="c.avatars.small" alt="">
          <p>{{c.name}}</p>
          <p>导演</p>
        </li>
      </ul>
      <ul class="people-list actor-list">
        <li v-for="(a,ai) in mInfo.casts" :key="ai">
          <img :src="a.avatars.small" alt="">
          <p>{{a.name}}</p>
          <p>领衔主演</p>
        </li>
      </ul>
    </section>
    <section>
  
    </section>
  </div>
</template>
<script>
import Rater from 'vux/src/components/rater'
import { str2num } from 'components/mixin'
export default {
  name: "movieDetail",
  data() {
    return {
      mInfo: {}
    }
  },
  components: { Rater },
  created() {
    this.$store.commit('setPageTitle', this.$route.params.title);
    this.$store.commit('showLeft', true);
    this.getMovieInfo(this.$route.query.id);
  },
  mixins: [str2num],
  methods: {
    async getMovieInfo(id) {
      let res = await this.axios.get(`/movieAPI/v2/movie/subject/${id}`)
      this.mInfo = res.data
      // let res2 = await this.axios.get(`/movieAPI/v2/movie/subject/${id}/reviews`)
      // this.mInfo = {...this.mInfo,...res.data}
    }
  }
}
</script>
<style lang='less' scoped>
.detail-container {
  padding: .5rem;
}

ul {
  list-style: none;
}

.main-pic {
  margin-right: .5rem;
  img {
    width: 100%;
  }
}

.main-info {
  font-size: 12px;

  .type-label {
    color: #007722;
    border: 1px solid currentColor;
    padding: 2px 3px;
    margin-right: 3px;
  }
  p {
    margin: .4rem 0;
  }
}

.summary {
  border: 1px solid #f9f9f9;
  font-size: 16px;
  margin: 10px 0;
  padding: 5px;
  text-align: justify;
  color: #333;
  text-indent: 2em;
  box-shadow: 0 0 5px #2a8d46;
  border-radius: 5px;
}

.people-list {
  margin-top: 5px;
  li {
    position: relative;
    overflow: hidden;
    margin: 5px 0;
    padding: 5px 0;
    img {
      float: left;
      width: 2rem;
      margin-right: .5rem;
    }
    p {
      font-size: 16px;
      &:last-child {
        font-size: 14px;
      }
    }
    &::before{
      position: absolute;
      content: '';
      right: 5px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;

    }
    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      transform: scaleY(.5);
      background-color: #eee;
    }
  }
  &.director-list {
    p:last-child {
      color: #ff5400;
    }
  }
  &.actor-list {
    p:last-child {
      color: #0012ff;
    }
  }
}
</style>