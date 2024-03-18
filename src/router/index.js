import Vue from "vue"
// 配置路由
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/search',
            component: Search,
        },
        {
            path: '/',
            redirect: '/home'   // 重定向
        }
    ]
})
