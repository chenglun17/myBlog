# 一、原生 AJAX

## 1.1 AJAX 简介

**AJAX （Asynchronous JavaScript And XML）**，就是 **异步的 JavaScript 和 XML**

即 **在网页中利用 XMLHttpRequest 对象和服务器进行数据交互的方式**，就是 AJAX

通过 AJAX 可以在浏览器中面向服务器发生异步请求，最大优势：<strong style="color:#DD5415">无刷新获取数据</strong>

AJAX 不是新的编程语言，而是一种将现在的标准组合在一起使用的新方式

**XML 简介**

> **XML（Extensible Markup Language） 可扩展标记语言**，被设计用来 **传输和存储数据**
>
> XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 **XML 中没有预定义标签**
>

## 1.2 AJAX 的特点

AJAX 的优点：

> - 可以**无需刷新**页面而与服务器进行通信
> - 运行你根据用户事件来**更新部分页面**内容

AJAX 的缺点：

> - 没有浏览历史，不能回退
>
> - 存在跨域问题（同源）
>
> - **SEO（Search Engine Optimization，搜索引擎优化）** 不友好
>
>   目的是让搜索引擎的爬虫更容易收集到你网站的内容，并把它们编写进自己的索引库中

## 1.3 HTTP

HTTP（HyperText Transport Protocol）超文本传输协议，协议详细规定了浏览器与万维网服务器之间互相通信的规则

**请求报文**

```js
// 请求行
POST /s?ie=utf-8 HTTP/1.1
// 请求头
Host: atguigu.com
Cookie: name=guigu
Content-type: application/x-www-form-urlencoded
User-Agent: chrome 83
......
// 空行

// 请求体，[GET请求，则可以为空]，POST请求，可以不为空
username=admin&password=admin
```

**响应报文**

```js
// 请求行
HTTP/1.1 200 OK
// 请求头
Content-type: text/html;charset=utf-8
Content-length: 2048
Content-encoding: gzip
......
// 空行

// 请求体
<html>
	<head></head>
	<body>
		<h1>你好啊<h1>
	</body>
</html>
```



## 1.4 AJAX 的使用

### 准备工作

