# FormData

[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData) 提供了一种**表单数据的键值对**的构造方式，可以将数据通过`XMLHttpRequest.send()`方法发送出去。

如果送出时的编码类型被设为 `"multipart/form-data"`，它会使用和表单一样的格式。

如果你想构建一个简单的`GET`请求，并且通过`<form>`的形式带有查询参数，可以将它直接传递给`URLSearchParams`。

> **`URLSearchParams`** 接口定义了一些实用的方法来处理 URL 的查询字符串。
>
> 一个实现了 `URLSearchParams` 的对象可以直接用在 `for...of` 结构中

实现了`FormData` 接口的对象可以直接在`for...of`结构中使用。



## 构造函数

`FormData()`构造函数用于创建一个新的 FormData 对象。

```js
var formData = new FormData(form)
```

- form，可选，一个 HTML 上的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)表单元素——当指定了，这种方式创建的`FormData`对象会自动将 form 中的表单值也包含进去，包括文件内容也会被编码之后包含进去。

## 实例方法

### append方法

通过`append(key,value)`来**添加数据**，如果指定的key不存在则会新增一条数据，如果key存在，则追加到数据末尾。

`FormData.set`和 `append()` 的区别在于，如果指定的键已经存在，`FormData.set` 会使用新值覆盖已有的值，而 `append()` 会把新值添加到已有值集合的后面。

这个方法有两个版本：一个有两个参数的版本和一个有三个参数的版本。

```js
formData.append(name, value);
formData.append(name, value, filename);
```

- name：`value`中包含的数据对应的表单名称
- value：表单的值。可以是`USVString` 或 `Blob` (包括子类型，如 `File`)
- filename，可选：传给服务器的文件名称 (一个 `USVString`)，当一个 `Blob` 或 `File` 被作为第二个参数的时候， `Blob` 对象的默认文件名是 "blob"。 `File` 对象的默认文件名是该文件的名称。



### delete方法

`FormData.delete()`

从 FormData 对象里面删除一个键值对。

### entries方法

`FormData.entries()`

返回一个包含所有键值对的`iterator`对象。

### get / getAll方法

`FormData.getAll()`

返回一个包含 `FormData` 对象中与给定键关联的所有值的数组。

### has方法

`FormData.has()`

返回一个布尔值表明 `FormData` 对象是否包含某些键。

### kyes方法

`FormData.values()`

返回一个包含所有值的[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)对象。

### set方法

`FormData.set()`

给 `FormData` 设置属性值，如果`FormData` 对应的属性值存在则覆盖原值，否则新增一项属性值。

### values方法



## 参考

[参考文章](https://blog.csdn.net/weixin_46058921/article/details/122387516)