<template>
    <div class="detail-recommend">
        <goods-list :goods="recommendList"></goods-list>
    </div>
</template>

<script>
    import GoodsList from '@/components/content/goods/GoodsList.vue';
    export default {
        name: 'DetialRecommend',
        props: {
            recommendList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        components: {
            GoodsList
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