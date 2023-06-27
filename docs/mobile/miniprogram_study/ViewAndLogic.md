# 视图与逻辑

## 页面导航

### 1.什么是页面导航

页面导航指的是==页面之间的相互跳转==。例如，浏览器中实现页面导航的方式有如下两种：

1. <a\>链接
2. location.href

### 2.页面导航的两种方式

1. ==声明式导航==
   - 在页面上声明一个<navigator\>导航组件
   - 通过点击<navigator\>组件实现页面跳转
2. ==编程时导航==
   - 调用小程序的导航 API，实现页面的跳转

### 3.声明式导航

#### 1.导航到 tabBar 页面

tabBar 页面指的是被配置为 tabBar 的页面

在使用==<navigator\>组件==跳转到指定的 tabBar 页面时，需要指定 ==url== 属性和 ==open-type== 属性，其中：

- url 表示要跳转的==页面的地址==，必须以 ==/== 开头
- open-type 表示==跳转的方式==，必须为 ==switchTab==

*示例代码如下：*

页面 .wxml

```
<navigator url="/pages/message/message" open-type="switchTab">导航到消息页面</navigator>
```

#### 2.导航到非 tabBar 页面

非 tabBar 页面指的是没有被配置为 tabBar 的页面。

在使用<navigator\>组件跳转到普通的非 tabBar 页面时，需要指定 ==url== 属性和 ==open-type== 属性，其中：

- url 表示要跳转的==页面的地址==，必须以 ==/== 开头
- open-type 表示==跳转的方式==，必须为 ==navigate==

*示例代码如下：*

页面 .wxml

```
<navigator url="/pages/info/info" open-type="navigate">导航到info页面</navigator>
```

注意：为了简便，在导航到非 tabBar 页面时，==open-type="navigate"== 属性==可以省略==。

#### 3.后退导航

如果要后退到上一页面或多级页面，需要指定 open-type 属性和 delta 属性，其中：

- ==open-type== 的值必须是 ==navigateBack==，表示要进行后退导航
- ==delta== 的值必须是==数字==，表示要后退的层级

*示例代码如下：*

页面 .wxml

```
<navigator open-type="navigateBack" delta='1'>返回上一页</navigator>
```

注意：为了简便，如果只是后退到上一页面，则==可以省略 delta 属性==，其==默认值就是1==。

### 4.编程式导航

#### 1.导航到 tabBar 页面

调用 ==wx.switchTab(Object object)== 方法，可以跳转到 tabBar 页面。其中 Object ==参数对象==的属性列表如下：

| 属性     | 类型       | 是否必选 | 说明                                             |
| -------- | ---------- | -------- | ------------------------------------------------ |
| ==url==  | ==String== | ==是==   | 需要跳转的 tabBar 页面的路径，路径后不能带参数   |
| success  | function   | 否       | 接口调用成功的回调函数                           |
| fail     | function   | 否       | 接口调用失败的回调函数                           |
| complete | function   | 否       | 接口调用结束的回调函数（调用成功、失败都会执行） |

*示例代码如下：*

页面 .wxml

```
//页面结构
<button bindtap="gotoMessage">跳转到消息页面</button>
```

页面 .js 中与data平级

```
//通过编程式导航，跳转到message页面
gotoMessage(){
	wx.switchTab({
		url: '/pages/message/message'
	})
}
```

#### 2.导航到非 tabBar页面

调用 ==wx.navigateTo(Object object)== 方法，可以跳转到非 tabBar 页面。其中 Object ==参数对象==的属性列表如下：

| 属性     | 类型       | 是否必选 | 说明                                             |
| -------- | ---------- | -------- | ------------------------------------------------ |
| ==url==  | ==String== | ==是==   | 需要跳转的非 tabBar 页面的路径，路径后可以带参数 |
| success  | function   | 否       | 接口调用成功的回调函数                           |
| fail     | function   | 否       | 接口调用失败的回调函数                           |
| complete | function   | 否       | 接口调用结束的回调函数（调用成功、失败都会执行） |

*示例代码如下：*

页面 .wxml

```
//页面结构
<button bindtap="gotoInfo">跳转到info页面</button>
```

页面 .js 中与data平级

