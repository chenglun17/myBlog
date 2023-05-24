# 优化

## 1.图片懒加载

入口文件通常只做一些初始化的事情，不应该包含太多的逻辑代码，可以通过插件的方法**把懒加载指令封装为插件**，main.js入口文件只需要负责注册插件即可

在**`src/directives/index.js`**中定义懒加载插件

```js
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core' // VueUse提供的一个监听元素是否进入视口区域的函数

export const lazyPlugin = {
    install(app) {
        // 懒加载指令的逻辑
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el：指令绑定的那个元素 img
                // binding：binding.value 指令等号后面绑定的表达式的值 图片url
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {	// isIntersecting为一个布尔值，代表监听的元素是否进入视口区域
                        if (isIntersecting) {
                            // 进入视口区域
                            el.src = binding.value
                            stop()	// 停止监听
                        }
                    },
                )
            }
        })
    }
}
```

> 优化：**useIntersectionObserver** 对于元素的监听是一直存在的，存在**内存浪费**，需要手动停止监听 **`stop()`**

在**`src/main.js`**中注册全局指令

```js
// 注册全局指令
import { directivePlugin } from '@/directives'
app.use(directivePlugin)
```

组件**`src/views/Home/componets/HomeHot.vue`**中用**`v-img-lazy`**替换**`:src`**

```html
<img v-img-lazy="item.picture" />
```

这类图片通过懒加载优化首段可以做到，只有进入视口区域才发送图片请求

## 2.解决路由缓存问题

缓存问题：当路由 path 一样，**参数不同**的时候会选择**直接复用路由对应的组件**，意味着组件的生命周期钩子不会被调用，从而导致数据无法更新

**方法一：**给 routerv-view 添加 key 属性，破坏缓存（不在意性能问题可使用）

```vue
<!-- 添加key，破坏复用机制，强制销毁重建 -->
<RouterView :key="$route.fullPath" />
```

**方法二：**（在意性能问题可使用）

使用**`beforeRouteUpdate`**钩子函数可以在每次路由更新之前执行，在**回调中执行需要数据更新的业务逻辑**

或者，使用**`onBeforeRouteUpadate`**导航守卫



## 4.全局组件插件化

components 目录下有可能会有很多其他通用型组件，有可能在多个业务模块中共享，所有统一进行全局组件注册