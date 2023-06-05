# JavaScript 基础

## :star:字面量

字面量（literal）是在计算机中描述事或物。

- **数字（Number）字面量** 可以是整数或者是小数，或者是科学计数(e)：

```js
3.14
101
123e5
```

- **字符串（String）字面量** 可以使用单引号或双引号:

```js
"chenglun17"
'chenlun17'
```

- **表达式字面量** 用于计算：

```js
5 + 6
```

- **数组（Array）字面量** 定义一个数组：

```js
[40, 100, 1, 5, 25, 10]
```

> 声明了一个空数组，里面没有内容，let arr = [ ]，则输出的话是**undefined**

- **对象（Object）字面量** 定义一个对象：

```js
{ firstName: "Bruce", lastName: "Lee", age: 32 }
```

- **函数（Function）字面量** 定义一个函数：

```js
function myFunction(a, b) { return a * b;}
```



## :star:数据类型

JavaScript 中有 7 种数据类型：

- 数字（Number）, 字符串（String）, 布尔值（Boolean）, 未定义（Undefined）, 空（Null）, 对象（Object）, Symbol。

> **Symbol** 是 ES6 引入了一种新的原始数据类型，表示独一无二的值。
>
> **null**：表示赋值了，但内容为空，**undefined**：表示没有赋值。

**基本数据类型（原始数据类型）**：String、Number、Boolean、Null、Undefined、Symbol。（6种）

- 存储在<strong style="color:#DD5145">栈（stack）</strong>中的简单数据段，占据空间小，大小固定，属于被频繁使用的数据，所以存储在栈中。

**引用数据类型**（对象类型）：Object，包含 数组（Array）、函数（Function）、正则（RegExp） 和 日期（Date）等。

- 存储在<strong style="color:#DD5145">堆（heap）</strong>中的对象，占据空间大，大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后，从堆中获得实体。

JavaScript 拥有动态类型，这意味着相同的变量可用作不同的类型。



## :star:类型转换

### Boolean 转换

只有 7 种 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 值：`''`(空字符串)、`0`、`-0`、`undefined`、`null`、`false`、`NaN`。

`Function`构造函数，比如 `new Number`，任何对象、`[]`(空数组)，字符串`"false"`，都是 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。



### 隐式转换

- <strong style="color:#DD5145">任何数据 + 字符串 结果都为字符串</strong>
- 减法 -（像大多数数学运算一样）只能用与数字，它会使空字符串 " " 转换为 0
- `null` 经过数字转换之后会变成 0
- `""` (空串) 经过数字转换之后会变成 0
- `undefined` 经过数字转换之后会变成 `NaN`
- **+** 号为正号解析可以转换成数字型



### 显示转换

- Number() 字符串内容里有非数字得到 NaN
- parseInt()
- parseFloat()
- String()
- 变量.toString(进制)



## :star:运算符

### 1.赋值运算符

### 2.一元运算符

### 3.比较运算符

### 4.逻辑运算符

**逻辑中断**：js 利用逻辑运算符 **&&** 和 **||** 代替 if else 写判断语句

```javascript
console.log(11 && 22)		// 22
console.log(0 && 22)		// 0
console.log(false && 33)	// false
console.log(true && 33)		// 33

console.log(33 || 44)		// 33
console.log(0 || 55)		// 55
console.log(false || 66)	// 66
console.log(true || 66)		// true
```

- **a && b** **一假则假**，左边为 false 就短路

  **&& 前面是 true**，无论 && 后面是 true 还是false，结果都将**返回 && 后面的值**。

  && 前面是 false，无论 && 后面是 true 还是 false，结果都将返回去 && 前面的值。

- **a || b** **一真则真**，左边为 true 就短路

  **|| 前面为 true**，无论 || 后面是 true 还是 false，结果都将**返回 || 前面的值**。

  || 前面为 false，无论 || 后面是 true 还是 false，结果都将返回 || 后面的值。

