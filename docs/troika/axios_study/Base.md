# 一、axios 基础

## 基本概念

[Axios](https://www.axios-http.cn) 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js 。

在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

axios（相比于原生的 XMLHttpRequest 对象来说） **简单易用**,（相比于 jQuery）更加**轻量化**且提供了易于扩展的接口，是专注于网络请求的库。（axios 本质上是原生 XMLHttpRequest 的封装）

## axios特点

1. Axios 是一个基于 promise 的 HTTP 库，支持 promise 所有的API
2. 它可以拦截请求和响应
3. 它可以转换请求数据和响应数据
4. 它可以取消请求
5. 它可以自动转换成 JSON 类型的数据
6. 安全性更高，客户端支持防御 XSRF


> **XSRF** 的全称是 “跨站请求伪造”，它利用的是服务器对客户端浏览器的信任，从而伪造用户向服务器发送请求，从而欺骗服务器达到一些目的。

## axios API

- **axios(config)**：通用（最本质）的发任意类型请求的方式
- **axios (url [, config])**：可以指定 url 发 get 或 psot 请求
- **axios.request (config)**：等同于 axios(config)
- **axios.get (url [, config])**：发 get 请求，一般用户获取数据
- **axios.delete (url [, config])**：发 delete请求，删除数据
- **axios.post (url [, data, config])**：发 post 请求，一般用于表单提交与文件上传
- **axios.put (url [, data, config])**：发 put 请求，更新数据（所有数据推送到服务端）
- **axios.patch(url [, data, config])**：发 patch 请求，更新数据（只将修改的数据推送到后端）

备注：post一般用于新建数据，put一般用于更新数据，patch一般用于数据量较大的时候的数据更新

------

- **axios.defaults.xxx**：请求的默认全局配置
- <strong style="color:#DD5145">`axios.interceptors.request.use()`</strong>：添加请求拦截器
- <strong style="color:#DD5145">`axios.interceptors.response.use()`</strong>：添加响应拦截器
- <strong style="color:#DD5145">`axios.create([, config])`</strong>：创建一个新的 axios（它没有下面的功能）

------

- **axios.Cancel( )**：用于创建取消请求的错误对象
- **axios.CancelToken( )**：用于创建取消请求的 token 对象
- **axios.isCancel( )**：是否是一个取消请求的错误
- **axios.all(promise)**：用于批量执行多个异步请求
- **aixos.spread( )**：用来指定接收所有成功数据的回调函数的方法

https://blog.csdn.net/qq_52151772/article/details/122117478)

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



## 参考

[中文文档](https://www.axios-http.cn)、[参考文章](https://devpress.csdn.net/viewdesign/63ff2b4d986c660f3cf90b47.html)、[参考文章2](https://blog.csdn.net/qq_52151772/article/details/122117478)

