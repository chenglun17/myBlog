# http 模块

## 基本概念

[http 模块](https://nodejs.cn/api/http.html)是 Node.js 官方提供的、用来创建 web 服务器的模块。

通过 http 模块提供的 `http.createServer()` 方法，就可以把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

### 什么是 Web 服务器？

Web服务器一般指网站服务器，是指驻留于因特网上某种类型计算机的程序，Web服务器的基本功能就是提供Web信息浏览服务。它只需支持HTTP协议、HTML文档格式及URL，与客户端的网络浏览器配合。

大多数 web 服务器都支持服务端的脚本语言（php、python、ruby等），并通过脚本语言从数据库获取数据，将结果返回给客户端。

目前最主流的三个Web服务器是 Apache、Nginx、IIS。

### Web 应用架构

![Web 应用架构](httpModule.assets/web_architecture.jpg)

- **Client** - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
- **Server** - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
- **Business** - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
- **Data** - 数据层，一般由数据库组成。



## 基本使用

**HTTP 模块提供了 5 个类：**

- http.Agent：创建全局实例，以管理 HTTP 客户端连接的持久性和复用，
- http.ClientRequest：当 http.request() 或 http.get() 被调用时，会创建 http.ClientRequest 对象。
- http.Server：当使用 http.createServer() 创建新的服务器时，通常会实例化并返回此类。
- http.ServerResponse
- http.IncomingMessage：http.serverRqueste()



## HTTP 报文

HTTP（HyperText Transport Protocol）超文本传输协议，协议详细规定了浏览器与万维网服务器之间互相通信的规则

### 请求报文

```
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

### 响应报文

```
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

### HTTP请求头

格式：**【请求头名: 值】**

常见的请求头：

| 请求头          | 说明                                               |
| --------------- | -------------------------------------------------- |
| Host            | 主机名                                             |
| Connection      | 连接的设置 keep-alive（保持连接）；close           |
| Cache-Control   | 缓存控制 max-age = 0（没有缓存）                   |
| User-Agent      | 用户代理，客户端字符串标识，标记请求来自哪个客户端 |
| Accept          | 设置浏览器接收的数据类型                           |
| Accpet-Encoding | 设置接收的压缩方式                                 |
| Accept-Language | 设置接收的语言                                     |
| Cookie          |                                                    |



## 使用 Node 创建 Web 服务器

Node.js 提供了 http 模块，主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块，代码如下：

```js
// 1.导入 http 模块
const http = require('http');

// 2.创建 Web 服务器
const server = http.createServer();

// 3.为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', (req, res) => {
    console.log('Someone visit our web server.');
    // 设置 Content-Type 响应头，解决中文乱码的问题
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res.end() 将内容响应给客户端
    res.end('你好'); // 浣犲ソ
})

// 4.启动服务器
server.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000');
})
```

**req 请求对象**

只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。

- req.url，获取客户端请求的 URL 地址
- req.method，获取客户端请求的 method 类型
- req.headers，获取客户端HTTP请求的请求头

**res 响应对象**

在服务器的 request 事件处理函数中，如果想访问与服务器相关的**数据**或**属性**，可以使用如下的方式

- res.statusCode = 404;，设置HTTP状态码
- res.statusMessage = 'xxx'，设置HTTP状态信息
- res.setHeader()，设置响应头
- res.write('响应体')
- res.end()，将内容响应给客户端



## 解决响应内容中文乱码

响应内容中文乱码的解决方法：

```javascript
response.setHeader('Content-Type', 'text/html; charset=utf-8')
```

HTTP协议的默认端口为 80，HTTPS协议的默认端口为443，HTTP服务开发常用端口 3000、8080、8090、9000等

## 参考

[参考文章](https://blog.csdn.net/m0_46615524/article/details/126262714)、[参考文章](https://blog.csdn.net/weixin_44827418/article/details/119494952)、[参考文章](https://blog.csdn.net/weixin_44018458/article/details/128602152)