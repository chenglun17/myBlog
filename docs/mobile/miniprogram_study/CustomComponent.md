# 自定义组件

## 组件的创建与引用

### 1.创建组件

1. 在项目的根目录中，鼠标右键，创建 ==components== -> ==test== 文件夹
2. 在新建的 components -> test 文件夹上，鼠标右键，点击 "==新建Component=="
3. 键入组件的名称之后回车，会自动生成组件对应的4个文件，后缀名分别为 .js，.json，.wxml，和 .wxss

注意：为了保证目录结构的清晰，建议把不同的组件，存放到单独目录中

### 2.引用组件

组件的引用方式分为："==局部引用==" 和 "==全局引用=="：

- 局部引用：组件只能在当前被引用的页面内使用
- 全局引用：组件可以在每个小程序页面中使用

### 3.局部引用组件

在页面的 .json配置文件中引用组件的方式，叫做 “局部引用”。*示例代码如下：*

```
//在页面的 .json 文件中，引用组件
{
	"usingComponents": {
		"my-test1":"/components/test1/test1"
	}
}

//在页面的 .wxml 文件中，使用组件
<my-test1></my-test1>
```

### 4.全局引用组件

在 app.json 全局配置文件中引用组件的方式，叫做 “全局引用”。*示例代码如下：*

```
//在 app.json 文件中，引用组件
{
	"pages": {/*省略不必要的代码*/}
	"window": {/*省略不必要的代码*/}
	"usingComponents": {
		"my-test2":"/components/test2/test2"
	}
}

//在页面的 .wxml 文件中，使用组件
<my-test2></my-test2>
```

### 5.全局引用和局部引用

根据组件的==使用频率==和==范围==，来选择合适的引用方式：

- 如果某组件==在多个页面中经常被用到==，建议进行 "全局引用"

- 如果某组件==只在特定的页面中被用到==，建议进行 "局部引用"

### 6.组件和页面的区别

从表面来看，组件和页面都是由 .js，.json，.wxml，和 .wxss 这个四个文件组成的。但是，组件和页面的 .js与 .json 文件有明显的不同：

- 组件的 .json 文件中需要声明 =="component"：true== 属性
- 组件的 .js 文件中调用的是 ==Component()== 函数，页面的 .js 文件中调用的是 ==Page()== 函数
- 组件的事件处理函数需要定义到 ==methods节点== 中，页面的 .js 文件中只需要定义到与 ==data节点== 平级

## 样式

### 1.组件样式隔离

默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的 UI 结构：

好处：

1. 防止外界的样式影响组件内部的样式
2. 防止组件的样式破坏外界的样式

### 2.组件样式隔离的注意点

- app.wxss 中的全局样式对组件无效
- 只有 class 选择器会有样式隔离效果，id选择器、属性选择器、标签选择器不受样式隔离的影响

建议：在==组件==和==引用组件的页面==中建议使用 **class 选择器**，==不要使用 id、属性、标签选择器==！

### 3.修改组件的样式隔离选项

默认情况下，自定义组件的 ==样式隔离特性== 能够 ==防止组件内外样式相互干扰的问题==。但有时，我们希望在外界能够控制组件内部的样式，此时，可以通过 ==styleIsolation== 修改组件的样式隔离选项，用法如下：

```
//在组件的 .js 文件中新增如下配置
Component({
	options: {
		styleIsolation: 'isolated'
	}
})
```

```
//或在组件的 .json 文件中新增如下配置
{
	"styleIsolation": "isolated"
}
```

### 4.styleIsolation 的可选值

| 可选值       | 默认值 | 描述                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| isolated     | 是     | 表示==启用样式隔离==，在自定义组件内外，使用class指定的样式将==不会相互影响== |
| apply-shared | 否     | 表示==页面 wxss 样式将影响到自定义组件==，但自定义组件 wxss 中指定的样式不会影响页面 |
| ==shared==   | 否     | 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中特指的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件 |

## 数据、方法和属性

### 1.data 数据

在小程序组件中，==用于组件模板渲染== 的 ==私有数据==，需要定义到 ==data 节点==中，*示例代码如下：*

```
Component({
	data: {
		count: 0
	}
})
```

### 2.methods 方法

在小程序组件中，==事件处理函数== 和 ==自定义方法== 需要定义到 ==methods 节点== 中，*示例代码如下：*

