import React, { useEffect, useState } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式

import './app.scss'

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

function App(props) {
  // 错误边界处理
  const [hasError, setHasError] = useState(false);
  // 可以使用所有的 React Hooks // componentDidMount
  useEffect(() => {
    // 错误处理逻辑
    if (hasError) {
      // 可以在这里添加错误上报或恢复逻辑
    }
  }, [hasError]);

  // 对应 onShow //componentDidShow
  useDidShow(() => {})

  // 对应 onHide //componentDidHide
  useDidHide(() => {})

  if (hasError) {
    // 错误发生时显示的UI
    return <div>发生错误，请刷新页面重试</div>;
  }
  return props.children
}

export default App
