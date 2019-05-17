# Cascader

## API

### Props

名称 | 类型 | 默认值 | 是否必选 | 描述 | 其他
--- | --- | --- | --- | --- | ---
options | Array |  | 否 | 选项数组 | ---
>> options[].text | string |  | 否 | 选项的文案 | ---
>> options[].value | string |  | 否 | 选项的值 | ---
column | number |  | 否 | 列数 | ---
vKey | string |  | 否 | 每列的键值；因为 key 关键字不能作为 props，所以用 vKey | ---
defaultValue | undefined |  | 否 | 默认值 | ---
maxHeight | string |  | 否 | 最大高度 | ---
primaryColor | string |  | 否 | 主颜色 | ---

### Events

**itemtap**: 项点击事件

名称 | 类型 | 描述
--- | --- | ---
param1.column | number | 列数
param1.columnIndex | number | 当前列索引
param1.defaultValue | string | 当前列默认值
param1.optionIndex | number | 当前选中项索引
param1.option | object | 当前选中项
param1.option.text | string | 当前选中项的文案
param1.option.value | string | 当前选中项的值
param1.options | Array | 当前列的所有项，类型同 obj.option

**lastcolumnitemtap**: 最后一列项点击事件

名称 | 类型 | 描述
--- | --- | ---
param1.column | number | 列数
param1.columnIndex | number | 当前列索引
param1.defaultValue | string | 当前列默认值
param1.optionIndex | number | 当前选中项索引
param1.option | object | 当前选中项
param1.option.text | string | 当前选中项的文案
param1.option.value | string | 当前选中项的值
param1.options | Array | 当前列的所有项，类型同 param1.option

### Methods
