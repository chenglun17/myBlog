# 一、创建 Vue3.0工程

## 创建一个Vue项目

前提环境条件：16.0或更高版本的 Node.js

创建的项目将使用基于 [Vite](https://vitejs.dev/) 的构建设置，并允许我们使用 Vue 的[单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html) (SFC)。

```sh
npm init vue@latest
# 这一指令将会安装并执行 create-vue
```

**create-vue** 是Vue官方新的脚手架工具，底层从Webpack切换到了Vite，为开发提供极速响应

在项目被创建后，通过以下步骤安装依赖并启动开发服务器：（项目名称不能大写）

```sh
cd <your-project-name>
npm install
npm run dev
```

> 请注意，生成的项目中的示例组件使用的是组合式 API 和 **`<script setup>`**，而非选项式 API

当你准备将应用发布到生产环境时，请运行：

```sh
npm run build
```

### 1. 使用 vue-cli 创建

官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2. 使用 vite 创建

接下来我们就用Vite来创建一个Vue3的项目：[参考](https://blog.csdn.net/weixin_52418790/article/details/124325110)

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

手动方式创建项目，Enter键确定显示如下：

> **Babel**：使用Babel将源码进行转码（把ES6=>ES5）
> **TypeScript**：使用TypeScript进行源码编写。使用TypeScript可以编写强类型JavaScript
> **Progressive Web App (PWA) Support**：使用渐进式Web应用程序
> **Router**：使用Vue路由
> **Vuex**：使用Vuex状态管理器
> **CSS Pre-processors**：CSS 预处理器（如：less、sass）
> **Linter / Formatter**：使用代码风格检查和格式化（如：ESlint）
> **Unit Testing**：使用单元测试（unit tests）
> **E2E Testing**：使用E2E（end to end）黑盒测试

## git 管理项目

基于 create-vue 创建出来的项目默认并没有初始化 git 仓库，需要我们手动初始化

```sh
git init
git add .
git commit -m 'init'
```



## Vite 前端构建工具

官方文档：https://v3.cn.vuejs.org/guide/installation.html#vite

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。

- 优势如下：

  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的**热重载**（又称**模块热替换**，HMR，hot module replacement），它可以在应用运行的时候，不需要刷新页面，就可以直接替换、增删模块。
  - 真正的按需编译，不再等待整个应用编译完成。

- 传统构建 与 vite构建对比图

  传统构建模式，是将所有资源都打包好，再上线

  <img src="CreateProject.assets/传统构建.png" alt="传统构建" style="zoom:33%;" />![vite构建](CreateProject.assets/vite构建.png)

  而Vite是按需加载

  ![vite构建](CreateProject.assets/vite构建.png)



##  分析文件目录

```
.vscode			--- VSCode工具配置文件
node_modules	 --- Vue项目的运行依赖文件夹
public			--- 资源文件夹

src				--- 源码文件夹
---apis			API接口文件夹
---composables	 组函数文件夹
---directives	 全局指令文件夹
---styles		全局样式文件夹
---utils		工具函数文件夹

.gitignore		--- git忽略文件
index.html		--- 入口HTML文件
package.json	--- 应用描述文件
REDAME.md	    --- 注释文件
vite.config.js	--- 项目配置文件，基于vite的配置
```

### main.js

Vue2项目的main.js

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

我们再来看看Vue3项目中的main.js

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

分析一下

```js
// 引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象——app（类似于之前Vue2中的vm，但app比vm更“轻”）
const app = createApp(App) // 1.以App作为参数生成一个应用实例对象
console.log(app)
app.mount('#app')	// 2.挂载到id为app的节点上
```

### App.vue

我们再来看看组件

在`template`标签里可以没有根标签了

```vue
<template>
	<!-- Vue3组件中的模板结构可以没有根标签 -->
	<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
```

