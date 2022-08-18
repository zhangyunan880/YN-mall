<template>
    <div>
        <div class="rescommend">
            <div v-for="item in recommends" :key="item.id" class="recommend-item">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                    <div>{{item.title}}</div>
                </a>
            </div>
        </div>
    </div>
</template> 
<script>
export default {
    name:'MyRecommend',
    props:{
        recommends:{
            type:Array,
            default( ){
                return []
            }
        }
    }
}
</script>
<style >
    .rescommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 15px 0 30px;
        border-bottom: 8px solid  #eee;;

    }
    .recommend-item{
      flex: 1;
      text-align: center ;
    }
    .recommend-item img{
        width: 75px;
        height: 80px;
        margin-bottom: 10px;
    }
</style>