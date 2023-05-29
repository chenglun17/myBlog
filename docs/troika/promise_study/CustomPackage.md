# 四、Promise 自定义封装

## 测试

```html
<script>
    let p = new Promise((resolve, reject) => {
        resolve('OK')
        // reject('Oh NO!')
        // throw 'Error!!!'
    })
    console.log(p)

    // 调用 then 回调
    const res = p.then(value => {
        console.log('value:', value)
    }, reason => {
        console.log('reason:', reason)
    })
    // console.log('###',res)
</script>
```

## 1.初始化结构搭建

```js
/* 自定义封装promise */

// 声明 Promise构造函数
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null

    // resolve 函数
    function resolve(data) {}

    // reject 函数
    function reject(data) {}

    // 同步调用 执行器函数（重点）
    executor(resolve, reject)
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {

}
```

## 2.resolve与reject函数实现

```js
// 声明 Promise构造函数
function Promise(executor) {
    // 添加属性
    const self = this   // 保存实例对象 Promise 的this
    
    // 其他代码...
}

// resolve 函数
function resolve(data) {
    // 3.判断状态（只能修改一次）
    if(self.PromiseState !== 'pending') return
    // 1.改变对象的状态（不能直接使用this，这里的this指向Window）
    self.PromiseState = 'fulfilled'
    // 2.设置对象结果值
    self.PromiseResult = data
}

// reject 函数
function reject(data) {
    // 3.判断状态（只能修改一次）
    if(self.PromiseState !== 'pending') return
    // 1.改变对象的状态（不能直接使用this，这里的this指向Window）
    self.PromiseState = 'rejected'
    // 2.设置对象结果值
    self.PromiseResult = data
}
```

## 3.throw抛出错误改变状态

```js
// 其他代码...

// 把预计会出现错误的代码写在try内，catch去捕获可能出现的异常
try {
    // 同步调用 执行器函数（重点）
    executor(resolve, reject)
} catch (error) {
    // 修改 Promise对象状态为 失败
    reject(error)
}

// 其他代码...
```

## 测试

```html
<script>
    // 实例化对象
    let p = new Promise((resolve, reject) => {
        // 模拟异步任务（改变状态以后再去指向then回调）
        setTimeout(() => {
            resolve('OK')
        }, 1000);
    })

    // 调用 then 回调
    p.then(value => {
        console.log('value:', value)
    }, reason => {
        console.log('reason:', reason)
    })
</script>
```

## 4.then方法执行回调

```js
// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    // 调用回调函数  PromiseState
    if(this.PromiseState === 'fulfilled'){
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult);
    }
}
```

## 5.异步任务then方法执行回调

```js
// 声明 Promise构造函数
function Promise(executor) {
    // 添加属性
    const self = this   // 保存实例对象 Promise 的this
    this.callback = {}  // 保存回调函数（解决异步任务问题）
    
    // 其他代码...
}

// resolve 函数
function resolve(data) {
    // 其他代码...
    
    // 状态改变后，调用成功的回调函数（存在异步任务）
    if(self.callback.onResolved){
        self.callback.onResolved(data)
    }
}

// reject 函数
function reject(data) {
    // 其他代码...
    
    // 状态改变后，调用失败的回调函数（存在异步任务）
    if(self.callback.onRejected){
        self.callback.onRejected(data)
    }
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    // 其他代码...
    
    // 判断 pending 状态（存在异步任务）
    if (this.PromiseState === 'pending') {
        // 保存回调函数（重点），在状态未改变之前，此时还不能调用回调函数
        this.callback = {
            onResolved: onResolved,
            onRejected	// 简写
        }
    }
}
```

## 测试

