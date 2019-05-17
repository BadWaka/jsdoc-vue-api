<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例0 原生按钮
        </view>
        <view
            class="c-container c-row"
        >
            <button
                type="primary"
            >
                主按钮
            </button>
            <button
            >
                默认按钮
            </button>
            <button
                type="warn"
            >
                警告按钮
            </button>
        </view>
    </view>
</template>

<script>
import Button from '../Button';

export default {
    config: {
        component: true
    },
    components: {
        'c-btn': Button
    },
    data() {
        return {
        };
    },
    methods: {
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
