<template>
    <div class="me-container">
        <div class="me-group">
            <div class="me-cell clearfix flex-center">
                <div class="me-head">
                    <img src="/static/head.png">
                </div>
                <div class="me-info">
                    <p>hishion</p>
                    <p class="v-fz-14">微信号:wwwwwwwwwww</p>
                </div>
                <div class="me-qrcode"
                     @click="showQrBox">
                    <qrcode value="wwwwwwwwwww"
                            type='canvas'
                            :size='30'
                            :fg-color="rdColor"></qrcode>
                </div>
    
            </div>
        </div>
    
        <div class="me-group"
             v-for="item in lists">
            <simple-cell v-for="c in item"
                         :link="c.link?c.link:''"
                         :padding="10">
                <span slot="icon"
                      :class="c.iconClass"></span>
                <label slot="label">{{c.label}}</label>
            </simple-cell>
        </div>
        <x-dialog v-model="showQr"
                  :hideOnBlur='true'>
            <div class="me-cell clearfix flex-center">
                <div class="me-head">
                    <img src="/static/head.png"
                         alt="">
                </div>
                <div class="me-info">
                    <p class="user"> <span class="fa fa-male"></span><span>hision</span></p>
                    <p class="address"> <span class="fa fa-map-marker"></span><span>挪威</span></p>
                </div>
            </div>
            <img src="/static/qr.png"
                 alt="">
            <p>扫一扫上面的二维码图案，加我微信</p>
        </x-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Qrcode, XDialog } from 'vux'
import SimpleCell from '../../components/simpleCell'
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
                    { iconClass: 'fa fa-star v-yellow v-fz-18', label: '收藏' },
                ],
                [
                    { iconClass: 'fa fa-credit-card v-red', label: '钱包', link: '/me/money' },
                    { iconClass: 'fa fa-credit-card-alt v-green', label: '卡包' }
                ],
                [
                    { iconClass: 'fa fa-smile-o v-yellow v-fz-18', label: '表情'}
                ],
                [
                    { iconClass: 'fa fa-cog', label: '设置', link: '/me/setting' }
                ]
            ],
            rdColor: '#' + Math.floor(Math.random() * 255 * 255 * 255 + 1).toString(16)
        }
    },
    created() {
        
        if (window.sessionStorage.getItem('username') !== 'admin') {
            this.$router.push({ name: 'index' });
            return;
        }
        this.$store.commit('setPageTitle', '我');
        this.$store.commit('showLeft', false);
        this.$store.commit('showRight', false);
    },
    methods: {
        showQrBox() {
            this.showQr = true;
        }
    },
        beforeRouteLeave: function (to, from, next) {
        this.$store.commit('showLeft',true)
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
    .me-head {
        width: 3.5rem;
        img {
            width: 100%;
        }
    }
    .me-info {
        flex: 1;
        margin-left: 1rem;
        p {
            color: #424242;
            text-align: left;
        }
    }
}

.me-qrcode {
    float: right;
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
</style>