# 模板与配置

## WXML模板语法

### 数据绑定

#### 1.数据绑定的基本原则

1. 在data中定义数据
2. 在WXML中使用数据

#### 2.在data中定义页面数据

在页面对应的 .js文件中，把数据定义到data对象中即可

#### 3.Mustache语法(插值表达式)的格式

把data中的数据绑定到页面中渲染，使用==Mustache语法==（双大括号）将变量包起来即可

```
<view>{{要绑定的数据名称}}</view>
```

#### 4.Mustache语法的应用场景

- 绑定内容
- 绑定属性
- 运算（三元运算、算术运算等）

==动态绑定内容==

页面的数据如下：

```
Page({
	data:{
		info:'内容'
	}
})
```

页面的结构如下：

```
<view>{{info}}</view>
```

==动态绑定属性==

页面的数据如下：

```
Page({
	data:{
		imgSrc:"路径"
	}
})
```

页面的结构如下：

```
<image src="{{imgSrc}}"></image>
```

==三元运算==

页面的数据如下：

```
Page({
	data:{
		randomNumber: Math.random()*10	//生成10以内的随机数
	}
})
```

页面的结构如下：

```
<view>{{randomNumber >= 5 ? '随机数字大于或等于5' : '随机数字小于5'}}</view>
```

==算术运算==

页面的数据如下：

```
Page({
	data:{
		randomNumber: Math.random().toFixed(2)	//生成一个带两位小数的随机数，例如0.34
	}
})
```

页面的结构如下：

```
<view>生成100以内的随机数{{randomNumber*100}}</view>
```

### 事件绑定

#### 1.什么是事件

事件是==渲染层到逻辑层的通讯方式==。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务的处理

#### 2.小程序中的常用的事件

| 类型   | 绑定方式                | 事件描述                                    |
| ------ | ----------------------- | ------------------------------------------- |
| tap    | bindtap或bind:tap       | 手指触摸后马上离开，类似于HTML中的click事件 |
| input  | bindinput或bind:input   | 文本框的输入事件                            |
| change | bindchange或bind:change | 状态改变时触发                              |

#### 3.事件对象的属性列表

当前事件回调触发的时候，会收到一个==事件对象event==，它的详细属性如下表所示：

| 属性           | 类型       | 说明                                         |
| -------------- | ---------- | -------------------------------------------- |
| type           | String     | 事件类型                                     |
| timeStamp      | integer    | 页面打开到触发事件所经过的毫秒数             |
| ==target==     | ==Object== | ==触发事件的组件的一些属性值集合==           |
| currentTarget  | Object     | 当前事件的组件的一些属性值集合               |
| ==detail==     | ==Object== | ==额外的信息==                               |
| touches        | Array      | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array      | 触摸事件，当前变换的触摸点信息的数组         |

#### 4.target和currentTarget的区别

==target== 是 ==触发该事件的源头组件==，而 ==currentTarget== 则是 ==当前事件所绑定的组件==。

#### 5.bindtap的语法格式

在小程序中，不存在HTML中的onclick鼠标点击事件，而是通过==tap事件==来响应用户的触摸行为。

1. 通过bindtap，可以为组件绑定tap触摸事件，语法如下：

   ```
   <button type="primary" bindtap="btnTapHandler">按钮</button>
   ```

2. 在页面的 .js文件中定义的事件处理函数，事件参数通过形参==event==（一般==简写成e==）来接收：

   ```
   Page({
   	btnTapHandler(e){	//按钮的tap事件处理函数
   		console.log(e)	//事件参数对象 e
   	}
   })
   ```

#### 6.在事件处理函数中为data中的数据赋值

通过调用 ==this.setData(dataObject)== 方法，可以给页面data中的数据重新赋值，例如：

```
Page({
	data:{
		count: 0
	},
	//修改count的值
	changeCount(){
		this.setData({
			count: this.data.count + 1	//this.data.count用来访问旧的值count
		})
	}
})
```

#### 7.事件传参

1. 小程序中的事件传参比较特殊，==不能在绑定事件的同时为事件处理函数传递参数==。例如，下面的代码将不能正常工作：

```
<button type="primary" bindtap="btnHandler(123)">事件传参</button>
```

