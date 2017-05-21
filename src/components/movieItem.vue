<template>
    <div class="movie-item clearfix">
        <div class="movie-bg">
            <img :src="bg">
        </div>
        <div class="movie-title">{{title}}</div>
        <div class="movie-score">
            <p v-if="rater>0">
            <rater v-model="rater" 
            :max="5" 
            active-color="#ffbe00"
            :font-size="12" disabled></rater>
            <span>{{score}}</span>
            </p>
            <span v-else>暂未评分</span>
        </div>
        <div class="movie-directors">
            <span v-for="d in directors" :key='d.id'>{{d.name}}</span>
        </div>
        <div class="movie-label">
            <span v-for="(l,index) in label" :key="`genres-${index}`">{{l}}</span>
        </div>
        <div class="movie-casts">
            <div class="movie-avator" v-for="c in cast" :key='c.id'>
                <img :src="c.avatars.small" v-if="c.avatars">
                <img src="https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png" v-else>
                <p>{{c.name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import Rater from 'vux/src/components/rater'
export default {
    name: "MovieItem",
    props: {
        title: String,
        bg: String,
        directors: Array,
        cast: Array,
        rater: Number,
        score:Number,
        label: Array
    },
    components:{
        Rater
    }
}
</script>
<style lang='less'>
.movie-item {
    padding: 1rem .5rem;
    border-bottom: 1px solid #15dc23;
}

.movie-bg {
    text-align: center;
}

.movie-title {
    font-weight: bold;
}

.movie-score {
    float: right;
    width: 30%;
    text-align: right;
    span{
        font-size:12px;
    }
    &>span{
        color:#aaa;
    }
}
.movie-directors span {
    margin-right: 10px;
    color: #4d00ff;
    font-size: 16px;
}
.movie-label {
    margin: 0 0 5px 0;
    span {
    display: inline-block;
    border: 1px solid #bc2826;
    background: #bc2826;
    color: #fff;
    margin-right: 10px;
    font-size: 12px;
    padding: 0 3px;
    border-radius: 5px;
}
}

.movie-casts {
    display: flex;
    justify-content: space-around;
}

.movie-avator img {
    margin: 0 auto;
    display: block;
    box-shadow: 0 0 5px #00ffdb;
}

.movie-avator p {
    font-size: 14px;
    text-align: center;
}
</style>