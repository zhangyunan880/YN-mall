<template>
    <div>
        
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :height="400" >
            <van-swipe-item v-for="item in topimages" :key="item.id"> 
                <img :src="item" alt=""  width="100%" >     
            </van-swipe-item>

        </van-swipe>

    </div>
</template>

<script>
    export default {
        name: 'DetailSwiper',
        props: {
            topimages: {
                type: Array,
                default() {
                    return []
                }
            }
        },

        data() {
            return {

            };
        },

        mounted() {

        },

        methods: {

        },
    };
</script>

<style lang="scss" scoped>

</style>