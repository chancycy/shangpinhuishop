<template>
  <div>
    <!-- store的小小使用 -->
    <button @click="addCount">通过vuex，点击 +1</button>
    <div>分割---仓库state的数据count的值: {{ count }}</div>
    <button>通过vuex，点击 -1</button>

    <!-- home主页 -->
    <!-- 三级联动全局组件已注册为全局组件，不需要引入 -->
    <TypeNav />
    <!-- 其余组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
// 引入其余非全局组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

// 引入mapState
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState(["count"]),
  },
  methods: {
    addCount() {
      // 派发actions
      this.$store.dispatch("addCount");
    },
  },
};
</script>

<style>
</style>