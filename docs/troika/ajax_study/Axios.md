# 三、Axios

中文文档：https://www.axios-http.cn

[参考文章](https://devpress.csdn.net/viewdesign/63ff2b4d986c660f3cf90b47.html)、[参考文章2](https://blog.csdn.net/qq_52151772/article/details/122117478)

## 基本概念

[axios](https://github.com/axios/axios) 是一个基于 promise 的 HTTP 库，支持 promise 所有的API，可以用于浏览器和 node.js 。

在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

axios（相比于原生的XMLHttpRequest对象来说） **简单易用**,（相比于jQuery）更加**轻量化**且提供了易于扩展的接口，是专注于网络请求的库。（axios本质上是原生XMLHttpRequest的封装）

## axios 的特点

1. Axios 是一个基于 promise 的 HTTP 库，支持 promise 所有的API
2. 它可以拦截请求和响应
3. 它可以转换请求数据和响应数据
4. 它可以取消请求
5. 它可以自动转换成 JSON 类型的数据
6. 安全性更高，客户端支持防御 XSRF


> **XSRF** 的全称是 “跨站请求伪造”，它利用的是服务器对客户端浏览器的信任，从而伪造用户向服务器发送请求，从而欺骗服务器达到一些目的。

## axios API

> - **axios(config)**：通用（最本质）的发任意类型请求的方式
> - **axios (url [, config])**：可以指定 url 发 get 或 psot 请求
> - **axios.request (config)**：等同于 axios(config)
> - **axios.get (url [, config])**：发 get 请求，一般用户获取数据
> - **axios.delete (url [, config])**：发 delete请求，删除数据
> - **axios.post (url [, data, config])**：发 post 请求，一般用于表单提交与文件上传
> - **axios.put (url [, data, config])**：发 put 请求，更新数据（所有数据推送到服务端）
> - **axios.patch(url [, data, config])**：发 patch 请求，更新数据（只将修改的数据推送到后端）
>
> 备注：post一般用于新建数据，put一般用于更新数据，patch一般用于数据量较大的时候的数据更新

> - **axios.defaults.xxx**：请求的默认全局配置
> - <strong style="color:#DD5145">`axios.interceptors.request.use()`</strong>：添加请求拦截器
> - <strong style="color:#DD5145">`axios.interceptors.response.use()`</strong>：添加响应拦截器

> - <strong style="color:#DD5145">`axios.create([, config])`</strong>：创建一个新的 axios（它没有下面的功能）
>
> - **axios.Cancel( )**：用于创建取消请求的错误对象
> - **axios.CancelToken( )**：用于创建取消请求的 token 对象
> - **axios.isCancel( )**：是否是一个取消请求的错误
> - **axios.all(promise)**：用于批量执行多个异步请求
> - **aixos.spread( )**：用来指定接收所有成功数据的回调函数的方法

## axios 的使用

### 安装

```sh
npm install axios
yarn add axios
```

### 发起GET请求

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

### 发起POST请求

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

### 直接使用axios发起请求

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
    
    axios.defaults.baseURL = 'http://127.0.0.1:8000'	// 配置 baseURL

    // GET 请求
    btns[0].addEventListener('click', function () {
        axios.get('/axios-server', { 
            params: { id: 100, vip: 7 },	// url参数
            headers: { name: 'zhangsan', age: '20' }	// 设置请求头信息
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
            params: { id: 200, vip: 9 },	// url
            headers: { height: 180, weight: 180 }	// 请求头参数
        })
    })

    // axios函数
    btns[2].addEventListener('click', function () {
        axios({
            methods: 'POST',	// 请求方法
            url: '/axios-server',	// url
            params: { id: 300, vip: 10 },	// url参数
            headers: { a: 100, b: 200 },	// 头信息
            data: { username: 'admin', password: 'admin' }	// 请求体参数
        }).then(response => {
            console.log(response.status)	// 响应状态码
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

## 配置对象

**配置对象（config）**详细说明：

> - baseURL：请求的域名（基本地址）
>
> - timeout：请求的超时时长，超出后后端返回401
>
>   备注：一般由后端定义，后端的接口需要的处理时长较长的时候，如果请求的时间过长，后端处理不过来，就会阻塞，给服务器造成较大的压力。设置后，可以及时释放掉
>
> - url：请求路径，用于请求的服务器 URL
>
> - method：请求方法。如：get、post、put、patch、delete等
>
> - headers：请求头
>
> - params：将请求参数拼接到url上
>
> - data：将请求参数放置到请求体里 

## 响应结构

一个请求的响应包含以下信息

```js
{
    // data 由服务器提供的响应
    data: {},

    // status 来自服务器响应的 HTTP 状态码
    status: 200,

    // statusText 来自服务器响应的 HTTP 状态信息
    statusText: 'OK',

    // headers 是服务器响应头
    // 所有的 header 名称都是小写，而且可以使用方括号语法访问
    // 例如: response.headers['content-type']
    headers: {},

    // config 是 axios 请求的配置信息
    config: {},

    // request 是生成此响应的请求
    // 在 node.js 中它是最后一个 ClientRequest 实例 (in redirects)，
    // 在浏览器中则是 XMLHttpRequest 实例
    request: {},
}
```

## 默认配置

全局 axios 默认值：

```js
// 设置基础 URL
axios.defaults.baseURL = 'https://api.example.com'

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

自定义实例默认值：

```js
// 创建实例时配置默认值
const instance = axios.create({
    baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

> 配置的优先级：
>
> 在`lib/defaults.js`中找到的库默认值，然后是实例的`defaults`属性，最后是请求的`config`参数。后面的优先级要高于前面。

## 拦截器

在请求前或响应被处理前拦截他们，分为两种：请求拦截器与响应拦截器

使用自定义配置新建一个实例

```js
const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
```

### 设置拦截器

**请求拦截器：**对请求数据做处理

```javascript
// 请求拦截器
instance.interceptors.request.use(config => { 
  // 在发送请求前做些什么
  return config;
}, error => { 
    // 在请求错误的时候的逻辑处理
    return Promise.reject(error)
});
```

**响应拦截器：**对结果做处理

```javascript
// 响应拦截器
instance.interceptors.response.use(response => {
    // 超出 2xx 范围的状态码都会触发该函数。
  // 在请求成功后的数据处理
  return response;
}, error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 在响应错误的时候的逻辑处理
    return Promise.reject(error)
});
```

**取消拦截器:**

```javascript
const myInterceptor = instance.interceptors.request.use(config => { /*...*/ })

instance.interceptors.request.eject(myInterceptor)
```

### 拦截器函数调用顺序

拦截器函数/ajax 请求/请求的回调函数的调用顺序：

> 1. 说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程
> 2. 流程: 请求拦截器2 => 请求拦截器1 => 发ajax请求 => 响应拦截器1 => 响应拦截器 2 => 请求的回调
> 3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应拦截器传递的是 response

```javascript
// 对axios进行二次封装（主要是需要用到请求、响应拦截器）
// ------------------利用create方法，去创建一个axios实例------------------
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: "/api",
    timeout: 5000, // 请求超时时间5s
})
// ------------------设置请求拦截器  config 配置对象------------------
requests.interceptors.request.use((config) => {
    console.log('请求拦截器 成功 - 1号')
    config.params = {a: 100}	// 修改 config 中的参数
    return config
}, (error) => {
    console.log('请求拦截器 失败 - 1号')
    return Promise.reject(new Error(error))
});

requests.interceptors.request.use((config) => {
    console.log('请求拦截器 成功 - 2号')
    config.timeout = 2000	// 修改 config 中的参数
    return config
}, (error) => {
    console.log('请求拦截器 失败 - 2号')
    return Promise.reject(new Error(error))
});


// ------------------设置响应拦截器------------------
requests.interceptors.response.use((response) => {
    console.log('响应拦截器 成功 - 1号');
    return response.data
}, function (error) {
    console.log('响应拦截器 失败 - 1号')
    return Promise.reject(new Error(error))
});

requests.interceptors.response.use((response) => {
    console.log('响应拦截器 成功 - 2号')
    return response
}, function (error) {
    console.log('响应拦截器 失败 - 2号')
    return Promise.reject(new Error(error))
});

// ------------------发送请求------------------
requests({ 
    url: 'http://localhost:3000/posts', 
    method: 'GET'
}).then(response => {
    console.log('自定义回调处理成功的结果', response)
}).catch(reason => {
    console.log('自定义失败回调')
})
```

## 取消请求



## axios 的二次封装

<img src="Axios.assets/image-20230516221148931.png" alt="image-20230516221148931" style="zoom:80%;" />

### 1. 安装axios

```bash
npm i axios
```

### 2. 基础配置

> 官方文档：[https://axios-http.com/zh/docs/intro](https://axios-http.com/zh/docs/intro)
> 基础配置通常包括：
>
> 1. 实例化 - baseURL + timeout
> 2. 拦截器 - 携带token、401拦截等

```javascript
// src/utils/http.js
// axios的二次封装
import axios from "axios"

// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// axios响应拦截器
httpInstance.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default httpInstance
```

### 3. 封装请求函数并测试

```javascript
import http from '@/utils/http'

export function getCategoryAPI () {
    return http({
        url: 'home/category/head'
    })
}
```

