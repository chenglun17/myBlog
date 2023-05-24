# 三、Webpack 高级

## 介绍

本章节主要介绍 Webpack 高级配置。

所谓高级配置其实就是进行 Webpack 优化，让我们代码在编译/运行时性能更好~

我们会从以下角度来进行优化：

1. 提升开发体验
2. 提升打包构建速度
3. 减少代码体积
4. 优化代码运行性能

## 提升开发体验

### SourceMap

#### 为什么

帮助我们更快的找到错误根源

#### 是什么

SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。

当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源

#### 怎么用

通过查看 [Webpack DevTool 文档](https://webpack.docschina.org/configuration/devtool/) 可知，SourceMap 的值有很多种情况，但实际开发时我们只需要关注两种情况即可：

- 开发（development）模式：`cheap-module-source-map`
  - 优点：打包编译速度快，**只包含行映射**
  - 缺点：没有列映射

```js
module.exports = {
    // 其他省略
    mode: "development",
    devtool: "cheap-module-source-map",
}
```

- 生产（production）模式：`source-map`
  - 优点：**包含行/列映射**
  - 缺点：打包编译速度更慢

```js
module.exports = {
    // 其他省略
    mode: "production",
    devtool: "source-map",
}
```

## 提升打包构建速度

### HMR

#### 为什么

开发时我们修改了其中一个模块代码，Webpack 默认会将所有模块全部重新打包编译，速度很慢。

所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。

#### 是什么

**HotModuleReplacement**（**HMR/热模块替换**）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

#### 怎么用

- 基本配置**`webpack.dev.js`**

```js
module.exports = {
    // 其他省略
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
    }
}
```

此时 css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行

- js 配置**`src/main.js`**

```js
// 判断是否支持HMR功能
if (module.hot) {
    module.hot.accept("./js/count.js")
    module.hot.accept("./js/sum.js")
}
```

上面这样写会很麻烦，所以实际开发我们会使用其他 loader 来解决。

比如：[vue-loader](https://github.com/vuejs/vue-loader), [react-hot-loader](https://github.com/gaearon/react-hot-loader)。

### OneOf

#### 为什么

打包时每个文件都会经过所有 loader 处理，虽然因为 `test` 正则原因实际没有处理上，但是都要过一遍。比较慢。

#### 是什么

顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了。

#### 怎么用

开发模式和生产模式都可以这样配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            // 每个文件只能被其中一个loader配置处理
            oneOf: [
                // 处理各类资源
            ]
        }
    ]
}
```

### Include/Exclude

#### 为什么

开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的。

所以我们在对 js 文件处理时，要排除 node_modules 下面的文件。

#### 是什么

- include

> 包含，只处理 xxx 文件

- exclude

> 排除，除了 xxx 文件以外其他文件都处理

#### 怎么用

开发模式和生产模式都可以这样配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            // 每个文件只能被其中一个loader配置处理
            oneOf: [
                // 处理js向下兼容资源
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules下的文件，其他文件全都处理
                        include: path.resolve(__dirname, "../src"), // 只处理src下的文件，其他文件不处理
                        loader: "babel-loader",
                    },
            ]
        }
    ]
}
```

### Cache

#### 为什么

每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

#### 是什么

对 Eslint 检查 和 Babel 编译结果进行缓存

#### 怎么用

开发模式和生产模式都可以这样配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            // 每个文件只能被其中一个loader配置处理
            oneOf: [
                // 处理js向下兼容资源
                    {
                        test: /\.js$/,
                        // exclude: /node_modules/, // 排除node_modules下的文件，其他文件全都处理
                        include: path.resolve(__dirname, "../src"), // 只处理src下的文件，其他文件不处理
                        loader: "babel-loader",
                        options: {
                            // presets: ["@babel/preset-env"]  // 内部预设
                            cacheDirectory: true, // 开启babel缓存
                            cacheCompression: false, // 关闭缓存文件压缩
                        }
                    },
            ]
        }
    ]
}
```

### Thread

## 优化代码运行性能