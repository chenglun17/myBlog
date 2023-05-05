

# 准备工作

## json-server的介绍与服务搭建

> - [json-server 详解](https://blog.csdn.net/namechenfl/article/details/120885849)
> - [github—json-server](https://github.com/typicode/json-server)

1. 作为一个前端开发工程师，在后端还没有ready的时候，不可避免的要使用 mock 的数据。很多时候，我们并不想使用简单的静态数据，而是希望自己起一个本地的 mock-server 来完全模拟请求以及请求回来的过程。

   json-server 是一个很好的可以替我们完成这一工作的工具。我们只需要提供一个 json 文件，或者写几行简单的 js 脚本就可以模拟出 RESTful API 的接口。

2. 安装 json-server

   ```sh
   npm install -g json-server
   ```

3. 创建 db.json 在一个文件夹下新建一个 db.json 文件

   ```javascript
   {
     "posts": [
       { "id": 1, "title": "json-server", "author": "typicode" }
     ],
     "comments": [
       { "id": 1, "body": "some comment", "postId": 1 }
     ],
     "profile": { "name": "typicode" }
   }
   ```

   在该文件目录下运行：**`json-server --watch db.json`** 这是对数据的获取

