const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = (async function () {
  return wrapWithReanimatedMetroConfig(
    mergeConfig(getDefaultConfig(__dirname), await getMetroConfig(), config)
  );
})();
