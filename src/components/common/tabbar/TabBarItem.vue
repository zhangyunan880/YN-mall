<template>
    <div class="tab-bar-item" @click="itemClick()">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>

        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>


    </div>

</template>
<script>
    export default {
        name: "TabBarItem",
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },

        data() {
            return {
                // isActive: false
            }
        },
        computed: {
            isActive() {
                //$route 处于活跃的路由 true
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle() {
                return this.isActive ? { color: this.activeColor } : {}
            }
        },

        methods: {
            //实现跳转
            itemClick() {
                this.$router.push(this.path)

            }
        },

    }
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
        margin-top: 3px;
    }

    .tab-bar-item img {
        /* 去除图片底部3像素距离 */
        vertical-align: middle;
        margin-bottom: 2px;

    }

    .active {

        color: red;
    }
</style>