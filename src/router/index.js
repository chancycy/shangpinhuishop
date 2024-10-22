import Vue from "vue"
// 配置路由
import VueRouter from "vue-router"
Vue.use(VueRouter)

// -------------------------------------------------
// $router是VueRouter的一个实例，push是实例原型上的一个方法
/* 为什么要进行以下的事：我们发现多次点击搜索时会报错，原因是路由的push跳转方法除了接收要去哪的参数，还接收两个参数（resolve和reject【promise】），固然可以在每次调用push时都加上，但这种方法治标不治本，为此，我们选择直接重写push方法 */

// 打印vueRouter，会发现push在vueRouter的原型上
console.log('VueRouter :>> ', VueRouter);
console.log('VueRouter.prototype :>> ', VueRouter.prototype);
// 1.先将原本的push方法先保存一份
let originPush = VueRouter.prototype.push
console.log('originPush :>> ', originPush);
// 2.重新自己的push和replace方法
// location：告诉原来push方法，该往哪跳（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    console.log('own push :>> ',);
    console.log('this :>> ', this);
    if (resolve && reject) {
        // 如果直接调用originPush,此时this指向window，需要使用call改变this指向vueRouter
        // call 和 apply 相同点：都可以调用函数一次，都可以修改函数的this一次
        // 不同： call传递参数用逗号隔开；apply传参传递数组
        originPush.call(this, location, resolve, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写replace方法
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


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
            meta: { show: true },
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false },
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false },
        },
        {
            path: '/search/:keyword/',    // 使用params传参时 需要有占位符(记住:前面要有/)
            // path: '/search',
            name: 'search',
            component: Search,
            meta: { show: true },
            // props: true,    // 为真时，会将路由组件收到的所有params参数
            props: ($route) => {
                return {
                    keyword: $route.params.keyword,
                    // k: $route.query.k,
                }
            }
            // props函数简写：
            // props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k, })

        },
        {
            path: '/',
            redirect: '/home'   // 重定向
        }
    ]
})


