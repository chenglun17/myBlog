# 七、Vue3 其他

## 1.Proxy 跨域代理

[参考文章](https://vue3js.cn/interview/vue/cors.html)、[参考文章2](https://blog.csdn.net/qq_52822043/article/details/124438656)

Vue3 配置代理解决跨域问题，在 vite.config.js 文件中进行配置

```js
server: {
    host: "localhost",
    port: 8080,
    open: true, // vue项目启动时自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
        '/api': { 	// apiTest 是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
            target: 'http://localhost:5000', // 实际请求地址，后台地址
            changeOrigin: true, // 是开启跨域
            rewrite: (path) => path.replace('/^\/api/', '')// 作用是把实际Request Url中的'/api'用""代替
        }
    }
}
```

axios 的文件中配置：

```js
const httpInstance = axios.create({
    baseURL: '/api',
    timeout: 2000
})
```

> 当你请求到带有`/api`路径的 url 时。程序就自动把`/api`替换为`http://localhost:5000/api`

## 2.事件传递参数

以这种方式传递过去多个参数

```vue
<tr v-for="i in cartStore.cartList" :key="i.id">
    <!-- 单选框 -->
    <td><el-checkbox :model-value="i.selected" @change="selected => singleCheck(i, selected)" /></td>
</tr>
```

方法

```vue
<script setup>
    import { useCartStore } from '@/stores/cartStore'
    const cartStore = useCartStore()

    // 单选回调
    const singleCheck = (i, selected) => {
        console.log(i, selected)
    }
</script>
```