1. 安装 [Node.js](http://nodejs.cn/)

2. 安装 [express](https://www.expressjs.com.cn/)（**服务端框架**）


> 1. 初始化环境
>
>    ```bash
>    npm init --yes
>    ```
>
> 2. 下载 express 包
>
>    ```bash
>    npm i express
>    ```
>
> 3. 编写服务端的 js 代码
>
>    ```javascript
>    const express = require('express')	// 1. 引入express
>    const app = express()	// 2. 创建应用对象
>    
>    // 3. 创建路由规则
>    // request是对请求报文的封装对象，response是对响应报文的封装对象
>    app.get('/', (request, response) => {
>        response.setHeader('Access-Control-Allow-Origin', '*') // 设置响应头，设置允许跨域
>    	response.send("Hello Express") // 设置响应数据
>    });
>    
>    // 4. 监听端口，启动服务
>    app.listen(8000, () => {
>    	console.log("服务已经启动, 8000 端口监听中...")
>     })
>    ```
>    
> 4. 运行 js 程序
> 
>   ```shell
> node .\server.js
>   ```
>
> 5. 使用 nodemon 自动重启工具
> 
>   ```shell
> npx nodemon .\server.js
>   ```
>
>   http://127.0.0.1:8000/server

### 核心对象

**XMLHttpRequest（XHR）**，该对象用于与服务器交互，通过它，可以 **请求服务器上的数据资源**。

> 通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据
>

### 使用步骤

> 1. <strong style="color:#DD5415">`XMLHttpRequest()`</strong> 函数，创建 xhr 对象
>
> 2. 调用<strong style="color:#DD5415">`xhr.open()`</strong> 函数，初始化一个请求
>
>    `xhr.open([http method], [url], [async], [userName], [userPass])`
>
> 3. 调用<strong style="color:#DD5415">`xhr.send()`</strong>函数，发送一个请求
>
> 4. 设置回调函数，一个处理服务器响应的函数，事件监听 <strong style="color:#DD5415">`onreadystatechange`</strong>，接收响应
>
> 5. 获取异步对象的 readyState 属性：该属性存有服务器响应的状态信息。每当 readyState 改变时， onreadystatechange 函数就会被执行

```js
const xhr = new XMLHttpRequest() // 1.创建一个 XMLHttpRequest 实例对象

xhr.open(method, url) // 2.初始化一个请求，设置请求方法（GET、POST）和 url 

// 可以设置请求头，一般不设置
// 必须在 open() 之后、send() 之前调用 setRequestHeader()方法
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')

// 3.发送请求
xhr.send(body)	// get请求不传 body参数，只有post请求使用

// 4.接收响应
// xhr.responseXML 接收xml格式的响应数据，xhr.responseText 接收文本格式的响应数据
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 300) {
            // 处理服务端返回的结果
            console.log(xhr.status) // 状态码
            console.log(xhr.statusText) // 状态字符串
            console.log(xhr.getAllResponseHeaders) // 所有响应头
            console.log(xhr.response) // 响应体
        }
    }
}

// 其他
xhr.abort()  // 终止该请求
```



### AJAX 请求状态码

**`readyState`** 属性返回一个 XMLHttpRequest 代理当前所处的状态

可以用来查看请求的当前状态，一个 XHR 代理总是处于下列状态中的一个：

| 值    | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| **0** | XMLHttpRequest 实例已经生成了，但是 open（）方法还没有被调用 |
| **1** | open（）方法已经被调用，可以使用 **setRequestHeader（）**，设定 HTTP **请求头信息** |
| **2** | send（） 方法已经被调用，并且 **头信息** 和 **状态码** 已经可获得 |
| **3** | 正在接收服务器传来的 body 部分的数据                         |
| **4** | 服务器数据已经全部接收，或者本次接收已经失败了               |



### HTTP 常见的状态码

| 状态码  | 状态字符串            | 说明                                |
| ------- | --------------------- | ----------------------------------- |
| **200** | OK                    | 请求成功。一般用于 GET 与 POST 请求 |
| **201** | Created               | 已创建。成功请求并创建了新的资源    |
| **401** | Unauthorized          | 未授权 / 请求要求用户的身份认证     |
| **404** | Not Found             | 服务器无法根据客户端的请求找到资源  |
| **500** | Internal Server Error | 服务器内部错误，无法完成请求        |



## 1.5 Ajax 解决浏览器缓存问题

> - 在 ajax 发送请求前加上 **`anyAjaxObj.setRequestHeader("If-Modified-Since","0")`** <br>或 **`anyAjaxObj.setRequestHeader("Cache-Control","no-cache")`**
> - 在 URL 后面加上一个随机数： **`"fresh=" + Math.random()`**
> - 在 URL 后面加上时间搓： **`"nowtime=" + new Date().getTime()`**

## 1.6 原生 Ajax 封装成 promise

```js
function sendAjax() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200')
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
    })
}
sendAjax().then(v => {
    console.log(v)
    result.innerHTML = v
}, r => {
    console.warn(r)
})
```





## 1.7 API 总结

- **`XMLHttpRequest()`** 创建 XHR 对象的构造函数
- status 响应状态码值，如 200、404
- statusText：响应的具体内容是字符串，一般是 json 字符串
- responseXML：响应的具体内容是文档
- **`readyState`** 标识请求状态的只读属性 0-1-2-3-4
- **`onreadystatechange`** 绑定 readyState 改变的监听
- response 响应体数据，类型取决于 responseType 的指，responseType 指定响应数据类型，如果是 'json'，得到响应后自动解析响应
- timeout 指定请求超时时间，默认为 0 代表没有限制
- ontimeout 绑定超时的监听
- onerror 绑定请求网络错误的监听
- **`open(请求方式, url)`** 初始化一个请求，参数为：(method, url [, async])
- setRequestHeader(name, value) 设置请求头
- **`send(data)`** 发送请求
- abort() 中断请求 （发出到返回之间）
- getResponseHeader(name) 获取指定名称的响应头值
- getAllResponseHeaders() 获取所有响应头组成的字符串



# 二、jQuery 中的AJAX





# 三、axios

[axios](https://github.com/axios/axios) 是一个基于 promise 的 HTTP 库，支持 promise 所有的API，可以用于浏览器和 node.js 

相比于原生的 XMLHttpRequest 对象，axios **简单易用**。相比于 jQuery，axios 更加**轻量化**，只专注于网络数据请求。

## axios 的特点有哪些？

> 1. Axios 是一个基于 `promise` 的 `HTTP` 库，支持 `promise` 所有的API
>
> 2. 它可以拦截请求和响应
>
> 3. 它可以转换请求数据和响应数据，并对响应回来的内容自动转换成 JSON类型的数据
>
> 4. 安全性更高，客户端支持防御 XSRF
>
>    XSRF 的全称是“跨站请求伪造”，它利用的是服务器对客户端浏览器的信任，从而伪造用户向服务器发送请求，从而欺骗服务器达到一些目的。

## axios 有哪些常用方法？

> - **`axios.get(url[, config])`** get 请求用于列表和信息查询
> - **`axios.post(url[, data[, config]])`** post 请求用于信息的添加
> - **`axios.put(url[, data[, config]])`** 更新数据（所有数据推送到服务端）
> - **`axios.patch(url[, data[, config]])`** 更新数据（只将修改的数据推送到后端）
> - **`axios.delete(url[, config])`** 删除

## 1. axios 发起GET请求

axios 发起 get 请求的语法：

```javascript
axios.get('url', { params: { /*参数*/ } }).then(callback)
```

*示例代码如下：*

```javascript
// 请求的 URL 地址
const url = 'http://www.liulongbin.top:3006/api/get'
// 请求的参数对象
const paramsObj = { name: 'zs', age: 20 }
// 调用 axios.get() 发起 GET 请求
axios.get(url, { params: paramsObj }).then(function(res) {
    // res.data 是服务器返回的数据
    const result = res.data
    console.log(res)
})
```

## 2. axios 发起POST请求

axios 发起 post 请求的语法：

```javascript
axios.post('url', { /*参数*/ }).then(callback)
```

*示例代码如下：*

```javascript
// 请求的 URL 地址
const url = 'http://www.liulongbin.top:3006/api/post'
// 要提交到服务器的数据
const dataObj = { location: '北京', address: '顺义' }
// 调用 axios.post() 发起 POST 请求
axios.post(url, dataObj).then(function(res) {
    // res.data 是服务器返回的数据
    const result = res.data
    console.log(result)
})
```

## 3. 使用 axios 发起请求

axios 也提供了类似于 jQuery 中 **$.ajax( )** 的函数，语法如下：

```javascript
axios({
    method: '请求类型',
    url: '请求的URL地址',
    data: { /* POST数据 */ },
    params: { /* GET参数 */ }
}) .then(callback)
```

案例：

```html
<!-- 引用一个远程资源 -->
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js"></script>

<body>
    <button>GET</button>
    <button>POST</button>
    <button>AJAX</button>
</body>
<script>
    const btns = document.querySelectorAll('button')

    // 配置 baseURL
    axios.defaults.baseURL = 'http://127.0.0.1:8000'

    // GET 请求
    btns[0].addEventListener('click', function () {
        axios.get('/axios-server', {
            // url参数
            params: { id: 100, vip: 7 },
            // 设置请求头信息
            headers: { name: 'zhangsan', age: '20' }
        }).then((value) => {
            console.log(value);
        })
    })

    // POST 请求
    btns[1].addEventListener('click', function () {
        // 第二个参数是添加的新数据，第三个参数是设置请求报文
        axios.post('/axios-server', {
            username: 'admin',
            password: 'admin'
        }, {
            // url
            params: { id: 200, vip: 9 },
            // 请求头参数
            headers: { height: 180, weight: 180 }
        })
    })

    // axios函数
    btns[2].addEventListener('click', function () {
        axios({
            // 请求方法
            methods: 'POST',
            // url
            url: '/axios-server',
            // url参数
            params: { id: 300, vip: 10 },
            // 头信息
            headers: { a: 100, b: 200 },
            // 请求体参数
            data: { username: 'admin', password: 'admin' }
        }).then(response => {
            // 响应状态码
            console.log(response.status)
            // 响应状态字符串
            console.log(response.statusText)
            // 响应头信息
            console.log(response.headers)
            // 响应体
            console.log(response.data)
        })
    })
</script>
```

server.js 文件

```javascript
//axios 服务，all 可以接收任意类型的请求
app.all('/axios-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    // response.send('Hello axios');
    const data = {name:'尚硅谷'}
    response.send(JSON.stringify(data))
})
```



# 四、fetch

fetch() 方法用于发起获取资源的请求。

fetch 使用的是 `promise` 方便使用异步，没有回调地狱的问题。

它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象。

```html
<button>AJAX请求</button>
<script>
  const btn = document.querySelector('button')

  btn.onclick = function(){
    fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
      //请求方法
      method: 'POST',
      //请求头
      headers: {
        name:'atguigu'
      },
      //请求体
      body: 'username=admin&password=admin'
    }).then(response => {
      // return response.text();
      return response.json()
    }).then(response=>{
      console.log(response)
    })
  }
</script>
```

server.js 文件

```javascript
//fetch 服务，all 可以接收任意类型的请求
app.all('/fetch-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    // response.send('Hello fetch');
    const data = {name:'尚硅谷'}
    response.send(JSON.stringify(data))
})
```

文档地址 https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch

# Fetch、Ajax、Axios 区别

- 传统的 ajax 利用的是 `XMLHttpRequest` 这个对象，和后端进行交互。`JQuery ajax` 是对原生 `XHR` 的封装，多请求间有嵌套的话就会出现回调地狱的问题。
- axios 使用 `promise` 封装 xhr，解决了回调地狱问题
- fetch 不是 `XMLHttpRequest`，fetch 是原生的 js，使用的是 `promise`。

# 五、跨域问题

## 同源策略

**同源策略（Same-Origin Policy）**最早由 Netscape 公司提出，是浏览器的一种安全策略

> - 同源：**协议**、**域名**、**端口号** 必须完全相同
> - 跨域：违背同源策略就是跨域

## 如何解决跨域

### 1.JSONP

**JSONP（JSON with Padding）**，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，<strong style="color:#DD5415">只支持 GET 请求</strong>

网页中有一些标签天生具有跨域能力，比如：img、link、iframe、script，JSONP 就是利用 script 标签的跨域能力来发送请求的

注意：**JSONP** **和** **Ajax** **之间没有任何关系**，不能把 JSONP 请求数据的方式叫做 Ajax，<br>因为 JSONP 没有用到 XMLHttpRequest 这个对象。



### 2.CORS

[文档地址](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 

**CORS（Cross-Origin Resource Sharing，跨域资源共享）**CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，<strong style="color:#DD5415">同时支持 GET 和 POST 请求</strong>

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

> 1. 后端设置代理和允许跨域请求
>
> 2. vue-cli 配置请求代理

**什么是代理？**

> - 常规 ：A客户端向 B服务器请求
> - 变成： 代理服务器C 收的A的请求 C服务器请求B服务器 返回给A客户端 （服务器请求服务器不存在跨域）





# [前端面试题集锦之 Ajax、Fetch、Axios 篇](https://blog.csdn.net/XH_jing/article/details/119533597)