```
//通过编程式导航，跳转到info页面
gotoInfo(){
	wx.navigateTo({
		url: '/pages/info/info'
	})
}
```

#### 3.后退导航

调用 ==wx.navigateBack(Object object)== 方法，可以返回上一页面或多级页面。其中 Object ==参数对象==的属性列表如下：

| 属性      | 类型       | 默认值 | 是否必选 | 说明                                                  |
| --------- | ---------- | ------ | -------- | ----------------------------------------------------- |
| ==delta== | ==number== | ==1==  | ==否==   | 返回的页面数，如果 delta 大于现有页面数，则返回到首页 |
| success   | function   |        | 否       | 接口调用成功的回调函数                                |
| fail      | function   |        | 否       | 接口调用失败的回调函数                                |
| complete  | function   |        | 否       | 接口调用结束的回调函数（调用成功、失败都会执行）      |

*示例代码如下：*

页面 .wxml

```
//页面结构
<button bindtap="gotoBack">后退</button>
```

页面 .js 中与data平级

```
//编程式导航，后退到上一页面
gotoBack(){
	wx.navigateBack()
}
```

### 5.导航传参

#### 1.声明式导航传参

navigator 组件的 url 属性用来指定将要跳转到的页面的路径。同时，==路径的后面还可以携带参数==：

- ==参数== 与 ==路径== 之间使用 ==?== 分隔
- ==参数键== 与 ==参数值== 用 ===== 相连
- ==不同参数== 用 ==&== 分隔

*代码示例如下：*

页面 .wxml

```
<navigator url="/pages/info?name=hulujing&age=22">跳转到info页面</navigator>
```

#### 2.编程式导航传参

调用 ==wx.navigateTo(Object object)== 方法跳转页面时，也可以携带参数，

*代码示例如下：*

页面 .wxml

```
//页面结构
<button bindtap="gotoInfo2">跳转到info页面</button>
```

页面 .js

```
//通过编程式导航，跳转到info页面，并携带参数
gotoInfo2(){
	wx.navigateTo({
		url: '/pages/info?name=ls&gender=男'
	})
}
```

#### 3.在 onLoad 中接收导航参数

通过==声明式导航传参==或==编程式导航传参==所携带的参数，可以直接在 ==onLoad事件==中直接获取到，

*示例代码如下：*

页面 .js

```
/**
* 生命周期函数--监听页面加载
*/
onLoad: function(options){
	//options就是导航传递过来的参数对象
	console.log(options)
}
```

## 页面事件

### 下拉刷新事件

#### 1.什么是下拉刷新

==下拉刷新==是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而==重新加载页面数据==的行为。

#### 2.启用下拉刷新

启用下拉刷新的两种方式：

1. ==全局开启下拉刷新==
   - 在 app.json 的 window 节点中，将 enablePullDownRefresh 设置为 true
2. ==局部开启下拉刷新==（推荐）
   - 在页面的 .json 配置文件中，将 enablePullDownRefresh 设置为 true

#### 3.配置下拉刷新窗口的样式

在全局或页面的 .json 配置文件中，通过 ==backgroundColor== 和 ==backgroundTextStyle== 来配置下拉刷新窗口的样式，其中：

- backgroundColor 用来配置==下拉刷新窗口的背景颜色==，仅支持16进制的颜色值
- backgroundTextStyle 用来配置==下拉刷新 loading 的样式==，仅支持 dark 和 light

#### 4.监听页面的下拉刷新事件

在页面的 .js 文件中，通过 ==onPullDownRefresh()== 函数即可监听当前页面的下拉刷新事件。

例如，在页面的 wxml 中有如下的 UI 结构，点击按钮可以让 count 值自增 +1：

页面的 .wxml

```
//页面结构
<view>count值为: {{count}}</view>
<button bindtap="countAdd">+1</button>
```

页面 .js 中与 data平级

```
//+1按钮的点击事件处理函数
countAdd(){
	this.setData({
		count: this.data.count +1
	})
}
```

在触发页面的下来刷新事件的时候，如果要把 count 的值重置为0，示例代码如下：

```
/**
*	页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh: function(){
	this.setData({
		count:0
	})
}
```

#### 5.停止下拉刷新的效果

