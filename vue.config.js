let publicPath = '/'
module.exports = {
  publicPath,
  productionSourceMap: false,
  devServer: {
    inline: true,
    // proxy: process.env.VUE_APP_API,
    // port: 8991,
    proxy: {
      '/proxyApi': {
        target: process.env.VUE_APP_API,
        changOrigin: true,
        pathRewrite: {
          '^/proxyApi': '',
        },
      },
    },
  },
}
