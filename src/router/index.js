import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const MyHome = () => import('@/views/home/MyHome')
const MyCategory = () => import('@/views/category/MyCategory')
const MyCart = () => import('@/views/cart/MyCart')
const MyProfile = () => import('@/views/profile/MyProfile')
const MyDetail=()=>import('@/views/detail/detail')





const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'myhome',
        },
         {
            path: '/myhome',
            component: MyHome
        },
        {
            path: '/mycategory',
            component: MyCategory
        },
         {
            path: '/mycart',
            component: MyCart
        }, 
        {
            path: '/myprofile',
            component: MyProfile
        },
        {
            path: '/detail/:iid',
            component:MyDetail
        }
    ],
    mode: 'history'
})

export default router
