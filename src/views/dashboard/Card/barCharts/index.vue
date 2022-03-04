<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barCharts",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);
    //    折线图
    //    配置数据
    lineChart.setOption({
      //    x轴
      xAxis: {
        //    隐藏
        show: false,
        type: "category",
      },
      //    y轴
      yAxis: {
        show: false,
      },
      //    系列
      series: [
        {
          // 图表类型-柱状图
          type: "bar",
          data: [1000, 1587, 300,500, 1100, 1700, 900,1500,300,500,800,1500],
        },
      ],
      //    布局的调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      // 提示
      tooltip:{}
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>