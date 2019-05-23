[//]: # (不要删除！每次重新生成文档的时候，会覆盖掉此以下的部分)

## API

### Props

名称 | 类型 | 默认值 | 是否必选 | 描述 | 其他
--- | --- | --- | --- | --- | ---
show | boolean |  | 否 | 是否显示 | ---
gapTop | number |  | 否 | 距离顶部的距离，单位为 px；默认为 23px； | ---
zIndex | string |  | 否 | css z-index | ---
title | string |  | 否 | 标题 | ---
titleHeight | number |  | 否 | 标题高度，单位为 px；默认高度为 48px，其中34px 是标题的高度；14px 是标题距离顶部的距离；注：当使用自定义 title slot 的时候，需要传入 title slot 的高度 | ---
content | string |  | 否 | 内容 | ---
contentTextAlign | string |  | 否 | 内容居中方式 | ---
btnOpts | Array |  | 否 | 按钮配置 | ---
>> event | string |  | 否 | 该按钮绑定的事件名，点击该按钮时触发 | ---
>> text | string |  | 否 | 文案 | ---
>> color | string |  | 否 | 按钮文字颜色 | ---

### Events

**masktap**: 蒙层点击


**close**: 关闭事件


**btnclick**: 按钮点击事件

名称 | 类型 | 描述
--- | --- | ---
param1.e | Event | 透传的事件对象
param1.btnIndex | number | 点击按钮的索引
param1.btn | object | 点击的按钮配置
param1.btn.event | string | 该按钮绑定的事件名
param1.btn.text | string | 该按钮的文案

**confirm**: 确认事件

名称 | 类型 | 描述
--- | --- | ---
param1.e | Event | 透传的事件对象
param1.btnIndex | number | 点击按钮的索引
param1.btn | object | 点击的按钮配置
param1.btn.event | string | 该按钮绑定的事件名
param1.btn.text | string | 该按钮的文案

**cancel**: 取消事件

名称 | 类型 | 描述
--- | --- | ---
param1.e | Event | 透传的事件对象
param1.btnIndex | number | 点击按钮的索引
param1.btn | object | 点击的按钮配置
param1.btn.event | string | 该按钮绑定的事件名
param1.btn.text | string | 该按钮的文案

### Methods

**calculateWidthHeight**: 计算宽高

