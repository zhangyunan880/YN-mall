<template>
    <div class="goods">
        <!-- 父传子 子传孙   传递过来然后再来遍历-->
        <goods-list-item v-for="item in goods"  :goodsitem="item"  :key="item.id"></goods-list-item>

    </div>
</template>

<script>
    import GoodsListItem from './GoodsListItem.vue';
export default {
    name: 'GoodsList',
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
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

<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

</style>