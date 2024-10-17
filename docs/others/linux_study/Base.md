# 二、基础篇

## 文件与目录结构

Linux的文件系统是采用<strong style="color:#DD5145">级层式的树状</strong>目录结构，在此结构在的最上层是<strong style="color:#DD5145">根目录`/`</strong>，然后在此目录下创建其他目录。

记住一句话：<strong style="color:#DD5145">在Linux世界里，一切皆文件</strong>

> Linux会把计算机的硬件映射成一个文件来管理

![image-20231223140419011](Base.assets/image-20231223140419011.png)

#### 具体的目录结构

- **`/bin`**，[<strong style="color:#DD5145">常用</strong>]（`/usr/bin`、`/usr/local/bin`）

  是Binary的缩写，这个目录存放着最经常使用的命令

- **`/sbin`**，（`、usr/sbin`、`/usrlocal/sbin`）

  s就是Super User的意思，存放着系统管理员使用的系统管理程序

- **`/home`**，[<strong style="color:#DD5145">常用</strong>]

  存放着普通用户的主目录，在Linux中每个用户都有一个自己的目录，一般该目录以用户的账号命名

- **`/root`**，[<strong style="color:#DD5145">常用</strong>]

  该目录为系统管理员，即超级权限者的用户主目录

- **`/lib`**，

  系统开机所需要的最基本的动态链接共享库，其作用类似于Windows里的DLL文件

  几乎所有的应用程序都需要用到这些共享库

- **`/lost+found`**，

  这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件（一般被隐藏起来的）

- **`/etc`**，etcetera的缩写，[<strong style="color:#DD5145">常用</strong>]

  所有的系统管理所需要的配置文件和子目录 `my.conf`

- **`/usr`**，unix software resource的缩写，[<strong style="color:#DD5145">常用</strong>]

  这是一个非常重要的目录，用户的很多应用程序和文件都存放在这个目录，类似于Windows下的program files 目录

- **`/boot`**，[<strong style="color:#DD5145">常用</strong>]

  存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件

- **`/proc`**，[<strong style="color:#DD5145">不能动</strong>]

  这个目录是一个虚拟的目录，它是系统内存的映射，访问此目录来获取系统信息

- **`/srv`**，service的缩写，[<strong style="color:#DD5145">不能动</strong>]

  该目录存放着一些服务启动之后需要提取的数据

- **`/sys`**，[<strong style="color:#DD5145">不能动</strong>]，这是Linux2.6内核的一个很大变化

  该目录下安装了2.6内核中新出现的一个文件系统`sysfs`

- **`/tmp`**，

  该目录用来存放一些临时文件

- **`/dev`**，device的缩写

  类似Windows中的设备管理器，把所有的硬件以文件形式存储

- **`/mdeia`**，[<strong style="color:#DD5145">常用</strong>]

  Linux系统会自动识别一些设备，例如U盘，光驱等等，识别之后，会把这些设备挂载到这个目录上

- **`/mnt`**，mount的缩写，[<strong style="color:#DD5145">常用</strong>]

  系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将外部的存储挂载在`/mnt/`上，然后进入该目录就可以查看里面的内容

- **`/opt`**，option的缩写

  这是给主机额外<strong style="color:#DD5145">安装软件</strong>（安装包）所存放的目录，如安装Oracle数据库就可以存放在该目录下。默认为空

- **`/usr/local`**，[<strong style="color:#DD5145">常用</strong>]

  这是另一个给主机额外安装软件所存放的目录。一般是通过编译源码方式安装的程序

- **`/var`**，[<strong style="color:#DD5145">常用</strong>]

  该目录存放着不断扩充的东西，习惯将经常被修改的目录存放在这个目录下。包括各种日志文件

- **`/selinux`**，security-enhanced linux的缩写，（一般未启用）

  SELinux是一种安全子系统，它能控制程序只能访问特定文件，有三种工作模式，可以自行设置



## Vi 和 Vim编辑器

Linux 系统会内置 vi 文本编辑器。

Vim 具有程序编辑的能力，可以看做是Vi 的增强版本，具有代码补全、编译及错误跳转等功能，可以主动的以字体颜色辨别语法的正确性，方便程序设计。

### vi 和 vim 常用的三种模式

- <strong style="color:#DD5145">正常模式</strong>

  以 vim 打开一个档案就直接进入**一般模式（默认模式）**，在这个模式中，可以使用【上下左右】按键来移动光标

  可以使用【删除符号】或【删除整行】来处理文档内容，也可以使用【**复制、粘贴**】来处理文件数据

- <strong style="color:#DD5145">插入模式</strong>

  按下【i、I、o、O、a、A、r、R】等任一字母之后才会进入**编辑模式**，一般按 i 即可

- <strong style="color:#DD5145">命令行模式</strong>

  **先按一下`esc`，再输入`:`**进入命令行模式，在这个模式中，可以提供相关指令，完成**读取**、**存盘**、**替换**、**离开 vim**、**显示行号**等

  > wq（write quit）写入并退出

![image-20240312225426718](Base.assets/image-20240312225426718.png)

### vi 和 vim 快捷键

