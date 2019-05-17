<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例1 Dialog
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
            :title="title"
            :content="content"
            @close="handleClose"
            @btntap="handleDialogBtnTap"
        >
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
            content: '党的十八大提出，倡导富强、民主、文明、和谐，倡导自由、平等、公正、法治，倡导爱国、敬业、诚信、友善，积极培育和践行社会主义核心价值观。富强、民主、文明、和谐是国家层面的价值目标，自由、平等、公正、法治是社会层面的价值取向，爱国、敬业、诚信、友善是公民个人层面的价值准则，这24个字是社会主义核心价值观的基本内容。党的十八大提出，倡导富强、民主、文明、和谐，倡导自由、平等、公正、法治，倡导爱国、敬业、诚信、友善，积极培育和践行社会主义核心价值观。富强、民主、文明、和谐是国家层面的价值目标，自由、平等、公正、法治是社会层面的价值取向，爱国、敬业、诚信、友善是公民个人层面的价值准则，这24个字是社会主义核心价值观的基本内容。'
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
