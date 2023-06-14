# 媒体查询

媒体查询是CSS3提供的一种给开发者针对**不同设备需求**进行**定制化开发**的一个接口。

可以根据设备的类型（屏幕设备、打印机设备）或特定的特性（屏幕的宽度）来修改页面。

## 媒体查询的使用

媒体查询的使用方式主要有三种：

- 通过`@media`和`@import`使用不同的CSS规则（常用）

```html
<style>
    @media (max-width: 500px) {
        body {
            background-color: orange;
        }
    }
</style>
```

@import

```html
<style>
    /* @import是可以和媒体查询结合来使用（屏幕宽度小于500px才有背景颜色） */
    @import url(./body_bgc.css) (max-width: 500px);
</style>
```

- 使用`media`属性为`<style>、<link>、<source>`和其他HTML元素指定特定的媒体类型

```html
<link rel="stylesheet" href="./body_bgc.css" media="(max-width: 500px)">
```

- 使用`Window.matchMedia()`和`MediaQueryList.addListener()`方法来监听媒体状态



## 媒体类型（Media Type）

在使用媒体查询时，必须指定要使用的媒体类型。

- 媒体类型是可选的，不写默认应用 all 类型

- 常见的媒体查询类型：

  `all`：适用于所有设备

  `print`：适用于在打印预览模式下的屏幕上查看文档

  `screen`：主要用于屏幕

  `speech`：主要用于语言合成器



## 媒体特性（Media Features）

媒体特性描述了浏览器、输出设备或是预览环境的具体特征

- 通常会将媒体特性描述为一个表达式
- 每条媒体特性表达式都<strong style="color:#DD5145">必须用括号括起来</strong>

| 特性                         | 值                    | 最小/最大 | 描述               |
| ---------------------------- | --------------------- | --------- | ------------------ |
| 宽度 width                   | 长度                  | yes       | 渲染表面的宽度     |
| 高度 height                  | 长度                  | yes       | 渲染表面的高度     |
| 颜色 color                   | 整数                  | yes       | 每个颜色分量的位数 |
| 设备比例 device-aspect-ratio | 整数                  | yes       | 长宽比             |
| 设备宽度 device-width        | 长度                  | yes       | 输出设备的宽度     |
| 设备高度 device-height       | 长度                  | yes       | 输出设备的高度     |
| 方向 orientation             | portrait \| landscape | no        | 屏幕方向           |
| 分辨率 resolution            | dpi \| dpcm \| dppx   | yes       | 解析度             |



## 逻辑操作符（logical operators）

媒体查询的表达式最终会获得一个Boolean值，也就是真（true）或假（false）

- 如果结果为 true，那么就会生效
- 如果结果为 false，那么就不会生效

如果有多个条件，我们可以通过逻辑操作符结合媒体查询：

- `and`：用于将多个媒体查询规则组合成单条媒体查询
- `not`：用于否定媒体查询，如果不满足这个条件则返回true，否则返回false
- `only`：仅在整个查询匹配时才用于应用样式
- `,`(逗号)：用于多个媒体查询合并为一个规则

```html
<style>
    /* 屏幕宽度小于600px，大于400px才有背景颜色） */
    @media (min-width : 400px) and (max-width: 600px) {
        body {
            background-color: orange;
        }
    }
</style>
```



## 例子

```html
<style>
    /*
    320~375之间 font-size: 15px;
    375~414之间 font-size: 18px;
    414~480之间 font-size: 21px;
    大于480px font-size: 24px;
    */
    @media (min-width : 320px) and (max-width: 375px) {
        .box { font-size: 15px; }
    }

    @media (min-width : 375px) and (max-width: 414px) {
        .box { font-size: 18px; }
    }

    @media (min-width : 414px) and (max-width: 480px) {
        .box { font-size: 21px; }
    }

    @media (min-width : 480px) {
        .box { font-size: 24px; }
    }
</style>
```

等同于

```html
<style>
    /* CSS层叠性 */
    @media (min-width : 320px) {
        .box { font-size: 15px; }
    }

    @media (min-width : 375px) {
        .box { font-size: 18px; }
    }

    @media (min-width : 414px) {
        .box { font-size: 21px; }
    }

    @media (min-width : 480px) {
        .box { font-size: 24px; }
    }
</style>
```







