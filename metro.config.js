const { mergeConfig } = require('metro-config')
const { getMetroConfig } = require('@tarojs/rn-supporter')
const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
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
module.exports = (async function () {
  // 1. 获取 Taro 原生配置（关键：包含 src 目录解析规则）
  const taroMetroConfig = await getMetroConfig();
  // 2. 创建 Harmony 配置
  const harmonyMetroConfig = {}//createHarmonyMetroConfig() || {}
  // 合并顺序：Taro 基础配置 → Harmony 配置 → 自定义配置
  return mergeConfig(
    customConfig,
    mergeConfig(taroMetroConfig, harmonyMetroConfig)
  );
})()
