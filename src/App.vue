<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <!-- home和search中显示，login、register中隐藏 这里使用v-show -->
    <!-- <Footer v-show="$route.path === '/home' || $route.path === '/search'"/> -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },

  // 改动16--优化渲染typeNav组件时频繁调用接口问题
  // 之前数据是模拟写死的，现在要从接口里拿真实的了
  // 即组件挂载完毕 向服务器发请求
  mounted() {
    // 通知vuex发请求，获取数据，存在仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>
