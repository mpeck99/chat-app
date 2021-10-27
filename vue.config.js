module.exports = {
  publicPath: '/',
  outputDir: './dist/',
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Vue Chat App'
      return args
    })
  },
  
}