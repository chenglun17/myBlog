



# 四、fetch

fetch() 方法用于发起获取资源的请求。

fetch 使用的是 `promise` 方便使用异步，没有回调地狱的问题。

它返回一个 promise，这个 promise 会在请求响应后被 resolve，并传回 Response 对象。

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
      // return response.text();
      return response.json()
    }).then(response=>{
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
    // response.send('Hello fetch');
    const data = {name:'尚硅谷'}
    response.send(JSON.stringify(data))
})
```

文档地址 https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch

