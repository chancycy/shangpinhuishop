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
};
</script>
