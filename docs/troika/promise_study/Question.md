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