# Vue Router

## 相关理解

### 1.vue-router 的理解

vue的一个插件库，专门用来实现SPA应用

### 2.对SPA应用的理解

1. **单页Web应用**（single page web application，**SPA**）
2. 整个应用只有一个完整的页面
3. 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
4. 数据需要通过ajax请求获取

### 3.路由的理解

1. 什么是路由? 

   - 一个路由就是一组映射关系（key - value）
   - key为路径，value可能是 function 或 component

2. 路由分类：

   - **后端路由**
     理解：value 是 function，用于处理客户端提交的请求
     工作过程：服务器接收到一个请求时，根据**请求路径**找到匹配的**函数**来处理请求，返回响应数据
   - **前端路由**
     理解：value 是 component，用于展示页面内容
     工作过程：当浏览器的路径改变时，对应的组件就会显示

## 使用路由

> - vue-router4，只能用在vue3中
> - vue-router3，只能用在vue2中

1. 安装路由 vue-router

   ```sh
   npm i vue-router@3
   ```

2. **`src/router/index.js`**，配置路由

```javascript
/* 该文件专门用于创建整个应用的路由器 */

import Vue from 'vue'
import VueRouter from 'vue-router'		 // 引入VueRouter
import About from '../pages/About'	     // 引入路由组件
import Home from '../pages/Home'		// 引入路由组件

// 创建router实例对象，去管理每一组路由规则
const router = new VueRouter({
    // 定义路由配置
	routes:[
		{
			path:'/about',		// 设置路由路径
			component:About		// 注册路由组件
		},
		{
			path:'/home',		// 设置路由路径
			component:Home		// 注册路由组件
		}
	]
})
// 暴露router
export default router
```

​	在 **`src/main.js`** 中引入并挂载 router 配置项

```javascript
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'   // 引入VueRouter
import router from './router' 		// 引入路由器

// 应用插件
Vue.use(VueRouter)

new Vue({
	el: '#app',,
	router // 挂载路由器
	render: h => h(App)
})
```

4. 使用路由，**声明式路由导航**：**`<router-link></router-link>`** 浏览器会被替换为a标签。active-class 可配置高亮样式

```vue
<!--路由切换-->
<router-link active-class="active" to="/about">About</router-link>
```

5. 指定展示位 (一般在App.vue中)

```vue
<!--路由出口-->
<router-view></router-view>
```



## 几个注意点

1. 路由组件通常存放在 **pages / views** 文件夹，一般组件通常存放在 **components** 文件夹

2. 通过切换，“隐藏” 了的路由组件，**默认是被销毁掉的，需要的时候再去挂载**

3. 每个路由组件都有 **`$route属性`**，里面<strong style="color:#DD5145">存储着自己的路由信息</strong>，是一个局部的对象，可以获取对应的name，path，params，query等

4. 整个应用只有一个 router，可以通过组件的 **`$router属性`** 获取到

5. **`$router`** 是 VueRouter 的一个对象，通过 **`Vue.use(VueRouter)`** 和 Vue构造函数得到一个 router 的实例对象，

   这个对象中是一个全局的路由实例，他包含了所有的路由，包含了许多关键的对象和属性。



## 嵌套路由+重定向+路由命名+路由元信息

**1.配置路由规则**

嵌套路由，使用 **`children`** 配置项

<strong style="color:#DD5145">路由元信息</strong>：路由中 **`meta`** 配置项，我们可以在这个配置项中添加一些**自定义参数**，用于后续的判断

```javascript
/* router/index.js 文件 */
routes:[
    {
        // 当路径是/时，会切换到/home
        path: "/",
        redirect: "/home" 	// 🟢重定向
    },
    {
        path:'/home',   	// 路由路径
        component: Home,	// 路由组件
        // a meta field     // 🟢路由元信息
        meta: { 
            title: '首页',
            requiresAuth: true 
        },
        children:[ 			// 通过children配置子级路由
            {
                path:'news', // 🟢此处一定不要带斜杠，不能写成 /news
                name:'hello',    // 🟢路由命名
                component: News
            }
        ]
    },
]
```

