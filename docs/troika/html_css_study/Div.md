# Div

## 块级元素的高度

- 没有内容，div 就没有高度
- 有内容，div 内容撑起来的高度

当前 box 会有高度，由内容撑起来的，本质上是内容的行高撑起来的

```html
<style>
    .box {
        background-color: orange;
    }
</style>

<div class="box">我是div元素</div>
```

行盒（inline box），作用：将当行里面所有的内容都包裹在一起。



## div 居中方法

### 1.绝对定位居中

第一种

```css
.box {
    width: 300px;
    height: 300px;
    background-color: orange;
    position: absolute;	// 子绝父相
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

第二种

```css
.box {
    width: 300px;
    height: 300px;
    background-color: orange;
    position: absolute;	// 子绝父相
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### 2.flex水平垂直居中

```css
.box {
    width: 600px;
    height: 600px;
    background-color: #999;
    display: flex;
    justify-content: center;
    align-items: center;

}

.son {
    width: 300px;
    height: 300px;
    background-color: orange;
}
```

