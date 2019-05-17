<template>
    <view
        class="cascader"
    >
        <!-- 隐藏的更新视图的元素 -->
        <view
            class="hidden-update"
        >
            {{ count }}
        </view>
        <!-- 列 -->
        <view
            v-for="(columnItem, columnIndex) in list"
            ref="column"
            :key="columnIndex"
            :class="[
                column === 2
                    ? 'column' + columnIndex
                    : ''
            ]"
            :style="{
                maxHeight: maxHeight
            }"
            class="column"
        >
            <!-- 有的列可能没有，需要占位置 -->
            <template
                v-if="columnItem && columnItem.options"
            >
                <!-- 项 -->
                <view
                    v-for="(option, optionIndex) in columnItem.options"
                    :key="optionIndex"
                    :style="{
                        color: columnItem.selectedIndex === optionIndex ? primaryColor : ''
                    }"
                    :class="{
                        'option-selected': columnItem.selectedIndex === optionIndex
                    }"
                    class="option c-line-clamp1 c-font-normal"
                    @tap="handleOptionTap({
                        column,
                        columnIndex,
                        option,
                        optionIndex,
                        options: columnItem.options
                    })"
                >
                    {{ option.text }}
                </view>
            </template>
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
         * 选项数组
         *
         * @property {string} options[].text 选项的文案
         * @property {string} options[].value 选项的值
         */
        options: {
            type: Array
        },

        /**
         * 列数
         */
        column: {
            type: Number,
            default: 1
        },

        /**
         * 每列的键值；因为 key 关键字不能作为 props，所以用 vKey
         */
        vKey: {
            type: String
        },

        /**
         * 默认值
         */
        defaultValue: String,

        /**
         * 最大高度
         */
        maxHeight: {
            type: String,
            default: '337.5px'
        },

        /**
         * 主颜色
         */
        primaryColor: {
            type: String,
            default: '#5183FF'
        }
    },
    data() {
        return {
            // 列数组
            columnArr: [],
            // 打平数据
            list: [],
            count: 0
        };
    },
    created() {
        this.init(this.options);
    },
    methods: {
        /**
         * 初始化
         */
        init(options) {
            if (!options) {
                return;
            }
            this.list = [];
            // 因为不支持 v-for i in 10 这种循环，所以需要处理一下
            for(let i = 0; i < this.column; i++) {
                this.list.push({
                    key: '',
                    selectedIndex: -1,
                    options: []
                });
            }
            // 初始化 list
            this.$set(this.list, 0, {
                key: this.vKey,
                selectedIndex: -1,
                options: JSON.parse(JSON.stringify(options))
            });
            // 打平数据
            this.cascaderRecursion(this.defaultValue || '', this.list[0].options, 0, null, this.list);
        },
        /**
         * 级联选择器递归
         */
        cascaderRecursion(defaultValue, options, count, defaultValueArr, list) {
            if (count === undefined) {
                count = 0;
            }
            if (!options) {
                return;
            }
            if (!defaultValueArr) {
                defaultValueArr = defaultValue.split(',').map(item => item.trim());
            }
            // 遍历找出值相等的项
            for (let i = 0; i < options.length; i++) {
                let option = options[i];
                let optionIndex = i;
                // 因为新设置的 defaultValue 是从级联选择器里返回的，所以是字符串，对于特殊字符，需要转换一下
                if (defaultValueArr[count] === 'null') {
                    defaultValueArr[count] = null;
                }
                // 如果值相等
                if (option.value === defaultValueArr[count]) {
                    // 设置选中
                    this.$set(option, 'selected', true);
                    // this.list[count].selectedIndex = optionIndex;
                    this.$set(this.list[count], 'selectedIndex', optionIndex);
                    // 如果选中的 otpion 还有子 options 存在
                    if (option && option.options) {
                        // 级数加1
                        count++;
                        // 设置子 options
                        this.$set(this.list, count, {
                            options: option.options,
                            key: option.key
                        });
                        // 递归
                        this.cascaderRecursion(option.defaultValue, option.options, count, defaultValueArr, this.list);
                    }
                    return;
                }
            }
        },
        // 项点击事件
        handleOptionTap(obj) {
            // 设置索引
            this.$set(this.list[obj.columnIndex], 'selectedIndex', obj.optionIndex);

            this.count++;

            // 只有一列
            if (parseInt(obj.column, 10) === 1) {
                // 触发最后一列点击事件
                this.emitLastColumnItemTapEvent(obj);
            }

            // 多列
            else {
                // 设置子选项
                // 如果选中的 otpion 还有子 options 存在
                if (obj && obj.option && obj.option.options) {
                    // 设置子 options
                    this.$set(this.list, obj.columnIndex + 1, {
                        options: obj.option.options
                    });
                    // 在切换前一层级的 option 时，后一层级的需要进行清空操作
                    this.clearColumn(obj.columnIndex + 2);
                }
                // 如果选中的 option 没有有子 options
                else {
                    // 清除列
                    this.clearColumn(obj.columnIndex + 1);
                }

                // 如果是最后一列
                if (parseInt(obj.column, 10) === obj.columnIndex + 1) {
                    // 触发最后一列点击事件
                    this.emitLastColumnItemTapEvent(obj);
                }
            }

            /**
             * 项点击事件
             *
             * @event itemtap
             *
             * @property {number} param1.column 列数
             * @property {number} param1.columnIndex 当前列索引
             * @property {string} param1.defaultValue 当前列默认值
             * @property {number} param1.optionIndex 当前选中项索引
             * @property {object} param1.option 当前选中项
             * @property {string} param1.option.text 当前选中项的文案
             * @property {string} param1.option.value 当前选中项的值
             * @property {Array} param1.options 当前列的所有项，类型同 obj.option
             */
            this.$emit('itemtap', obj);
        },
        // 触发最后一列项点击事件
        emitLastColumnItemTapEvent(obj) {
            // 默认值
            obj.defaultValue = '';
            // 键值对
            obj.keyValueObj = {};
            this.list.forEach((item, index) => {
                let key = item.key;
                let value = item.options[item.selectedIndex].value;
                this.list[index].value = value;
                obj.keyValueObj[item.key] = value;
                // 最后一列
                if (index === this.list.length - 1) {
                    obj.defaultValue += value;
                }
                else {
                    obj.defaultValue += value + ',';
                }
            });

            /**
             * 最后一列项点击事件
             *
             * @event lastcolumnitemtap
             *
             * @property {number} param1.column 列数
             * @property {number} param1.columnIndex 当前列索引
             * @property {string} param1.defaultValue 当前列默认值
             * @property {number} param1.optionIndex 当前选中项索引
             * @property {object} param1.option 当前选中项
             * @property {string} param1.option.text 当前选中项的文案
             * @property {string} param1.option.value 当前选中项的值
             * @property {Array} param1.options 当前列的所有项，类型同 param1.option
             */
            this.$emit('lastcolumnitemtap', obj);
        },
        // 清除列（包括起始和结束列）
        clearColumn(startColumnIndex, endColumnIndex) {
            // 默认 endColumnIndex 为 column - 1
            if (!endColumnIndex) {
                endColumnIndex = this.column - 1;
            }
            // 遍历 list
            this.list.forEach((listItem, listIndex) => {
                // 如果 listIndex > 选中的列 +1 && listIndex < 总列数
                if (listIndex >= startColumnIndex && listIndex <= endColumnIndex) {
                    // 清空该列的数据
                    this.$set(this.list, listIndex, null);
                }
            });
        }
    },
    watch: {
        options(newVal, oldVal) {
            this.init(newVal);
        }
    }
};
</script>

<style lang="less" scoped>
.hidden-update {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
}
.cascader {
    display: flex;
    background: #fff;
}
.column {
    width: 100%;
    /* 兼容；如果这里直接设置为 scroll，由于 Content 组件的 el.offsetWidth 强制重绘，在 Android 上会闪动；所以需要设置为 auto */
    overflow: auto;
    /* iOS 弹性滚动 */
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
}
.column0 {
    flex: 1;
    background-color: #f5f5f5;
}
.column1 {
    flex: 2;
}
.option {
    padding: 11px 17px;
}
.option-selected {
    background-color: #fff;
}
</style>
