<template>
    <div class="history-container">
        <timeline>
            <timeline-item v-for="(item,index) in historyList"
                           :key="index">
                <h4 :class="[index==0?'recent':'']">{{item.levelName}}</h4>
                <p :class="[index==0?'recent':'','v-fz-16']">{{formatTime(item.testTime)}}</p>
            </timeline-item>
        </timeline>
    </div>
</template>

<script>
import { Timeline, TimelineItem } from 'vux'
import { mapMutations } from 'vuex'

export default {
    name: 'history',
    components: {
        Timeline, TimelineItem
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
            day = complete(date.getDate());
            hour = complete(date.getHours());
            minute = complete(date.getMinutes());
            return year+"年"+month + "月" + day + "日 " + hour + ":" + minute;
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
</script>