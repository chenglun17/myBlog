# 一、原生 AJAX

## 1.AJAX 简介

**AJAX （Asynchronous JavaScript And XML）**，即 **异步的 JavaScript 和 XML**

在网页中利用 XMLHttpRequest 对象和服务器进行数据交互的方式，就是 AJAX

通过 AJAX 可以在浏览器中面向服务器发生异步请求，最大优势：<strong style="color:#DD5145">无刷新获取数据</strong>

Ajax 不是一种新的编程语言，而是一种用于创建更好更快以及交互性更强的 Web 应用程序的技术。

- 同步交互: 客户端发出一个请求后，需要等待服务器响应结束后，才能发出第二个请求。
- 异步交互: 客户端发出一个请求后，无需等待服务器响应结束，就可以发出第二个请求。

**AJAX 的特点：**

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

## 2.XMLHttpRequest

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 AJAX 编程中被大量使用。

**XML 简介**

> **XML（Extensible Markup Language） 可扩展标记语言**，被设计用来 **传输和存储数据**
>
> XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 **XML 中没有预定义标签**

## 3.XMLHttpRequest API

MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

### 构造函数

```js
const request = new XMLHttpRequest()
```

### 实例属性

- <strong style="color:#DD5145">status</strong>：响应状态码值，如 200、404 等。

- **statusText**：响应的具体内容是字符串，一般是 json 字符串。

- <strong style="color:#DD5145">readyState</strong>：返回一个 XMLHttpRequest 代理当前所处的状态。

  | 值   | 状态               | 描述                                                |
  | :--- | :----------------- | :-------------------------------------------------- |
  | `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
  | `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
  | `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
  | `3`  | `LOADING`          | 下载中；`responseText` 属性已经包含部分数据。       |
  | `4`  | `DONE`             | 下载操作已完成。                                    |

- <strong style="color:#DD5145">response</strong>：`XMLHttpRequest` 的 `response` 属性返回响应的正文。返回的类型为 `ArrayBuffer`、`Blob`、`Document`、`JavaScript Object` 或字符串中的一个。这取决于请求的 `responseType` 属性。

- **responseText**：在一个请求被发送后，从服务器端返回文本。

- **responseType**：一个枚举字符串值，用于指定响应中包含的数据类型。

- **responseURL**：只读属性，返回响应的序列化 URL，如果 URL 为空则返回空字符串。如果 URL 有锚点，则位于 URL # 后面的内容会被删除。如果 URL 有重定向，`responseURL` 的值会是经过多次重定向后的最终 URL。

- **responseXML**：只读属性，响应的具体内容是文档。

- **timeout** 指定请求超时时间，一个无符号长整型数，默认为 0 代表没有限制。

- **upload**：用来表示上传的进度。这个对象是不透明的，可以通过对其绑定事件来追踪它的进度。

  可以被绑定在 upload 对象上的事件监听器如下：

  | 事件          | 相应属性的信息类型               |
  | :------------ | :------------------------------- |
  | `onloadstart` | 获取开始                         |
  | `onprogress`  | 数据传输进行中                   |
  | `onabort`     | 获取操作终止                     |
  | `onerror`     | 获取失败                         |
  | `onload`      | 获取成功                         |
  | `ontimeout`   | 获取操作在用户规定的时间内未完成 |
  | `onloadend`   | 获取完成（不论成功与否）         |

### 实例方法

- **`XMLHttpRequest()`** 创建 XHR 对象的构造函数

  ```js
  const xhr = new XMLHttpRequest()
  ```

- **`open(请求方式, url)`** 初始化一个请求，参数为：(method, url [, async])

  ```js
  xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200')
  ```

- **`send(data)`** 发送请求

  ```js
  xhr.send()
  ```

- **`abort()`** 中断请求 （发出到返回之间）

  ```js
  xhr.abort()
  ```

- **`setRequestHeader(name, value)`** 设置请求头

- getResponseHeader(name) 获取指定名称的响应头值

- getAllResponseHeaders() 获取所有响应头组成的字符串

### 事件

- **readystatechange**：只要 `readyState` 属性发生变化，回调函数就会触发

  ```js
  xhr.onreadystatechange = callback
  ```

- **loadstart**：当程序开始加载时，loadstart 事件将被触发。

- **progress**：`progress`事件会在请求接收到数据的时候被周期性触发。

- **abort**：当一个请求终止时 `abort` 事件被触发。

- **error**：当请求遇到错误时，将触发`error` 事件。

- **load**：当一个`XMLHttpRequest`请求完成的时候会触发`load` 事件。

- **timeout**：当进度由于预定时间到期而终止时，会触发 `timeout` 事件。

- **loadend**：在一个资源的加载进度停止之后被触发



## 4.AJAX 的使用

### 服务端搭建

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
>    // server.js
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

### 使用步骤

> 1. <strong style="color:#DD5145">`XMLHttpRequest()`</strong> 函数，创建 xhr 对象
>
> 2. 调用<strong style="color:#DD5145">`xhr.open()`</strong> 函数，初始化一个请求
>
>    `xhr.open([http method], [url], [async], [userName], [userPass])`
>
> 3. 调用<strong style="color:#DD5145">`xhr.send()`</strong>函数，发送一个请求
>
> 4. 设置回调函数，一个处理服务器响应的函数，事件监听 <strong style="color:#DD5145">`onreadystatechange`</strong>，接收响应
>
> 5. 获取异步对象的 readyState 属性：该属性存有服务器响应的状态信息。每当 readyState 改变时， onreadystatechange 函数就会被执行

```js
// 1.创建一个 XMLHttpRequest 实例对象
const xhr = new XMLHttpRequest()

// 2.初始化一个请求，设置请求方法（GET、POST）和 url 
xhr.open(method, url)

// 可以设置请求头，一般不设置，必须在 open() 之后、send() 之前调用 setRequestHeader()方法
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')

// 3.发送请求
xhr.send()	// get请求不传 body参数，只有post请求使用

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
| **4** | 🟢服务器数据已经全部接收，或者本次接收已经失败了              |



### HTTP 常见的状态码

| 状态码  | 状态字符串            | 说明                                |
| ------- | --------------------- | ----------------------------------- |
| **200** | OK                    | 请求成功。一般用于 GET 与 POST 请求 |
| **201** | Created               | 已创建。成功请求并创建了新的资源    |
| **401** | Unauthorized          | 未授权 / 请求要求用户的身份认证     |
| **404** | Not Found             | 服务器无法根据客户端的请求找到资源  |
| **500** | Internal Server Error | 服务器内部错误，无法完成请求        |



## 5.Ajax 解决浏览器缓存问题

> - 在 ajax 发送请求前加上 **`anyAjaxObj.setRequestHeader("If-Modified-Since","0")`** <br>或 **`anyAjaxObj.setRequestHeader("Cache-Control","no-cache")`**
> - 在 URL 后面加上一个随机数： **`"fresh=" + Math.random()`**
> - 在 URL 后面加上时间搓： **`"nowtime=" + new Date().getTime()`**

## 6.原生 Ajax 封装成 promise

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

sendAjax().then(value => {
    console.log(value)
    result.innerHTML = value
}, reason => {
    console.warn(reason)
})
```

## 7.HTTP

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

