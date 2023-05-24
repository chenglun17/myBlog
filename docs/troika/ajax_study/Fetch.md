# 四、Fetch

MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

[参考文章](https://blog.csdn.net/wanghu20150107010129/article/details/128526528)、[参考文章2](https://blog.csdn.net/aflylong/article/details/118809186)、[参考文章3](https://www.jianshu.com/p/4daa80a9da6b)

## 基本概念

fetch 是一种 HTTP 数据请求的方式，是 XMLHttpRequest 的一种替代方案。fetch 并不是 ajax 的进一步封装，而是<strong style="color:#DD5145">原生JS</strong>。

fetch 函数就是原生JS，没有使用 XMLHttpRequest 对象，不像 axios，想要使用 axios 还需要作第三方的引入。

fetch 的核心在于对 HTTP 接口的抽象，包括 `Request`，`Response`，`Headers`，`Body`，以及用于初始化异步请求的 `global fetch`。

fetch 基于`Promise`方便使用异步，没有回调地狱。

它返回一个 promise，在请求响应后被 resolve，并传回 Response 对象。

## fetch 优势

- 语法简洁，更加语义化（不像ajax要写一堆代码）
- 基于标准Promise实现，支持async和await
- 脱离了XHR,是ES规范里新的实现方式
- 无需引入第三方插件（axios是要引入的）

## fetch 缺点

- 不支持超时处理。如果请求超时，fetch 不会自动中断请求，而是会一直等待服务器响应。
- 不支持自动重试。如果请求失败，fetch 不会自动重新发起请求。
- 不支持拦截器。在发起请求和接收响应时，无法通过拦截器对请求和响应进行处理。

> - 使用超时库。可以使用 **fetch-timeout** 库来为 fetch 添加超时处理。
>
>   ```js
>   import fetchTimeout from 'fetch-timeout'
>   
>   const fetch = (url, options, timeout = 5000) => {
>       return fetchTimeout(url, options, timeout).catch(error => {
>           if (error.name === 'FetchTimeoutError') {
>               // 处理超时错误
>           } else {
>               // 处理其他错误
>           }
>       })
>   }
>   ```
>
> - 使用重试库。可以使用 **fetch-retry** 库来为 fetch 添加重试功能。
>
>   ```js
>   import fetchRetry from 'fetch-retry'
>   
>   const fetch = (url, options, retries = 3, retryDelay = 1000) => {
>       return fetchRetry(url, options, retries, retryDelay).catch(error => {
>           // 处理错误
>       })
>   }
>   ```
>
> - 使用拦截器库。可以使用 **fetch-intercept** 库来为 fetch 添加拦截器功能。
>
>   ```js
>   import fetchIntercept from 'fetch-intercept'
>   
>   fetchIntercept.register({
>       request: function(url, config) {
>           // 在发起请求之前做一些处理
>           return [url, config]
>       },
>   
>       requestError: function(error) {
>           // 对请求错误做些什么
>           return Promise.reject(error)
>       },
>   
>       response: function(response) {
>           // 对响应数据做一些处理
>           return response
>       },
>   
>       responseError: function(error) {
>           // 对响应错误做些什么
>           return Promise.reject(error)
>       }
>   });
>   
>   // 使用 fetch 函数发起请求
>   fetch('/users')
>       .then(res => {
>       console.log(res)
>   })
>       .catch(error => {
>       console.log(error)
>   })
>   ```

## fetch 方法

全局的**`fetch()`**方法用于发起获取资源的请求。它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回`Response`对象。

ES6 新方法 fetch

语法

```js
Promise<Response> fetch(input[, init])
```

fetch 使用的基本格式

```js
fetch('url地址' + '接口', {
    method: 'POST',	// 请求方式 method-支持 GET, POST, PUT, DELETE, HEAD
    body: JSON.stringify(data),	// body -请求参数（JSON.stringify过的字符串或’name=jim\u0026age=22’格式)
    headers:{
        'content-type': 'application/json'	// headers-对应的 Headers 对象
    },
    mode: 'no-cors',	// 不允许跨域
}).then((response) => {
    return response.json()	// 返回一个promise对象
    //  res.json()     返回的数据类型是json格式
    //  res.text()     返回的是文本格式
    //  res.blob()     处理 二进制，主要针对 图片  以及 流
}).then((data) => {
    console.log(data)	// 数据在此处打印出来
    // 前一个then没有返回值则会显示undefined
})
```

> mode有三个取值 same-origin 不允许跨域 | cors 允许跨域 | no-cors 不允许跨域，需服务器配合如 node.js no-cors 允许跨域，服务器不需要设置如上代码但不能将服务端数据返回需要注意得是cors不支持application/json

## 接口

### Headers

### Request

### Response

## 实例

```html
<button>AJAX请求</button>
<script>
    const btn = document.querySelector('button')

    btn.onclick = function(){
        fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
            //请求方法
            method: 'POST',
            //请求头
            headers: {
                name:'atguigu'
            },
            //请求体
            body: 'username=admin&password=admin'
        }).then(response => {
            // return response.text()
            return response.json()
        }).then(response => {
            console.log(response)
        })
    }
</script>
```

server.js 文件

```javascript
//fetch 服务，all 可以接收任意类型的请求
app.all('/fetch-server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    // response.send('Hello fetch')
    const data = {name:'尚硅谷'}
    response.send(JSON.stringify(data))
})
```

