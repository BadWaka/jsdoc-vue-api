<template>
    <view
        v-if="show"
        class="drawer"
    >
        <view
            class="mask"
            @tap="onMaskTap"
        >
        </view>
        <view
            class="panel"
        >
            <!-- @slot 内容区域 -->
            <slot/>
        </view>
    </view>
</template>

<script>
export default {
    config: {
        component: true
    },
    props: {

        /**
         * 是否显示
         */
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onMaskTap() {

            /**
             * 关闭事件
             *
             * @event close
             */
            this.$emit('close');
        }
    }
};
</script>

<style lang="less" scoped>
.mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
