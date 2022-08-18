<template>
    <div class="goods-item" @click="itemClick">
        <img :src="showImage" alt="" @load="imageload">
        <div class="goods-info">
            <p>{{goodsitem.title}}</p>
            <span class="price">{{goodsitem.price}}</span>
            <span class="collect">⭐{{goodsitem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoodsListItem',
        props: {
            goodsitem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            imageload() {
                if (this.$route.path.indexOf('/home')>-1) {
                    this.$bus.$emit('imageload')

                }else if (this.$route.path.indexOf('/detail')>-1) {
                    this.$bus.$emit('detailimageload')
                    
                }
            },
            itemClick() {
                this.$router.push('/detail/' + this.goodsitem.iid)
                console.log(this.goodsitem.iid);
            }
        },
        computed: {
            showImage() {
                return this.goodsitem.image || this.goodsitem.show.img

            }
        }

    };
</script>

<style scoped>
    .goods-item {
        width: 48%;

        padding-bottom: 40px;
        position: relative;
    }

    .goods-item img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collecta {
        position: relative;
    }
</style>