### 5.运算符优先级

| 优先级 | 运算符     | 顺序            |
| ------ | ---------- | --------------- |
| 1      | 小括号     | ()              |
| 2      | 一元运算符 | ++、--、!       |
| 3      | 算数运算符 | 先 * / % 后 + - |
| 4      | 关系运算符 | > >= < <=       |
| 5      | 相等运算符 | \== != \=== !== |
| 6      | 逻辑运算符 | 先 && 后 \| \|  |
| 7      | 赋值运算符 | =               |
| 8      | 逗号运算符 | ,               |



### 6.比较运算符

**基本类型**通过它们的**值（value）**进行比较，而**对象**通过它们的**引用（reference）**进行比较。JavaScript 检查对象是否具有对内存中相同位置的引用。

#### 等于操作符（==）

等于操作符（==）在比较中会**先进行类型转换**，再确定操作数是否相等，如果操作数相等，则会返回 `true`。

- 如果任一操作数是布尔值，则将其转换为数值再比较是否相等

```js
let result1 = (true == 1); // true
```

- `null`和`undefined`相等

```js
let result1 = (null == undefined ) // true
```

- 如果有任一操作数是 `NaN` ，则相等操作符返回 `false`

```js
let result1 = (NaN == NaN ) // false
```

- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回`true`

```js
let obj1 = { name:"xxx" }
let obj2 = { name:"xxx" }
let result1 = (obj1 == obj2 ) // false
```

> 两个都为引用类型，则比较它们是否指向同一个对象

#### 全等操作符（===）

全等操作符，只有两个操作数在**不转换类型**的前提下相等才返回 `true`。即**类型相同，值也需相同**。

```js
let result1 = ("55" === 55) // false，不相等，因为数据类型不同
let result2 = (55 === 55) // true，相等，因为数据类型相同值也相同
```

- `undefined` 和 `null` 与自身严格相等

```js
let result1 = (null === null)  // true
let result2 = (undefined === undefined)  // true
```



## :star:语句

### 条件语句

在 JavaScript 中，我们可使用以下条件语句：

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码
- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **if...else if....else 语句** - 使用该语句来选择多个代码块之一来执行
- **switch 语句** - 使用该语句来选择多个代码块之一来执行



### switch 语句

- switch case 语句一般用于等值判断，不适合区间判断
- switch case 一般需要配合 break 关键字使用，没有 break 会造成 **case 穿透**

语法：

```js
switch(n)
{
    case 1:
        执行代码块 1
        break;
    case 2:
        执行代码块 2
        break;
    default:
        与 case 1 和 case 2 不同时执行的代码
}
```



### 循环语句

- `while(true)` 来构造"无限循环"，需要使用 break 退出循环
- `for(; ;)` 也可以来构造 "无限循环"，同样需要使用 break 退出循环

####  for 循环

#### while 循环

#### do / while 循环

do / while 循环是 while 循环的变体。该循环会在检查条件是否为真之前执行一次代码块，然后如果条件为真的话，就会重复这个循环。

语法：

```js
do
{
    需要执行的代码
}
while (条件);
```



## :star:对象

对象是一种数据类型，一种无序的数据的集合，可以详细的描述某个事物。

JavaScript 中的对象分为3种：**自定义对象**、**内置对象**、**浏览器对象**

前面两种对象是 JS 基础内容，属于 ECMAScript；第三个浏览器对象属于 JavaScript 独有的（Web API 讲解）。

- 内置对象：JS 语言自带的一些对象，供开发者使用，并提供一些常用的或是最基本而非必要的功能（属性和方法）
- 内置对象最大的优点就是可以帮助快速开发
- JavaScript 提供多个内置对象：Math、Date、Array、String 等

### 1.创建对象

1. 利用 <strong style="color:#DD5145">对象字面量</strong> 创建对象

