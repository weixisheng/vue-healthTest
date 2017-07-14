<template>
    <div class="movie-wrapper">
        <a class="movie-item clearfix" v-for="(item,index) in movieList" :key="index" :href='item.alt'>
            <div class="movie-bg">
                <img :src="item.images.large" class="bounce">
            </div>
            <div class="movie-title">{{item.title}}</div>
            <div class="movie-score">
                <p v-if="item.rating.stars>0">
                    <rater :value="item.rating.stars | str2num" :max="5" active-color="#ffbe00" :font-size="12" disabled></rater>
                    <span>{{item.rating.average}}</span>
                </p>
                <span v-else>暂未评分</span>
            </div>
            <div class="movie-directors">
                <span v-for="d in item.directors" :key='d.id'>{{d.name}}</span>
            </div>
            <div class="movie-label">
                <span v-for="(l,index) in item.genres" :key="`genres-${index}`">{{l}}</span>
            </div>
            <div class="movie-casts">
                <div class="movie-avator" v-for="c in item.casts" :key='c.id'>
                    <img :src="c.avatars.small" v-if="c.avatars">
                    <img src="https://img1.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png" v-else>
                    <p>{{c.name}}</p>
                </div>
            </div>
        </a>
    </div>
</template>
<script>
import Rater from 'vux/src/components/rater'

export default {
    name: 'movie',
    data() {
        return {
            movieList: []
        }
    },
    components: { Rater },
    created() {
        this.$store.commit('showLeft', false);
        this.$store.commit('showRight', false);
        this.$store.commit('setPageTitle', '电影');
        this.getMovie();
    },
    methods: {
        getMovie() {
            var vm = this;
            this.$store.commit('updateLoading', { isLoading: true })
            this.axios.get('/movieAPI/v2/movie/in_theaters').then((res) => {
                vm.movieList = res.data.subjects;
                vm.$store.commit('updateLoading', { isLoading: false })
            }).catch(() => {
                vm.$store.commit('updateLoading', { isLoading: false })
            })
        },
        goMovie(e) {
            let target = e.currentTarget.dataset['target'];
            go(target, this.$router);
        }
    },
    filters: {
        str2num(value) {
            if (!value) return 0;
            return Math.floor(value) / 10
        }
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
    span {
        font-size: 12px;
    }
    &>span {
        color: #aaa;
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
.bounce{
    animation: bounce 2s infinite;
}
@keyframes bounce{
    0%{
        transform: scale(.8);
    }
    25%{
        transform: scale(1);        
    }
    75%{
        transform: scale(1);        
    }
    100%{
        transform: scale(.8);
    }
}
</style>