因为小程序会把bindtap的属性值，统一当作事件名称来处理，相当于要调用一个名称为btnhandler(123)的事件处理函数。

2. 可以为组件提供 ==data-*== 自定义属性传参，其中 ==*代表的是参数的名字==，例如：

```
<button type="primary" bindtap="btnHandler" data-info="{{2}}">事件传参</button>
```

最终：

- ==info== 会被解析为 ==参数的名字==
- ==数值2== 会被解析为 ==参数的值==

3. 在事件处理函数中，通过 ==event.target.dataset.参数名== 即可获取到==具体参数的值==，例如：

```
btnHandler(event){
	//dataset是一个对象，包含了所有通过data-*传递过来的参数项
	console.log(event.target.dataset)
	//通过dataset可以访问到具体参数的值
	console.log(event.target.dataset.info)
}
```

#### 8.bindinput语法格式

在小程序中，通过 ==input事件== 响应文本框的输入事件，语法可格式如下：

1. 通过bindinput，可以为文本框绑定输入事件：

   ```
   <input bindinput="inputHandler"></input>
   ```

2. 在页面的 .js文件中定义事件处理函数：

   ```
   inputHandler(e){
   	//e.detail.value是变化以后，文本框最新的值
   	console.log(e.detail.value)
   }
   ```

#### 9.实现文本框和data之间的数据同步

实现步骤

1. ==定义数据==

```
Page({
	data: {
		msg: '你好'
	}
})
```

2. ==渲染结构==

```
<input value="{{msg}}" bindinput="iptHandler"></input>
```

3. ==美化样式==

```
input{
	border: 1px solid #eee;
	padding: 5px;
	margin: 5px;
	border-radius: 3px;
}
```

4. ==绑定 input 事件处理函数==

```
//文本框内容改变的事件
iptHandler(e){
	this.setData({
		//通过e.detail.value获取到文本框最新的值
		msg: e.detail.value
	})
}
```

### 条件渲染

#### 1.wx:if

在小程序中，使用 ==wx:if="{{condition}}"== 来判断是否需要渲染该代码块：

```
<view wx:if="{{condition}}">True</view>
```

 也可以用 ==wx:elif== 和 ==wx:else== 来添加else判断：

```
<view wx:if="{{type === 1}}">男</view>
<view wx:elif="{{type === 2}}">女</view>
<view wx:else>保密</view>
```

#### 2.结合&lt;block&gt;使用wx:if

如果要==一次性控制多个组件的展示与隐藏==，可以使用一个==<block\></block\>==标签将多个组件包装起来，并在<block\>标签上使用wx:if 控制属性，实例如下：

```
<block wx:if="{{true}}">
	<view> view1 </view>
	<view> view2 </view>
</block>
```

==注意==：<block\>==并不是一个组件==，它只是一个包裹性质的容器，==不会在页面中做任何渲染==。

#### 3.hidden

在小程序中，直接使用 ==hidden="{{condition}}"== 也能控制元素的显示与隐藏：

```
<view hidden="{{condition}}">条件为true 隐藏，条件为false 显示</view>
```

#### 4.wx:if 与 hidden的对比

1. 运行方式不同
   - wx:if以==动态创建和移除元素==的方式，控制元素的展示与隐藏
   - hidden以==切换样式==的方式（display:none/block;），控制元素的显示与隐藏

2. 使用建议
   - ==频繁切换==时建议使用 ==hidden==
   - ==控制条件复杂==时，建议使用 ==wx:if== 搭配 wx:elif、wx:else 进行展示与隐藏的切换

### 列表渲染

#### 1.wx:for

通过 wx:for 可以根据指定的数组，循环渲染重复的组件结构，语法示例如下：

```
<view wx:for="{{array}}">
	索引是: {{index}} 当前项是: {{item}}
</view>
```

默认情况下，当前循环项的 ==索引== 用 ==index== 表示；==当前循环项== 用 ==item== 表示。

#### 2.手动指定索引和当前项的变量名*

（了解，实际开发中太麻烦了）

- 使用 ==wx:for-index== 可以指定==当前循环项的索引==的变量名
- 使用 ==wx:for-item== 可以指定==当前项==的变量名

示例代码如下：

```
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
	索引是: {{idx}} 当前项是: {{itemName}}
</view>
```

