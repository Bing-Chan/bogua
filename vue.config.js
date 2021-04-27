/* eslint-disable */
const path = require('path')

module.exports = {
    devServer: {
      before: require('./mock/mock-server.js'),
      port: 8080,
      open: true,
    },
　　configureWebpack: {
　　　　　　externals: {
　　　　　　　　'spritejs': 'spritejs' // 配置使用CDN
　　　　　　}
　　}
}
