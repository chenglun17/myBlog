# fs 模块

fs（file system），称为文件系统，是 Node.js 中的 内置模块，可以对计算机中的磁盘进行操作。

## 1.:star:文件写入

| 方法                        | 说明     |
| --------------------------- | -------- |
| writeFile                   | 异步写入 |
| writeFileSync               | 同步写入 |
| appendFile / appendFileSync | 追加写入 |
| createWriteStream           | 流式写入 |

### writeFile 异步写入

```js
// 语法
fs.writeFile(file, data[, options], callback)
```

参数说明：

- file：文件名
- data：待写入的数据
- options：选项设置（可选）
- callback：回调函数

返回值：undefined

### writeFileSync 同步写入

```js
// 语法
fs.writeFileSync(file, data[, options])
```

参数与 fs.writeFile 大体一致，只是没有 callback 参数，返回值：undefined

Node.js 中的磁盘操作时由其他 **线程** 完成的，结果的处理有两种模式：

- **同步处理** JavaScript 主线程 **会等待** 其他线程的执行结果，然后再继续执行主线程代码，**效率较低**
- **异步处理** JavaScript 主线程 **不会等待** 其他线程的执行结果，直接执行后续的主线程代码，**效率较高**



### appendFile / appendFileSync 追加写入

appendFile 作用是在文件尾部追加内容，appendFile 语法与 writeFile 语法完成相同

```js
// 语法
fs.appendFile(file, data[, options], callback)
fs.appendFileSync(file, data[, options])
```

参数与 fs.writeFile 大体一致，返回值：二者都为 undefined

### createWriteStream 流式写入

```js
// 语法
fs.createWriteStream (path, [, options])
```

参数说明：

- path：文件路径
- options：选项设置（可选）

返回值：Object

程序打开一个文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数

流式写入方式适用于 **大文件写入或频繁写入** 的场景，writeFile 适用于 **写入频率较低的场景**



### 写入文件的场景

- 当 **需要持久化保存数据** 的时候，应该想到文件写入



## 2.:star:文件读取

| 方法             | 说明     |
| ---------------- | -------- |
| readFile         | 异步读取 |
| readFileSync     | 同步读取 |
| createReadStream | 流式读取 |

### readFile 异步读取

```js
// 语法
fs.readFile(path, [, options], callback)
```

参数说明：

- path：文件路径
- options：选项设置（可选）
- callback：回调函数

返回值：undefined

### readFileSync 同步读取

```js
// 语法
fs.readFileSync(path[, options])
```

参数与 fs.readFile 大体一致，只是没有 callback 参数，返回值：**string | Buffer**

### createReadStream 流式读取

```js
// 语法
fs.createReadStream(path[, options])
```

参数与 fs.readFile 大体一致，只是没有 callback 参数，返回值：**Object**

### 读取文件应用场景

> 电脑开机、程序运行、编辑器打开文件、查看图片、播放视频....



## 3.:star:文件移动与重命名

在 Node.js 中，我们使用 **rename** 或 **renameSync** 来移动或重命名 **文件 或 文件夹**

```js
// 语法
fs.rename(oldPath, newPath, callback)
fs.renameSync(oldPath, newPath)
```

参数说明：

- oldPath：文件当前路径
- newPath：文件新的路径
- callback：回调函数



## 4.:star:文件删除

在 Node.js 中，我们使用 **unlink** 或 **unlinkSync** 来删除文件

```js
// 语法
fs.unlink(path, callback)
fs.unlinkSync(path)
```

参数说明：

- path：文件路径
- callback：回调函数



## 5.:star:文件夹操作

| 方法                  | 说明       |
| --------------------- | ---------- |
| mkdir / mkdirSync     | 创建文件夹 |
| readdir / readdirSync | 读取文件夹 |
| rmdir / rmdirSync     | 删除文件夹 |

### mkdir 创建文件夹

```js
// 语法
fs.mkdir(path[, options], callback)
fs.mkdirSync(path, [, options])
```

参数说明：

- path：文件夹路径
- options：选项设置（可选）
- callback：回调函数



### readdir 读取文件夹

```js
// 语法
fs.readdir(path[, options], callback)
fs.readdirSync(path, [, options])
```

参数与 fs.mkdir 大体一致

### rmdir 删除文件夹

```js
// 语法
fs.rmdir(path[, options], callback)
fs.rmdirSync(path[, options])
```

参数与 fs.mkdir 大体一致



## 6.:star:查看资源状态

在 Node.js 中，我们使用 **stat** 或 **statSync** 来查看资源的详细信息

```js
// 语法
fs.stat(path[, options], callback)
fs.statSync(path[, options])
```

参数说明：

- path：文件路径
- options：选项设置（可选）
- callback：回调函数



## 7.:star:相对路径问题

相对路径：

- **./座右铭.txt** 当前目录下的座右铭.txt
- **座右铭.txt** 等效于上面的写法
- **../座右铭.txt** 当前目录的上一级目录中的座右铭.txt

绝对路径：

- **D:/Program Files** windows系统下的绝对路径
- **/usr/bin** Linux系统下的绝对路径

注意：相对路径中所谓的 **当前目录**，指的是 **命令行的工作目录**，而并非是文件的所在目录

## 8.:star:\__dirname

- **\__dirname** 与 **require** 类似，都是 Node.js 环境中的 **全局变量**

- **\__dirname** 保存着 **当前文件** 所在目录的 **绝对路径**，可以使用 \__diname 与文件名拼接成绝对路径