#### 3.wx:key的使用

类似于Vue列表渲染中的 ==:key==，小程序在实现列表渲染时，也建议为渲染出来的列表项指定唯一的key值，从而==提高渲染的效率==，示例代码如下：

```
//data数据
data: {
	userList: [
		{id: 1, name: '小红'},
		{id: 2, name: '小黄'},
		{id: 3, name: '小白'},
	]
}

//wxml结构
<view wx:for="{{userList}}" wx:key="id">{{item.name}}</view>
```

## WXSS模板样式

1. **什么是WXSS**

WXSS（WeiXin Style Sheets）是一套==样式语言==，用于美化WXML的组件样式，类似于网页开发中的CSS

2. **WXSS和CSS的关系**

WXSS具有CSS大部分特性，同时，WXSS还对CSS进行扩充以及修改，以适应微信小程序的开发。

与CSS相比，WXSS扩展的特性有：

- ==rpx== 尺寸单位
- ==@import== 样式导入

### rpx

#### 1.什么是 rpx 尺寸单位

==rpx==（responsive pixel）是微信小程序独有的，用来==解决屏幕适配的尺寸单位==。

#### 2.rpx 的实现原理

rpx 的实现原理非常简单：鉴于不同设备屏幕大小不同，为了实现屏幕的自动适配，rpx把所有设备的屏幕，在宽度上==等分为750份==（即，==当前屏幕的总宽度为750rpx==）。

- 在==较小==的设备上，==1rpx所代表的宽度较小==
- 在==较大==的设备上，==1rpx所代表的宽度较大==

小程序在不同设备上运行的时候，会自动把rpx的样式单位换算对应的像素单位来渲染，从而实现屏幕适配。

#### 3.rpx 与 px 之间单位换算*

在iPhone6上，屏幕宽度为375px，总共为750个物理像素，等分为750rpx。则：

​	750rpx = 375px = 750物理像素

​	==1rpx = 0.5px = 1物理像素==，即 ==1px=2rpx==

官方建议：开发微信小程序时，设计师可以用iPhone6作为视觉稿的标准 。

开发举例：在iPhone6上如果要绘制宽100px，高20px的盒子，换算成rpx单位的话，宽高分别为200rpx和40rpx。

### 样式导入

1. **@import的语法格式**

==@import== 后跟需要导入的外联样式表的==相对路径==，用 ==;== 表示语句结束。

### 全局样式和局部样式

1. **全局样式**

定义在 ==app.wxss== 中的样式为 ==全局样式==，作用于每一个页面。

2. **局部样式**

定义在 ==页面的 .wxss== 文件中定义的样式为==局部样式==，只作用于当前页面。

==注意==：

- 当局部样式和全局样式冲突时，根据==就近原则==，局部样式会==覆盖==全局样式
- 当局部样式的==权重大于或等于==全局样式的权重时，才会覆盖全局的样式

## 全局配置

**全局配置文件及常用的配置项**

小程序根目录下的 ==app.json== 文件是小程序的==全局配置文件==。常用的配置项如下：

1. *pages*
   - *记录当前小程序所有页面的存放路径*
2. *==window==*
   - *全局配置小程序窗口的外观*
3. *==tabBar==*
   - *设置小程序底部的tabBar效果*
4. *style*
   - *是否启用新版的组件样式*

### window

#### 1.小程序窗口的组成部分

- *navigationBar导航栏区域*
- *background背景区域（默认不可见，下拉才显示）*
- *页面的主体区域用来显示wxml中的布局*

#### 2.了解window节点常用的配置项

| 属性名                       | 类型     | 默认值  | 说明                                           |
| ---------------------------- | -------- | ------- | ---------------------------------------------- |
| navigationBarTitleText       | String   | 字符串  | 导航栏标题文字内容                             |
| navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如#000000                      |
| navigationBarTextStyle       | String   | white   | 导航栏标题颜色，仅支持 ==black / white==       |
| backgroundColor              | HexColor | #ffffff | 窗口的背景颜色                                 |
| backgroundTextStyle          | String   | dark    | 下拉loading的样式，仅支持 ==dark / light==     |
| enablePullDownRefresh        | Boolean  | false   | 是否全局开启下拉刷新                           |
| onReachBottomDistance        | Number   | 50      | 页面上拉触底事件触发时距页面底部距离，单位为px |

