# 三、拦截器

在请求前或响应被处理前拦截他们，分为两种：请求拦截器与响应拦截器

使用自定义配置新建一个实例

```js
const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
```

## 设置拦截器

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

## 拦截器函数调用顺序

拦截器函数/ajax 请求/请求的回调函数的调用顺序：

1. 说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程
2. 流程: 请求拦截器2 => 请求拦截器1 => 发ajax请求 => 响应拦截器1 => 响应拦截器 2 => 请求的回调
3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应拦截器传递的是 response

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

