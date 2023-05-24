# 二、Webpack 基础

Webpack 本身功能是有限的:

- 开发模式：仅仅能编译 JS 中的 `ES Module` 语法
- 生产模式：不仅能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

## 1.基本使用

- 初始化包描述文件`package.json`

```sh
npm init -y
```

此时会生成一个基础的 `package.json` 文件。

**需要注意的是 `package.json` 中 `name` 字段不能叫做 `webpack`, 否则下一步会报错**

- 安装依赖 **`webpack`**（核心包），**`webpack-cli`**（命令行工具）

```sh
npm i webpack webpack-cli -D
```

- 启动 Webpack，来对代码进行打包（打包后观察 dist 目录）

```sh
npx webpack
# 自动打包
npx webpack --watch
```

## 2.基本配置

在项目根目录下新建文件：`webpack.config.js`

```js
module.exports = {
    // 模式
    mode: "",
    // 入口
    entry: "",
    // 出口
    output: {},
    // 加载器
    module: {
        rules: [],
    },
    // 插件
    plugins: [],
}
```

Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范

## 3.修改配置文件

```js
const path = require("path") // node.js核心模块，专门来处理路径问题

module.exports = {
    // 模式
    mode: "development", // production表示生产模式，development为开发者模式
    // 入口
    entry: "./src/main.js", // (相对路径)用来指定打包时的主文件（入口文件），默认 ./src/main.js
    // 出口
    output: {
        // 文件的输出路径
        // path: 文件输出目录，必须是绝对路径
        // path.resolve()方法返回一个绝对路径
        // __dirname 当前文件的文件夹绝对路径
        path: path.resolve(__dirname, 'dist'), // 配置打包的目录，必须要绝对路径
        // 文件名
        filename: "main.js"

    },
    // 加载器
    module: {
        rules: [
            // loader的配置
        ]
    },
    // 插件
    plugins: [
        // plugin的配置
    ]
}
```

## 4.处理样式资源

Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源

我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用

[Webpack 官方 Loader 文档](https://webpack.docschina.org/loaders/)

### 处理 Css 资源

- 下载包

```sh
npm i css-loader style-loader -D
```

- `css-loader`：负责将 Css 文件编译成 Webpack 能识别的模块
- `style-loader`：会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容

此时样式就会以 Style 标签的形式在页面上生效

- 配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.css$/i,     // 用来匹配 .css 结尾的文件
            // use 数组里面 Loader 执行顺序是从右到左(从后往前)
            use: [
                "style-loader", // 将js中css通过创建style标签添加到html文件中生效
                "css-loader"    // 将css资源编译成Commonjs的模块到js中
            ],
        }
    ]
}
```

- **`src/main.js`**中引入

```js
// 要想webpack打包资源，必须引入该资源
import "./css/index.css"
```

> 如果在 js 中导入了css，那么就需要使用 css-loader 来识别这个模块，通过特定的语法规则进行转换内容最后导出，css-loader 会处理 `import` / `require()` 、 `@import` / `url` 引入的内容。
>
> css-loader 处理之后导出的是**数组**，页面是无法直接使用，需要用到另外一个style-loader来处理，style-loader 是通过一个JS脚本创建一个 style 标签，里面包含一些样式。
>
> style-loader是不能单独使用的，因为它并不负责解析 css 之前的依赖关系，每个loader的功能都是单一的，各自拆分独立。

### 处理 Less 资源

- 下载包

```sh
npm i less less-loader -D
```

- `less-loader`：负责将 Less 文件编译成 Css 文件
- `less`：`less-loader` 依赖 `less` 进行编译

- 配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.less$/i,
            // loader: 'xxx',   // 只能使用一个loader
            use: [
                "style-loader",
                "css-loader",
                "less-loader"   // 将less编译成css文件
            ],
        }
    ]
}
```

- **`src/main.js`**中引入

```js
// 要想webpack打包资源，必须引入该资源
import "./less/index.less"
```

### 处理 Sass 和 Suss 资源

- 下载包

```sh
npm i sass sass-loader -D
```

- `sass-loader`：负责将 Sass 文件编译成 css 文件
- `sass`：`sass-loader` 依赖 `sass` 进行编译

