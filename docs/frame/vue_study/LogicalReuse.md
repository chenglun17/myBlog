# 逻辑复用

## 1.mixin 混合

功能：可以把多个组件共用的配置提取（抽离）成一个 **混合（混入）对象**

使用方式：

**1. 定义混合**，例如：在 mixin.js 文件里面编写

```javascript
export default mixin = {
    data() {....},
    methods: {....},
    ....
}
```

**2. 使用混合**，例如：在 main.js 文件里面编写

- 全局混合：**`Vue.mixin(xxx)`**
- 局部混合：**`mixins:['xxx']`**

**备注：**

- 组件和混合对象含有**同名选项**时，这些选项将以恰当的方式进行“合并”，在发生冲突时以**组件优先**
- **同名生命周期钩子**将合并为一个数组，因此**都将被调用**。另外，**混合对象的钩子**将在组件自身钩子之前调用



### mixin混入对象和Vuex的区别

[参考文章](https://blog.csdn.net/gao_xu_520/article/details/107224803)

- Vuex是**状态共享管理**，所以Vuex中的**所有变量和方法都是可以读取和更改并相互影响的**；
- mixin可以**定义公用的变量或方法**，但是mixin中的**数据是不共享的**，也就是每个组件中的mixin实例都是不一样的，都是**单独存在的个体，不存在相互影响的**；
- mixin混入对象值为函数的同名函数选项将会进行递归合并为数组，两个函数都会执行，只不过先执行mixin中的同名函数；
- mixin混入对象值为对象的同名对象将会进行替换，都优先执行组件内的同名对象，也就是组件内的同名对象将mixin混入对象的同名对象进行覆盖



### mixin与公共组件的区别

- 组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。
- Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。



## 2.plugin 插件

功能：用于增强 Vue

本质：包含 **install 方法** 的一个**对象**，install 的第一个参数是Vue，第二个及其后面的参数是插件使用者传递的数据

定义插件：

```javascript
export default {
	install(Vue, options){
		console.log(options)
		// 1.添加全局过滤器
		Vue.filter(...)
		// 2.添加全局指令
		Vue.directive(指令名, 配置对象)
		// 3.配置全局混合
		Vue.mixin({
			data() {
				return {}
			}
		})
		// 4.添加实例方法（vm和vc就都能用了）
		Vue.prototype.$myMethod = function () {...}
		Vue.peototype.$myProperty = xxxx
	}
}
```

使用插件：（在 main.js 文件中）

1. 先引用：**`import plugin from './plugin'`**
2. 再使用：**`Vue.use(plugin)`**

例如：

定义插件 `src/plugins/myPlugins.js`

```js
// Vue 插件暴露一个对象
let myPlugins = {}

myPlugins.install = function(Vue, options){
    // 全局指令
    Vue.directive(options.name, (element, params) => {
        element.innerHTML = params.value.toUpperCase()
        console.log(params)
    })
}

export default myPlugins
```

注册插件`main.js`

```js
// 引入自定义插件
import myPlugins form './plugins/myPlugins'
Vue.use(myPlugins, {
    name: 'upper'
})
```

组件中使用

```vue
<template>
    <div>
        <h1 v-upper="msg"></h1>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'abc'
            }
        }
    }
</script>
```



## 3.自定义指令

### 局部指令

```javascript
new Vue({
	directives:{指令名: 配置对象/回调函数}
})
```



### 全局指令

配置对象中常用的3个回调：

- **bind**：指令与元素**成功绑定**时调用（一开始）
- **inserted**：指令所在元素被**插入**页面时调用
- **update**：指令所在模板结构被**重新解析**时调用

```javascript
// Vue.directive(指令名, 配置对象/回调函数)

Vue.directive('fbind', {
    // 指令与元素成功绑定时（一上来）
    bind(element, binding) {	// element就是DOM元素，binding就是要绑定的
        element.value = binding.value
    },
    // 指令所在元素被插入页面时
    inserted(element, binding) {
        element.focus()
    },
    // 指令所在的模板被重新解析时
    update(element, binding) {
        element.value = binding.value
    }
})
```

注意

- 指令定义不加 **v-**，但使用时要加 **v-**
- 指令名如果是多个单词，要使用 **kebab-case** 命名方式，不要使用 camelCase 命名



## 4.过滤器（Vue3已弃用）