module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://39.98.123.211/'
      }
    }
  }
}
