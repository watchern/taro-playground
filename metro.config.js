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

const finalConfig = {
  ...expoDefaultConfig,
  ...taroConfig,
  resolver: {
    ...expoDefaultConfig.resolver,
    ...taroConfig.resolver,
    // 确保 assetExts 合并而非覆盖
    assetExts: [...expoDefaultConfig.resolver.assetExts, ...(taroConfig.resolver?.assetExts || [])]
  },
  transformer: {
    ...expoDefaultConfig.transformer,
    ...taroConfig.transformer,
    // 保留 Expo 必要的 transformer 配置
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  }
};

console.log('expoDefaultConfig', JSON.stringify(expoDefaultConfig))
console.log('rnDefaultConfig', JSON.stringify(rnDefaultConfig))
console.log('taroConfig', JSON.stringify(taroConfig))
module.exports = (async function () {
  let mergedConfig = wrapWithReanimatedMetroConfig(
    mergeConfig(expoDefaultConfig, await getMetroConfig(), config)
  );
  console.log('mergedConfig-ex', JSON.stringify(mergedConfig))
  return mergedConfig
})();
