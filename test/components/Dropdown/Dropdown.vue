<template>
    <view
        class="dropdown"
    >
        <view
            :style="{
                borderColor: show ? '#555' : '#eee'
            }"
            class="line"
            @tap="handleTap"
        >
            <view
                class="c-font-normal c-line-clamp1"
            >
                <view
                    v-if="!mValue"
                    class="c-color-gray"
                >
                    {{ placeholder }}
                </view>
                <view
                    v-else
                    class="c-color-normal"
                >
                    {{ mValue }}
                </view>
            </view>
        </view>
        <c-popup
            :show="show"
            @close="handlePopupClose"
        >
            <view
                v-for="(optionItem, optionIndex) in options"
                :key="optionIndex"
                :class="optionItem.value === mValue ? 'option-item-selected' : ''"
                class="option-item c-font-normal c-gap-inner-top-large c-gap-inner-bottom-large c-line-clamp1 c-line-bottom c-color-normal"
                @tap="handleOptionItemTap({
                    item: optionItem,
                    index: optionIndex
                })"
            >
                {{ optionItem.text }}
            </view>
        </c-popup>
    </view>
</template>

<script>
import Popup from '../Popup/Popup';

export default {
    config: {
        component: true
    },
    components: {
        'c-popup': Popup
    },
    props: {

        /**
         * 值
         */
        value: {
            type: String
        },

        /**
         * 文字占位
         */
        placeholder: {
            type: String,
            default: '请选择'
        },

        /**
         * 选项
         */
        options: {
            type: Array
        }

    },
    data() {
        return {
            show: false,
            mValue: null
        };
    },
    created() {
        this.mValue = this.value;
    },
    methods: {
        handleTap() {
            this.show = true;
        },
        handlePopupClose() {
            this.show = false;
        },
        handleOptionItemTap(obj) {
            this.show = false;
            this.mValue = obj.item.value;

            /**
             * 项点击事件
             *
             * @event itemtap
             *
             * @property {number} param1.index 当前点击项的索引
             * @property {object} param1.item 当前点击项对象
             * @property {string} param1.item.text 当前点击项的文案
             * @property {string} param1.item.value 当前点击项的值
             */
            this.$emit('itemtap', obj);
        }
    }
};
</script>

<style lang="less" scoped>
.dropdown {
    background-color: #fff;
}
.line {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    height: 38px;
    border-radius: 5px;
    border: 1px solid #eee;
    box-sizing: border-box;
}
.option-item {
    box-sizing: border-box;
}
.option-item-selected {
    font-weight: bold;
    color: #000;
}
</style>
