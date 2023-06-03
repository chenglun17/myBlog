# 计算机网络面试相关

## 1.UDP 和 TCP? 区别? 应用场景?

### 一、UDP

UDP（User Datagram Protocol），用户数据包协议，是一个简单的**面向数据报的通信协议**，即对应用层交下来的报文，不合并，不拆分，只是在其上面加上首部后就交给了下面的网络层

也就是说无论应用层交给`UDP`多长的报文，它统统发送，一次发送一个报文

而对接收方，接到后直接去除首部，交给上面的应用层就完成任务

`UDP`报头包括4个字段，每个字段占用2个字节（即16个二进制位），标题短，开销小

![img](InterviewQuestions.assets/928e5d20-b393-11eb-ab90-d9ae814b240d.png)

特点如下：

- UDP 不提供复杂的控制机制，利用 IP 提供面向无连接的通信服务
- 传输途中出现丢包，UDP 也不负责重发
- 当包的到达顺序出现乱序时，UDP没有纠正的功能。
- 并且它是将应用程序发来的数据在收到的那一刻，立即按照原样发送到网络上的一种机制。即使是出现网络拥堵的情况，UDP 也无法进行流量控制等避免网络拥塞行为

### 二、TCP

TCP（Transmission Control Protocol），传输控制协议，是一种可靠、**面向字节流的通信协议**，把上面应用层交下来的数据看成无结构的字节流来发送

可以想象成流水形式的，发送方TCP会将数据放入“蓄水池”（缓存区），等到可以发送的时候就发送，不能发送就等着，TCP会根据当前网络的拥塞状态来确定每个报文段的大小

`TCP`报文首部有20个字节，额外开销大

![img](InterviewQuestions.assets/a0010d40-b393-11eb-ab90-d9ae814b240d.png)

特点如下：

- TCP充分地实现了数据传输时各种控制功能，可以进行丢包时的重发控制，还可以对次序乱掉的分包进行顺序控制。而这些在 UDP 中都没有。
- 此外，TCP 作为一种面向有连接的协议，只有在确认通信对端存在时才会发送数据，从而可以控制通信流量的浪费。
- 根据 TCP 的这些机制，在 IP 这种无连接的网络上也能够实现高可靠性的通信（ 主要通过检验和、序列号、确认应答、重发控制、连接管理以及窗口控制等机制实现）

### 三、区别

`UDP`与`TCP`两者的都位于传输层，如下图所示：

![img](InterviewQuestions.assets/a92bda80-b393-11eb-ab90-d9ae814b240d.png)

两者区别如下表所示：

|          | TCP                              | UDP                            |
| -------- | -------------------------------- | ------------------------------ |
| 可靠性   | 可靠                             | 不可靠                         |
| 连接性   | 面向连接                         | 无连接                         |
| 报文     | 面向字节流                       | 面向报文                       |
| 效率     | 传输效率低                       | 传输效率高                     |
| 双共性   | 全双工                           | 一对一、一对多、多对一、多对多 |
| 流量控制 | 滑动窗口                         | 无                             |
| 拥塞控制 | 慢开始、拥塞避免、快重传、快恢复 | 无                             |
| 传输效率 | 慢                               | 快                             |

- TCP 是面向连接的协议，建立连接3次握手、断开连接四次挥手，UDP是面向无连接，数据传输前后不连接连接，发送端只负责将数据发送到网络，接收端从消息队列读取
- TCP 提供可靠的服务，传输过程采用流量控制、编号与确认、计时器等手段确保数据无差错，不丢失。UDP 则尽可能传递数据，但不保证传递交付给对方
- TCP 面向字节流，将应用层报文看成一串无结构的字节流，分解为多个TCP报文段传输后，在目的站重新装配。UDP协议面向报文，不拆分应用层报文，只保留报文边界，一次发送一个报文，接收方去除报文首部后，原封不动将报文交给上层应用
- TCP 只能点对点全双工通信。UDP 支持一对一、一对多、多对一和多对多的交互通信

两者应用场景如下图：

![img](InterviewQuestions.assets/b6cdd800-b393-11eb-ab90-d9ae814b240d.png)

