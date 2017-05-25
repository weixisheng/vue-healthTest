<template>
    <div v-if='currentValue'>
        <div class="loading-mask"></div>
        <div class='loading-container'>
            <div class="loading-img" :style="{backgroundPositionY: -(y % 6)*5 + 'rem'}"></div>
            <div class="loading-text">{{text}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Loading',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: '加载中...'
        }
    },
    data() {
        return {
            currentValue: false,
            y: 0,
            timer: null
        }
    },
    created() {
        if (typeof this.value !== 'undefined') {
            this.currentValue = this.value;
        }
    },
    mounted() {

        this.timer = setInterval(() => {
            this.y++;
        }, 600);

    },
    beforeDestroy() {
        this.timer = null;
    },
    watch: {
        value: {
            handler(val) {
                this.currentValue = val;
            },
            immediate: true
        }
    }
}
</script>
<style lang="less">
@import '../assets/less/common';
@keyframes ellipse {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-50px);
    }
    100% {
        transform: translateY(0px);
    }
}
.loading-mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgb(255,255,255);
    }
.loading-container {
   .hv-cen;
    background: #fff;
    width: 5rem;
    height: 6rem;
    z-index: 5000;
    
    .loading-img {
        width: 100%;
        height: 5rem;
        background: url(/static/sprite.png) no-repeat left top;
        background-position: 5rem auto;
        transform: translateY(0);

        animation: ellipse .5s infinite linear;
    }
    .loading-text {
        color: #000;
        .v-fz-14;
        .text-center;
    }
}
</style>

