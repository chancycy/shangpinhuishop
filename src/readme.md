接口：http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
`/api`开始往后为不同的请求地址
---

目前各目录：
```
-public
    --reset.css
-components
    --Footer
        --images
            --vx_cz.jpg
        --index.vue
    --Header
        --images
            --logo.png
        --index.vue
-pages
    --Home
        --index.vue
    --Login
        --index.vue
    --Register
        --index.vue
    --Search
        --index.vue
-router
    --index.js

```

# 1、各目录介绍
- public文件夹：静态资源，webpack进行打包的时候会原封不动打包到dist文件夹中。
  - public/index.html是一个模板文件，作用是生成项目的入口文件，webpack打包的js,css也会自动注入到该页面中。我们浏览器访问项目的时候就会默认打开生成好的index.html。

- src文件夹（程序员代码文件夹）
- assets： 存放公用的静态资源
- components： 非路由组件（全局组件），其他组件放在views或者pages文件夹中
- App.vue： 唯一的根组件
- main.js： 程序入口文件，最先执行的文件

- babel.config.js: 配置文件（babel相关）
- package.json: 项目的详细信息记录
- package-lock.json: 缓存性文件（各种包的来源）

# 2、项目配置
2.1 项目运行，浏览器自动打开(不习惯，关了)
```js
package.json
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
    },
```
2.2 关闭eslint校验工具（不关闭会有各种规范，不按照规范就会报错）   
- 根目录下的vue.config.js,进行配置
```js
module.exports = {
  //关闭eslint
  lintOnSave: false
  }
```
推荐是这样，但我按照vue2的教学视频是调的true，即：``lintOnSave: true,``

2.3 src文件夹配置别名,jsconfig.json，用@/代替src/，exclude表示不可以使用该别名的文件（本项目在创建时已自带，无需配置）
```js
 {
    "compilerOptions": {
        "baseUrl": "./",
            "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },

    "exclude": [
        "node_modules",
        "dist"
    ]
 }
```

# 3、组件页面样式
组件页面的样式使用的是less样式，浏览器不识别该样式，需要下载相关依赖
`npm install --save less less-loader@5`
由于：less-loader@5 依赖于 webpack@4.47.0，而我的项目中已经安装了 webpack@5.90.3，这两个版本不兼容。所以我将不指定less-loader版本，命令：``npm install --save less-loader``
如果想让组件识别less样式，则在组件中设置
`<script scoped lang="less">`

# 4、清除vue页面默认的样式  
vue是单页面开发，我们只需要修改public下的index.html文件

`<link rel="stylesheet" href="reset.css">`

# 5、路由
安装：``npm i vue-router@3``

创建pages文件夹，并创建路由组件
5.1创建router文件夹，并创建index.js进行路由配置，最终在main.js中引入注册

5.2 总结  
路由组件和非路由组件区别：
- 非路由组件放在components中，路由组件放在pages或views中
- 非路由组件通过标签使用，路由组件通过路由使用
- 在main.js注册玩路由，所有的路由和非路由组件身上都会拥有$router $route属性
- $router：一般进行编程式导航进行路由跳转
- $route： 一般获取路由信息（name path params等）

5.3 路由跳转方式   
- 声明式导航router-link标签 <router-link to=“path”>,可以把router-link理解为一个a标签，它 也可以加class修饰
- 编程式导航：声明式导航能做的编程式都能做，而且还可以处理一些业务

# 6、footer组件显示与隐藏
- footer在登录注册页面是不存在的，所以要隐藏，v-if 或者 v-show
- 这里使用v-show，因为v-if会频繁的操作dom元素消耗性能，v-show只是通过样式将元素显示或隐藏
- 配置路由的时候，可以给路由配置元信息meta,
- 在路由的原信息中定义show属性，用来给v-show赋值，判断是否显示footer组件
  
