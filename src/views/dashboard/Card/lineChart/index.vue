<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
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
          type: "line",
          smooth:true,
          data: [1000, 1587, 3548,3000, 2456, 1984, 3214,5815],
          //    拐点样式的设置
          itemStyle: {
            opacity: 0,
          },
          //    线条的样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
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