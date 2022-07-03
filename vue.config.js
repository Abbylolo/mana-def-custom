module.exports = {
  lintOnSave: true,
  pages: {
    index: {
      entry: './src/main.js'
    }
  },
  chainWebpack: config => {
    config.resolve.extensions
      .add('ts')
      .add('tsx')
  }
}
