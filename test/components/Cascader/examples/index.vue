<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="component-title"
        >
            Cascader 级联选择器
        </view>
        <example1/>
        <example2/>
    </view>
</template>

<script>
import example1 from './example1';
import example2 from './example2';

export default {
    components: {
        'example1': example1,
        'example2': example2
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
