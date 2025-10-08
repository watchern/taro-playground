import Taro from "@tarojs/taro";
import {Component} from "react";
import {View, Image, Text, ScrollView} from "@tarojs/components";
import hooksPng from "@/assets/iconpark/aiming.png";
import routerPng from "@/assets/iconpark/navigation.png";
import lifecyclePng from "@/assets/iconpark/cycle-arrow.png";
import stylesPng from "@/assets/iconpark/font-size.png";

import "./index.scss";

// 修复图片映射键名，确保与list的id对应
const PNGS = {
  hooks: hooksPng,      // 改为小写且去掉Png后缀
  router: routerPng,
  lifecycle: lifecyclePng,
  styles: stylesPng
};

export default class Index extends Component<never, any> {
  constructor(props: never) {
    super(props);
    this.state = {
      list: [
        {
          id: "hooks",
          name: "Taro Hooks",
          open: false,
          pages: [
            {id: 'page', name: 'Hooks',}
          ]
        },
        {
          id: "lifecycle",
          name: "生命周期",
          open: false,
          pages: [
            {id: 'page', name: '页面生命周期',}
          ]
        },
        {
          id: "router",
          name: "路由",
          open: false,
          pages: [
            {id: 'index', name: '页面跳转',}
          ]
        },
        {
          id: "styles",
          name: "样式",
          open: false,
          pages: [
            {id: 'size', name: '尺寸'},
            {id: 'platform', name: '跨平台'}
          ]
        }
      ]
    };
  }

  kindToggle = (id: string) => () => {
    const list = this.state.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setState({list: list});
  };

  goToComponent = (page: { url: string }) => {
    // @ts-ignore
    Taro.navigateTo({
      url: page.url
    })
  };

  render() {
    return (
      <ScrollView className='index' enableBackToTop style={{ paddingBottom: 80 }}>
        <View className='index-hd'>
          <View className='index-desc'>
            <Text className='index-desc_text'>
              以下将展示 Taro 全局能力。
            </Text>
          </View>
        </View>
        <View className='index-bd'>
          <View className='kind-list'>
            {this.state.list
              .map(item => {
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
    );
  }
}
