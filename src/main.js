import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入vue-router
import router from './router';
// 引入vuex的store
import store from '@/store';

// 引入三级联动组件--并注册为全局组件
// import TypeNav from './pages/Home/TypeNav'  // 引入
import TypeNav from '@/components/TypeNav'  // 在13时改了存放地址

import '@/mock/mockServe';  // 引入mock数据

// 第一个参数————全局组件名字；第二个参数————全局组件
Vue.component(TypeNav.name, TypeNav) // 注册

// 在13时，去掉了以下的单元测试
// 进行单元测试，看看三级联动接口是否成功
// import { reqCategoryList } from '@/api';
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 注册路由，下面这句写完之后，每个组件身上就有了$router和$route
  router,
  // 注册仓库；组件实例身上就有了$store属性
  store,
}).$mount('#app')
