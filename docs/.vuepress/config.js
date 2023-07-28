module.exports = {
    // 站点配置
    base: "/", // 部署站点的基础路径,默认/
    lang: "zh-CN", // 语言设置
    title: "chenglun17 blog", // 所有页面标题的后缀，并且在默认主题的导航栏中显示
    description: "学习学习在学习", // 站点描述，它会被每个页面的 Frontmatter 中的 description 字段覆盖
    head: [["link", { rel: "icon", href: "/images/favicon.ico" }]], // 自定义的网页标签图标
    // 主题和它的配置
    themeConfig: {
        logo: '/images/avatar.png', // 左上角logo
        navbar: true, // 开启导航
        // 导航栏配置
        nav: [
            // 普通链接
            { text: '快速了解', link: '/guide/' }, // 内部链接，以docs为根目录
            // 计算机基础
            {
                text: '计算机基础', link: '/cs/', items: [
                    { text: '数据结构', link: '/cs/DS/' },
                    { text: '操作系统', link: '/cs/OS/' },
                    { text: '计算机网络', link: '/cs/CN/' },
                    { text: '计算机组成原理', link: '/cs/CO/' }
                ]
            },
            // 前端基础
            {
                text: '前端基础',
                items: [
                    { text: 'HTML/CSS', link: '/troika/html_css_study/' }, // 可不写后缀 .md
                    { text: 'JavaScript', link: '/troika/js_study/' },
                    { text: 'Web API 接口', link: '/troika/WebAPI_Interface/' },
                    { text: '各种功能', link: '/troika/various_functions/' },
                    { text: 'Promise', link: '/troika/promise_study/' },
                    { text: 'Ajax', link: '/troika/ajax_study/' },
                    { text: 'Axios', link: '/troika/axios_study/' },
                    { text: 'Webpack', link: '/troika/webpack_study/' },
                    { text: 'Babel', link: '/troika/babel_study/' },
                    { text: 'TypeScript', link: '/troika/TypeScript_Study/' },
                ]
            },
            // Web前端
            {
                text: 'Web前端', link: '/frame/', items: [
                    { text: 'Vue2.x', link: '/frame/vue_study/' },
                    { text: 'Vue3', link: '/frame/vue3_study/' },
                    { text: 'Vue面试相关', link: '/frame/VueInterview/' },
                    { text: 'React', link: '/frame/react_study/' },
                    { text: 'Bootstrap', link: '/frame/Bootstrap_study/' },
                ]
            },
            // 其他学习
            {
                text: '其他学习', link: '/others/', items: [
                    { text: 'Nodejs', link: '/others/nodejs_study/' },
                    { text: 'Git/Tortoisegit', link: '/others/git_study/' },
                    { text: '正则表达式', link: '/others/regex_study/' },
                    { text: 'Linux', link: '/others/linux_study/' },
                ]
            },
            // 移动端学习
            {
                text: '移动端', link: '/mobile/', items: [
                    { text: '小程序学习', link: '/mobile/miniprogram_study/' },
                    { text: 'uni-app', link: '/mobile/uni-app_study/' },
                ]
            },
            // java后端
            {
                text: 'Java后端', link: '/java/', items: [
                    { text: 'Java核心基础', link: '/java/java_core/' },
                    { text: 'SQL/MySQL', link: '/java/sql_study/' },
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
                        "/cs/DS/overview.md",
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
                        "/cs/CN/InterviewQuestions.md",
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
                // HTML/CSS学习
                {
                    title: 'HTML/CSS 学习',
                    path: '/troika/html_css_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/html_css_study/HTMLNotes.md",
                        "/troika/html_css_study/CSSNotes.md",
                        "/troika/html_css_study/CSSPreprocessor.md",
                        "/troika/html_css_study/BoxModel.md",
                        "/troika/html_css_study/Position.md",
                        "/troika/html_css_study/Div.md",
                        "/troika/html_css_study/CssSelector.md",
                        "/troika/html_css_study/flexLayout.md",
                        "/troika/html_css_study/transform.md",
                        "/troika/html_css_study/BFC.md",
                        "/troika/html_css_study/MediaQuery.md",
                        "/troika/html_css_study/MobileAda.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // JS学习
                {
                    title: 'JavaScript 学习',
                    path: '/troika/js_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/js_study/JS_Base.md",
                        "/troika/js_study/JS_Built-inObject.md",
                        "/troika/js_study/JS_Senior.md",
                        "/troika/js_study/JS_WebAPI.md",
                        "/troika/js_study/ES6.md",
                        "/troika/js_study/Others.md",
                        "/troika/js_study/OtherFunctions.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Web API 接口
                {
                    title: 'Web API 接口',
                    path: '/troika/WebAPI_Interface/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/WebAPI_Interface/Blob.md",
                        "/troika/WebAPI_Interface/Canvas.md",
                        "/troika/WebAPI_Interface/FormData.md",
                        "/troika/WebAPI_Interface/FileReader.md",
                        "/troika/WebAPI_Interface/WebSocket.md",
                        "/troika/WebAPI_Interface/WebWorker.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // 各种功能实现
                {
                    title: '各种功能实现',
                    path: '/troika/various_functions/',
                    sidebarDepth: 2,
                    initialOpenGroupIndex: 0,
                    children: [
                        "/troika/various_functions/uploadFile.md",
                    ]
                },
                // Promise 学习
                {
                    title: 'Promise 学习',
                    path: '/troika/promise_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/promise_study/Introduction.md",
                        "/troika/promise_study/PromiseAPI.md",
                        "/troika/promise_study/KeyIssue.md",
                        "/troika/promise_study/CustomPackage.md",
                        "/troika/promise_study/Generator.md",
                        "/troika/promise_study/async_await.md",
                        "/troika/promise_study/Comparison.md",
                        "/troika/promise_study/Question.md",
                        "/troika/promise_study/HandwrittenPromise.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Ajax 学习
                {
                    title: 'Ajax 学习',
                    path: '/troika/ajax_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/ajax_study/NativeAjax.md",
                        "/troika/ajax_study/jQueryAjax.md",
                        "/troika/ajax_study/Axios.md",
                        "/troika/ajax_study/Fetch.md",
                        "/troika/ajax_study/CrossDomain.md",
                        "/troika/ajax_study/Difference.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Axios 学习
                {
                    title: 'Axios 学习',
                    path: '/troika/axios_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/axios_study/Preparation.md",
                        "/troika/axios_study/Base.md",
                        "/troika/axios_study/AxiosUse.md",
                        "/troika/axios_study/Interceptor.md",
                        "/troika/axios_study/SecondaryPackage.md",
                        "/troika/axios_study/DifficultProblem.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Webpack学习
                {
                    title: 'Webpack 学习',
                    path: '/troika/webpack_study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/webpack_study/Intro.md",
                        "/troika/webpack_study/Base.md",
                        "/troika/webpack_study/Senior.md",
                        "/troika/webpack_study/Project.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Babel学习
                {
                    title: 'Babel 学习',
                    path: '/troika/babel_study/',
                    children: [
                        "/troika/babel_study/Base.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // TS 学习
                {
                    title: 'TypeScript 学习',
                    path: '/troika/TypeScript_Study/',
                    sidebarDepth: 2,
                    children: [
                        "/troika/TypeScript_Study/Intro.md",
                        "/troika/TypeScript_Study/Base.md",
                        "/troika/TypeScript_Study/Senior.md",
                        "/troika/TypeScript_Study/Project.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            '/frame/': [
                {
                    title: 'Vue2学习',
                    path: '/frame/vue_study/',
                    sidebarDepth: 2,
                    children: [
                        "/frame/vue_study/Vue_Base.md",
                        "/frame/vue_study/LifeCycle.md",
                        "/frame/vue_study/Components-In-Depth.md",
                        "/frame/vue_study/LogicalReuse.md",
                        "/frame/vue_study/VueCLI.md",
                        "/frame/vue_study/Vuex.md",
                        "/frame/vue_study/VueRouter.md",
                        "/frame/vue_study/Others.md",
                        "/frame/vue_study/Optimization.md",
                        "/frame/vue_study/OtherFunction.md",
                        "/frame/vue_study/OtherQuestions.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Vue3学习',
                    path: '/frame/vue3_study/',
                    sidebarDepth: 2,
                    children: [
                        "/frame/vue3_study/CreateProject.md",
                        "/frame/vue3_study/CommonCompositionAPI.md",
                        "/frame/vue3_study/OtherCompositionAPI.md",
                        "/frame/vue3_study/Advantage.md",
                        "/frame/vue3_study/NewComponent.md",
                        "/frame/vue3_study/Vue3Changes.md",
                        "/frame/vue3_study/Vue3Others.md",
                        "/frame/vue3_study/LogicalReuse.md",
                        "/frame/vue3_study/VueRouter.md",
                        "/frame/vue3_study/Pinia.md",
                        "/frame/vue3_study/VueUse.md",
                        "/frame/vue3_study/Optimization.md",
                        "/frame/vue3_study/OtherQuestions.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                {
                    title: 'Vue系列面试相关',
                    path: '/frame/VueInterview/',
                    sidebarDepth: 2,
                    children: [
                        "/frame/VueInterview/Interview.md",
                        "/frame/VueInterview/vue3Interview.md",
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
                // Nodejs学习
                {
                    title: 'Nodejs 学习',
                    path: '/others/nodejs_study/',
                    sidebarDepth: 2,
                    children: [
                        "/others/nodejs_study/Modularization.md",
                        "/others/nodejs_study/PackageManagementTool.md",
                        "/others/nodejs_study/Buffer.md",
                        "/others/nodejs_study/fsModule.md",
                        "/others/nodejs_study/pathModule.md",
                        "/others/nodejs_study/urlModule.md",
                        "/others/nodejs_study/httpModule.md",
                        "/others/nodejs_study/Express.md",
                        "/others/nodejs_study/restfulAPI.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Git学习
                {
                    title: 'Git 学习',
                    path: '/others/git_study/',
                    sidebarDepth: 2,
                    children: [
                        "/others/git_study/GitIntro.md",
                        "/others/git_study/GitBasicUse.md",
                        "/others/git_study/OperationProcess.md",
                        "/others/git_study/Problem.md",
                        "/others/git_study/Interview.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // RegExp学习
                {
                    title: 'RegExp 学习',
                    path: '/others/regex_study/',
                    sidebarDepth: 2,
                    children: [
                        "/others/regex_study/Regex.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // Linux学习
                {
                    title: 'Linux 学习',
                    path: '/others/linux_study/',
                    sidebarDepth: 2,
                    children: [

                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            '/mobile/': [
                // 小程序学习
                {
                    title: '小程序学习',
                    path: '/mobile/miniprogram_study/',
                    sidebarDepth: 2,
                    children: [
                        "/mobile/miniprogram_study/Base.md",
                        "/mobile/miniprogram_study/TemplatesAndConfiguration.md",
                        "/mobile/miniprogram_study/ViewAndLogic.md",
                        "/mobile/miniprogram_study/Senior.md",
                        "/mobile/miniprogram_study/CustomComponent.md",
                        "/mobile/miniprogram_study/MobX.md",
                        "/mobile/miniprogram_study/Subcontract.md",
                        "/mobile/miniprogram_study/VantWeapp.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // uni-app
                {
                    title: 'uni-app',
                    path: '/mobile/uni-app_study/',
                    sidebarDepth: 2,
                    children: [
                        "/mobile/uni-app_study/uni-appNotes.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            '/java/': [
                // Java核心基础
                {
                    title: 'Java 核心基础',
                    path: '/java/java_core/',
                    sidebarDepth: 2,
                    children: [
                        "/java/java_core/Base.md",
                        "/java/java_core/Senior.md",
                    ],
                    initialOpenGroupIndex: 0
                },
                // SQL学习
                {
                    title: 'SQL/MySQL',
                    path: '/java/sql_study/',
                    sidebarDepth: 2,
                    children: [
                        "/java/sql_study/Base.md",
                        "/java/sql_study/Senior.md",
                        "/java/sql_study/Function.md",
                    ],
                    initialOpenGroupIndex: 0
                },
            ],
            // fallback
            '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
        },
        smoothScroll: true, // 页面滚动
        sidebarDepth: 2, // 侧边栏显示2级
        sidebarOpen: true, // 初始状态是否打开侧边栏，默认true
        // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
        // nextLinks: false,
        // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        // prevLinks: false,
    },
    plugins: [
        ['@vuepress/back-to-top'], // 回到顶部
        ['@vuepress/last-updated'], // 更新日期（git）
        ['@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        }],
        ['vuepress-plugin-code-copy', true], // 复制代码块
    ],
    // 解决中文图片资源路径
    markdown: {
        // lineNumbers: true, // 显示代码块行号
        extendMarkdown: md => {
            md.use(require("markdown-it-disable-url-encode"))
        }
    }
}