#### 3.设置导航栏的标题

设置步骤：==app.json -> window -> navigationBarTitleText==

#### 4.设置导航栏的背景色

设置步骤：==app.json -> window -> navigationBarBackgroundColor==

#### 5. 设置导航栏的标题颜色

设置步骤：==app.json -> window -> navigationBarTextStyle==

==注意==：navigationBarTextStyle的可选值只有 black 和 white

#### 6.全局开启下拉刷新功能

概念：==下拉刷新==是移动端的专业名词，指的是通过手指在屏幕上的下拉滑动操作，从而==重新加载页面数据==的行为

设置步骤：==app.json== -> ==window== -> 把 ==enablePullDownRefresh== 的值设置为 ==true==

==注意==：在app.json中开启下拉刷新功能，会作用于每个小程序页面

#### 7.设置下拉刷新时窗口的背景色

当全局开启下拉刷新功能之后，默认的窗口背景为白色。如果自定义下拉刷新窗口背景色，

设置步骤：==app.json== -> ==window== -> 把 ==backgroundColor== 指定16进制的颜色值 ==#efefef==

#### 8.设置下拉刷新时loading的样式

当全局开启下拉刷新功能之后，默认窗口的loading样式为白色，如果要更改loading样式效果，

设置步骤：==app.json== -> ==window== -> 把 ==backgroundTextStyle== 指定 ==dark== 值

==注意==：backgroundTextStyle 的可选值只有 light 和 dark

#### 9.设置上拉触底的距离

概念：==上拉触底==是移动端专业名词，通过手指在屏幕上的上拉滑动操作，从而==加载更多数据==的行为

设置步骤：==app.json== -> ==window== -> 为 ==onReachBottomDistance== 设置新数值

==注意==：==默认距离为50px==，如果没有特性需求，建议使用默认值即可

### tabBar

#### 1.什么是tabBar

tabBar是移动端应用常见的页面效果，==用于实现多页面的快速切换==。小程序中通常将其分为：

- 顶部tabBar
- 底部tabBar

注意：

- tabBar中只能配置最少2个、最多5个tab页签
- 当渲染==顶部tabBar==时，==不显示icon，只显示文本==

#### 2.tabBar的6个组成部分

1. *backgroundColor：tabBar的背景色*
2. *borderStyle：tabBar上边框的颜色*
3. *selectediconPath：选中的图片路径*
4. *iconPath：未选中的图片路径*
5. *selectedColor：tab上文字选中的颜色*
6. *Color：tab上文字的默认（未选中）的颜色*

#### 3.tabBar节点的配置项

| 属性            | 类型      | 必填   | 默认值 | 描述                                         |
| --------------- | --------- | ------ | ------ | -------------------------------------------- |
| position        | String    | 否     | bottom | tabBar的位置，仅支持 ==bottom / top==        |
| borderStyle     | String    | 否     | black  | tabBar上边框的颜色，仅支持 ==black / white== |
| color           | HexColor  | 否     |        | tab上文字的默认（未选中）颜色                |
| selectedColor   | HexColor  | 否     |        | tab上的文字选中时的颜色                      |
| backgroundColor | HexColor  | 否     |        | tabBar的背景色                               |
| ==list==        | ==Array== | ==是== |        | tab页签的列表，==最少2个==，==最多5个==      |

#### 4.每个tab项的配置选项

| 属性             | 类型   | 必填   | 描述                                                 |
| ---------------- | ------ | ------ | ---------------------------------------------------- |
| ==pagePath==     | String | ==是== | ==页面路径，页面必须在pages中预先定义==              |
| ==text==         | String | ==是== | ==tab上显示的文字==                                  |
| iconPath         | String | 否     | ==未选中时==的图标路径；当postion为top时，不显示icon |
| selectediconPath | String | 否     | ==选中时==的图标路径；当postion为top时，不显示icon   |

## 页面配置

### 1.页面配置文件的作用

小程序中，每个页面都有自己的 .json配置文件，用来对==当前页面==的窗口外观、页面效果等进行配置。

### 2.页面配置和全局配置的关系

