#   	Webpack

- 当我们习惯了在 node 中编写代码的方式后，在回到前端编写 html、css、js 这些东西会感觉到各种的不便。比如：不能放心的使用模块化规范（浏览器兼容性问题）、即使可以使用模块化规范也会<strong style="color:#DD5145">面临模块过多时的加载问题</strong>。
- 我们就迫切的希望有一款工具可以对代码进行打包，将多个模块打包成一个文件。这样一来即解决了兼容性问题，又解决了模块过多的问题。
- 构建工具就起到这样一个作用，通过构建工具可以将使用 ESM 规范编写的代码转换为旧的 JS 语法，这样可以使得所有的浏览器都可以支持代码。

## Webpack

- 使用步骤：

  1. 初始化项目

     ```sh
     yarn init -y
     ```

  2. 安装依赖 **`webpack`**（核心包），**`webpack-cli`**（命令行工具）

     ```bash
     yarn add -D webpack webpack-cli
     ```

  3. 在项目中创建**`src`**目录，然后编写代码（index.js）

  4. 执行**`yarn webpack`**来对代码进行打包（打包后观察 dist 目录），或 自动打包 **`yarn webpack --watch`**

     ```sh
     yarn webpack
     # 或
     yarn webpack --watch
     ```

     或者在**`package.json`** 文件中自定义脚本，执行 **`yarn build`**或 自动监视 **`yarn watch`**（以文件访问）

     ```json
     "scripts": {
         "build": "webpack",
         "watch": "webpack --watch"
     }
     ```

- 配置文件（**`webpack.config.js`**），默认只能打包js文件，

- 在使用 webpack 打包工具时，每引入一种新的类型文件时，<strong style="color:#DD5415">需要引入对应的 loader（加载器）</strong>

- webpack 默认情况下，只会处理 js 文件，如果我们希望可以处理其他类型的文件，则要为其引入 loader 

  ​    \- 以CSS为例：

  > 使用 css-loader 可以处理js中的样式
  >
  > 使用步骤：
  >
  > 1. 安装：
  >
  >    ```sh
  >    yarn add -D css-loader
  >    yarn add -D style-loader
  >    ```
  >
  > 2. 配置：如下


> 如果在js中导入了css，那么就需要使用 css-loader 来识别这个模块，通过特定的语法规则进行转换内容最后导出
>
> css-loader 会处理 `import` / `require()` 、 `@import` / `url` 引入的内容
>
> css-loader 处理之后导出的是**数组**，页面是无法直接使用，需要用到另外一个style-loader来处理
>
> style-loader 是通过一个JS脚本创建一个style标签，里面包含一些样式。
>
> style-loader是不能单独使用的，因为它并不负责解析 css 之前的依赖关系，每个loader的功能都是单一的，各自拆分独立

- 约定优于配置

  ```js
  /* 在node里面运行的 */
  
  const path = require('path')
  module.exports = {
      // 模式
      mode: "production",     // 设置打包的模式，production表示生产模式，development为开发者模式
      
      // 入口
      // entry: "./hello/hello.js",   // 用来指定打包时的主文件（入口文件），默认 ./src/index.js
      // entry: ["./src/a.js","./src/b.js"],  // 打包两个文件
      // 分别打包为 hello.js 和 world.js
      // entry: {
      //     hello: "./src/a.js",
      //     world: "./src/b.js",
      // },
  
      // 出口
      output: {
          path: path.resolve(__dirname, "dist"),   // 配置自定义打包的目录，必须要绝对路径
          filename: "main.js",  // 配置自定义打包后的文件名
          // filename: "[name]-[id]-[hash].js",  // 打包后生成特别的名字，中括号里面为变量
          clean: true,    // 是否自动清除打包目录
      },
      // 配置loader加载器
      module: {
          rules: [
              {
                  test: /\.css$/i, // 正则表达式，处理css文件
                  use: ["style-loader", "css-loader"] // 顺序不能反，loader是从后往前执行
              },
              {
                  test: /\.(jpg|png)$/i, // 图片资源类型数据
                  type: "asset/resource" // webpack自带，指定type即可
              }
          ]
      }
  }
  ```

## babel

在编写 js 代码时，经常需要使用一些 js 中的新特性，而新特性在旧的浏览器中兼容性并不好。此时就导致我们无法使用一些新的特性。

但是我们现在希望能够使用新的特性，我们可以采用折中的方案。依然使用新特性编写代码，但是代码编写完成时我们可以通过一些工具将新代码转换为旧代码。

babel 就是这样一个工具，<strong style="color:#DD5415">可以将新的 js 语法转换为旧的 js，以提高代码的兼容性</strong>。

