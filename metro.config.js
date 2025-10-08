const { mergeConfig } = require('metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')
// const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // custom your metro config here
  // https://facebook.github.io/metro/docs/configuration
  resolver: {},
  transformer: {
    babelTransformerPath: require.resolve('react-native-css-transformer'),
    // 添加自定义转换规则
    cssTransformerConfig: {
      // 忽略无法解析的样式属性
      ignoreInvalidProperties: true,
      propertyReplacements: {
        'background-image': 'backgroundColor', // 直接移除背景图
        'background': 'backgroundColor', // 替换 background 为 RN 支持的 backgroundColor
        'background-gradient': 'backgroundColor',
        'padding': 'padding: 12px',       // 简化 padding 避免解析错误
      }
    }
  }
}
const harmonyMetroConfig = {}//createHarmonyMetroConfig() || {}
module.exports = (async function () {
  return mergeConfig(
    config,
    await getMetroConfig(),
    harmonyMetroConfig
  )
})()