可以看到，TCP 应用场景适用于对效率要求低，对准确性要求高或者要求有链接的场景，而UDP 适用场景为对效率要求高，对准确性要求低的场景







## 2.TCP/IP 网络模型有哪几层？

问大家，为什么要有 TCP/IP 网络模型？

对于同一台设备上的进程间通信，有很多种方式，比如有管道、消息队列、共享内存、信号等方式，而对于不同设备上的进程间通信，就需要网络通信，而设备是多样性的，所以要兼容多种多样的设备，就协商出了一套**通用的网络协议**。

这个网络协议是分层的，每一层都有各自的作用和职责，接下来就根据「 TCP/IP 网络模型」分别对每一层进行介绍。

### 应用层

最上层的，也是我们能直接接触到的就是**应用层**（*Application Layer*），我们电脑或手机使用的应用软件都是在应用层实现。那么，当两个不同设备的应用需要通信的时候，应用就把应用数据传给下一层，也就是传输层。

所以，应用层只需要专注于为用户提供应用功能，比如 HTTP、FTP、Telnet、DNS、SMTP等。

应用层是不用去关心数据是如何传输的，就类似于，我们寄快递的时候，只需要把包裹交给快递员，由他负责运输快递，我们不需要关心快递是如何被运输的。

而且应用层是工作在操作系统中的用户态，传输层及以下则工作在内核态。

### 传输层

应用层的数据包会传给传输层，**传输层**（*Transport Layer*）是为应用层提供网络支持的。

![img](InterviewQuestions.assets/应用层.png)

在传输层会有两个传输协议，分别是 TCP 和 UDP。

TCP 的全称叫传输控制协议（*Transmission Control Protocol*），大部分应用使用的正是 TCP 传输层协议，比如 HTTP 应用层协议。TCP 相比 UDP 多了很多特性，比如流量控制、超时重传、拥塞控制等，这些都是为了保证数据包能可靠地传输给对方。

UDP 相对来说就很简单，简单到只负责发送数据包，不保证数据包是否能抵达对方，但它实时性相对更好，传输效率也高。当然，UDP 也可以实现可靠传输，把 TCP 的特性在应用层上实现就可以，不过要实现一个商用的可靠 UDP 传输协议，也不是一件简单的事情。

应用需要传输的数据可能会非常大，如果直接传输就不好控制，因此当传输层的数据包大小超过 MSS（TCP 最大报文段长度） ，就要将数据包分块，这样即使中途有一个分块丢失或损坏了，只需要重新发送这一个分块，而不用重新发送整个数据包。在 TCP 协议中，我们把每个分块称为一个 **TCP 段**（*TCP Segment*）。

![img](InterviewQuestions.assets/TCP段.png)

当设备作为接收方时，传输层则要负责把数据包传给应用，但是一台设备上可能会有很多应用在接收或者传输数据，因此需要用一个编号将应用区分开来，这个编号就是**端口**。

比如 80 端口通常是 Web 服务器用的，22 端口通常是远程登录服务器用的。而对于浏览器（客户端）中的每个标签栏都是一个独立的进程，操作系统会为这些进程分配临时的端口号。

由于传输层的报文中会携带端口号，因此接收方可以识别出该报文是发送给哪个应用。

### 网络层

传输层可能大家刚接触的时候，会认为它负责将数据从一个设备传输到另一个设备，事实上它并不负责。

实际场景中的网络环节是错综复杂的，中间有各种各样的线路和分叉路口，如果一个设备的数据要传输给另一个设备，就需要在各种各样的路径和节点进行选择，而传输层的设计理念是简单、高效、专注，如果传输层还负责这一块功能就有点违背设计原则了。

也就是说，我们不希望传输层协议处理太多的事情，只需要服务好应用即可，让其作为应用间数据传输的媒介，帮助实现应用到应用的通信，而实际的传输功能就交给下一层，也就是**网络层**（*Internet Layer*）。

![img](InterviewQuestions.assets/网络层.png)

网络层最常使用的是 IP 协议（*Internet Protocol*），IP 协议会将传输层的报文作为数据部分，再加上 IP 包头组装成 IP 报文，如果 IP 报文大小超过 MTU（以太网中一般为 1500 字节）就会**再次进行分片**，得到一个即将发送到网络的 IP 报文。

