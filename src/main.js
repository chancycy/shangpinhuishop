import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入vue-router
import router from './router';

// 引入三级联动组件--并注册为全局组件
import TypeNav from './pages/Home/TypeNav'  // 引入
// 第一个参数————全局组件名字；第二个参数————全局组件
Vue.component(TypeNav.name, TypeNav) // 注册

new Vue({
  render: h => h(App),
  // 注册路由，下面这句写完之后，每个组件身上就有了$router和$route
  router,
}).$mount('#app')
