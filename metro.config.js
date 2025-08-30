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
  let metroConfigTRN = await getMetroConfig()
  let metroConfigRN = getDefaultConfig(__dirname)
  let customConfig = wrapWithReanimatedMetroConfig(
    mergeConfig(metroConfigRN, metroConfigTRN, config)
  )
  console.log('metroConfigTRN', metroConfigTRN)
  console.log('defaultConfigRN', metroConfigRN)
  console.log('customMetroConfig', customConfig)
  return customConfig;
})();
