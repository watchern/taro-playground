// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

// 先获取 Taro 的 Metro 配置
const taroConfig = getMetroConfig();

// 获取 Expo 默认配置并与 Taro 配置合并
const defaultConfig = getDefaultConfig(__dirname);
const mergedConfig = {
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
  }
};

// 应用 Reanimated 配置
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
