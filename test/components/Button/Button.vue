<template>
    <view
        :style="{
            display: auto ? 'inline-block' : '',
            color: type === 'primary' ? '#fff' : primaryColor === '#555' ? '#000' : primaryColor,
            borderColor: type === 'primary' ? primaryColor : primaryColor,
            backgroundColor: type === 'primary' ? primaryColor : '#fff',
            opacity: touchActive ? 0.8 : 1
        }"
        class="btn c-font-normal"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
    >
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
         * 按钮类型；'primary' 主按钮；'default' 默认按钮
         */
        type: {
            type: String,
            default: 'default'
        },

        /**
         * 主颜色
         */
        primaryColor: {
            type: String,
            default: '#555'
        },

        /**
         * 是否自适应
         */
        auto: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            touchActive: false
        };
    },
    methods: {
        handleTouchStart(e) {
            this.touchActive = true;
        },
        handleTouchEnd(e) {
            this.touchActive = false;
        }
    }
};
</script>

<style lang="less" scoped>
.btn {
    padding: 6px 8px;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #555;
    transition: opacity .1s cubic-bezier(.18, 0, .26, 1);
}
</style>