```javascript
const obj = {
    uname: 'pink老师',
    age: 18
}
```

2. 利用 <strong style="color:#DD5145">new Object</strong> 创建对象

```javascript
cosnt obj = new Object({
    uname: 'pink老师',
    age: 18
})
obj.age = 18
```

3. 利用 <strong style="color:#DD5145">构造函数</strong> 创建对象

   详细见后续章节 ***深入对象***



### 2.访问对象

对象由属性（静态）和方法（即函数，动态）组成。对象里面可以存储任何数据类型。

<strong style="color:#DD5145">注意</strong>：在 JavaScript 中，所有对象的 keys 都是 **字符串**（除非对象是 Symbol）。尽管我们可能不会定义它们为字符串，但它们在底层总会被转换为字符串。

当我们使用括号语法时（`[]`），JavaScript 会解释语句。它首先看到第一个开始括号 `[` 并继续前进直到找到结束括号 `]`。只有这样，它才会计算语句的值。

```javascript
// 方法一：
对象名.属性名 === 对象名['属性名']
// 访问对象的方法的时候，只能用.访问
对象名.方法

// 方法二：属性名是动态，属性名可为字符串，一定要加引号
对象名['属性名']
// 如果是变量是不需要加引号的
对象名[变量名]
```

- 使用<strong style="color:#DD5145">点语法</strong>访问属性：**`object.property === object['property']`**
- 使用<strong style="color:#DD5145">括号语法</strong>访问属性：**`object[property]`**，如果是变量则不需要加引号
- 对象解构：**`const { property } = object`**



### 3.遍历对象

```js
let obj = {
    uname: 'chenglun17',
    age: 18,
    gender: '男',
    speak: function () {
 			document.write('我喜欢跑步！')
    }
}
// 遍历对象用 for in循环
for (let k in obj) {
    console.log(k)	// k 是获得对象的 属性名，属性名 'uname'，'age'
    console.log(obj[k])	// 	对象名[k] 是获得 属性值
    
    console.log(obj.k)	// 报错undefined，等价于obj.'uname'
}
// 调用方法
obj.speak()
```

### 4.对象转换为字符串

```js
String( {} )		// 返回 '[object Object]'
String( {a: 1} )	// 返回 '[object Object]'
String( {a: '1'} )	// 返回 '[object Object]'
```

<strong style="color:tomato">注意</strong>：在 JavaScript 中，所有对象的 keys 都是 **字符串**（除非对象是 Symbol）。尽管我们可能不会定义它们为字符串，但它们在底层总会被转换为字符串。



## :star:数组对象

### 1.创建数组

两种方式：

1. 利用 <strong style="color:#DD5145">数组字面量</strong> 创建数组

   ```javascript
   const arr = [1,2,3]
   console.log(arr[0])
   ```

1. 利用 <strong style="color:#DD5145">new Array</strong> 创建数组

   ```javascript
   const arr = new Array(2)		// 创建了一个长度为2的空数组
   const arr1 = new Array(2,3)		// 创建了一个数组[2, 3]
   ```

数组元素可以包含任何值。 数字，字符串，布尔值，对象，数组，`null`，`undeifned`，以及其他表达式，如日期，函数和计算。

### 2.检查是否为数组

1. instanceof 运算符

   ```javascript
   const arr = []
   console.log(arr instanceof Array)
   ```

2. Array.isArray(参数)

   ```javascript
   console.log(Array.isArray(arr))
   ```



### 3.数组排序

| 方法名     | 说明                           | 是否修改原数组               |
| ---------- | ------------------------------ | ---------------------------- |
| reverse( ) | 颠倒数组中的元素的顺序，无参数 | 会改变原数组，返回一个新数组 |
| sort( )    | 对数组的元素进行排序           | 会改变原数组，返回一个新数组 |

**sort排序：**`arr.sort([compareFunction])`

返回值为排序后的数组。

