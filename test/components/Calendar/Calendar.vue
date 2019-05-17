<template>
    <view
        class="calendar"
    >
        <!-- 标题 -->
        <view
            class="title"
        >
            <c-icon
                name="xiangzuo"
                font-size="16px"
                class="icon"
                @tap="handlePreviousMonthTap"
            >
            </c-icon>
            <view
                class="c-font-normal"
            >
                {{ mYear }} 年 {{ mMonth }} 月
            </view>
            <c-icon
                name="xiangyou"
                font-size="16px"
                class="icon"
                @tap="handleNextMonthTap"
            >
            </c-icon>
        </view>
        <!-- week -->
        <view
            class="week"
        >
            <view
                v-for="(item, index) in weekStrArr"
                :key="index"
                :style="{
                    color: (index === 0 || index === 6) ? primaryColor : '#000'
                }"
                class="week-item c-font-normal"
            >
                {{ item }}
            </view>
        </view>
        <!-- body -->
        <!-- row -->
        <view
            v-for="(row, rowIndex) in rowArray"
            :key="rowIndex"
            class="day-row"
        >
            <!-- 循环判断的时候使用 template + v-if -->
            <template
                v-for="(dayItem, dayIndex) in dayArray"
            >
                <!-- item -->
                <!-- 用等分容器包裹 -->
                <view
                    v-if="dayIndex >= rowIndex * 7 && dayIndex < (rowIndex + 1) * 7"
                    :key="rowIndex + '' + dayIndex"
                    :style="{
                        color: (dayIndex % 7 === 0 || dayIndex  % 7=== 6) ? primaryColor : '#000'
                    }"
                    class="day-item-wrapper c-font-normal"
                    @tap="handleDayItemTap({
                        item: dayItem,
                        index: dayIndex
                    })"
                >
                    <!-- 项容器 -->
                    <view
                        :style="{
                            backgroundColor: dayItem.selected ? primaryColor : '',
                            color: dayItem.selected ? '#fff' : ''
                        }"
                        class="day-item"
                    >
                        <!-- 天 -->
                        <view
                            class="day"
                        >
                            {{ dayItem.day }}
                        </view>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>

<script>
import Icon from '../Icon/Icon';