小程序中，app.json 中的 window 节点，可以全局配置小程序中的==每个页面的窗口表现==。

如果某些小程序页面==想要拥有特殊的窗口表现==，此时，“==页面级别的 .json配置文件==” 就可以实现这种需求。

注意：当页面配置与全局配置==冲突==时，根据==就近原则==，最终的效果==以页面配置为准==。

### 3.页面配置中常用的配置项

| 属性                         | 类型     | 默认值  | 描述                                               |
| ---------------------------- | -------- | ------- | -------------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #000000 | 当前页面导航栏背景颜色                             |
| navigationBarTextStyle       | String   | white   | 当前页面导航栏标题颜色，仅支持 ==black / white==   |
| navigationBarTitleText       | String   |         | 当前导航栏标题文字内容                             |
| backgroundColor              | HexColor | #ffffff | 当前页面窗口的背景颜色                             |
| backgroundTextStyle          | String   | dark    | 当前页面下拉loading的样式，仅支持 ==dark / light== |
| ==enablePullDownRefresh==    | Boolean  | false   | 是否为当前页面开启下拉刷新的效果                   |
| onReachBottomDistance        | Number   | 50      | 页面上拉触底事件触发时距页面底部距离，单位为px     |

## 网络数据请求

### 1.小程序中网络数据请求的限制

出于==安全性==方面的考虑，小程序官方对==数据接口的请求==做出了如下两个限制：

1. 只能请求 ==HTTPS== 类型的接口
2. 必须将==接口的域名==添加到==信任列表==中

### 2.配置 request 合法域名

需求描述：假设在自己的微信小程序中，希望请求 ==https://www.escook.cn==域名下的接口

配置步骤：==登陆微信小程序管理后台== -> ==开发管理== -> ==开发设置== -> ==服务器域名== -> ==修改 request 合法域名==

注意事项：

1. 域名只支持 https 协议
2. 域名不能使用 IP 地址或 localhost
3. 域名必须经过 ICP 备案
4. 服务器域名一个月内最多可申请5次修改

### 3.发起 GET 请求

调用微信小程序提供的 wx.request() 方法，可以发起 GET 数据请求，示例代码如下：

```
wx.request({
	url: 'https://www.escook.cn/api/get',	//请求的接口地址，必须基于https协议
	method: 'GET',	//请求的方式
	data:{			//发送到服务器的数据
		name:'胡禄敬',
		age:'22'
	},
	success:(res) => {	//请求成功之后的回调函数
		console.log(res.data)
	}
})
```

### 4.发起 POST 请求

调用微信小程序提供的 wx.request() 方法，可以发起 POST 数据请求，示例代码如下：

```
wx.request({
	url: 'https://www.escook.cn/api/post',	//请求的接口地址，必须基于https协议
	method: 'POST',	//请求的方式
	data:{			//发送到服务器的数据
		name:'胡禄涛',
		age:'12'
	},
	success:(res) => {	//请求成功之后的回调函数
		console.log(res.data)
	}
})
```

### 5.在页面刚加载时请求数据

在很多情况小，我们需要==在页面刚加载的时候==，==自动请求一些初始化的数据==。此时需要在页面的 ==onLoad== 事件中调用获取数据的函数，示例代码如下：

```
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
    this.postInfo()
  },
```

### 6.跳过 request 合法域名校验

如果后端程序员==仅仅提供了https协议的接口==、==暂时没有提供https协议接口==。

为了不耽误开发的进度，我们可以在微信开发者工具中，临时开启【==开发环境不校验请求域名、TLS版本及HTTPS证书==】选项，跳过 request 合法域名的校验。

配置步骤：==开发者工具-详情== -> ==本地设置==

注意：跳过 request 合法域名校验的选项，==仅限==在==开发与调试阶段==使用！

### 7.关于 跨域 和 Ajax 的说明

跨域问题==只存在于==基于浏览器的Web开发中。由于==小程序的宿主环境==不是浏览器，而是==微信小程序==，所以==小程序中不存在跨域的问题==。

Ajax技术的核心是依赖于浏览器中的 XMLHttpRequest 这个对象，由于==小程序的宿主环境是微信客户端==，所以小程序中==不能叫做== "发起Ajax请求"，而是叫做 "==发起网络数据请求=="。