注意，数组已原地排序，并且不进行复制（**返回的是原地排序的原数组**，并不是创建的新数组）

```javascript
// 升序排序，第一个参数是前一个对象，第二个参数是后一个对象
arr.sort(function (a, b) {
    return a - b
})

// 降序排序
arr.sort(function (a, b) {
    return b - a
})
// 若 a = b，则返回 0

// 教大家一个最好记的方法：
// 1.第一个参数是升序，第二个参数是降序
// 2.如果想要xx序，就用xx序参数 - 另外一个参数
```



### 4.数组转换为字符串

| 方法名               | 说明                                             | 返回值         |
| -------------------- | ------------------------------------------------ | -------------- |
| toString( )          | 把数组转换成字符串，逗号分隔每一项               | 返回一个字符串 |
| **`join('分隔符')`** | 方法用于把数组中的所有元素转换成为一个**字符串** | 返回一个字符串 |

**`join()`** 方法用于把**数组**中的所有元素**转换为一个字符串**，数组元素是通过指定的**分隔符**进行分隔的。

```javascript
const arr = ['red颜色','blue颜色','green颜色']
console.log(arr.join(''))	// red颜色blue颜色green颜色

// 与split('分隔符') （把字符串转换为数组）相反
```



### 5.数组其他操作

| 方法名     | 说明                                                 | 返回值                 |
| ---------- | ---------------------------------------------------- | ---------------------- |
| push( )    | 向数组的**末尾添加**一个或多个元素，注意修改原数组   | **返回新的长度**       |
| pop( )     | 删除数组最后一个元素，数组长度+1，无参数、修改原数组 | 返回它删除的元素值     |
| unshift( ) | 向数组的**开头添加**一个或多个元素，注意修改原数组   | **返回新的长度**       |
| shift( )   | 删除数组的第一个元素                                 | 返回它删除的元素值     |
| slice( )   | 数组**截取** slice(begin, end)                       | 返回被截取项目的新数组 |
| concat( )  | 连接两个或多个数组，不影响原数组                     | 返回一个新数组         |



## :star:字符串对象

### 1.字符串的不可变

指的是里面的值不可变，虽然看上去可以改变内容，但其实是地址变了，内存中新开辟了一个内存空间。

字符串所有的方法，都不会修改字符串本身，操作完成会**返回一个新的字符串**。



### 2.根据字符返回位置

| 方法名          | 说明                                                |
| --------------- | --------------------------------------------------- |
| **`indexOf()`** | 返回指定内容在原字符串中的下标，如果找不到就返回 -1 |
| `indexOf('')`   | indexOf一个空字符串的返回值是0                      |
| `lastIndexOf()` | 从后往前找，只找第一个匹配的                        |



### 3.根据位置返回字符

| 方法名              | 说明                                        |
| ------------------- | ------------------------------------------- |
| **`charAt(index)`** | 返回指定位置的字符（index 字符串的索引号）  |
| `charCodeAt(index)` | 获取指定位置处字符的ASCII码（index 索引号） |
| `str[index]`        | 获取指定位置处字符                          |



### 4.字符串转换为数组

**`split(separator[, limit])`** 方法用于分割字符串，参数 separator 为分割符，可以使用正则表达式来表示，参数 limit 为分割的份数。

```javascript
const str = 'hello'
str.split('') // 返回 ['h', 'e', 'l', 'l', 'o']
str.split('', 3) // 返回 ['h', 'e', 'l']
```



### 5.字符串其他操作

| 方法名                                      | 说明                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| concat(str1,str2,str3...)                   | concat() 方法用于连接两个或多个字符串。拼接字符串，等效于+，+更常用 |
| substr(start,lenght)                        | 从start 位置开始（索引号），length 取的个数                  |
| slice(start,end)                            | 从start 位置开始，截取到end 位置，end 取不到（他们俩都是索引号） |
| substring(start,end)                        | 从start 位置开始，截取到end 位置，end 取不到，基本和slice 相同，但不接受负值 |
| **`replace('被替换的字符', '替换的字符')`** | 替换字符，它只会替换第一个字符                               |
| **`trim()`**                                | 去除字符串两侧的空格                                         |



