# 各目录介绍
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
