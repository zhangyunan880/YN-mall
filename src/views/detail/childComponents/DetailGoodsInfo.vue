<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
        <div class="info-desc">
            <div class="desc">{{detailInfo.desc}}</div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" width="100%"
                @load="imgLoad">
        </div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'DetailGoodsInfo',
        props: {
            detailInfo: {
                type: Object,
                default() {

                }
            }
        },

        data() {
            return {
                counter: 0,
                imageLength: 0
            };
        },

        methods: {
            //所有图片都加载完了 那么进行一次回调就可以了
            // 计数器 counter 等于图片的长度就回调一次
            imgLoad() {
                if (++this.counter === this.imageLength) {
                    this.$emit('imageLoad');
                }
            }
        },
        watch: {
            //监听图片的长度
            detailInfo() {
                this.imageLength = this.detailInfo.detailImage[0].list.length
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>