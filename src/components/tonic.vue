<template>
    <div>
        <div class="tonic-item">
            <div class="product-img">
                <img :src="src"
                     class="hv-cen">
            </div>
            <div class="product-label">
                <span :class="[hot?hotClass:'hidden']">热</span>
                <span :class="[prom?promClass:'hidden']">促</span>
                <span :class="[new1?newClass:'hidden']">新</span>
                <span>{{productFullName}}</span>
            </div>
            <p class="product-price">
                <span class="v-red">优￥{{productPrice}}</span>
                <span class="fr v-blue">零￥{{productRetailPrice}}</span>
            </p>
        </div>
    </div>
</template>
<script>
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
        productPrice:Number,
        productRetailPrice:Number
    },
    data() {
        return {
            hotClass: 'v-product-tag  v-bg-red',
            promClass: 'v-product-tag  v-bg-yellow',
            newClass: 'v-product-tag  v-bg-blue'
        }
    },
    methods: {}
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
            border-radius: 5px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            position: relative;
            top: -1px;
        }
    }
}
</style>