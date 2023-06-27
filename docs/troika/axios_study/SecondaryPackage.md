

# 四、axios 的二次封装

![image-20230516221148931](SecondaryPackage.assets/image-20230516221148931.png)

## 1. 安装axios

```bash
npm i axios
```

## 2. 基础配置

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

## 3. 封装请求函数并测试

```javascript
import http from '@/utils/http'

export function getCategoryAPI () {
    return http({
        url: 'home/category/head'
    })
}
```


