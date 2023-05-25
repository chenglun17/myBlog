# 九、VueRouter

安装

```sh'
npm install vue-router@4
```

## vue2和vue3的路由区别

[参考文章](https://blog.csdn.net/qq_44880095/article/details/129036946)

Vue2 中的 **new Router** 变成 Vue3 中的 **createRouter**

Vue Router 不再是一个类，而是一组函数。现在不用再写 **`new Router()`**，而是要调用 **`createRouter`**

### vue2 的引用方式

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [ ...xxx ]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
```

### vue3的引用方式

**`router/index.js`**中定义

```js
// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // 🟢路由懒加载写法，该组件会被延迟加载
        component: () => import(/* webpackChunkName: "notFound" */ '../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
```

**`main.js`**中注册

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```



##  history 配置取代 mode

`mode: 'history'` 配置已经 `history` 配置所取代。

根据使用的模式，用适当的函数替换它：

- `"history"`: `createWebHistory()`
- `"hash"`: `createWebHashHistory()`
- `"abstract"`: `createMemoryHistory()`

## 导航守卫

[参考文章](https://blog.csdn.net/qq_45466204/article/details/122884150)

### 全局路由守卫

**1.全局前置守卫（<strong style="color:#DD5145">`router.beforeEach`</strong>）**

```js
router.beforeEach((to, form, next) => {
    console.log(to, form)
    next()
})
```

每个守卫方法接收三个参数：

```js
to: Route，即将要进入的目标 路由对象；
from: Route，当前导航正要离开的路由；
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
next(false): 中断当前的导航。如果浏览器的URL改变了，那么 URL 地址会重置到 from 路由对应的地址。
next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
```

**2.全局解析守卫**（<strong style="color:#DD5145">`router.beforeResolve`</strong>）

这个钩子和 beforeEach 类似，也是路由跳转前触发，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，即在 beforeEach 和 组件内 beforeRouteEnter 之后，afterEach 之前调用。

```js
router.beforeResolve((to,from,next)=>{})
```

**3.全局后置守卫（<strong style="color:#DD5145">`router.afterEach`</strong>）**

```js
router.afterEach((to,from) => {
    sendToAnalytics(to.fullPath)
})
```

### 路由独享的守卫

### 组件内路由守卫



## setup 中访问路由和当前路由

因为在 `setup` 里面没有访问 `this`，所以我们不能再直接访问 `this.$router` 或 `this.$route`。

作为替代，我们使用 `useRouter` 和 `useRoute` 函数：

```js
import { useRouter, useRoute } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        function pushWithQuery(query) {
            router.push({
                name: 'search',
                query: {
                    ...route.query,
                    ...query,
                },
            })
        }
        // 当参数更改时获取用户信息
        watch(
            () => route.params.id,
            async newId => {
                userData.value = await fetchUser(newId)
            }
        )
    },
}
```

> **`route` 对象是一个响应式对象**，所以它的任何属性都可以被监听，但你应该 **避免监听整个 `route 对象`**。在大多数情况下，你应该直接监听你期望改变的参数。
>
> 请注意，在模板中我们仍然可以访问 `$router` 和 `$route`，所以不需要在 `setup` 中返回 `router` 或 `route`

## 动态路由

[参考文章](https://blog.csdn.net/m0_55170432/article/details/127920722)

我们一般使用动态路由都是后台会返回一个**路由表**前端通过调接口拿到后处理（后端处理路由）

动态路由主要通过两个函数实现。<strong style="color:#DD5145">`router.addRoute()`</strong> 和 <strong style="color:#DD5145">`router.removeRoute()`</strong>

### 1.添加路由

```js
router.addRoute({ path: '/about', component: About })
```

### 2.删除路由

有几个不同的方法来删除现有的路由：（**当路由被删除时，所有的别名和子路由也会被同时删除**）

1. 通过添加一个名称冲突的路由。如果添加与现有途径名称相同的途径，会先删除路由，再添加路由：

```typescript
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })
```

2. 通过调用 router.addRoute() 返回的回调：（当路由没有名称时，这很有用）

```typescript
const removeRoute = router.addRoute(routeRecord)
removeRoute() // 删除路由如果存在的话
```

3. 通过使用 router.removeRoute() 按名称删除路由：
   需要注意的是，如果你想使用这个功能，但又想避免名字的冲突，可以在路由中使用 **Symbol** 作为名字。

```typescript
router.addRoute({ path: '/about', name: 'about', component: About })
// 删除路由
router.removeRoute('about')
```

### 3.查看现有路由

Vue Router 提供了两个功能来查看现有的路由：

1. **router.hasRoute()**：检查路由是否存在。
2. **router.getRoutes()**：获取一个包含所有路由记录的数组。





## 滚动行为

用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

```js
// 配置路由
const router = new VueRouter({
    routes,	// 外部导入的自定义路由规则
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // return { x: 0, y: 0 } // Vue2.x使用
        return { top: 0 } // top: 0 代表滚动条在最上方
    }
})
export default router
```

