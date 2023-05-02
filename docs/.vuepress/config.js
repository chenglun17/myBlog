module.exports = {
    // 站点配置
    base: "/",
    lang: "zh-CN",
    title: "chenglun17 blog",
    description: "学习学习在学习",
    head: [["link", { rel: "icon", href: "/images/favicon.ico" }]], // 自定义的网页标签图标
    // 主题和它的配置
    themeConfig: {
        logo: '/images/avatar.png', // 左上角logo
        navbar: true, // 开启导航
        // 导航栏配置
        nav: [
            // 普通链接
            { text: '更新日志', link: '/guide/' }, // 内部链接，以docs为根目录
            // 计算机基础
            {
                text: '计算机基础', link: '/cs/', items: [
                    { text: '数据结构', link: '/cs/DS/' },
                    { text: '操作系统', link: '/cs/OS/' },
                    { text: '计算机网络', link: '/cs/CN/' },
                    { text: '计算机组成原理', link: '/cs/CO/' }
                ]
            },
            // 核心技术
            {
                text: '核心技术',
                items: [
                    { text: 'HTML/CSS', link: '/troika/html_css_study/' }, // 可不写后缀 .md
                    { text: 'JavaScript', link: '/troika/js_study/' },
                    { text: 'Promise', link: '/troika/promise_study/' },
                    { text: 'Ajax', link: '/troika/ajax_study/' },
                    { text: 'Axios', link: '/troika/axios_study/' },
                ]
            },
            // 主流框架
            {
                text: '主流框架', link: '/frame/', items: [
                    { text: 'Vue', link: '/frame/vue_study/' },
                    { text: 'React', link: '/frame/react_study/' }
                ]
            },
            // 其他学习
            {
                text: '其他学习', link: '/others/', items: [
                    { text: 'Nodejs', link: '/others/nodejs_study/' },
                    { text: 'Webpack', link: '/others/webpack_study/' },
                    { text: 'Git', link: '/others/git_study/' }
                ]
            },
            { text: 'GitHub', link: 'https://github.com/chenglun17' },
        ],
        // 侧边栏配置
        sidebar: {
            // docs文件夹下面的guide文件夹 文档中md文件 书写的位置(命名随意)
            '/guide/': [
                {
                    title: '介绍',   		 // 必要的 GROUP1
                    path: '/guide/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false,   // 可选的, 默认值是 true,
                    sidebarDepth: 2,      // 可选的, 默认值是 1
                    children: [
                        ['', '快速了解'],     // 以docs为根目录来查找文件
                        ['fastIn', '快速入门'],     // 地址查找的是 docs/guide/fastIn.md 文件
                        ['projectIntroduce', '项目介绍'],
                        ['frontHandbook', '前端手册'],
                        ['behindHandbook', '后端手册'],
                    ],
                    initialOpenGroupIndex: 0
                },

            ],
            '/cs/': [
                {
                    title: '数据结构',
                    path: '/cs/DS/',
                    sidebarDepth: 2,
                    children: [
                        // "/cs/nodejs_study/NodeJsNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: '操作系统',
                    path: '/cs/OS/',
                    sidebarDepth: 2,
                    children: [
                        // "/cs/webpack_study/WebpackNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: '计算机网络',
                    path: '/cs/CN/',
                    sidebarDepth: 2,
                    children: [
                        // "/cs/git_study/GitNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: '计算机组成原理',
                    path: '/cs/CO/',
                    sidebarDepth: 2,
                    children: [
                        // "/cs/git_study/GitNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            '/troika/': [
                {
                    title: 'HTML/CSS学习',
                    path: '/troika/html_css_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/html_css_study/flexLayout.md",
                        "/troika/html_css_study/transform.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'JS学习',
                    path: '/troika/js_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/js_study/base.md",
                        "/troika/js_study/WebAPI.md",
                        "/troika/js_study/senior.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Promise学习',
                    path: '/troika/promise_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/promise_study/PromiseNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Ajax学习',
                    path: '/troika/ajax_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/ajax_study/AjaxNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Axios学习',
                    path: '/troika/axios_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/axios_study/axiosNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            '/frame/': [
                {
                    title: 'Vue学习',
                    path: '/frame/vue_study/',
                    sidebarDepth: 2,
                    children: [
                        "/frame/vue_study/Vue笔记.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'React学习',
                    path: '/frame/react_study/',
                    sidebarDepth: 2,
                    children: [
                        // "/frame/react_study/WebpackNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            '/others/': [
                {
                    title: 'Nodejs学习',
                    path: '/others/nodejs_study/',
                    sidebarDepth: 2,
                    children: [
                        "/others/nodejs_study/NodeJsNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Webpack学习',
                    path: '/others/webpack_study/',
                    sidebarDepth: 2,
                    children: [
                        "/others/webpack_study/WebpackNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Git学习',
                    path: '/others/git_study/',
                    sidebarDepth: 2,
                    children: [
                        "/others/git_study/GitNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            // fallback
            '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
        },
        smoothScroll: true, // 页面滚动
        sidebarDepth: 3, // 侧边栏显示2级
        // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
        // nextLinks: false,
        // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        // prevLinks: false,
    }
}