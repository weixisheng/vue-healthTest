<template>
    <div>
        <div class="login-container">
            <div class="user-info clearfix">
                <div class="bg-head"></div>
                <p class="username">{{username}}</p>
            </div>
            <form class="login-form" autocomplete="off">
                <div class="input-group" :class="{'is-danger':errors.has('用户名')}">
                    <label for="login-username">
                        <span class="fa fa-user-o"></span>
                    </label>
                    <input type="text" name="用户名" v-validate="'required'" class="login-username" placeholder="请输入用户名" v-model="username" id="login-username">
                </div>
                <p v-show="errors.has('用户名')" class="v-red v-fz-12">{{errors.first('用户名')}}</p>
    
                <div class="input-group" :class="{'is-danger':errors.has('密码')}">
                    <label for="login-password">
                        <span class="fa fa-unlock-alt"></span>
                    </label>
                    <input type="password" name="密码" v-validate="'required'" class="login-password" placeholder="请输入密码" v-model="password" id="login-password" v-on:keyup.enter="login" ref="loginpwd">
                </div>
                <p v-show="errors.has('密码')" class="v-red v-fz-12">{{errors.first('密码')}}</p>
            </form>
            <div class="login-btn">
                <button class="v-bg-blue" @click="login">登录</button>
                <button class="v-bg-red" @click="register">注册</button>
            </div>
        </div>
        <x-dialog v-model="showHideOnBlur" class="register-dialog" :hideOnBlur="true">
            <p class="dialog-title">注册</p>
            <form class="register-form" autocomplete="off">
                <div class="input-group">
                    <label for="register-username">
                        <span class="fa fa-user-o"></span>
                    </label>
                    <input type="text" name="注册用户名" v-validate="'required'" class="register-username" placeholder="请输入用户名" id="register-username" autocomplete="off">
                </div>
                <p v-show="errors.has('注册用户名')" class="v-red v-fz-12">{{errors.first('注册用户名')}}</p>
                <div class="input-group">
                    <label for="register-password">
                        <span class="fa fa-unlock-alt"></span>
                    </label>
                    <input type="password" name="注册密码" v-validate="'required'" class="register-password" placeholder="请输入密码" id="register-password" autocomplete="off">
                </div>
                <p v-show="errors.has('注册密码')" class="v-red v-fz-12">{{errors.first('注册密码')}}</p>
            </form>
            <div class="register-btn">
                <button @click="doReg">确认</button>
            </div>
            <span class="vux-close" @click="showHideOnBlur=false"></span>
        </x-dialog>
        <alert v-model="showValue" title="提示" :content="alertCon"></alert>
    </div>
</template>

<script>

import { XDialog, Alert } from 'vux'
import { Validator } from 'vee-validate';

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
        this.$store.commit('setPageTitle', '登录');

        // validate form
        const dict = {
            en: {
                messages: {
                    required: (field) => `${field}是必填项`
                }
            }
        }
        this.$validator.updateDictionary(dict)
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
            var vm = this;
            if (!this.username) return;
            var truePwd = '';
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    truePwd = xhr.responseText;
                    if (vm.password == truePwd) {
                        window.sessionStorage.setItem('username', vm.username)
                        vm.$store.commit('updateLoginStatus', true)
                        vm.$router.push({ name: 'me' });
                        
                    }
                    else {
                        vm.alertCon = '登录信息有误，请重试！';
                        vm.showValue = true;
                    }
                }
            };
            xhr.open('GET', `http://localhost:81/login?username=${this.username}`);
            xhr.send();

        },
        register: function () {
            this.showHideOnBlur = true;
            document.querySelector('.register-username').value = '';
            document.querySelector('.register-password').value = '';
        },
        doReg: function () {
            var a = Array.from(document.querySelector('.register-form').querySelectorAll('input'));
            var b = true;
            let regName = '', regPwd = '';
            var vm = this;
            a.forEach((i) => {
                if (!i.value) {
                    b = false;
                    return;
                }
            })
            if (!!b) {
                regName = a[0].value,
                    regPwd = a[1].value;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        vm.alertCon = '注册成功!';
                        vm.showHideOnBlur = false;
                        vm.showValue = true;
                        //注册成功后把注册名填入登录页面的用户名，并聚焦密码栏
                        vm.username=regName;
                        vm.$refs.loginpwd.focus();
                       
                    }
                };
                xhr.open('POST', 'http://localhost:81/register');
                xhr.send(`username=${regName}&password=${regPwd}`);
            }

        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            vm.$store.commit('showRight', false)
        })
    }
}
</script>
<style lang="less">
.is-danger {
    border: 1px solid #ea2323;
    box-shadow: 0 0 5px #eab213;
    border-radius: 10px;
}

.user-info {
    text-align: center;
    margin-top: 70px;
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
            &:after {
                position: absolute;
                content: '';
                height: 1px;
                left: 0;
                bottom: 0;
                width: 100%;
                background: #ccc;
                transform: scaleY(.5);
            }
            label {
                color: #e4bb91;
                border-right: 1px solid #e4bb91;
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
        display: flex;
        align-items: center;
        padding: 10px;
        label {
            flex: 1;
            padding-right: 10px;
        }
        input {
            background: none;
            border: none;
            padding: 10px 5px;
            font-size: 16px;
            flex: 11;
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
        text-align: center;
        &:active {
            background-color: #04be02;
            color: #fff;
        }
    }
}

.r-form {
    background: #dfdfdf;
}

input::-webkit-autofill {
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
    &::before,
    &::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 0;
        background: #98979d;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
}

.weui-dialog {
    padding: 5px 5px 10px;
}
</style>