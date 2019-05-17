<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例1 日历
        </view>
        <c-calendar
            @monthchange="handleMonthChange"
            @daytap="handleDayTap"
        >
        </c-calendar>
    </view>
</template>

<script>
import Calendar from '../Calendar';

export default {
    config: {
        component: true
    },
    components: {
        'c-calendar': Calendar
    },
    data() {
        return {
        };
    },
    methods: {
        handleMonthChange(obj) {
            console.log('handleMonthChange', obj);
        },
        handleDayTap(obj) {
            console.log('handleDayTap', obj);
        }
    }
};
</script>

<style lang="less" scoped>
// 示例标题
.example-item-title {
    margin-top: 10px;
    padding: 10px 17px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
}
</style>