当处理完下拉刷新后，下拉刷新的 loading 效果会一直显示，==不会主动消失==，所有需要手动隐藏下拉刷新的 loading 效果。此时，调用 ==wx.stopPullDownRefresh()== 可以停止当前页面的下拉刷新。

*示例代码如下：*

```
/**
*	页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh: function(){
	this.setData({
		count:0
	})
//当数据重置成功之后，调用此函数，关闭下拉刷新的效果
wx.stopPullDownRefresh()
}
```

### 上拉触底事件

#### 1.什么是上拉触底

==上拉触底==是移动端的专有名词，通过手指在屏幕上拉滑动操作，从而==加载更多数据==的行为。

#### 2.监听页面的上拉触底事件

在页面的 .js文件中，通过 ==onReachBottom()== 函数即可监听当前页面的上拉触底事件。

*示例代码如下：*

```
/**
*	页面上拉触底事件的处理函数
*/
onReachBottom: function(){
	console.log('触发了上拉触底事件')
}
```

#### 3.配置上拉触底距离

上拉触底距离指的是==触发上拉触底事件时，滚动条距离页面底部的距离==。

可以在全局或页面的 .json配置文件中，通过 ==onReachBottomDistance== 属性来配置上拉触底的距离。

小程序默认的触底距离是 50px，在实际开发中，可以根据自己的需求修改这个默认值

#### 4.对上拉触底进行节流处理

1. 在 data 中==定义== isloading 节流阀
   - false 表示当前没有进行任何数据请求
   - true 表示当前正在进行数据请求

2. 在 getColors() 方法中==修改== isloading 节流阀的值
   - 在刚调用 getColors 时将节流阀设置为true
   - 在网络请求的 complete 回调函数中，将节流阀重置为 false

3. 在 onReachBottom 中==判断==节流阀的值，从而对数据请求进行节流控制
   - 如果节流阀的值为 true ，则阻止当前请求
   - 如果节流阀的值为 false，则发起数据请求

## 扩展

### 自定义编译模式

## 生命周期

### 1.什么是生命周期

==生命周期==（Life Cycle）是值一个对象从 ==创建== -> ==运行== -> ==销毁== 的整个阶段，==强调的是一个时间段==。例如：

- 小程序的启动，表示生命周期的开始
- 小程序的结束，表示生命周期的结束
- 中间小程序运行的过程，就是小程序的生命周期

### 2.生命周期的分类

在小程序中，生命周期分为两类，分别是：

1. 应用生命周期
   - 特指小程序从 启动 -> 运行 -> 销毁 的过程
2. 页面生命周期
   - 特指小程序中，每个页面的 加载 -> 渲染 -> 销毁 的过程

其中，==页面==的生命周期==范围较小==，==应用程序==的生命周期==范围较大==。

### 3.什么是生命周期函数

- 生命周期函数：是由小程序框架提供的内置函数，会伴随着生命周期，自动按次序执行。

- 生命周期函数的作用：允许程序员在特定的时间点，执行某些特定的操作。例如，页面刚加载的时候，可以在 onLoad 生命周期函数中初始化页面的数据。

==注意==：生命周期强调的是时间段，生命周期函数强调的是时间点。

### 4.生命周期函数的分类

在小程序中，生命周期函数分为两类，分别是：

1. 应用的生命周期函数
   - 特指小程序从 启动 -> 运行 -> 销毁 期间依次调用的那些函数
2. 页面的生命周期函数
   - 特指小程序中，每个页面的 加载 -> 渲染 -> 销毁 期间依次调用的那些函数

### 5.应用的生命周期函数

小程序的 ==应用生命周期函数== 需要在 ==app.js== 中进行声明，*示例代码如下：*

app.js 文件

```
App({
	//小程序初始化完成时，执行此函数，全局只触发一次。可以做一些初始化的工作
	onLaunch: function(options){},
	//小程序启动时或从后台进入前台显示时触发
	onShow: function(options){},
	//小程序从前台进入后台时触发
	onHide: function(){}
})
```

### 6.页面的生命周期函数

小程序的 ==页面生命周期函数== 需要在页面的 ==.js文件== 中进行生命，*示例代码如下：*

页面的 .js文件

