const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/tools': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/tools': '/tools',
        },
      },
    },
  },
  // publicPath: '/',
  lintOnSave: false,
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        layouts: '@/layouts',
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        utils: '@/utils',
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
