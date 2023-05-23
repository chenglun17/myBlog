# Display属性的值

- `CSS` 属性值 `display` 为 `inline`，`inline-block`，`inline-table` 时，它就是<strong style="color:#DD5145">行内元素</strong>
- `CSS` 属性值 `display` 为 `block`，`list-item`，`table` 时，它就是<strong style="color:#32CD32">块级元素</strong>

> - none --隐藏
> - <strong style="color:#DD5145">inline（默认）</strong>：设置元素为行内元素，一行可有多个行内块元素，**不可设宽高**
> - <strong style="color:#DD5145">inline-block</strong>：设置元素为行内块元素，既有行内元素的（一行可有多个）特性，又有块元素的（可设宽高）特性
> - <strong style="color:#DD5145">inline-table</strong>：得到的是，外面是“内联盒子”，里面是“table盒子”
> - <strong style="color:#32CD32">block</strong>：设置元素为块级元素，块级元素可以独占一行，可设宽高
> - <strong style="color:#32CD32">list-item</strong>：指定对象为列表项目，为元素内容生成一个块型盒，随后再生成一个列表型的行内盒
> - <strong style="color:#32CD32">table</strong>：指定对象作为块级元素的表格。类同于html标签table
> - flex：将对象作为弹性伸缩盒显示