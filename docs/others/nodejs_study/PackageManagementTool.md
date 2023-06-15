# 包管理工具

## :star:包的介绍

**包** 英文单词是 **package**，代表了一组特定功能的源码集合

常用的包管理工具：

- [npm](http://www.npmjs.com)
- [yarn](https://yarnpkg.com/)
- cnpm

## :star:npm

npm 全称 **Node Pakcage Manager**，即 Node 的包管理工具

npm 是 node.js 官方内置的包管理工具

npm 安装  --  node.js 在安装时会自动安装 npm

### 初始化

创建一个空目录，然后以此目录为工作目录 **启动命令行工具**，执行

```bash
npm init
```

`npm init` 命令的作用是将文件夹初始化为一个包，**交互式创建 package.json 文件**

**package.json** 是包的配置文件，每个包都必须要有 **package.json**，如下

```json
{
"name": "test",		#包的名字
"version": "1.0.0",	#包的版本
"description": "",	#包的描述
"main": "index.js",	#包的入口文件
"scripts": {		    #脚本设置
 "test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",			#作者
"license": "ISC",		#开源证书
"dependencies": {		#依赖
 "art-template": "^4.13.2",
 "jquery": "^3.6.0",
 "moment": "^2.29.1"
}
}
```

注意：

- package 的包名不能使用中文、大写，默认值是 **文件夹的名称**
- version（版本号）要求 **x.x.x** 的形式，x 必须是数字，默认值为 **1.0.0**
- package.json 可以手动创建和修改
- 使用 `npm init - y` 或 `npm init -yes` 快速创建

但不建议不要手动修改 node_modules 或 package-lock.json文件中的任何代码，npm 包管理工具会自动维护它们



### 搜索包

命令行 `npm s / search 关键字`

### 查看镜像源

```shell
npm get registry
```



### 下载安装包

命令行 `npm i / install <包名>`，运行之后文件夹下会增加两个资源

全局安装 `npm i -g <包名>`

安装指定版本的包 `npm i <包名@版本号>`

可以运行 `npm install / npm i`一次性安装所有的依赖包

- **node_modules** 文件夹，用来存放下载的包，require() 导入第三方包时，从这个目录中查找并加载
- **package-lock.json** 文件，用来锁定包的版本，配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等

注意：不要手动修改 node_modules 或 package-lock.json文件中的任何代码，npm 包管理工具会自动维护它们

> 例如，安装 nuiq 之后，uniq就是当前这个包的一个 **依赖包**，简称 **依赖**
>
> 比如我们创建一个包的名字为A，A中安装了包名字是B，我们就说 **B是A的一个依赖包**，也会说 **A依赖B**

### 删除包

局部删除 `npm r / remove uniq`

全局删除 `npm remove -g nodemon`

`npm uninstall <包名>`



### require导入npm包

require 导入 npm 包的基本流程：

- 在当前文件夹下 node_modules 中寻找同名的文件夹
- 在上一级目录下的 node_modules 中寻找同名的文件夹，直至找到磁盘根目录



### 生产依赖&开发依赖

我们可以在安装时设置选项来区分依赖的类型，目前分为两类：

| 类型     | 命令                                               | 说明                                                         |
| -------- | -------------------------------------------------- | ------------------------------------------------------------ |
| 生产依赖 | `npm i -S <包名>`或<br> `npm i --save <包名>`      | -S 等效于 --save，-S是默认选项<br>包信息保存在package.json中的 **dependencies 属性** |
| 开发依赖 | `npm i -D <包名>`或<br/> `npm i --save-dev <包名>` | -D（development）等效于 --save-dev，<br/>包信息保存在package.json中的 **devDependencies 属性** |

**开发依赖** 只在开发阶段使用，而 **生产依赖** 是开发阶段和最终上线运行阶段都用到的依赖包

## :star:cnpm

### 介绍

cnpm 是一个淘宝构建的`npmjs.com`的完整镜像，也称为『[淘宝镜像](https://npmmirror.com/)』，cnpm 服务部署在国内 阿里云服务器上，可以提高包的下载速度

官方也提供了一个全局工具包 `cnpm` ，操作命令与 npm 大体相同

我们可以通过 npm 来安装 cnpm 工具

 ```shell
 npm install -g cnpm --registry=https://registry.npmmirror.com
 ```

###  npm 配置淘宝镜像

用 npm 也可以使用淘宝镜像，配置的方式有两种

**1. 直接配置**

执行如下命令即可完成配置

```shell
npm config set registry https://registry.npm.taobao.org
```

切换为官方镜像源

```shell
npm config set registry https://registry.npmjs.org 
```

查看镜像源

```shell
npm get registry
```



**2. 工具配置**

使用 `nrm` 配置 npm 的镜像地址 `npm registry manager`

> nrm (npm registry manager ) 是 npm 的镜像源管理工具

1. 安装 nrm

   ```shell
   npm i -g nrm
   ```

2. 修改镜像

   ```shell
   nrm use taobao
   ```

3. 检查是否配置成功（选做）

   ```shell
   npm config list
   ```

   检查 registry 地址是否为 [https://registry.npmmirror.com/](https://gitee.com/link?target=https%3A%2F%2Fregistry.npmmirror.com%2F) , 如果是则表明成功

补充说明：

- **建议使用第二种方式进行镜像配置，因为后续修改起来会比较方便**
- 虽然 cnpm 可以提高速度，但是 npm 也可以通过淘宝镜像进行加速，所以 npm 的使用率还是高于 cnpm

## :star:yarn

###  yarn 介绍

yarn 是由 Facebook 在 2016 年推出的新的 Javascript 包管理工具

### yarn 特点

yarn 官方宣称的一些特点

- 速度超快：yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快
- 超级安全：在执行代码之前，yarn 会通过算法校验每个安装包的完整性
- 超级可靠：使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异工作

### yarn 安装

我们可以使用 npm 安装 yarn

```shell
npm i -g yarn
```

### yarn 常用命令

| 功能         | 命令                                                         |
| ------------ | ------------------------------------------------------------ |
| 初始化       | **`yarn init`** 或 **`yarn init -y`**                        |
| 安装包       | **`yarn add <包名>`** 生产依赖<br>**`yarn add <包名> --dev/-D`** 开发依赖<br>**`yarn global add <包名>`** 全局安装 |
| 删除包       | **`yarn remove <包名>`** 删除项目依赖包<br>**`yarn global remove <包名>`** 全局删除包 |
| 安装项目依赖 | **`yarn`**                                                   |
| 运行命令     | **`yarn <项目名>`**  # 不需要添加 `run`                      |

思考题：

这里有个小问题就是 全局安装的包不可用，yarn 全局安装包的位置可以通过`yarn global bin`来查看，

那你有没有办法使 yarn 全局安装的包能够正常运行？

- 配置 path 环境

### yarn 配置淘宝镜像

可以通过如下命令配置淘宝镜像

```shell
# 更换淘宝镜像
yarn config set registry http://registry.npm.taobao.org/
# 换成原来的，'https://registry.npmmirror.com/'
yarn config set registry http://registry.npmjs.org/
```

可以通过 `yarn config list` 查看 yarn 的配置项

```shell
yarn config get registry  // 默认：https://registry.yarnpkg.com
```





## :star:nvm

nvm 全称 **Node Version Manager** 顾名思义它是用来 **管理 node 版本的工具**，方便切换不同版本的 Node.js

nvm 的使用非常的简单，跟 npm 的使用方法类似

### 下载安装

首先先下载 nvm，下载地址 [https://github.com/coreybutler/nvm-windows/releases](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows%2Freleases) ，

选择 `nvm-setup.exe` 下载即可（网络异常的小朋友可以在资料文件夹中获取）

### 常用命令

| 命令                  | 说明                            |
| --------------------- | ------------------------------- |
| nvm list available    | 显示所有可以下载的 Node.js 版本 |
| nvm list              | 显示已安装的版本                |
| nvm install 18.12.1   | 安装 18.12.1 版本的 Node.js     |
| nvm install latest    | 安装最新版的 Node.js            |
| nvm uninstall 18.12.1 | 删除某个版本的 Node.js          |
| nvm use 18.12.1       | 切换 18.12.1 的 Node.js         |



