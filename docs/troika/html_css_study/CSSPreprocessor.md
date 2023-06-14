# CSS预处理器

CSS作为一种样式语言，本身用来给HTML元素添加样式。

Sass / Scss：

- 2007年诞生，最早也是最成熟的CSS预处理器，拥有ruby社区的支持，是属于Haml（一种模板系统）的一部分。
- 目前受Less影响，已经进化到了全面兼容CSS的SCSS

Less：

- 2009年诞生，受SASS的影响较大，但又使用CSS的语法，容易上手，但相比SASS，编程功能不够。
- Twitter Bootstrap 就是采用Less作为底层语言，也包括React的UI框架AntDesign

Stylus：

- 2010年诞生，来自Node.js社区，主要用于Node项目进行CSS预处理支持
- 语法偏向与Python，使用率相对于 Sass / Less 少很多



## Less

Less（Leaner Style Sheets）是一门CSS扩展语言，并且兼容CSS

[官方文档](https://less.nodejs.cn/)介绍：`it's CSS, with just a little more`

- Less增加了很多相比于CSS更好用的特性
- 比如，定义变量、混入、嵌套、计算等等
- Less最终需要被编译成CSS运行于浏览器中（包括部署到服务器中）
- 扩展名改成`.less`

如何将Less代码编译成CSS代码呢？

- 方式一：下载Node环境，通过npm包管理器下载 less 工具进行代码编译

  后续会使用webpack进行打包，自动完成这些操作

- 方式二：VSCode 插件 Easy LESS 或 在线编译

  https://lesscss.org/less-preview/

- 方式三：引入 [CDN](https://cdn.jsdelivr.net/npm/less@4) 的 less 编译代码，对 less 进行实时处理

  ```html
  <link rel="stylesheet/less" href="./less的使用.less">
  <script src="https://cdn.jsdelivr.net/npm/less@4"></script>
  ```

- 方式四：将 less 编译的 js 代码下载到本地，执行 js 代码对 less 进行编译

### 变量（Variables）

- `@变量名: 变量值;`

### 嵌套（Nesting）

特殊符号：`&`表示当前选择器的父级

```less
a.link {
    color: blue;
    
    &:hover {
        color: red;
    }
}

<a class="link" href="#">我是超链接</a>
```

### 运算（Operations）

在Less中，算术运算符 +、-、*、/ 可以对任何数字、颜色或变量进行运算

- 算术运算符在加、减或比较之前会进行**单位换算**，计算的结果**以最左侧操作数的单位类型**为准
- 如果单位换算无效或失去意义，则忽略单位

### 混入（Mixins）

可以将这些代码进行抽取到一个独立的地方，任何选择器都可以进行复用

<strong style="color:#DD5145">混入（minxins）</strong>是一种将一组属性从一个规则集（或混入）到另一个规则集的方法。

注意：混入在没有参数的情况下，小括号可以省略，但不建议这样使用。

```less
// 1.1 混入
.nowrap_ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

// 1.2 混入可以传递参数
.box_border(@borderWidth: 5px, @borderColor: #999) {
    border: @borderWidth solid @borderColor;
}

// 1.3 混入和映射(map)结合使用（弥补 less 中不能自定义函数的缺陷）
.box_size {
    width: 100px;
    height: 100px;
}

.box1 {
    width: .box_size()[width];
    background-color: orange;

    .nowrap_ellipsis();
    .box_border();
}

.box2 {
    width: 150px;
    background-color: aqua;

    .nowrap_ellipsis();
    .box_border(10px, pink);
}
```



### 继承（extend）

和mixins作用类似，用于代码复用

和mixins相比，<strong style="color:#DD5145">继承代码最终会转换为并集选择器</strong>

```less
.box_border {
    border: 5px solid #999;
}

.box {
    width: 100px;
    background-color: orange;
    &:extend(.box_border);
}
```

编译为CSS后：

```css
/* 并集选择器 */
.box_border,
.box {
    border: 5px solid #999;
}
.box {
    width: 100px;
    background-color: orange;
}
```

而混入（推荐使用）

```less
.box_border {
    border: 5px solid #999;
}

.box {
    width: 100px;
    background-color: orange;
    .box_border();
}
```

编译为CSS后：

```css
.box_border {
    border: 5px solid #999;
}
.box {
    width: 100px;
    background-color: orange;
    /* 代码直接插入 */
    border: 5px solid #999;
}
```



### Less 内置函数

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等等

内置函数手册：https://less.bootcss.com/functions/



### 作用域（scope）

在查找一个变量时，首先在**本地作用域**查找变量和混入

如果找不到，则从**父级作用域**继承



### 导入（import）

导入的方式和CSS的用于是一致的

导入一个 `.less`文件，此文件中的所有变量就可以全部使用了

如果导入的文件不是 `.less`扩展名，则可以省略扩展名