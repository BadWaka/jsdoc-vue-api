<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例1 抽屉
        </view>
        <view
            class="c-container"
        >
            <button
                @tap="onBtnTap"
            >
                点我打开抽屉
            </button>
        </view>
        <c-drawer
            :show="showDrawer"
            @close="onClose"
        >
            <view
                class="c-padding-h c-font-normal"
            >
                这里可以放自定义 slot
            </view>
            <view
                v-for="(item, index) in list"
                :key="index"
                class="c-padding-h c-font-normal"
            >
                第 {{ index }} 行
            </view>
        </c-drawer>
    </view>
</template>

<script>
import Drawer from '../Drawer';

export default {
    config: {
        component: true
    },
    components: {
        'c-drawer': Drawer
    },
    data() {
        return {
            showDrawer: false,
            list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
        };
    },
    methods: {
        onBtnTap() {
            this.showDrawer = true;
        },
        onClose() {
            this.showDrawer = false;
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
