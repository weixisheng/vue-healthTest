<template>
    <div class="container">
        <div class="result-container v-bg-lightgray">
            <div class="circle-box test-active text-center v-bg-yellow v-white">
                <div class="v-cen">
                    <p class="v-fz-11">您的肤质为</p>
                    <h1 class="v-fz-18">{{getTestResult}}</h1>
                </div>
            </div>
        </div>
    
        <div class="tonic-container" v-if="testResult!=='C'">
            <h2 class="h2 v-fz-15 text-center">推荐商品</h2>
            <div class="tonic-tabs flex space-between" v-if="testResult=='B'">
                <div class="tab-item v-fz-14 active" @click="changeTab" data-index="0">暖湿环境方案</div>
                <div class="tab-item v-fz-14" @click="changeTab" data-index="1">干冷环境方案</div>
                <div class="underline"></div>
            </div>
            <div class="tab-content">
                <div class="warm" v-if="testResult=='B' || testResult=='A'">
                    <tonic v-for="(w,index) in warmProduct" :detail="w" :show-count='true' @cart-num='cartNum' :key="index" @click-img="goDetail(w)"></tonic>
                </div>
                <div class="dry" v-if="testResult=='B' || testResult=='D'" :style="testResult=='B'?'transform:translateX(100%)':''">
                    <tonic v-for="(d,index) in dryProduct" :detail="d" :show-count='true' @cart-num='cartNum' :key="index" @click-img="goDetail(d)"></tonic>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            中性肌肤属于青少年，没有推荐商品
        </div>
        <div class="shopping-cart-right" @click="goBalance">
            <i class="fa fa-cart-arrow-down"></i>
            <span class="cart-count" v-show="cartCount">{{cartCount}}</span>
        </div>
        <alert v-model="showAlert" title="提示" content="请添加商品"></alert>
    </div>
</template>
<script>
import tonic from 'components/tonic'
import {Alert} from 'vux'
import { mapState } from 'vuex'
export default {
    name: "result",
    components: {
        tonic,Alert
    },
    data() {
        return {
            showAlert:false,
            tonicList: [],
            warmProduct: [],
            dryProduct: []
        }
    },
    computed: {
        ...mapState(['testResult', 'cartList']),
        getTestResult() {
            const TEST_RESULT = { 'A': '油性肌肤', 'B': '混合性肌肤', 'C': '中性肌肤', 'D': '干性肌肤' };
            return TEST_RESULT[this.testResult];
        },
        cartCount() {
            let num = 0;
            Object.values(this.cartList).forEach((item) => {
                num += item.count;
            })
            this.$store.commit('setCartCount', num);
            return num;
        }
    },
    
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit('showRight', true);
            vm.$store.commit('setTestResult', 'B')//测试
        })
    },
    
    created() {
        this.$store.commit('setPageTitle', '测试结果')
        this.$store.commit('showLeft', true)
        this.getRecommend();
    },
    methods: {
        getRecommend() {
            let self = this;
            this.axios.get('./static/recommend.json')
                .then((response) => {
                    let result = response.data
                    this.tonicList = result.data;
                    this.tonicList.forEach((i) => {
                        if (i.appPhotoUrl)
                            i.appPhotoUrl += "&imageView/2/2/h/250"
                    });
                    this.warmProduct = this.tonicList.slice(0, 9);
                    this.dryProduct = this.tonicList.slice(9);
                });
        },
        changeTab(event) {
            const tSF = 'transform' in document.createElement('div').style ? 'transform' : '-webkit-transform';
            const tabs = document.querySelectorAll('.tab-item');
            let tabsLength = tabs.length;
            const panels = document.querySelector('.tab-content').children;
            const underline = document.querySelector('.underline');
            var i = 0, j = 0;
            i = +event.currentTarget.dataset.index;
            j = tabsLength - i - 1;
            tabs[i].classList.add('active');
            tabs[j].classList.remove('active');

            if (i == 1) {
                panels[j].style[tSF] = `translateX(-100%)`;
                panels[i].style[tSF] = `translateX(0)`;
                // panels[j].style.transform = panels[j].style.webkitTransform = `translateX(-100%)`;
                // panels[i].style.transform = panels[i].style.webkitTransform = `translateX(0)`;
            }
            else {
                // panels[j].style.transform = panels[j].style.webkitTransform = `translateX(100%)`;
                // panels[i].style.transform = panels[i].style.webkitTransform = `translateX(0)`;
                panels[j].style[tSF] = `translateX(100%)`;
                panels[i].style[tSF] = `translateX(0)`;
            }

            let l = event.currentTarget.offsetLeft;
            // underline.style.transform = underline.style.webkitTransform = `translateX(${l}px)`;
            underline.style[tSF] = `translateX(${l}px)`;
        },
        cartNum() {
            var c = document.querySelector('.cart-count');
            c.classList.add('bounce');
            setTimeout(() => {
                c.classList.remove('bounce');
            }, 1500);
        },
        goDetail(product) {
            this.$router.push({ name: 'productDetail', params: { product } })
        },
        goBalance() {
            if (this.cartCount)
                this.$router.push({ name: 'balance' })
            else {
                this.showAlert = true;
            }
        }
    },
    mounted() {
        setTimeout(() => {

            const tabCon = document.querySelector(".tab-content"),
                tabItems = document.querySelectorAll(".tab-item");
            if (this.result == 'D') {
                tabCon.querySelector('.dry').style.transform = tabCon.querySelector('.dry').style.webkitTransform = 'translateX(0)'
            }
            var startX, moveX, differ;
            tabCon.addEventListener('touchstart', function (e) {
                var touch = e.targetTouches[0];
                startX = touch.pageX;
            }, false);
            tabCon.addEventListener('touchmove', function (e) {
                var touch = e.targetTouches[0];
                moveX = touch.pageX;
                differ = moveX - startX;
            }, false);
            tabCon.addEventListener('touchend', function (e) {
                //left-->right
                if (differ > 0 && differ > 50) {
                    if (tabItems[1].classList.contains('active')) {
                        tabItems[0].click();
                    }
                }
                //right-->left
                else if (differ < 0 && differ < -50) {
                    if (tabItems[0].classList.contains('active')) {
                        tabItems[1].click();
                    }
                }
            }, false);
        }, 500)
    }
    beforeRouteLeave(to, from, next) {
        this.$store.commit('showRight', false);
        next()
    }
}
</script>

