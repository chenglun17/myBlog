

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

