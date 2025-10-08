import { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StatusBar } from 'react-native'

// 全局样式
// import '@nutui/nutui-react-taro/dist/esm/styles/index.scss';
// Taro 条件编译：仅在 RN 环境保留以下导入
/* #ifdef rn */
import './styles/nutui-fix.scss';
/* #endif */
import './app.scss'

class App extends Component {

  componentDidMount () {
    SplashScreen && SplashScreen.hide();
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <>
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="dark-content"
      />
      { // @ts-ignore
        this.props.children
      }
    </>
  }
}
export default App