- 配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"   // 将sass或suss编译成css文件
            ],
        }
    ]
}
```

- **`src/main.js`**中引入

```js
// 要想webpack打包资源，必须引入该资源
import "./sass/index.sass"
import "./sass/index.scss"
```

### 处理 Styl 资源

- 下载包

```sh
npm i stylus-loader -D
```

- `stylus-loader`：负责将 Styl 文件编译成 Css 文件

- 配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.styl$/i,
            use: ["style-loader", "css-loader", "stylus-loader"],
        }
    ]
}
```

- **`src/main.js`**中引入

```js
// 要想webpack打包资源，必须引入该资源
import "./styl/index.styl"
```

## 5.处理图片资源

过去在 Webpack4 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

现在 Webpack5 已经将两个 Loader 功能**内置到 Webpack 里了**，我们只需要简单配置即可处理图片资源

- 配置

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
                // 优化
                dataUrlCondition: {
                    // 小于10kb的图片，会转base64
                    // 优点：减少请求数量；缺点：体积会更大
                    maxSize: 10 * 1024 // 10kb
                }
            },
        }
    ]
}
```

## 6.修改打包路径

- 配置

```js
output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js", // 将入口文件 main.js 输出到 static/js 目录中
}
```

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            ....
            generator: {
                // 将图片文件输出到 static/imgs 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数
                filename: "static/imgs/[hash:8][ext][query]",
            },
        }
    ]
}
```

修改 index.html

```html
<!-- 修改 js 资源路径 -->
<script src="../dist/static/js/main.js"></script>
```

```
├── dist
    └── static
         ├── imgs
         │    └── 7003350e.png
         └── js
              └── main.js
```

## 7.自动清空上次打包资源

```js
output: {
    clean: true, // 自动将上次打包目录资源清空
}
```

## 8.处理字体图标资源

## 9.处理其他资源

## 10.处理 JS 资源

在编写 js 代码时，经常需要使用一些 js 中的新特性，而新特性在旧的浏览器中兼容性并不好。此时就导致我们无法使用一些新的特性。

但是我们现在希望能够使用新的特性，我们可以采用折中的方案。依然使用新特性编写代码，但是代码编写完成时我们可以通过一些工具将新代码转换为旧代码。

### Eslint

可组装的 JavaScript 和 JSX 检查工具。

这句话意思就是：它是用来检测 js 和 jsx 语法的工具，可以配置各项功能

使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查

### Babel

babel 就是这样一个工具，<strong style="color:#DD5145">可以将新的 js 语法转换为旧的 js，以提高代码的兼容性</strong>。主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

我们如果希望在 webpack 支持 babel，则需要向 webpack 中引入 babel 的 loader。

在 Webpack 中使用

- 下载包**`babel-loader（加载器） @babel/core（核心包） @babel/preset-env（预设环境）`**

```sh
npm i babel-loader @babel/core @babel/preset-env -D
```

- **`webpack.config.js`**

```js
// 加载器
module: {
    rules: [
        // loader的配置
        {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
            // options: {
            //     presets: ["@babel/preset-env"]  // 内部预设
            // }
        }
    ]
}
```

- 定义 Babel 配置文件，**`babel.config.js`**

```js
module.exports = {
    // 外部预设：能够编译ES6语法
    presets: ["@babel/preset-env"]
}
```

## 11.处理 HTML 文件

- 下载包

```sh
npm i html-webpack-plugin -D
```

- 配置**`webpack.config.js`**

```js
const HtmlWebpackPlugin = require("html-webpack-plugin") // 引入插件

module.exports = {
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "public/index.html"),
        })
    ]
}
```

打包之后，此时 dist 目录就会输出一个 index.html 文件

## 12.开发服务器&自动化

第一种方式

```sh
# 自动打包
npx webpack --watch
```

第二种方式

- 下载包

```sh
npm i webpack-dev-server -D
```

- 配置**`webpack.config.js`**

```js
module.exports = {
    // 开发服务器：不会输出资源，在内存中编译打包
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    }
}
```

- 运行指令

```sh
npx webpack serve
```

并且当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。

开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道。

## 13.生产模式介绍

```
├── webpack-test (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── .eslintrc.js(Eslint配置文件)
    ├── babel.config.js(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
```

### 修改 webpack.dev.js

因为文件目录变了，所以所有绝对路径需要回退一层目录才能找到对应的文件

```js
mode: "development",
output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // clean: true, // 开发模式没有输出，不需要清空输出结果
}
```

