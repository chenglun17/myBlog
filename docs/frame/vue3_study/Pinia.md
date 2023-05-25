# 十、Pinia 状态管理库

[参考文章](https://blog.csdn.net/weixin_42365757/article/details/123848276)、[参考文章2](https://blog.csdn.net/weixin_42776111/article/details/126008933)

## 基本概念

Pinia官网：https://pinia.vuejs.org/zh/

Pinia 是 Vue 的专属的最新**状态管理库**，是 Vuex 状态管理工具的替代品。和数据相关的操作（state+action）都放到Pinia中，组件值负责触发action函数

> 1. 提供更加简单的API（<strong style="color:#DD5145">去掉了 mutation</strong>），只有 state、getters、actions
> 2. 提供符合组合式风格的API（和 Vue3 新语法统一），也还是支持选项式API
> 3. <strong style="color:#DD5145">去掉了 modules 的概念</strong>，每一个 store 都是一个独立的模块
> 4. 搭配 TypeScript 一起使用提供可靠的类型推断

## 添加 Pinia 到 Vue 项目

1. 使用 create-vue 创建空的新项目

   ```sh
   npm init vue@latest
   ```

2. 按照官方文档安装 Pinia 到项目

   ```sh
   npm install pinia
   ```

3. 创建一个 pinia 实例 (根 store) 并将其传递给应用：

   ```js
   // 1.导入 createPinia
   import { createPinia } from 'pinia'
   // 2.执行方法得到实例
   const pinia = createPinia()
   // 3.把pinia实例加入到app应用中
   // createApp(App).use(pinia).mount('#app')
   const app = createApp(App)
   app.use(pinia)
   app.mount('#app')
   ```

## 基本使用

### Option Store

 定义 Store（state + action），在**`stores/index.js`**文件夹下

```js
import { defineStore } from 'pinia'
// 命名形式一般为 useXXXStore
export const useCounterStore = defineStore('counter', {
    // 数据（state）
    state: () => {
        return { 
            count: 0 
        }
    },
    // 类似于计算属性，是有缓存的，主要是帮助我们修饰一些值
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    // 修改数据的方法（actions）
    actions: {
        increment() {
            this.count++
        },
    },
})
```

> - **`defineStore()`**的第一个参数 counter 是你的应用中 Store 的唯一 ID
> - **`defineStore()`**的第二个参数可接受两类值：**Setup 函数** 或 **Option 对象**。

### Setup Store

为实现更多高级用法，可以使用一个函数 (与组件 `setup()` 类似) 来定义一个 Store（组合式API风格）

Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何组合式函数。

不过，请记住，使用组合式函数会让 [SSR（服务端渲染）](https://pinia.vuejs.org/zh/cookbook/composables.html) 变得更加复杂。

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// 命名形式一般为 useXXXStore
export const useCounterStore = defineStore('counter', () => {
    // 定义数据（state）
    const count = ref(0)
    
    // 定义getter
    const doubleCount = computed(() => count.value * 2)
    
    // 定义修改数据的方法（action 同步|异步）
    const increment = () {
        count.value++
    }
	// 以对象的形式return返回出去
    return { count, increment }
})
```

> 在 Setup Store 中：
>
> - **`ref()`** 就是 **`state`** 属性
> - **`computed()`** 就是 **`getters`**，Pinia 中的 **`getters`** 直接使用 **`computed`** 函数模拟实现
> - **`function()`** 就是 **`actions`**

### 使用 Store

```vue
<script setup>
    // 1.导入 useCounterStore 方法
    import { useCounterStore } from '@/stores/counter'
    // 2.执行方法得到 counterStore 对象
    const counterStore = useCounterStore()
</script>

<template>
    <!-- 直接从 store 中访问 state -->
    <button @click="counterStore.increment"> {{ counterStore.count }}</button>
</template>
```

## 响应式解构赋值 

使用 storeToRefs 函数可以辅助保持数据（state + getter）的响应式解构赋值

```js
// 响应式丢失，视图不再更新
const { count, doubleCount } = counterStore

import { storeToRefs } from 'pinia'

// 保持数据的响应式（state + getter）
const { count, doubleCount } = storeToRefs(counterStore)

// 方法直接从原来的counterStore中解构赋值
const { increment } = counterStore
```

## Pinia 数据持久化

官方文档：https://prazdevs.github.io/pinia-plugin-persistedstate/zh/

pinia-plugin-persistedstate 插件始终会将 localStore 里的数据与 pinia 保持同步

运行机制：**在设置state的时候会自动把数据同步给localStorage，在获取state数据的时候会优先从localStorage中获取**

1. **安装**

```sh
npm i pinia-plugin-persistedstate
```

2. **将插件添加到 pinia 实例上**

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

3. **使用，创建 Store 时，将 `persist` 选项设置为 `true`**

- 使用选项式 Store 语法：

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      someState: '你好 pinia',
    }
  },
    persist: true,
})
```

- 使用组合式 Store 语法：

```js
import { defineStore } from 'pinia'
import { ref } from "vue"

export const useStore = defineStore('main', () => {
    const someState = ref('你好 pinia')
    
    return { someState }
  },{ persist: true }
)
```

