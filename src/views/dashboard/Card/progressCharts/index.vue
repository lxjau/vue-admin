<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressCharts",
  mounted() {
    let lineChart = echarts.init(this.$refs.charts);
    //    折线图
    //    配置数据
    lineChart.setOption({
      //    x轴
      xAxis: {
        //    隐藏
        show: false,
        mix:0,
        max:1000
      },
      //    y轴
      yAxis: {
        show: false,
         // 均分
        type: "category",
      },
      //    系列
      series: [
        {
          // 图表类型-柱状图
          type: "bar",
          data: [780],
          color:'yellowgreen',
          // 柱状图宽度
          barWidth:12,
          // 背景颜色设置
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          // 文本
          label:{
            show:true,
            formatter:'|',
            position:'right'
          }
        },
      ],
      //    布局的调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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