运行开发模式的指令：

```sh
npx webpack serve --config ./config/webpack.dev.js
```

### 修改 webpack.prod.js

因为文件目录变了，所以所有绝对路径需要回退一层目录才能找到对应的文件

不需要 devServer 启动服务器

```js
mode: "production",
```

运行生产模式的指令：

```sh
npx webpack --config ./config/webpack.prod.js
```

### 配置运行指令

为了方便运行不同模式的指令，我们将指令定义在 package.json 中 scripts 里面

```json
// package.json
{
    // 其他省略
    "scripts": {
        "start": "npm run dev",
        "dev": "npx webpack serve --config ./config/webpack.dev.js",
        "build": "npx webpack --config ./config/webpack.prod.js"
    }
}
```

以后启动指令：

> - 开发模式：`npm start` 或 `npm run dev`
> - 生产模式（development）：`npm run build`

npm start = npm run dev = webpack serve = npx webpack serve ,这三个命令都可以输,而且是同样效果

## 14.CSS 处理

### 提取 CSS 成单独文件

Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式

这样对于网站来说，会出现闪屏现象，用户体验不好

我们应该是单独的 Css 文件，通过 link 标签加载性能才好

- 下载包

```sh
npm i mini-css-extract-plugin -D
```

- 配置**`webpack.prod.js`**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")  // 引入插件

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,     // 用来匹配 .css 结尾的文件
                use: [
                    // "style-loader", // 将js中css通过创建style标签添加到html文件中生效
                    MiniCssExtractPlugin.loader, // 提取css成单独的文件
                    "css-loader"    // 将css资源编译成commonjs的模块到js中
                ],
            },
            // 其他用到 css-loader 的都要将 "style-loader" 改为 MiniCssExtractPlugin.loader
        ]
    },
    plugins: [
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        })
    ]
}
```

- 打包

```sh
npm run build
```

### CSS 兼容性处理

> postcss 解决 css 样式兼容
>
> babel 解决 js 兼容

- 下载包

```sh
npm i postcss-loader postcss postcss-preset-env -D
```

- 配置**`webpack.prod.js`**

```js
module: {
    rules: [
        {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                // -----------------
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]  // 能解决大多数样式兼容性问题
                        }
                    }
                }
                // -----------------
            ]
        },
        {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                // -----------------
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]  // 能解决大多数样式兼容性问题
                        },
                    },
                }, 
                //-----------------
                "less-loader",
            ],
        },
    ]
}
```

- 合并配置，修改**`webpack.prod.js`**

```js
// 用来获取处理样式的loader
function getStyleLoaders(pre) {
    return [
        // "style-loader", // 将js中css通过创建style标签添加到html文件中生效
        MiniCssExtractPlugin.loader, // 提取css成单独的文件
        "css-loader",    // 将css资源编译成commonjs的模块到js中
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ]
                }
            }
        },
        pre  // 需要不同的loader 通过传参写入
    ].filter(Boolean) // 不需要传参的，需要过滤
}

module.exports = {
    // 加载器
    module: {
        rules: [
            // loader的配置
            // 处理css资源
            {
                test: /\.css$/i,     // 用来匹配 .css 结尾的文件
                // use 数组里面 Loader 执行顺序是从右到左(从后往前)
                use: getStyleLoaders()
            },
        ]
    }
}
```

### CSS 压缩

- 下载包

```sh
npm i css-minimizer-webpack-plugin -D
```

- 配置**`webpack.prod.js`**

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")  // 引入插件

module.exports = {
    plugins: [
        // css压缩
        new CssMinimizerPlugin()
    ]
}
```

## 15.HTML 压缩

默认生产模式（production）已经开启了：html 压缩和 js 压缩

不需要额外进行配置

## 总结

本章节我们学会了 Webpack 基本使用，掌握了以下功能：

1. 两种开发模式

- 开发模式：代码能编译自动化运行
- 生产模式：代码编译优化输出

2. Webpack 基本功能

- 开发模式：可以编译 ES Module 语法
- 生产模式：可以编译 ES Module 语法，压缩 js 代码

3. Webpack 配置文件

- 5 个核心概念
  - entry
  - output
  - loader
  - plugins
  - mode
- devServer 配置

4. Webpack 脚本指令用法

- `webpack` 直接打包输出
- `webpack serve` 启动开发服务器，内存编译打包没有输出