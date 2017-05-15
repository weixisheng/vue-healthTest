<template>
    <div class="movie-wrapper" >
        <movie-item v-for="(item,index) in movieList" :key="index" :title="item.title" 
        :bg="item.images.large" :directors="item.directors" :cast="item.casts" 
        :rater="item.rating.stars | str2num" :score="item.rating.average" :label="item.genres" 
        :data-target='item.alt' @click.native="goMovie($event)"></movie-item>
    </div>
</template>
<script>
import MovieItem from 'components/movieItem'
import {go} from 'vux/src/libs/router'

export default {
    data() {
        return {
            movieList: []
        }
    },
    components: { MovieItem },
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
            })
        },
        goMovie(e){
            let target = e.currentTarget.dataset['target'];
            go(target,this.$router);
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

</style>