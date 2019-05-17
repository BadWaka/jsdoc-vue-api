<template>
    <view
        :style="{
            visibility,
            zIndex
        }"
        class="dialog"
    >
        <view
            class="dialog-inner"
        >
            <!-- mask -->
            <view
                :style="{
                    opacity
                }"
                class="mask"
                @tap="handleMaskTap"
            >
            </view>
            <!-- 浮层 -->
            <view
                :style="{
                    width: width + 'px',
                    maxHeight: maxHeight + 'px',
                    opacity,
                    transform: 'scale(' + scale + ')'
                }"
                class="layer"
            >
                <!-- 上半区 -->
                <view
                    class="top"
                >
                    <!-- 距离顶部的间隔 -->
                    <view
                        v-if="gapTop"
                        :style="{
                            paddingTop: gapTop + 'px'
                        }"
                        class="gap-top"
                    >
                    </view>
                    <!-- 标题 -->
                    <view
                        v-if="title"
                        class="title"
                        @touchmove.prevent
                    >
                        {{ title }}
                    </view>
                    <!-- @slot title 标题 slot -->
                    <slot name="title"/>
                    <!-- 内容区 -->
                    <view>
                        <!-- 这里用 v-if 是因为每次点击打开里面的内容都要重新滚动到最顶部 -->
                        <view
                            v-if="content"
                            :style="{
                                maxHeight: contentMaxHeight + 'px',
                                textAlign: contentTextAlign
                            }"
                            class="content c-font-medium c-color-gray"
                        >
                            {{ content }}
                        </view>
                        <!-- slot -->
                        <view
                            v-if="isDefaultSlot"
                            :style="{
                                maxHeight: contentMaxHeight + 'px',
                                textAlign: contentTextAlign
                            }"
                            class="slot"
                        >
                            <!-- @slot 自定义内容区 -->
                            <slot/>
                        </view>
                    </view>
                </view>
                <!-- 下半区 -->
                <view
                    class="bottom c-line-top"
                    @touchmove.prevent
                >
                    <!-- 按钮 -->
                    <view
                        v-for="(btn, btnIndex) in btnOpts"
                        :key="btnIndex"
                        :style="{
                            color: btn.color,
                            borderLeft: btnIndex !== 0 ? '1px solid #eee' : ''
                        }"
                        class="btn c-font-big c-color-link"
                        @tap="handleBtnTap({
                            e: $event,
                            btn,
                            btnIndex
                        })"
                    >
                        {{ btn.text }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

export default {
    config: {
        component: true
    },
    components: {
    },
    props: {

        /**
         * 是否显示
         */
        show: {
            type: Boolean,
            default: true
        },

        /**
         * 距离顶部的距离，单位为 px；默认为 23px；
         */
        gapTop: {
            type: Number,
            default: 23
        },

        /**
         * css z-index
         */
        zIndex: {
            type: String,
            default: '501'
        },

        /**
         * 标题
         */
        title: {
            type: String,
            default: ''
        },

        /**
         * 标题高度，单位为 px；默认高度为 48px，其中34px 是标题的高度；14px 是标题距离顶部的距离；注：当使用自定义 title slot 的时候，需要传入 title slot 的高度
         */
        titleHeight: {
            type: Number,
            default: 48
        },

        /**
         * 内容
         */
        content: {
            type: String,
            default: ''
        },

        /**
         * 内容居中方式
         */
        contentTextAlign: {
            type: String,
            default: 'left'
        },

        /**
         * 按钮配置
         *
         * @property {string} event 该按钮绑定的事件名，点击该按钮时触发
         * @property {string} text 文案
         * @property {string} color 按钮文字颜色
         */
        btnOpts: {
            type: Array,
            default: function () {
                return [
                    {
                        event: 'cancel',
                        text: '取消'
                    },
                    {
                        event: 'confirm',
                        text: '确定'
                    }
                ];
            }
        }

    },
    data() {
        return {
            // 浮层的宽度
            width: 0,
            // 最大高度
            maxHeight: 'auto',
            // 内容最大高度
            contentMaxHeight: 'auto',
            // 透明度
            opacity: 0,
            // 最外层隐藏或显示
            visibility: 'hidden',
            // 浮层的缩放
            scale: 1.17,
            // 是否有默认 slot
            isDefaultSlot: false
        };
    },
    created() {
        console.log('this.$slots', this.$slots);
        if (this.$slots.default && this.$slots.default.length) {
            this.isDefaultSlot = true;
        }
        this.calculateWidthHeight();
    },
    methods: {

        /**
         * 计算宽高
         */
        calculateWidthHeight() {
            let systemInfo = this.$api.getSystemInfoSync();
            this.screenWidth = systemInfo.screenWidth;
            this.screenHeight = systemInfo.screenHeight;
            this.width = parseInt(this.screenWidth * .8, 10);
            this.maxHeight = parseInt(this.screenHeight * .55, 10);
            // 48 px 是底部按钮栏的高度
            this.contentMaxHeight = this.maxHeight - this.gapTop - this.titleHeight - 48;
        },

        handleMaskTap() {

            /**
             * 蒙层点击
             *
             * @event masktap
             */
            this.$emit('masktap');

            /**
             * 关闭事件
             *
             * @event close
             */
            this.$emit('close');
        },

        handleBtnTap(obj) {

            /**
             * 按钮点击事件
             *
             * @event btnclick
             * @property {Event} param1.e 透传的事件对象
             * @property {number} param1.btnIndex 点击按钮的索引
             * @property {object} param1.btn 点击的按钮配置
             * @property {string} param1.btn.event 该按钮绑定的事件名
             * @property {string} param1.btn.text 该按钮的文案
             */
            this.$emit('btntap', obj);

            // 如果 .event 存在
            if (obj.btn.event) {

                /**
                 * 确认事件
                 *
                 * @event confirm
                 * @property {Event} param1.e 透传的事件对象
                 * @property {number} param1.btnIndex 点击按钮的索引
                 * @property {object} param1.btn 点击的按钮配置
                 * @property {string} param1.btn.event 该按钮绑定的事件名
                 * @property {string} param1.btn.text 该按钮的文案
                 */

                /**
                 * 取消事件
                 *
                 * @event cancel
                 * @property {Event} param1.e 透传的事件对象
                 * @property {number} param1.btnIndex 点击按钮的索引
                 * @property {object} param1.btn 点击的按钮配置
                 * @property {string} param1.btn.event 该按钮绑定的事件名
                 * @property {string} param1.btn.text 该按钮的文案
                 */
                this.$emit(obj.btn.event, obj);
            }
            // 如果事件名不是 close，触发 close
            if (obj.btn.event !== 'close') {

                /**
                 * 关闭事件
                 *
                 * @event close
                 */
                this.$emit('close');
            }
        }
    },
    computed: {
    },
    watch: {
        show(newVal, oldVal) {
            if (newVal) {
                this.visibility = 'visible';
                this.opacity = 1;
                this.scale = 1;
            }
            else {
                this.opacity = 0;
                setTimeout(() => {
                    this.visibility = 'hidden';
                    this.scale = 1.17;
                }, 300);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.dialog-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity .16s cubic-bezier(0, 0, .3, 1);
}
.layer {
    z-index: 1;
    border-radius: 13px;
    background-color: #fff;
    transition: all .3s cubic-bezier(.14, .1, .12, 1);
    .top {
        padding-left: 24px;
        padding-right: 24px;
        .title {
            padding-bottom: 14px;
            text-align: center;
            box-sizing: border-box;
            color: #333;
            font: 24px/34px Arial, Helvetica, sans-serif;
        }
        .content,
        .slot {
            padding-bottom: 25px;
            overflow: scroll;
            box-sizing: border-box;
            // iOS 弹性滚动
            -webkit-overflow-scrolling: touch;
        }
    }
    .bottom {
        display: flex;
        height: 48px;
        .btn {
            flex: 1;
            padding-top: 9px;
            text-align: center;
        }
    }
}
</style>
