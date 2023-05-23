# Div居中方法

## 1.绝对定位居中

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

## 2.flex水平垂直居中

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

