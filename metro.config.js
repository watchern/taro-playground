// metro.config.js
const { getDefaultConfig: getExpoDefaultConfig } = require('@expo/metro-config');
const { getDefaultConfig: getRNDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

const { wrapWithReanimatedMetroConfig, } = require('react-native-reanimated/metro-config');
// 先获取 Taro 的 Metro 配置
const taroConfig = async () => {
  return await getMetroConfig();
}

// 获取 Expo 默认配置并与 Taro 配置合并
const expoDefaultConfig = getExpoDefaultConfig(__dirname);
// 获取 RN 默认配置并与 Taro 配置合并
const rnDefaultConfig = getRNDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = (async function () {
  return wrapWithReanimatedMetroConfig(
    mergeConfig(expoDefaultConfig, rnDefaultConfig, await getMetroConfig(), config)
  );
})();
