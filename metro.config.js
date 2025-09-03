const { getDefaultConfig: getRNDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// metro.config.js
const { getDefaultConfig: getExpoDefaultConfig } = require('@expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

// 先获取 Taro 的 Metro 配置
const taroConfig = getMetroConfig();

// 获取 RN 默认配置并与 Taro 配置合并
const rnDefaultConfig = getRNDefaultConfig(__dirname);
// 获取 Expo 默认配置并与 Taro 配置合并
const expoDefaultConfig = getExpoDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = (async function () {
  return wrapWithReanimatedMetroConfig(
    mergeConfig(getExpoDefaultConfig(__dirname), getRNDefaultConfig(__dirname), await getMetroConfig(), config)
  );
})();
