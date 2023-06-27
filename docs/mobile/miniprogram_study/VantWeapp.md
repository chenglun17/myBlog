# Vant Weapp



小程序对 npm 的支持与限制

目前，小程序中不支持使用 npm 安装第三方包，从而来提高小程序的开发效率。但是，在小程序中使用 npm 包有如下 3 个限制：

1. 不支持依赖于 ==Node.js内置库== 的包
2. 不支持依赖于 ==浏览器内置对象== 的包
3. 不支持依赖于 ==C++插件== 的包

## 1.什么是 Vant Weapp

Vant Weapp 是有赞前端团队开源的一套==小程序 UI 组件库==，助力开发者快速搭建小程序应用。它所使用的是 ==MIT 开源许协议==，对商业使用比较友好。

官方文档地址：https://youzan.github.io/vant-weapp

## 2.安装 Vant 组件库

在小程序项目中，安装 Vant 组件库主要分为如下 3 步：

1. 通过 npm 安装（建议指定版本@1.3.3）
2. 构建 npm 包
3. 修改 app.json

## 3.使用 Vant 组件

安装完 Vant 组件库之后，可以在 ==app.json== 的 ==usingComponents== 节点中引入需要的组件，即可在 wxml 中直接使用组件。*示例代码如下：*

```
//app.json
"usingComponents":{
	"vant-button":"@vant/weapp/button/index"
}

//页面的 .wxml结构
<vant-button type="primary">按钮</vant-button>
```

## 4.定制全局主题样式

Vant Weapp 使用 ==CSS变量== 来实现定制主题。关于 CSS 变量的基本用法，请参考 MDN 文档：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties

**自定义属性**（有时候也被称作**CSS变量**或者**级联变量**）是由CSS作者定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如：==--main-color: black;==），由 var() 函数来获取值（比如： ==color: var(--main-color);== ）

声明一个自定义属性，属性名需要以两个减号（`--`）开始，属性值则可以是任何有效的CSS值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

```
element {
  --main-bg-color: brown;
}
```

## 5.定制全局主题样式

在 ==app.wxss== 中，写入 CSS变量，即可对全局生效：

```
/* app.wxss */
page {
	/* 定制警告按钮的背景颜色和边框颜色 */
	--button-danger-background-color: #C00000;
	--button-danger-border-color: #D60000;
}
```