![img](InterviewQuestions.assets/12.jpg)

网络层负责将数据从一个设备传输到另一个设备，世界上那么多设备，又该如何找到对方呢？因此，网络层需要有区分设备的编号。

我们一般用 IP 地址给设备进行编号，对于 IPv4 协议， IP 地址共 32 位，分成了四段（比如，192.168.100.1），每段是 8 位。只有一个单纯的 IP 地址虽然做到了区分设备，但是寻址起来就特别麻烦，全世界那么多台设备，难道一个一个去匹配？这显然不科学。

因此，需要将 IP 地址分成两种意义：

- 一个是**网络号**，负责标识该 IP 地址是属于哪个「子网」的；
- 一个是**主机号**，负责标识同一「子网」下的不同主机；

怎么分的呢？这需要配合**子网掩码**才能算出 IP 地址 的网络号和主机号。

举个例子，比如 10.100.122.0/24，后面的`/24`表示就是 `255.255.255.0` 子网掩码，255.255.255.0 二进制是「11111111-11111111-11111111-00000000」，大家数数一共多少个1？不用数了，是 24 个1，为了简化子网掩码的表示，用/24代替255.255.255.0。

知道了子网掩码，该怎么计算出网络地址和主机地址呢？

将 10.100.122.2 和 255.255.255.0 进行**按位与运算**，就可以得到网络号和主机号

![img](InterviewQuestions.assets/16.jpg)

大家可以去搜索下子网掩码计算器，自己改变下「掩码位」的数值，就能体会到子网掩码的作用了。

![子网掩码计算器](InterviewQuestions.assets/子网掩码计算器.png)

那么在寻址的过程中，先匹配到相同的网络号（表示要找到同一个子网），才会去找对应的主机。

除了寻址能力， IP 协议还有另一个重要的能力就是**路由**。实际场景中，两台设备并不是用一条网线连接起来的，而是通过很多网关、路由器、交换机等众多网络设备连接起来的，那么就会形成很多条网络的路径，因此当数据包到达一个网络节点，就需要通过路由算法决定下一步走哪条路径。

路由器寻址工作中，就是要找到目标地址的子网，找到后进而把数据包转发给对应的网络内。

![IP地址的网络号](InterviewQuestions.assets/17.jpg)

所以，**IP 协议的寻址作用是告诉我们去往下一个目的地该朝哪个方向走，路由则是根据「下一个目的地」选择路径。寻址更像在导航，路由更像在操作方向盘**。

### 网络接口层

生成了 IP 头部之后，接下来要交给**网络接口层**（*Link Layer*）在 IP 头部的前面加上 MAC 头部，并封装成数据帧（Data frame）发送到网络上。

![img](InterviewQuestions.assets/网络接口层.png)

IP 头部中的接收方 IP 地址表示网络包的目的地，通过这个地址我们就可以判断要将包发到哪里，但在以太网的世界中，这个思路是行不通的。

什么是以太网呢？电脑上的以太网接口，Wi-Fi接口，以太网交换机、路由器上的千兆，万兆以太网口，还有网线，它们都是以太网的组成部分。以太网就是一种在「局域网」内，把附近的设备连接起来，使它们之间可以进行通讯的技术。

以太网在判断网络包目的地时和 IP 的方式不同，因此必须采用相匹配的方式才能在以太网中将包发往目的地，而 MAC 头部就是干这个用的，所以，在以太网进行通讯要用到 MAC 地址。

MAC 头部是以太网使用的头部，它包含了接收方和发送方的 MAC 地址等信息，我们可以通过 ARP 协议获取对方的 MAC 地址。

所以说，网络接口层主要为网络层提供「链路级别」传输的服务，负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 MAC 地址来标识网络上的设备。

### 总结

综上所述，TCP/IP 网络通常是由上到下分成 4 层，分别是**应用层，传输层，网络层和网络接口层**。

![img](InterviewQuestions.assets/tcpip参考模型.drawio.png)

再给大家贴一下每一层的封装格式：

![img](InterviewQuestions.assets/封装.png)

网络接口层的传输单位是帧（frame），IP 层的传输单位是包（packet），TCP 层的传输单位是段（segment），HTTP 的传输单位则是消息或报文（message）。但这些名词并没有什么本质的区分，可以统称为数据包。



