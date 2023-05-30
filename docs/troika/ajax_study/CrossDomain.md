# 五、跨域问题

## 1.同源策略

**同源策略（Same-Origin Policy）** 最早由 Netscape 公司提出，是浏览器的一种安全策略

- 同源：**协议**、**域名**、**端口号** 必须完全相同
- 跨域：违背同源策略就是跨域



## 2.如何解决跨域

解决跨域的方法有很多，下面列举了三种：

- JSONP
- CORS
- Proxy

而在`vue`项目中，我们主要针对`CORS`或`Proxy`这两种方案进行展开。

### （1）JSONP

**JSONP（JSON with Padding）**，是非官方的跨域解决方案，程序员自己开发出来，<strong style="color:#DD5415">只支持 GET 请求</strong>。

网页中有一些标签天生具有跨域能力，比如：img、link、iframe、script，JSONP 就是利用 `script` 标签的跨域能力来发送请求的。

JSONP 和 Ajax 之间没有任何关系，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP 没有用到 XMLHttpRequest 对象。



### （2）CORS

**[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)（Cross-Origin Resource Sharing，跨域资源共享）** 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，<strong style="color:#DD5145">同时支持 GET 和 POST 请求</strong>。

CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

在服务器 server.js 文件中配置：

```javascript
const express = require('express')
const app = express()

app.use((request, response, next) => {
	console.log('有人请求服务器了');
	next()
})

app.get('/students', (request, response) => {
    // 设置响应头
	response.setHeader('Access-Control-Allow-Origin', '*')	// 设置允许跨域
	response.send()
})

app.listen(5000, (err) => { })
```

> `Access-Control-Allow-Origin` 设置为 **`*`** 其实意义不大，可以说是形同虚设，实际应用中，上线前我们会将`Access-Control-Allow-Origin` 值设为我们目标`host`

### （3）Proxy

代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。

一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击。

- 后端设置代理和允许跨域请求
- vue-cli 配置请求代理

**什么是代理？**

- 常规 ：A客户端 向 B服务器 请求
- 变成： 代理服务器C收的A的请求，C请求B返回给 A客户端 （**服务器之间请求不存在跨域**）

**方案一**

如果是通过`vue-cli`脚手架工具搭建项目，我们可以通过`webpack`为我们起一个本地服务器作为请求的代理对象。

通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果 Web 应用和接口服务器不在一起仍会跨域。

在`vue.config.js`文件配置

```js
amodule.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8084,
        open: true, // vue项目启动时自动打开浏览器
        proxy: {
            '/api': {	// '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                target: "http://xxx.xxx.xx.xx:8080", // 目标地址，一般是指后台服务器地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {	// pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api': "" 
                }
            }
        }
    }
}
```

通过`axios`发送请求中，配置请求的根路径

```js
axios.defaults.baseURL = '/api'
```

- `devServe.proxy` 提供的代理功能，仅在开发调试阶段生效
- 项目上线发布时，依旧需要API接口服务器开启 CORS 跨域资源共享

**方案二**

此外，还可通过服务端实现代理请求转发

以`express`框架为例

```js
const express = require('express');
const proxy = require('http-proxy-middleware')
const app = express()

app.use(express.static(__dirname + '/'))
app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false }))

module.exports = app
```



## 参考

[参考文章](https://vue3js.cn/interview/vue/cors.html)、[参考文章2](https://blog.csdn.net/qq_45334976/article/details/125113481)、[参考文章3](https://blog.csdn.net/qq_52822043/article/details/124438656)