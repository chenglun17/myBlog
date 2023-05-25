# 八、逻辑复用

## 1.组合式函数

Vue3 中的 Composables(Composables) ，它是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。功能类似 Vue2 的 mixins，但又有所不同。

Vue 官方称为 Composables 组合式函数。简单理解其实就是类 React Hooks 式的组合式函数封装方法。

注意：组合式函数约定用驼峰命名法命名，并以“use”作为开头。

## 2.自定义指令

我们已经介绍了两种在 Vue 中重用代码的方式：组件 和 组合式函数。

组件是主要的构建模块，而组合式函数则侧重于有状态的逻辑。[自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html) 主要是为了重用涉及普通元素的底层 DOM 访问的逻辑。

将一个自定义指令全局注册到应用层级也是一种常见的做法：

```js
// src/main.js
const app = createApp(App)

// 使 v-demo 在所有组件中都可用
app.directive('demo', {
    /* ... */
    mounted(el, binding) {}
})
```

### 指令钩子

一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。

```js
const myDirective = {
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el, binding, vnode, prevVnode) {
        // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode, prevVnode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el, binding, vnode, prevVnode) {},
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevVnode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated(el, binding, vnode, prevVnode) {},
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevVnode) {},
    // 绑定元素的父组件卸载后调用
    unmounted(el, binding, vnode, prevVnode) {}
}
```

### 钩子参数

1. **`el`**：指令绑定到的元素。这可以用于直接操作 DOM。

2. **`binding`**：一个对象，包含以下属性。
   - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
   - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
   - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
   - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
   - `instance`：使用该指令的组件实例。
   - `dir`：指令的定义对象。

3. **`vnode`**：代表绑定元素的底层 VNode。

4. **`prevNode`**：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

### 在组件上使用

**不**推荐在组件上使用自定义指令

```vue
<MyComponent v-demo="test" />
```



## 3.插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。

一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。

安装函数会接收到安装它的应用实例和传递给 `app.use()` 的额外选项作为参数：

在**`src/components/index.js`**中定义一个插件：

```js
export const myPlugin = {
    install(app, options) {
        // 配置此应用
        // app.component('组件名字', 组件配置对象)
    }
}
```

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

> 1. 通过**`app.component()`**和**`app.directive()`**注册一到多个**全局组件**或**自定义指令**。
> 2. 通过 `app.provide()` 使一个资源可被注入进整个应用。
> 3. 向 `app.config.globalProperties` 中添加一些全局实例属性或方法
> 4. 一个可能上述三种都包含了的功能库 (例如 [vue-router](https://github.com/vuejs/vue-router-next))。

在**`main.js`**中引入并注册

```js
import { createApp } from 'vue'
// 引入全局组件插件
import { myPlugin } from "@/components"

const app = createApp(app)
// 注册
app.use(myPlugin, {
    /* 可选的选项 */
})
```

在其他组件上使用