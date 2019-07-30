const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/axios/api"))
      .set("libs", resolve("src/libs"));

    config.output.chunkFilename(`js/[name].[chunkhash:8].js`);

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(BundleAnalyzerPlugin)
    //   .init(
    //     Plugin =>
    //       new Plugin({
    //         analyzerPort: 8990,
    //         openAnalyzer: process.env.NODE_ENV === 'production'
    //       })
    //   )
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
  },

  css: {
    sourceMap: process.env.NODE_ENV !== "production",
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/variables.scss";`
      }
    },
    modules: false
  },

  //   parallel: require('os').cpus().length > 1,
  devServer: {
    port: 8066,
    https: false,
    hotOnly: true,
    open: true,
    disableHostCheck: true,
    proxy: {
      // 金牛邦
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },


  // 第三方插件的选项
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        //这个是加上自己的路径，
        //注意：试过不能使用别名路径
        // path.resolve(__dirname, "./src/assets/css/global.less"),
        // path.resolve(__dirname, "./src/assets/css/variables.less")
      ]
    }
    // env: {
    //   TEST: 'vue.config.js-->pluginOptions.env:TEST Global Parameters'
    // }
  }
};
