# fs 模块

fs（file system），称为文件系统，是 Node.js 中的 内置模块，可以对计算机中的磁盘进行操作。

JavaScript 的是没有操作文件的能力，但是 Node 是可以做到的，Node 提供了操作文件系统模块。

- fs 模块中所有的操作都有两种形式可供选择：同步和异步
- 同步文件系统会阻塞程序的执行，除非操作完毕，否则不会向下执行代码
- 异步文件系统不会阻塞程序的执行，而是在操作完成时，通过**回调函数**将结果返回，然后可以立即向下执行代码
- 一般情况下我们使用的都是异步方式！比起同步，异步方法性能更高，速度更快，而且没有阻塞。



## :star:打开文件

```js
fs.open(path, flags[, mode], callback)
```

- `path`：文件的路径
- `flags`：文件打开的行为。具体值详见下方表格
- `mode`：设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)
- `callback`：回调函数，带有两个参数如：`callback(err, fd)`

| 打开模式(flags) | 说明                                                   |
| --------------- | ------------------------------------------------------ |
| r               | 以读取模式打开文件。如果文件不存在抛出异常。           |
| r+              | 以读写模式打开文件。如果文件不存在抛出异常。           |
| rs              | 以同步的方式读取文件。                                 |
| rs+             | 以同步的方式读取和写入文件。                           |
| w               | 以写入模式打开文件，如果文件不存在则创建。             |
| wx              | 类似 ‘w’，但是如果文件路径存在，则文件写入失败。       |
| w+              | 以读写模式打开文件，如果文件不存在则创建。             |
| wx+             | 类似 ‘w+’， 但是如果文件路径存在，则文件读写失败。     |
| a               | 以追加模式打开文件，如果文件不存在则创建。             |
| ax              | 类似 ‘a’， 但是如果文件路径存在，则文件追加失败。      |
| a+              | 以读取追加模式打开文件，如果文件不存在则创建。         |
| ax+             | 类似 ‘a+’， 但是如果文件路径存在，则文件读取追加失败。 |



## :star:获取文件信息

在 Node.js 中，我们使用 **stat** 或 **statSync** 来查看资源的详细信息

```js
fs.stat(path[, options], callback)
fs.statSync(path[, options])
```

参数说明：

- path：文件路径
- options：选项设置（可选）
- callback：回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象



## 1.:star:文件写入

| 方法                                    | 说明         |
| --------------------------------------- | ------------ |
| [writeFile](#writefile)                 | **异步**写入 |
| [writeFileSync](#writefilesync)         | 同步写入     |
| [appendFile](#appendfile)               | **异步**追加 |
| [appendFileSync](#appendfilesync)       | 同步追加     |
| [createWriteStream](#createwritestream) | 流式写入     |



#### writeFile

writeFile 直接打开文件默认是 **w** 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。

```js
fs.writeFile(file, data[, options], callback)
```

- file：要写入的文件名、文件路径，或文件描述符
- data：要写入的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
- options：选项设置（可选），包含 encoding, mode, flag；若是字符串则指定编码格式
- callback：回调函数



#### writeFileSync

```js
fs.writeFileSync(file, data[, options])
```

参数与 fs.writeFile 大体一致，只是没有 callback 参数

Node.js 中的磁盘操作时由其他 **线程** 完成的，结果的处理有两种模式：

- **同步处理** JavaScript 主线程 **会等待** 其他线程的执行结果，然后再继续执行主线程代码，**效率较低**
- **异步处理** JavaScript 主线程 **不会等待** 其他线程的执行结果，直接执行后续的主线程代码，**效率较高**



#### appendFile

appendFile 作用是在文件尾部追加内容，appendFile 语法与 writeFile 语法完成相同

```js
fs.appendFile(file, data[, options], callback)
```

- `path`支持字符串、Buffer和URL类型
- `data`为要追加的数据，可以是字符串或Buffer实例
- `options`为配置对象，包含三个参数：
  - encoding，编码方式，默认为`utf8`
  - mode，模式，默认为`0o666`。该参数为文件的权限描述，`0o666`表示为每个用户拥有读写权限
  - flag，文件操作方式，默认为`a`，即追加



#### appendFileSync

```js
fs.appendFileSync(file, data[, options])
```

参数与 fs.appendFile 大体一致，只是没有 callback 参数



#### createWriteStream

程序打开一个文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数。

流式写入方式适用于 **大文件写入或频繁写入** 的场景，writeFile 适用于 **写入频率较低的场景**。

```js
fs.createWriteStream (path, [, options])
```

参数说明：

- path：文件路径
- options：选项设置（可选）

返回值：Object







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



## :star:路径是否存在

```js
fs.exists(path, callback)
fs.existsSync(path)
```





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



## 参考

[参考文章](https://blog.csdn.net/m0_52040370/article/details/126470349)