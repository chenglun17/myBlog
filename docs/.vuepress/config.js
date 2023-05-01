module.exports = {
    // 站点配置
    base: "/",
    lang: "zh-CN",
    title: "chenglun17 Blog",
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
            {
                text: '计算机基础', link: '/cs/', items: [
                    // { text: '数据结构', link: '/troika/html_study/' },
                    // { text: '计算机网络', link: '/troika/html_study/' },
                    // { text: '计算机组成原理', link: '/troika/html_study/' },
                    // { text: '操作系统', link: '/troika/html_study/' }
                ]
            },
            // 下拉列表
            {
                text: '三驾马车',
                items: [
                    { text: 'HTML', link: '/troika/html_study/' },
                    { text: 'CSS', link: '/troika/css_study/' }, // 可不写后缀 .md
                    { text: 'JavaScript', link: '/troika/js_study/' },
                ]
            },
            // 分组下拉列表
            {
                text: '主流框架', link: '/frame/', items: [
                    { text: 'Vue', link: '/frame/vue/' },
                    { text: 'React', link: '/frame/react/' }
                ]
            },
            {
                text: '其他学习', link: '/others/', items: [
                    // { text: 'Nodejs', link: '/troika/html_study/' },
                    // { text: 'Webpack', link: '/troika/html_study/' },
                    // { text: 'Git', link: '/troika/html_study/' }
                ]
            },
            { text: 'GitHub', link: 'https://baidu.com' },
        ],
        // 侧边栏配置
        sidebar: {
            '/troika/': [
                {
                    title: 'CSS学习',
                    path: '/troika/css_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/css_study/flexLayout.md",
                        "/troika/css_study/transform.md",
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
            ],
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