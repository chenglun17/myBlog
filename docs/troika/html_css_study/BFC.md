# BFC

## BFC 是什么

**`BFC`** 全称：**`Block Formatting Context`**， 名为 **“块级格式化上下文”**。

`W3C`官方解释为：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

简单来说就是，`BFC`是一个**完全独立的布局环境**，`BFC`**内部的元素布局与外部互不影响**。

那么怎么使用`BFC`呢，`BFC`可以看做是一个`CSS`元素属性

## 怎样触发 BFC

这里简单列举几个触发`BFC`使用的`CSS`属性

- 设置浮动
- overflow 设置为 auto、scroll、hidden
- positon 设置为 absolute、fixed
- display 设置为 flex、inline-block、table-cell

## BFC 的应用

- 自适应多栏布局
- 防止外边距折叠
- 清除浮动

## 介绍下 BFC、IFC、GFC 和 FFC

- *BFC*：块级格式上下文，指的是一个独立的布局环境，*BFC* 内部的元素布局与外部互不影响。
- *IFC*：行内格式化上下文，将一块区域以行内元素的形式来格式化。
- *GFC*：网格布局格式化上下文，将一块区域以 *grid* 网格的形式来格式化
- *FFC*：弹性格式化上下文，将一块区域以弹性盒的形式来格式化

## 参考

[参考文章](https://blog.csdn.net/weixin_44165167/article/details/115617978)、[参考文章2](https://juejin.cn/post/7098689890933538853#heading-3)、[参考文章3](https://juejin.cn/post/6960866014384881671)