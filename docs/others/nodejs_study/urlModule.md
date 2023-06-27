# url 模块

## 基本概念

[url 模块](https://nodejs.cn/api/url.html)提供了一些实用函数，用于URL处理与解析。

引入模块：

```js
const url = require('url');
```

一个 URL 字符串是一个结构化的字符串，它包含多个有意义的组成部分。 当被解析时，会返回一个 URL 对象，它包含每个组成部分作为属性。

URL（Uniform Location Resource）翻译为“统一资源定位符”，也就是描述资源位置的固定表示方法。被URL描述的资源可以位于互联网上，也可以位于本地。



## URL 字符串和 URL 对象

网址字符串是包含多个有意义组件的结构化字符串。 解析时，将返回包含每个组件的属性的网址对象。

下面提供了 WHATWG 和旧版 API 之间的比较。 在网址 `'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'` 

上方显示的是由旧版 `url.parse()` 返回的对象的属性。 下方则是 WHATWG `URL` 对象的属性。

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.) 
```

WHATWG 网址的 `origin` 属性包括 `protocol` 和 `host`，但不包括 `username` 或 `password`。



## 基本使用

- `url.parse(urlString)`，字符串类型解析成对象
- `url.format(urlObject)`，对象类型转字符串
- `url.resolve(from,to)`，路径拼接

因为 node.js 的 url.parse() 采用的传统的 urlObject，不符合URL现存标准WHATWG URL API，因此**弃用**了（其余两个被标记为旧版）。

官方推荐可以使用URL类

### new URL()

```js
const http = require('http');
const url = require('url');

const str = 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4';
const urlObj = new URL(str);

console.log(urlObj);
console.log(urlObj.toString()); // 可以将实例解析为字符串url
```

打印结果为：

```
URL {
  href: 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4',
  origin: 'https://www.google.com:8080',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.google.com:8080',
  hostname: 'www.google.com',
  port: '8080',
  pathname: '/a/b',
  search: '?x=1&y=2&y=3&y=4',
  searchParams: URLSearchParams { 'x' => '1', 'y' => '2', 'y' => '3', 'y' => '4' },
  hash: ''
}

https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4
```

**URL对象中的成员如下：**

- href：未经解析的URL地址，都表示为小写
- origin：源地址，包含协议（protocol）、主机（host），例如 `'https://www.google.com:8080'`
- protocol：协议类型，表示为小写，如 `'https:'`
- username：用户名
- password：密码
- host：主机（包括端口），例如 `'www.google.com:8080'`
- hostname：主机名，例如 `'www.google.com'`
- port：端口号，例如 `8000`
- pathname：路径名，在主机名之后，查询语句之前的地址部分，包含‘/’，例如 `/a/b`
- search：URL地址的查询部分，包括开头的问号，例如 `'?x=1&y=2&y=3&y=4'`
- searchParams：URL地址查询参数的 [URLSearchParams](https://nodejs.cn/api/url.html#class-urlsearchparams) 对象，该属性是只读的
- hash：URL地址中 `'#'` 字符后的片段