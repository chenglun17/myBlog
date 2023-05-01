#  第一部分 —— Git

##  Git基础概念

Git是一个免费的，开源的分布式版本控制软件系统

### 1.版本控制

一般情况下，一份文件，无论是DOC办公文档，还是编程源码文件，我们都会对文件进行大量的修改和变更。但是我们无法保证每一次的修改和变更都是正确并有效的，往往有的时候需要追溯历史操作，而版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

没有进行版本控制或者版本控制本身缺乏正确的流程管理，在软件开发过程中将会引入很多问题，如软件代码的一致性、软件内容的冗余、软件过程的事物性、软件开发过程中的并发性、软件源代码的安全性，以及软件的整合等问题。

### 2.分布式

在Git中，每个版本库都是一样重要得。所以就不存在像集中式版本控制软件中以谁为主得问题。任何一个库都可以当成主库。

这种方式可以更大限度地保证项目资源得安全。

### 3.系统

一般软件系统指的是可以独立运行的软件应用程序。而Git软件就是专门用于对代码文件进行版本控制得应用程序。同时也提供客户端对系统所管理得资源进行访问。

### 4.区域

Git 软件为了更方便地对文件进行版本控制，根据功能得不同划分了三个区域

- 存储区域：Git软件用于存储资源得区域。一般指得就是.git文件夹
- 工作区域：Git软件对外提供资源得区域，此区域可人工对资源进行处理。
- 暂存区：Git用于比对存储区域和工作区域得区域。Git根据对比得结果，可以对不同状态得文件执行操作。

## 基本使用

1. 安装（略）

2. 配置

   1. 配置 name 和 email

      ```shell
      git config --global user.name "xxxx"
      git config --global user.email "xxx@xxx.xxx"
      ```

3. 使用 git：

   - 查看当前仓库的状态

     ```shell
     git status
     ```

   - 初始化仓库

     ```shell
     git init
     ```

   - 文件状态：（刚刚添加到项目中的文件处于未跟踪状态）

     1. 未跟踪 untracked
     2. 已跟踪 track
     3. 暂存 
     4. 未修改 unstage
     5. 已修改 staged

   

   - 未跟踪 → 暂存

     ```shell
     git add <filename> 	将文件切换到暂存的状态
     git add * 	将所有已修改（未跟踪）的文件暂存
     ```

   - 暂存 → 未修改

     ```shell
     git commit -m "xxxx" 	将暂存的文件存储到仓库中
     git commit -a -m "xxxx"	 提交所有已修改的文件（未跟踪的文件不会提交）
     ```

   - 未修改 → 修改

     - 修改代码后，文件会变为修改状态

4. 常用的命令

   1. 重置文件

   ```bash
   git restore <filename> # 恢复文件
   git restore --staged <filename> # 取消暂存状态
   ```

   2. 删除文件

   ```bash
   git rm <filename> # 删除文件（已修改且未暂存的文件不允许删除）
   git rm <filename> -f # 强制删除
   ```

   3. 移动文件

   ```bash
   git mv from to # 移动文件 重命名文件
   git mv 1.txt 2.txt # 1.txt 重命名为 2.txt
   ```
   
   

##  分支

git 在存储文件时，每一次代码的提交都会创建一个与之对应的节点，git 就是通过一个一个的节点来记录代码的状态的。

节点会构成一个树状结构，树状结构就意味着这个树会存在分支，默认情况下仓库只有一个分支，命名为 master。

在使用 git 时，可以创建多个分支，分支与分支之间相互独立，在一个分支上修改代码不会影响其他的分支。

```bash
git branch # 查看当前分支
git branch <branch name> # 创建新的分支
git branch -d <branch name> # 删除分支
git switch <branch name> # 切换分支
git switch -c <branch name> # 创建 并切换分支
git merge <branch name> # 和并分支
```

> 在开发中，都是在自己的分支上编写代码，代码编写完成后，在将自己的分支合并到主分支中。



## 变基（rebase）

在开发中除了通过 **merge** 来合并分支外，还可以通过 **变基（rebase）** 来完成分支的合并。

我们通过 merge 合并分支时，在提交记录中会将所有的分支创建和分支合并的过程全部都显示出来。

当项目比较复杂，开发过程比较波折时，我必须要反复的创建、合并、删除分支。这样一来将会使得我们代码的提交记录变得极为混乱。

**原理（变基时发生了什么）：**

> 1. 当我们发起变基时，git 会首先找到两条分支的**最近的共同祖先**
> 2. **对比**当前分支相对于祖先的**历史提交**，并且将它们**提取**出来**存储**到一个**临时文件**中
> 3. 将当前部分**指向**目标的**基底**
> 4. 以**当前基底**开始，**重新执行**历史操作
>

```bash
git rebase master # 在需要变基的分支上执行，master为主分支
```

变基 和 merge 对于合并分支来说最终的结果是一样的！但是变基会使得代码的提交记录更整洁更清晰！

