<template>
  <div class="echarts">
    <IEcharts :option="pie" :loading="loading" @ready="onReady"></IEcharts>
  </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3';
export default {
  name: 'distribution',
  components: {
    IEcharts
  },
  props: {
  },
  data() {
    return {
      loading: true,
      pie: {
        title: {
          text: '测试分布状态',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}:{c}次({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['干性', '油性', '中性', '混合性']
        },
        series: [
          {
            name: '测试结果',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 5, name: '干性' },
              { value: 10, name: '油性' },
              { value: 4, name: '中性' },
              { value: 3, name: '混合性' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created(){
    this.$store.commit('setPageTitle','测试分布')
  },
  methods: {
    onReady(instance) {
      this.loading = false;
      instance.currentIndex = -1;
      var vm = this;
      setInterval(function () {
        var dataLen = vm.pie.series[0].data.length;
        // 取消之前高亮的图形
        instance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: instance.currentIndex
        });
        instance.currentIndex = (instance.currentIndex + 1) % dataLen;
        // 高亮当前图形
        instance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: instance.currentIndex
        });
        // 显示 tooltip
        instance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: instance.currentIndex
        });
      }, 1000);
    }
  }
}
</script>
<style lang='less' scoped>
.echarts {
  width: 100%;
  height: 400px;
  .vue-echarts {
    height: inherit;
  }
}
</style>