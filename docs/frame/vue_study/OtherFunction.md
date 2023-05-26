# 其他功能

## 1.进度条 nprogress

[参考文章](https://blog.csdn.net/weixin_68067009/article/details/124983303)、[参考文章2](https://blog.csdn.net/m0_65262198/article/details/123761999)

nprogress 进度条的使用：nprogress 是页面跳转是出现在浏览器顶部的进度条

官网：[NProgress: slim progress bars in JavaScript](http://ricostacruz.com/nprogress/)

> - start：进度条开始
> - done：进度条结束
> - 进度条颜色可以修改，在包 nprogress/nprogress.css 下修改（**`#nprogress .bar`**）

安装

```sh
npm install --save nprogress
```

导入 nprogress 模块

```js
import NProgress from "nprogress"
import "nprogress/nprogress.css"	// 引入进度条的样式，否则看不到效果
```

可以选择显示右上角螺旋加载提示

```js
NProgress.configure({ showSpinner: false })
```

**基本使用：**

可以用在切换路由的进入和离开顶部进度条展示、也可以结合你所配置的封装了axios请求拦截器和响应拦截器中使用 

```js
router.beforeEach((to, from, next) => {
    nprogress.start()	// 开启进度条
    next()
})

router.afterEach(() => {
    nprogress.done()	// 完成进度条
})
```



## 2.html2canvas

[参考文章](https://blog.csdn.net/lFFFFFFl/article/details/129185872)、[参考文章2](https://blog.csdn.net/qq_40716795/article/details/123305177)

需求功能：**vue 项目使用 html2canvas 库实现网页截屏**

使用的插件：html2canvas

```sh
npm install html2canvas --save
```

插件功能：**把表单转化成图片来保存**，html2canvas 能够实现在用户浏览器端直接对整个或部分页面进行截屏。html2canvas 脚本将当页面渲染成一个canvas图片，通过读取 DOM 并将不同的样式应用到这些元素上实现。

它不需要来自服务器任何渲染，整张图片都是在客户端浏览器创建。当浏览器不支持 canvas 时，将采用 Flashcanvas 或 ExplorerCanvas 技术代替实现。

html2canvas 可以通过获取 HTML 的某个元素，然后生成 canvas，能让用户保存为图片。 这个项目主要是生成 canvas，那么我们如果需要生成图片还需要将它转化为图片地址。

## 3.添加水印 v-waterMarker

[参考文章](https://blog.csdn.net/weixin_42321819/article/details/117476655)

需求：给项目的整个背景加上自定义水印，可以改变水印的文案和字体颜色等

实现思路

- 这里使用的技术主要是`canvas`,在实现水印的过程中，主要使用了`canvas`的特性
- 使用 `canvas` 特性生成 `base64` 格式的图片文件，然后设置其字体大小，颜色等
- 最后将其设置为背景图片，这就实现了页面的水印效果

实现代码

`src/utils/waterMarker.js`文件

```js
function addWaterMarker(str, parentNode, font, textColor) {
    // 水印文字，父元素，字体，文字颜色
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 200
    can.height = 150
    can.style.display = 'none'

    var cans = can.getContext('2d')
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 10, can.height / 2)
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

const waterMarker = {
    bind: function (el, binding) {
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
    },
}

export default waterMarker
```

组件中使用

```vue
<template>
    <div class="water-marker">
        <div v-waterMarker="{ text: 'chenglun17-版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }">
            <div class="water-marker-item">测试</div>
        </div>
    </div>
</template>

<script>
    import waterMarker from '../utils/waterMarker'

    export default {
        name: 'waterMarker',
        directives: {
            waterMarker,
        },
    }
</script>

<style lang="less" scoped>
    .water-marker {
        height: 300px;
        width: 600px;
        border: 1px solid #999;
        
        .water-marker-item {
            line-height: 300px;
        }
    }
</style>
```

## 4.计算 hash 值

[参考文章](https://blog.csdn.net/mouday/article/details/128405931)

安装

```sh
npm install --save spark-md5
```

使用方式一

```js
const hexHash = SparkMD5.hash('Hi there')
console.log(hexHash)
// d9385462d3deff78c352ebb3f941ce12
```

使用方式二

```js
const spark = new SparkMD5()
spark.append('Hi')
spark.append(' ')
spark.append('there')

const hexHash = spark.end()
console.log(hexHash)
// d9385462d3deff78c352ebb3f941ce12
```

