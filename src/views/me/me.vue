<template>
    <div class="me-container">
        <div class="me-group">
            <div class="me-cell clearfix flex-center">
                <div class="me-head">
                    <img src="/static/head.png">
                </div>
                <div class="me-info">
                    <p>hishion</p>
                    <p class="v-fz-14">微信号:wxs</p>
                </div>
                <div class="me-qrcode fr" @click="showQrBox">
                    <qrcode value="wxs" type='canvas' :size='30' :fg-color="rdColor"></qrcode>
                </div>

            </div>
        </div>

        <div class="me-group" v-for="item in lists">
            <simple-cell v-for="c in item" :link="c.link?c.link:''" :padding="10">
                <span slot="icon" :class="c.iconClass"></span>
                <label slot="label">{{c.label}}</label>
            </simple-cell>
        </div>
        <x-dialog v-model="showQr" :hideOnBlur='true'>
            <div class="me-cell clearfix flex-center">
                <div class="me-head">
                    <img src="/static/head.png" alt="">
                </div>
                <div class="me-info">
                    <p class="user"> <span class="fa fa-male"></span><span>hision</span></p>
                    <p class="address"> <span class="fa fa-map-marker"></span><span>挪威</span></p>
                </div>
            </div>
            <img src="/static/qr.png" alt="">
            <p>扫一扫上面的二维码图案，加我微信</p>
        </x-dialog>
        <div class="side-bar">
            <div class="side-layer"></div>
            <div class="side-content">
                <div class="top-info clearfix">
                    <qrcode value="华圣灵魂" type='canvas' :size='20' :fg-color="rdColor" class='me-qrcode'></qrcode>
                    <div class="flex-center">
                        <div class="me-head">
                            <img src="/static/head.png">
                        </div>
                        <div class="me-info">
                            <p class="v-fz-20 v-white">华圣灵魂</p>
                        </div>
                    </div>
                </div>
                <div class="me-group">
                    <simple-cell :padding="10" v-for="(item,index) in lists2" :key="index">
                        <span slot="icon" :class="item.iconClass"></span>
                        <label slot="label">{{item.label}}</label>
                    </simple-cell>
                </div>
                <div class="bottom-info flex-center">
                    <p>
                        <span class="fa fa-gear"></span>设置
                    </p>
                    <p>
                        <span class="fa fa-moon-o"></span>夜间
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Qrcode, XDialog } from 'vux'
import SimpleCell from 'components/simpleCell'
export default {
    name: "me",
    computed: {
    },
    components: {
        Qrcode, XDialog, SimpleCell
    },
    data() {
        return {
            showQr: false,
            lists: [
                [
                    { iconClass: 'fa fa-picture-o v-blue', label: '相册', link: '/me/pictures' },
                    { iconClass: 'fa fa-star v-yellow v-fz-18', label: '收藏'},
                ],
                [
                    { iconClass: 'fa fa-credit-card v-red', label: '钱包', link: '/me/money' },
                    { iconClass: 'fa fa-credit-card-alt v-green', label: '卡包' }
                ],
                [
                    { iconClass: 'fa fa-smile-o v-yellow v-fz-18', label: '表情' }
                ],
                [
                    { iconClass: 'fa fa-cog', label: '设置', link: '/me/setting' },
                    { iconClass: 'fa fa-heartbeat', label: 'XSS', link: '/me/xss' }
                ]
            ],
            lists2: [
                { iconClass: 'fa fa-universal-access v-yellow', label: '了解会员特权' },
                { iconClass: 'fa fa-credit-card v-red', label: 'QQ钱包' },
                { iconClass: 'fa fa-paw v-green', label: '个性装扮' },
                { iconClass: 'fa fa-star v-yellow', label: '我的收藏' },
                { iconClass: 'fa fa-image v-blue', label: '我的相册' },
                { iconClass: 'fa fa-file', label: '我的文件' },
                { iconClass: 'fa fa-calendar v-yellow', label: '我的日程' }
            ],
            rdColor: '#' + Math.floor(Math.random() * 255 * 255 * 255 + 1).toString(16)
        }
    },
    created() {
        this.$store.commit('setPageTitle', '我');
        this.$store.commit('showLeft', false);
        this.$store.commit('showRight', false);
    },
    methods: {
        showQrBox() {
            this.showQr = true;
        },
        hideLayer() {
            $('.side-content').css({
                'transform': 'translateX(-100%)'
            })
            $('.side-layer').css({
                'display': 'none'
            })
        }
    },
    mounted() {
        var main = document.querySelector('.me-container');
        let startX, endX;
        main.addEventListener('touchstart', function (e) {
            $('.side-content').css({
                'left':  '0'
            })
            let touch = e.changedTouches[0];
            startX = touch.pageX;
            $('.side-bar').css({
                'display': 'block'
            })
        }, false);
        main.addEventListener('touchmove', function (e) {
            let touch = e.changedTouches[0];
            endX = touch.pageX;
            var diff = endX - startX;
            let sideContent = document.querySelector('.side-content');
            let width = ~~(window.getComputedStyle(sideContent).width).replace('px','');
            if (diff > width/2) diff = width;
            if (diff < 0) {
                $('.side-bar').css({
                    'display': 'none'
                })
                return;
            };
            $('.side-content').css({
                'left':  diff + 'px'
            })
        }, false);
        main.addEventListener('touchend', function (e) {
            // let diff = endX - startX;
            // if (diff > 0) {
            //     $('.side-content').css({
            //         'transform': 'translateX(-100%)'
            //     })
            //     $('.side-bar').css({
            //         'display': 'none'
            //     })
            // }
        }, false);
    },
    beforeRouteLeave: function (to, from, next) {
        this.$store.commit('showLeft', true)
        next()
    }
}
</script>

<style lang="less" scoped>
.mt(@p: 20px) {
    margin-top: @p;
}

.me-container {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #efefef;
    font-size: 16px;
    color: #333;
}

.me-group {
    .mt();
}

.me-cell {
    padding: 10px;
    background: #fff;

    .me-info {
        flex: 1;
        p {
            color: #424242;
            text-align: left;
        }
    }
}

.me-head {
    width: 3.5rem;
    margin-right: 10px;
    img {
        width: 100%;
    }
}

.me-qrcode {
    >div {
        transform: scale(.5);
    }
}

.flex-center {
    display: flex;
    align-items: center;
}

.user {
    font-size: 14px;
    color: #333;
    span {
        &:first-child {
            margin-right: 5px;
            color: blue;
        }
    }
}

.address {
    font-size: 12px;
    color: #eee;
    span {
        &:first-child {
            margin-right: 5px;
            color: green;
        }
    }
}

.side-bar {
    display: none;
    .side-content {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 80%;
        background: #fff;
        z-index: 1000;
        transform: translateX(-100%);
        transition: left .5s;
    }
}

.top-info {
    background: url(/static/info-bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 30% 30%;
    padding: 1rem .5rem;
    >.me-qrcode {
        text-align: right;
    }
    .me-head {
        img {
            border: 1px solid #fff;
            border-radius: 50%;
        }
    }
}

.bottom-info {
    position: fixed;
    bottom: 0;
    padding-left: 10px;
    padding-bottom: 10px;
    color: #545252;
    p {
        margin-right: 1rem;
        span {
            margin-right: 5px;
        }
    }
}
</style>
