# 微信小程序基础

## 目录结构

- pages 用来存放所有小程序的页面
- utils 用来存放工具性质的模块（例如：格式化的自定义模块）
- app.js 项目的**入口文件**
- app.json 项目的**全局配置文件**
- app.wxss 项目的**全局样式文件**
- project.config.json 项目的**配置文件**
- sitemap.json 用来配置小程序及其页面**是否允许被微信索引**

### 页面组成部分

小程序官方建议把所有小程序的页面，都存放在 pages 目录中，以单独的文件夹存放

其中，每个页面由 4 个基本文件组成

1. .js 文件（页面的脚本文件，存放页面的数据、事件处理函数等）
2. .json 文件（当前页面的配置文件，配置窗口外观、表现等）
3. .wxml 文件（页面的模板结构文件）
4. .wxss 文件 （当前页面的样式表文件）

### JSON配置文件

#### 1.JSON配置文件的作用

JSON 是一种数据格式，在实际开发中，JSON 总以配置文件的形式出现。小程序项目中也不例外：通过不同的 .json 配置文件，可以对小程序项目进行不同级别的配置。

小程序项目中有 4 种json文件，分别是：

- 项目根目录中的 app.json 配置文件
- 项目根目录中的 project.config.json 配置文件
- 项目根目录中的 sitemap.json 配置文件
- 每个页面文件夹中的 .json 配置文件

#### 2.app.json文件

app.json 是当前小程序项目的 <strong style="color:#DD5145">全局配置文件</strong>，包括小程序的所有 **页面路径**，**窗口外观**、**页面表现**、**底部 tab** 等

例如，demo 项目里面的 app.json 配置内容：

- pages：用来记录当前小程序所有页面的路径
- window：全局定义小程序所有页面的背景色、文字颜色等
- style：全局定义小程序组件所使用的样式版本
- sitemapLocation：用来指明 sitemap.json 的位置

#### 3.project.config.json文件

project.config.json 是当前小程序项目的 <strong style="color:#DD5145">配置文件</strong>，用来记录我们对小程序开发工具的个性化配置，例如：

- setting 中保存的是**编译相关的配置**
- projectname 中保存的是**项目名称**
- appid 中保存的是**小程序的账号ID**

#### 4.sitemap.json文件

微信现在已经开放小程序内搜索，效果类似于 PC 网页的 SEO。sitemap.json 文件用来配置小程序页面 <strong style="color:#DD5145">是否允许微信索引</strong>。

==注意== ：sitemap 的索引提示是默认开启的，如需要关闭 sitemap 的索引提示，可以在小程序项目配置文件 project.config.json 的 setting 中配置字段 checkSiteMap 为 false

#### 5.页面的.json文件

小程序中的每个页面，可以使用 .json 文件来对页面的窗口外观进行配置，页面中的配置项会覆盖 app.json 的 window 中相同的配置项。

#### 6.新建小程序页面

只需要在 app.json --> pages 中新增页面的存放路径，小程序开发者工具即可帮我们自动创建对应的页面文件。

#### 7.修改项目首页

只需要调整 app.json --> pages 数组中页面路径的前后顺序，即可修改项目的首页。小程序会把排在第一位的页面，当做首页进行渲染。



## WXML模板

### 1.什么是WXML

WXML（WeiXin Markup Language）是一套 <strong style="color:#DD5145">标签语言</strong>，用来构建小程序页面的结构，其作用类似于网页开发中的HTML。

### 2.WXML和HTML的区别

1. 标签名称不同
   - HTML（div，span，img，a）
   - WXML（view，text，image，navigator）
2. 属性节点不同
   - **`<a href="#"></a>`**
   - **`<navigator url="/pages/home/home"></navigator>`**
3. 提供了类似于vue中的模板语法
   - 数据绑定
   - 列表渲染
   - 条件渲染

### 3.什么是WXSS

WXSS（WeiXin Style Sheets）是一套 <strong style="color:#DD5145">样式语言</strong>，用于描述WXML的组件样式，类似于网页开发中的CSS。

### 4.WXSS和CSS的区别

1. 新增了 rpx 尺寸单位
   - CSS 中需要手动进行像素单位换算，例如 rem
   - WXSS 在底层支持新的尺寸单位 rpx，在不同大小的屏幕上小程序会自动进行换算（750px）
2. 提供了全局的样式和局部样式
   - 项目根目录中的 app.wxss 会作用于所有小程序页面
   - 局部页面的 .wxss 样式仅对当前页面生效
3. WXSS 仅支持部分 CSS 选择器
   - .class 和 #id
   - element
   - 并集选择器、后代选择器
   - ::after 和 ::before 等伪类选择器



## JS逻辑交互

### 1.小程序中的.js文件分类

小程序中的JS文件分为3大类，分别是：

1. app.js
   - 是**整个小程序项目**的 <strong style="color:#DD5145">入口文件</strong>，通过调用 App() 函数来启动整个小程序
2. 页面的 .js 文件
   - 是**页面**的入口文件，通过调用 Page() 函数来创建并运行页面
3. 普通的 .js 文件
   - 是普通的功能模块文件，用来封装公共的函数或属性供页面使用

## 宿主环境

### 1.什么是宿主环境

宿主环境（host environment）指的是 <strong style="color:#DD5145">程序运行所必须的依赖环境</strong>。Android 和 iOS 系统是两个不同的宿主环境。

### 2.小程序的宿主环境

手机微信是小程序的宿主环境，小程序借助宿主环境提供的能力，可以完成许多普通网页无法完成的功能

### 3.小程序宿主环境包含的内容

### 3.1 通信模型

