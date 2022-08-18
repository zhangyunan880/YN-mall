<template>
    <div id="cart">
        <my-nav-bar class="cart-nav">
            <div slot="center">
                购物车({{cartLength}})
            </div>
        </my-nav-bar>

        <scroll class="cart-scroll">
            <cart-list :cartList="cartList" />
        </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    import MyNavBar from '@/components/common/navbar/MyNavBar.vue';
    import CartList from '@/views/cart/childComponents/CartList'
    import Scroll from '@/components/common/scroll/Scroll.vue';
    import CartBottomBar from './childComponents/CartBottomBar.vue';
    import { mapGetters } from 'vuex';
    export default {
        name: 'MyCart',
        components: {
            Scroll,
            MyNavBar,
            CartList,
            CartBottomBar
        },

        data() {
            return {

            };
        },
        computed: {
            ...mapGetters(['cartLength', 'cartList'])
        },

        methods: {

        },
    };
</script>

<style scoped>
    #cart {
        height: 100vh;
    }

    .cart-nav {
        background: var(--color-tint);
        color: #fff;
    }

    .cart-scroll {
        height: calc(100% - 49px - 44px - 40px);
        overflow: hidden;
    }
</style>