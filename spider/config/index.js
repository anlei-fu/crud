'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Pathsy
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/template': {
        target: 'http://localhost:10335',//原本是192.168.5.188 本地是http://182.140.244.57:2048
        changeOrigin: true
      },
      '/render': {
        target: 'http://localhost:10335',//原本是192.168.5.188 本地是http://182.140.244.57:2048
        changeOrigin: true
      },
      '/parser': {
        target: 'http://localhost:10335',//原本是192.168.5.188 本地是http://182.140.244.57:2048
        changeOrigin: true
      },
      '/spell': {
        target: 'http://localhost:10335',//原本是192.168.5.188 本地是http://182.140.244.57:2048
        changeOrigin: true
      },
      '/': {
        target: 'http://localhost:10032',//原本是192.168.5.188 本地是http://182.140.244.57:2048
        changeOrigin: true
      },
      // '/': {
      //   target: 'http://localhost:10032',//原本是192.168.5.188 本地是http://182.140.244.57:2048
      //   changeOrigin: true
      // },

    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/signAdmin/', //静态文件路由

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
