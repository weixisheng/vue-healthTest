# Vue-healthTest
> A Vue.js project

使用Vue2.0技术栈开发的一款资讯类WebAPP。

- [x] 参考【今日头条】和【QQ音乐】，可以看新闻、热门电影资讯、听音乐等

- [x] 里面重构了【无限极中国】的健康测试功能，可以自行模拟检测(测试结果仅供展示，A选项偏多属油性，B选项偏多属混合性，C选项偏多属中性，D选项偏多属油性)

- [x] 参考【微信】页面的布局，实现了图片懒加载


## 技术说明
- vue2.x + Vuex + vue-router :Vue技术栈搭建基本功能模块并实现路由跳转。使用Vue实现基本页面、组件封装、混合(mixin)和指令编写。Vuex管理应用程序的状态模式，分发请求和修改state数据。vue-router创建SPA，做登录验证
- webpack + Less + ES6/ES7 :webpack打包工具实现热重载(HRM)，同时合理使用ES6/ES7语言进行编码，简化代码。这里选用Less，其实无所谓Less、Sass、stylus，简单的CSS也是可以的
- vee-validate + vue-lazyload + vueg:这里主要是一些插件，优化体验。vee-validate表单验证插件主要用在该WebAPP的登录注册；vue-lazyload用于图片懒加载，vueg用于转场过渡特效
- Node + SQL:页面设置有登录注册，使用Node搭建简单后台服务器和MySQL交互，使之能够判断用户身份信息和注册用户信息用于登录
- Vux + font-awesome:Vux主要是一些常用组件的使用，部分小图标使用  Font Awesome字体图标

## Build Setup

``` bash
# install dependencies
npm install

# download jroll plugin and Tween.js into node_modules
jroll/jroll.min.js
tween.js/src/Tween.js

# serve with hot reload at localhost:8184
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


> webpack.config.dev.js
```
new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',//网页添加小图标
      inject: true
    })
```

> 开启登录验证

```shell
# 先启动mysql服务
# src->config->nodeSql.js
node nodeSql.js
/*只有在点击底栏【我的】才需要登录*/
```

> 代理

```javascript
# build/dev-server.js
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var app = express()
/*  访问/kugouAPI/rangk/info时，请求代理到http://m.kugou.com/rank/info  */
   app.use(proxyMiddleware('/kugouAPI', {
    target: 'http://m.kugou.com',
    changeOrigin: true,
    pathRewrite:{
      '^/kugouAPI':''
    }
  }));
```

详情 https://www.npmjs.com/package/http-proxy-middleware

## 展示

![资讯首页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/information.png)

![资讯详情页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/information-detail.png)

![健康测试-首页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/main.png)

![健康测试-测试页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/start2.png)

![健康测试-测试页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/start3.png)

![健康测试-测试页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/start4.png)

![健康测试-结果页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/result.png)

![产品详情页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/product-detail.png)

![结算页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/balance.png)

![音乐列表](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/music.png)

![音乐详情](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/music-detail.png)

![电影-列表页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/movie.png)

![电影-详情页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/movie-detail.png)

![人物页](https://github.com/weixisheng/vue-healthTest/blob/master/screenshot/celebrity.png)

更多截图查看文件夹screenshot