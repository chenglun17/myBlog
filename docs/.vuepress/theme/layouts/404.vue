<template>
    <div class="theme-container">
        <div class="theme-default-content">
            <h1>404</h1>

            <blockquote>{{ getMsg() }}</blockquote>

            <RouterLink to="/"> Take me home. </RouterLink>
        </div>
    </div>
</template>

<script>
    const msgs = [
        `页面找不到吗？或许是我正在筹备中...`,
        `这个页面正在准备中，请稍等...`,
        `这个页面出了一点问题，我正在解决！`,
        `要不我们换一个地方看看`,
    ]

    export default {
        methods: {
            getMsg() {
                return msgs[Math.floor(Math.random() * msgs.length)]
            },
        },
    }
</script>
