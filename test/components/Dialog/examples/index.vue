<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="component-title"
        >
            Dialog 对话框
        </view>
        <example1/>
        <example2/>
        <example3/>
        <example4/>
        <example5/>
        <example6/>
    </view>
</template>

<script>
import example1 from './example1';
import example2 from './example2';
import example3 from './example3';
import example4 from './example4';
import example5 from './example5';
import example6 from './example6';

export default {
    components: {
        'example1': example1,
        'example2': example2,
        'example3': example3,
        'example4': example4,
        'example5': example5,
        'example6': example6
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
// 组件标题
.component-title {
    padding: 10px 17px;
    background-color: #fff;
    font: 16px/26px Arial, Helvetica, sans-serif;
    font-weight: bold;
}
</style>
