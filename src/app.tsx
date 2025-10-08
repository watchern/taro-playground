import {Component} from 'react'

// 全局样式
// import '@nutui/nutui-react-taro/dist/esm/styles/index.scss';
 // NutUI 全局样式
if (process.env.TARO_ENV === 'rn') {
  // @ts-ignore
  import './styles/nutui-fix.scss'; // 放在 NutUI 样式之后，确保优先级
  // @ts-ignore
  import './app.scss'
} else {
  // @ts-ignore
  import './app.scss'
}

if (process.env.TARO_ENV === 'h5') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    // @ts-ignore
    return this.props.children
  }
}
export default App
