import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import hooksPng from "@/assets/iconpark/aiming.png";
import routerPng from "@/assets/iconpark/navigation.png";
import lifecyclePng from "@/assets/iconpark/cycle-arrow.png";
import stylesPng from "@/assets/iconpark/font-size.png";
import { Button, ConfigProvider, TextArea, Dialog } from '@nutui/nutui-react-taro'

import enUS from '@nutui/nutui-react-taro/dist/locales/en-US'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'

import "./index.scss";

// 修复图片映射键名，确保与list的id对应
const PNGS = {
  hooks: hooksPng,      // 改为小写且去掉Png后缀
  router: routerPng,
  lifecycle: lifecyclePng,
  styles: stylesPng
};

// 定义类型接口，增强类型安全
interface PageItem {
  id: string;
  name: string;
  url?: string;
}

interface KindItem {
  id: string;
  name: string;
  open: boolean;
  pages: PageItem[];
  hdClass?: string;
  bdClass?: string;
  boxClass?: string;
  imgSrc?: string;
  _pages?: PageItem[];
}

interface TranslatedText {
  welcome: string;
  button: string;
  open: string;
}

interface ComponentState {
  locale: typeof zhCN | typeof enUS;
  visible: boolean;
  translated: Record<string, TranslatedText>;
  list: KindItem[];
}

export default class Index extends Component<never, ComponentState> {
  constructor(props: never) {
    super(props);
    this.state = {
      locale: zhCN,
      visible: false,
      translated: {
        zhCN: {
          welcome: '欢迎使用 NutUI React 开发 Taro 多端项目。',
          button: '使用英文',
          open: '点击打开',
        },
        enUS: {
          welcome: 'Welcome to use NutUI React to develop Taro multi-terminal projects.',
          button: 'Use Chinese',
          open: 'Click Me',
        },
      },
      list: [
        {
          id: "hooks",
          name: "Taro Hooks",
          open: false,
          pages: [
            { id: 'page', name: 'Hooks' }
          ]
        },
        {
          id: "lifecycle",
          name: "生命周期",
          open: false,
          pages: [
            { id: 'page', name: '页面生命周期' }
          ]
        },
        {
          id: "router",
          name: "路由",
          open: false,
          pages: [
            { id: 'index', name: '页面跳转' }
          ]
        },
        {
          id: "styles",
          name: "样式",
          open: false,
          pages: [
            { id: 'size', name: '尺寸' },
            { id: 'platform', name: '跨平台' }
          ]
        }
      ]
    };
  }

  // 列表项展开/折叠处理（使用useCallback缓存函数）
  kindToggle = (id: string) => () => {
    this.setState(prevState => ({
      list: prevState.list.map(item => ({
        ...item,
        open: item.id === id ? !item.open : false
      }))
    }));
  };

  // 页面跳转处理
  goToComponent = (page: { url?: string }) => {
    if (page.url) {
      Taro.navigateTo({ url: page.url });
    } else {
      console.warn('页面URL不存在');
    }
  };

  // 语言切换处理
  handleSwitchLocale = () => {
    this.setState(prevState => ({
      locale: prevState.locale === zhCN ? enUS : zhCN
    }))
  }

  handleOpenDialog = () => {
    this.setState({ visible: true })
  }

  handleCloseDialog = () => {
    this.setState({ visible: false })
  }

  render() {
    const { locale, visible, translated, list } = this.state;
    const localeKey = locale === zhCN ? 'zhCN' : 'enUS';

    return (
      <ConfigProvider locale={locale}>
        <ScrollView className='index' enableBackToTop style={{ paddingBottom: '80px' }}>
          <View className='nutui-react-demo'>
            <View>{translated[localeKey].welcome}</View>
            <View className="button-group">
              <Button type='primary' onClick={this.handleSwitchLocale}>
                {translated[localeKey].button}
              </Button>
              <Button type='success' onClick={this.handleOpenDialog}>
                {translated[localeKey].open}
              </Button>

              <Dialog
                visible={visible}
                onConfirm={this.handleCloseDialog}
                onCancel={this.handleCloseDialog}
              >
                {translated[localeKey].welcome}
              </Dialog>

              <TextArea disabled placeholder="禁用状态" showCount maxLength={20} />
              <TextArea placeholder="请输入内容" showCount maxLength={20} />
            </View>
          </View>

          <View className='index-hd'>
            <View className='index-desc'>
              <Text className='index-desc_text'>
                以下将展示 Taro 全局能力。
              </Text>
            </View>
          </View>

          <View className='index-bd'>
            <View className='kind-list'>
              {list.map(item => {
                // 计算样式类和URL，不修改原对象
                const hdClass = `kind-list-item-hd ${item.open ? 'kind-list-item-hd-show' : ''}`;
                const bdClass = `kind-list-item-bd ${item.open ? 'kind-list-item-bd-show' : ''}`;
                const boxClass = `navigator-box ${item.open ? 'navigator-box-show' : ''}`;
                const imgSrc = PNGS[item.id];
                const _pages = item.pages.map(page => ({
                  ...page,
                  url: `/pages/global/pages/${item.id}/${page.id}`
                }));

                return {
                  ...item,
                  hdClass,
                  bdClass,
                  boxClass,
                  imgSrc,
                  _pages
                };
              }).map((item) => (
                <View className='kind-list-item' key={item.id}>
                  <View
                    className={item.hdClass}
                    onClick={this.kindToggle(item.id)}
                  >
                    <View className='kind-list-text'>
                      <Text>{item.name}</Text>
                    </View>
                    <Image
                      className='kind-list-img'
                      src={item.imgSrc}
                      mode="widthFix"
                      lazyLoad
                    />
                  </View>
                  <View className={item.bdClass}>
                    <View className={item.boxClass}>
                      {item._pages?.map((page) => (
                        <View
                          onClick={() => this.goToComponent(page)}
                          key={page.id}
                          className='navigator'
                        >
                          <Text className='navigator-text'>
                            {page.name}
                          </Text>
                          <View className='navigator-arrow' />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ConfigProvider>
    );
  }
}
