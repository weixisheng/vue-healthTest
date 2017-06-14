<template>
    <div class="container">
        <div class="result-container v-bg-lightgray">
            <div class="circle-box test-active text-center v-bg-yellow v-white">
                <div class="v-cen">
                    <p class="v-fz-11">您的肤质为</p>
                    <h1 class="v-fz-18">{{testResult}}</h1>
                </div>
            </div>
        </div>
    
        <div class="tonic-container">
            <h2 class="h2 v-fz-15 text-center">推荐商品</h2>
            <div class="tonic-tabs flex space-between">
                <div class="tab-item v-fz-14 active" @click="changeTab" data-index="0">暖湿环境方案</div>
                <div class="tab-item v-fz-14" @click="changeTab" data-index="1">干冷环境方案</div>
                <div class="underline"></div>
            </div>
            <div class="tab-content">
                <div class="warm">
                    <tonic v-for="w in warmProduct" :src="w.appPhotoUrl" :hot="w.hot" :prom="w.prom" :new1="w.new" :product-full-name="w.productFullName" :product-price="w.productPrice" :product-retail-price="w.productRetailPrice" :show-count='true' @cart-num='cartNum'></tonic>
                </div>
                <div class="dry">
                    <tonic v-for="d in dryProduct" :src="d.appPhotoUrl" :hot="d.hot" :prom="d.prom" :new1="d.new" :product-full-name="d.productFullName" :product-price="d.productPrice" :product-retail-price="d.productRetailPrice" :show-count='true' @cart-num='cartNum'></tonic>
                </div>
            </div>
        </div>
        <div class="shopping-cart-right">
            <i class="fa fa-cart-arrow-down"></i>
            <span class="cart-count" v-show="cartCount">{{cartCount}}</span>
        </div>
    </div>
</template>
<script>
import tonic from 'components/tonic'
import { mapState } from 'vuex'
export default {
    name: "result",
    components: {
        tonic
    },
    computed: {
        ...mapState(['cartCount']),
        testResult() {
            const TEST_RESULT = ['干性肌肤', '油性肌肤', '中性肌肤', '混合性肌肤'];
            let i = Math.floor(Math.random() * TEST_RESULT.length);
            return TEST_RESULT[i];
        }
    },
    data() {
        return {
            tonicList: [],
            warmProduct: [],
            dryProduct: []
        }
    },

    created: function () {
        this.$store.commit('setPageTitle', '测试结果')
        this.$store.commit('showLeft',true)
        this.getRecommend();
    },
    methods: {
        getRecommend() {
            let self = this;
            this.axios.get('./static/recommend.json')
                .then(function (response) {
                    let result = response.data
                    self.tonicList = result.data;
                    self.tonicList.forEach((i) => {
                        if (i.appPhotoUrl)
                            i.appPhotoUrl += "&imageView/2/2/h/250"
                    });
                    self.warmProduct = self.tonicList.slice(0, 9);
                    self.dryProduct = self.tonicList.slice(9);
                });
        },
        changeTab(event) {
            // var tabs = $(".tonic-tabs>.tab-item"),
            //     panels = $(".tab-content>div"),
            //     underline = document.querySelector('.underline');
            // var index = event.currentTarget.dataset.index;
            // var target = panels.eq(index);
            // tabs.eq(index).addClass("active").siblings("div").removeClass("active");
            // target.removeClass("hidden").siblings("div").addClass("hidden");
            const tabs = document.querySelectorAll('.tab-item');
            let tabsLength = tabs.length;
            const panels = document.querySelector('.tab-content').children;
            const underline = document.querySelector('.underline');
            var i =0,j=0;
             i = +event.currentTarget.dataset.index;
             j = tabsLength - i - 1;
            tabs[i].classList.add('active');
            tabs[j].classList.remove('active');
            // panels[i].classList.remove('hidden');
            // panels[j].classList.add('hidden');
            if (i == 1) {
                
                panels[j].style.transform = panels[j].style.webkitTransform = `translateX(-100%)`;
                panels[i].style.transform = panels[i].style.webkitTransform = `translateX(0)`;
            }
            else{
                panels[j].style.transform = panels[j].style.webkitTransform = `translateX(100%)`;
                panels[i].style.transform = panels[i].style.webkitTransform = `translateX(0)`;
            }

            let l = event.currentTarget.offsetLeft;
            underline.style.transform = underline.style.webkitTransform = `translateX(${l}px)`;
        },
        cartNum() {
            var c = document.querySelector('.cart-count');
            c.classList.add('bounce');
            setTimeout(() => {
                c.classList.remove('bounce');
            }, 1500);
        }
    },
    mounted() {
        const tabCon = document.querySelector(".tab-content"),
            tabItems = document.querySelectorAll(".tab-item");

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
.space-between{
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

    .dry {
        transform: translateX(100%)
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
