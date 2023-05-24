# 六、其他

## 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```）                 | 3.x 实例 API (`app`)                        |
    | ----------------------------------------- | ------------------------------------------- |
    | Vue.config.xxxx，全局配置                 | app.config.xxxx                             |
    | Vue.config.productionTip，关闭Vue生产提示 | <strong style="color:#DD5145">移除</strong> |
    | Vue.component                             | app.component                               |
    | Vue.directive                             | app.directive                               |
    | Vue.mixin                                 | app.mixin                                   |
    | Vue.use                                   | app.use                                     |
    | Vue.prototype                             | app.config.globalProperties                 |

## 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong> keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']	// 通过声明项指定自定义事件，没指定的就是原生事件
      }
    </script>
    ```

- <strong style="color:#DD5145">移除 </strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......

## 3.自定义指令

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



## 4.插件

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

## 5.Proxy 跨域代理

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

