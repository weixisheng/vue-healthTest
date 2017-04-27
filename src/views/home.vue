<template>
    <div class="homepage">
        <swiper :list="list"
                :loop='true'
                :auto='true'>
        </swiper>
        <div class="cell-list">
            <media-cell v-for="i in news"
                        :title="i.title"
                        :img-list="i.image_list"
                        :media-name="i.media_name"
                        :comment-count="i.comment_count"
                        :time="i.datetime"
                        :cover="i.image_url"
                        :source="i.source"
                        :video-img="i.video_detail_info?i.video_detail_info.detail_video_large_image.url:''"
                        :large-img="i.large_image_url?i.large_image_url:''"
                        :link="i.article_url"></media-cell>
        </div>
    </div>
</template>
<script>
import { Swiper } from 'vux'
import mediaCell from '../components/mediaCell'
import { mapMutations } from 'vuex'
export default {
    name: 'home',
    components: {
        Swiper, mediaCell
    },
    computed: {
        ...mapMutations(['setPageTitle', 'showLeft','showRight'])
    },
    created() {
        if (window.sessionStorage.getItem('username') !== 'admin') {
            this.$router.push({ name: 'index' })
            return
        }
        this.$store.commit('setPageTitle', '资讯')
        this.$store.commit('showLeft', false)
        this.$store.commit('showRight', false)
        this.getNews();
    },
    data() {
        return {
            list: [
                { img: '/static/1.jpg', title: '舌尖上的美食1' },
                { img: '/static/2.jpg', title: '舌尖上的美食2' },
                { img: '/static/3.jpg', title: '舌尖上的美食3' }
            ],
            news: []
        }
    },
    methods: {
        getNews() {
          let vm = this;
          this.axios.get('http://m.toutiao.com/list', {
            params: {
              tag: '__all__',
              ac: 'wap',
              count: 10,
              format: 'json_raw',
              as: 'A175782F08D5D6C',
              cp: '58F8E55C17866E1',
              min_behot_time: '1492671593'
            }
          })
            .then((response) => {
              let s = response.data.data;
              s.pop();
              vm.news = s;
            })
        }
    }
}
</script>

<style lang="less">

</style>
