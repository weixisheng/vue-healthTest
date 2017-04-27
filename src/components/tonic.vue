<template>
    <div class="tonic-item">
        <div class="product-img">
            <img :src="src"
                 class="hv-cen"
                 onerror="src='/static/logo.jpg'">
        </div>
        <div class="product-label">
            <span :class="[hot?hotClass:'hidden']">热</span>
            <span :class="[prom?promClass:'hidden']">促</span>
            <span :class="[new1?newClass:'hidden']">新</span>
            <span>{{productFullName}}</span>
        </div>
        <div class="product-price clearfix">
            <div class="fl v-red">
                <animated-integer :value="productPrice"></animated-integer>
            </div>
            <div class="fr v-blue">
                <animated-integer :value="productRetailPrice"></animated-integer>
            </div>
        </div>
        <div v-if="showCount">
            <count :min='1'
                   :max='300'></count>
            <div class="add2cart fr"
                 @click="add2cart">
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
        src: {
            type: String,
            default: "./static/default.png"
        },
        hot: {
            type: Boolean,
            default: false
        },
        prom: {
            type: Boolean,
            default: false
        },
        new1: {
            type: Boolean,
            default: false
        },
        productFullName: String,
        productPrice: Number,
        productRetailPrice: Number,
        showCount:{
            type:Boolean,
            default:false
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
        add2cart(event) {
            var ct = $(event.currentTarget);
            var con = ct.parents('.tonic-item');
            var $img = $(con.find('.product-img img'));
            var width = $img[0].width;
            var height = $img[0].height;
            var offset = $img.offset();
            
            var bottom = $(window).height() - offset.top - height + $(window).scrollTop();
            var right = $(window).width() - offset.left - width;
            var src = $img.attr("src");
            var m = document.createElement('img');
            m.id = 'imgMoive';
            var tt = `width:${width}px;height:${height}px;bottom:${bottom}px;right:${right}px;`;
            m.style = `position:fixed;z-index:1000;${tt}-webkit-animation:end 1s ease-in-out;animation:end 1s ease-in-out`;
            m.src = src;
            document.body.appendChild(m);
            setTimeout(() => {
                m.remove();
            }, 1000);
            this.$store.commit('addCartCount');
            this.$emit('cart-num');
        }
    }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/common.less';
.tonic-item {
    padding: 5px;
    background: #fff;
    width: 48%;
    margin: 1%;
    position: relative;
    box-sizing: border-box;
    float: left;
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
        overflow: hidden;
        margin-top: 8px;
        margin-bottom: 5px;
        font-size: 15px;
        line-height: 20px;
        height: 40px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        .v-product-tag {
            width: 17px;
            height: 17px;
            display: inline-block;
            line-height: 1.5;
            border-radius: 2px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            position: relative;
            top: -1px;
        }
    }
}

.product-price {
    font-size: 16px;
}

.add2cart {
    height: 30px;
    line-height: 30px;
    width: 30px;
    font-weight: bold;
    text-align: center;
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