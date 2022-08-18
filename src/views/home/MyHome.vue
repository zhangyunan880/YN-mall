<template>
    <div id="home">
        <my-nav-bar class="home-nav">
            <template v-slot:center>购物街</template>
        </my-nav-bar>
        <tab-control 
        class="tab-control" 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick" 
        ref="tabControl1"
        v-show="istabfixed"
        >
        </tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll" :pull-up-load="true"
            @pullingUp="loadMore">
            <my-swiper :banners="banners" @swiperimageload="swiperimageload"></my-swiper>
            <my-recommend :recommends="recommends"></my-recommend>
            <feature-view></feature-view>
            <tab-control 
            class="tab-control" 
            :titles="['流行','新款','精选']" 
            @tabClick="tabClick" 
            ref="tabControl2"
            >
            </tab-control>
            <goods-list :goods="showGoods"></goods-list>

        </scroll>
        <!-- native监听组件根元素的原声事件  -->
        <backTop @click.native="backClick" v-show="isShowBackTop"></backTop>

    </div>
</template>
<script>
    import MySwiper from '@/views/home/childComponents/swiper.vue'
    import MyRecommend from './childComponents/Recommend.vue'
    import FeatureView from './childComponents/Featureview.vue'

    import MyNavBar from '@/components/common/navbar/MyNavBar'
    import TabControl from '@/components/content/tabControl/TabControl.vue'
    import GoodsList from '@/components/content/goods/GoodsList'
    import Scroll from '@/components/common/scroll/Scroll.vue'
    import BackTop from '@/components/content/backTop/BackTop.vue'
    import { getHomeMultidata, getHomeGoods } from '../../network/home'
    import { debounce } from '@/common/utils'


    export default {
        name: 'MyHome',
        components: {
            MySwiper,
            MyRecommend,
            FeatureView,
            MyNavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop,

        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': { page: 0, list: [] },
                    'new': { page: 0, list: [] },
                    'sell': { page: 0, list: [] },

                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                istabfixed: false,
            }
        },
        created() {
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')

        },
        mounted() {
            //图片加载事件监听
            const refresh = debounce(this.scroll && this.$refs.scroll.refresh, 500)
            //监听
            this.$bus.$on('imageload', () => {
                // console.log(111);
                refresh()
            })

            //获取tabControl的offsettop
            //所有的组件都有一个属性$el 用于获取组件中的元素
            // this.tabOffsetTop=this.$refs.tabControl
            // console.log(this.$refs.tabControl.$el.offsetTop);


        },

        methods: {
            // 网络请求
            getHomeMultidata() {
                getHomeMultidata().then((res) => {
                    console.log(res);
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then((res) => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp()
                })
            },

            // 事件监听相关
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.tabControl1.currentIndex=index
                this.$refs.tabControl2.currentIndex=index

            },

            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },

            contentscroll(position) {
                // console.log(position);
                //判断backtop是否显示
                this.isShowBackTop = (-position.y) > 1000

                //决定tabcontrol是否吸顶(position:fixed)
                this.istabfixed = (-position.y) > this.tabOffsetTop

            },
            //加载更多
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            swiperimageload() {
                //加上轮播图的值
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
                console.log(this.tabOffsetTop);
            }


        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        deactivated() {
            //2取消全局事件监听
            
        },


    }
</script>
<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: white;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }

    /* .tab-control {
        position: sticky;
        top: 44px;
    } */
   
    .content {
        height: calc(100% - 49px);
        overflow: hidden;
    }
</style>