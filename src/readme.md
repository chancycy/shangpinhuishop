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
2.1 项目运行，浏览器自动打开
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