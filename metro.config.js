// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

// 先获取 Taro 的 Metro 配置
const taroConfig = await getMetroConfig();

// 获取 Expo 默认配置并与 Taro 配置合并
const defaultConfig = getDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};
/*
const finalConfig = {
  ...defaultConfig,
  ...taroConfig,
  resolver: {
    ...defaultConfig.resolver,
    ...taroConfig.resolver,
    // 确保 assetExts 合并而非覆盖
    assetExts: [...defaultConfig.resolver.assetExts, ...(taroConfig.resolver?.assetExts || [])]
  },
  transformer: {
    ...defaultConfig.transformer,
    ...taroConfig.transformer,
    // 保留 Expo 必要的 transformer 配置
    babelTransformerPath: require.resolve('react-native-svg-transformer')
  },
  ...config
}
;*/

const finalConfig = mergeConfig(defaultConfig, taroConfig, config)

// 应用 Reanimated 配置
module.exports = (async function () {
  return wrapWithReanimatedMetroConfig(finalConfig);
})();
