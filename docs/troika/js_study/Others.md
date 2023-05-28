# 其他实现

## 控制请求的并发量

**需求：** 现在有一组请求，想让其依次每次执行一定的请求数量[并发](https://so.csdn.net/so/search?q=并发&spm=1001.2101.3001.7020)请求，直到请求到最后一个请求，直至完成所有请求，而且要求请求返回的结果顺序和请求时的顺序保持一致。

```js
/**
 * 并发请求
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxNum 最大并发请求数
 */

// fetch采用Promise方式来处理数据,比XMLHttpRequest更加简单易用
function concurRequest(urls, maxNum) {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            // 先考虑边界问题
            resolve([])
            return;
        }
        const results = [] //存储请求结果并返回
        let index = 0 // 下一个请求的 url 下标
        let count = 0 // 当前请求完成的数量

        // 发送请求
        async function request() {
            if (index === urls.length) return

            const i = index;
            const url = urls[index]
            index++

            try {
                const resp = await fetch(url)
                // 将resp加入到results
                results[i] = resp   // 不能用push，因为这样就会出现异步完成优先写入不符合要求
            } catch (error) {
                // 将error加入到results
                results[i] = error
            } finally {
                // 判断是否所有的请求都已经完成
                count++
                if (count === urls.length) {
                    resolve(results)
                }
                request()
            }

            // console.log(resp);
            // console.log(url);
            // console.log(results);
        }

        // 取最大并发数和请求url数组长度两者中最小的值作为并发请求数
        const times = Math.min(maxNum, urls.length)
        for (let i = 0; i < times; i++) {
            request()
        }
    })
}
```

测试

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>并发请求</h1>
    <script src="./index.js"></script>
    <script>
        const urls = [];
        for (let i = 0; i < 100; i++) {
            urls.push(`https://api.uixsj.cn/hitokoto/get?tyoe=social/${i}`)
        }
        // 并发请求数为20
        concurRequest(urls, 20).then(resp => {
            console.log(resp);
        })
    </script>
</body>

</html>
```

[参考文章](https://blog.csdn.net/DLGDark/article/details/128339268)、[参考文章2](https://blog.csdn.net/m0_46672781/article/details/127647557)