```html
<script>
    // 实例化对象
    let p = new Promise((resolve, reject) => {
        // 模拟异步任务（改变状态以后再去指向then回调）
        setTimeout(() => {
            resolve('OK')
        }, 1000);
    })

    // 调用多个 then 回调
    p.then(value => {
        console.log('value:', value)
    }, reason => {
        console.log('reason:', reason)
    })
    // 后一个回调存入 callback ，会覆盖前一个已经存入callback中的回调函数，导致页面只弹出不打印
    p.then(value => {
        alert(value)
    }, reason => {
        alert(reason)
    })
    console.log(p)
</script>
```

## 6.指定多个回调的实现

```js
// 声明 Promise构造函数
function Promise(executor) {
    // 添加属性
    this.callbacks = []  // 声明一个数组保存多个回调函数（解决异步任务问题）
    
    // 其他代码...
}

// resolve 函数
function resolve(data) {
    // 其他代码...
    
    // 状态改变后，调用成功的回调函数（存在异步任务）
    self.callbacks.forEach(item => {
        item.onResolved(data)
    })
}

// reject 函数
function reject(data) {
    // 其他代码...
    
    // 状态改变后，调用失败的回调函数（存在异步任务）
    self.callbacks.forEach(item => {
        item.onRejected(data)
    })
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    // 其他代码...

    // 判断 pending 状态（存在异步任务）
    if (this.PromiseState === 'pending') {
        // 保存回调函数（重点），在状态未改变之前，此时还不能调用回调函数
        this.callbacks.push({
            onResolved,
            onRejected
        })
    }
}
```



## 测试

```html
<script>
    // 实例化对象
    let p = new Promise((resolve, reject) => {
        resolve('OK')
    })

    // then 回调
    const res = p.then(value => {
        console.log('value:', value)
        // return '111'   // 不写return，默认返回结果是undefined，又undefined也是非promise类型，所以res状态还是成功fulfilled
        return new Promise((resolve, reject) => {
            resolve('success')
        })
        // throw '错误'
    }, reason => {
        console.log('reason:', reason)
    })
    
    console.log('res:', res)  // 先返回Promise，且PromiseResult为undefined，再返回value：OK
</script>

// promise对象里面的代码是同步执行的，只是then回调函数才是异步执行的
```

## 7.同步修改状态then方法结果返回

then方法的返回结果是由**指定的回调函数**的**执行结果**决定的

> - 若指定的回调函数返回了一个非Promise类型的数据（数字、字符串、undefined..）
> - 若返回的是一个Promise类型的数据，则返回的这个Promise就决定了then方法返回的Promise

```js
// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    return new Promise((resolve, reject) => {   // then返回一个promise对象
        // 根据 PromiseState 调用回调函数
        if (this.PromiseState === 'fulfilled') {
            // 获取回调函数的执行结果
            let result = onResolved(this.PromiseResult) // 根据执行结果改变状态
            // 判断
            if (result instanceof Promise) {
                // 如果为promise对象
                result.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                // 非Promise对象，返回结果为成功
                resolve(result)
            }
        }
        if (this.PromiseState === 'rejected') {
            // 同上
        }
        // 其他代码...
    })
}
```



## 测试

```html
<script>
    // 实例化对象
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('OK')
            reject('Error')
        }, 1000);

    })

    // 调用 then 方法
    const res = p.then(value => {
        console.log('value:', value)
        // throw '错误'
    }, reason => {
        console.log('reason:', reason)
        // then方法返回结果的状态，只和return返回的新Promise对象的状态有关系
        return new Promise((resolve, reject) => {
            resolve('成功')
            // reject('失败')
        })
        // throw '错误'
    })
    console.log('res:', res)

</script>
```

## 8.异步修改状态then方法结果返回

```js
// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this   // 保存实例对象的this，这里的this指向Promise
    // then返回一个promise对象
    return new Promise((resolve, reject) => {
        // 其他代码...

        // 判断 pending 状态（存在异步任务，异步修改后走这里）
        if (this.PromiseState === 'pending') {
            // 保存回调函数（重点），在状态未改变之前，不能调用回调函数
            this.callbacks.push({
                onResolved: function () {
                    try {
                        // 执行成功的回调函数
                        let result = onResolved(self.PromiseResult) // 根据执行结果改变状态
                        // 判断是否为Promise对象
                        if (result instanceof Promise) {
                            result.then(v => {
                                resolve(v)
                            }, r => {
                                reject(r)
                            })
                        } else {
                            resolve(result)
                        }
                    } catch (error) {
                        reject(error)
                    }
                },
                onRejected: function () {
                    // 同上
                }
            })
        }
    })
}
```



