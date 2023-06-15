# express 框架

##  :star:express 介绍

[express](https://www.expressjs.com.cn/) 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架。

简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用(HTTP 服务)



## :star:express 使用

### express 下载

**express 本身是一个 npm 包**，所以可以通过 npm 安装

```shell
npm init
npm i express
```

### express 初体验

操作步骤：

1. 创建 js 文件，键入如下代码

```javascript
// 1. 导入 express
const express = require('express')
// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
app.get('/home', (req, res) => {
	res.end('hello express server')
})

// 4. 监听端口 启动服务
app.listen(3000, () =>{
	console.log('服务已经启动, 端口监听为 3000...')
})
```

2. 命令行下执行该脚本

```shell
node <文件名>
# 或者
nodemon <文件名>
```

3. 然后在浏览器就可以访问 http://127.0.0.1:3000/home 



##  :star:express 路由

### 什么是路由

> 官方定义： 路由确定了应用程序如何响应客户端对特定端点的请求

### 路由的使用

一个路由的组成有 **请求方法**， **路径** 和 **回调函数** 组成

express 中提供了一系列方法，可以很方便的使用路由，使用格式如下：

```js
app.<method>(path，callback)
```

代码示例：

```javascript
// 导入 express
const express = require('express')
//创建应用对象
const app = express()

// 创建 get 路由
app.get('/home', (req, res) => {
	res.send('网站首页')
});

// 首页路由
app.get('/', (req,res) => {
	res.send('我才是真正的首页')
})

// 创建 post 路由
app.post('/login', (req, res) => {
	res.send('登录成功')
})

// 匹配所有的请求方法
app.all('/search', (req, res) => {
	res.send('1 秒钟为您找到相关结果约 100,000,000 个')
})

// 自定义 404 路由
app.all("*", (req, res) => {
	res.send('<h1>404 Not Found</h1>')
})

// 监听端口 启动服务
app.listen(3000, () =>{
	console.log('服务已经启动, 端口监听为 3000')
})
```

###  获取请求参数

express 框架封装了一些 API 来方便获取请求报文中的数据，并且兼容原生 HTTP 模块的获取方式

```javascript
// 导入 express
const express = require('express')
// 创建应用对象
const app = express()

// 获取请求的路由规则
app.get('/request', (req, res) => {
	// 1. 获取报文的方式与原生 HTTP 获取方式是兼容的
	console.log(req.method)
	console.log(req.url)
	console.log(req.httpVersion)
	console.log(req.headers)
	
    // 2. express 独有的获取报文的方式
    // 获取路径
	console.log(req.path)
    // 获取查询字符串
	console.log(req.query) // 『相对重要』对象形式 返回所有的查询字符串
	// 获取指定的请求头
	console.log(req.get('host'))
	res.send('请求报文的获取')
})

// 启动服务
app.listen(3000, () => {
	console.log('启动成功....')
})
```

### 获取路由参数

路由参数指的是 URL 路径中的参数（数据）

```javascript
// :id 为占位符
app.get('/:id.html', (req, res) => {
	res.send('商品详情, 商品 id 为' + req.params.id)
})
```

##  :star:express 响应设置

express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块的获取方式

```javascript
// 获取请求的路由规则
app.get("/response", (req, res) => {
  	// 1. express 中设置响应的方式兼容 HTTP 模块的方式（原生响应）
  	res.statusCode = 404;
  	res.statusMessage = 'xxx'
  	res.setHeader('abc','xyz')
  	res.write('响应体')
  	res.end('xxx')
  
    // 2. express 的响应方法
  	res.status(500)  //设置响应状态码
  	res.set('xxx','yyy')  //设置响应头
  	res.send('中文响应不乱码')  //设置响应体
  	// 连贯操作
  	res.status(404).set('xxx','yyy').send('你好朋友')
  	
    // 3. 其他响应
  	res.redirect('http://atguigu.com')  //重定向
  	res.download('./package.json')    //下载响应
  	res.json({
        name: 'atguigu',
        slogon: '123456'
    })    			//响应 JSON
  	res.sendFile(__dirname + '/home.html')   //响应文件内容
})
```

## :star:express 中间件

###  什么是中间件

**中间件（Middleware）本质是一个回调函数**

中间件函数可以像路由回调一样访问 `请求对象（request）` ， `响应对象（response）`

![中间件](Express.assets/中间件.png)

### 中间件的作用

- 中间件的作用：就是**使用函数封装公共操作，简化代码**

### 中间件的类型

- 全局中间件 
- 路由中间件

#### 定义全局中间件

- 每一个请求 到达服务端之后 都会执行全局中间件函数

声明中间件函数

```javascript
let recordMiddleware = function(request,response,next){
    //实现功能代码
    //.....
    //执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
    next();
}
```

应用中间件

```javascript
app.use(recordMiddleware)
```

声明时可以直接将匿名函数传递给 `use`

```javascript
app.use(function (request, response, next) {
	console.log('定义第一个中间件');
	next();
})
```

####  多个全局中间件

express 允许使用 app.use() 定义多个全局中间件

```javascript
app.use(function (request, response, next) {
    console.log('定义第一个中间件');
    next();
})
app.use(function (request, response, next) {
    console.log('定义第二个中间件');
    next();
})
```

####  定义路由中间件

如果只需要对某一些路由进行功能封装，则就需要路由中间件

调用格式如下：

```js
// 先定义一个中间件函数

// 在路由内使用中间件函数
app.get('/路径',中间件函数,(request,response)=>{
	// 内部代码
});

app.get('/路径',中间件函数1,中间件函数2,(request,response)=>{
	// 内部代码
});
```