# 7、路由传参
## 7.0 知识点回顾
###    1.query传参：
路由：
```js
    var router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { name:'register',path: '/register', component: register } 
      ]
    })
```
导航：
```js
	// 注意：这是 query 两种传参方式 一种是直接跳转把字符串传过去 一种是传描述目标位置的对象
    <router-link to="/login?id=10&name=zs">登录</router-link>
    <router-link :to="{path:'/register',query:{id:5,name:'lili'}}">注册</router-link>
    或
    <router-link :to="{name:'register',query:{id:5,name:'lili'}}">注册</router-link>
等同于：
	this.$router.push('/login?id=10&name=zs')
	this.$router.push({path:'/register',query:{id:5,name:'lili'}})
	或
	this.$router.push({name:'register',query:{id:5,name:'lili'}})
```
**注意：jquery可以通过name或path来引入路由**

###    2.params传参(需要占位)
路由：
```js
    var router = new VueRouter({
      routes: [
        { path: '/login/:id/:name', component: login },// 这里不传入对应的参数（:/id/:name） 刷新页面 参数会消失,页面中就丢失了数据
        { name:'register', path: '/register/:id/:name', component: register }
      ]
    })
```
导航：
```js
// 注意：这是 params 两种传参方式 一种是直接跳转把字符串传过去 一种是传描述目标位置的对象
    <router-link to="/login/12/ls">登录</router-link>
    <router-link :to="{name:'register',params:{id:10,name:'lili'}}">注册</router-link>
等同于：
	this.$router.push('/login/12/ls')
	this.$router.push({name:'register',params:{id:10,name:'lili'}})
```
**注意：params只能通过name来引入路由，path会undefined**

### jquery传参和params传参的区别
  1. 用法上:
上文已经提到query可以用name或path来引入
params必需要用name来引入，接收参数都是类似的，分别是:
``this.$route.query.name``和``this.$route.params.name``。
2.地址栏表现形式上:
query：
``/login?id=10&name=lcy``
params：
``/login/10/lcy``
**注意：这里的10和lcy 对应的是/:id/:name 这两个参数可以不写 那么就不会在地址栏上显示 不过刷新页面参数会消失 写上参数刷新页面 参数不会消失**

## 7.1、query、params
- query、params两个属性可以传递参数   
query参数：不属于路径当中的一部分，类似于get请求，地址栏表现为 /search?k1=v1&k2=v2  
query参数对应的路由信息 `path: "/search"`  
params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要**占位** ,地址栏表现为 /search/v1/v2  
params参数对应的路由信息要修改为`path: "/search/:keyword"`  这里的/:keyword就是一个params参数的占位符

## 7.2 相关面试题
1. 路由传参对象写法path是否可以结合params参数一起使用
   答案：不可以。传过去的参数会为undefined（console里还会报错）
2. 如何指定params参数可传可不传
   答案：在路由里占位后加个`?`，即可表示这个参数可传可不传。如`path: "/search/:keyword?"`
   解析：如果路由已经要求传params参数（即路径里params已经占位了），但就不写传params参数，路径会不对。
3. params参数可传可不传，但如果传递的是空串，如何解决
   答案：`||undefined`。如：`$router.push({path:'search',params:{keyword:''||undefined}})`
4. 路由组件能不能传递props数据
   答案：可以，并且还有三种写法。为布尔值时只能传params参数，为函数时都可以传递。
   解析：为了解决读取参数时更简洁，避免重复写如``{{$route.query.id}}``，希望简洁成``{{id}}``
   1. 第一种————props为布尔值
      - 为真时，会将路由组件收到的所有params参数
      - props为布尔值时，传递params参数但**无法传递query参数**
      - 传：`props: true,`；
      - 收：eg:`props:['id','title'],  // 方式2：是params参数的名字`
   2. 第二种————props为函数(最常用)(实际很少用路由组件props传参)
      - 回调函数，vueRouter会自动调用，并且可以得到$route
      - ```js
            props($route) { // 传：router的index 路由配置里这么写
                    return {
                        id: $route.query.id,
                        title: $route.query.title, 
                    }
            }
        ```
     - 收:eg:`props:['id','title'],`
    3. 第三种————props为对象
       - 用的少，原因：传递的是死数据

