# Vux-APP

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
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
```

> 代理

```javascript
# build/dev-server.js
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var app = express()
/*  访问/rank/8888时，请求代理到http://m.kugou.com/rank/8888  */
  app.use(proxyMiddleware('/rank', {
    target: 'http://m.kugou.com',
    changeOrigin: true
  }));
```

详情 https://www.npmjs.com/package/http-proxy-middleware