# http 模块

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

## http 请求头

格式：**【请求头名: 值】**

常见的请求头：

| 请求头          | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| Host            | 主机名                                                       |
| Connection      | 连接的设置 keep-alive（保持连接）；close                     |
| Cache-Control   | 缓存控制 max-age = 0（没有缓存）                             |
| User-Agent      | 用户代理，客户端字符串标识，<br>服务器可以通过这个标识来识别请求来自哪个客户端 |
| Accept          | 设置浏览器接收的数据类型                                     |
| Accpet-Encoding | 设置接收的压缩方式                                           |
| Accept-Language | 设置接收的语言                                               |
| Cookie          |                                                              |

## 解决响应内容中文乱码

响应内容中文乱码的解决方法：

```javascript
response.setHeader('content-type', 'text/html;charset=uft-8')
```

HTTP协议的默认端口为 80，HTTPS协议的默认端口为443，HTTP服务开发常用端口 3000、8080、8090、9000等