<template>
    <view>
        <!-- 组件标题 -->
        <view
            class="example-item-title"
        >
            示例2 二级级联
        </view>
        <c-cascader
            :default-value="defaultValue"
            :column="column"
            :options="options"
            @itemclick="handleItemClick"
            @lastcolumnitemclick="handleLastColumnItemClick"
        />
    </view>
</template>

<script>
import Cascader from '../Cascader';

export default {
    config: {
        component: true
    },
    components: {
        'c-cascader': Cascader
    },
    data() {
        return {
            column: 2,
            defaultValue: '热门职位,快递',
            options: [
                {
                    "text": "热门职位",
                    "value": "热门职位",
                    "key": "part",
                    "options": [
                        {
                            "text": "司机",
                            "value": "司机"
                        }, {
                            "text": "快递",
                            "value": "快递"
                        }, {
                            "text": "装修",
                            "value": "装修"
                        }, {
                            "text": "保安",
                            "value": "保安"
                        }, {
                            "text": "厨师",
                            "value": "厨师"
                        }, {
                            "text": "普工",
                            "value": "普工"
                        }, {
                            "text": "小时工",
                            "value": "小时工"
                        }, {
                            "text": "会计",
                            "value": "会计"
                        }, {
                            "text": "不限",
                            "value": "不限"
                        }
                    ]
                }, {
                    "text": "销售",
                    "value": "销售",
                    "key": "part",
                    "options": [
                        {
                            "text": "销售代表",
                            "value": "销售代表"
                        }, {
                            "text": "电话销售",
                            "value": "电话销售"
                        }, {
                            "text": "销售经理",
                            "value": "销售经理"
                        }, {
                            "text": "销售总监",
                            "value": "销售总监"
                        }, {
                            "text": "汽车销售",
                            "value": "汽车销售"
                        }, {
                            "text": "医药销售",
                            "value": "医药销售"
                        }, {
                            "text": "器械销售",
                            "value": "器械销售"
                        }, {
                            "text": "网络销售",
                            "value": "网络销售"
                        }, {
                            "text": "区域销售",
                            "value": "区域销售"
                        }, {
                            "text": "客户经理",
                            "value": "客户经理"
                        }, {
                            "text": "销售顾问",
                            "value": "销售顾问"
                        }
                    ]
                }, {
                    "text": "司机司机司机司机司机司机司机司机司机司机司机",
                    "value": "司机司机司机司机司机司机司机司机司机司机司机",
                    "key": "part",
                    "options": [
                        {
                            "text": "商务司机",
                            "value": "商务司机"
                        }, {
                            "text": "客车司机",
                            "value": "客车司机"
                        }, {
                            "text": "货车司机货车司机货车司机货车司机货车司机货车司机",
                            "value": "货车司机货车司机货车司机货车司机货车司机货车司机"
                        }, {
                            "text": "出租车司机",
                            "value": "出租车司机"
                        }, {
                            "text": "班车司机",
                            "value": "班车司机"
                        }, {
                            "text": "驾校教练",
                            "value": "驾校教练"
                        }, {
                            "text": "带车司机",
                            "value": "带车司机"
                        }
                    ]
                }, {
                    "text": "好玩职业",
                    "value": "好玩职业",
                    "key": "part",
                    "options": [
                        {
                            "text": "酒店试睡员",
                            "value": "酒店试睡员"
                        }, {
                            "text": "美食品尝师",
                            "value": "美食品尝师"
                        }, {
                            "text": "旅游体验师",
                            "value": "旅游体验师"
                        }, {
                            "text": "职业拥抱师",
                            "value": "职业拥抱师"
                        }, {
                            "text": "狗粮试吃员",
                            "value": "狗粮试吃员"
                        }, {
                            "text": "手模",
                            "value": "手模"
                        }, {
                            "text": "陪跑族",
                            "value": "陪跑族"
                        }, {
                            "text": "网购砍价师",
                            "value": "网购砍价师"
                        }, {
                            "text": "色彩搭配师",
                            "value": "色彩搭配师"
                        }, {
                            "text": "品酒师",
                            "value": "品酒师"
                        }
                    ]
                }, {
                    "text": "传奇职业",
                    "value": "传奇职业",
                    "key": "part",
                    "options": [
                        {
                            "text": "德玛西亚之力",
                            "value": "德玛西亚之力"
                        }, {
                            "text": "诺克萨斯之手",
                            "value": "诺克萨斯之手"
                        }, {
                            "text": "死亡骑士",
                            "value": "死亡骑士"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleItemClick(obj) {
            console.log('项点击事件 handleItemClick obj', obj);
        },
        handleLastColumnItemClick(obj) {
            console.log('最后一列项点击事件 handleLastColumnItemClick obj', obj);
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
