# Vue 生命周期

**生命周期：**

1. 又称为：生命周期回调函数、生命周期函数、生命周期钩子
2. 是什么？Vue在关键时刻帮我们调用的一些特殊名称的函数
3. 生命周期函数的名字是不可更改的，但函数的具体内容是根据需求编写的
4. 生命周期函数中的 this 指向vm或组件实例对象



## 1.:star:Vue生命周期的8个阶段

Vue 的生命周期核心总共分为4个阶段，8个钩子函数：创建阶段，挂载阶段，更新阶段，销毁阶段。

1. 创建阶段： 

- 在 <strong style="color:#DD5145">beforeCreate</strong> 阶段，vue实例的挂载元素`$el`和数据对象`data`都为`undefined`，还未初始化（数据监测、数据代理），真实DOM元素也没有渲染出来。

- 在 <strong style="color:#DD5145">created</strong> 阶段，可以通过vm访问到`data`中的数据、`methods`中配置的方法，但`$el`还没有，真实DOM还没有渲染出来，可以进行相关初始化事件的绑定、发送请求操作。

  **这是最早可以使用 data 和 methods 的钩子函数**

2. 挂载阶段：

- 在 <strong style="color:#DD5145">beforeMount</strong>  阶段，vue实例的`$el`和`data`都初始化完毕，但现在仍为虚拟的DOM节点，`data.message`还未替换，相关的 render 函数首次被调用。

- 在 <strong style="color:#DD5145">mounted</strong>  阶段，**vue实例挂载完成，真实DOM元素也已经渲染完成了**，`data.message`成功渲染，这个钩子函数内部可以做一些实例化相关的操作。

  （注意 mounted 不会保证所有的子组件也都被挂载完成。如果你希望等到整个视图都渲染完毕再执行某些操作，可以在 mounted 内部使用 **`vm.$nextTick`**）

3. 更新阶段：

- 在 <strong style="color:#DD5145">beforeUpdate</strong>  阶段，这个钩子函数初始化的不会执行，当组件挂载完毕的时候，并且当数据改变的时候，才会立马执行,这个钩子函数获取DOM的内容是更新之前的内容。

- 在 <strong style="color:#DD5145">updated</strong>  阶段，这个钩子函数获取DOM的内容是更新之后的内容生成新的虚拟DOM，新的虚拟DOM与之前的虚拟DOM进行比对，差异之后，就会进行真实DOM渲染。

  在 updated 钩子函数里面就可以获取到因 Diff 算法比较差异得出来的真实 DOM 渲染了。
  
  **当 data 变化时，会触发 beforeUpdate 和 updated 方法**

4. 销毁阶段：

- 在 <strong style="color:#DD5145">beforeDestroy</strong>  阶段，实例销毁之前调用，对`data`的改变不会触发周期函数了，这个阶段vue实例还能用，可以做一些善后操作,可以清除一些初始化事件、定时器相关的东西。

  **这是最后一次可以使用 data 和 methods 的钩子函数**

- 在 <strong style="color:#DD5145">destroyed</strong>  阶段，实例销毁之后调用。该钩子被调用后，Vue 实例的所有指令都被解绑，事件监听器被移除，子实例也都被销毁，但是DOM结构依然存在。

![](LifeCycle.assets/Vue2_生命周期.png)



## 2.:star:常用的生命周期钩子

- **mounted** 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等初始化操作
- created 和 mounted 都可以请求 axios
- **beforeDestroy** 清除定时器、解绑自定义事件、取消订阅消息等收尾工作 ，这是最后一次可以使用 `data` 和 `methods` 的钩子函数。



## 3.:star:生命周期钩子触发的时机

第一次页面加载会触发的生命周期钩子？

- beforeCreate， created， beforeMount， mounted

Vue 获取数据在一般在哪个周期函数？

- created，beforeMount，mounted



## 4.:star:父子组件生命周期钩子执行顺序

- 加载渲染过程：

  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程：

  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程：

  父 beforeUpdate -> 父 updated

- 销毁过程：

  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed



## 5.:star:关于销毁 Vue 实例

1. 销毁后借助Vue开发者工具看不到任何信息
2. 销毁后自定义事件会失效，但**原生DOM事件依然有效（Vue3中也会失效）**
3. 一般不会在 beforeDestroy 操作数据，因为即便操作数据，也不会再触发更新流程了



## :page_facing_up:参考

[参考文章](https://blog.csdn.net/weixin_53934815/article/details/129092938)