<template>
    <div>
        <my-nav-bar>
            <template v-slot:left>
                <img src="@/assets/img/common/back.svg" alt="" class="backimg" @click="backClick">
            </template>
            <div slot=center class="title">
                <div v-for="(item,index) in titles" :key="index" class="title-item"
                    :class="{active:index===currentIndex}" @click="titleClick(index)">{{item}}</div>
            </div>
        </my-nav-bar>
    </div>
</template>

<script>
    import MyNavBar from '@/components/common/navbar/MyNavBar'
    export default {
        name: 'DetailNavBar',
        components: {
            MyNavBar
        },

        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            };
        },

        mounted() {

        },

        methods: {
            titleClick(index) {
                //样式变化
                this.currentIndex = index
                this.$emit('titleClick', index);
                
            },
            backClick() {
                this.$router.back()

            }
        },
    };
</script>

<style scoped>
    .title {
        display: flex;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
    }

    .backimg {
        margin-top: 10px;
    }
</style>