<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例1 一级级联
        </view>
        <c-cascader
            :default-value="defaultValue"
            :column="column"
            :options="options"
            @itemtap="handleItemTap"
            @lastcolumnitemtap="handleLastColumnItemTap"
        />
    </view>
</template>

<script>
import Cascader from '../Cascader';

export default {
    config: {
        component: true
    },
    components: {
        'c-cascader': Cascader
    },
    data() {
        return {
            column: 1,
            defaultValue: '文案3',
            options: [
                {
                    "text": "不限",
                    "value": ""
                }, {
                    "text": "文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1",
                    "value": "文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1文案1"
                }, {
                    "text": "文案2",
                    "value": "文案2",
                    'selected': true
                }, {
                    "text": "文案3",
                    "value": "文案3"
                }, {
                    "text": "文案4",
                    "value": "文案4"
                }, {
                    "text": "文案5",
                    "value": "文案5"
                }, {
                    "text": "文案6",
                    "value": "文案6"
                }, {
                    "text": "文案7",
                    "value": "文案7"
                }, {
                    "text": "文案8",
                    "value": "文案8"
                }, {
                    "text": "文案9",
                    "value": "文案9"
                }, {
                    "text": "文案10",
                    "value": "文案10"
                }
            ]
        };
    },
    methods: {
        handleItemTap(obj) {
            console.log('handleItemTap', obj);
        },
        handleLastColumnItemTap(obj) {
            console.log('handleLastColumnItemTap', obj);
        }
    }
};
</script>

<style lang="less">
// 示例标题
.example-item-title {
    margin-top: 10px;
    padding: 10px 17px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
}
</style>