```
Component({
	methods: {			//组件的方法列表【包含事件处理函数和自定义方法】
		addCount(){		//事件处理函数
			this.setData({
				count: this.data.count + 1
			})
			this._showCount()	//通过 this 直接调用自定义方法
		},
		
		_showCount(){		//自定义方法建议以 _ 开头
			wx.showToast({
				title: 'count值为：' + this.data.count,
				icon: 'none'
			})
		}
	}
})
```

### 3.properties 属性

在小程序组件中，properties 是组件的对外属性，==用来接收外界传递到组件中的数据==，声明方式有两种，*示例代码如下：*

```
//组件的 .js
Component({
	//属性定义
	properties: {
		max: {				//完整定义属性的方式【当需要指定属性默认值时，建议使用此方式】
			type: Number,	//属性值的数据类型
			value: 10		//属性默认值
		},
		
		max: Number			//简化定义属性的方式【不需要指定属性默认值时，可以使用简化方式】
	}
})

//组件的 .wxml
<my-test1 max="10"></my-test1>
```

### 4.data 和 properties 的区别

在小程序的组件中，properties 属性和 data 数据的用法相同，它们都是==可读可写==的，只不过：

- data 更倾向于==存储组件的私有数据==
- properties 更倾向于==存储外界传递到组件的数据==

### 5.使用 setData 修改 properties 的值

由于 ==data数据== 和 ==properties 属性== 在本质上没有任何区别，因此 properties 属性的值也可以用于页面渲染，或使用 setData 为 properties 中的属性重新赋值，*示例代码如下：*

```
//在组件的 .wxml 文件中使用 properties 属性的值
<view>max属性的值为：{{max}}</view>

//组件的 .js
Component({
	properties: {max: Number},	//定义属性
	methods: {
		addCount() {
			this.setData({
				max: this.properties.max + 1	//使用 setData修改属性的值
			})
		}
	}
})
```

## 数据监听器

### 1.什么是数据监听器

数据监听器用于==监听和响应任何属性和数据字段的变化，从而执行特定的操作==。它的作用类似于 vue 中的 watch 侦听器。

在小程序组件中，数据监听器的*基本语法格式如下：*

```
Component({
	observers: {
		'字段A,字段B': function(字段A的新值,字段B的新值){
			//do something
		}
	}
})
```

### 2.数据监听器的基本用法

*组件的 UI 结构如下：*

```
<view>{{n1}} + {{n2}} = {{sum}}</view>
<button size="mini" bindtap="addN1">n1自增</button>
<button size="mini" bindtap="addN2">n2自增</button>
```

*组件的 .js 文件代码如下：*

```
Component({
	data: {n1:0, n2:0, sum:0},	//数据节点
	methods: {		//方法列表
		addN1(){
		this.setData({n1: this.data.n1 + 1})
		},
		addN2(){
		this.setData({n2: this.data.n2 + 2})
		}
	},
	observers: {
		'n1,n2': function(newN1,newN2){			//监听 n1 和 n2 数据的变化，键值对形式
			this.setData({sum: newN1 + newN2})	//通过监听器，自动计算 sum 的值
		}
	}
})
```

### 3.监听对象属性的变化

数据监听器支持监听对象中==单个==或==多个属性==的变化，*示例语法如下：*

```
Component({
	observers: {
		'对象.属性A,对象.属性B': function(属性A的新值,属性B的新值){
			//触发此监听器的3种情况
			//【为属性A赋值】使用 setData 设置 this.data.对象.属性A 时触发
			//【为属性B赋值】使用 setData 设置 this.data.对象.属性B 时触发
			//【直接为对象赋值】使用 setData 设置 this.data.对象 时触发
			//do something
		}
	}
})
```

## 纯数据字段

### 1.什么是纯数据字段

概念：==纯数据字段==指的是那些==只用于业务逻辑的处理==，==不用于界面渲染的data字段==

应用场景：例如有些情况下，某些 data 中的字段==既不会展示在页面上，也不会传递给其他组件==，仅仅在当前组件内部使用。带有这种特性的 data 字段适合被设置为纯数据字段

好处：纯数据字段==有助于提升页面更新的性能==。

### 2.使用规则

在 Component 构造器的 options 节点中，指定 ==pureDataPattern== 为一个==正则表达式==，字段名符号这个正则表达式的字段将成为纯数据字段，*示例代码如下：*

