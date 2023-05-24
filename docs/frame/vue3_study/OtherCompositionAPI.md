# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- **`shallowReactive`**：只处理<strong style="color:#DD5145">对象最外层属性</strong>的响应式（<strong style="color:orange">浅响应式</strong>）。
- **`shallowRef`**：只处理<strong style="color:#DD5145">基本数据类型</strong>的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> **`shallowReactive`**。
  -  如果有一个对象数据，<strong style="color:orange">后续功能不会修改该对象中的属性，而是生新的对象来替换</strong> ===> **`shallowRef`**。

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让<strong style="color:#DD5145">响应式数据最外层</strong>变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

**toRaw：**

- 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
- 只能处理 reactive 构造的响应式数据
- 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。

**markRaw：**

- 作用：标记一个对象，使其永远不会再成为响应式对象。
- 应用场景:
  1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
  2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
      <input type="text" v-model="keyword" />
      <h3>{{ keyword }}</h3>
  </template>
  
  <script>
      import { customRef } from 'vue'
      export default {
          name: 'App',
  
          setup() {
              // 自定义一个ref——名为myRef
              function myRef(value, delay) {
                  let timer
                  return customRef((track, trigger) => {	// 此处return是交出自定义的ref
                      return {	// 此处return是语法要求
                          get() {
                              console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`)
                              track() // 通知Vue追踪value的变化
                              return value
                          },
                          set(newValue) {
                              console.log(`有人把myRef这个容器中数据改为了：${newValue}`)
                              clearTimeout(timer) // 防抖
                              timer = setTimeout(() => {
                                  value = newValue
                                  trigger() // 通知Vue去重新解析模板
                              }, delay)
                          },
                      }
                  })
              }
              // let keyword = ref('hello') // 使用Vue提供的ref
              let keyword = myRef('hello', 500) // 使用自定义的ref
              return { keyword }
          },
      }
  </script>
  ```

  

## 5.provide 与 inject

<img src="OtherCompositionAPI .assets/provide与inject.png" alt="provide与inject" style="zoom:80%;" />

- 作用：实现 <strong style="color:#DD5145">祖先与后代组件间</strong> 通信，顶层组件向任意的底层组件传递数据和方法，实现 <strong style="color:#DD5145">跨层组件通信</strong>

- 套路：父组件（顶层组件）通过**`provide`** 函数来提供数据，后代组件（底层组件）通过**`inject`** 函数来获取数据

- 语法：

  顶层组件：

  ```js
  proviede('key', 顶层组件的数据)	// 传递静态数据
  proviede('key-ref', ref对象)	    // 传递ref对象（实现传递过程中保持数据的响应式）
  provide('key-method', 方法名)	   // 传递方法
  ```

  > 顶层组件可以向底层组件传递**方法**，底层组件调用方法修改顶层组件中的数据（遵守谁的数据谁负责修改）

  底层组件：

  ```js
  const message = inject('key')
  ```

- 具体写法：

  1. 祖先组件中：

  ```js
  import { provide } from 'vue'
  setup () {
  	......
      let car = reactive({name:'奔驰',price:'40万'})
      provide('car',car)
      ......
  }
  ```

  2. 后代组件中

  ```js
  import { inject } from 'vue'
  setup (props, context) {
  	......
      const car = inject('car')
      return {car}
  	......
  }
  ```



## 6.响应式数据的判断

- **isRef**：检查一个值是否为一个 ref 对象
- **isReactive**：检查一个对象是否是由 `reactive` 创建的响应式代理
- **isReadonly**：检查一个对象是否是由 `readonly` 创建的只读代理
- **isProxy**：检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理