注意！大部分情况下合并和变基是可以互换的，但是如果分支已经提交给了远程仓库，那么这时尽量不要变基。



## 远程仓库（remote）

目前我对于 git 所有操作都是在本地进行的。在开发中显然不能这样的，这时我们就需要一个远程的 git 仓库。

远程的 git 仓库和本地的本质没有什么区别，不同点在于远程的仓库可以被多人同时访问使用，方便我们协同开发。

在实际工作中，git 的服务器通常由公司搭建内部使用或是购买一些公共的私有 git 服务器。

我们学习阶段，直接使用一些开放的公共 git 仓库。目前我们常用的库有两个：GitHub 和 Gitee（码云）

将本地库上传 GitHub：

```bash
git remote add origin https://github.com/lilichao/git-demo.git
# git remote add <remote name（远程库名字）> <url>
git branch -M main  # 修改分支的名字的为main
git push -u origin main  # git push 将代码上传 origin服务器上，本地分支main

# 自己的
git remote add origin https://github.com/MangoLeo5/git-demo.git
git branch -M main
git push -u origin main
```

将本地库上传 Gitee：

```bash
git remote add gitee https://gitee.com/ymhold/vue-course.git
git push -u gitee main

# 自己的
git remote add origin git@gitee.com:chenglun17/git-demo.git
git push -u origin "master"
```



## 远程库的操作的命令

```bash
git remote # 列出当前的关联的远程库
git remote add <远程库名> <url> # 关联远程仓库
git remote remove <远程库名>  # 删除远程库

git push -u <远程库名> <分支名> # 向远程库推送代码，并和当前分支关联
git push <远程库> <本地分支>:<远程分支> # 把本地的分支推送给远程的分支
git push # 后续直接push即可

git clone <url> # 从远程库下载代码
git clone <url> <重命名>

git push # 如果本地的版本低于远程库，push默认是推不上去
git fetch # 要想推送成功，必须先确保本地库和远程库的版本一致，fetch它会从远程仓库下载所有代码，但是它不会将代码和当前分支自动合并
		# 使用fetch拉取代码后，必须要手动对代码进行合并
git merge origin/master # 将当前分支和远程仓库（origin是在本地的名字）上的master分支合并
		 
git pull  # 从服务器上拉取代码并自动合并
# 图形化操作vscode会自动操作pull操作
```

> 注意：**推送代码之前，一定要先从远程库中拉取最新的代码**



## tag 标签

当头指针没有执行某个分支的头部时，这种状态我们称为**分离头指针（HEAD detached）**，HEAD指向谁就显示谁的代码

分离头指针的状态下，也可以操作操作代码，但是这些操作**不会出现在任何的分支上**，所以注意不要再分离头指针的状态下来操作仓库。

如果非得要回到后边的节点对代码进行操作，则可以选择**创建新分支后再操作**：

```bash
git switch -c <分支名> <提交id/节点> # 回到以前版本
```

可以为提交记录**设置标签**，设置标签以后，可以通过标签**快速识别**出不同的开发节点：

```bash
git tag
git tag <版本>
git tag <版本> <提交id>
git push <远程仓库> <标签名> # 推送标签
git push <远程仓库> --tags # 推送所有标签
git tag -d <标签名> # 删除标签
git push <远程仓库> --delete <标签名> # 删除远程标签
```

## gitignore

默认情况下，git 会监视项目中所有内容，但是有些内容比如 node_modules 目录中的内容，我们不希望它被 git 所管理。

我们可以在项目目录中添加一个`.gitignore`文件，来设置那些需要 git 忽略的文件。一行一个文件

```
# 提交时忽略此文件夹
node_modules	
package-lock.json
# 提交时忽略此以.log结尾的文件
*.log	
```



##  github 的静态页面

- 在 github 中，可以将自己的静态页面直接部署到 github 中，它会给我们提供一个地址使得我们的页面变成一个真正的网站，可以供用户访问。
- 要求：
  - 静态页面的分支必须叫做：gh-pages
  - 如果希望页面可以通过 xxx.github.io 访问，则需要将库的名字配置为 xxx.github.io

##  docusaurus

facebook 推出的开源的静态的内容管理系统，通过它可以快速的部署一个静态网站

使用：

> - 网址：[https://docusaurus.io/](https://gitee.com/link?target=https%3A%2F%2Fdocusaurus.io%2F)
> - 安装：`npx create-docusaurus@latest my-website classic`
> - 启动项目：`npm start`或`yarn start`
> - 构建项目：`npm run build`或`yarn build`
> - 配置项目：docusaurus.config.js 项目的配置文件
> - 添加页面：在 docusaurus 框架中，页面分成三种：1.page，2.blog，3.doc
> - 案例地址：[https://github.com/lilichao/lilichao.github.io](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Flilichao%2Flilichao.github.io)



