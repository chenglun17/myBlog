# Position定位

- 标准流布局
- 相对定位
- 固定定位
- 绝对定位
- 粘性定位
- z-index：只对定位元素有效

CSS 页面布局技术允许我们拾取网页中的元素，并且控制它们相对普通布局流（标准流）、周边元素、父容器或者主视口/窗口的位置。

技术布局从宏观上来说是受定位方案影响，定位方案包括：



## 标准流布局

默认情况下，元素都是按照**普通流（Normal Flow，也叫文档流，标准流布局）**进行排布的。

- 从左到右、从上到下按顺序排列
- 默认情况下，相互之间不存在层叠现象

在标准流中，可以使用`margin`、`padding`对元素进行定位，其中`margin`还可以设置为负数。

缺点：

- 设置一个元素的`margin`或`padding`，通常会**影响到标准流中其他元素**的定位效果
- 不便于实现元素层叠的效果

如果想要一个元素<strong style="color:#DD5145">脱离标准流</strong>，单独的对某一个元素进行定位：

- 我们可以使用`position`属性来进行设置

标准流有以下特性：

- 标准流中，所有的盒一个接一个排列
- `BFC` 中，盒子会**竖着**排列
- `IFC` 中，盒子会**横着**排列
- 静态定位中（`position` 为 `static`），盒的位置就是标准流里布局的位置
- 相对定位中（`position` 为 `relative`），盒的偏移位置由 `top`，`right`，`bottom`，`left` 定义， <br>**即使有偏移，仍然保留原有的位置，其它普通流不能占用这个位置**



## 定位技术（Position）

定位允许您从正常的标准流布局中取出元素，并使他们具有不同的行为：

- 例如，让在另一个元素的上面
- 或者，始终保持在浏览器视口内的同一位置

利用`position`可以对元素进行定位，有四种：**静态定位**，**相对定位**，**绝对定位**，**固定定位**。

- **static**（默认）：按照正常标准流进行排列，top, bottom, left, right 没有任何作用



### relative（相对定位）

元素不脱离标准流，定位参照对象是<strong style="color:#DD5145">元素自己原来的位置</strong>，可以通过 top, bottom, left, right 定位。

在不影响其他元素位置的前提下，对当前元素位置进行微调。

```html
<style>
    .box {
        font-size: 20px;
    }

    span {
        font-size: 12px;
        position: relative;
        bottom: 8px;
    }
</style>

<div class="box">
    3<span>2</span> + 2<span>2</span> = 13
</div>
```

结果：

![](Position.assets/image-20230613193748310.png)



### absolute（绝对定位）

元素<strong style="color:#DD5145">脱离标准流</strong>，参考距其最近一个不为`static`的父级元素通过 top, bottom, left, right 定位。

定位参照对象是<strong style="color:#DD5145">最邻近的祖先并且是一个定位元素</strong>，如果找不到这样的祖先元素，参考对象是**视口（viewport）**。

定位元素（positioned element），position值不为static的元素，即为relative、absolute、fixed的元素。

故**子绝父相**，祖先元素设置`position: relative;`，因为relative不会脱离标准流。



### fixed（固定定位）

元素<strong style="color:#DD5145">脱离标准流</strong>，可以通过 top, bottom, left, right 定位，当画布滚动时，固定不动。

与绝对定位方案类似，唯一的区别在于，定位参照对像是**视口（viewport）**



### sticky（粘性定位）

CSS3 新增的，设置了 sticky 值后，在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置是 top、left 等属性无效），<br>当该元素的位置将要移出偏移范围时，定位又会变成 fixed，根据设置的 top、left 等属性形成固定位置的效果









## 绝对定位元素

绝对定位元素（即`position`设置为absolute / fixed）的特点：

- 可以随意设置宽高，宽高默认由内容决定
- 不再受标准流的限制
  - 不再严格按照从上到下、从左到右排布
  - 不再严格区分块级(block)、行内级(inline)、行内块级（inline-block）的很多特性都会消失
- 不再给父元素汇报宽高数据
- 脱标元素的内容默认还是按照标准流布局

|          | 脱离标准流 | 定位元素 | 绝对定位元素       | 定位参照对象                                           |
| -------- | ---------- | -------- | ------------------ | ------------------------------------------------------ |
| static   | ❌          | ❌        | ❌                  | ❌                                                      |
| relative | ❌          | ✔️        | ❌                  | 元素自己原来的位置                                     |
| absolute | ✔️          | ✔️        | :heavy_check_mark: | 最邻近的祖先并且是一个定位元素<br>如果找不到，则为视口 |
| fixed    | ✔️          | ✔️        | ✔️                  | 视口                                                   |



对于绝对定位元素来说：

<strong style="color:#DD5145">定位参照对象的宽度 = left + right + margin-left + margin-right + 绝对定位元素的实际占用宽度</strong>

<strong style="color:#DD5145">定位参照对象的高度 = top + bottom + margin-top + margin-bottom + 绝对定位元素的实际占用高度</strong>

```html
<style>
    .container {
        width: 600px;
        height: 300px;
        background-color: #999;
        position: relative;
    }

    .box {
        /* width: 600px; */
        /* width: 100%; */
        height: 200px;
        background-color: orange;
 
        position: absolute;
        left: 0;
        right: 0;
    }
</style>

<div class="container">
    <div class="box">
    </div>
</div>
```

结果：

- container width = orange box width + left + right + margin-left + margin-right，（底层原理）
- 600 = auto(默认) + 0 + 0 + 0(默认) + 0(默认)，故 orange box width = 600px

![](Position.assets/image-20230613212056760.png)

```css
.box {
    width: 400px;
    height: 200px;
    background-color: orange;

    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
}
```

- 水平方向：600 = 400 + 0 +0 + auto + auto，实现水平居中（margin左右平分）

![](Position.assets/image-20230613213713503.png)

```css
.box {
    width: 400px;
    height: 200px;
    background-color: orange;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
```

- 垂直方向：300 = 200 + 0 +0 + auto + auto，水平+垂直实现居中（margin上下平分）

![](Position.assets/image-20230613213955618.png)





**2. 浮动（Float）**

- 浮动定位中，盒称为浮动盒（Floating Box）
- 盒位于当前行的开头或结尾
- 普通流会环绕在浮动盒周围，除非设置 `clear` 属性





## 参考

[参考文章](https://juejin.cn/post/6960866014384881671#heading-7)、[参考文章](https://juejin.cn/post/6960866014384881671#heading-10)