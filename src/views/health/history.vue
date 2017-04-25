<template>
    <div class="history-container">
        <jroll-infinite>
            <timeline>
                <timeline-item v-for="(item,index) in historyList"
                               :key="index">
                    <h4 :class="[index==0?'recent':'']">{{item.levelName}}</h4>
                    <p :class="[index==0?'recent':'','v-fz-16']">{{formatTime(item.testTime)}}</p>
                </timeline-item>
            </timeline>
        </jroll-infinite>
    </div>
</template>

<script>
import Vue from 'vue'
import { Timeline, TimelineItem } from 'vux'
import { mapMutations } from 'vuex'
import JRoll from '../../../node_modules/jroll/jroll.min'
import Pulldown from '../../../node_modules/jroll/jroll-pulldown.min'
import VueInfinite from '../../../node_modules/jroll/jroll-vue-infinite'
export default {
    name: 'history',
    components: {
        Timeline, TimelineItem,
        'jroll-infinite': JRoll.VueInfinite({
            tip: "loading...",
            pulldown:{
               
            },
            bottomed: function (complete) {
                var me = this;
                if (me.page < 3) {
                    me.page++;
                    if (typeof complete == 'function') {
                       setTimeout(() => {
                            me.$parent.historyList.unshift({
                                "paperCode": "JKCSPFCS",
                                "paperName": "皮肤测试",
                                "userName": "332168802",
                                "levelCode": "A",
                                "levelName": "yyyy性肌肤",
                                "paperLevelCode": "JKCSPFCS_A",
                                "levelDesc": "油性肌肤",
                                "testTime": 1492151728000
                            })
                        }, 1500);
                        complete();
                       
                    }
                    else {
                        setTimeout(() => {
                            me.$parent.historyList.push({
                                "paperCode": "JKCSPFCS",
                                "paperName": "皮肤测试",
                                "userName": "332168802",
                                "levelCode": "A",
                                "levelName": "xxxx性肌肤",
                                "paperLevelCode": "JKCSPFCS_A",
                                "levelDesc": "油性肌肤",
                                "testTime": 1492151728000
                            })
                        }, 1500);
                    }

                }
                else me.tip = 'done~~'
            },
            updated: function () {
                console.warn('updated~~')
            }
        }, {
                scrollBarY: false,
                bounce: true
            })
    },
    data() {
        return {
            historyList: []
        }
    },
    methods: {
        formatTime(t) {
            var date, year, month, day, hour, minute;
            date = new Date(t);
            var complete = function (time) {
                return time.toString().replace(/^(\d)$/, "0$1");
            };
            year = date.getFullYear();
            month = complete(date.getMonth() + 1);
            // month = (date.getMonth() + 1).padStart(2,'0')
            day = complete(date.getDate());
            hour = complete(date.getHours());
            minute = complete(date.getMinutes());
            return `${year}年${month}月${day}日 ${hour}:${minute}`;
        }
    },
    created() {
        this.$store.commit('setPageTitle', '测试历史');
        var vm = this;
        this.axios.get('/static/history.json')
            .then(function (response) {
                vm.historyList = response.data.returnObject.result;
            })
    }
}
function complete(){
    console.log(11)
}
</script>
<style lang="less">
.history-container>div {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
}

.jroll-infinite-tip {
    text-align: center;
}
</style>