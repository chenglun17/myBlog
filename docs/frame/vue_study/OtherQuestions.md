# 其他疑问

## 无法启动和打包

[参考文章](https://blog.csdn.net/qq_17627195/article/details/129060112)

**node版本18以后无法启动和打包**

**报错：** `digital envelope routines::unsupported`

**原因：** `node.js V17`版本中最近发布的`OpenSSL3.0`, 而`OpenSSL3.0`对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成一些影响。故此以前的项目在升级 `nodejs` 版本后会报错

**解决方法：**在 `package.json` 里，命令前添加 **`SET NODE_OPTIONS=--openssl-legacy-provider`**

```json
"scripts": {
    "start": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
    "serve": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
    "build": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build"
  },
```

## 运行时自动打开页面

若想实现项目运行完自动打开页面，需做如下配置：在 `package.json`中添加 `--open`

```json
"scripts": {
    "serve": "vue-cli-service serve --open",
},
```

