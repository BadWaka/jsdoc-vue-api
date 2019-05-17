<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例2 自适应
        </view>
        <view
            class="c-container"
        >
            <c-btn
            >
                默认按钮
            </c-btn>
            <view
                class="c-gap-top"
            >
            </view>
            <c-btn
                auto
            >
                自适应按钮
            </c-btn>
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
