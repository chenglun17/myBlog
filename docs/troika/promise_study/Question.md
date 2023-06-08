# 八、一道题目

```js
async function async1() {
    await async2()				// 2.1 执行 async2 函数
    console.log('async1 end')	 // 2.3 await后面的代码会被阻塞，存入微任务队列（第一个微任务）
    						   // 5.1 执行第一个微任务，打印
}
async function async2() {
    console.log('async2 end')	 // 2.2 直接打印
}

console.log('script start')		// 1.全局代码自上而下执行，直接打印

setTimeout(function() {
    console.log('setTimeout')	// 6.上一个宏任务所有事都做完了，开始下一个宏任务，就是定时器
}, 0)

async1()	// 2.执行 async1 函数

new Promise(resolve => {	 // 3.执行 new Promise
    console.log('Promise')	 // 3.1 直接打印
    resolve()				// 3.2 遇到resolve，将第一个then方法存入微任务队列（第二个微任务）
}).then(function() {
    console.log('promise1')	  // 5.2 执行第二个微任务，打印
    						// 执行完后当前Promise的状态为 fulfilled，第二个then方法也存入微任务队列（第三个微任务）
}).then(function() {
    console.log('promise2')	  // 5.3 再取出微任务队列中的微任务并执行，打印，微任务执行完毕
})
console.log('script end')	// 4.直接打印，全局代码执行完毕
						  // 5.同步代码执行完了，开始执行微任务
```

答案：`script start`-`async2 end`-`Promise`-`script end`-`async1 end`-`promise1`-`promise2`-`setTimeout`

解题技巧：

- 无论是 then 还是 catch 里的回调内容，只有代码正常执行或正常返回，则当前新的 Promise 实例为 fulfilled 状态，如果有报错或返回 Promise.reject() 则新的 Promise 实例为 rejected 状态。
- fulfilled 状态能够触发 then 回调
- rejected 状态能够触发 catch 回调
- 执行 async 函数，返回的是 Promise 对象
- await 相当于 Promise 的 then，并且同一作用域下 await 后的内容全部作为 then 中回调的内容
- 异步中先执行宏任务，再执行微任务

[参考文章](https://juejin.cn/post/7062155174436929550#heading-12)

## 第二道题目

```js
const myPromise = Promise.resolve(Promise.resolve("Promise!"));

function funcOne() {
	myPromise.then(res => res).then(res => console.log(res));
	setTimeout(() => console.log("Timeout!"), 0);
	console.log("Last line!");
}

async function funcTwo() {
	const res = await myPromise;
	console.log(await res);
	setTimeout(() => console.log("Timeout!"), 0);
	console.log("Last line!");
}

funcOne();
funcTwo();
```

首先，我们调用 `funcOne`。在函数 `funcOne` 的第一行，我们调用`myPromise` promise *异步操作*。当 JS 引擎在忙于执行 promise，它继续执行函数 `funcOne`。下一行 *异步操作* `setTimeout`，其回调函数被 Web API 调用。 (详情请参考我关于 event loop 的文章.)

promise 和 timeout 都是异步操作，函数继续执行当 JS 引擎忙于执行 promise 和 处理 `setTimeout` 的回调。相当于 `Last line!` 首先被输出， 因为它不是异步操作。执行完 `funcOne` 的最后一行，promise 状态转变为 resolved，`Promise!` 被打印。然而，因为我们调用了 `funcTwo()`，调用栈不为空，`setTimeout` 的回调仍不能入栈。

我们现在处于 `funcTwo`，先 *awaiting* myPromise。通过 `await` 关键字， 我们暂停了函数的执行直到 promise 状态变为 resolved (或 rejected)。然后，我们输出 `res` 的 awaited 值（因为 promise 本身返回一个 promise）。 接着输出 `Promise!`。

下一行就是 *异步操作* `setTimeout`，其回调函数被 Web API 调用。

我们执行到函数 `funcTwo` 的最后一行，输出 `Last line!`。现在，因为 `funcTwo` 出栈，调用栈为空。在事件队列中等待的回调函数（`() => console.log("Timeout!")` from `funcOne`, and `() => console.log("Timeout!")` from `funcTwo`）以此入栈。第一个回调输出 `Timeout!`，并出栈。然后，第二个回调输出 `Timeout!`，并出栈。得到结果 `Last line! Promise! Promise! Last line! Timeout! Timeout!`