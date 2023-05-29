# 六、async 与 await

## 1.基本概念

`Async/await`其实就是上面`Generator`的语法糖，`async`函数其实就相当于`funciton *`的作用，而`await`就相当与`yield`的作用。

而在`async/await`机制中，自动包含了我们上述封装出来的`spawn`自动执行函数。

- **Promise ==> 异步**

- **async ==> 同步转异步**

  方法体内部的某个表达式使用await修饰，那么这个方法体所属方法必须要用async修饰所以使用awit方法会自动升级为异步方法

- **await ==> 异步转同步**

  await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用

  await 后面可以跟任何的 JavaScript 表达式， 可以等待很多类型的东西，但是它最主要目的是用来等待 Promise 对象的状态被 resolved

  如果 await 的是一个 promise 对象会造成异步函数停止执行并且等待 promise 的解决

  如果 await 的是正常的表达式则立即执行

注意：

1. **await 必须写在 async 函数中，但 async 函数中可以没有 await**
2. 如果 await 的 promise 失败了，就会 **抛出异常**, 需要通过 **try...catch 捕获处理**



##  2.async 函数

async 函数的返回值为 Promise 对象，所有它可以调用 then 方法，Promise 对象的结果 **由 async 函数执行的返回值** 决定。

```js
async function fn () {
    return 'async'
}
fn().then(res => {
    console.lgo(res) // 'async'
})
```



## 3.await 表达式

await **右侧** 的表达式一般为 **Promise对象**，但也可以是其它的值。

2. 如果表达式是 Promise 对象，await 返回的是 **Promise成功的值**
3. 如果表达式是其它值，直接将对应的值作为 await 的返回值
4. await 后面不管是什么，await 都会<strong style="color:#DD5145">阻塞后面的代码</strong> 

所以这就是 await 必须用在 async 的原因，async 刚好返回一个 Promise 对象，可以异步执行阻塞。

```js
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 1000);
    })
}
function fn1() { return 'chenglun17' }
async function fn2() {
    // const value = await fn() // await 右侧表达式为Promise，得到的结果就是Promise成功的value
    // const value = await 'chenglun17' // await 右侧表达式是其它值，直接将此值作为 await 的返回值
    const value = await fn1()
    console.log('value', value)
}
fn2() // value 'chenglun17'
```



## 参考

[参考文章](https://juejin.cn/post/7062155174436929550)、[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)