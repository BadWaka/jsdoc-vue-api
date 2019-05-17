<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例1 头像
        </view>
        <view
            :style="{
                flexWrap: 'wrap'
            }"
            class="c-container c-row"
        >
            <view
                v-for="(item, index) in sizeArr"
                :key="index"
                :style="{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }"
                class="c-span3 c-gap-top"
            >
                <c-avatar
                    :src="src"
                    :size="item"
                >
                </c-avatar>
                {{ item }}px
            </view>
        </view>
    </view>
</template>

<script>
import Avatar from '../Avatar';

export default {
    config: {
        component: true
    },
    components: {
        'c-avatar': Avatar
    },
    data() {
        return {
            src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4180867819,4010340273&fm=26&gp=0.jpg',
            sizeArr: [
                73, 64, 53, 43, 35, 28, 22, 16
            ]
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
