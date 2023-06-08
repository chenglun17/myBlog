# 三、Promise 关键问题

## 1.如何改变 Promise 的状态?

改变 Promise **的状态的3种方法**：

1. `resolve(value)`：如果当前是 pending 就会变为 resolved（fulfilled）
2. `reject(reason)`：如果当前是 pending 就会变为 rejected
3. `抛出异常`：如果当前是 pending 就会变为 rejected

```javascript
let p = new Promise((resolve, reject) => {
	// 1. resolve 函数
	// resolve("ok"); // pending   => fulfilled (resolved)
    
	// 2. reject 函数
	// reject("error"); // pending  =>  rejected
    
	// 3. 抛出错误
	throw "出问题了";
});
```



## 2.一个 Promise 指定多个成功/失败回调函数, 都会调用吗？

当 promise 改变为对应状态时都会调用

```javascript
let p = new Promise((resolve, reject) => {
	resolve("OK"); 
    // 如果注释掉resolve()，那么p的状态就还是pending，即状态未发生改变，不会调用then
});
// 指定回调 - 1
p.then((value) => {
	console.log(value);
});
// 指定回调 - 2
p.then((value) => {
	alert(value)
});
```



## 3.改变 Promise 状态和指定回调函数谁先谁后？

1. 都有可能, 正常情况下是<strong style="color:#DD5145">先指定回调再改变状态</strong>, 但也可以<strong style="color:#DD5145">先改变状态再指定回调</strong>

2. 如何**先改状态再指定回调**?

   在执行器中直接调用 resolve() / reject(）

   延迟更长时间才调用 then()

3. 什么时候才能得到数据？

   如果先指定的回调, 那当**状态发生改变时**, 回调函数就会调用, 得到数据

   如果先改变的状态, 那当**指定回调时**, 回调函数就会调用, 得到数据

```javascript
let p = new Promise((resolve, reject) => {
	// 异步写法,这样写会先指定回调,再改变状态
	setTimeout(() => { 
        resolve('ok')
	}, 1000);
	// 这是同步写法,这样写会先改变状态,再指定回调
	resolve('success')
})
p.then(value => {
    console.log(value)
}, reason => {
    console.log(reason)
})
```



## 4.Promise 中 then 的返回值

首先实例化一个 promise 对象。promise 对象身上有 then 方法，可用来指定回调，对成功和失败的结果进行处理。

它接受两个回调函数，一个是 resolve 成功的回调，一个是 reject 失败的回调。

```js
// 实例化一个Promise对象
const p = new Promise((resolve, reject) => {
    resolve('OK')
})
// then回调
const p1 = p.then(value => {}, reason => {})

console.log(p === p1)  // false，说明p.then()的结果是与p1不是一个promise对象
```

p.then() 返回的也是一个promise对象，因此可以进行**链式调用**，是promise可以解决异步编程[回调地狱](https://blog.csdn.net/qq_42698326/article/details/111075519)的原因

**重点**：then 返回的 promise对象 **p1 的状态** 是由 **then 内部回调函数的执行结果** 来决定的，不取决于p的状态，不取决于你调用的是p的成功或者失败的回调，

**then的返回的状态和值有三种情况，如下：**

1. 如果回调函数的返回结果是 <strong style="color:#DD5145">非promise类型的对象</strong>，则 then 方法返回的 promise 对象 p1 的状态为成功 **fulfilled**，同时返回的结果就是 promise 对象 p1 成功的值 1111。

> 如果你不写 return，默认返回结果是 **undefined**，又 undefined 也是**非promise类型**，所以 p1 状态还是成功 **fulfilled**，返回的 promise 成功值 为undefined。

```js
const p1 = p.then(value => {        // 接受p成功的回调
	return '1111'    
}, reason => {})
console.log(p1)     // 输出p1这个promise对象
/* --------------------------------------------------------------- */
const p1 = p.then(value => {}, reason => {   // 接受p失败的回调
    return '2222'
})
console.log(p1)   // 此时p1的状态还是fulfilled，证明只和then内部回调函数的返回结果有关系
```

> 证明p1返回的状态只和then内部回调函数的返回结果有关系



2. 如果回调函数的返回结果是 <strong style="color:#DD5145">新promise类型对象</strong>，则p1的状态就取决于**return返回的这个promise对象内部的状态**，内部为 resolve, 则p1状态为 fulfilled，内部为 reject，则p1状态为 rejected。

```js
const p1 = p.then(value => {
    return new Promise((resolve, reject) => {
        reject('出错了')
    })
}, reason => { })
console.log(p1)   // 结果为 rejected
```



3. 第三种情况为 <strong style="color:#DD5145">抛出错误</strong>，则p1状态为 **rejected**，返回的结果就是你抛出的值。

```js
const p1 = p.then(value => {
	// throw new Error('出错了');
	throw '出错了'    // 没有return，直接抛出错误
}, reason => { })
console.log(p1)   // 结果为 rejected
```



## 5.promise 如何串连多个操作任务?

1. promise 的 then() 方法返回一个 promise对象，所以可以继续**链式调用**
2. 通过 then 的链式调用串连多个同步/异步任务

```javascript
let p = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('OK');
	}, 1000);
});	
p.then(value => {
	return new Promise((resolve, reject) => {
		resolve("success");
	});
}).then(value => {
	console.log(value);
}).then(value => {
	console.log(value); // 因为上个then没有返回任何东西所以输出undefined
})
```



## 6.Promise 异常传透?

1. 当使用 Promise 的 then() 链式调用时, 可以**在最后指定失败的回调**
2. 前面任何操作出了异常, 都会传到最后失败的回调中处理

```javascript
let p = new Promise((resolve, reject) => {
	setTimeout(() => {
        // resolve('OK');
        reject('Err');
	}, 1000);
});
p.then(value => {
    // console.log(111); // 1s后不会输出111
    throw '失败啦!';
}).then(value => {
    console.log(222); // 1s后不会输出222
}).then(value => {
    console.log(333); // 1s后不会输出333
}).catch(reason => {   // 用then也可以捕获异常，不过then要传两个参数
    console.warn(reason);
});
console.log(p)
```



## 7.如何中断 Promise 链?

1. 当使用 Promise 的 then() 链式调用时, 在中间中断, 不再调用后面的回调函数
2. 办法：在回调函数中 **返回一个 pendding 状态的 Promise 对象**
3. **`return new Promise(() => {})`**

```javascript
let p = new Promise((resolve, reject) => {
	setTimeout(() => {
        resolve('OK');
    }, 1000);
});

p.then(value => {
    console.log(111);
    // 有且只有一个方式
    return new Promise(() => {}); // 返回一个pendding状态的Promise对象
    // 后面的都不会执行
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).catch(reason => {
    console.warn(reason);
});
```

