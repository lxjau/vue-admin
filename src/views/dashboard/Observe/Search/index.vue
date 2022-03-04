<template>
  <div>
    <el-card>
      <div slot="header" class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <lineCharts></lineCharts>
          </el-col>
          <el-col :span="12">
            <lineCharts></lineCharts>
          </el-col>
        </el-row>

        <el-table :data="table" style="width: 100%" border>
            <el-table-column type="index" label="排名" align="center" width='80'>
            </el-table-column>
            <el-table-column prop="address" label="搜索关键字">
            </el-table-column>
            <el-table-column prop="date" label="用户数" sortable>
            </el-table-column>
            <el-table-column prop="name" label="周涨幅" sortable>
            </el-table-column>
        </el-table>

        <el-pagination
            style="text-align:right"
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
      </div>

    </el-card>
  </div>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "Search",
  data() {
      return {
          table:[{}]
      }
  },
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>