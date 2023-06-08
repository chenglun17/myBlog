# 六、async 与 await

## 1.:star:基本概念

ES2017（ES8） 标准引入了 async 函数，使得异步操作变得更加方便。用同步的思想来写异步的代码。

`Async/await`其实就是上面`Generator`的语法糖，`async`函数其实就相当于`funciton *`的作用，而`await`就相当与`yield`的作用。

- `async`是异步的意思，用来声明一个异步方法，返回值是一个 Promise 对象
- `await`是用来等待异步方法执行，`await`则可以理解为 `async wait`
- `await`命令必须写在`async`函数之中，但`async`函数中可以没有`await`



##  2.:star:async 函数

async 函数的返回值为 Promise 对象，所有它可以调用 then 方法，Promise 对象的结果 **由 async 函数执行的返回值** 决定。

- `async`函数返回一个 Promise 对象
- `async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数
- `async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。
- `async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数

```js
async function fn () {
    // return 'async'
    return new Promise((resolve, reject) => {
        // resolve('success')
        reject('error')
    })
}
fn().then(res => {
    console.log('success',res)
}).catch(err => {
    console.log('err', err)
})
```

总结：

- async 返回的是非Promise对象，返回的结果的一定是 fulfilled 状态，执行 then 回调函数
- async 返回的是一个Promise对象，根据该 Promise 对象的状态来判断是执行 then 还是 catch



## 3.:star:await 命令

- `await`命令后面是一个 Promise 对象，返回该对象的结果，如果非 Promise 对象，就直接返回对应的值
- `await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到
- await 后面不管是什么，await 都会<strong style="color:#DD5145">阻塞后面的代码</strong>，直到异步函数的值被解析才开始后面代码的执行

所以这就是 await 必须用在 async 的原因，async 刚好返回一个 Promise 对象，可以异步执行阻塞。

```js
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 1000)
    })
}

function fn1() { 
    return 'chenglun17' 
}

async function fn2() {
    // const value = await fn() // await 右侧表达式为Promise，得到的结果就是Promise成功的value
    // const value = await 'chenglun17' // await 右侧表达式是其它值，直接将此值作为 await 的返回值
    const value = await fn1()
    console.log('value', value)
}

fn2() // value 'chenglun17'
```



## 4.:star:错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`。

防止出错的方法，也是将其放在`try...catch`代码块之中。

```js
async function f() {
    try {
        await new Promise(function (resolve, reject) {
            throw new Error('出错了')
        })
    }
    catch(err) {
        console.error(err)
    }
    return await('hello world')
}
```

如果有多个`await`命令，可以统一放在`try...catch`结构中。

```js
async function main() {
    try {
        const val1 = await firstStep()
        const val2 = await secondStep(val1)
        const val3 = await thirdStep(val1, val2)

        console.log('Final: ', val3)
    }
    catch (err) {
        console.error(err)
    }
}
```



## :page_facing_up:参考

[阮一峰 ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)、[参考文章](https://juejin.cn/post/7062155174436929550)、[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)