<template>
    <div class="tonic-item">
        <div class="product-img">
            <img :src="detail.appPhotoUrl" class="hv-cen" onerror="src='/static/logo.jpg'" @click="clickImg">
        </div>
        <div class="product-label">
            <span :class="[detail.hot?hotClass:'hidden']">热</span>
            <span :class="[detail.prom?promClass:'hidden']">促</span>
            <span :class="[detail.new?newClass:'hidden']">新</span>
            <span>{{detail.productFullName}}</span>
        </div>
        <div class="product-price clearfix">
            <div class="v-red">
                ￥<animated-integer :value="detail.productPrice"></animated-integer>
            </div>
            <div class="v-blue">
                <animated-integer :value="detail.productRetailPrice"></animated-integer>点
            </div>
        </div>
        <div v-if="showCount">
            <count :min='1' :max='300'></count>
            <div class="add2cart" @click="add2cart($event,detail)">
                <i class="fa fa-shopping-cart"></i>
            </div>
        </div>
    </div>
</template>
<script>

import animatedInteger from './animatedInteger'
import count from './count'
export default {
    props: {
        detail:{
            type:Object,
            default:function(){
                return {};
            }
        },
        showCount: {
            type: Boolean,
            default: false
        }
    },
    components: { animatedInteger, count },
    data() {
        return {
            hotClass: 'v-product-tag  v-bg-red',
            promClass: 'v-product-tag  v-bg-yellow',
            newClass: 'v-product-tag  v-bg-blue',
            defaultValue: 1
        }
    },
    methods: {
        add2cart(event,detail) {
            // var ct = $(event.currentTarget);
            // var con = ct.parents('.tonic-item');
            // var $img = $(con.find('.product-img img'));
            // var width = $img[0].width;
            // var height = $img[0].height;
            // var offset = $img.offset();
            // var bottom = $(window).height() - offset.top - height + $(window).scrollTop();
            // var right = $(window).width() - offset.left - width;
            // var src = $img.attr("src");
            // var m = document.createElement('img');
            // m.id = 'imgMoive';
            // var tt = `width:${width}px;height:${height}px;bottom:${bottom}px;right:${right}px;`;
            // m.style = `position:fixed;z-index:1000;${tt}-webkit-animation:end 1s ease-in-out;animation:end 1s ease-in-out`;
            // m.src = src;
            // document.body.appendChild(m);
            // setTimeout(() => {
            //     m.remove();
            // }, 1000);
            var ct = event.currentTarget;
            var img = ct.parentNode.parentNode.firstChild.firstChild;
            var width = img.clientWidth;
            var height = img.clientHeight;
            var bottom = window.innerHeight - img.getBoundingClientRect().bottom;
            var right = window.innerWidth - img.getBoundingClientRect().right;

            var src = img.src;
            var m = document.createElement('img');
            m.id = 'imgMoive';
            var tt = `width:${width}px;height:${height}px;bottom:${bottom}px;right:${right}px;`;
            m.style = `position:fixed;z-index:1000;${tt}-webkit-animation:end 1s cubic-bezier(0.82, -0.39, 0.82, 0.12);animation:end 1s cubic-bezier(0.82, -0.39, 0.82, 0.12)`;
            m.src = src;
            document.body.appendChild(m);

            setTimeout(() => {
                m.remove();
            }, 1000);
            let count = +ct.previousElementSibling.querySelector('input').value;
            detail = {...detail,...{count}};
            this.$store.commit('add2Cart',detail);
            this.$emit('cart-num');
        },
        clickImg() {
            this.$emit('click-img');
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/common';
.tonic-item {
    padding: 5px;
    background: #fff;
    margin: 1%;
    position: relative;
    box-sizing: border-box;
    .f-w(left, 48%);
    display: block;
    border: 1px solid rgba(234, 234, 21, 0.47);
    box-shadow: 0 0 5px rgba(31, 208, 216, 0.63);
    .product-img {
        width: 100%;
        overflow: hidden;
        padding: 50% 0;
        position: relative;
        img {
            width: 100%;
        }
    }
    .product-label {
        margin-top: 8px;
        margin-bottom: 5px;
        font-size: 15px;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        .multi-ellipsis(2);
        word-wrap: break-word;
        .v-product-tag {
            width: 17px;
            height: 17px;
            display: inline-block;
            line-height: 1.5;
            border-radius: 2px;
            color: #fff;
            font-size: 12px;
            .text-center;
            position: relative;
            top: -1px;
        }
    }
}

.product-price {
    font-size: 16px;
    >div:first-child {
        .fl;
    }
    >div:last-child {
        .fr;
    }
}

.add2cart {
    height: 30px;
    line-height: 30px;
    .f-w(right, 30px);
    font-weight: bold;
    .text-center;
    background: #e4bb91;
    color: #fff;
    font-size: 18px;
    border-radius: 5px;
}

@keyframes end {
    0% {
        border-radius: 50%;
    }
    50% {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
    100% {
        position: fixed;
        right: .5rem;
        bottom: 100px;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
}
</style>