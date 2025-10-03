const path = require('path')
const { version } = require('../package.json')
const devConfig = require('./dev')
const prodConfig = require('./prod')
const { GenerateSW } = require('workbox-webpack-plugin');

const CIPluginOpt = {
  weapp: {
    appid: process.env.WEAPP_ID || '微信小程序appid',
    privateKeyPath: "key/private.appid.key"
  },
  tt: {
    email: process.env.TT_EMAIL || "字节小程序邮箱",
    password: process.env.TT_PWD || "字节小程序密码"
  },
  alipay: {
    appid: process.env.ALI_APPID || "支付宝小程序appId",
    toolId: process.env.ALI_TOOL_ID || "工具id",
    privateKeyPath: "key/pkcs8-private-pem"
  },
  swan: {
    token: process.env.SWAN_TOKEN || "鉴权需要的token令牌"
  },
  version,
  desc: "修复已知问题"
}

const plugins = process.env.TARO_ENV === 'weapp' ? [
  ["@tarojs/plugin-mini-ci", CIPluginOpt],
  ["@tarojs/plugin-html"]
] : ["@tarojs/plugin-html"]

const config = {
  projectName: 'myAppRN',
  date: '2021-7-16',
  designWidth: 750,
  deviceRatio: {
    375: 2,
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sass: {
    // @use rules must be written before any other rules.
    additionalData: '@use "sass:math";',
    data: '@import "@nutui/nutui-react-taro/dist/styles/variables.scss";'
    // JMAPP 主题
    // data: `@import '@nutui/nutui-react-taro/dist/styles/variables-jmapp.scss';`
    // JRKF 主题
    // data: `@import '@nutui/nutui-react-taro/dist/styles/variables-jrkf.scss';`
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins,
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },

  // 关键配置：配置 Service Worker 和 Workbox
  serviceWorker: {
    // 启用 Service Worker（开发环境下可根据需要开启）
    enable: process.env.NODE_ENV === 'production' ? true : false,

    // Workbox GenerateSW 相关配置
    workbox: {
      // 清理旧缓存（解决多次调用导致的缓存问题）
      cleanupOutdatedCaches: true,

      // 仅在生产环境启用 skipWaiting 和 clientsClaim
      skipWaiting: process.env.NODE_ENV === 'production',
      clientsClaim: process.env.NODE_ENV === 'production',

      // 运行时缓存策略配置
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30天
            }
          }
        },
        {
          urlPattern: /\.(?:js|css)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources'
          }
        }
      ]
    }
  },
  // 开发环境配置（watch 模式相关）
  devServer: {
    // 减少不必要的重连，优化 watch 模式体验
    port: 10086,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/pages/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/pages/utils'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/platform': path.resolve(__dirname, '..', 'src/platform'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js'
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    output: {
      ios: './ios/main.jsbundle',
      iosAssetsDest: './ios',
      android: './android/app/src/main/assets/main.jsbundle',
      androidAssetsDest: './android/app/src/main/res',
      // iosSourceMapUrl: '',
      iosSourcemapOutput: './ios/main.jsmap',
      // iosSourcemapSourcesRoot: '',
      // androidSourceMapUrl: '',
      androidSourcemapOutput: './android/app/src/main/assets/main.jsmap',
      // androidSourcemapSourcesRoot: '',
    }
  }
}

module.exports = function (merge, { command, mode }) {
  console.log('command-mode', command, mode)
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, config, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, config, prodConfig)
}
