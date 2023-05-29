# CSS

## vertical-align

用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

- **baseline（默认值）**：元素放置在父元素的基线上
- top：把元素的顶端与行中最高元素的顶端对齐
- middle：把此元素放置在父元素的中部 
- bottom：把元素的顶端与行中最低的元素的顶端对齐

使用场景：将图片或表单元素（行内块）和文字垂直居中。即 `vertical-align:middle`。

![](CSSNotes.assets/vertical-align.png)

baseline 都是谁呢？

- 文本的 baseline 是字母 x 的下方
- inline-block 默认的 baseline 是 margin-bottom 的底部（没有，则是盒子的底部）
- inline-block 有文本时，baseline 是最后一行文本的字母 x 的下方