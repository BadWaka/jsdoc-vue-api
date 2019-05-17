<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例3 使用内容 slot
        </view>
        <view
            class="c-row c-padding-h c-gap-top c-gap-bottom"
        >
            <view
                class="c-span1"
            >
                <c-btn
                    @tap="handleBtnTap"
                >
                    打开弹窗
                </c-btn>
            </view>
        </view>
        <c-dialog
            :show="show"
            @close="handleClose"
            @btntap="handleDialogBtnTap"
        >
            <view
                v-for="(i, index) in array"
                :key="index"
            >
                自定义区 {{ index }}
            </view>
        </c-dialog>
    </view>
</template>

<script>
import Button from '../../Button/Button';
import Dialog from '../Dialog';

export default {
    config: {
        component: true
    },
    components: {
        'c-btn': Button,
        'c-dialog': Dialog
    },
    data() {
        return {
            show: false,
            title: '标题',
            content: '这是一段内容文案',
            array: [
                0,1,2,3,4,5,6,7,8,9
            ]
        };
    },
    methods: {
        handleBtnTap() {
            console.log('handleBtnTap');
            this.show = true;
        },
        handleClose() {
            console.log('handleClose');
            this.show = false;
        },
        handleDialogBtnTap(obj) {
            console.log('handleDialogBtnTap', obj);
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
