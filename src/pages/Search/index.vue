<template>
  <div>
    <div>搜索页</div>
    <!-- 
    <div>
      <h4>params参数：{{ $route.params.keyword }}</h4>
      <h4>query参数：{{ $route.query.k }}</h4>
      <hr />
      <h4>props传递的params参数：{{ keyword }}</h4>
      <h4>props传递的query参数：{{ k }}</h4>
    </div>
     -->
  </div>
</template>
  
<script>
export default {
  name: "search",
  props: ["keyword", "k"],
};
</script>
  
  <style>
</style>