**2.跳转（要写完整路径）**

```vue
<router-link to="/home/news">News</router-link>
```

**3.指定展示位** 

一级路由入口，一般写在**`App.vue`**文件中；二级路由入口，一般写在父组件中

```vue
<router-view></router-view>
```

**4.由命名是为了简化路由的跳转**

```vue
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法 配合传递参数 -->
<router-link :to="{ name:'hello', query:{id:666, title:'你好'} }">跳转</router-link>
```

## 路由导航

### 声明式路由导航

```vue
<router-link to="/home">Home</router-link>
```

### 编程式路由导航

[参考文章](https://blog.csdn.net/weixin_44944943/article/details/110010466?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522168266552816800227461779%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=168266552816800227461779&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-110010466-null-null.142^v86^insert_down1,239^v2^insert_chatgpt&utm_term=this.%E2%80%8B%5C%24router.replace%28%7B%20%7D%29%09&spm=1018.2226.3001.4187)

作用：不借助 **`<router-link>`** 实现路由跳转，让路由跳转更加灵活

- **`this.$router.push({path: '/路径'})`**：相当于点击路由链接(可以返回到当前路由界面)
- 或 **`this.$router.push({name: "路由名称"})`**
- **`this.$router.replace({path})`**：用新路由替换当前路由(不可以返回到当前路由界面)
- **`this.$router.forward()`**：请求(返回)下一个记录路由
- **`this.$router.back()`**：请求(返回)上一个记录路由
- **`this.$router.go(n)`**：可前进也可后退，n为正数前进n，为负数后退

1. 作用：控制路由跳转时操作浏览器历史记录的模式

2. 浏览器的历史记录有两种写入方式：**push** 和 **replace**
   - push：是追加历史记录，路由跳转时候 **默认为 push 方式**
   - <strong style="color:#DD5145">replace：是替换当前记录</strong>

3. 开启 replace 模式
   - **`<router-link :replace="true" ...>News</router-link>`**
   - 简写：**`<router-link replace ...>News</router-link>`**

4. 总结：浏览记录本质是一个**栈**，默认 push，点开新页面就会在栈顶追加一个地址，后退，栈顶指针向下移动，<br>改为 replace 就是不追加，而将栈顶地址替换

```js
/*
        $route 
          用来获取路由参数(params、query)和路由路径（path）
        $router
          用来编程式导航(push、replace、go、back、forward)

        两种路由跳转的方式：
          1. 路由链接导航
            router-link
          2. 编程式导航
            this.$router.push/replace()
            
            （1）如果点击链接或者按钮只需要进行路由跳转，那么就用第一种方式
              	例子：导航链接
            （2）如果点击链接或者按钮需要做一些其他事，再进行路由跳转，那么就用第二种方式
              	例子：登录按钮、修改按钮
*/
```

例如：

```js
methods: {
    push(id) {
        // 编程式导航
        this.$router.push(`/home/message/detail/${id}?name=suzy&age=25`);
    },
    replace(id) {
        this.$router.replace(`/home/message/detail/${id}?name=suzy&age=25`);
    }
}
```

```html
<button @click="push(message.id)">push</button>
<button @click="replace(message.id)">replace</button>
```



## 路由传参

### 1. query参数

它直接就可以传参不需要去路由中配置参数，它的**参数名称会在 url 地址上显示出来**。

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的 字符串写法 -->
   <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的 对象写法（推荐） -->
   <router-link :to="{ path:'/home/message/detail', query:{ id: m.id, title: m.title } }">跳转</router-link>
   ```

2. 接收参数

   ```javascript
   this.$route.query.id
   this.$route.query.title
   ```

   

### 2. params参数

- query 相当于GET请求，页面跳转的时候，可以在地址栏看到请求参数
- params 相当于POST请求，参数不会在地址栏中显示
- params 参数传递的时候需要 <strong style="color:#DD5145">占位</strong>

1. 配置路由，**声明接收 params 参数**

   ```javascript
   /* router/index.js 文件 */
   {
       path:'/home',
       component: Home,
       children:[
           {
               component:Message,
               children:[
                   {
                       path:'detail/:id?/:title?',  // 🟢使用 占位符，声明接收params参数，🟢加一个 ? 代表可传可不传
                       component: Detail,
                       name:'xiangqing',		// 🟢路径不需要加 / ，因为它只是个名字
                   }
               ]
           },
       ]
   }
   ```

2. 传递参数

注意：路由携带 params 参数时，若使用 to 的对象写法，则不能使用 **path** 配置项，<strong style="color:#DD5415">只能通过 name 来传参</strong>

   它传递的**参数名称不会在浏览器上显示**

   ```vue
<!-- 跳转并携带params参数，to的 字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>

<!-- 跳转并携带params参数，to的 对象写法 -->
<router-link :to="{ name:'xiangqing', params:{ id:666, title:'你好' } }">跳转</router-link>
   ```

3. 接收参数

   ```javascript
   this.$route.params.id
   this.$route.params.title
   ```


### 两者传参参数的区别

- query 传递配置的时path，而params传递配置的是name，在params中配置path无效
- query 在路由配置不需要设置参数，而params必须设置
- query 传递的参数会显示在地址栏中，params则不会
- params 刷新后参数会丢失，数据安全，但是query会保存传递过来的值，刷新不变；

```js
// 字符串
this.$router.push('/index') 
// 对象
this.$router.push({ path: '/index' })
// 带查询参数，变成/backend/order?selected=2/，query传参
this.$router.push({ path: '/index', query: {name: '123'} })
// 命名的路由 params传参
this.$router.push({ name: 'index', params: {name: '123'} })
```

### 3. props参数

props作用：让路由组件更方便的收到参数，可以将params、query参数，通过props传递个路由组件

```javascript
/* router/index.js 文件 */
{
    name:'xiangqing',
    path:'detail/:id/:title',
    component:Detail,

    // 第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
    // props:{a:900}

    // 第二种写法：props值为布尔值，为true时，只能传递params参数
    // props:true

    // 第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
    // props($route){
    //     return { id: $route.query.id, title: $route.query.title }
    // }
    
    // 或者
    props: ($route) => {
        return { id: $route.query.id, title: $route.query.title }
    }
}
```



## 缓存路由组件

[参考文章](https://blog.csdn.net/liyunkun888/article/details/100537764)

**`<keep-alive></keep-alive>`**，作用：让不展示的路由组件<strong style="color:#DD5415">保持挂载，不被销毁</strong>

> 注意：是缓存页面的 name 名称，而不是缓存页面路由的 name 名称

```vue
<!-- 缓存一个路由组件，include中写想要缓存的组件名，不写表示全部缓存 -->
<keep-alive include="该路由的name名称">
    <router-view></router-view>
</keep-alive>

<!-- 缓存多个路由组件，include前面加一个冒号: -->
<keep-alive :include="['News','Message']"> 
    <router-view></router-view>
</keep-alive>
```

## 路由组件的生命周期钩子

<strong style="color:#DD5415">activated</strong> 和 <strong style="color:#DD5415">deactivated</strong> 是**路由组件**所独有的两个生命周期钩子，用于**捕获路由组件的激活状态**

具体使用：

- **activated** 路由组件**被激活**时触发
- **deactivated** 路由组件**失活**时触发

- activated 和 deactivated 是配合 <strong style="color:#DD5415">keep-alive标签</strong> 一起使用的
- activated 和 deactivated 没有 keep-alive 的时候是不会被触发的
- 在存在 keep-alive 的时候可以将 activated 当作 created 进行使用
- deactivated 是组件销毁的时候触发，此时的 destory 是不执行的

## 路由守卫

1. 作用：对路由进行**权限控制** 
2. 分类：全局守卫、独享守卫、组件内守卫 
3. 执行顺序：**前置**路由，**独享**路由，进入路由，**后置**路由，离开路由

### 1. 全局路由守卫

- 全局前置守卫**beforeEach**

<strong style="color:#DD5145">`beforeEach`</strong> 有三个参数，**to 表示要跳转到的路由组件**，**from 表示当前的路由组件**，**next 表示进行跳转命令**

- **`next()`**，放行
- **`next(false)`**，中断当前导航
- **`next('/')`**或**`next({path:'/'})`**，跳转到一个不同的地址



- 全局后置守卫**afterEach**

<strong style="color:#DD5145">`afterEach`</strong> 只有两个参数，to 表示要跳转到的路由组件，from 表示当前的路由组件

<strong style="color:#DD5145">路由元信息</strong>：路由中**`meta`**这个配置项，我们可以在这个配置项中添加一些**自定义参数**，用于后续的判断

**`src/router/index.js`**

```javascript
// 创建一个路由器
....
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'bar',
                    component: Bar,
                    meta: { isAuth: true }	// 设置路由元信息，也就是每个路由身上携带的信息
                }
            ]
        }
        ....
    ]
})

