Taro Playground App
====

Taro Playground App是一个使用Taro开发的跨平台应用程序，可以帮助开发人员开发和调试Taro应用程序。它使用[taro react native template]（https://github.com/nervjs/taro-project-templates/tree/v3.1/react-native）初始化。

##预览

| Android | iOS | Web |小程序|
| - | - | - | - |
| ![](https://pic3.58cdn.com.cn/nowater/fangfe/n_v295dd481b6b2f446592350e3187716d03.png) | ![](https://pic1.58cdn.com.cn/nowater/fangfe/n_v224532e5560314106b6ab32b0a1534a9d.png) | ![](https://pic5.58cdn.com.cn/nowater/frs/n_v2d585527f52e640679cdd37123a418fe3.png) | ![](https://pic3.58cdn.com.cn/nowater/frs/n_v23ec2613515c6458aaa44f01d459cea8b.jpg) |
| https://github.com/wuba/taro-playground/releases | https://apps.apple.com/cn/app/taro-playground/id1576830673 | https://wuba.github.io/taro-playground/ | https://github.com/wuba/taro-playground |

### iOS 测试版连接

https://testflight.apple.com/join/RDFCp2yy

## 支持的版本

0. taro: `@tarojs/cli@^3.2.0`
1. 框架: 'react'

| Playground版本| Taro版本| React Native版本|分支|
| - | - | - | - |
| 1.1.2 | >= 3.2.0, < 3.3.10 | 0.64 | [releases/rn-0.64+taro-3.3.9](https://github.com/wuba/taro-playground/tree/releases/rn-0.64+taro-3.3.9) |
| 1.2.0 ~ 1.3.9 | >= 3.3.10, < 3.4.2 | 0.66 | [releases/rn-0.66+taro-3.4.2](https://github.com/wuba/taro-playground/tree/releases/rn-0.66+taro-3.4.2) |
| 1.4.0 ~ 1.4.8 | >= 3.4.2, < 3.5.0 | 0.67 | [releases/rn-0.67+taro-3.4.10](https://github.com/wuba/taro-playground/tree/releases/rn-0.67+taro-3.4.10) |
| 1.6.0 ~ 1.6.5 | >= 3.5.0, < 3.5.6 | 0.68 | [releases/rn-0.68+taro-3.5.5](https://github.com/wuba/taro-playground/tree/releases/rn-0.68+taro-3.5.5) |
| 1.7.0 ~ 1.7.4 | >=3.5.6, < 3.6.0 | 0.69 | [releases/rn-0.69+taro-3.5.11](https://github.com/wuba/taro-playground/tree/releases/rn-0.69+taro-3.5.11) |
| 1.8.0 ~ 1.8.2 | >=3.5.6, < 4.0.0 | 0.70 | [releases/rn-0.70+taro-3.6.18](https://github.com/wuba/taro-playground/tree/releases/rn-0.70+taro-3.6.18) |
| 1.11.0 ~ | >=4.0.8 | 0.73 | [main](https://github.com/wuba/taro-playground/tree/main) |

## 快速入门

### 安装react native 
> @tarojs/components-rn和@tarojs/router-rn的peerDependencies，它也会运行post-install。当您更改一个版本时，请修改并运行‘ upgradePeerdeps ’脚本。
> 
> 工程初始化完成后，运行此脚本

```
yarn upgradePeerdeps
```

### pod 安装
> 在添加新的react native库或更新react native库版本时运行此脚本。
> 
> 请参阅[pod-install]（https://www.npmjs.com/package/pod-install）了解更多信息。

```
yarn podInstall
```

###启动ios应用

```
yarn ios
```

###启动android应用程序

```
yarn android
```

### 启动

```
yarn start
```

### 重置缓存并启动

```
yarn start --reset-cache
```

### 更多信息

0. [development process of taro react native](https://taro-docs.jd.com/taro/docs/react-native)
1. [github address of the taro project](https://github.com/NervJS/taro)
2. [related articles of taro playground](https://docs.taro.zone/blog/2021-10-14-Taro-React-Native-update)

### 发布

### 构建ios bundle

```
yarn build:rn --platform ios
```

### 构建Android bundle

```
yarn build:rn --platform android
```

### 发布ios APP

详情请参见[publishing-to-app-store]（https://reactnative.cn/docs/publishing-to-app-store）。

### 发布android apk

详情请参阅[signed-apk-android]（https://reactnative.cn/docs/signed-apk-android）。

## Github工作流
> 使用github的动作来构建你的应用程序。这个模板包括基本的github动作配置。

查阅[.github/workflows](.github/workflows)获取详细信息。

### 事件

默认情况下，当您在主分支上推送或拉取请求时，我们会为android和ios组装调试和发布产品。通过修改[.github/workflows]来设计你自己的管道。github /工作流)文件。

[events-that-trigger-workflows] (https://docs.github.com/en/actions/reference/events-that-trigger-workflows)
### ios

#### 配置

修改package的以下配置项并发布应用。

> [.github/workflows/assemble_ios_debug.yml](.github/workflows/assemble_ios_debug.yml)
> [.github/workflows/assemble_ios_release.yml](.github/workflows/assemble_ios_release.yml)

```yml
env:
  APP_ID: com.taro.demo # Application Product Bundle Identifier
  APP_NAME: Taro Demo # The Display Name of your app
  VERSION_NUMBER: 1.0.0 # Application version number
  BUILD_NUMBER: 1.0.0.0 # Application build number, used by release only.
  TEAM_ID: XXXXXXXXXX # Team ID, is used when upgrading project
  PROVISIONING_PROFILE_SPECIFIER: Product_profile # Provisioning profile name to use for code signing
  CODE_SIGN_IDENTITY: iPhone Distribution # Code signing identity type (iPhone Developer, iPhone Distribution)
  SIGNING_CERTIFICATE_P12_DATA: ${{secrets.RELEASE_SIGNING_CERTIFICATE_P12_DATA}}
  SIGNING_CERTIFICATE_PASSWORD: ${{secrets.RELEASE_SIGNING_CERTIFICATE_PASSWORD}}
  PROVISIONING_PROFILE_DATA: ${{secrets.RELEASE_PROVISIONING_PROFILE_DATA}}
  APP_STORE_CONNECT_USERNAME: ${{secrets.APP_STORE_CONNECT_USERNAME}} # This secret should be set to the Apple ID of your developer account, used by release only.
  APP_STORE_CONNECT_PASSWORD: ${{secrets.APP_STORE_CONNECT_PASSWORD}} # used by release only.
```

变量${{secrets.xxxxx}}是手动生成的，并存储在你的github加密配置中。

##### SIGNING_CERTIFICATE_P12_DATA

```
cat Certificates.p12 | base64 | pbcopy
```

##### SIGNING_CERTIFICATE_PASSWORD

您的个人信息交换加密密码（.p12）

##### PROVISIONING_PROFILE_DATA

```
cat profile.mobileprovision | base64 | pbcopy
```

##### APP_STORE_CONNECT_PASSWORD

这个应该为你的Apple ID帐户设置一个特定于应用程序的密码。按照[这些说明]（https://support.apple.com/en-us/HT204397）创建特定于应用程序的密码。

#### 阅读更多

1. [deploy an ios app to testflight or the app store using github actions](https://betterprogramming.pub/deploy-an-ios-app-to-testflight-or-the-app-store-using-github-actions-c4d7082b1430)
2. [encrypted-secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)
3. [fastlane](https://docs.fastlane.tools/)

### 安卓

#### 配置

修改package的以下配置项并发布应用。

> [.github/workflows/assemble_android_debug.yml](.github/workflows/assemble_android_debug.yml)
> [.github/workflows/assemble_android_release.yml](.github/workflows/assemble_android_release.yml)

```yml
env:
  APP_ID: com.taro.demo  # Application Product Bundle Identifier
  APP_NAME: Taro Demo  # The Display Name of your app
  VERSION_NAME: 1.0.0 # version name
  VERSION_CODE: 10 # version code
  KEYSTORE_FILE: debug.keystore # key store file
  KEYSTORE_PASSWORD: android # key store password
  KEYSTORE_KEY_ALIAS: androiddebugkey # key store key alias
  KEYSTORE_KEY_PASSWORD: android # key store key password
```

为了您应用程序的安全性，请重新生成.Keystore文件并将密码存储在您的github加密配置中。
default.keystore
别名 android
密码 123456
debug.keystore
别名 androiddebugkey
密码 android
#### 阅读更多

1. [app signing](https://developer.android.com/studio/publish/app-signing)
2. [encrypted-secrets](https://docs.github.com/en/actions/reference/encrypted-secrets)

## Web和小程序支持

该项目支持web和小程序，但尚未完全测试。

### 启动web服务器

```shell
yarn dev:h5
```

### Github工作流程的Web

详情见[peaceiris/actions-gh-pages]（https://github.com/peaceiris/actions-gh-pages）。

### 启动微信小程序

```shell
yarn dev:weapp
```

### Github的微信小程序的工作流程

#### 配置

我们使用[@tarojs/plugin-mini-ci]（https://github.com/NervJS/taro/tree/next/packages/taro-plugin-mini-ci）来部署小程序。修改包的以下配置项并发布微信小程序。

> [.github/workflows/assemble_weapp_release.yml](.github/workflows/assemble_weapp_release.yml)

```yml
env:
  WEAPP_ID: ${{ secrets.WEAPP_ID }} # wechat mini program id
  WEAPP_KEY: ${{ secrets.WEAPP_KEY }} # wechat mini program key
```

参数${{secrets.xxxxx}}是手动生成的，并存储在你的github加密配置中。

##### WEAPP_KEY

```
cat private.$WEAPP_ID.key | base64 | pbcopy
```

## 关注

源代码是为Taro playground应用程序定制的，仅供参考。如果您想直接使用，请进行以下更改。

0. 使用您自己的签名文件。
1. 自定义应用id、应用名称、应用启动器等。
2. 移除ios/Podfile中的调试块。

## 用于React Native repo调试

0. 将appName更改为`taroDemo`，它在`AppRegistry.registerComponent(appName, () => App);`.
1. 生成内容为`taro://${ip}:${port}`的二维码，或者摇动手机，更改bundle Location。

## 贡献

我们真诚希望开发者提供宝贵的意见和建议，开发者可以通过提交PR或Issue的方式对建议和问题进行反馈。

如果您还有其他问题，可以加入交流群寻求帮助。

![](https://pic8.58cdn.com.cn/nowater/fangfe/n_v282625210493c4a3fac202d6cf372458e.png)

## 许可证

Taro Playground 源代码在Apache License V2下可用。

Taro及其图形商标归北京京东世纪贸易有限公司所有，并授权给Taro Playground项目。