## 7.3 解决本项目中实际问题
多次执行相同的push问题，控制台会出现警告。
在本项目中，即：点击搜索按钮，通过push从home也跳转至了search页，但再次点击搜索按钮后控制台会报错。
对于声明式导航`router-view`是不会出错，因为底层已经处理好了
- 我们使用一个值接收下push，然后打印，会发现返回值是一个promise
```js
let result = this.$router.push({name:"Search",query:{keyword:this.keyword}})
console.log(result)
```
- 原因：push是一个promise，promise需要传递成功和失败两个参数，我们的push中没有传递。
  - 所以在传完参之后，补两个空的回调函数即可（代表resolve和reject）。
  - 方法：`this.$router.push({name:'Search',params:{keyword:".."||undefined}},()=>{},()=>{})`后面两项分别代表执行成功和失败的回调函数。 

- 这种写法治标不治本，将来在别的组件中push|replace,编程式导航还是会有类似错误。
- push是VueRouter.prototype的一个方法，在router中的index重写该方法即可

- 重写的具体代码如下：
```js
// 1.先将原本的push方法先保存一份
let originPush = VueRouter.prototype.push
// 2.重新自己的push和replace方法
// location：告诉原来push方法，该往哪跳（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
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
```

# 8、三级联动组件
由于三级联动组件在home、search、detail组件都存在，所以将其作为全局组件来使用。但这个主要是用在home页的，所以建在home页下。
```js
// 引入三级联动组件--并注册为全局组件
import TypeNav from './pages/Home/TypeNav'  // 引入
// 第一个参数————全局组件名字；第二个参数————全局组件
Vue.component(TypeNav.name, TypeNav) // 注册
```

在Home组件中使用该全局组件

```vue
<template>
<div>
<!-- 三级联动全局组件已经注册为全局组件，因此不需要引入 -->
  <TypeNav/>
</div>
</template>
```

