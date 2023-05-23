# 异步方案的比较

异步解决方案的发展历程：回调函数 --- Promise --- Generator --- async / await

后三种方案是为解决传统的回调函数而提出的。而`async/await`又是`Generator`函数的语法糖。

- `Promise` 的内部错误使用`try catch`捕获不到，只能用`then`的第二个回调或`catch`来捕获，而`async/await`的错误可以用`try catch`捕获

- `Promise` 一旦新建就会立即执行，**不会阻塞后面的代码**，而`async`函数中 `await` 后面是 `Promise` 对象会**阻塞后面的代码**。

- `async`函数会隐式地返回一个`Promise`，该`Promise`的`reosolve`值就是函数 return 的值。

- 使用`async`函数可以让代码更加简洁，不需要像`Promise`一样需要调用`then`方法来获取返回值，不需要写匿名函数处理`Promise`的`resolve` 值，也不需要定义多余的 data 变量，还避免了嵌套代码。