export default {
    config: {
        component: true
    },
    components: {
        'c-icon': Icon
    },
    props: {

        /**
         * 当前日期
         *
         * @property {number} year 年
         * @property {number} month 月
         * @property {number} day 日
         */
        curDate: {
            type: Array,
            default: function() {
                return [];
            }
        },

        /**
         * 主颜色
         */
        primaryColor: {
            type: String,
            default: '#3388ff'
        },

        /**
         * 类型；'default' 单选，'range' 范围选择
         */
        type: {
            type: String
        }
    },
    data() {
        return {
            weekStrArr: ['日', '一', '二', '三', '四', '五', '六'],
            // 闰年月
            monthDayNumArrLeapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            // 普通年月
            monthDayNumArrNormalYear: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            mYear: null,
            mMonth: null,
            mDay: null,
            // 日期数组
            dayArray: [],
            // 行数
            rowNum: 0,
            // 行数数组，因为 mars 不支持 for in num
            rowArray: []
        };
    },
    created() {
        // 没有默认值，使用当前日期
        if (this.curDate.length === 0) {
            let date = new Date();
            this.mYear = date.getFullYear();
            this.mMonth = date.getMonth() + 1;
            this.mDay = date.getDate();
        }
        // 单选
        else if (this.curDate.length === 1) {
            let date = this.curDate[0];
            this.mYear = date.year;
            this.mMonth = date.month;
            this.mDay = date.day;
        }
        // 范围选择
        else if (this.curDate.length === 2) {
        }
        this.init(this.mYear, this.mMonth);
    },
    methods: {

        /**
         * 初始化
         */
        init(year, month) {
            this.dayArray = this.generatedayArray(year, month);
            this.rowNum = parseInt(this.dayArray.length / 7, 10);
            for (let i = 0; i < this.rowNum; i++) {
                this.rowArray.push({});
            }
        },

        /**
         * 生成天数组
         *
         * @param {number} year 年
         * @param {number} month 月
         */
        generatedayArray(year, month) {
            let dayArray = [];
            // 得到某个月份的天数
            let monthDayNum = this.getMonthDayNum(year, month);
            for (let i = 0; i < monthDayNum; i++) {
                let obj = {
                    year: year, // 年
                    month: month, // 月
                    day: i + 1 // 天
                };
                // 日期字符串；注意 iOS 须为 xxxx/xx/xx 这样
                obj.dateStr = `${year}/${month}/${obj.day}`;
                // date 对象
                obj.date = new Date(obj.dateStr);
                // 时间戳
                obj.timestamp = obj.date.getTime();
                // 星期
                obj.weekday = obj.date.getDay();
                // 选中态
                obj.selected = false;
                dayArray.push(obj);
            }
            // 第一天不是周日的话，需要补齐
            let firstDayDiff = dayArray[0].weekday;
            let firstDayTimestamp = dayArray[0].timestamp;
            for (let i = firstDayDiff - 1; i >= 0; i--) {
                let obj = {
                    weekday: i,
                    // 这里加时间戳是因为在计算选中区域的时候会根据时间戳计算
                    timestamp: firstDayTimestamp - 1,
                    selected: false
                };
                dayArray.unshift(obj);
            }
            // 最后一天不是周六的话，需要补齐
            let lastDayWeekday = dayArray[dayArray.length - 1].weekday;
            let lastDayTimestamp = dayArray[dayArray.length - 1].timestamp;
            for (let i = lastDayWeekday + 1; i < 7; i++) {
                let obj = {
                    weekday: i,
                    // 这里加时间戳是因为在计算选中区域的时候会根据时间戳计算
                    timestamp: lastDayTimestamp + 1,
                    selected: false
                };
                dayArray.push(obj);
            }
            return dayArray;
        },

        /**
         * 得到某个月份的天数
         *
         * @param {number} year 年
         * @param {number} month 月
         * @return {number} monthDayNum 这个月有几天
         */
        getMonthDayNum(year, month) {
            let isLeapYear = this.isLeapYear(year);
            if (isLeapYear) {
                return this.monthDayNumArrLeapYear[month - 1];
            }
            return this.monthDayNumArrNormalYear[month - 1];
        },

        /**
         * 判断是否是闰年
         * 其实只要满足下面几个条件即可：
         * 1.普通年能被4整除且不能被100整除的为闰年。如2004年就是闰年,1900年不是闰年
         * 2.世纪年能被400整除的是闰年。如2000年是闰年，1900年不是闰年
         *
         * @param {number} year 要判断的年份
         * @return {boolean} isLeapYear 返回布尔值
         */
        isLeapYear(year) {
            return !(year % (year % 100 ? 4 : 400));
        },

        /**
         * 前一个月点击
         */
        handlePreviousMonthTap() {
            let lastYear = this.mYear;
            let lastMonth = this.mMonth;

            if (this.mMonth === 1) {
                this.mYear--;
                this.mMonth = 12;
            }
            else {
                this.mMonth--;
            }
            this.init(this.mYear, this.mMonth);

            this.emitMonthChange({
                lastYear,
                lastMonth,
                year: this.mYear,
                month: this.mMonth
            });
        },

        /**
         * 下一个月点击
         */
        handleNextMonthTap() {
            let lastYear = this.mYear;
            let lastMonth = this.mMonth;

            if (this.mMonth === 12) {
                this.mYear++;
                this.mMonth = 1;
            }
            else {
                this.mMonth++;
            }
            this.init(this.mYear, this.mMonth);

            this.emitMonthChange({
                lastYear,
                lastMonth,
                year: this.mYear,
                month: this.mMonth
            });
        },

        // 触发月份切换
        emitMonthChange(obj) {

            /**
             * 月份变更
             *
             * @event monthchange
             *
             * @property {number} param1.lastYear 上一次的年份
             * @property {number} param1.lastMonth 上一次的月份
             * @property {number} param1.year 本次的年份
             * @property {number} param1.month 本次的月份
             */
            this.$emit('monthchange', obj);
        },

        // 天项点击事件
        handleDayItemTap(obj) {

            // 如果点击的地方没有日期，返回
            if (!obj.item.date) {
                return;
            }

            // 范围
            if (this.type === 'range') {

            }

            // 默认
            else {
                // 设置选中态
                this.dayArray.forEach((dayItem, dayIndex) => {
                    this.dayArray[dayIndex].selected = false;
                });
                this.dayArray[obj.index].selected = true;
            }

            /**
             * 日期点击事件
             *
             * @event daytap
             *
             * @property {number} param1.item.date 当前点击日期的 Date 对象
             * @property {number} param1.item.dateStr 当前点击日期的日期字符串
             * @property {number} param1.item.year 当前点击日期的年
             * @property {number} param1.item.month 当前点击日期的月
             * @property {number} param1.item.day 当前点击日期的天
             * @property {number} param1.item.weekday 当前点击日期的星期数
             * @property {number} param1.item.timestamp 当前点击日期的时间戳
             */
            this.$emit('daytap', obj);
        }
    }
};
</script>

<style lang="less" scoped>
.calendar {
    background-color: #fff;
}
.title {
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon {
    padding: 10px;
}
.week {
    display: flex;
    padding-left: 17px;
    padding-right: 17px;
    align-items: center;
    height: 38px;
    background-color: #f5f5f5;
}
.week-item {
    flex: 1;
    text-align: center;
}
.day-row {
    display: flex;
    padding-left: 17px;
    padding-right: 17px;
}
.day-item-wrapper {
    flex: 1;
}
.day-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 100%;
    width: 100%;
    height: 0;
    border-radius: 50%;
    text-align: center;
}
.day {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
}
</style>
