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
        <li v-for="(c,ci) in mInfo.directors" :key="ci" @click="getCelebrity(c.id)">
          <img :src="c.avatars.small" alt="">
          <p>{{c.name}}</p>
          <p>导演</p>
        </li>
      </ul>
      <ul class="people-list actor-list">
        <li v-for="(a,ai) in mInfo.casts" :key="ai" @click="getCelebrity(a.id)">
          <img :src="a.avatars.small" alt="">
          <p>{{a.name}}</p>
          <p>领衔主演</p>
        </li>
      </ul>
    </section>
    <transition name="fade">
      <section class='celebrity-container' v-show="showCelebrity">
        <header>
          <h3>
            <span>{{celebrity.name}}</span>
            <span v-if="celebrity.name_en">{{celebrity.name_en}}</span>
          </h3>
          <div class="close" @click="showCelebrity = false">
            <span class="fa fa-power-off" style="color:red"></span>
          </div>
        </header>
        <main>
          <div class="basic-wrapper flex">
            <div class="basic-cover" v-if="celebrity.aka_en[0]">
              <img :src="getImg(celebrity.avatars.medium)" :alt="celebrity.name">
            </div>
             <div class="basic-cover" v-else>
              <img :src="getImg(celebrity.avatars.small)" :alt="celebrity.name">
            </div>
            <ul class="basic-info">
              <li>性别：{{celebrity.gender}}</li>
              <li v-if="celebrity.born_place">出生地：{{celebrity.born_place}}</li>
              <li class="aka" v-if="celebrity.aka[0]">更多中文名：
                <span v-for="(i,j) in celebrity.aka" :key="j">{{i}}</span>
              </li>
              <li class="aka" v-if="celebrity.aka_en[0]">更多外文名：
                <span v-for="(m,n) in celebrity.aka_en" :key="n">{{m}}</span>
              </li>
            </ul>
          </div>
          <ul class="subject-list">
            <li class="list-header">影视作品</li>
            <li v-for="(item,index) in celebrity.works" :key="index" class="flex">
              <div class="subject-cover">
                <img :src="item.subject.images.small" alt="">
              </div>
              <div class="subject-info">
                <h4>{{item.subject.title}}</h4>
                <div>
                  <span v-for="(r,ri) in item.roles" :key="ri" style="color:#6de66b;">{{r}}</span>
                  <p class="subject-rating">
                  <rater :value="str2num(item.subject.rating.stars)" :max="5" active-color="#F56D4C" :font-size="12" disabled></rater>
                  <span :style="{color:'#333',marginRight:'10px'}">{{item.subject.rating.average}}</span>
                  </p>
                </div>
                <div>({{item.subject.year}})
                  <span v-for="(g,gi) in item.subject.genres" :key="gi">{{g}}</span>
                </div>
              </div>
            </li>
          </ul>
        </main>
      </section>
    </transition>
    <loading v-model="showLoading" text="人物资料加载中请稍后..."></loading>
  </div>
</template>
<script>
import {Loading, Rater} from 'vux'

import { str2num } from 'components/mixin'
export default {
  name: "movieDetail",
  data() {
    return {
      mInfo: {},
      celebrity: {},
      showCelebrity: false,
      showLoading:false
    }
  },
  components: {Loading, Rater },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getMovieInfo(vm.$route.query.id);
    })
  },
  created() {
    this.$store.commit('setPageTitle', this.$route.params.title || this.mInfo.title);
    this.$store.commit('showLeft', true);
  },
  updated(){
    this.$store.commit('setPageTitle', this.mInfo.title);    
  },
  mixins: [str2num],
  methods: {
    async getMovieInfo(id) {
      this.$store.commit('updateLoading', { isLoading: true })
      let res = await this.axios.get(`/movieAPI/v2/movie/subject/${id}`)
      this.mInfo = res.data
      // let res2 = await this.axios.get(`/movieAPI/v2/movie/subject/${id}/reviews`)
      // this.mInfo = {...this.mInfo,...res.data}
      this.$store.commit('updateLoading', { isLoading: false })
      this.initCelebrity(this.mInfo.casts[0].id);
    },
    async initCelebrity(id) {
      let res = await this.axios.get(`/movieAPI/v2/movie/celebrity/${id}`)
      this.celebrity = res.data;
    },
    getCelebrity(id) {   
      this.showLoading = true;
      this.axios.get(`/movieAPI/v2/movie/celebrity/${id}`).then(res => {
          this.celebrity = res.data;
          this.showCelebrity = true;  
          this.showLoading = false;     
      })
    },
    getImg(path) {
      return path ? path : '/static/head.png';
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
    &::before {
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

.celebrity-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  padding: 8px;
  background: #fff;
  overflow: scroll;
  header {
    h3 {
      font-size: 18px;
      margin: 10px 0;
      span {
        margin-right: 5px;
      }
    }
    .close {
      position: absolute;
      right: 5px;
      width: 20px;
      height: 20px;
      top: 5px;
    }
  }
  main {
    .basic-wrapper {
      align-items: center;
      .basic-cover {
        float: left;
        margin-right: 5px;
        img {
          width: 100%;
        }
      }
      .basic-info {
        font-size: 14px;
        li.aka {
          span {
            margin-right: 5px;
          }
        }
      }
    }
    .subject-list {
      .list-header {
        font-size: 16px;
        color: #ea5f1a;
      }
      li:not(.list-header) {
        padding: 5px 0;
        .subject-cover {
          width: 3rem;
          height: 3rem;
          margin-right: .5rem;
          img {
            width: 100%;
            height: inherit;
          }
        }
        .subject-info {
        flex: 1;
          h4 {
            font-size: .8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            font-size: 12px;
            position: relative;
            .subject-rating{
              position: absolute;
              right: 0;
              top:0;
            }
            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>