## 3.DNS协议是什么？DNS的查询过程?

### 一、是什么

DNS（Domain Names System），域名系统，是互联网一项服务，是进行域名和与之相对应的 IP 地址进行转换的服务器

简单来讲，`DNS`相当于一个翻译官，负责将域名翻译成`ip`地址

- IP 地址：一长串能够唯一地标记网络上的计算机的数字
- 域名：是由一串用点分隔的名字组成的 Internet 上某一台计算机或计算机组的名称，用于在数据传输时对计算机的定位标识

![img](InterviewQuestions.assets/965a03a0-b78f-11eb-ab90-d9ae814b240d.png)

### 二、域名

域名是一个具有层次的结构，从上到下一次为根域名、顶级域名、二级域名、三级域名...

![img](InterviewQuestions.assets/9f112780-b78f-11eb-85f6-6fac77c0c9b3.png)

例如`www.xxx.com`，`www`为三级域名、`xxx`为二级域名、`com`为顶级域名，系统为用户做了兼容，域名末尾的根域名`.`一般不需要输入

在域名的每一层都会有一个域名服务器，如下图：

![img](InterviewQuestions.assets/f40e0090-b7a4-11eb-85f6-6fac77c0c9b3.png)

除此之外，还有电脑默认的本地域名服务器

### 三、查询方式

DNS 查询的方式有两种：

- 递归查询：如果 A 请求 B，那么 B 作为请求的接收者一定要给 A 想要的答案

![img](InterviewQuestions.assets/a73be9e0-b78f-11eb-85f6-6fac77c0c9b3.png)

- 迭代查询：如果接收者 B 没有请求者 A 所需要的准确内容，接收者 B 将告诉请求者 A，如何去获得这个内容，但是自己并不去发出请求

![img](InterviewQuestions.assets/b023e1c0-b78f-11eb-85f6-6fac77c0c9b3.png)

### 四、域名缓存

在域名服务器解析的时候，使用缓存保存域名和`IP`地址的映射

计算机中`DNS`的记录也分成了两种缓存方式：

- 浏览器缓存：浏览器在获取网站域名的实际 IP 地址后会对其进行缓存，减少网络请求的损耗
- 操作系统缓存：操作系统的缓存其实是用户自己配置的 `hosts` 文件

### 五、查询过程

解析域名的过程如下：

- 首先搜索浏览器的 DNS 缓存，缓存中维护一张域名与 IP 地址的对应表
- 若没有命中，则继续搜索操作系统的 DNS 缓存
- 若仍然没有命中，则操作系统将域名发送至本地域名服务器，本地域名服务器采用递归查询自己的 DNS 缓存，查找成功则返回结果
- 若本地域名服务器的 DNS 缓存没有命中，则本地域名服务器向上级域名服务器进行迭代查询
  - 首先本地域名服务器向根域名服务器发起请求，根域名服务器返回顶级域名服务器的地址给本地服务器
  - 本地域名服务器拿到这个顶级域名服务器的地址后，就向其发起请求，获取权限域名服务器的地址
  - 本地域名服务器根据权限域名服务器的地址向其发起请求，最终得到该域名对应的 IP 地址
- 本地域名服务器将得到的 IP 地址返回给操作系统，同时自己将 IP 地址缓存起来
- 操作系统将 IP 地址返回给浏览器，同时自己也将 IP 地址缓存起
- 至此，浏览器就得到了域名对应的 IP 地址，并将 IP 地址缓存起

流程如下图所示：

![img](InterviewQuestions.assets/bec3c740-b78f-11eb-ab90-d9ae814b240d.png)





## 4.如何理解CDN？说说实现原理？

### 什么是CDN

CDN的全称是Content Delivery Network，即内容分发网络。

我们都用过天猫超市，在上面买东西非常方便。天猫超市的模式是货品先入天猫超市（后文简称为"猫超"）的菜鸟仓，然后由猫超统一派送的。

为了缩短物流的时间，可以让消费者快速的收到货品，菜鸟在全国各地建了本地仓库，现在大多数情况下，在猫超下单，第二天都可以收到（楼主在江浙沪包邮区，其他地区可能稍有延迟）。

