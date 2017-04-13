<template>
    <div>
        <div class="login-container">
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
                           autocomplete="off">
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
                           v-model="username"
                           id="register-username"
                           autocomplete="off">
                </div>
                <div class="input-group">
                    <label for="register-password">
                        <span class="fa fa-unlock-alt"></span> </label>
                    <input type="password"
                           class="register-password"
                           placeholder="请输入密码"
                           v-model="password"
                           id="register-password"
                           autocomplete="off">
                </div>
            </form>
            <div class="register-btn">
                <button class="">确认</button>
            </div>
            <span class="vux-close"
                  @click="showHideOnBlur=false"></span>
        </x-dialog>
    </div>
</template>

<script>
import { go } from '../../node_modules/vux/src/libs/router'
import { XDialog } from 'vux'
export default {
    data() {
        return {
            username: '',
            password: '',
            showHideOnBlur: false
        }
    },
    components: {
        XDialog
    },
    created: function () {
    },
    methods: {
        login: function () {
            if (this.username == 'admin' && this.password == '1') {
                go('main', this.$router);
            }
        },
        register: function () {
            this.showHideOnBlur = true;
        }
    }
}
</script>
<style lang="less">
@import '../assets/font-awesome-4.7.0/less/font-awesome.less';

.login-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(../assets/login-bg.jpg) no-repeat left top;
    background-size: cover;
    background-position: 100% 100%;
}

form {
    border: 1px solid #fff;
    box-shadow: 0 0 5px rgba(2555, 255, 255, .5);
    border-radius: 5px;
    margin: 0 auto;
    &.login-form {
        width: 80%;
        margin-top: 50%;
        background-color: rgba(195, 189, 189, 0.16);
        .input-group{
            &:first-child{
                border-bottom: 1px solid #dfdfdf;
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
        color: white;
        label {
            width: 25px;
            padding-right: 10px;
            border-right: 1px solid #fff;
        }
        input {
            background: none;
            border: none;
            color: #fff;
            padding: 10px 5px;
            font-size: 16px;
            &::-webkit-input-placeholder {
                color: #fff;
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
        border:1px solid #04be02;
        border-radius: 50px;
        color:#04be02;
        &:active{
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
.weui-dialog{
    padding: 5px 5px 10px;
}
</style>