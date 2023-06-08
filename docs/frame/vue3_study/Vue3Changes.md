# 六、Vue3 的一些改变

## 1.:star:全局API的转移

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

## 2.:star:其他改变

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



## 3.:star:Proxy 替代 defineProperty

### Object.defineProperty

定义：`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

`Object.defineProperty`<strong style="color:#DD5145">只能劫持对象的属性，若属性值也是对象，则需要深度遍历</strong>。

存在问题：

- 检测不到对象属性的添加和删除
- 数组`API`方法无法监听到
- 需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

### Proxy

`Proxy`的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性了。

`Proxy`直接可以<strong style="color:#DD5145">劫持整个对象</strong>，并返回一个新对象，我们可以只操作新的对象达到响应式目的。

在`ES6`系列中，我们详细讲解过`Proxy`的使用，就不再述说了。