

# 二、axios 的使用

## 安装

```sh
npm install axios
yarn add axios
```

## 发起GET请求

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

## 发起POST请求

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

## 直接使用axios发起请求

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





