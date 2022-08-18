<template>
    <div class="bottom-bar">
        <div class="check">
            <check-goods-btn :isChecked="isSelectAll" @click.native="checkClick"></check-goods-btn>
            <span>全选</span>
        </div>
        <div class="all-price">合计：￥{{totalPrice}}</div>
        <div class="settle-accounts" @click="calcClick">去结算（{{checklength}}）</div>
    </div>
</template>

<script>
    import CheckGoodsBtn from '@/components/content/checkButton/CheckGoodsBtn.vue';

    // import { debounce } from '@/common/utils';

    import { mapGetters } from 'vuex';

    export default {
        name: 'CartBottomBar',
        components: {
            CheckGoodsBtn,
        },
        computed: {
            ...mapGetters(['cartList']),
            //购物车计算总价
            totalPrice() {                       //把为true的过滤出来
                return this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            //去结算
            checklength() {
                return this.cartList.filter(item => item.checked).length

            },
            //全选
            isSelectAll() {
                //过滤出不被选中的长度后取反 返回false              //过滤出不被选中的
                // return !(this.cartList.filter(item => !item.checked).length)
                if (this.cartList.length === 0) return false
                return !this.cartList.find(item => !item.checked)
            }
        },
        methods: {
            //点击全选
            //原来都是选中 点击一次全部不选中 原来都是不选中(某些不选中)全部选中
            checkClick() {
                if (this.isSelectAll) {//全部选中
                    this.cartList.forEach(item => item.checked = false)
                } else {
                    this.cartList.forEach(item => item.checked = true)
                    console.log(11234567);
                }
            },
            calcClick() {
                if (!this.isSelectAll) {
                    // this.$toast.show('请选择购买的商品', 2000)
                    this.$toast.show("去结算");
                }
            }
        },
    }                          
</script>

<style scoped>
    .bottom-bar {
        height: 40px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* padding: 0 8px; */
        text-align: center;
        background: #f6f6f6;
        /* bottom: 40px; */
    }

    .bottom-bar .check {
        /* width: 70px; */
        display: flex;
    }

    .bottom-bar .check span {
        margin-left: 8px;
    }

    .bottom-bar .all-price {
        flex: 1;
    }

    .bottom-bar .settle-accounts {
        width: 120px;
        height: 100%;
        line-height: 40px;
        color: #fff;
        background: red;
    }
</style>