比如我在杭州市西湖区，下单购买了一箱零食，没过多久就可以看到猫超已经发货了，发货地址是杭州的萧山仓，从杭州的一个区运输到另外一个区，24小时怎么也到了。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c709283e98~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

￼

猫超的配送采用的是智能仓配模式，菜鸟为天猫超市提供全国智能分仓，在商品销售前就已经来到距离消费者最近的仓储基地，下单购买后，由最近的仓发货，就近配送，速度比跨越多个省市跑过来的快多了。

我们可以在菜鸟网络的官网上看到其全国各地的仓库情况，我们可以看到他目前覆盖了全国20哥省份，70个城市，共有327各仓库。这些仓库组合在一起被称之为"全国仓网"。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c71d280196~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

图：菜鸟全国仓配网络

我们在浏览网络的时候，其实就和以上这个过程十分相似，我们访问一个页面的时候，会向服务器请求很多网络资源，包括各种图片、声音、影片、文字等信息。这和我们要购买的多种货物一样。

就像猫超会把货物提前存储在菜鸟建设在全国各地的本地仓库来减少物流时间一样，网站也可以预先把内容分发至全国各地的加速节点。这样用户就可以就近获取所需内容，避免网络拥堵、地域、运营商等因素带来的访问延迟问题，有效提升下载速度、降低响应时间，提供流畅的用户体验。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c722ca14fc~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

￼所以，"内容分发网络"就像前面提到的"全国仓配网络"一样，解决了因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度和成功率。

有了仓配网络之后，除了可以提升货物的配送效率，还有很多其他的好处：

1、首先通过预先做好了货物分发，使得最终货品从出仓到消费者手中的过程是比较短的，那么同城范围内可选择的配送公司就有很多选择，除了比较大的四通一达、顺丰以外，还可以选用一些小的物流公司、甚至菜鸟直接调用饿了么的蜂鸟配送也不是不可能。

> CDN技术消除了不同运营商之间互联的瓶颈造成的影响，实现了跨运营商的网络加速，保证不同网络中的用户都能得到良好的访问质量

2、对于仓配系统来说，最大的灾难可能就是仓库发生火灾、水灾等自然灾害。如果把原来的一个集中式的大仓库打散成多个分布式的小仓库，分别部署在不同地区，就可以有效的减小自然灾害带来的影响。

> 广泛分布的CDN节点加上节点之间的智能冗余机制，可以有效地预防黑客入侵以及降低各种DDoS攻击对网站的影响，同时保证较好的服务质量

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c72316037c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c71fab33b0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c727f05c71~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c7251ba9ca~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### CDN的基本工作过程

传统快递企业采用的配送模式，通过"商家→网点→分拨→分拨→网点→客户"的环节进行配送。这个过程会有一些问题，如环节多、时效慢、易破损等。

上面这个过程和传统网站的请求响应过程类似，一般经历以下步骤：

- 用户在自己的浏览器中输入要访问的网站域名。
- 浏览器向本地DNS服务器请求对该域名的解析。
- 本地DNS服务器中如果缓存有这个域名的解析结果，则直接响应用户的解析请求。
- 本地DNS服务器中如果没有关于这个域名的解析结果的缓存，则以迭代方式向整个DNS系统请求解析，获得应答后将结果反馈给浏览器。
- 浏览器得到域名解析结果，就是该域名相应的服务设备的IP地址 。
- 浏览器获取IP地址之后，经过标准的TCP握手流程，建立TCP连接。
- 浏览器向服务器发起HTTP请求。
- 服务器将用户请求内容传送给浏览器。
- 经过标准的TCP挥手流程，断开TCP连接。

电商自建物流之后，配送模式有所变化：提前备货将异地件转化成同城件，省去干线环节提升时效，仓储高自动化分拣保证快速出库的同时也保证了分拣破损率较低。

对于用户来说，购物过程并没有变化，唯一的感受就是物流好像是比以前快了。所以，引入CDN之后，用户访问网站一般经历以下步骤：

