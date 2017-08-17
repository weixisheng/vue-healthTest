<template>
    <div class="homepage">
        <div class="cell-list">
            <div v-for="(item,index) in news" :key="index" class="cell-item" @click="showDetail(item)">
                <a class="cell-item__link clearfix">
                    <div class="item-detail" v-if="item.image_list.length&&!item.image_url">
                        <h3 class="item-detail__title">{{item.title}}</h3>
                        <div class="item-detail__imgs">
                            <ul>
                                <li class="item-detail__img" v-for="(i,j) in item.image_list" :key="j">
                                    <img :src="i.url">
                                </li>
                            </ul>
                        </div>
                        <div class="item-detail__info">
                            <span v-if="item.ad_label" class='ad-label'>{{item.ad_label}}</span>
                            <span class="c-blue">{{item.media_name||item.source}}</span>
                            <span class="c-yellow">评论{{item.comment_count}}</span>
                            <span>{{item.datetime}}</span>
                        </div>
                    </div>
                    <div class="item-detail simple clearfix" v-else>
                        <h3 class="item-detail__title">{{item.title}}</h3>
                        <div class="item-detail__cover">
                            <img :src="getImgPath(item.image_url,item.video_detail_info,item.large_image_url)">
                            <div class="video-time" v-if="item.video_duration">{{frtTime(item.video_duration)}}</div>
                            <div class="video-play" v-if="item.video_duration">
                                <span class="fa fa-play"></span>
                            </div>
                        </div>
                        <div class="item-detail__info">
                            <span class="c-blue">{{item.media_name||item.source}}</span>
                            <span class="c-yellow">评论{{item.comment_count}}</span>
                            <p>
                                <span v-if="item.ad_label" class='ad-label'>{{item.ad_label}}</span>{{item.datetime}}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>

import JRoll from 'jroll/build/jroll.min'
import { go } from 'vux/src/libs/router'
export default {
    name: 'information',
    data() {
        return {
            news: []
        }
    },
    computed: {
    },
    created() {
        this.$store.commit('setPageTitle', '资讯')
        this.$store.commit('showLeft', false)
        this.$store.commit('showRight', false)
        this.getNews();
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
                vm.getNews('pulldown');
                r.scrollTo(0, 0, 200)
            }
        });
    },
    methods: {
        getNews(action) {
            let vm = this;
            let text = action == 'pulldown' ? '刷新中...' : '加载中...';
            this.$store.commit('updateLoading', { isLoading: true, text });
            this.axios.get('/toutiaoAPI/list', {
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
                        // vm.news = vm.news.concat(s);
                        vm.news = [...vm.news, ...s];
                    }
                    else {
                        // vm.news = s.concat(vm.news);
                        vm.news = [...s, ...vm.news];
                    }
                    vm.$nextTick(function () {
                        vm.myscroll.refresh();
                        vm.$store.commit('updateLoading', { isLoading: false })
                    })
                }).catch(() => {
                    vm.axios.get('/static/information.json').then(res => {
                        vm.news = res.data.data;
                        vm.$nextTick(function () {
                            vm.myscroll.refresh();
                            vm.$store.commit('updateLoading', { isLoading: false })
                        })
                    })
                    
                })
        },
        getImgPath(img1, video, img2) {
            if (img1)
                return img1;
            else if (video)
                return video.detail_video_large_image.url;
            else if (img2)
                return img2;
            else
                return '/static/news.png';
        },
        frtTime(t) {
            //t->205
            let min = parseInt(t / 60);
            // min = min < 10 ? '0' + min : min;
            min = min.toString().padStart(2, '0');
            let sec = t % 60;
            // sec = sec < 10 ? '0' + sec : sec;
            sec = sec.toString().padStart(2, '0');
            return `${min}:${sec}`;
        },
        showDetail(item) {
            if (!item.video_duration) {
                this.$router.push({
                    name: 'informationDetail',
                    query: {
                        id: item.group_id
                    },
                    params: {
                        hash: item.item_id,
                        time: item.datetime
                    }
                })
            }
            else {
                go(item.url, this.$router);
            }
        }
    }
}

</script>

<style lang="less">
@import '../../assets/less/common';
.c-blue {
    color: blue;
}

.c-yellow {
    color: #ff0045;
}

.cell-item {
    position: relative;
    margin: 0 1rem;
    transition: all .5s ease-in-out;
    border-bottom: 1px solid #f9f9f9;
    .cell-item__link {
        min-height: 84px;
        padding: .8rem 0 .2rem;
        display: block;
        text-decoration: none;
        color: #aaa;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
}

.item-detail {
    h3 {
        .multi-ellipsis(3);
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #222;
    }
    .item-detail__imgs {
        margin-top: .1rem;
        ul {
            list-style: none;
            .flex;
            .just-cont(space-between);
            li {
                height: 4rem;
                padding: 0 3px;
                img {
                    width: 100%;
                }
            }
        }
    }
    .item-detail__info {
        color: #999;
        margin-top: .1rem;
        font-size: 10px;
    }
}

.simple {
    .item-detail__title,
    .item-detail__info {
        .f-w(left, 70%);
    }
    .item-detail__cover {
        .f-w(right, 30%);
        height: 4rem;
        img {
            width: 100%;
            height: 100%;
        }
        .video-time {
            position: absolute;
            top: .8rem;
            font-size: 10px;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 2px 8px;
            border-radius: 5px;
        }
        .video-play {
            position: absolute;
            top: 40%;
            right: 10%;
            color: #fff;
        }
    }
}

.ad-label {
    color: #e4c;
    font-size: 8px;
    border: 1px solid currentColor;
    border-radius: 2px;
    padding: 2px;
    margin-right: 5px;
}
</style>
