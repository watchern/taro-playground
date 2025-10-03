const { mergeConfig } = require('metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')
// const {createHarmonyMetroConfig} = require('react-native-harmony/metro.config');
const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

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
      // 替换 background 为 backgroundColor
      propertyReplacements: {
        'background': 'backgroundColor',
        'background-image': 'backgroundColor', // 直接移除背景图
        'background-gradient': 'backgroundColor'
      }
    }
  }
}
module.exports = (async function () {
  return mergeConfig(
    await getMetroConfig({}, createHarmonyMetroConfig()),
    config,
  )

})()