我们如果希望在 webpack 支持 babel，则需要向 webpack 中引入 babel 的 loader

- 使用步骤

  1. 安装 **`babel-loader（加载器） @babel/core（核心包） @babel/preset-env（预设环境）`**

     ```bash
      npm install -D babel-loader @babel/core @babel/preset-env
     ```

  2. 配置：

     ```js
     module: {
         rules: [
             {
                 test: /\.m?js$/, // 以js或mjs结尾的文件
                 exclude: /(node_modules|bower_components)/, // 排除这两个目录为文件
                 use: {
                     loader: "babel-loader", // 加载器
                     options: {
                         presets: ["@babel/preset-env"] // 使用babel默认配置
                     }
                 }
           }
         ]
      }
     ```

  3. 在 package.json 中设置兼容浏览器列表

     ```json
      "browserslist": [
         "defaults"
     ]
     ```

     [https://github.com/browserslist/browserslist](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist)

## 插件（plugin）

- 插件用来为 webpack 来扩展功能，<strong style="color:#DD5415">不会对代码进行编译</strong>

- **html-webpack-plugin**

  - 这个插件可以在打包代码后，<strong style="color:#DD5415">自动在打包目录生成 html 页面</strong>

  - 使用步骤：

    1. 安装依赖

     ```bash
    npm install -D html-webpack-plugin
     ```

    2. 配置插件

    ```js
    plugins: [
        new HTMLPlugin({
            // title: "Hello Webpack",
            template: "./src/index.html"
        })
    ],
    devtool: "inline-source-map"	// 配置源码的映射
    ```

- 开发服务器（**webpack-dev-server**）

  - 安装：

    ```bash
    yarn add -D webpack-dev-server
    ```

  - 启动：部署到服务器上，自动在浏览器中打开

    ```bash
    yarn webpack serve --open
    ```

- **`devtool:"inline-source-map"`** 配置源码的映射

##  Vite

- Vite 也是前端的构建工具
- 相较于 webpack，vite 采用了不同的运行方式：
  - 开发时，并不对代码打包，而是<strong style="color:#DD5415">直接采用 ESM（ESModule）的方式来运行项目</strong>
  - 在项目部署时，在对项目进行打包
  - 除了速度外，vite 使用起来也更加方便

### 基本使用

1. 安装开发依赖 vite

   ```bash
   yarn add -D vite
   ```

2. vite 的源码目录就是<strong style="color:#DD5415">项目根目录</strong>（不用创建src）

3. 开发命令：

   vite 启动**开发服务器**

   ```sh
   yarn vite
   ```

   vite build 打包代码

   ```sh
   yarn vite build
   ```

   vite preview **预览打包后代码**

   ```sh
   yarn vite preview
   ```

   `package.json`文件中构建脚本

   ```json
   "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
   }
   ```

   

### 搭建一个Vite项目

使用命令构建：

```sh
npm create vite@latest
yarn create vite
pnpm create vite
```

添加一个插件

```sh
npm add -D @vitejs/plugin-legacy
```

配置文件：`vite.config.js`

vite的配置文件使用的ES6的模块化规范

```js
import { defineConfig } from "vite"		// 编写有提示
import legacy from "@vitejs/plugin-legacy"	// 相当于babel

export default defineConfig({
    plugins: [
        legacy({
            targets: ["defaults"]	// 配置兼容性
        })
    ]
})
```

# Webpack5

[官方文档](https://webpack.docschina.org/)

# Webpack 基础

Webpack 本身功能是有限的:

- 开发模式：仅能编译 JS 中的 `ES Module` 语法
- 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

## 基本使用

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

## 基本配置

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

## 修改配置文件

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

## 处理样式资源

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

## 处理图片资源

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

## 修改打包路径

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

## 自动清空上次打包资源

```js
output: {
    clean: true, // 自动将上次打包目录资源清空
}
```

## 处理字体图标资源

## 处理其他资源

## 处理 js 资源

### Eslint

可组装的 JavaScript 和 JSX 检查工具。

这句话意思就是：它是用来检测 js 和 jsx 语法的工具，可以配置各项功能

我们使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查

### Babel

JavaScript 编译器。<strong style="color:#DD5415">可以将新的 js 语法转换为旧的 js，以提高代码的兼容性</strong>。

主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

babel 解决 js 兼容

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

## 处理 HTML 文件

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

## 开发服务器&自动化

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

## 生产模式介绍

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

## CSS 处理

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

## HTML 压缩

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

# Webpack 高级

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

# Webpack 项目

