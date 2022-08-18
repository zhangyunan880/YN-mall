<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    // import Pullup from '@better-scroll/pull-up'
    // BScroll.use(Pullup)
    export default {
        name: 'MyScroll',
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                scroll: null
            };
        },

        mounted() {
            //1创建bscroll对像
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                observeImage: true,
                observeDOM: true,



            })
            //监听滚动位置
            this.scroll.on('scroll', (position) => {
                // console.log(position);
                //自定义事件
                this.$emit('scroll', position);
            })
            //监听上拉事件
            this.scroll.on('pullingUp', () => {
                // console.log('上拉加载更多');
                this.$emit('pullingUp')
            })

        },

        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()

            }
        },
    };
</script>

<style scoped>

</style>