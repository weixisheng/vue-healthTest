<template>
    <div v-load-more="loadData" :type="2">
        <div ref="container" class="picture-container">
            <div class="picture-item" v-for="(item,index) in jdRecommend" :key="index">
                <img v-lazy="item.imageurl">
            </div>
            <!--<load-more tip="正在加载..." v-show="loading"></load-more>-->
        </div>
        <div class="load-btn" v-if="false">
            <button @click="loadData">加载更多</button>
        </div>
    </div>
</template>
<script>
import { loadMore } from 'components/mixin'
import { LoadMore } from 'vux'

export default {
    name: 'pictures',
    components: {
        LoadMore
    },
    mixins: [loadMore],
    data() {
        return {
            jdRecommend: [],
            page: 1,
            loading: true
        }
    },
    created() {
        this.$store.commit('setPageTitle', '懒加载相册')
        this.getData();
    },
    methods: {
        async getData() {
            this.$store.commit('updateLoading', { isLoading: true });
            let res = await this.axios.get(`https://m.jd.com/index/recommend.action`, {
                params: {
                    _format_: 'json',
                    page: this.page

                }
            })
            this.$store.commit('updateLoading', { isLoading: false });
            this.loading = false;
            // .then(res => {
            var result = JSON.parse(res.data.recommend);
            this.jdRecommend = [...this.jdRecommend, ...result.wareInfoList];
            //  })
        },
        loadData() {
            this.page++;
            this.getData();
        }
    }

}
</script>
<style lang="less">
.picture-container {
    display: flex;
    flex-wrap: wrap;

    background-color: #f0f2f5;
    .picture-item {
        flex: 0 1 auto;
        width: 48%;
        padding: 25% 0;
        margin: 1% 1%;
        position: relative;
        overflow: hidden;
        background-color: #fff;
        img {
            width: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.load-btn {
    position: fixed;
    right: 0;
    bottom: 50px;
    padding: .3rem;
    button {
        border: 1px solid currentColor;
        border-radius: 3rem;
        padding: .2rem;
        color: red;
    }
}
</style>
