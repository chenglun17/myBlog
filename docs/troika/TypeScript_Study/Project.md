# TypeScript 工程

## 自动编译

**自动编译文件：**

```bash
tsc hello.ts -w
```

使用 -w 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

**自动编译整个项目：**

- 首先，在根目录下创建一个 TS 的配置文件`tsconfig.json`
- 执行`tsc`命令即可完成对整个项目的编译

```bash
tsc -init

# Created a new tsconfig.json with:                                                                                 
#   target: es2016
#   module: commonjs
#   strict: true
#   esModuleInterop: true
#   skipLibCheck: true
#   forceConsistentCasingInFileNames: true

# You can learn more at https://aka.ms/tsconfig
```

执行`tsc`命令

```bash
tsc -w
```



## 配置文件

### include

用来指定哪些ts文件需要被编译的

```json
"include": [
    "./src/**/*",
],
```

- `**`：任意目录
- `*`：任意文件

### exclude

排除不想编译的文件

- 默认值：`[ "node_modules", "bower_components", "jspm_packages" ]`

```json
"exclude": [
    "./src/hello/**/*",
],
```

### extends

定位被继承的配置文件

- 不想重复写配置文件内容时，根据文件名，继承该文件的内容

```json
// 当前配置文件中会自动包含config目录下base.json中的所有配置信息
"extends": "./src/base",
```

### files

指定要编译的文件，需要编译的文件很少时才会用到，与include类似

```json
"files": [
    "app.ts",
    "index.ts",
    "./src/app.ts"
],
```

### compilerOptions

配置选项是配置文件中非常重要的，也是比较复杂的配置选项。

在`compilerOptions`中包含很多子选项，用来完成对编译的配置。



## 编译选项

TypeScript 提供了非常多的编译选项，但是官方文档对每一项的解释很抽象，这一章会详细介绍每一个选项的作用，并给出对应的示例。

```json
{
    "compilerOptions": {
        // 用来指定ts被编译的ES的版本
        "target": "es2016",
        // 用来指定项目中要使用的库（宿主环境），默认不需要设置
        // "lib": [],
        
        // 用来指定要使用的模块化的规范
        // 可选值：CommonJS、UMD、AMD、System、ES2020、ESNext、None
        "module": "commonjs",
        
        // 是否对js文件进行编译，，默认为false
        "allowJs": true,
        // 是否坚持js代码是否符合语法规范，默认为false
        "checkJs": true,
        
        // 用来指定编译后文件所在的目录
        "outDir": "./dist",
        // 用来将代码合并为一个文件，将全局作用域中的代码合并到同一个文件中
        "outFile": "./dist/app.js",
        // 是否在编译后移除注释，默认为false
        "removeComments": true,
        // 不生成编译后的文件，默认为false
        "noEmit": true,
        // 当有错误时，不生成编译后的文件
        "noEmitOnError": true,
        
        // 严格检查总开关
        "strict": true,
        // 不允许使用隐式的any类型
        "noImplicitAny": true,
        // 严格的检查空值
        "strictNullChecks": true,
        // 不允许不明确类型的this
        "noImplicitThis": true,
        // 用来设置编译后的文件是否使用严格模式
        "alwaysStrict": true,
    }
}
```



## webpack打包ts代码

初始化包描述文件`package.json`

```sh
npm init -y
```

安装开发依赖

```sh
npm i -D webpack webpack-cli typescript ts-loader
```

配置文件，在项目根目录下新建文件：`webpack.config.js`

```js
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin") // 引入插件

module.exports = {
    // 模式
    mode: "development",
    
    // 指定入口文件
    entry: './src/index.ts',

    // 出口
    output: {
        // 指定打包文件所在目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'main.js',
        clean: true, // 自动将上次打包目录资源清空
    },

    // 指定webpack打包时要使用的模块
    module: {
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: 'ts-loader',
                // 要排除的文件
                exclude: /node_modules/
            }
        ]
    },
    
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html")
        })
    ],

    // 用来设置引入模块，以这两个为扩展名的文件都可以作为模块使用
    resolve: {
        extensions: ['.ts', '.js']
    }
}
```

安装内置服务器

```sh
npm i -D webpack-dev-server
```

然后在包描述文件`package.json`配置

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open"
},
```

## babel

babel 就是一个工具，**可以将新的 js 语法转换为旧的 js，以提高代码的兼容性**。主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

```sh
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

