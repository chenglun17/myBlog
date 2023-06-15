# path 模块

path 模块是 Node.js 官方提供的、用来处理路径的模块。

如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它

```javascript
const path = require('path')
```

提供一系列的方法和属性，用来满足对路径的处理需求：

| API                 | 说明                     |
| ------------------- | ------------------------ |
| **path.resolve**    | **拼接规范的绝对路径**   |
| path.join(...paths) | 可以把多个路径片段拼接   |
| path.sep            | 获取操作系统的路径分隔符 |
| path.parse          | 解析路径并返回对象       |
| path.basename       | 获取路径的基础名称       |
| path.dirname        | 获取路径的目录名         |
| path.extname        | 获得路径的扩展名         |



