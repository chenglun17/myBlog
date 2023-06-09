# 一、Webpack 概念

[官方文档](https://webpack.docschina.org/)

- 当我们习惯了在 node 中编写代码的方式后，在回到前端编写 html、css、js 这些东西会感觉到各种的不便。比如：不能放心的使用模块化规范（浏览器兼容性问题）、即使可以使用模块化规范也会<strong style="color:#DD5145">面临模块过多时的加载问题</strong>。
- 我们就迫切的希望有一款工具可以对代码进行打包，将多个模块打包成一个文件。这样一来即解决了兼容性问题，又解决了模块过多的问题。
- 构建工具就起到这样一个作用，通过构建工具可以将使用 ESM 规范编写的代码转换为旧的 JS 语法，这样可以使得所有的浏览器都可以支持代码。

- 在使用 webpack 打包工具时，每引入一种新的类型文件时，<strong style="color:#DD5145">需要引入对应的 loader（加载器）</strong>

- webpack 默认情况下，只会处理 js 文件，如果我们希望可以处理其他类型的文件，则要为其引入 loader 