import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入vue-router
import router from './router';

new Vue({
  render: h => h(App),
  // 注册路由，下面这句写完之后，每个组件身上就有了$router和$route
  router,
}).$mount('#app')
