<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例1 下拉选择
        </view>
        <view
            class="c-container"
        >
            <view
                class="c-row"
            >
                <view
                    class="c-span12"
                >
                    <c-dropdown
                        :options="options"
                        @itemtap="handleDropdownItemTap"
                    >
                    </c-dropdown>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import Dropdown from '../Dropdown';

export default {
    config: {
        component: true
    },
    components: {
        'c-dropdown': Dropdown
    },
    data() {
        return {
            options: [
                {
                    text: '选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1',
                    value: 'option1'
                },
                {
                    text: '选项2',
                    value: 'option2'
                },
                {
                    text: '选项3',
                    value: 'option3'
                }
            ]
        };
    },
    methods: {
        handleDropdownItemTap(obj) {
            console.log('handleDropdownItemTap obj', obj);
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