#### 通信的主体

小程序中的通信的主体是 <strong style="color:#DD5145">渲染层</strong> 和 <strong style="color:#DD5145">逻辑层</strong>，其中：

1. WXML 模板 和 WXSS 样式工作在渲染层
2. JS 脚本工作在逻辑层

#### 小程序的通信模型

小程序中的通信模型分为两部分：

1. **渲染层** 和 **逻辑层** 之间的通信
   - 由微信客户端进行转发
2. **逻辑层** 和 **第三方服务器** 之间的通信
   - 由微信客户端进行转发

### 3.2 运行机制

#### 小程序启动的过程

1. 把小程序的代码包下载到本地
2. 解析 app.json 全局配置文件
3. 执行 app.js 小程序入口文件，调用App () 创建小程序实例
4. 渲染小程序首页
5. 小程序启动完成

#### 页面渲染的过程

1. 加载解析页面的.json配置文件
2. 加载页面的.wxml模板和.wxss样式
3. 执行页面的.js文件，==调用Page()创建页面实例==
4. 页面渲染完成

### 3.3 组件

#### 1.小程序中的组件的分类

==小程序的组件也是由宿主环境提供的==，开发者可以基于组件快速搭建出漂亮的页面结构。官方把小程序的组件分为9大类，分别是：

1. ==视图容器==
2. ==基础内容==
3. ==表单组件==
4. ==导航组件==
5. 媒体组件
6. map地图组件
7. canvas画布组件
8. 开放能力
9. 无障碍访问

#### 2.常用的视图容器类组件

1. ==view==

   - 普通视图区域
   - 类似于HTML中的div，是一个块级元素
   - 常用来实现页面的布局效果

2. ==scroll-view==

   - 可滚动的视图区域
   - 常用来实现滚动列表效果
   - scroll-x 横向滚动
   - scroll-y 纵向滚动。竖向滚动时，必须给scroll-view一个固定高度

3. ==swiper和swiper-item==

   - 轮播图容器组件和轮播图item组件
   - swiper组件常用属性

   | 属性                   | 类型    | 默认值        | 说明                 |
   | ---------------------- | ------- | ------------- | -------------------- |
   | indicator-dots         | boolean | false         | 是否显示面板指示点   |
   | indicator-color        | color   | rgba(0,0,0,3) | 指示点颜色           |
   | indicator-active-color | color   | #000000       | 当前选中的指示点颜色 |
   | autoplay               | boolean | false         | 是否自动切换         |
   | interval               | number  | 5000          | 自动切换时间间隔     |
   | circular               | boolean | false         | 是否采用衔接滑动     |

#### 3.常用的基础内容组件

1. ==text==
   - 文本组件
   - 类似于HTML中的span标签，是一个行内元素
2. ==rich-text==
   - 富文本组件
   - 支持把HTML字符串渲染为WXML结构

通过text组件的==user-select==属性，实现长按选中文本内容的效果：

```
<view>
  手机号支持长按选中效果
  <text user-select>133333332222</text>
</view>
```

通过rich-text组件的==nodes==属性节点，==把HTML字符串渲染为对应的UI结构==：

```h
<rich-text nodes="<h1 style='color: red;'>标题</h1>"></rich-text>
```

#### 4.其他常用组件

1. ==button==
   - 按钮组件
   - 功能比HTML中的button按钮丰富
   - 通过open-type属性可以调用微信提供的各种功能（客服、转发、获取用户授权、获取用户信息等）

```
<view>-----通过type指定按钮类型-----</view>
<view>-----size="mini" 小尺寸按钮-----</view>
<view>-----plain 镂空按钮-----</view>

<button size="mini">默认按钮</button>
<button type="primary" size="mini" plain>主色调按钮</button>
<button type="warn" size="mini" plain>警告按钮</button>
```

2. ==image==

- 图片组件
- image组件默认宽度约300px，高度约240px

image组件的mode属性用来指定图片的==裁剪==和==缩放==模式，常用的mode属性值如下：

| mode值      | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| scaleToFill | (默认值)缩放模式，==不保持纵横比缩放图片==，使图片的宽高完全拉伸至==填满image元素== |
| aspectFit   | 缩放模式，==保持纵横比缩放图片，使图片的长边完全显示出来==。即可以完整地将图片显示出来 |
| aspectFill  | 缩放模式，==保持纵横比缩放图片，只保证图片的短边能完全显示出来==。 |
| widthFix    | 缩放模式，==宽度不变，高度自动变化==，保持原图宽高比不变     |
| heightFix   | 缩放模式，==高度不变，宽度自动变化==，保持原图宽高比不变     |

3. ==navigator==

- 页面导航组件
- 类似于HTML中的a链接

### 4.4 API

#### 1.小程序API概述

==小程序中的API是由宿主环境提供的==，通过这些丰富的小程序API，开发者可以方便的调用微信提供的能力，例如：获取用户信息、本地储存、支付功能等

#### 2.小程序API的三大分类

1. ==事件监听API==
   - 特点：以==on==开头，用来**监听某些事件的触发**
   - 举例：wx.**onWindowResize**(function callback) 监听窗口尺寸变化的事件
2. ==同步API==
   - 特点1：以==Sync==结尾的API都是同步API
   - 特点2：同步API的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常
   - 举例：wx.**setStorageSync**('key','value') 向本地存储中写入内容

3. ==异步API==
   - 特点：类似于jQuery中的**$.ajax(aptions)** 函数，需要通过success、fail、complete接收调用的结果
   - 举例：wx.**request**() 发起网络数据请求，通过success回调函数接收数据

## 协同工作和发布


