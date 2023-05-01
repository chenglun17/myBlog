<template>
    <main class="home" :aria-labelledby="data.heroText !== null ? 'main-title' : null">
        <!-- 主体区域 -->
        <header class="hero">
            <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'" />

            <div class="home-main">
                <h1 v-if="data.heroText !== null" id="main-title">
                    {{ data.heroText || $title || 'Hello' }}
                </h1>

                <p v-if="data.tagline !== null" class="description">
                    {{ data.tagline || $description || 'Welcome to your VuePress site' }}
                </p>

                <p v-if="data.actionText && data.actionLink" class="action">
                    <NavLink class="action-button" :item="actionLink" />
                </p>
            </div>
        </header>
        <!-- 底部区域 -->
        <div v-if="data.features && data.features.length" class="features">
            <div v-for="(feature, index) in data.features" :key="index" class="feature">
                <h2>这是一个图标</h2>
                <h2>{{ feature.title }}</h2>
                <p>{{ feature.details }}</p>
            </div>
        </div>

        <Content class="theme-default-content custom" />

        <div v-if="data.footer" class="footer">
            {{ data.footer }}
        </div>

        <Content v-else slot-key="footer" class="footer" />
    </main>
</template>

<script>
    import NavLink from '@theme/components/NavLink.vue'

    export default {
        name: 'Home',

        components: { NavLink },

        computed: {
            data() {
                return this.$page.frontmatter
            },

            actionLink() {
                return {
                    link: this.data.actionLink,
                    text: this.data.actionText,
                }
            },
        },
    }
</script>

<style lang="stylus" scoped>
    @media (max-width: $MQMobile)
      .home
        .features
          flex-direction column
        .feature
          max-width 100%
          padding 0 2.5rem

    @media (max-width: $MQMobileNarrow)
      .home
        padding-left 1.5rem
        padding-right 1.5rem
        .hero
          img
            max-height 210px
            margin 2rem auto 1.2rem
          h1
            font-size 2rem
          h1, .description, .action
            margin 1.2rem auto
          .description
            font-size 1.2rem
          .action-button
            font-size 1rem
            padding 0.6rem 1.2rem
        .feature
          h2
            font-size 1.25rem

    .home
        padding $navbarHeight 2rem 0
        max-width $homePageWidth
        max-width 1000px
        margin 0px auto
        display block

      .hero
        display flex
        flex-direction row
        justify-content space-around
        flex-flow wrap
        text-align center
        margin .625rem
        img
            max-width 100%
            max-height 250px
            display block
            margin 3rem 1.5rem 3rem 1.5rem
            border-radius 10%
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2)
        .home-main
            display flex
            flex-direction column
            justify-content center
            margin-top 1rem auto 1rem
            h1
                font-size 3rem
            h1, .description, .action
                margin 1.5rem auto
            .description
                max-width 35rem
                font-size 1.6rem
                line-height 1.3
                color lighten($textColor, 40%)
            .action-button
                display inline-block
                font-size 1rem
                color #fff
                background-color $accentColor
                padding 0.8rem 1.6rem
                border-radius 4px
                transition background-color .1s ease
                box-sizing border-box
                border-bottom 1px solid darken($accentColor, 10%)
                &:hover
                    background-color lighten($accentColor, 10%)

      .features
        border-top 1px solid $borderColor
        padding 1.2rem 0
        margin 2.5rem 0
        display flex
        // justify-content center
        flex-wrap wrap
        // align-items flex-start
        // align-content stretch

      .feature
        // flex-grow 1
        // flex-basis 30%
        max-width 30%
        min-height 3.75rem
        flex 1
        padding .625rem
        margin .625rem
        height 100%
        background-color #f6f6f7
        border-radius 5%
        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.2)
        h2
          font-size 1.4rem
          font-weight 500
          border-bottom none
          padding-bottom 0
          color lighten($textColor, 10%)
        p
          color lighten($textColor, 25%)

      .footer
        padding 2.5rem
        border-top 1px solid $borderColor
        text-align center
        color lighten($textColor, 25%)
</style>