1. 拷贝当前行`yy`，拷贝当前行向下的5行`5yy`，并粘贴（输入`p`）
2. 删除当前行`dd`，删除当前行向下的5行`5dd`
3. 在文件中查找某个单词【**命令行下** `/关键字`，回车 查找，输入` n` 就是查 找下一个】，区分大小写
4. 设置文件的行号【**命令行下**`:set nu`】，取消文件的行号【`:set nonu`】
5. **编辑模式**`/etc/profile`文件，使用快捷键到该文档的**最末行**【`G`】和**最首行**【`gg`】
6. 在一个文件中输入"hello"，然后又**撤销**这个动作【**一般模式**下输入`u`】
7. 编辑`/etc/profile`文件，并将光标移动到20行【**一般模式**下，先输入20，再输入`shfit + g`】
8. 更多的查看整理的文档

![image-20240312233159528](Base.assets/image-20240312233159528.png)

## 网络配置

### 网络连接的三种方式

- **桥接模式**：虚拟系统直接连接外部物理网络，主机起到了网桥的作用，虚拟机可以直接访问外部网络，但是容易造成IP冲突
- **NAT模式**：即网络地址转换模式，虚拟机和主机构建一个专用网络，并通过NAT设备对IP进行转换。虚拟系统通过共享主机IP可以访问外部网络，但外部网络无法访问虚拟机，不会造成IP冲突
- **主机模式**：独立的系统，虚拟机只与主机共享一个专用网络，与外部网络无法通信

### 查看网络IP和网关

- 查看Windows环境下的网络配置：`ipconfig`
- 查看Linux环境下的网络配置：`ifconfig`

### 配置网络IP地址

**1.自动获取IP**

登录后，通过界面来设置自动获取ip

**2.指定静态IP**

直接修改配置文件来指定IP，并可以连接到外网

编辑`vi /etc/sysconfig/network-scripts/ifcfg-ens33`

`ifcfg-ens33`文件内容：

```sh
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="dhcp"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="22c304c1-fdd1-4fbc-8d64-73e2b31212ab"
DEVICE="ens33"
ONBOOT="yes"
```

更改并添加为：

```sh
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
# 模式更改为静态
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="22c304c1-fdd1-4fbc-8d64-73e2b31212ab"
DEVICE="ens33"
ONBOOT="yes"
# IP地址
IPADDR=192.168.200.130
# 网关
GATEWAY=192.168.200.2
# 域名解析器
DNS=192.168.200.2
```

还需要在虚拟网络编辑器中修改 VMNet8的子网IP（192.168.200.0）和子网掩码（255.255.255.0），以及NAT设置的网关IP为192.168.200.2。

重启网络服务或重启系统生效：`service network restart`、`reboot`。



### 修改IP地址后可能会遇到的问题

1. 物理机能`ping`通虚拟机，但虚拟机`ping`不通物理机，一般是因为物理机的防火墙问题，把防火墙关闭即可。

2. 虚拟机能`ping`通物理机，但虚拟机`ping`不通外网，一般是因为DNS的设置有问题。

3. 虚拟机`ping www.baidu.com`显示域名等未知信息，一般查看`GATEWAY`和`DNS`设置是否正确。

4. 如果以上全部设置完还是不行，需要关闭 NetworkManager 服务
   - `systemctl stop NetworkManager` 关闭
   - `systemctl disable NetworkManager` 禁用

5. 如果检查完发现`systemctl status network`有问题，需要检查`ifcfg-ens33`



### 配置主机名

**1.设置主机名**

1. 为了方便记忆，可以给Linux系统设置主机名，也可以根据需要修改主机名
2. 指令`hostname`：查看当前服务器的主机名
3. 通过Vim编辑`/etc/hostname`文件，来修改主机名
4. 修改后，重启生效

**2.设置hosts映射**

如何通过主机名找到某个Linux系统？

- Windows：在`C:\Windows\System32\drivers\etc\hosts`文件指定即可

  案例：`192.168.200.130 hspedu100`

- Linux：在`/etc/host`文件指定即可

  案例`192.168.200.1 ThinkPad-PC`

`hosts`是什么？

- 一个文本文件，用来记录 IP 和 Hostname（主机名）的映射关系





## 系统管理





## 远程登录

为什么需要远程登录Linux？

说明：公司开发的时候，具体的应用场景是这样的

1. Linux服务器时开发小组共享
2. 正式上线的项目是运行在公网
3. 因此程序员需要远程登录到 Linux 机芯项目管理或开发
4. 画出简单的网络拓扑示意图（帮助理解）
5. 远程登录客户端有 Xshell6，Xftp6，我们学习使用 Xshell 和 Xftp6

![image-20231223201029235](Base.assets/image-20231223201029235.png)

### XShell 6

Xshell 是一个强大的安全终端模拟软件，是目前最好的远程登录到 Linux 操作的软件，它支持SSH1，SSH2，以及 Microsoft Windows 平台的 TELNET 协议。

Xshell 可以在 Windows 界面下用来访问远端不同系统下的服务器，从而比较好的达到远程控制终端的目的。

![image-20231223200804604](Base.assets/image-20231223200804604.png)

### XFtp 6

是基于Windows平台的具有功能强大的SFTP、FTP文件传输软件。使用了XFtp以后，Windows用户能安全地在Unix、Linux 以及Windows PC之间传输文件。

![image-20231223201852408](Base.assets/image-20231223201852408.png)

> 如何处理 XFtp 中文乱码问题？

![image-20231223202433925](Base.assets/image-20231223202433925.png)