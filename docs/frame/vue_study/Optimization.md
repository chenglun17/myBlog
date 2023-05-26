# 优化

## 图片懒加载

http://www.npmjs.com/package/vue-lazyload

温馨提示：vue2中建议用懒加载的1版本包，不要用最新的包，图片出不来的是由于插件版本问题，卸载掉重新安装1.3.3版本

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。

如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

```js
// import Home from '@/pages/Home' // 路由懒加载写法，则不需要在这里引入
export default [
    {
        path: "/home",
        // component: Home, // 用下一行替换
        component: () => import('@/pages/Home'), // 🟢路由懒加载写法，该组件会被延迟加载，推荐这样写
        name: 'home',
        meta: { show: true }
    }
]
```