```
Component({
	options: {
		//指定所有 _ 开头的数据字段为纯数据字段
		pureDataPattern: /^_/
	},
	data: {
		a: true,	//普通数据字段
		_b: true,	//纯数据字段
	}
})
```

### 3.使用纯数据字段改造数据监听器案例

```
Component({
	options: {
		//指定所有 _ 开头的数据字段为纯数据字段
		pureDataPattern: /^_/
	},
	data: {
		//将 rgb 改造为以 _ 开头的纯数据字段
  		_rgb: { 
    		r: 0,
    		g: 0,
    		b: 0
  		},
  		fullColor: '0,0,0' //根据 _rgb 对象的三个属性，动态计算 fullColor 的值
	}
})
```

## 组件的生命周期

### 1.组件全部的生命周期函数

小程序组件可用的全部生命周期如下表所示：

| 生命周期函数 | 参数         | 描述                                     |
| ------------ | ------------ | ---------------------------------------- |
| **create**   | 无           | 在组件实例**刚刚被创建时执行**           |
| **attached** | 无           | 在组件实例**进入页面节点树时执行**       |
| ready        | 无           | 在组件在视图布局完成后执行               |
| moved        | 无           | 在组件实例被移动到节点树另一个位置时执行 |
| **detached** | 无           | 在组件实例**被从页面节点移除时执行**     |
| error        | Object Error | 每当组件方法抛出错误时执行               |

### 2.组件主要生命周期函数

在小程序组件中，最重要的生命周期函数有3个，分别是 ==created==，==attached==，==detached==。特点如下：

1. 组件实例==刚被创建好==的时候，create的 生命周期函数会被触发
   - 此时还不能调用 setData
   - 通常在这个生命周期函数中，只应该用于组件的 this 添加一些自定义的属性字段
2. 在组件==完全初始化完毕，进入页面节点树后==，attached 生命周期函数会被触发
   - 此时，this.data 已被初始化完毕
   - 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发起请求获取初始化数据）
3. 在组件==离开页面节点树后==，detached 生命周期函数会触发
   - 退出一个页面时，会触发页面内每个自定义组件的 detached 生命周期函数
   - 此时适合做一些清理性质的工作

### 3.lifetimes 节点

在小程序组件中，生命周期函数可以直接定义在 Component 构造器的第一级参数中（和data节点平级），可以在 ==lifetimes 字段== 内进行声明（==这是推荐的方式，其优先级最高==）。*示例代码如下：*

```
Component({
	//推荐方法
	lifetimes: {
		attached(){},	//在组件实例进入页面节点树时执行
		detached(){},	//在组件实例从页面节点树移除时执行
	},
	//以下是旧式的定义方法
	attached(){},	//在组件实例进入页面节点树时执行
	detached(){},	//在组件实例从页面节点树移除时执行
})
```

## 组件所在页面的生命周期

### 1. 什么是组件所在页面的生命周期

有时，==自定义的行为依赖于页面状态的变化==，此时就需要用到 ==组件所在页面的生命周期==。

在自定义组件中，组件所在页面的生命周期函数有如下3个，分别是：

| 生命周期函数 | 参数        | 描述                           |
| ------------ | ----------- | ------------------------------ |
| show         | 无          | 组件所在的页面**被展示时执行** |
| hide         | 无          | 组件所在页面**被隐藏时执行**   |
| resize       | Object Size | 组件所在页面**尺寸变化时执行** |

### 2.pageLifetimes 节点

组件所在页面的生命周期函数，需要定义在 ==pageLifetimes 节点== 中，*示例代码如下：*

```
Component({
	pageLifetimes:{
		show: function(){},	//页面被展示
		hide: function(){},	//页面被隐藏
		resize: function(size){}//页面尺寸变化
	}
})
```

### 3.生成随机 RGB 颜色值

```
Component({
	methods: {
	//生成随机 RGB 颜色的方法。非事件处理函数建议以 _ 开头
		_randomColor(){
			this.setData({	//为 data 里面的 _rgb 纯数据字段重新赋值
				_rgb: {
					r: Math.floor(Math.random() * 256),
					g: Math.floor(Math.random() * 256),
					b: Math.floor(Math.random() * 256)
				}
			})
		}
	},
	
	pageLifetimes: {
		//组件所在的页面被展示时，立即调用 _randomColor 生成随机颜色值
		show: function(){
			this._randomColor()
		}
	}
})
```

