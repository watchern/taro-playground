// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// 先获取 Taro 的 Metro 配置
const taroConfig = async () => {
  return await getMetroConfig();
}

// 获取 Expo 默认配置并与 Taro 配置合并
const defaultConfig = getDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
const finalConfig = mergeConfig(defaultConfig, taroConfig, config)

module.exports = (function () {
  return wrapWithReanimatedMetroConfig(finalConfig);
})();
