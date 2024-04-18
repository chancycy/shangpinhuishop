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

