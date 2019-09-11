module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/main.sass";`
      }
    }
  },
  pluginOptions: {
    svgSprite: {
      // dir: 'src/assets/icons',

      test: /\.(svg)(\?.*)?$/,

      loaderOptions: {
        extract: false,
        esModule: false,
        spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
      },

      pluginOptions: {
        plainSprite: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap(() => {
        const options = {}
        options.plugins = [
          { removeAttrs:
              { attrs: 'fill|stroke' }
          },
          { inlineStyles: true },
          { removeUselessDefs: true },
          { removeStyleElement: true }
        ]
        return options
      })
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|mp4|m4v|avi)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return options
      })
  },
  configureWebpack: {

  }
}
