const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@axios': path.resolve(__dirname, './src/plugins/axios'),
      }
    }
  }
})
