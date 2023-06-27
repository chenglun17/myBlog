# Express 框架

##  :star:基本概念

[express](https://www.expressjs.com.cn/) 是一个基于 Node.js 平台的极简、灵活的 WEB 应用开发框架。

简单来说，express 是一个封装好的工具包，封装了很多功能，便于我们开发 WEB 应用(HTTP 服务)

Express 框架核心特性：

- 可以设置中间件来响应 HTTP 请求。
- 定义了路由表用于执行不同的 HTTP 请求动作。
- 可以通过向模板传递参数来动态渲染 HTML 页面。



## :star:安装 express

**express 本身是一个 npm 包**，所以可以通过 npm 安装

```shell
npm install express --save
```

命令会将 Express 框架安装在当前目录的 **node_modules** 目录中，在其目录下会自动创建 express 目录。

以下几个重要的模块是需要与 express 框架一起安装的：

- `body-parser`：node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
- `cookie-parser`：这就是一个解析Cookie的工具。通过`req.cookies`可以取到传过来的 cookie，并把它们转成对象。
- `multer`：node.js 中间件，用于处理 `enctype="multipart/form-data"`（设置表单的MIME编码）的表单数据。

```sh
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
```

安装完后，我们可以查看下 express 使用的版本号：

```sh
npm list express
```



**Hello World**

1. 创建`app.js`文件，键入如下代码

```javascript
// 1. 导入 express
const express = require('express')

// 2. 创建Web服务器
const app = express()

const HOSTNAME = 'http://127.0.0.1'
const PORT = 3000
const HOST = `${HOST}:${PORT}`

// 3. 创建路由规则
app.get('/', (req, res) => {
    res.end('Hello World')
})

// 4. 监听端口 启动服务
app.listen(PORT, () => {
    console.log(`serve is runnig at ${HOST}`);
})
```

2. 命令行下执行该脚本

```shell
node <文件名>
# 或者
nodemon <文件名>
```

或`package.json`中配置

```json
"scripts": {
    "dev": "nodemon ./app.js"
}
```

3. 到这里，一个 Express 项目就顺利搭建起来了，然后在浏览器就可以访问 http://127.0.0.1:3000



## :star:项目生成器

除了以上方式，你还可以通过应用生成器工具 express-generator 可以快速创建一个应用的骨架。

```sh
npm install -g express-generator
```

express-generator 安装完成之后，可以使用 express 快速创建一个新项目。

```sh
express my-app
```

创建完成之后，终端给出步骤提示



##  :star:请求与响应

express 框架封装了一些 API 来方便给客户端响应数据，并且兼容原生 HTTP 模块的获取方式。

express 应用使用回调函数的参数： **request** 和 **response** 对象来处理请求和响应的数据。

### Request 对象

request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

1. req.app：当callback为外部文件时，用req.app访问express的实例
2. req.baseUrl：获取路由当前安装的URL路径
3. req.body / req.cookies：获得「请求主体」/ Cookies
4. req.fresh / req.stale：判断请求是否还「新鲜」
5. req.hostname / req.ip：获取主机名和IP地址
6. req.originalUrl：获取原始请求URL
7. req.params：获取路由的parameters
8. req.path：获取请求路径
9. req.protocol：获取协议类型
10. `req.query`：获取URL的查询参数串，即GET参数
11. req.route：获取当前匹配的路由
12. req.subdomains：获取子域名
13. req.accepts()：检查可接受的请求的文档类型
14. req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
15. req.get()：获取指定的HTTP请求头
16. req.is()：判断请求头Content-Type的MIME类型



### Response 对象

response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

1. res.app：同req.app一样

2. res.append()：追加指定HTTP头

3. res.set()在res.append()后将重置之前设置的头

4. `res.cookie(name，value [，option])`：设置Cookie

   opition: domain / expires / httpOnly / maxAge / path / secure / signed

5. res.clearCookie()：清除Cookie

6. res.download()：传送指定路径的文件

7. res.get()：返回指定的HTTP头

8. res.json()：发送JSON响应

9. res.jsonp()：发送具有JSONP支持的JSON响应

10. res.location()：只设置响应的 Location HTTP 头，不设置状态码或者close response

11. res.redirect()：重定向，设置响应的 Location HTTP 头，并且设置状态码302

12. res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。

13. `res.send()`：传送HTTP响应

14. `res.sendFile(path [，options] [，fn])`：传送指定路径的文件 -会自动根据文件extension设定Content-Type

15. res.set()：设置HTTP头，传入object可以一次设置多个头

16. res.status()：设置HTTP状态码

17. res.type()：设置Content-Type的MIME类型

```javascript
// 获取请求的路由规则
app.get('/', (req, res) => {
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
  	res.redirect('http://atguigu.com')  // 重定向
  	res.download('./package.json')    	// 下载响应
  	res.json({    					  // 响应 JSON
        name: 'atguigu',
        slogon: '123456'
    })
  	res.sendFile(__dirname + '/home.html')   //响应文件内容
})
```





## :star:中间件

###  1.什么是中间件

中间件（Middleware）特指业务流程的中间处理环节，本质就是一堆方法，可以接收客户端发来的请求，可以对请求做出响应，也可以将请求继续交给下一个中间间继续处理。

中间件主要由两部分构成：**中间件方法** + **请求处理函数**。

- 中间件方法，由 express 提供，负责拦截请求
- 请求处理函数，由开发者提供，负责处理请求

```js
app.get('请求路径', '处理函数'); // 接收并处理get请求
app.post('请求路径', '处理函数'); // 接收并处理post请求
```

中间件函数可以像路由回调一样访问 `请求对象（request）` ， `响应对象（response）`

![中间件](Express.assets/中间件.png)

### 2.中间件的基本使用

```js
// 1. 引入 express
const express = require('express')
// 2. 创建Web服务器
const app = express();

const PORT = 3000
const HOST = 'http://127.0.0.1'
const HOSTNAME = `${HOST}:${PORT}`

// 接收所有的请求的中间件
app.use((req, res, next) => {
    console.log('请求走了 app.use 中间件');
    next();
})

// 当客户端访问 /request 请求的时候走当前中间件
app.use('/request', (req, res, next) => {
    console.log('请求走了 app.use /request 中间件');
    next();
})

// 当客户端访问 /request 请求的时候走当前中间件
app.get('/request', (req, res, next) => {
    req.name = 'chenglun17';
    next(); // 向下执行
})

app.get('/request', (req, res)=> {
    res.send(req.name);
})

// 4. 监听端口 启动服务
app.listen(PORT, () => {
    console.log(`serve is runnig at ${HOSTNAME}`);
})
```



### 3.中间件的应用

路由保护：

网站维护公告

自定义404页面

```js
app.use((req, res, next) => {
    // 为客户端响应404状态码以及提示信息
    res.status(404).send('当前访问的页面是不存在的');
})
```



### 4.中间件的类型

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







##  :star:基本路由

### 1.什么是路由

官方定义： 路由确定了应用程序如何响应客户端对特定端点的请求

### 2.路由的使用

express 中的路由由三部分组成，分别是**请求的类型** + **请求的 URL 地址** + **处理函数**



express 中提供了一系列方法，可以很方便的使用路由，使用格式如下：

```js
app.<method>(path，handler)
```

- method，一个HTTP请求方法（小写）
- path，服务器上的路径
- handler，匹配路由时执行的函数

express 支持对应于 HTTP 方法的以下路由方法：`get、post、put、head、delete、options、trace、copy、lock、mkcol、move、purge、propfind、proppatch、unlock、report、mkactivity、checkout、merge、m-search、notify、subscribe、unsubscribe、patch、search 和 connect`

代码示例：

```javascript
// 导入 express
const express = require('express')
//创建应用对象
const app = express()

// GET请求
app.get('/', (req,res) => {
	res.send('我才是真正的首页')
})

// POST请求
app.post('/login', (req, res) => {
	res.send('登录成功')
})

// 匹配所有的HTTP请求方法
app.all('/search', (req, res) => {
	res.send('1 秒钟为您找到相关结果约 100,000,000 个')
})

// 自定义404路由
app.all("*", (req, res) => {
	res.send('<h1>404 Not Found</h1>')
})

// 监听端口 启动服务
app.listen(3000, () =>{
	console.log('服务已经启动, 端口监听为 3000')
})
```

###  2.获取请求参数

express 框架封装了一些 API 来方便获取请求报文中的数据，并且兼容原生 HTTP 模块的获取方式。

express 框架中使用 `req.query` 即可获取GET参数 ，框架内部会将GET参数转换为**对象**并返回：

```javascript
app.get('/request', (req, res) => {
	// 1. 获取报文的方式与原生 HTTP 获取方式是兼容的
	console.log(req.method)
	console.log(req.url)
	console.log(req.httpVersion)
	console.log(req.headers)
	
    // 2. express 独有的获取报文的方式
	console.log(req.path) // 获取路径
	console.log(req.query) // 『相对重要』对象形式 获取查询字符串
	console.log(req.get('host')) // 获取指定的请求头
	res.send('请求报文的获取')
})
```

express 中接收 `POST请求参数` 需要借助第三方包 `body-parser`：

```js
// 引入 body-parser 模块
const bodyParser = require('body-parser');
// 配置 body-parser 模块
// extended: false  方法内部使用 querystring 模块处理请求参数的格式
// extended: true   方法内部使用第三方模块 qs 来处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/request', (req, res) => {
    console.log(req.body);
})
```



### 3.获取路由参数

路由参数指的是 URL 路径中的参数（数据）

```javascript
// :id 为占位符
app.get('/:id.html', (req, res) => {
	res.send('商品详情, 商品 id 为' + req.params.id)
})
```



### 4.构建模块化路由

为了方便对路由进行管理，不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。步骤如下：

1. 创建路由模块对应的 `router/user.js` 文件
2. 调用 `express.Router()` 创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用 module.exports 向外共享路由对象
5. 使用 app.use() 函数注册路由模块

```js
const express = require('express');
// 创建路由对象
const router = express.Router();
// 创建二级路由
router.get('/user_id', function(req, res) {
    res.send('这是一个 /user/id 路由')
})
module.exports = router
```

在`app.js`中注册路由模块：

```js
const userRoute = require('./router/user')

app.use('/user', userRoute) // 为路由对象匹配请求路径，相当于一级路由

// 表示在匹配到 url 有 /user 时，继续使用 userRoute 路由模块匹配规则，userRoute 中有对 /user_id 进行匹配
// 此时可以访问 http://localhost:3000/user/user_id
```

当然你也可以不为路由模块添加前缀或者添加更长的前缀

```js
app.use(userRoute)   // 此时匹配 localhost:3000/user_id
 
app.use('/admin/user', userRoute)   // localhost:3000/admin/users/show
```



## :star:托管静态文件

express 提供了内置的中间件函数 `express.static` 来托管静态文件如：图片，CSS, JavaScript 等。

```js
express.static(root, [options]);
```

例如，通过如下代码就可以将 `public` 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static('public'));
```

现在，你就可以访问 `public` 目录中的所有文件了：http://localhost:3000/images/bg.png

> Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中。

如果要使用多个静态资源目录，请多次调用 `express.static` 中间件函数：

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

> 访问静态资源文件时，`express.static` 中间件函数会根据目录的添加顺序查找所需的文件。

创建虚拟路径前缀（该路径在文件系统中实际上不存在）。指定静态目录的挂载路径，如下所示:

```js
app.use('/static', express.static('public'));

// 更建议使用绝对路径
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));
```

现在，你就可以通过带有 `/static` 前缀地址来访问 `public` 目录中的文件了：http://localhost:3000/static/images/bg.png



## 文件上传

## Cookie管理







## 错误处理

在 node.js中，**异步API的错误信息都是通过回调函数获取的**，支持 Promise 对象的异步API发生错误可以通过catch方法捕获。

**try catch** 可以捕获**异步函数**以及其他**同步代码执行过程中**发生的错误，但是不能捕获其他类型的错误（回调函数的错误、Promise对象的错误）。



## 参考

[Express 中文网](https://www.expressjs.com.cn/)、[菜鸟教程](https://www.runoob.com/nodejs/nodejs-express-framework.html)、[参考文章](https://blog.csdn.net/qq_27575925/article/details/109290650)、[参考文章](https://blog.csdn.net/qq_41809113/article/details/125898480)、参考文章、参考文章