- 当用户点击网站页面上的内容URL，先经过本地DNS系统解析，如果本地DNS服务器没有相应域名的缓存，则本地DNS系统会将域名的解析权交给CNAME指向的CDN专用DNS服务器。
- CDN的DNS服务器将CDN的全局负载均衡设备IP地址返回给用户。
- 用户向CDN的全局负载均衡设备发起URL访问请求。
- CDN全局负载均衡设备根据用户IP地址，以及用户请求的URL，选择一台用户所属区域的区域负载均衡设备，并将请求转发到此设备上。
- 基于以下这些条件的综合分析之后，区域负载均衡设备会选择一个最优的缓存服务器节点，并从缓存服务器节点处得到缓存服务器的IP地址，最终将得到的IP地址返回给全局负载均衡设备：
- 根据用户IP地址，判断哪一个边缘节点距用户最近；
- 根据用户所请求的URL中携带的内容名称，判断哪一个边缘节点上有用户所需内容；
- 查询各个边缘节点当前的负载情况，判断哪一个边缘节点尚有服务能力。
- 全局负载均衡设备把服务器的IP地址返回给用户。
- 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c73af1a83f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

图：华为云全站加速示意图

CDN全局负载均衡设备与CDN区域负载均衡设备根据用户IP地址，将域名解析成相应节点中缓存服务器的IP地址，实现用户就近访问，从而提高服务端响应内容的速度。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c73b501d98~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c73caf8adb~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c7475b7a73~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c74840d283~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### CDN的组成

前面我们说过，一个仓配网络是由多个仓库组成的，同理，内容分发网络（CDN）是由多个节点组成的。一般来讲，CDN网络主要由中心节点、边缘节点两部分构成。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c74d0dade9~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

图：帝联云下载加速场景图

### **中心节点**

中心节点包括CDN网管中心和全局负载均衡DNS重定向解析系统，负责整个CDN网络的分发及管理。

### **边缘节点**

CDN边缘节点主要指异地分发节点，由负载均衡设备、高速缓存服务器两部分组成。

负载均衡设备负责每个节点中各个Cache的负载均衡，保证节点的工作效率；同时还负责收集节点与周围环境的信息，保持与全局负载均衡DNS的通信，实现整个系统的负载均衡。

高速缓存服务器（Cache）负责存储客户网站的大量信息，就像一个靠近用户的网站服务器一样响应本地用户的访问请求。通过全局负载均衡DNS的控制，用户的请求被透明地指向离他最近的节点，节点中Cache服务器就像网站的原始服务器一样，响应终端用户的请求。因其距离用户更近，故其响应时间才更快。

**中心节点就像仓配网络中负责货物调配的总仓，而边缘节点就是负责存储货物的各个城市的本地仓库。**

目前，主要由很多提供CDN服务的云厂商在各地部署了很多个CDN节点，拿阿里云举例，我们可以在阿里云的官网上了解到：阿里云在全球拥有2500+节点。中国大陆拥有2000+节点，覆盖34个省级区域，大量节点位于省会等一线城市。海外和港澳台拥有500+节点，覆盖70多个国家和地区。

![-w777](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c75b2ad570~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

图：阿里云在中国大陆的CDN节点的分布情况

有了如上图的阿里云在中国大陆的CDN节点的分布之后（这是不是也和我们前面看到的那张菜鸟网络的全国仓网很像），一个在杭州的电信网络用户，访问某个部署在阿里云上面的网站时，获取到的一些资源，如页面上的某个图片、某段影片或者某些文字，可能就是该网站预先分发到浙江的某个移动CDN存储节点提供的，这样就可以大大的减少网站的响应时间。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c75c4845bb~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c76146215c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c761ff141a~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c76772f2cc~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c93e65ac32~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c776fd41b4~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### CDN相关技术

首先我们想一下，要想建设一个庞大的仓配网络都需要考虑哪些问题，需要哪些技术手段呢？

笔者认为主要是四个重要关注的点，分别是：

1、如何妥善的将货物分发到各个城市的本地仓。

2、如何妥善的各个本地仓存储货物。

3、如何根据用户的收货地址，智能的匹配出应该优先从哪个仓库发货，选用哪种物流方式等。

4、对于整个仓配系统如何进行管理，如整体货物分发的精确度、仓配的时效性、发货地的匹配度等。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c77f6942ba~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

图：菜鸟仓库智能机器人分拣货物

这其实和CDN中最重要的四大技术不谋而合，那就是内容发布、内容存储、内容路由以及内容管理等。

#### **内容发布**

它借助于建立索引、缓存、流分裂、组播（Multicast）等技术，将内容发布或投递到距离用户最近的远程服务点（POP）处。

#### **内容存储**

对于CDN系统而言，需要考虑两个方面的内容存储问题。一个是内容源的存储，一个是内容在 Cache节点中的存储。

#### **内容路由**

它是整体性的网络负载均衡技术，通过内容路由器中的重定向（DNS）机制，在多个远程POP上均衡用户的请求，以使用户请求得到最近内容源的响应。

#### **内容管理**

它通过内部和外部监控系统，获取网络部件的状况信息，测量内容发布的端到端性能（如包丢失、延时、平均带宽、启动时间、帧速率等），保证网络处于最佳的运行状态。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c7786c3ee4~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/5/16c5f7c77f5be450~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)



