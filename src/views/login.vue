<template>
    <div>
        <div class="login-container">
            <div class="user-info clearfix">
                <div class="bg-head"></div>
                <p class="username">{{username}}</p>
            </div>
            <form class="login-form"
                  autocomplete="off">
                <div class="input-group">
                    <label for="login-username">
                        <span class="fa fa-user-o"></span> </label>
                    <input type="text"
                           class="login-username"
                           placeholder="请输入用户名"
                           v-model="username"
                           id="login-username"
                           autocomplete="off">
                </div>
                <div class="input-group">
                    <label for="login-password">
                        <span class="fa fa-unlock-alt"></span> </label>
                    <input type="password"
                           class="login-password"
                           placeholder="请输入密码"
                           v-model="password"
                           id="login-password"
                           autocomplete="off"
                           v-on:keyup.enter="login">
                </div>
            </form>
            <div class="login-btn">
                <button class="v-bg-blue"
                        @click="login">登录</button>
                <button class="v-bg-red"
                        @click="register">注册</button>
            </div>
        </div>
        <x-dialog v-model="showHideOnBlur"
                  class="register-dialog"
                  :hideOnBlur="true">
            <p class="dialog-title">注册</p>
            <form class="register-form"
                  autocomplete="off">
                <div class="input-group">
                    <label for="register-username">
                        <span class="fa fa-user-o"></span> </label>
                    <input type="text"
                           class="register-username"
                           placeholder="请输入用户名"
                           id="register-username"
                           autocomplete="off">
                </div>
                <div class="input-group">
                    <label for="register-password">
                        <span class="fa fa-unlock-alt"></span> </label>
                    <input type="password"
                           class="register-password"
                           placeholder="请输入密码"
                           id="register-password"
                           autocomplete="off">
                </div>
            </form>
            <div class="register-btn">
                <button class=""
                        @click='doReg'>确认</button>
            </div>
            <span class="vux-close"
                  @click="showHideOnBlur=false"></span>
        </x-dialog>
        <alert v-model="showValue"
               title="提示"
               :content="alertCon"></alert>
    </div>
</template>

<script>
import { go } from '../../node_modules/vux/src/libs/router'
import { XDialog, Alert } from 'vux'
import {mapMutations} from 'vuex'
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            showHideOnBlur: false,
            showValue: false,
            alertCon: '登录信息有误，请重试！'
        }
    },
    components: {
        XDialog, Alert
    },
   
    created: function () {
        this.$store.commit('setPageTitle','登录')
    },
    watch: {
        username: function (val) {
            var a = document.querySelector(".bg-head");
            var u = window.getComputedStyle(a).background;
            if (val == 'admin') {
                a.style.background = u.replace(/default.png/, 'logo.jpg')
            }
            else {
                a.style.background = u.replace(/logo.jpg/, 'default.png');
            }
        }
    },
    methods: {
        login: function () {
            if (this.username == 'admin' && this.password == '1') {
                window.sessionStorage.setItem('username', this.username)
                go('home', this.$router);
            }
            else {
                this.alertCon='登录信息有误，请重试！';
                this.showValue = true;
            }
        },
        register: function () {
            this.showHideOnBlur = true;
        },
        doReg: function () {
            var a =Array.from(document.querySelector('.register-form').querySelectorAll('input'));
            var b = true;
            a.forEach((i) => {
                if(!i.value)  b=false;
            })
            if(b) {
                this.alertCon='注册成功!';
                this.showHideOnBlur = false;
                this.showValue = true;
            }
           
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm=>{
            vm.$store.commit('showRight',false)
        })
    }
}
</script>
<style lang="less">

.user-info {
    text-align: center;
    margin-top:70px;
    padding: 0 10px 0 20px;
    .bg-head {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background: url('/static/default.png') center center no-repeat;
        background-size: cover;
        margin: 0 auto 10px;
        border: 2px solid #e4bb91; 
    }
    .username {
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #bc2826;
    text-shadow: 0 0 5px #d2d445;
    }
}

form {
    border: 1px solid #fff;
    box-shadow: 0 0 5px rgba(2555, 255, 255, .5);
    border-radius: 5px;
    margin: 0 auto;
    &.login-form {
        width: 80%;
        margin-top: 20%;
       /* background-color: rgba(195, 189, 189, 0.16);*/
        .input-group {
                position: relative;
                &:after{
                    position: absolute;
                    content: '';
                    height: 1px;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background: #ccc;
                    transform: scaleY(.5);
                }
            label{
                color:#e4bb91;
                border-right: 1px solid #e4bb91;
            }
            span {
                width: 15px;
            }
        }
    }
    &.register-form {
        .input-group {
            color: #000;
            input {
                border-bottom: 1px solid #04be02;
                color: #000;
                &::-webkit-input-placeholder {
                    color: #000;
                }
            }
        }
    }
    .input-group {
        padding: 10px;
        label {
            width: 25px;
             
            padding-right: 10px;
            
        }
        input {
            background: none;
            border: none;
            padding: 10px 5px;
            font-size: 16px;
            width: 85%;
            &::-webkit-input-placeholder {
                color: #e4bb91;
            }
        }
    }
}


.login-btn {
    margin: 10% auto;
    text-align: center;
    button {
        padding: 10px 10px 10px 20px;
        font-size: 16px;
        color: #fff;
        letter-spacing: 10px;
        margin: 5%;
        &:active {
            background: rgba(16, 131, 232, 0.5);
        }
    }
}

.register-btn {
    text-align: center;
    margin-top: 5%;
    button {
        padding: 10px 10px 10px 20px;
        font-size: 16px;
        letter-spacing: 10px;
        width: 150px;
        border: 1px solid #04be02;
        border-radius: 50px;
        color: #04be02;
        &:active {
            background-color: #04be02;
            color: #fff;
        }
    }
}

.r-form {
    background: #dfdfdf;
}

input:-webkit-autofill {
    background: none;
}

.register-dialog .vux-close {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    overflow: hidden;
    color: #ccc;
    margin: 8px 0;
    top: 0;
    right: 5px;
    &:before,
    &:after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 0;
        background: #98979d;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
}

.weui-dialog {
    padding: 5px 5px 10px;
}
</style>