## 插槽

### 1.什么是插槽

在自定义组件的 wxml 结构中，可以提供一个 ==<slot\>== 节点（插槽），==用于承担组件使用者提供的 wxml 结构==。

### 2.单个插槽

在小程序中，默认每个自定义组件中只允许使用一个 <slot\> 进行占位，这种个数上的限制叫做单个插槽。

```
<!-- 组件的封装者 -->
<view class="wrapper">
	<view>这里是组件的内部节点</view>
	<!-- 对于不确定的内容，可以使用 <slot> 进行占位，具体的内容由组件的使用者决定 -->
	<slot></slot>
</view>

<!-- 组件的使用者 -->
<component-tag-name>
	<!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
	<view>这里是插入到组件slot中的内容</view>
</component-tag-name>
```

### 3.启用多个插槽

在小程序的自定义组件中，需要使用多 <slot\> 插槽时，可以在组件的 .js 文件中，通过如下方式进行启用。

*示例代码入下：*

```
Component({
	options: {		//与data节点平级
		multipleSlots: true	//在组件定义时的选项中启用多 slot 支持
	},
	properties: { /*...*/ },
	methods: { /*...*/ }
})
```

### 4.定义多个插槽

可以在组件的 .wxml 中使用多个 <slot\> 标签，以不同的 ==name== 来区分不同的插槽。*示例代码如下：*

```
<!-- 组件模板 -->
<view class="wrapper">
	<!-- name 为 before 的第一个 slot 插槽 -->
	<slot name="before"></slot>
	<view>这是一段固定的文本内容</view>
	<!-- name 为 after 的第二个 slot 插槽 -->
	<slot name="after"></slot>
</view>
```

在使用==带有多个插槽的自定义组件==时，需要用 ==slot属性==来将节点插入到不同的 <slot\> 中。*示例代码如下：*

```
<!-- 引用组件的页面模板 -->
<component-tag-name>
	<!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
	<view slot name="before">这里是插入到组件 slot name="before" 中的内容</view>
	<!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
	<view slot name="after">这里是插入到组件 slot name="after" 中的内容</view>
</component-tag-name>
```

## 父子组件之间的通信

### 1.父子组件之间通信的3种方式

1. 属性绑定
   - 用于父组件向子组件的指定属性设置数据，==仅能设置 JSON 兼容的数据==
2. 事件绑定
   - 用于子组件向父组件传递数据，可以传递任意数据
3. this.selectComponent( 'id或class选择器' )
   - 父组件还可以通过 this.selectComponent() 获取子组件实例对象
   - 这样就可以直接访问子组件的任意数据和方法

### 2.属性绑定

==属性绑定==用于实现==父向子传值==，而且==只能传递普通类型的数据==，无法将方法传递给子组件。父组件的*示例代码如下：*

```
//父组件的 data 节点
data: {
	count: 0
}

//父组件的 wxml结构
<my-test5 count="{{count}}"></my-test5>
<view>~~~~~~</view>
<view>父组件中，count值为：{{count}}</view>
```

子组件子 ==properties== 节点中==声明对应的属性并使用==。*示例代码如下：*

```
//子组件的 properties 节点
properties: {
	count: Number
}

//子组件的 .wxml 结构
<test>子组件中，count值为：{{count}}</test>
```

### 3.事件绑定

==事件绑定==用于实现==子向父传值==，可以传递任何类型的数据。*使用步骤如下：*

1. 在==父组件==的 .js 中，定义一个函数，这个函数==即将==通过自定义事件的形式，传递给子组件
2. 在==父组件==的 .wxml 中，通过==自定义事件==的形式，将步骤 1 中定义的函数引用，传递给子组件
3. 在**子组件**的 .js 中，通过调用 ==this.triggerEvent( '自定义事件名称 ', { /*参数对象\*/} )==，将数据发送到父组件
4. 在==父组件==的 .js 中，通过 ==e.detail== 获取到子组件传递过来的数据

```
//在父组件中定义 syncCount 方法
//将来，这个方法会被传递给子组件，供子组件进行调用
syncCount(){
	console.log('syncCount')
}
```