## :star:日期对象

Date（） 是一个构造函数，所有需要实例化后才能使用，必须使用 new 来调用创建我们的日期对象

### 1.实例化

在代码中发现了 **new 关键字** 时，一般将这个操作称为 **实例化**

```javascript
// 获取 当前时间
const date = new Date()		// 实例化对象

// 获取 指定时间
const date = new Date('2008-8-8')
```

### 2.日期对象方法

使用下列方法之前 **必须实例化**

- getFullYear（） 获取年份，四位年份
- getMonth（） 获取月份，取值 0~11，月份要 **加1**
- getDate（） 获取当月的具体一天
- getDay（） 获取星期，取值 0~6，0代表星期天
- getHours（） 获取小时，取值 0~23
- getMinutes（） 获取分钟，取值 0~59
- getSeconds（） 获取秒数，0~59

时间的另一种方法

```javascript
const date = new Date()
console.log(date)	// Wed Mar 15 2023 20:27:09 GMT+0800 (中国标准时间)
console.log(date.toLocaleString())	// 2023/3/15 20:27:09
console.log(date.toLocaleDateString())	// 2023/3/15
console.log(date.toLocaleTimeString())	// 20:27:09
```

### 3.时间戳

是指1970年01月01日00时00分00秒起至今的毫秒数，它是一种特殊的计量时间的方式

> **将来的时间戳 - 现在的时间戳 = 剩余时间毫秒数** 用作倒计时

三种方式获取时间戳

方法一：使用 getTime()方法，必须先实例化

```javascript
const date = new Date()
console.log(date.getTime())
```

方法二：简写 +new Date()


```javascript
console.log(+new Date())
console.log(+new Date('2023-3-14 18:30:00'))
```

方法三：使用 Date.now()方法，无需实例化

```javascript
console.log(Date.now())
```

> 只能返回**当前时间戳**，无法像前两种方法一样返回**指定的时间戳**
>





## :star:函数

函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。

### 声明函数

声明函数的5种方法：

1. function声明

```js
// 声明
function fun() {
    console.log('这是一个函数的打印结果')
} 
// 调用
fun()
```

> 声明函数时可以不指定返回类型

2. 匿名函数

```js
function() {
    console.log('这是一个匿名函数的打印') 
} 
```

> 但是由于匿名函数在创建后无法访问，并且只能通过赋值给变量来访问，如下函数表达式

3. 函数表达式

```js
let fun = function() {
    console.log('这是一个函数表达式的打印') 
} 
fun()
```

4. 箭头函数

```js
() => console.log('这是一个箭头函数的打印') 
```

> 但是，由于箭头函数没有名称，如果我们要调用它，它应该存储在一个变量中，就像函数表达式一样

5. 构造函数

声明函数的另一种方法是使用带有 `new` 关键字的 `Function` 构造函数

```js
let funcName = new Function('arg1', 'arg2', 'arg3', ..., '函数体') 
```



### 返回值 return

- return 后面**不接数据**或函数内**不写return**，函数的默认返回值是**undefined**
- 以返回**数组**方式来实现返回多个值，同理也可以返回一个对象



### 立即执行函数（IIFE）

立即执行函数（Immediately Invoked Function Expression，IIFE）是一个在定义时就会立即执行的 JavaScript 函数。

目的：<strong style="color:#DD5145">防止变量污染，减少变量名冲突</strong>。

它是一种设计模式，也被称为自执行匿名函数，主要包含两部分：

1. 第一部分是一个具有词法作用域的匿名函数，并且用**圆括号运算符 `()`** 运算符闭合起来。这样不但阻止了外界访问 IIFE 中的变量，而且不会污染全局作用域。
2. 第二部分创建了一个立即执行函数表达式 `()`，通过它，JavaScript 引擎将立即执行该函数。

