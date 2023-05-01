# flex布局

## 1.0传统布局和flex布局对比

### 1.1传统布局

+ 兼容性好
+ 布局繁琐
+ 局限性，不能再移动端很好的布局

### 1.2 flex布局

+ 操作方便，布局极其简单，移动端使用比较广泛
+ pc端浏览器支持情况比较差
+ IE11或更低版本不支持flex或仅支持部分

### 1.3 建议

+  如果是pc端页面布局，还是采用传统方式
+ 如果是移动端或者是不考虑兼容的pc则采用flex

## 2.0 flex布局原理

+ flex 是 flexible Box 的缩写，意为<strong style="color:#DD5145">"弹性布局"</strong>，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 flex 布局。

+ 当我们为父盒子设为 flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。

+ flex布局又叫 **伸缩布局** 、**弹性布局** 、**伸缩盒布局** 、**弹性盒布局** 

+ 采用 Flex 布局的元素，称为 **Flex 容器（flex container）**，简称 "**容器**"。

  它的所有子元素自动成为容器成员，称为 **Flex 项目（flex item）**，简称 "**项目**"。

**总结**：就是通过给父盒子添加**`flex`**属性，来控制子盒子的位置和排列方式

<img src="flex布局.assets/image-20230427212924154.png" alt="image-20230427212924154" style="zoom:50%;" />

## 3.0 父项常见属性

+ **`flex-direction`**：设置<strong style="color: #DD5145">主轴</strong>的**方向**
+ **`justify-content`**：设置<strong style="color: #DD5145">主轴</strong>上的**子元素排列方式**
+ **`flex-wrap`**：设置子元素是否换行
+ **`align-items`**：设置<strong style="color: #32CD32">侧轴</strong>上的子元素排列方式（单行）
+ **`align-content`**：设置<strong style="color: #32CD32">测轴</strong>上的子元素的排列方式（多行）
+ **`flex-flow`**：复合属性，相当于同时设置了 **`flex-direction`** 和 **`flex-wrap`**

### 3.1 flex-direction 属性⭐️

+ flex-direction 设置主轴的方向
+ 在 flex 布局中，是分为主轴和侧轴两个方向，同样的叫法有 ： 行(row) 和 列(column)、x 轴和 y 轴
+ <strong style="color:#DD5145">默认主轴</strong> 方向就是 x 轴方向，<strong style="color:#DD5145">水平向右</strong>，子元素是跟着<strong style="color:#DD5145">主轴</strong>来排列的
+ <strong style="color:#32CD32">默认侧轴</strong> 方向就是 y 轴方向，<strong style="color:#32CD32">水平向下</strong>

<img src="flex布局.assets/1.jpg" style="zoom: 67%;" >

+ 注意： 主轴和侧轴是会变化的，就看 flex-direction 设置谁为主轴，剩下的就是侧轴。

  <img src="flex布局.assets/2.jpg" style="zoom: 80%;" >

  

### 3.2 justify-content 属性⭐️

- **`justify-content`**设置子元素在<strong style="color:#DD5145">主轴</strong>（默认是x轴）上的排列方式

- 注意：使用这个属性之前一定要先确定好主轴是哪一个

<img src="flex布局.assets/3.jpg" style="zoom: 75%;" >



### 3.3 flex-wrap 属性⭐️

+ **`flex-wrap`** 属性设置是否换行，默认是<strong style="color:#DD5145">不换行</strong>的，项目都排在一条线（又称”轴线”）上，如果装不下，会缩小子元素的宽度。
+ **`nowrap`** 不换行
+ **`wrap`** 换行

### 3.4 align-items 属性⭐️

+ **`align-items`** 设置子元素在 <strong style="color:#32CD32">侧轴</strong>（默认是y轴）上的排列方式  在子元素为单项（<strong style="color:#32CD32">单行</strong>）的时候使用
+ **`flex-start`** 从头部开始
+ **`flex-end`** 从尾部开始
+ **`center`** 居中显示
+ **`stretch`** 拉伸

<img src="flex布局.assets/image-20230427221753785.png" alt="image-20230427221753785" style="zoom: 60%;" />



### 3.5 align-content 属性⭐️

- **`align-content`** 设置子元素在 <strong style="color:#32CD32">侧轴</strong>（默认是y轴）上的排列方式，且只能用于子项 <strong style="color:#32CD32">换行</strong> 的情况（<strong style="color:#32CD32">多行</strong>），**在单行下是没有效果的**。

<img src="flex布局.assets/4.jpg" style="zoom:85%;" >



### 3.6 align-items 和 align-content 区别

+ align-items 适用于<strong style="color:#32CD32">单行</strong>情况下， 只有上对齐、下对齐、居中和 拉伸
+ align-content 适应于<strong style="color:#32CD32">换行（多行）</strong>的情况下（单行情况下无效），可以设置 上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值。 
+ 总结：**单行找 align-items，多行找 align-content**

### 3.7 flex-flow 属性

**`flex-flow`** 属性是 **`flex-direction`** 和 **`flex-wrap`** 属性的复合属性

- 把设置主轴方向和是否换行（换列）简写

```css
div {
    flex-flow: row wrap;
}
```

## 4.0 子项常见属性

+ **`flex`** 子项目占的份数
+ **`align-self`** 控制子项自己在侧轴的排列方式
+ **`order`** 属性定义子项的排列顺序（前后顺序）

### 4.1  flex 属性⭐️

**`flex`** 属性定义子项目<strong style="color:#7B68EE">分配剩余空间</strong>，用 flex 来表示占多少<strong style="color:#7B68EE">份数</strong>。

```css
.item {
    flex: <number>; /* 默认值 0 */
}
```

### 4.2 align-self 属性

**`align-self`** 控制子项自己在侧轴上的排列方式，允许单个项目在<strong style="color:#32CD32">侧轴</strong>上与其他项目不一样的对齐方式，可覆盖 **`align-items`** 属性。

默认值为 **`auto`**，表示继承父元素的 **`align-items`** 属性，如果没有父元素，则等同于 **`stretch`**。

````css
span:nth-child(2) {
      /* 设置自己在侧轴上的排列方式 */
      align-self: auto(默认值) | flex-start | flex-end | center | baseline | stretch;
}
````

其中：

```
1. auto 表示继承容器的 align-items 属性。（默认值）
2. flex-start 沿着交叉轴方向 起点 对齐（默认值）。
3. flex-end 沿着交叉轴方向 结尾 对齐。
4. center 沿着交叉轴方向 居中 对齐。
5. baseline 沿着交叉轴方向，按照项目内的文字对齐。
6. stretch 沿着交叉轴方向自动进行拉升到最大。
```

### 4.3 order 属性

order 属性定义项目的排列顺序，<strong style="color:#7B68EE">数值越小，排列越靠前</strong>，默认为0。

注意：和 z-index 不一样。

```css
.item {
    order: <number>;
}
```

## 5.0 携程网首页案例制作

携程网链接：http://m.ctrip.com

1.技术选型

方案：我们采取单独制作移动页面方案

技术：布局采取flex布局

2.搭建相关文件夹

<img src="flex布局.assets/5.jpg" style="zoom:50%;" >

3.设置视口标签以及引入初始化样式

```html
<meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/index.css">
```

4.常用初始化样式

```css
body {
  max-width: 540px;
  min-width: 320px;
  margin: 0 auto;
  font: normal 14px/1.5 Tahoma,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,hei;
  color: #000;
  background: #f2f2f2;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}
```

5.模块名字划分

<img src="flex布局.assets/6.jpg" style="zoom:80%;" >













 

