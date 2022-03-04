<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 左侧 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="visite"> </el-tab-pane>
      </el-tabs>
      <!-- 右侧 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
          class="date"
          v-model="date"
          value-format="yyyy-MM-dd"
          style="width: 300px"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="16">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="8">
          <div style="margin-left: 38px; font-weight: 700">
            门店{{ title }}排名
          </div>
          <ul>
            <li>
              <span class="ranking">1</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span class="ranking">2</span>
              <span>麦当劳</span>
              <span>299,132</span>
            </li>
            <li>
              <span class="ranking">3</span>
              <span>肯德基</span>
              <span>283,998</span>
            </li>
            <li>
              <span>4</span>
              <span>海底捞</span>
              <span>266,233</span>
            </li>
            <li>
              <span>5</span>
              <span>西贝筱面村</span>
              <span>223,445</span>
            </li>
            <li>
              <span>6</span>
              <span>汉堡王</span>
              <span>219,663</span>
            </li>
            <li>
              <span>7</span>
              <span>真功夫</span>
              <span>200,997</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      date: [],
    };
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    list() {
      return this.$store.state.home.list;
    },
  },
  
  methods: {
    //   日
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    //   周
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 月
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  watch: {
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
         xAxis: [
          {
            type: "category",
            data: this.title == "销售额" ? this.list.orderFullYearAxis : this.list.userFullYearAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],

        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.title == "销售额" ? this.list.orderFullYear : this.list.userFullYear,
            //   color: "yellowgreen",
          },
        ],
      });
    },
    
    list(){
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.list.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.list.orderFullYear,
          //   color: "yellowgreen",
        },
      ],
    });
  
    }
  },
};
</script>

<style scoped>
>>> .el-card__header {
  border-bottom: none;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.right span:hover {
  cursor: pointer;
}
.date {
  cursor: pointer;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
}
ul li {
  height: 8%;
}
.ranking {
  width: 20px;
  height: 20px;
  margin-right: 40px;
  padding: 0 5px;
  background-color: black;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  color: #fff;
}
ul li span:nth-child(1) {
  margin-right: 40px;
  padding: 0 5px;
}
ul li span:nth-child(3) {
  float: right;
}
</style>