```javascript
// 方式一，第二个小括号相当于调用函数，其小括号里面的参数为形参
(function () {
  // 初始化代码
  let firstVariable;
  let secondVariable;
}) ();
// firstVariable 和 secondVariable 变量在函数执行后会被丢弃

(() => {
  // …
}) ();

(async () => {
  // …
}) ();

// 方式二
;(function (x, y) {} (1, 2));

// 方式三
!function () {} ();
```

> 多个立即执行函数要用 **分号`;`**隔开，不然会报错



### 回调函数（callback）

[参考文章](https://blog.csdn.net/weixin_47075145/article/details/125752446)

如果将**函数A做为参数**传递给**函数B** 时，称**函数A为回调函数**。

执行完某个命名之后，回头调用的函数，简称**回调函数**。

```javascript
function A() {
    // 函数体
}
// 函数A 作为回调函数
setTimeout(A, 1000)
```

> 判断是否为回调函数，首先你得看调用它的是不是也是一个函数，它是不是作为了一个函数的参数

**回调函数特点：**

1. 不会立即执行
2. 回调函数是一个闭包
3. 执行前类型判断



## :star:作用域

作用域（scope）是可访问变量的集合，规定了变量能够被访问的 “范围”，离开这个 “范围” 变量便不能被访问。

变量访问的原则是**就近原则**。

### 局部作用域

变量在函数内声明，变量为局部变量，具有局部作用域。

- 函数内部声明的变量，在函数外部无法被访问
- 函数的参数也是函数内部的局部变量
- 不同函数内部声明的变量无法互相访问
- 函数执行完毕后，函数内部的变量实际被清空了



### 块级作用域

在 JavaScript 中使用 **`{}`** 包裹的代码称为代码块，代码块内部声明的变量外部**有可能**无法被访问

-  **`let`** 声明的变量**会产生**块作用域，var 不会产生块作用域
-  **`const`** 声明的常量**会产生**块作用域
-  **`for {}`** 也是⼀个块级作⽤域.
-  不同代码块之间的变量无法相互访问
-  **推荐使用 let 或 const**



### 全局作用域

全局作用域中声明的变量，任何其它作用域都可以被访问。

**\<script>标签** 和 **.js文件** 的最外层就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问。

- 为 window 对象动态添加的属性默认也是全局的，**不推荐！**
- 函数中未使用任何关键字声明的变量为全局变量，**不推荐！**
- 尽可能少的声明全局变量，防止变量被污染



## :star:变量提升

把所有 **var** 声明的变量提升到当前作用域的最前面，<strong style="color:#DD5145">只提升声明，不提升赋值</strong>，let / const 声明的变量不存在变量提升。

let 和 const 特点:

- 不属于顶层对象 window
- 不允许重复声明
- 不存在变量提升

let 和 const 区别：

- let 声明的变量可以改变，值和类型都可以改变
- const 声明的常量不可以改变，这意味着，const 一旦声明，就必须立即初始化，不能以后再赋值。
- 对于引用数据类型，const 声明的变量，里面存的不是值，而是**地址**
- **建议数组和对象使用 const 来声明**

```javascript
console.log(num + '件')
var num = 10
// 等价于
var num
console.log(num + '件')	// undefined 件
num = 10  // 变量声明会提升，但是赋值不会提升
```



## :star:严格模式

JavaScript 严格模式（strict mode）即在严格的条件下运行。

`"use strict"` 指令，它不是一条语句，但是是一个字面量表达式，目的是指定代码在严格条件下执行。

```js
"use strict"
myFunction()

function myFunction() {
    y = 3.14   // Uncaught ReferenceError: y is not defined（引用错误）
}
```

在函数内部声明是局部作用域 (只在函数内使用严格模式)：

```js
x = 3.14       // 不报错
myFunction()

function myFunction() {
   "use strict"
    y = 3.14   // Uncaught ReferenceError: y is not defined
}
```



## :star:事件

HTML 事件是发生在 HTML 元素上的事情。

当在 HTML 页面中使用 JavaScript 时， JavaScript 可以触发这些事件。

详细见后续章节 ***DOM 与 BOM***



## :star:this 关键字

面向对象语言中 this 表示当前对象的一个引用。但在 JavaScript 中 this 不是固定不变的，它会随着执行环境的改变而改变。

- 在方法中，this 表示该方法所属的对象。
- 如果单独使用，this 表示全局对象。
- 在函数中，this 表示全局对象。
- 在函数中，在严格模式下，this 是未定义的(undefined)。
- 在事件中，this 表示接收事件的元素。
- 类似 call() 和 apply() 方法可以将 this 引用到任何对象。



### 1.普通函数 this 指向

- 谁调用，this 的值指向谁

- 普通函数没有明确调用者时，this 指向 window
- 严格模式下没有调用者时，this 指向 undefined

### 2.箭头函数 this 指向

- 箭头函数中不存在 this

- 箭头函数会默认绑定外层 this 的值，所以在箭头函数中 this 和外层的 this 的指向相同
- 箭头函数中的 this 引用的就是最近作用域中的 this
- 向外层作用域中，一层一层查找 this，直到有 this 的定义

> - 在**DOM事件回调函数**中，需要DOM对象的 this，故不推荐使用箭头函数
> - **基于原型的面向对象**需要 this，也不推荐使用箭头函数
>
> - **构造函数、原型函数、字面量对象中函数、DOM事件函数**，也不推荐使用箭头函数



### 3.回调函数 this 指向

在回调函数调用时 this 的执行上下文并<strong style="color:#DD5">不是回调函数定义时的上下文</strong>，<strong style="color:#DD5145">而是调用它的函数所在的上下文</strong>。

```js
function createData(callback){
    callback()
}
var obj ={
    data:100,
    tool:function(){
        // let self = this			// 这里的this指向obj，然后当一个变量去使用
        createData(function(n){
            console.log(this,1111)  // window 1111
        })
    }
}
obj.tool()
```

分析：

> this指向是 **离它最近的或者嵌套级别的 function/方法的调用者**
>
> 这里离它最近的function是`function(n)`，会回到上面的callback()中，这时候调用者就不是obj而是window
>
> 全局环境就是在`<script></script>`里面，这里的this始终指向的是window对象

解决方法：

- 箭头函数
- `let self = this`



## :star:void 关键字

**void** 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。

语法：

```js
void func()
javascript:void func()
// 或者
void(func())
javascript:void(func())
```

例如，

```html
<a href="javascript:void(0)">单击此处什么也不会发生</a>
<a href="javascript:void(alert('Warning!!!'))">点我!显示警告信息</a>
```

`href="#"` 与 `href="javascript:void(0)"` 的区别：

> **#** 包含了一个位置信息，默认的锚是**#top** 也就是网页的上端。
>
> 在页面很长的时候会使用 **#** 来定位页面的具体位置，格式为：**# + id**。
>
> 而 javascript:void(0)，仅仅表示一个死链接。



## :star:正则表达式


正则表达式（Regular Expression，regex、regexp或RE）使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式。

搜索模式可用于文本搜索和文本替换。

### 什么是正则表达式

- 正则表达式是由一个字符序列形成的搜索模式。
- 当你在文本中搜索数据时，你可以用搜索模式来描述你要查询的内容。
- 正则表达式可以是一个简单的字符，或一个更复杂的模式。
- 正则表达式可用于所有文本搜索和文本替换的操作。

### 语法

1. **定义** 正则表达式语法

```javascript
const 变量名 = /正则表达式主体/修饰符(可选)
// 其中 / / 是正则表达式字面量
```

2. **判断** 是否符合规则的字符串

```javascript
const regObj = /表达式/
regObj.test(被检测的字符串)
// 如果正则表达式与指定的字符串匹配，返回true，否则false
```

3. **检索**（查找）符合规则的字符串

```javascript
regObj.exec(被检测的字符串)
// 如果匹配成功，则返回一个数组，否则返回null
```



## :star:元字符

#### 1.边界符

表示位置，开头和结尾，必须用什么开头，用什么结尾

| 边界符 | 说明                           |
| ------ | ------------------------------ |
| ^      | 表示匹配行首的文本（以谁开始） |
| $      | 表示匹配行尾的文本（以谁结束） |

**如果 ^ 和 $ 在一起，表示必须精确匹配**



#### 2.量词

表示重复次数设定某个模式出现的次数

| 量词  | 说明                        |
| ----- | --------------------------- |
| *     | 重复0次或多次，类似 >=0     |
| +     | 重复1次或多次，类似 >=1     |
| ?     | 重复0次或1次，类似 0 \|\| 1 |
| {n}   | 重复n次                     |
| {n,}  | 重复n次或多次               |
| {n,m} | 重复n到m次                  |



#### 3.字符类

[ ] 匹配字符集合，**只能选一个**

[ ] 里面加上 - （连字符），表示一个范围

[ ] 里面加上 ^ （取反符号），要写到中括号里面

```javascript
console.log(/[abc]/.test('andy'))	// true
// 字符串只要包含 abc 中任意一个字符，都返回 true
```

> **.** （点） 匹配除换行符之外的任何单个字符

预定义：指的是 某些常见模式的简写方式

| 预定类 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| \d     | 匹配一个数字字符。等价于 [0-9]                               |
| \D     | 匹配一个非数字字符。等价于 [\^ 0-9]                          |
| \w     | 匹配字母、数字、下划线。等价于 [A-Za-z0-9_]                  |
| \W     | 匹配非字母、数字、下划线。等价于 [\^ A-Za-z0-9_]             |
| \s     | 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v] |
| \S     | 匹配任何非空白字符。等价于 [\^ \f\n\r\t\v]                   |

