// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro',
      {
        framework: 'react',
        ts: 'true',
        compiler: 'webpack5',
      }]
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      //   "import",
      //   {
      //     "libraryName": "@nutui/nutui-react-taro",
      //     "libraryDirectory": "dist/esm",
      //     "style": 'css',
      //     "camel2DashComponentName": false
      //   },
      //   'nutui-react-taro'
      // // ],
      // // [
      'import',
      {
        libraryName: '@nutui/nutui-react-taro',
        "libraryDirectory": "dist/esm",
        camel2DashComponentName: false,
        customName: (name, file) => `@nutui/nutui-react-taro/dist/esm/${name}`,
        // 自动加载 scss 样式文件
        customStyleName: (name) => `@nutui/nutui-react-taro/dist/esm/${name}/style`,
        // 自动加载 css 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/esm/${name}/style/style`

        // JMAPP 主题
        // 自动加载 scss 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jmapp`,
        // 自动加载 css 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jmapp/css`

        // jrkf 端主题
        // 自动加载 scss 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jrkf`,
        // 自动加载 css 样式文件
        // customStyleName: (name) => `@nutui/nutui-react-taro/dist/es/packages/${name.toLowerCase()}/style-jrkf/css`
      },
      'nutui-react-taro'
    ]
  ]
}
