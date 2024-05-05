const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  // 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。
  // 默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。

  //代理服务器解决跨域
  devServer: {
    proxy: {
      //会把请求路径中的/api换为后面的代理服务器
      '/api': {
        //提供数据的服务器地址
        target: 'http://gmall-h5-api.atguigu.cn',

      }
    },
  },
})
