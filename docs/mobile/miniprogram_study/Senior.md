# 微信小程序进阶

## API Promise 化

### 1.基于回调函数的异步 API 的缺点

默认情况下，小程序官方提供的==异步 API== 都是==基于回调函数==实现的，例如，网络请求的 API 需要按照如下的方式调用：

```
wx.request({
	methods: '',
	url: '',
	data: {},
	success: () => {},	//请求成功的回调函数
	fail: () => {},		//请求失败的回调函数
	complete: () => {}	//请求完成的回调函数
})
```

缺点：容易造成 ==回调地狱== 的问题，代码的 ==可读性、维护性== 差！

### 2.什么是 API Promise 化

API Promise 化，值的是 ==通过额外的配置==，将官方提供的、基于回调函数的异步 API，升级改造为基于 Promise 的异步 API，从而提高代码的可读性、维护性，避免回调地狱的问题

### 3.实现 API Promise 化

在小程序中，实现 API Promise 化主要依赖于 ==miniprogram-api-promise== 这个如第三方的 npm 包。它的安装和使用步骤如下：

```
npm install --save miniprogram-api-promise@1.0.4
```

安装完成后需要重新构建npm（如果有minipropram_npm文件夹，先删除再执行工具中的构建npm）

```
//在小程序入口文件中（app.js），只需要调用一次 promisifyAll() 方法
//即可实现异步 API 的 Promise 化
import {promisifyAll} from 'miniprogram-api-promise'

const wxp = wx.p = {}	//定义一个空白对象

// promisify all wx's api
promisifyAll(wx,wxp)
```

wx是一个点击对象，包含了很多方法，把这个对象上的方法通过promisifyAll()函数进行promise化，之后把promise化的api挂载到wxp这个空对象上

### 4.调用 Promise 化之后的异步 API

```
//页面的 .wxml 结构
<van-botton type="danger" bindtap="getInfo">vant按钮</vant-button>

//页面的 .js 文件中，定义对应的 tap 事件处理函数
async getInfo() {
	const {data: res} = await wx.p.request({
		method: 'GET',
		url: 'https://www.escook.cn/api/get',
		data:{name:'zs',age:20}
	})
	
	console.log(res)
}
```

