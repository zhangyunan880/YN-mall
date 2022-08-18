<template>
  <div id="app">
    <!-- exclude="(组件名)" 取消路由缓存 -->
    <keep-alive exclude="MyDetail">
      <router-view></router-view>
    </keep-alive>
 
    <MainTabbar></MainTabbar>
   
  </div>
</template>

<script>
  import MainTabbar from '@/components/content/MainTabbar'

  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style>
  @import url('@/assets/css/base.css');
</style>