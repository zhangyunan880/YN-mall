<template lang="">
    <div>

        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banners" :key="item.id">
                <a :href="item.link">
                    <img :src="item.image" width="100%" height="100%" @load="imageload">
                </a>
            </van-swipe-item>

        </van-swipe>

        <!-- <el-carousel trigger="click">
            <el-carousel-item v-for="item in banners" :key="item.id">
                <a :href="item.link">
                    <img :src="item.image" width="100%" height="100%" @load="imageload">
                </a>
            </el-carousel-item>
        </el-carousel> -->


    </div>
</template>
<script>

    export default {
        name: 'MySwiper',
        data() {
            return {
                isload: false
            };
        },
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            imageload() {
                // console.log(11111111111);
                if (!this.isload) {
                    //监听轮播图
                    this.$emit('swiperimageload');
                    this.isload = true
                }

            }
        },
    }
</script>
<style>

</style>