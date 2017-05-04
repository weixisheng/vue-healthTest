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
import JRoll from '../../node_modules/jroll/jroll.min'
export default {
    name: 'home',
    components: {
        mediaCell
    },
    created() {
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
    mounted() {
        this.myscroll = new JRoll('.homepage', {
            bounce: true
        });
        var vm = this;
        // 上拉加载
        this.myscroll.on('scrollEnd', function () {
            var r = this;//r=>jroll object(myscroll)
            if (r.y == r.maxScrollY) {
                vm.getNews('loadmore');
            }
        });
        // 下拉刷新
        this.myscroll.on('touchEnd', function () {
            var r = this;
            //  vm.loading = true;
            if (r.y > 40) {
                r.scrollTo(0, 0, 200)
                vm.getNews('pulldown');
            }
        });
    },
    methods: {
        getNews(action) {
            let vm = this;
            this.$store.commit('updateLoading', { isLoading: true });
            this.axios.get('/api/list', {
                params: {
                    tag: '__all__',
                    ac: 'wap',
                    count: 10,
                    format: 'json_raw',
                    as: 'A175782F08D5D6C',
                    cp: '58F8E55C17866E1',
                    min_behot_time: '1492671594'
                }
            })
                .then((response) => {
                    let s = response.data.data;
                    s.pop();
                    if (action == 'loadmore') {
                        vm.news = vm.news.concat(s);
                    }
                    else {
                        vm.news = s.concat(vm.news);
                    }
                    vm.$nextTick(function () {
                        vm.myscroll.refresh();
                        vm.$store.commit('updateLoading', { isLoading: false })
                    })
                }).catch(() => {
                    vm.news = [{
                        title: '这是错误返回.....', image_list: [], media_name: 'hishion', comment_count: 0,
                        datetime: '2017-01-01 00:00', image_url: '/static/news.png', article_url: ''
                    }]
                })
        }
    }
}

</script>

<style lang="less">
.homepage {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden
}
</style>
