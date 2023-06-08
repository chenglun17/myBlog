# Display属性

## :star:display 属性的值

CSS 属性值 `display` 为 `inline`，`inline-block`，`inline-table` 时，它就是<strong style="color:#DD5145">行内元素</strong>。

CSS 属性值 `display` 为 `block`，`list-item`，`table` 时，它就是<strong style="color:#32CD32">块级元素</strong>。

- none：隐藏
- <strong style="color:#DD5145">inline（默认）</strong>：设置元素为**行内元素**，一行可有多个行内块元素，**不可设宽高**
- <strong style="color:#DD5145">inline-block</strong>：设置元素为行内块元素，既有行内元素的（一行可有多个）特性，又有块元素的（可设宽高）特性
- <strong style="color:#DD5145">inline-table</strong>：得到的是，外面是“内联盒子”，里面是“table盒子”
- <strong style="color:#32CD32">block</strong>：设置元素为**块级元素**，块级元素可以**独占一行**，可设宽高
- <strong style="color:#32CD32">list-item</strong>：指定对象为列表项目，为元素内容生成一个块型盒，随后再生成一个列表型的行内盒
- <strong style="color:#32CD32">table</strong>：指定对象作为块级元素的表格。类同于 html 标签 table
- flex：将对象作为弹性伸缩盒显示



## :star:display: none、visibility: hidden、opacity: 0 有什么区别？

- 结构： 

  **`display:none`**，会让元素完全从渲染树中消失，渲染时不占据任何空间，不能点击。

  **`visibility:hidden`**，不会让元素从渲染树消失，渲染时仍占据空间，只是内容不可见，不能点击。

  **`opacity:0`**，不会让元素从渲染树消失，渲染时仍占据空间，只是内容不可见，可以点击。

- 继承： 

  **`display:none`** 和 **`opacity:0`**，是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 

  **`visibility:hidden`**，是继承属性，通过设置 **`visibility: visible`** 可以让子孙节点显式。

- 性能： 

  **`display:none`**，修改元素会造成**文档回流**，不能读取到 **`display:none`** 元素内容，性能消耗较大。

  **`visibility:hidden`**，修改元素只会造成**该元素重绘**，能读取到 **`visibility:hidden`** 元素内容，性能消耗较少。

  **`opacity:0`**，修改元素会造成**该元素重绘**，性能消耗较少。