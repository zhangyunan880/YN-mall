<template>
    <div id="detial">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">

            <detail-swiper :topimages="topimages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detial-param-info ref="params" :goodsParams="paraminfo"></detial-param-info>
            <detial-comment-info ref="comment" :comment-info="commentInfo"></detial-comment-info>
            <detial-recommend ref="recommend" :recommendList="recommendList"></detial-recommend>

        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <backTop @click.native="backClick" v-show="isShowBackTop"></backTop>
        <!-- <toast :message="message" :show="show"></toast> -->
    </div>
</template>

<script>
    import DetailNavBar from '@/views/detail/childComponents/DetailNavBar'
    import DetailSwiper from './childComponents/DetailSwiper.vue';
    import DetailBaseInfo from './childComponents/DetailBaseInfo.vue';
    import DetailShopInfo from './childComponents/DetailShopInfo.vue';
    import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
    import DetialParamInfo from '@/views/detail/childComponents/DetialParamInfo'
    import DetialCommentInfo from '@/views/detail/childComponents/DetialCommentInfo'
    import DetialRecommend from '@/views/detail/childComponents/DetialRecommend'
    import DetailBottomBar from '@/views/detail/childComponents/DetailBottomBar'
    import Scroll from '@/components/common/scroll/Scroll.vue';
    import BackTop from '@/components/content/backTop/BackTop.vue'
    // import Toast from '@/components/common/toast/Toast'
    import { getDetail, Goods, Shop, GoodsParam, getGoodsRecommend } from '@/network/detail'
    import { debounce } from '@/common/utils';
    import { mapActions } from 'vuex';
    export default {
        name: 'MyDetail',
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetialParamInfo,
            DetialCommentInfo,
            DetialRecommend,
            DetailBottomBar,
            Scroll,
            BackTop,
            // Toast
        },

        data() {
            return {
                iid: null,
                topimages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paraminfo: {},
                commentInfo: {},
                recommendList: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
                isShowBackTop: false,
                // message: '',
                // show: false
            }
        },

        created() {
            //保存传入的iid
            this.iid = this.$route.params.iid

            //根据iid请求详情数据
            getDetail(this.iid).then((res) => {
                console.log(res);
                const data = res.result
                //1.获取顶部的图片轮播数据
                this.topimages = data.itemInfo.topImages

                //2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                //3.创建店铺信息
                this.shop = new Shop(data.shopInfo)

                //4.保存商品详情数据
                this.detailInfo = data.detailInfo

                //5.取出详情信息
                this.paraminfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //6.取出评论的信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }



                // this.$nextTick(() => {
                //     this.themeTopYs = []
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop, this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop)
                //     console.log(this.themeTopYs);
                // });

            })


            //7.推荐数据
            getGoodsRecommend().then((res) => {
                this.recommendList = res.data.list;

            })

            //给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                //获取各个组件高度
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
                console.log(this.themeTopYs);

                this.$refs.scorll && this.$refs.scorll.refresh();
            })


        },
        mounted() {

        },
        updated() {
            // this.themeTopYs = []
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop, this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop)
            // console.log(this.themeTopYs);
        },
        methods: {
            ...mapActions(['addCart']),
            imageLoad() {
                // 监听
                
                this.$refs.scroll.refresh()
                this.getThemeTopY()
            },
            //点击导航调转到指定位置
            titleClick(index) {
                console.log(index);
                //用索引值来判定位置
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])


            },
            //nav随内容滚动current变化
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 1000

                // console.log(position);
                const positionY = -position.y
                //[0, 6456, 7194, 7411,非常大的值] 
                //positionY 在 0 和 6465 之间 index=0
                //positionY 在 6465 和 7194 之间 index=1
                //positionY 在 7194 和 7411 之间 index=2
                //positionY 在 7411 和 非常大的值 index=3
                let length = this.themeTopYs.length
                for (let i = 0; i < length; i++) {
                    // console.log(i);
                    // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
                    //     console.log(i);
                    // }
                    //娶不到length 所以-1
                    // if (this.currentIndex !== i &&
                    //     ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
                    //         (i == length - 1 && positionY >= this.themeTopYs[i]))) {
                    //     this.currentIndex = i
                    //     this.$refs.nav.currentIndex = i
                    // }
                    //在一定区间内
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = i
                    }
                }

            },
            //回到顶部
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },

            addToCart() {
                //获取购物车需要展示的信息
                const product = {}
                product.image = this.topimages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid


                //将商品添加到购物车里面
                // this.$store.commit('addCart',product )
                // this.$store.dispatch('addCart', product).then(res => {
                //     console.log(res);
                // });

                //采用简写 要导入 然后扩展运算符 在拿来用
                this.addCart(product).then(res => {

                    this.$toast.show(res, 2000)
                })

            }
        },








    };
</script>

<style scoped>
    #detial {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .content {
        height: calc(100% - 44px);
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>