// 全局前置守卫：初始化时、每次路由切换前执行
router.beforeEach((to, from, next) => {
    console.log('beforeEach', to, from)
    if (to.meta.isAuth){ // 判断当前路由是否需要进行权限控制
        if (localStorage.getItem('school') === 'atguigu'){  // 权限控制的具体规则
            next()	// 放行
        } else{
            alert('暂无权限查看')
        }
    } else{
        next()	// 放行
    }
})

// 全局后置守卫：初始化时、每次路由切换后执行
router.afterEach((to, from) => {
    console.log('afterEach', to, from)
    if (to.meta.title){ 
        document.title = to.meta.title  // 修改网页的title
    } else{
        document.title = 'vue_test'
    }
})

....
// 暴露一个路由器
export default router
```

### 2. 路由独享的守卫

独享路由守卫只有前置 <strong style="color:#DD5145">beforeEnter</strong>，没有后置。

**`src/router/index.js`** 里面的路由配置 **`new VueRouter({})`** 中编写

```javascript
{
    path: "/home",
    component: Home,
    // 路由独享守卫
    beforeEnter(to,from,next){
        console.log('beforeEnter', to, from)
        if (localStorage.getItem('school') === 'atguigu'){ // 判断当前路由是否需要进行权限控制
            next()
        } else{
            alert('暂无权限查看')
        }
    },
}
```

> 可以和**全局后置守卫**配合使用

### 3. 组件内路由守卫

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

> 前面的**全局后置守卫**是路由切换后被调用，这里**组件内的离开守卫**是离开该组件时调用，注意这个区别。

**`src/pages/About.vue`** 里面的中 **`export default{}`** 中编写

```javascript
const Foo = {
    template: `...`,
    //进入守卫：通过路由规则，进入该组件时被调用
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    //离开守卫：通过路由规则，离开该组件时被调用
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
```

> 可以和**全局后置守卫**配合使用

执行顺序，前置路由，独享路由，进入路由，后置路由，离开路由



## 两种工作模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

1. 对于一个url来说，什么是hash值？

> **\#** 及其后面的内容就是hash值

2. hash值不会包含在HTTP请求中，即：hash值不会带给服务器 

3. **hash模式** 

- 地址中永远带着#号，不美观
- 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
- 兼容性较好

4. **history模式**

- 地址干净，美观
- 兼容性和hash模式相比略差
- 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题

```javascript
const router =  new VueRouter({
	mode: 'history',
	routes: [...]
})
export default router
```



## 滚动行为

用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

```js
// 配置路由
const router = new VueRouter({
    routes,	// 外部导入的自定义路由规则
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 } // y = 0 代表滚动条在最上方
        // return { top: 0 } // Vue3使用
    }
})
export default router
```