```javascript
// 日期格式：/^\d{4}-\d{1,2}-d{1,2}$/
```



#### 4.修饰符

修饰符约束正则执行的某些细节行为。

语法：**/ 表达式 / 修饰符**

replace（） 替换，**`字符串.replace(/正则表达式/, '替换文本')`**

下表列出了正则表达式常用的修饰符：

| 修饰符 | 含义                             | 描述                                                         |
| ------ | -------------------------------- | ------------------------------------------------------------ |
| **i**  | ignore - 不区分大小写            | 将匹配设置为不区分大小写，搜索时不区分大小写                 |
| **g**  | global - **全局匹配**            | 查找字符串中所有的匹配项                                     |
| m      | multi line - 多行匹配            | 使边界字符 \^ 和 \$ 匹配每一行的开头和结尾，<br>**记住是多行**，而不是整个字符串的开头和结尾 |
| s      | 特殊字符圆点 \. 中包含换行符 \\n | 默认情况下的圆点 \. 是匹配除换行符 \\n 之外的任何字符，<br>加上 s 修饰符之后，\. 中包含换行符 \\n |



## :x:错误提示

`ReferenceError`：

- 当 JavaScript 无法找到您尝试访问的值的引用时，抛出引用错误

`SyntaxError`：

- 当你编写了一些非有效的 JavaScript 时，会抛出语法错误，例如当你把`return`这个词写成`retrun`时
- 当 Javascript 引擎解析代码时，遇到了不符合语法规范的标记（token）或标记顺序，则会抛出 `SyntaxError`

`TypeErrors`：

- 当值不是预期类型时，会抛出类型错误。 JavaScript 期望`name`是一个函数，我们试图调用它。 但它是一个字符串