# 其他疑问

## scss 变量自动导入

在**`src/styles/var.scss`**文件下

```scss
$xtxColor: #27ba9b;
$helpColor: #e26237;
$sucColor: #1dc779;
$warnColor: #ffb302;
$priceColor: #cf4444;
```

在**`vite.config.js`**文件下

```js
css: {
    preprocessorOptions: {
        scss: {
            // 2.自动导入定制化样式文件进行样式覆盖
            additionalData: `
            @use "@/styles/element/index.scss" as *;
            @use "@/styles/var.scss" as *;
        `,
        }
    }
}
```

## SKU的概念

**存货单位（stock keeping unit）**，也翻译为库存单元，是一个会计学名词，定义为**库存管理中的最小可用单位**，例如纺织品中一个SKU通常表示规格、颜色、款式，而在连锁零售门店中又称单品为一个SKU

SKU组件的作用：产出当前用户选择的商品规格，为加入购物车操作提供数据信息

实际工作中，经常会遇到别人写好的组件，熟悉一个三方组件，首先重点看是什么？

> **props** 和 **emit**，props 决定了当前组件接收什么数据，emit 决定了会产出什么数据