<style lang="less" scoped>
.container {
    overflow-x: hidden;
}

.result-container {
    margin: 10px;
    padding: 4% 0;
    box-shadow: 0 0 5px 2px rgba(223, 223, 221, .55);
}

.circle-box {
    position: relative;
    width: 40%;
    margin: 0 auto;
    padding: 20% 0;
    border-radius: 50%;
    box-shadow: 0 0 5px 5px rgba(228, 187, 145, .64);
    text-align: center;
}

.circle-box>div {
    left: 0;
    right: 0;
}

.circle-box p {
    margin-bottom: 5px;
}

.circle-box h1 {
    margin-bottom: 10px;
}

.tonic-container h2 {
    margin-left: 0;
    padding: 10px 0;
    font-weight: bold;
}

.tonic-tabs {
    position: relative;
    margin: 0 15%;
}

.space-between {
    justify-content: space-between;
}

.tab-item {
    padding: 6px 0;
    transition: all .5s;
}

.tonic-tabs .active {
    color: #e4bb91;
}

.tab-content {
    overflow: hidden;
    >div {
        position: absolute;
        left: 0;
        width: 100%;
        transition: transform .5s;
    }
}

.tonic-tabs .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 84px;
    height: 2px;
    -webkit-transition: all .5s;
    transition: all .5s;
    border-radius: 1px;
    background: #e4bb91;
}

.shopping-cart-right {
    position: fixed;
    right: .4rem;
    bottom: 100px;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    background: rgba(31, 25, 25, 0.7);
    color: #fff;
    font-size: 1rem;
    span {
        position: absolute;
        top: -4px;
        right: 1px;
        width: 22px;
        height: 22px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 50%;
        font-size: 8px;
        color: #fff;
        background: rgba(31, 25, 25, 0.7);
    }
}

.bounce {
    animation: bounce 0.5s 3;
}

@keyframes bounce {
    0% {
        transform: scale(.8);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>
