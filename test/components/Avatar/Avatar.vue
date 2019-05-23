<template>
    <view
        :style="{
            height: size + 'px',
            width: size + 'px',
            backgroundImage: 'url(' + src + ')',
            backgroundSize,
            border
        }"
        class="avatar"
    >
        <!-- @slot 基础 slot -->
        <slot/>
    </view>
</template>

<script>
export default {
    config: {
        component: true
    },
    props: {

        /**
         * 图片路径
         */
        src: {
            type: String
        },

        /**
         * 大小
         */
        size: {
            type: Number,
            default: 35
        },

        /**
         * 边线
         */
        border: {
            type: String
        },

        /**
         * background-size
         */
        backgroundSize: {
            type: String,
            default: 'cover'
        }
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
.avatar {
    border-radius: 50%;
    background-repeat: no-repeat;
}
</style>
