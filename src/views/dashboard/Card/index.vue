<template>
  <div style="margin:10px 0">
      <el-row :gutter="10">
          <el-col :span="6">
              <el-card>
                  <Detail title="总销售额" count='￥126560'>
                      <template slot="charts">
                        <span>周同比 &nbsp;  56.67% <svg t="1645688928343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2906" width="16" height="16"><path d="M512 380.342857l204.8 263.314286H307.2l204.8-263.314286z" p-id="2907" fill="#d81e06"></path></svg></span>
                        &nbsp;
                        <span>日同比 &nbsp; 19.96% <svg t="1645689071853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3176" width="16" height="16"><path d="M512 643.657143L307.2 380.342857h409.6L512 643.657143z" p-id="3177" fill="#1afa29"></path></svg></span>
                      </template>
                      <template slot="footer">
                        <span>日销售额 ￥12423</span>
                      </template>
                  </Detail>
              </el-card>
          </el-col>
          <el-col :span="6">
              <el-card>
                  <Detail title="访问量" count='88460'>
                      <template slot="charts">
                         <lineChart></lineChart>
                      </template>
                      <template slot="footer">
                        <span>日访问量 1356</span>
                      </template>
                  </Detail>
              </el-card>
          </el-col>
          <el-col :span="6">
              <el-card>
                  <Detail title="支付笔数" count='8579'>
                      <template slot="charts">
                        <barCharts></barCharts>
                      </template>
                      <template slot="footer">
                        <span>转化率 65%</span>
                      </template>
                  </Detail>
              </el-card>
          </el-col>
          <el-col :span="6">
              <el-card>
                  <Detail title="运营活动效果" count='78%'>
                      <template slot="charts">
                          <progressCharts></progressCharts>
                      </template>
                      <template slot="footer">
                        <span>周同比 &nbsp; 12% <svg t="1645688928343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2906" width="16" height="16"><path d="M512 380.342857l204.8 263.314286H307.2l204.8-263.314286z" p-id="2907" fill="#d81e06"></path></svg></span>
                        &nbsp;
                        <span>日同比 &nbsp; 11% <svg t="1645689071853" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3176" width="16" height="16"><path d="M512 643.657143L307.2 380.342857h409.6L512 643.657143z" p-id="3177" fill="#1afa29"></path></svg></span>
                      </template>
                  </Detail>
              </el-card>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
    name:'Card',
    components:{
        Detail,
        lineChart,
        barCharts,
        progressCharts
    }
}
</script>

<style scoped>
</style>