# 五、Vue3 新增的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的 <strong style="color:#DD5145">组件HTML结构</strong> 移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

## 3.Suspense

[参考文章](https://devpress.csdn.net/viewdesign/64376a5e986c660f3cf93ad4.html)

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- <strong style="color:#DD5145">异步组件 + suspense 就可以返回 promise对象（性能优化）</strong>

- **主要目的**是为了解决页面引入很多组件导致打包后的 js 体积过大，同样条件下，文件体积越大，请求耗时越长，容易出现白屏的现象

- 使用步骤：

- 异步引入组件

  ```js
  import { defineAsyncComponent } from 'vue'
  
  // 变成异步组件,这样做在打包的时候就会单独打包一份js文件,对应的js文件在需要时才会被加载
  const Child = defineAsyncComponent(() => import('./components/Child.vue'))
  ```

异步组件是以下两种情况之一:

> - 一个带有`async setup`函数的组件，该组件返回一个Promise，或者在`script setup`中使用顶级`await`
> - 使用 `defineAsyncComponent` 异步加载的组件

- 使用```Suspense```包裹组件，并配置好```default``` 与 `fallback`，把**异步组件**放入`default`槽，把**回退加载状态**放入`fallback`槽

  ```vue
  <template>
  	<div class="app">
  		<h3>我是App组件</h3>
  		<Suspense>
              <!-- default和fallback不可改名,因为这是Suspense内部定义好的插槽 -->
              <!-- fallback是由于网速或者其他原因没有加载成功时显示的组件 -->
  			<template v-slot:default>
  				<Child/>
  			</template>
  			<template v-slot:fallback>
  				<h3>加载中.....</h3>
  			</template>
  		</Suspense>
  	</div>
  </template>
  ```