# 9、对axios进行二次封装
axios中文文档，包含详细信息。
[https://www.kancloud.cn/yunye/axios/234845](https://www.kancloud.cn/yunye/axios/234845)
在根目录下创建api文件夹，创建request.js文件。
内容如下，当前文件代码还比较少，后续有需求可以增添内容。
```js
import axios from "axios";
//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:'/api',
    timeout: 5000,
})
//2、配置请求拦截器
requests.interceptors.request.use(config => {
    //config内主要是对请求头Header配置
    //比如添加token
    
    return config;
})
//3、配置相应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数
    return  res.data;
},(error) => {
    //失败的回调函数
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})
//4、对外暴露
export default requests;
```

# 10、接口统一管理
在api文件夹下建立index.js文件进行统一管理
```js
//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "@/api/request";

//首页三级分类接口
export const reqCateGoryList = () => {
    return  requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    })
}
```
当组件想要使用相关请求时，只需要导入相关函数即可，以上图的reqCateGoryList 为例:
```js
import {reqCateGoryList} from './api'
//发起请求
reqCateGoryList();
```
导入了三级联动接口后，进行单元测试发现404了，是因为存在跨域问题
什么是跨域：协议、域名、端口号不同请求。
解决方法1：在api/request.js文件里将baseUrl从'/api'改成了'http://gmall-h5-api.atguigu.cn'接口地址
解决方法2：通过代理服务器来解决跨域。在vue.config.js文件中进行如下修改：（加上devServer）
```js
module.exports = {
    //关闭eslint
    lintOnSave: false,
    devServer: {
        // true 则热更新，false 则手动刷新，默认值为 true
        inline: false,
        // development server port 8000
        port: 8001,
        //代理服务器解决跨域
        proxy: {
            //会把请求路径中的/api换为后面的代理服务器
            '/api': {
                //提供数据的服务器地址
                target: 'http://gmall-h5-api.atguigu.cn',

            }
        },
    }
}
```
[webpack官网相关知识解读](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)

# 11、nprogress进度条插件
我们页面加载时发起了一个请求，此时页面上方出现蓝色进度条。
即调用接口的时候给点反应（给个进度条表示加载情况）
打开一个页面时，往往会伴随一些请求，并且会在页面上方出现进度条。它的原理时，在我们发起请求的时候开启进度条，在请求成功后关闭进度条，所以只需要在request.js中进行配置。
    （在请求和响应拦截器做。请求时开始请求开启，响应成功后结束）

先`npm i nprogress`
然后
```js
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
```
再在request.js里的请求拦截器和响应拦截器里调用
```js
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    // 进度条开始动
    nprogress.start();
    // config:配置对象，存在一个重要属性，请求头header
    return config;
})

// 响应拦截器，需要传成功和失败的回调
requests.interceptors.response.use(res => {
    // 进度条结束
    nprogress.done();
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做些事情
    return res.data
}, err => {。。。})
```

# 12、vuex相关内容
## 12.1 vuex的安装
安装vuex:vue2要安装vuex3版本，命令--``npm i vuex@3``
在src目录下创建store文件夹，新建index.js
```js
import Vue from 'vue';
import Vuex from 'vuex';
// 使用一次
Vue.use(Vuex);

const state = {};
// 修改state的唯一手段
const mutations = {};
// 书写业务逻辑，也可以处理异步
const actions = {};
// 相当于vuex的对state的计算属性
const getters = {};

// 对外暴露store类的一个实例
export default new Vuex.Store({
    state, mutations, actions, getters
})
```
在main中引入store
``import store from '@/store'``以及new Vue里配置加上store`new Vue({.....,store}).$mount('#app')`

## 12.2 vuex的基本使用（基础教学时讲过）
注意点：
  1. `dispatch`和actions对话，`commit`和mutations对话。即第三点。
   2. actions可以当做是服务员，mutations可以当做是厨师。
    3. store的index里actions里头的方法名和vue组件里调用时（例如按钮点击名）一般是一样的
    4. 注意store的index.js里actions、mutations等的传参。
index.js文件
```js
const state = {
    count: 1
};
// 修改state的唯一手段
const mutations = {
    ADD_COUNT(state) {
        state.count++
    }
};
// 书写业务逻辑，也可以处理异步
const actions = {
    // 可以写业务逻辑但不能修改state
    addCount({ commit }) {
        commit("ADD_COUNT")
    }
};
```

```js
<!-- store的小小使用 -->
    <button @click="addCount">通过vuex，点击 +1</button>
    <div>分割---仓库state的数据count的值: {{ count }}</div>
    <button>通过vuex，点击 -1</button>

computed: {
    ...mapState(["count"]),
  },
  methods: {
    addCount() {
      // 派发actions
      this.$store.dispatch("addCount");
    },
  },
```

## 12.3 vuex--开启命名空间，分块管理vuex
仓库式管理数据，每个模块管理自己的数据
`namespaced: true`不是一定要写，以下就可以了：
store/index.js:
```js
// 引入小仓库
import home from './home';
import search from './search';

export default new Vuex.Store({
    // 下面这行代码实现vuex仓库模块化开发存储
    modules: {
        home, search,
    },
})
```
/store/home/index.js举例：
```js
// home模块的小仓库
const state = { a: 1, }
const actions = {}
const mutations = {}
const getters = {}

export default {
    state, actions, mutations, getters
}
```

# 13、动态展示typeNav三级联动展示数据(实战)
## 13.1 更新目录
typeNav：全部商品分类--图书、音像、数字商品...etc--电子书...etc 三层标题
由于这是个全局组件，我们将其放到components里（TypeNav原本在pages/Home下里）

## 13.2 通过调用接口展示真实数据（运用mapState、v-for）
将typeNav里原先写死的数据通过vuex状态管理调用接口 更新数据，让数据是来自于后台取的。
直接用v-for 来循环取接口返回的数组（数组里又是对象，对象里又是数组；要有会写v-for的能力啊宝）
弹幕看到：假如之后数组里超了，导致页面展示不下了，在v-for时可以巧用`.slice方法` `v-for="c1 in categoryList.slice(0,10)"`（大概是这个吧，就是截取前xxx个展示）

## 13.3 （样式能解决 但用js）三级联动 动态背景颜色（对应视频p20）
鼠标挪放到一级菜单上时 有蓝色背景（现在是只有自带的a标签的下划线）
不用css用js是让知道v-for的:class样式名匹配方法，这个方法在很多场景都很常用
(重点：学习 使用事件委托进行事件绑定)

解决方法1：css改样式`:hover{background: skyblue;}`(就不用，就要用js)
解决方法2：添加动态class、使用@mouseenter和@mouseleave的vue鼠标移入移出方法
    最开始时是给h3这样加的：`<h3 @mouseenter="changeIndex(index)" @mouseleave="leaveIndex">`
    但是不符合最终要求：鼠标移到“全部商品分类”时，某个一级分类的背景色还要在。
    由于此时“全部商品分类”在h2里，和添加的动态class的h3的父级 是兄弟关系，所以我们选择改下html结构，给他俩包一层。将`@mouseleave="leaveIndex"`给他们的父元素div（即新加的这个div）
    最终变成：`<div @mouseleave="leaveIndex">`

## 13.4 用js（:style）去控制二三级菜单的显示与隐藏（对应视频p21）
代码原先是用css代码（display: none/block）去控制当鼠标移到一级菜单时展示二三级菜单，即：
```js
.item-list {
    display: none;
}
&:hover {
    .item-list {
        display: block;
    }
}
```
我们采用动态样式来完成，鼠标选中即增加样式。`:style="{ display: currentIndex == index ? 'block' : 'none' }"`


# 14、防抖(debounce)和节流(throttle)
## 14.1 引入防抖节流概念（p22-p24）
需要借助lodash，npm下载或官网下载引入。（更新：node中已经自带lodash，无需自己手动下载）
如果在changeIndex加入一个console，就会发现：鼠标慢慢挪时，对应的每个改变的index是会输出的；但快速划过时则并不会每一个每一个index都打印。
即：事件触发很频繁，每一次触发回调函数都要去执行。当时间很短并且回调函数内部有计算，那么浏览器则会卡顿。
```js
changeIndex(index) {
    console.log("鼠标进入 :>> ", index);
},
```
防抖：前面所有的触发都被取消，最后一次执行在规定的时间之后才会触发。即：连续快速的触发只会触发一次。
节流：在规定的时间间隔范围内不会重复触发回调，只有大于这个时间间隔才触发回调，把频繁触发变为少量触发。

通俗实战举例：防抖--购物搜索时 输入框快速输入的不响应，只有停留足够的时间才会发请求。
比作游戏：防抖是挑衅回城 最后回去了；节流是正常技能CD

都是用户操作很频繁，防抖是只执行一次，节流是把频繁操作变为少量操作（给浏览器充足时间解析代码）
底层原理都是：闭包+延迟器。

## 14.2 实战--给三级联动组件加上节流(p25)
由于node里有lodash，直接引入使用即可，无需npm安装
`import _ from "lodash"`（这会引入lodash全部的功能函数）
也可以按需引入：`import throttle from "lodash/throttle"`
```js
// 旧代码：
    changeIndex(index) {
      // index是鼠标移上去时对应的下标（一级元素的索引值）
      this.currentIndex = index;
      console.log("鼠标进入 :>> ", index);
    },
// 新代码：
    // 为了使用节流，然后为了能用上_.lodash，选择es5的函数写法
    // throttle回调函数别用箭头函数，上下文this可能会有问题。
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
```

# 15 编程式导航+事件委托实现路由跳转
## 15.1 三级联动组件路由跳转与传递参数
点击后会从home页携带产品信息（产品名字、id）跳转到search页

路由跳转：
1.声明式导航：router-link
2.编程式导航：push / replace

先使用下声明式导航（先不传参数）
将TypeNav/index.vue的a标签改为router-link，这里只展示一级目录的修改，二三级目录修改相同
```js
// <!-- <a href="">{{ c1.categoryName }}</a> -->
<router-link to="/search">{{ c1.categoryName }}</router-link>
```
存在的缺点：会出现卡顿；因为router-link实际是一个组件，服务器数据返回后，创建组件实例（这循环了快1000+次）
所以会有卡顿。

使用编程式导航(同样也先不传参数)
```js
<a @click="goSearch">{{ c1.categoryName }}</a>
<a @click="goSearch">{{ c2.categoryName }}</a>
<a @click="goSearch">{{ c3.categoryName }}</a>

goSearch() {
    this.$router.push("/search");
},
```
问题：不卡顿；但是最后每个a标签都要绑定自己的回调，循环还是会导致有1000+个回调函数

最佳解决方案：编程式导航+事件委派 (视频P28)
即：依然使用goSearch方法（编程式导航），但将@click不写到a标签里而是a标签的外面（事件委派）
```js
<div class="all-sort-list2" @click="goSearch">
    ...other code
    <a>{{ c1.categoryName }}</a>
    ...other code
</div>    
```
利用时间委派有些问题需处理：
1.事件委派是添加在a标签的父元素上的，但父元素下不止有a标签，我们需要的是点击a的时候才跳转，但怎么知道点击是a标签
2.如何获取参数【1、2、3级分类的产品名字和id】，即就算点击的是a标签，如何区分一/二/三级分类的标签呢

解决方法：利用自定义属性
解决问题1：给a标签子元素，加上:data-categoryName自定义属性，而其余子节点没有
    -- event.target.getAttribute('自定义属性') --getAttribute() 返回元素上一个指定的属性值。
    -- event.target.dataset --只读属性 dataset 提供了对元素上自定义数据属性（data-*）读/写访问。(来自MDN)
```js
<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
// 自定义属性用驼峰命名的，获取的时候记得小写
goSearch(event) {
    let el = event.target;
    // dataset获取节点的自定义属性和属性值，但dataset为es6新增，有的
    // 自定义属性用驼峰命名的，获取的时候记得小写
    let { categoryname, category1id, category2id, category3id } = el.dataset;
    let location = { name: "search" };
    let query = { categoryName: categoryname };
    // 如果标签身上拥有categoryname的话，则这个标签一定是a标签
    if (categoryname) {
    if (category1id) {
        query.category1Id = category1id;
    } else if (category2id) {
        query.category2Id = category2id;
    } else if (category3id) {
        query.category3Id = category3id;
    }
    }
    location.query = query;
    this.$router.push(location);
    // console.log('event.target.dataset.categoryname :>> ', event.target.dataset.categoryname);
    // this.$router.push("/search");
},
```

# 16 实战-search模块 商品分类(typeNav)+过渡动画（P30）
由于search模块也需要使用要typeNav三级联动组件（但typeNav已经是一个全局组件无需再引入）
但是在search页面中，typeNav的一级目录默认折叠，当鼠标移上去时才会进行展示并且有过渡动画效果。（即本p需实现效果）
1. 控制typeNav在search页默认隐藏，但在home页是默认展开 --> v-if / v-show --> v-show(在typeNav组件)
```js
// components/typeNav的index.vue 
    <div @mouseleave="leaveShow" @mouseenter="enterShow">

    // 当鼠标移入时，页面是search时，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    leaveShow() {
      // 原先的鼠标移出事件
      this.leaveIndex();
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
```
2. 过渡动画 前提--组件/元素上得有v-if|v-show才能进行过渡动画
使用`<transition name="sort"></transition>`包裹住需要添加动画的部分，对于本次实战来说，是三级联动部分。
有点忘记怎么写了，正好复习下。
    name 属性是用来自定义过渡类名前缀。
    css样式中：
```js
// 过渡动画的样式
.sort-enter {
    // 过渡动画开始阶段
    height: 0;
}
.sort-enter-to {
    // 过渡动画结束阶段
    height: 461px;
}
.sort-enter-active {
    // 定义动画时间、速率等
    transition: all 0.5s linear;
}
```







