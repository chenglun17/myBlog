# ES6 新增

[参考文章](https://blog.csdn.net/qq_22182989/article/details/123811497)、[参考文章2](https://blog.csdn.net/aoxi9939/article/details/102038812)、[参考文章3](https://www.cnblogs.com/theblogs/p/10575845.html)

ECMAScript5，即ES5，是ECMAScript的第五次修订，于2009年完成标准化

ECMAScript6，即ES6，是ECMAScript的第六次修订，于2015年完成，也称ES2015

## 1. ES6 新增的一些特性

1. let 和 const 命令，用来声明变量，两个都有块级作用域。

2. 箭头函数，**`() => {}`**。

3. 模板字符串，**` 反引号`` `**，可以当作普通字符串使用，也可以用来定义多行字符串。用**`${}`**来界定。

4. 解构赋值，允许按照一定模式，从数组和对象中提取值，对变量进行赋值。

5. for of 循环，可以遍历数组、Set、Map结构、某些类似数组的对象、对象，以及字符串。

6. **`...`** 展开运算符，可以将数组或对象里面的值展开，还可以将多个值收集为一个变量。

7. 引入 module 模块的概念，import 导入、export 导出。

8. Set 数据结构，类似数组，但所有的数据都是唯一的，没有重复的值。它本身是一个构造函数。

9. 将 Promise 对象纳入规范，提供了原生的 Promise 对象，是异步编程的一种解决方案。

10. async、await 搭配 promise，可以通过编写类似同步的代码来处理异步流程, 提高代码的简洁性和可读性。

    async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

11. Proxy 代理，监听对象的操作，然后可以做一些相应事情。

12. Symbol，是一种基本类型。Symbol 通过调用 symbol 函数产生，它接收一个可选的名字参数，该函数返回的 symbol 是唯一的。

13. class 类的继承，ES6中不再像ES5一样使用原型链实现继承，而是引入Class这个概念。

14. 修饰器 @，decorator是一个函数，用来修改类、方法的行为。修饰器本质就是编译时执行的函数。

## 2. var、let、const 之间的区别

- `var` 是**全局变量**，存在变量提升过程，可以先使用在声明，可以**重复声明**
- 通过 `let` 和 `const` 关键字声明的变量也会提升，但是和 `var` 不同，它们不会被**初始化**。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。
- `let` 必须先声明再使用，而且<strong style="color:#DD5145">不能重复声明</strong>，但是可以重新赋值。
- `const` 声明之后必须赋值，否则会报错。
- `const` 定义的是常量，不能修改，但是如果定义的是对象，可以修改对象内部的数据。
- 通过 `let` 和 `const` 关键字声明的变量是拥有块级作用域（指的是任何在 { } 中的内容），就会形成封闭作用域。



## 3. ES6 如何转为 ES5

> 使用 babel 转码器，babel 是一个 ES6 转码器，可以将 ES6 代码转为 ES5 代码，以便兼容那些还没支持ES6的平台。

## 4. ES6 的导出导入模块

导出，通过 export 关键字

```js
// 默认暴露
export default {
    school: 'ATGUIGU',
    change: function(){
        console.log("我们可以改变你!!");
    }
}
```

导入，通过 import 关键字

```js
// 简便方式导入，只能用于 默认暴露
import sum from "./example.js"
// 只导入一个（解构赋值导入）
import {sum} from "./exportExample.js"
// 导入多个
import {sum, multiply, time} from "./exportExample.js"
// 导入一整个模块
import * as example from "./exportExample.js"
```



## 5. ES6 怎么写 class

ES6 的 class 可以看作是一个语法糖，它的绝大部分功能 ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法

```js
//定义类
class Point { 
    constructor(x,y) { 
        //构造方法
        this.x = x; //this关键字代表实例对象
        this.y = y; 
    } toString() {
        return '(' + this.x + ',' + this.y + ')'; 
    }
}
```

## 6. 使用箭头函数需要注意什么？

> 1. 使用了箭头函数，this 就不是指向 window，它只会在自己作用域的上一层继承 this（指向是可变的）。
>
> 2. 不能够使用 arguments 对象。取而代之使用的是 rest 参数（即剩余参数 **`...`**）解决。
>
> 3. 不能用作构造函数，即不能够使用 new 命令，否则会抛出一个错误。
>
> 4. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
>
> 5. 箭头函数没有 prototype

## 7. 数据结构 Set

ES6 提供了新的数据结构 **Set（集合）**，它类似于数组，但**成员的值都是唯一的**，集合实现了 iterator 接口，所以可以使用 **扩展运算符 ...** 和 **for...of** 进行遍历

属性和方法：

- `st.size`：返回集合个数
- `st.add(item)`：往集合中添加一个新元素 item，返回当前集合
- `st.delete(item)`：删除集合中的元素，返回 boolean 值
- `st.has(item)`：检测集合中是否包含某个元素，返回 boolean 值
- `st.clear()`：清空集合
- 集合转为数组：`[...st]`
- 合并两个集合：`[...st1, ...st2]`

## 8. 数据结构 Map

ES6 提供了 **Map** 数据结构。它类似于对象，也是键值对的集合。但是 “键” 的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 也实现了 iterator 接口，所以可以使用 **扩展运算符 ...** 和 **for...of** 进行遍历

Map 的属性和方法：（k 为键，v为值）：

- `size`：返回 Map 的元素（键值对）个数
- `set(k, v)`：增加一个键值对，返回当前 Map
- `get(k)`：返回键值对的键值
- `has()`：检测 Map 中是否包含某个元素
- `clear()`：清空集合，返回 undefined

## Set 和 Map 的区别？

Set 和 Map 都是 ES6 中新增的数据结构，是对当前 js 数组 和 对象这两种重要数据结构的扩展

Set 用于数据重组，Map 用于数据存储

> Set：ES6 引入的一种类似 Array 的新的数据结构
>
> 1. 元素不能重复
> 2. 只有键值没有键名，类似数组
> 3. 可以遍历，方法有add、delete、has

> Map：ES6 引入的一种类似 Object 的新的数据结构
>
> 1. 本质上是健值对的集合，类似集合
> 2. 可以遍历，可以跟各种数据格式转换

使用 Set 实现数组的过滤去重

```js
let arr = [12, 43, 23, 43, 68, 12]
let newArr = [...new Set(arr)]
console.log(newArr)   // [12, 43, 23, 68]
```



## 9. Symbol

JavaScript 的七种基本数据类型

- 值类型（基本类型）：string、number、boolean、undefined、null、symbol
- 引用数据类型：object（包括 array、function）

ES6 引入了一种新的原始数据类型 Symbol，表示**独一无二的值**。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型

**Symbol 的特点：**

- Symbol 的 **值是唯一的**，用来解决命名冲突的问题
- Symbol 值不能与其他数据进行运算
- Symbol 定义的对象属性**不能使用 for...in 循环遍历**，但是可以使用 `Reflect.ownKeys` 来获取对象的所有键名

**Symbol 的创建：**

- 使用 Symbol() 方法创建，名字相同的 Symbol 是不同的实体
- 使用 Symbol.for() 方法创建，名字相同的 Symbol 具有相同的实体
- 输出 Symbol 变量的描述，使用 **description** 属性

```js
// Symbol() 创建
let s = Symbol()
console.log(s, typeof s)	// Symbol() 'symbol'

let s2 = Symbol('chenglun17')
let s3 = Symbol('chenglun17')
console.log(s2 === s3)	// false

// Symbol.for 创建
let s4 = Symbol.for('chenglun17')
let s5 = Symbol.for('chenglun17')
console.log(s4 === s5)	// true

// 不能与其他数据进行运算
let result = s + 100
let result = s > 100
let result = s + s
console.log(result)		// Uncaught TypeError: Cannot convert a Symbol value to a number

let f = Symbol('测试');
console.log(f.description); // 测试
```

### 对象添加 Symbol 类型的属性

### Symbol 内置值



## forEach、for in、for of 三者区别

> - forEach 更多的用来遍历数组
> - for in 一般常用来遍历 对象 或 json
> - for of 数组、对象都可以遍历，遍历对象需要通过和 Object.keys()
> - for in 循环出的是 key，for of 循环出的是 value