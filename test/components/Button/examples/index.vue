<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="component-title"
        >
            Button 按钮
        </view>
        <!-- <example0/> -->
        <example1/>
        <example2/>
        <example3/>
    </view>
</template>

<script>
import example0 from './example0';
import example1 from './example1';
import example2 from './example2';
import example3 from './example3';

export default {
    components: {
        'example0': example0,
        'example1': example1,
        'example2': example2,
        'example3': example3
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