```
//父组件中的 wxml 结构
<!-- 使用 bind:自定义事件名称(推荐：结构清晰) -->
<my-test5 count="{{count}}" bind:sync="syncCount"></my-test5>

<!-- 或在 bind 后面直接写上自定义事件名称 -->
<my-test5 count="{{count}}" bindsync="syncCount"></my-test5>
```

```
//子组件中的 wxml 结构
<text>子组件中，count值为：{{count}}</text>
<button type="primary" bindtap="addCount">+1<button>

//子组件中的 js 文件
methods:{
	addCount(){
		this.setData({
			count: this.properties.count + 1
		})
		//触发自定义事件，将数值同步给父组件（触发事件的同时还可以传递参数）
		this.triggerEvent('sync',{value: this.properties.count})
	}
}
```

```
//父组件中的 js 文件
//传递的参数通过形参 e 接收
syncCount(e){
    // console.log('syncCount')
    // console.log(e)
    // console.log(e.detail.value)
    
	this.setData({
		count: e.detail.value
	})
}
```

### 4.获取组件实例

可在父组件里调用 ==this.selectComponent( "id或class选择器" )==，获取子组件的示例对象，从而直接访问子组件的任意数据和方法。调用时需要传入一个==选择器==，例如 this.selectComponent( ".my-component" )。

```
//父组件中的 wxml 结构
<my-test5 count="{{count}}" bind:sync="syncCount" class="customA" id="cA"></my-test5>
<button bindtap="getChild">获取子组件的实例对象</button>

//父组件中的 js 文件
//按钮的 tap 事件处理函数
getChild() {
	//切记下面参数不能传递标签选择器 'my-test5'，不然返回的的是null
  const child = this.selectComponent('.customA')	//也可以传递 id选择器 #cA
  child.setData({
    count: child.properties.count + 1
  })			//调用子组件的 setData 方法
  
  child.addCount()		//调用子组件的 addCount 方法
},
```

## behaviors

### 1.什么是 behaviors

behaviors 是小程序中，==用于实现组件间代码共享==的特性，类似于 Vue.js 中的 "mixins"。

### 2.behaviors 的工作方式

每个 behavior 可以包含一组==属性==、==数据==、==生命周期函数== 和 ==方法==。组件引用它时，它的属性、数据和方法==会被合并到组件中==。

每个组件可以引用多个 behavior，behavior 也可以引用其它 behavior。

### 3..创建 behavior

调用 ==Behavior(Object object)== 方法即可创建一个==共享的 behavior 实例对象==，供所有的组件使用：

```
//调用 Behavior() 方法，创建实例对象
//并使用 module.exports 将 behavior 实例对象共享出去
module.exports = Behavior({
	//属性节点
	properties: {},
	//私有数据节点
	data: {username: 'zs'},
	//事件处理函数和自定义方法节点
	methods: {},
	//其他节点...
})
```

### 4.导入并使用 behavior

在组件中，使用 ==require()== 方法导入需要的 behavior，==挂载后即可访问 behavior 中的数据或方法==，*实例代码如下：*

```
// 1.使用 require() 导入需要的自定义 behavior 模块
const myBehavior = require("../../behaviors/my-behavior")

Component({
// 2.将导入的 behavior 实例对象，挂载到 behaviors 组件节点中，即可生效
	behaviors: [myBehavior],
	//组件的其他节点
})

//页面的 wxml 结构
<view>在behavior中定义的用户名是：{{username}}</view>
```

### 5. behavior 中所有可用的节点

| 可用的节点     | 类型         | 是否必填 | 描述                |
| -------------- | ------------ | -------- | ------------------- |
| ==properties== | Object Map   | 否       | 同组件的属性        |
| ==data==       | Object       | 否       | 同组件的数据        |
| ==methods==    | Object       | 否       | 同自定义组件的方法  |
| ==behaviors==  | String Array | 否       | 引入其它的 behavior |
| created        | Function     | 否       | 生命周期函数        |
| attached       | Function     | 否       | 生命周期函数        |
| ready          | Function     | 否       | 生命周期函数        |
| moved          | Function     | 否       | 生命周期函数        |
| detached       | Function     | 否       | 生命周期函数        |

### 6.同名字段的覆盖和组合规则*

组件和它引用的 behavior 中==可以包含同名的字段==，此时可以参考如下 3 种同名时的处理规则：

1. 同名的数据字段（data）
2. 同名的属性（properties）或方法（methods）
3. 同名的生命周期函数

详细请参考开发者文档：

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html