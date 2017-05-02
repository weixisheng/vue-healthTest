<template>
    <div class="homepage">
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
import mediaCell from '../components/mediaCell'
import { mapMutations } from 'vuex'
export default {
    name: 'home',
    components: {
        mediaCell
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
            news: []
        }
    },
    methods: {
        getNews() {
          let vm = this;
          this.axios.get('/api/list', {
            params: {
              tag: '__all__',
              ac: 'wap',
              count: 10,
              format: 'json_raw',
              as: 'A175782F08D5D6C',
              cp: '58F8E55C17866E1',
              min_behot_time: '1492671594'
            },
            withCredentials:true,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            responseType: 'json'
          })
            .then((response) => {
              let s = response.data.data;
              s.pop();
              vm.news = s;
            }).catch(()=>{
                vm.news=[{title:'这是错误返回.....',image_list:[],media_name:'hishion',comment_count:0,
                datetime:'2017-01-01 00:00',image_url:'/static/news.png',article_url:''}]
            })
        }
    }
}
</script>

<style lang="less">

</style>
