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
            //???????????????iid
            this.iid = this.$route.params.iid

            //??????iid??????????????????
            getDetail(this.iid).then((res) => {
                console.log(res);
                const data = res.result
                //1.?????????????????????????????????
                this.topimages = data.itemInfo.topImages

                //2.??????????????????
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                //3.??????????????????
                this.shop = new Shop(data.shopInfo)

                //4.????????????????????????
                this.detailInfo = data.detailInfo

                //5.??????????????????
                this.paraminfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //6.?????????????????????
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }



                // this.$nextTick(() => {
                //     this.themeTopYs = []
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop, this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop)
                //     console.log(this.themeTopYs);
                // });

            })


            //7.????????????
            getGoodsRecommend().then((res) => {
                this.recommendList = res.data.list;

            })

            //???getThemeTopY??????
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                //????????????????????????
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
                // ??????
                
                this.$refs.scroll.refresh()
                this.getThemeTopY()
            },
            //?????????????????????????????????
            titleClick(index) {
                console.log(index);
                //???????????????????????????
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])


            },
            //nav???????????????current??????
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 1000

                // console.log(position);
                const positionY = -position.y
                //[0, 6456, 7194, 7411,???????????????] 
                //positionY ??? 0 ??? 6465 ?????? index=0
                //positionY ??? 6465 ??? 7194 ?????? index=1
                //positionY ??? 7194 ??? 7411 ?????? index=2
                //positionY ??? 7411 ??? ??????????????? index=3
                let length = this.themeTopYs.length
                for (let i = 0; i < length; i++) {
                    // console.log(i);
                    // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
                    //     console.log(i);
                    // }
                    //?????????length ??????-1
                    // if (this.currentIndex !== i &&
                    //     ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
                    //         (i == length - 1 && positionY >= this.themeTopYs[i]))) {
                    //     this.currentIndex = i
                    //     this.$refs.nav.currentIndex = i
                    // }
                    //??????????????????
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = i
                    }
                }

            },
            //????????????
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },

            addToCart() {
                //????????????????????????????????????
                const product = {}
                product.image = this.topimages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid


                //?????????????????????????????????
                // this.$store.commit('addCart',product )
                // this.$store.dispatch('addCart', product).then(res => {
                //     console.log(res);
                // });

                //???????????? ????????? ????????????????????? ????????????
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