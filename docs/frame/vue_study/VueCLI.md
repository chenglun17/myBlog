# Vue CLI 脚手架

## :star:创建一个项目

[三种创建Vue项目的方式](https://kaven.blog.csdn.net/article/details/110262834)

安装脚手架：

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

创建Vue2.x项目：

> 1. vue create：vue -cli3.x 版本的初始方式 ，启动方式默认为 npm run serve
>
> 2. vue init webpack : vue -cli2.x 版本的初始化方式，启动方式默认为 npm run dev ，webpack 为官方推荐模板
>
>    使用方式：`vue init [options] <template> <app-name>`。

```sh
vue create <项目名>
```

启动：

```sh
npm run serve
```



## :star:脚手架文件结构

```markdown
.文件目录
├── dist：打包后的文件
├── node_modules：依赖的node工具包文件夹
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src：源码目录
│   ├── api：API接口文件
│   ├── assets: 存放静态资源（在 webpack 打包的时候，webpack会把静态资源当作一个模块，打包到 js 文件里面）
│   │── components: 存放公共组件（一般为非路由组件，全局组件）
│   │── pages/views：页面组件
│   │── router：前端路由
│   │── store：vuex状态管理
│   │── utils：工具
│   │── App.vue: 汇总所有组件（唯一的根组件）
│   └── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── package-lock.json: 包版本控制文件
├── README.md: 应用描述文件
└── vue.config.js: vue配置文件
```

## :star:render 函数

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	el:'#app',
    // 简写形式
    render: h => h(App),	// render函数功能：将App组件放入容器中
    // 完整形式
    // render(createElement){
    //   return createElement(App)
    // }
})
```



## :star:不同版本的 Vue

1. vue.js 与 vue.runtime.xxx.js 的区别：
   - **vue.js** 是**完整版**的 Vue，包含：**核心功能** + **模板解析器**
   - **vue.runtime.xxx.js** 是**运行版**的 Vue，只包含核心功能，没有模板解析器
2. 因为 vue.runtime.xxx.js **没有模板解析器**，所以不能使用 **template 配置项**，<br>需要使用 **render 函数** 接收到的 **createElement 函数** 去指定具体内容



## :star:vue.config.js 配置文件

- **vue inspect > output.js** 可以查看到Vue脚手架的默认配置
- 使用 **vue.config.js** 可以对脚手架进行个性化定制，和 package.json 同级目录，详见 [配置参考 | Vue CLI](https://cli.vuejs.org/zh/config/#vue-config-js)

```javascript
module.exports = {
    pages: {
        index: {
            entry: 'src/index/main.js' // 入口
        }
    },
    lintOnSave: false	// 关闭语法检查
}
```

## :page_facing_up:参考

[参考文章](https://blog.csdn.net/James_liPeng/article/details/85329677)、[参考文章](https://huaweicloud.csdn.net/638eab63dacf622b8df8d01d.html)、[参考文章](https://blog.csdn.net/weixin_47127256/article/details/125766037)