<template>
    <!-- test vue -->
    <div
        class="btn"
        @click="onClick"
        @touchstart="onTouchStart"
    >
        test
        <!-- @slot 按钮内容123 -->
        <slot/>
        <!-- @slot 按钮左边内容 -->
        <slot name="left"/>
        <!-- @slot 按钮右边内容 -->
        <slot name="right">
        </slot>
    </div>
</template>

<script>
import test2 from './test2.vue';

export default {
    props: {
        /**
         * 选项数组
         *
         * @property {string} str='aaa' 测试字符串
         */
        options: {
            type: Array
        },
        /**
         * 测试属性1
         */
        prop1: {
            type: String,
            default: '测试属性1111111',
            required: true
        },
        /**
         * 需要被被忽略的属性
         *
         * @ignore
         */
        prop2: {
            type: String,
            default: '测试属性22222222'
        },

        /**
         * Boolean 参数
         */
        propBoolean: {
            type: Boolean,
            default: false
        },

        /**
         * Object 参数
         *
         * @property {boolean} a 属性 a
         * @property {string} b 属性 b
         */
        propObject: {
            type: Object,
            default: {
                a: true,
                b: '123'
            }
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 测试方法1
         *
         * @param {string} a 参数a
         * @param {number} b 参数b
         * @param {boolean} c 参数c
         * @return {number} res 结果
         */
        func1(a, b, c) {
            return 0;
        },

        /**
         * 测试方法2
         *
         * @param {string} d 参数d
         * @param {number} e 参数e
         * @param {boolean} f 参数f
         */
        func2(d, e, f) {
        },

        onClick(e) {

            /**
             * 点击事件
             *
             * @event click
             * @property {Event} e 事件对象
             */
            this.$emit('click', e);
        },

        onTouchStart() {

            /**
             * 触摸开始事件
             *
             * @event touchstart
             * @property {Event} e 事件对象
             * @property {string} str 字符串
             */
            this.$emit('touchstart', e, '123');
        }
    }
}
</script>

<style lang="less" scoped>
// 这是一个按钮
.btn {
}
</style>