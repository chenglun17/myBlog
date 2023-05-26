# 其他

## Vue.use()的用法详解

[参考文章](https://blog.csdn.net/sunyctf/article/details/127706967)

**Vue.use() 是什么**

通过全局方法 Vue.use() 使用插件，Vue.use 会自动阻止多次注册相同插件，它需要在你调用 new Vue() 启动应用之前完成，Vue.use() 方法至少传入一个参数，该参数类型必须是 Object 或 Function。

<strong style="color:skyblue">Vue.use() 什么时候使用？</strong>

Vue.use() 在使用时实际是调用了该插件的 install 方法，所以，引入的当前插件如果含有 install 方法就需要使用 Vue.use()，例如在Vue中引用 ElementUI 如下： 

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

> 因为在 ElementUI 源码中会暴露出 install 方法，所以才需要用 Vue.use() 引入。

## 配置代理服务器

解决 AJAX 跨域问题，本案例需要下载 axios 库 `npm install axios`，配置参考文档 Vue-Cli devServer.proxy

vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级) 根目录中存在这个文件，它会被 @vue/cli-service 自动加载。

你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写

**方式一**

在 **vue.config.js** 中添加如下配置：

- 优点：配置简单，请求资源时直接发给前端（8080）即可
- 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
- 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，才会将请求会转发给服务器 （优先匹配前端资源）

```javascript
// 开启代理服务器（方式一）
module.exports = {
  devServer:{
    proxy: "http://localhost:5000"
  }
}
```

**方式二**

在 **vue.config.js** 中添加如下配置：

- 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
- 缺点：配置略微繁琐，请求资源时必须加前缀

```javascript
// 开启代理服务器（方式二）
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',    // 代理目标的基础路径
                pathRewrite: { '^/api': '' },  // 正则匹配，路径重写
                // ws: true, // 用于支持websocket
                // changOrigin: true,//允许跨域，用于控制请求头中的host值
            },
            // 配置多个代理服务器
            '/demo': {
                target: 'http://localhost:5001',
                pathRewrite: { '^/demo': '' },
            },
        }
    }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

App.vue文件

```vue
<template>
	<div>
		<button @click="getStudents">获取学生信息</button>
		<button @click="getCars">获取汽车信息</button>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'App',
		methods: {
			getStudents() {
				axios.get('http://localhost:8080/students').then(
					response => { console.log('请求成功了',response.data) },
					error => { console.log('请求失败了',error.message) }
				)
			},
			getCars() {
				axios.get('http://localhost:8080/demo/cars').then(
					response => { console.log('请求成功了',response.data) },
					error => { console.log('请求失败了',error.message) }
				)
			}
		},
	}
</script>
```



