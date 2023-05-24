

# 四、疑难杂症

## Tortoisegit 执行报错

[参考文章](https://blog.csdn.net/m0_64280701/article/details/121892187)、[参考文章2](https://blog.csdn.net/weixin_46251501/article/details/120236413)、[参考文章3](https://blog.csdn.net/witton/article/details/129734545)、[参考文章4](https://blog.csdn.net/qq_33930506/article/details/129392038)、

**Tortoisegit 执行操作，报错 Could not get HEAD hash**，也会导致 Tortoisegit 没有红色、绿色勾勾的问题

在未显示文件夹执行以下命令

```sh
git config --global --add safe.directory "*"
```

