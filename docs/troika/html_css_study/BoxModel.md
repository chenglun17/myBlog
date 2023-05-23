# 盒子模型

- 一个盒子我们会分成几个部分：

  **内容区(content)**、**内边距(padding)**、**边框(border)**、**外边距(margin)**

- 盒子模型分为标准盒子模型和IE盒子模型

  标准盒子模型：宽度 = 内容的宽度（content）+ border + padding + margin

  低版本IE盒子模型：宽度 = 内容的宽度（content + padding + border）+ margin

- 可以通过 **`box-sizing`** 来改变元素的盒模型：

- **`box-sizing: content-box`** ：标准盒模型（默认值）

  - **`box-sizing: border-box`** ：IE（替代）盒模型

<img src="BoxModel.assets/盒子模型.png" alt="盒子模型" style="zoom:67%;" />

- **`border : <宽度> <线条图案> <颜色>;`**，例如 **`border: 1px solid orange;`**

> - 1px代表的是边框线的宽度
> - solid代表的是边框为实线；dashed虚线、dotted点划线、none不显示
> - orange代表的是边框线的颜色，这里的颜色也可以是rgba(114, 255, 96, 0.5)，0.5是颜色的透明度；

- **margin**是用来隔开**元素与元素的间距**；**padding**是用来隔开**元素与内容的间隔**。

- 使用 **margin、padding简化** 写法注意事项：

> - 如果只提供一个，将用于全部的四边。 
> - 如果提供两个，第一个用于**上、下**，第二个用于**左、右**。 
> - 如果提供三个，第一个用于**上**，第二个用于**左、右**，第三个用于**下**。 
> - 如果提供全部四个参数值，将按<strong style="color:#DD5145">上、右、下、左</strong>的顺序（顺时针方向）作用于四边。 