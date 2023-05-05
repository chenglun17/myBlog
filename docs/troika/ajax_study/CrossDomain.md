







# 五、跨域问题

## 同源策略

**同源策略（Same-Origin Policy）** 最早由 Netscape 公司提出，是浏览器的一种安全策略

- 同源：**协议**、**域名**、**端口号** 必须完全相同
- 跨域：违背同源策略就是跨域

## 如何解决跨域

### 1.JSONP

**JSONP（JSON with Padding）**，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，<strong style="color:#DD5415">只支持 GET 请求</strong>

网页中有一些标签天生具有跨域能力，比如：img、link、iframe、script，JSONP 就是利用 script 标签的跨域能力来发送请求的

注意：**JSONP** **和** **Ajax** **之间没有任何关系**，不能把 JSONP 请求数据的方式叫做 Ajax，因为 JSONP 没有用到 XMLHttpRequest 这个对象。



### 2.CORS

[文档地址](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 

**CORS（Cross-Origin Resource Sharing，跨域资源共享）** CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，<strong style="color:#DD5415">同时支持 GET 和 POST 请求</strong>

CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行

在服务器 server.js 文件中配置：

```javascript
const express = require('express')
const app = express()

app.use((request,response,next)=>{
	console.log('有人请求服务器了');
	next()
})

app.get('/students',(request,response)=>{
    // 设置响应头 设置允许跨域
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.send()
})

app.listen(5000,(err)=>{ })
```



### 3.代理转发

- 后端设置代理和允许跨域请求

- vue-cli 配置请求代理

**什么是代理？**

- 常规 ：A客户端向 B服务器请求

- 变成： 代理服务器C接收到服务器A的请求，C去请求服务器B，最后返回给A客户端 （服务器请求服务器不存在跨域）


