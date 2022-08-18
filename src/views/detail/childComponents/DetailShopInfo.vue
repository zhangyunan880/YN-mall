<template>
    <div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
        <div class="flex shop-name-info">
            <img :src="shop.logo" alt="" class="shop-img">
            <div>{{shop.name}}</div>
        </div>
        <div class="flex shop-other-info">
            <div class="flex shop-other-item shop-other-sell">
                <div>
                    <p class="f16">{{shop.sells | sellCountFilter}}</p>
                    <p>总销量</p>
                </div>
                <div>
                    <p class="f16">{{shop.goodsCount}}</p>
                    <p>全部宝贝</p>
                </div>
            </div>
            <div class="shop-other-item shop-other-right">
                <div v-for="(item,index) in shop.score" :key="index">
                    {{item.name}}&ensp;
                    <span class="score" :class="{'score-better':item.isBetter}">{{item.score}}</span>
                    <span class="score-bg" :class="{'better-more':item.isBetter}">{{item.isBetter? '高' : '低'}}</span>
                </div>
            </div>
        </div>
        <div class="enter-shop-wrap">
            <div class="enter-shop">进店逛逛</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DetailShopInfo',
        props: {
            shop: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        filters: {
            sellCountFilter(vlaue) {
                if (vlaue < 10000) return vlaue
                return (vlaue / 10000).toFixed(1) + '万'


            }
        }


    };
</script>

<style scoped>
    .f16 {
        font-size: 16px;
    }

    .shop-name-info {
        align-items: center;
        margin: 10px 10px;
        display: flex;
    }
    .shop-name-info div{
        flex: 1;
    }
    .shop-name-info .shop-img {
        border-radius: 100%;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align: middle;
    }

    .shop-other-info {
        font-size: 12px;
        align-items: center;
        line-height: 22px;
        display: flex;
    }

    .shop-other-item {
        flex: 1;
    }

    .shop-other-sell {
        border-right: 1px solid #ececec;
        display: flex;
        width: 50%;
    }

    .shop-other-sell div {
        flex: 1;
        text-align: center;
    }

    .shop-other-right {
        padding-left: 40px;

        width: 50%;
    }

    .score {
        display: inline-block;
        width: 30px;
        color:green;
    }

    .score-bg {
        background-color: green;
        color: #fff;
        padding: 1px 4px;
        font-size: 12px;
    }

    .enter-shop-wrap {
        text-align: center;
    }

    .enter-shop {
        display: inline-block;
        background-color: #f2f2f2;
        font-size: 12px;
        padding: 6px 30px;
        border-radius: 100px;
        margin: 10px;
    }
    .score-better{
       color: #f13e3a;
    }
    .better-more{
       background-color: #f13e3a;

    }
</style>