<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="main">
      <span>12321</span>
      <span style="margin-left: 52px">17.1</span>
      <i class="el-icon-caret-top"></i>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
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
          smooth: true,
          data: [1000, 980, 1587, 1100, 1400, 1678, 987, 2000],
          //    拐点样式的设置
          itemStyle: {
            opacity: 0,
          },
          //    线条的样式
          lineStyle: {
            color: "skyblue",
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
                  color: "skyblue", // 0% 处的颜色
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
.el-icon-info {
  margin-left: 8px;
  color: #ccc;
}
.el-icon-caret-top {
  color: red;
}
.el-icon-caret-bottom {
  color: greenyellow;
}
.main {
  margin-top: 20px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>