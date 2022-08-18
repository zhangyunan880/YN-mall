<template>
    <TabBar>

        <tab-bar-item path="/MyHome">
            <!-- 新写法 -->
            <template v-slot:item-icon><img src="@/assets/img/tabbar/sy.svg" alt=""> </template>
            <template v-slot:item-icon-active><img src="@/assets/img/tabbar/sy1.svg" alt=""></template>
            <template v-slot:item-text>
                <div slot="item-text">首页</div>
            </template>
        </tab-bar-item>


        <tab-bar-item path="/MyCategory">
            <img slot="item-icon" src="@/assets/img/tabbar/fl.svg" alt="">
            <img slot="item-icon-active" src="@/assets/img/tabbar/fl1.svg" alt="">
            <div slot="item-text">分类</div>
        </tab-bar-item>

        <tab-bar-item path="/MyCart">
            <img slot="item-icon" src="@/assets/img/tabbar/gwc.svg" alt="">
            <img slot="item-icon-active" src="@/assets/img/tabbar/gwc1.svg" alt="">
            <div slot="item-text">购物车</div>
        </tab-bar-item>

        <tab-bar-item path="/MyProfile">
            <img slot="item-icon" src="@/assets/img/tabbar/wd.svg" alt="">
            <img slot="item-icon-active" src="@/assets/img/tabbar/wd1.svg" alt="">
            <div slot="item-text">我的</div>
        </tab-bar-item>




    </TabBar>
</template>
<script>

    import TabBar from '@/components/common/tabbar/TabBar'
    import TabBarItem from '@/components/common/tabbar/TabBarItem'

    export default {
        name: 'MainTabbar',
        components: {
            TabBar,
            TabBarItem
        }
    }
</script>
<style>

</style>