<template>
    <div class="cell-item" @click="goArticle">
        <a class="cell-item__link clearfix">
            <div class="item-detail"
                 v-if="imgList.length&&!cover">
                <h3 class="item-detail__title">{{title}}</h3>
                <div class="item-detail__imgs">
                    <ul>
                        <li class="item-detail__img"
                            v-for="i in imgList">
                            <img :src="i.url">
                        </li>
                    </ul>
                </div>
                <div class="item-detail__info">
                    <span class="c-blue">{{mediaName||source}}</span>
                    <span class="c-yellow">评论{{commentCount}}</span>
                    <span>{{time}}</span>
                </div>
            </div>
            <div class="item-detail simple clearfix"
                 v-else>
                <h3 class="item-detail__title">{{title}}</h3>
                <div class="item-detail__cover">
                    <img :src="cover || videoImg ||largeImg" onerror="src='/static/news.png'">
                </div>
                <div class="item-detail__info">
                    <span class="c-blue">{{mediaName||source}}</span>
                    <span class="c-yellow">评论{{commentCount}}</span>
                    <span>{{time}}</span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
import {go} from '../../node_modules/vux/src/libs/router'
export default {
    name: 'mediaCell',
    props: {
        title: String,
        imgList: Array,
        cover: String,
        mediaName: String,
        commentCount: Number,
        time: String,
        source: String,
        videoImg:String,
        largeImg:String,
        link:String
    },
    methods:{
        goArticle(){
           go(this.link, this.$router)
        }
    }
}
</script>
<style lang="less">
.clearfix {
    &:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
}

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
    border-bottom: 1px solid #eee;
    .cell-item__link {
        min-height: 84px;
        padding: .8rem 0;
        display: block;
        text-decoration: none;
        color: #aaa;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
}

.item-detail {
    h3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 400;
        font-size: 16px;
        height: 60px;
        line-height: 20px;
        color: #131313;
    }
    .item-detail__imgs {
        margin-top: .1rem;
        ul {
            list-style: none;
            display: flex;
            justify-content: space-between;
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
    .item-detail__title ,.item-detail__info{
        float: left;
        width: 70%;
    }
    .item-detail__cover {
        float: right;
        width: 30%;
        height: 4rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>