## 5.TCP三次握手

第一次握手，客户端向服务器发送一个 SYN 连接请求报文段，报文段的首部中 SYN 标志位置为 1，序号字段是一个任选的
随机数。它代表的是客户端数据的初始序号。

第二次握手，服务器端接收到客户端发送的 SYN 连接请求报文段后，服务器首先会为该连接分配 TCP 缓存和变量，然后向
客户端发送 SYN ACK 报文段，报文段的首部中 SYN 和 ACK 标志位都被置为 1，代表这是一个对 SYN 连接请求的确认，
同时序号字段是服务器端产生的一个任选的随机数，它代表的是服务器端数据的初始序号。确认号字段为客户端发送的序号加
一。

第三次握手，客户端接收到服务器的肯定应答后，它也会为这次 TCP 连接分配缓存和变量，同时向服务器端发送一个对服务
器端的报文段的确认。第三次握手可以在报文段中携带数据。

在我看来，TCP 三次握手的建立连接的过程就是相互确认初始序号的过程，告诉对方，什么样序号的报文段能够被正确接收。
第三次握手的作用是客户端对服务器端的初始序号的确认。如果只使用两次握手，那么服务器就没有办法知道自己的序号是否
已被确认。同时这样也是为了防止失效的请求报文段被服务器接收，而出现错误的情况。



## 6.TCP四次挥手

因为 TCP 连接是全双工的，也就是说通信的双方都可以向对方发送和接收消息，所以断开连接需要双方的确认。

第一次挥手，客户端认为没有数据要再发送给服务器端，它就向服务器发送一个 FIN 报文段，申请断开客户端到服务器端的
连接。发送后客户端进入 FIN_WAIT_1 状态。

第二次挥手，服务器端接收到客户端释放连接的请求后，向客户端发送一个确认报文段，表示已经接收到了客户端释放连接的
请求，以后不再接收客户端发送过来的数据。但是因为连接是全双工的，所以此时，服务器端还可以向客户端发送数据。服务
器端进入 CLOSE_WAIT 状态。客户端收到确认后，进入 FIN_WAIT_2 状态。

第三次挥手，服务器端发送完所有数据后，向客户端发送 FIN 报文段，申请断开服务器端到客户端的连接。发送后进入 LAS
T_ACK 状态。

第四次挥手，客户端接收到 FIN 请求后，向服务器端发送一个确认应答，并进入 TIME_WAIT 阶段。该阶段会持续一段时间，
这个时间为报文段在网络中的最大生存时间，如果该时间内服务端没有重发请求的话，客户端进入 CLOSED 的状态。如果收到
服务器的重发请求就重新发送确认报文段。服务器端收到客户端的确认报文段后就进入 CLOSED 状态，这样全双工的连接就被
释放了。

TCP 使用四次挥手的原因是因为 TCP 的连接是全双工的，所以需要双方分别释放到对方的连接，单独一方的连接释放，只代
表不能再向对方发送数据，连接处于的是半释放的状态。

最后一次挥手中，客户端会等待一段时间再关闭的原因，是为了防止发送给服务器的确认报文段丢失或者出错，从而导致服务器
端不能正常关闭。



## 参考

[参考文章](https://segmentfault.com/a/1190000022350860)