```
Page({
	onLoad: function(options){},	 //监听页面加载，一个页面只调用一次
	onShow: function(){},			//监听页面显示
	onReady: function(){},			//监听页面初次渲染完成，一个页面只调用一次
	onHide: function(){},			//监听页面隐藏
	onUnload: function(){}			//监听页面卸载，一个页面只调用一次
})
```

## WXS脚本

### 概述

#### 1.什么是WXS

WXS（WeiXin Script）是小程序==独有的一套脚本语言==，结合WXML，可以构建出页面的结构。

#### 3.WXS的应用场景

wxml中无法调用在页面的 .js中定义的函数，但是，wxml中可以调用 wxs 中定义的函数。

因此，小程序中 wxs 的典型应用场景就是 "==过滤器=="。

#### 4.WXS 和JavaScript 关系*

虽然 wxs 的语法类似于JavaScript，但是 wxs 和 JavaScript 是完全不同的两种语言：

1. ==wxs 有自己的数据类型==
   - number 数值类型、string 字符串类型、boolean 布尔类型、object 对象类型
   - function 函数类型、array 数组类型、date 日期类型、regexp 正则
2. ==wxs 不支持类似于 ES6 及以上的语法形式==
   - 不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc
   - ==支持==：var 定义变量、普通 function 函数等类似于 ES5 的语法
3. ==wxs 遵循 commonJS 规范==
   - module对象
   - require()函数
   - module.exports对象

### 基础语法

#### 1.内嵌 WXS 脚本

wxs代码可以编写在 wxml 文件中的 ==<wxs\>== 标签内，就像 JavaScript代码可以编写在 html 文件中的 <script\> 标签内一样。

wxml 文件中的每一个<wxs\></wxs\> 标签，==必须提供 module 属性==，用来指定==当前 wxs 的模板名称==，方便在 wxml 中访问模块中的成员：

页面 .wxml

```
<view>{{m1.toUpper(username)}}</view>

<wxs module="m1">
	//将文本转化为大写形式 zs -> ZS
	module.exports.toUpper = function(str){
		return str.toUpperCase()
	}
</wxs>
```

#### 2.定义外联的 wxs 脚本

wxs 代码还可以编写在==以 .wxs为后缀名的文件内==，就像 JavaScript 代码可以编写在以 .js 为后缀名的文件中一样。

*示例代码如下：*

utils文件夹 -> tools.wxs

```
function toLower(str){
	return str.toLowerCase()
}

module.exports = {
	toLower: toLower
}
```

#### 3.使用外联的 wxs 脚本

在 wxml 中引入外联的 wxs 脚本时，==必须==为 <wxs\> 标签添加 module 和 src 属性，其中：

- ==module== 用来指定模块的名称
- ==src== 用来指定要引入的脚本的路径，且==必须是相对路径==

*示例代码如下：*

页面 .js

```
data:{
	country:'CHINA'
}
```

页面 .wxml

```
<!--调用m2模块中的方法-->
<view>{{m2.toLower(country)}}</view>

<!--引用外联的tools.wxs脚本，并命名为m2-->
<wxs src="../../utils/tools.wxs" module="m2"></wxs>
```

### WXS 的特点

#### 1.与 JavaScript 的不同

为了降低 wxs（==Weixin Script==）的学习成本，wxs 语言在设计时大量借鉴了 JavaScript 的语法。但是本质上，wxs  和 JavaScript 是完全不同的两种语言！

#### 2.不能作为组件的事件回调

wxs 典型的应用场景就是 "==过滤器=="，==经常配合 Mustache 语法进行使用==，例如：

```
<view>{{m2.toLower(coutry)}}</view>
```

但是，在 wxs中定义的函数==不能作为组件的事件回调函数==。例如，下面的用是==错误==的：

```
<button bindtap="m2.toLower">按钮</button>
```

#### 3.隔离性

==隔离性==指的是 wxs 的运行环境和其他 JavaScript 代码是隔离的。体现在如下两方面：

1. wxs 不能调用 js 中定义的函数
2. wxs 不能调用小程序提供的 API

#### 4.性能好

- 在 iOS设备上，小程序内的 WXS 会比 JavaScript 代码快2~20倍
- 在 Android 设备上，二者的运行效率无差异