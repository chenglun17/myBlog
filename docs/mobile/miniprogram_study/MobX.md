# 全局数据共享

## :star:什么是全局数据共享

全局数据共享（状态管理）是为了解决 组件之间数据共享 的问题。

开发中常用的全局数据共享方案有：Vuex、Redux、MobX等。



## :star:小程序中的全局数据共享方案

在小程序中，可使用 mobx-miniprogram 配合 mobx-miniprogram-bindings 实现全局数据共享。

- `mobx-miniprogram` 用来 创建 Store 示例对象
- `mobx-miniprogram-bindings` 用来 把 Store 中的共享数据或方法，绑定到组件或页面中使用



## :star:全局数据共享 - MobX

### 1.安装 MobX 相关的包

在项目中运行如下的命令，安装 MobX 相关的包：

```sh
npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```

注意：MobX 相关的包安装完毕之后，记得删除 miniprogram_npm 目录 后，重新 构建 npm。

### 2.创建 MobX 的 Store 实例

在项目根目录中创建 store 目录，在里面创建 store.js 文件

```js
// 在这个js文件中，专门来创建 store 的示例对象
import {observable, action} from 'mobx-miniprogram'

export const store = observable({
    // 数据字段
    numA: 1,
    numB: 2,
    // 计算属性
    get sum() {
        return this.numA +this.numB
    },
    // actions 方法，用来修改 store 中的数据
    updateNum1: action(function (step) {
        this.numA += step
    }),
    updateNum2: action(function (step) {
        this.numB += step
    }),
})
```

### 3.将 Store 中的成员绑定到页面中

```js
// 页面的 .js 文件
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

page({
    onLoad: function() {	// 生命周期函数--监听页面加载
        this.storeBindings = createStoreBindings(this,{
            store,
            fields: ['numA','numB','sum'],
            actions: ['updateNum1']
        })
    },
    onUnload: function() {	// 生命周期函数--监听页面加载
        this.storeBindings.destroyStoreBindings()
    }
})
```

### 4.在页面上使用 Store 中的成员

```vue
// 页面的 .wxml 结构
<view>{{numA}} + {{numB}} = {{sum}}</view>
<vant-button type="primary" bindtap="btnHandler1" data-step="{{1}}">numA + 1</vant-button>
<vant-button type="danger" bindtap="btnHandler1" data-step="{{-1}}">numA - 1</vant-button>

// 按钮 tap 事件的处理函数
btnHandler1(e) {
	// console.log(e)
	this.updateNum1(e.target.dataset.step)
},
```

### 5.将 Store 中的成员绑定到组件中

```js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'

Component({
    behaviors: [storeBindingsBehavior],	// 通过 storeBindingsBehavior 来实现自动绑定
    storeBindings: {
        store,		// 指定要绑定的 store
        fields: {	// 指定要绑定的字段数据
            numA: () => store.numA,			// 绑定字段的第1种方式
            numB: (store) => store.numB,			// 绑定字段的第2种方式
            sum: "sum"			// 绑定字段的第3种方式
        },
        actions: {
            updateNum2: 'updateNum2'
        }
    },
})
```

### 6.在组件中使用 Store 中的成员

```js
// 页面的 .js 文件
methods: {
    btnHandler2(e) {
        this.updateNum2(e.target.dataset.step)
    }
}
```