## 测试

```html
<script>
    // 实例化对象
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error')
        }, 1000);
    })

    p.catch(reason => {
        console.warn(reason)
    })
</script>
```

## 9.catch方法封装

```js
// 添加 catch 方法
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}
```



## 测试

```html
<script>
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Error')
            // resolve('OK')
        }, 1000);
    })
    // 异常穿透
    p.then(value => {
        console.log(111)
    }).then(value => {
        console.log(111)
    }).catch(reason => {
        console.warn(reason)
    })
    // 值传递
    p.then().then(value => {
        console.log(111)
        throw 'dd'
    }).then(value => {
        console.log(222)
    }).catch(reason => {
        console.warn(reason)
    })
</script>
```

## 10.异常穿透&值传递

```js
// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this   // 保存实例对象的this，这里的this指向Promise
    // 判断回调函数参数
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }
    if (typeof onResolved !== 'function') {
        onResolved = value => value
    }
    // 其他代码...
}
```





## 测试

```html
<script>
    // 实例化对象
    // let p = Promise.resolve('OK')
    let p = Promise.resolve(new Promise((resolve, reject) => {
        resolve('ok')
    }))
    // let p = Promise.resolve(Promise.resolve('success'))

    console.log(p)
</script>
```

## 11.resolve方法封装

```js
// 添加 resolve 方法
Promise.resolve = function (value) {
    // 返回Promise对象
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v)
            }, r => {
                reject(r)
            })
        } else {
            // 如果不是Promise对象，就返回成功
            resolve(value)
        }
    })
}
```



## 测试

```html
<script>
    // 实例化对象
    // let p = Promise.reject('OK')
    let p = Promise.reject(new Promise((resolve, reject) => {
        resolve('ok')
    }))
    // let p = Promise.reject(Promise.reject('success'))

    console.log(p)
</script>
```

## 12.reject方法封装

```js
// 添加 reject 方法
Promise.reject = function (reason) {
    // 返回Promise对象
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}
```



## 测试

```html
<script>
    // 实例化对象
    let p = new Promise((resolve, reject) => {
        resolve('OK')
    })
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK1')
        }, 1000);
    })
    let p2 = new Promise((resolve, reject) => {
        resolve('OK2')
        // reject('Error')
    })

    // 调用 all 方法
    let result = Promise.all([p, p1, p2])
    console.log(result)
</script>
```

## 13.all方法封装

```js
// 添加 all 方法
Promise.all = function (promises) {
    // 声明变量
    let count = 0
    let arr= []	// 存储返回结果
    // 返回结果为Promise对象
    return new Promise((resolve, reject) => {
        // 遍历
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                // 执行到这一步，说明对象的状态是成功
                count++
                // arr.push(v) // push会导致结果的顺序与传入的promises数组不一致
                arr[i] = v
                // 判断（重点）
                if (count === promises.length) {
                    resolve(arr) // 修改状态
                }
            }, r => {
                reject(r)
            })
        }
    })
}
```

## 测试

```html
<script>
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK')
        });
    });
    let p2 = Promise.reject('Success')
    let p3 = Promise.resolve('Oh Yeah')

    //调用 race 方法
    let result = Promise.race([p1, p2, p3])

    console.log(result)
</script>
```

## 14.race方法封装

```js
//添加 race 方法
Promise.race = function(promises){
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                //修改返回对象的状态为 『成功』
                resolve(v)
            },r=>{
                //修改返回对象的状态为 『失败』
                reject(r)
            })
        }
    })
}
```

