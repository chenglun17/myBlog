# RESTful API

## :star:基本概念

REST即**表述性状态传递**（Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。

表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。

REST 通常基于使用 HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。

需要注意的是，REST是设计风格而不是标准。



## :star:什么是 RESTful

基于 REST 架构的 Web Services 即是 RESTful。

RESTful 是一种以资源为中心的 Web 软件架构风格，可以用`Ajax`和`RESTful web`服务构建应用。

- `Resources`(资源)：使用`URI`指向一个实体
- `Representation`(表现层)：资源的表现形式，比如图片、`HTML`文本等
- `State Transer`(状态转化)：`HTTP`动词来操作资源，实现资源状态的改变

> - URI（统一资源标识符）：可以唯一标识一个资源
> - URL（统一资源定位符）：可以提供找到某个资源的路径，比如平时最常见的网址：
>
> 一般一个URL也是一个URI，比如上面的网址，即URL可以看做是URI的子集，在图书领域中一本书都有唯一的一个isbn编号，这个编号其实也是URI。

RESTful 风格的 API 接口：

- 通过`HTTP`的`GET`/`POST`/`PUT`/`DELETE` 方法来 获取/新建/更新/删除 资源
- 一般使用`JSON`格式返回数据
- 一般`web`框架都有相应的插件支持`RESTful API`

------

以 WebService 为例通俗解释：

**非 Rest 设计，以往我们都会这么写：**

- http://localhost:8080/admin/getUser （查询用户）
- http://localhost:8080/admin/addUser （新增用户）
- http://localhost:8080/admin/updateUser （更新用户）
- http://localhost:8080/admin/deleteUser （删除用户）

总结：以不同的URL（主要为使用动词）进行不同的操作。

**Rest 架构：**

- GET http://localhost:8080/admin/user （查询用户）
- POST http://localhost:8080/admin/user （新增用户）
- PUT http://localhost:8080/admin/user （更新用户）
- DELETE http://localhost:8080/admin/user （删除用户）

总结：<strong style="color:#DD5145">用 URL 定位资源、用 HTTP 方法动词（GET、POST、PUT、DELETE）描述操作</strong>。



## :star:为什么需要 RESTful

- URL具有很强可读性的，具有自描述性
- 规范化请求过程和返回结果
- 资源描述与视图的松耦合
- 可提供OpenAPI，便于第三方系统集成，提高互操作性
- 提供无状态的服务接口，降低复杂度，可提高应用的水平扩展性



## :star:RESTful 设计原则

RESTful 架构的六个指导原则或约束是：

**统一接口**

REST由四个接口约束定义：

- 资源识别;
- 通过陈述来处理资源;
- 自我描述性的信息;
- 超媒体作为应用程序状态的引擎。

**客户端-服务器模式**

通过将用户接口问题与数据存储问题分开，我们通过简化服务器组件来提高跨多个平台的用户接口的可移植性并提高可伸缩性。

**无状态**

从客户端到服务器的每个请求都必须包含理解请求所需的所有信息，并且不能利用服务器上任何存储的上下文。因此，会话状态完全保留在客户端上。

**可缓存**

缓存约束要求将对请求的响应中的数据隐式或显式标记为可缓存或不可缓存。如果响应是可缓存的，则客户端缓存有权重用该响应数据以用于以后的等效请求。

**分层系统**

客户端通常无法判断它是直接连接到终端服务器，还是中间服务器。 中间服务器可以通过启用负载平衡和提供共享缓存来提高系统可伸缩性。 Layers 也可以实施安全策略。

**按需编码（可选）**

允许通过以小程序或脚本的形式下载和执行代码来扩展客户端功能。这通过减少预先实现所需的功能数量来简化客户端。



## :star:RESTful 如何设计

| HTTP方法 | URL                                     | 动作                   |
| -------- | --------------------------------------- | ---------------------- |
| GET      | `http://[hostname]/api/users`           | 检索用户列表           |
| GET      | `http://[hostname]/api/users/[user_id]` | 检索单个用户           |
| POST     | `http://[hostname]/api/users`           | 创建新用户             |
| PUT      | `http://[hostname]/api/users/[user_id]` | 更新用户信息(全部字段) |
| PATCH    | `http://[hostname]/api/users/[user_id]` | 更新用户信息(部分字段) |
| DELETE   | `http://[hostname]/api/users/[user_id]` | 删除用户信息           |

【PATCH】一般不用，用【PUT】

**1. 版本号**

命名版本号可以解决版本不兼容问题，在设计 RESTful API 的一种实用的做法是使用版本号。一般情况下，我们会在 url 中保留旧版本号，并同时兼容多个版本。

- 【GET】 /v1/users/{user_id} // 版本 v1 的查询用户列表的 API 接口
- 【GET】 /v2/users/{user_id} // 版本 v2 的查询用户列表的 API 接口

**2. 资源路径**

URI 不能包含动词，只能是名词（命名名词的时候，要使用小写、数字及下划线来区分多个单词）。

**3. 请求方式**

以下为 REST 基本架构的四个 HTTP 方法：

- **GET** - 用于获取数据。
- **PUT** - 用于更新或添加数据。
- **DELETE** - 用于删除数据。
- **POST** - 用于添加数据。

**4. 查询参数**

RESTful API 接口应该提供参数，过滤返回结果。

【GET】 `/{version}/{resources}/{resource_id}?offset=0&limit=20`

**5. 响应参数**

JSON格式（code、data、msg）

**6. 状态码**





## :page_facing_up:参考

[RESTful 中文网](http://restful.p2hp.com/)、[Rest 简介博客园](https://www.cnblogs.com/loveis715/p/4669091.html)、[Rest 知乎](https://www.zhihu.com/question/28557115)、[菜鸟教程](https://www.runoob.com/nodejs/nodejs-restful-api.html)

[参考文章](https://blog.csdn.net/a2398936046/article/details/124764479)、[参考文章](https://blog.csdn.net/u014257214/article/details/117755597)、[参考文章](https://blog.csdn.net/weixin_45297286/article/details/123037327)、[参考文章](https://blog.csdn.net/qq_41378597/article/details/85248848)、[参考文章](https://blog.csdn.net/qq_16488989/article/details/108640322)

