# Calendar

## API

### Props

名称 | 类型 | 默认值 | 是否必选 | 描述 | 其他
--- | --- | --- | --- | --- | ---
curDate | Array |  | 否 | 当前日期 | ---
>> year | number |  | 否 | 年 | ---
>> month | number |  | 否 | 月 | ---
>> day | number |  | 否 | 日 | ---
primaryColor | string |  | 否 | 主颜色 | ---
type | string |  | 否 | 类型；'default' 单选，'range' 范围选择 | ---

### Events

**monthchange**: 月份变更

名称 | 类型 | 描述
--- | --- | ---
param1.lastYear | number | 上一次的年份
param1.lastMonth | number | 上一次的月份
param1.year | number | 本次的年份
param1.month | number | 本次的月份

**daytap**: 日期点击事件

名称 | 类型 | 描述
--- | --- | ---
param1.item.date | number | 当前点击日期的 Date 对象
param1.item.dateStr | number | 当前点击日期的日期字符串
param1.item.year | number | 当前点击日期的年
param1.item.month | number | 当前点击日期的月
param1.item.day | number | 当前点击日期的天
param1.item.weekday | number | 当前点击日期的星期数
param1.item.timestamp | number | 当前点击日期的时间戳

### Methods

**init**: 初始化


**generatedayArray**: 生成天数组

名称 | 类型 | 描述
--- | --- | ---
year | number | 年
month | number | 月

**getMonthDayNum**: 得到某个月份的天数

名称 | 类型 | 描述
--- | --- | ---
year | number | 年
month | number | 月

**isLeapYear**: 判断是否是闰年
其实只要满足下面几个条件即可：
1.普通年能被4整除且不能被100整除的为闰年。如2004年就是闰年,1900年不是闰年
2.世纪年能被400整除的是闰年。如2000年是闰年，1900年不是闰年

名称 | 类型 | 描述
--- | --- | ---
year | number | 要判断的年份

**handlePreviousMonthTap**: 前一个月点击


**handleNextMonthTap**: 下一个月点击

