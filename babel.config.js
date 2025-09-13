// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }],
    'module:@react-native/babel-preset', "nativewind/babel",
    ["babel-preset-expo", { jsxImportSource: "nativewind" }],
  ],
  plugins: ['react-native-reanimated/plugin',]
}
