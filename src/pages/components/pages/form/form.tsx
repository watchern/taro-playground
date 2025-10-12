import React from "react";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  Input,
  Label,
  Picker,
  Radio,
  RadioGroup,
  ScrollView,
  Slider,
  Switch,
  Text,
  View
} from "@tarojs/components";
import Header from "@/components/head/head";
import JSONTree from '@/components/jsontree'
import "./form.scss";

type RadioItemType = {
  key: string,
  value: string,
  checked: boolean,
}

type CheckItemsType = {
  key: string,
  value: string,
  checked: boolean,
}

interface IState {
  enableSwitch: boolean,
  radioItems: RadioItemType[],
  checkItems: CheckItemsType[],
  sliderValue: string | number,
  inputValue: string,
  localSel: string,
  timeSel: string,
  selectDate: string,
  formData: any,
}

export default class PageForm extends React.Component<any, IState> {
  state = {
    enableSwitch: false,
    radioItems: [
      {
        key: "radio-1",
        value: "选项一",
        checked: false
      },
      {
        key: "radio-2",
        value: "选项二",
        checked: false
      }
    ],
    checkItems: [
      {
        key: "checkbox—1",
        value: "选项一",
        checked: false
      },
      {
        key: "checkbox—2",
        value: "选项二",
        checked: false
      }
    ],
    sliderValue: 50,
    localSelectors: ['美国', '中国', '巴西', '日本'],
    localSel: '美国',
    timeSel: '12:01',
    selectDate: '2020-01-02',
    inputValue: '',
    formData: {}
  };
  onHandleReset = e => {
    console.log('onHandleReset',e)
  };
  onHandleSubmit = e => {
    console.log('onHandleSubmit',e)
    console.log(this.state)
  };
  onLocalChange = e => {
    const pickIndex = e.detail.value;
    console.log(e,e.detail)
    this.setState({
      localSel: this.state.localSelectors[pickIndex]
    })
  }
  onTimeChange = e => {
    const value = e.detail.value;
    this.setState({
      timeSel: value
    })
  }
  onHandleChange = e => {
    const value = e.detail.value;
    this.setState({
      inputValue: value
    });
  };

  onHandleSwitchChange = e => {
    const value = e.detail.value;
    this.setState({
      enableSwitch: value
    })
  }

  onRadioChange = e => {
    console.log(e);
  };

  onCheckChange = e => {
    const { value } = e.detail;
    const { checkItems } = this.state;
    checkItems.forEach(item => {
      item.checked = value.includes(item.key);
    });
    this.setState({
      checkItems
    });
  };

  handleSliderChange = e => {
    console.log(e);
    this.setState({
      sliderValue: e.detail.value
    })
  };

  handleSliderChanging = e => {
    console.log('handleSliderChanging', e);
  };

  handleDateChange = e => {
    const val = e.detail.value;
    const dateSel = Array.isArray(val) ? val.join("-") : val;
    this.setState({
      selectDate: dateSel
    });
  }

  formSubmit = e => {
    console.log(e);
    this.setState({
      formData: {...e.detail.value}
    })
  };

  formReset = e => {
    console.log(e);
    this.setState({
      sliderValue: 50,
      inputValue: '',
      formData: {}
    })
  };

  render() {
    const { enableSwitch, radioItems = [], checkItems = [], sliderValue, selectDate, localSelectors,localSel, timeSel, inputValue, formData } = this.state;
    return (
      <ScrollView className="components-page">
        <View className="components-page__header">
          <Header title="Form" />
        </View>
        <Form onSubmit={this.formSubmit} onReset={this.formReset}>
          <View className="components-page__body">
            <View className="components-page__body-example example">
              <View className="example-header">switch</View>
              <View className="example-body">
                <Switch
                  onChange={this.onHandleSwitchChange}
                  name="switch"
                  className="form-switch"
                  checked={enableSwitch}
                />
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-header">radio</View>
              <View className="example-body">
                <RadioGroup
                  className="example-body__radio-group"
                  onChange={this.onRadioChange}
                  name="radio"
                >
                  {radioItems.map((item: RadioItemType) => {
                    return (
                      <Label
                        className="example-body__radio-group-item"
                        for={item.key}
                        key={item.key}
                      >
                        <Radio value={item.key} checked={item.checked} />
                        <Text className="example-body__radio-group-item-text">
                          {item.value}
                        </Text>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-header">checkbox</View>
              <View className="example-body">
                <CheckboxGroup
                  className="example-body__checkbox-group"
                  onChange={this.onCheckChange}
                  name="checkbox"
                >
                  {checkItems.map((item: CheckItemsType) => {
                    return (
                      <Label
                        className="example-body__checkbox-group-item"
                        for={item.key}
                        key={item.key}
                      >
                        <Checkbox value={item.key} checked={item.checked} />
                        <Text className="example-body__checkbox-group-item-text">{item.value}</Text>
                      </Label>
                    );
                  })}
                </CheckboxGroup>
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-header">slider</View>
              <View className="example-body">
                <Slider
                  name="slider"
                  value={sliderValue}
                  showValue
                  onChange={this.handleSliderChange}
                  onChanging={this.handleSliderChanging}
                />
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-header">日期选择器</View>
              <View className="example-body">
                <Picker
                  name="date"
                  mode="date"
                  value={selectDate}
                  onChange={this.handleDateChange}
                >
                  <Text>当前选择日期：{selectDate}</Text>
                </Picker>
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-header">普通地区选择器</View>
              <View className="example-body">
                <Picker mode='selector'
                  name="localSel" range={localSelectors} onChange={this.onLocalChange}
                >
                  <View className='picker'>
                    当前选择：{localSel}
                  </View>
                </Picker>
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-header">时间选择器</View>
              <View className="example-body">
                <Picker mode='time'
                  value={timeSel}
                  name="timeSel"  onChange={this.onTimeChange}
                >
                  <View className='picker'>
                    当前选择：{timeSel}
                  </View>
                </Picker>
              </View>
            </View>
            <View className="components-page__body-example example example-input">
              <View className="example-header">input</View>
              <View className="example-input-example-body">
                <Input
                  name="input"
                  type="text"
                  value={inputValue}
                  placeholder="这是一个输入框"
                  onInput={this.onHandleChange}
                />
              </View>
            </View>
            <View className="components-page__body-example example">
              <View className="example-body" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button size="mini"
                  onClick={this.onHandleSubmit} formType="submit" type="primary"
                >
                  Submit
                </Button>
                <Button size="mini"
                  onClick={this.onHandleReset}
                  formType="reset" type="default"
                >
                  Reset
                </Button>
              </View>
              <JSONTree data={formData} />
            </View>
          </View>
        </Form>
      </ScrollView>
    );
  }
}
