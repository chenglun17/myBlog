# Ajax、Axios、Fetch 区别

- 传统的 ajax 利用的是 `XMLHttpRequest` 这个对象，和后端进行交互。`JQuery ajax` 是对原生 `XHR` 的封装，多请求间有嵌套的话就会出现回调地狱的问题。
- axios 使用 `promise` 封装 xhr，解决了回调地狱问题
- fetch 不是 `XMLHttpRequest`，fetch 是原生的 js，使用的是 `promise`。

 [前端面试题集锦之 Ajax、Axios、Fetch 篇](https://blog.csdn.net/XH_jing/article/details/119533597)

[Web前端面试](https://vue3js.cn/interview)