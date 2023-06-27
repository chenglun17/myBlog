# uni-app基础

## 规范

- 页面文件遵循 Vue 单文件组件规范

- 组件标签靠近小程序规范

- 接口能力（JS API）靠近微信小程序规范

- 数据绑定及事件处理使用 Vue.js 规范

## 特色

**App端的Nvue开发**

uni-app App端内置了一个基于 weex 改进的原生渲染引擎，提供了原生渲染能力

在App端，如果使用 vue 页面，则使用 webview 渲染；如果使用 nvue（native vue）页面，则使用原生渲染

**HTML 5+**

uni-app App端内置 HTML 5+ 引擎，让 js 可以直接调用丰富的原生能力

一些比较复杂的功能，可以直接调用 App 原生的插件来实现

只能再去 App 端使用，无法在 H5 和小程序中使用

## 基础知识点

1. 组件：基础组件和自定义组件
2. API：网络请求等
3. 路由：类似小程序的页面切换
4. 生命周期：页面隐藏、页面显示等
5. 语法：数据绑定、事件等
6. 布局样式：样式引用、suss等

## 开发环境

**HbuilderX**

**vue cli**

安装 vue-cli：

```
npm install @vue-cli -g
```

检查 vue-cli 是否安装：

```
vue -V
```

## uni-app 目录结构

- pages	页面存放目录

- static	静态资源：图片、字体图标

- App.vue	全局配置：样式、全局监听，和小程序 app.js文件类似

- main.js	Vue初始化入口文件

- manifest.json	项目配置：appid、logo

- pages.json	页面配置：导航、tabbar、路由



- common	存放公用的文件

- components	存放自定义组件

- store	vuex目录

- unpackage	编译后的文件存放目录

## uni-app 模板语法

> v-bind:	简写： :

组件属性使用 data 中定义的数据变量，或者组件属性使用表达式，要使用v-bind绑定

> v-on:	简写： @

组件属性使用 methods 中定义的方法，要使用v-on绑定事件

## uni-app 数据绑定

> v-model

数据双向绑定

## uni-app 条件判断

> v-if
>
> v-else-if
>
> v-else

v-if：条件判断，决定某个内容或区块是否**挂载**

v-show：条件判断，决定某个内容或区块是否**显示**

## 空标签

> <block\></block\>
>
> <template\></template\>

## uni-app 列表渲染

> v-for

## uni-app 事件绑定

> v-on:	简写： @

组件属性使用 methods 中定义的方法，要使用v-on绑定事件

## 事件冒泡

使用 .stop 可以阻止事件冒泡

```html
<view @click="c1">
    我是父级
    <view @click.stop="c2">我是子级</view>
</view>
```

## uni-app 基础组件

https://uniapp.dcloud.io/

## uni-app 自定义组件

HBuildX 2.5.5 起支持 easycom 组件模式

传统 Vue 组件，需要安装、引用、注册，三个步骤后才能使用组件。easycom 将其精简为一步。只要组件安装在项目的 `components` 目录下，并符合 `components/组件名称/组件名称.vue` 目录结构。就可以不用引用、注册，直接在页面中使用。

**easycom是自动开启的**，不需要手动开启，有需求时可以在 `pages.json` 的 `easycom` 节点进行个性化设置

不管components目录下安装了多少组件，easycom打包后会自动剔除没有使用的组件，对组件库的使用尤为友好

### 父子组件

父组件向子组件传递数据可以通过 **props**

子组件向父组件传递数据可以通过自定义事件， **父组件自定义事件，子组件触发父组件定义的事件，并传递数据**

子组件可以定义插槽 slot，让父组件自定义要显示的内容

## uni-app 常用 API

## uni-app 条件编译

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台

# uni-app进阶

## uni-app 生命周期

应用的生命周期

- 在App.vue

页面的生命周期

- 在页面.vue

组件的生命周期

## 路由跳转

## 获取页面参数

```js
onLoad(e) {
    console.log(e)
}
```

可通过 `getCurrentPages()` 获取当前的页面栈

## 交互反馈

### uni.showToast(OBJECT)

显示消息提示框。

### uni.showLoading(OBJECT)

显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。

###  uni.showModal(OBJECT)

显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。

###  uni.showActionSheet(OBJECT)

从底部向上弹出操作菜单

## 网络请求

uni.request(OBJECT)

## 数据缓存

### uni.setStorage(OBJECT)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

```js
uni.setStorage({
    key: 'storage_key',
    data: 'hello',
    success: function () {
        console.log('success')
    }
})
```

### uni.setStorageSync(KEY,DATA)

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

```js
try {
    uni.setStorageSync('storage_key', 'hello');
} catch (e) {
    // error
}
```

### uni.getStorage(OBJECT)

从本地缓存中异步获取指定 key 对应的内容。

```js
uni.getStorage({
    key: 'storage_key',
    success: function (res) {
        console.log(res.data)
    }
})
```

###  uni.getStorageSync(KEY)

从本地缓存中同步获取指定 key 对应的内容。

```js
try {
    const value = uni.getStorageSync('storage_key');
    if (value) {
        console.log(value);
    }
} catch (e) {
    // error
}
```

