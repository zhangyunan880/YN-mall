import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import toast from './components/common/toast';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css'
// import '@/assets/css/base.css'
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(ElementUI);
//安装toast插件
Vue.use(toast);
//解决移动端300毫秒延迟
fastclick.attach(document.body)
//图片懒加载
Vue.use(VueLazyload)


Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router,
  store,

}).$mount('#app')
