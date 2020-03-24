module.exports = {
  publicPath: '.',
  productionSourceMap: false,
  configureWebpack(config) {
    config.resolve.modules = ['node_modules', 'src/assets/sprite']
  }
}