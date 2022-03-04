<template>
  <div>
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column type="index" label="序号" width="80" align='center'>
      </el-table-column>
      <el-table-column prop="prop" label="名称" width="width">
        <template slot-scope="{row}">
          {{row.skuName}}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="描述" width="width">
        <template slot-scope="{row}">
          {{row.skuDesc}}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="width">
        <template slot-scope="{row}">
          <el-image style="width: 100px; height: 80px" :src="row.skuDefaultImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="重量(KG)" width="100">
        <template slot-scope="{row}">
          {{row.weight}}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="价格(元)" width="100">
        <template slot-scope="{row}">
          {{row.price}}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-bottom" size="small" v-if="row.isSale==1" @click="cancelSale(row)"></el-button>
          <el-button type="info" icon="el-icon-top" size="small" v-else @click="onSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="small" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="small" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center"
      background
      @current-change='getSkuList'
      @size-change="handleSizeChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total">
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :direction="direction" :show-close='false' size='50%'>
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:6px">{{attr.attrName}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="300px">
            <el-carousel-item v-for="img in skuInfo.skuImageList" :key="img.id">
              <el-image class="small" :src="img.imgUrl" style="width:100%;height:100%"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 抽屉状态
      drawer:false,
      // 抽屉方向
      direction:'rtl',
      page:1,
      pageSize:5,
      total:0,
      // sku初始数据
      skuList:[],
      // sku详情数据
      skuInfo:{},
    }
  },
  mounted(){
    this.getSkuList()
  },
  methods:{
    // 获取sku列表数据
   async getSkuList(pager = 1){
      this.page =pager
      let result = await this.$API.sku.reqSkuList(this.page,this.pageSize)
      if(result.code==200){
        this.total = result.data.total
        this.skuList = result.data.records
      }
    },
    // 改变pageSize发请求
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.getSkuList()
    },
    // 下架
   async cancelSale(row){
     let result = await this.$API.sku.reqCancelSale(row.id)
     if(result.code==200){
       row.isSale = 0
       this.$message.success('下架成功')
     }
    },
    // 上架
   async onSale(row){
      let result = await this.$API.sku.reqOnSale(row.id)
      if(result.code==200){
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    // 编辑
    edit(){
      this.$message('正在开发中')
    },
    // 获取sku详情信息
   async getSkuInfo(row){
      this.drawer = true
      let result = await this.$API.sku.reqSkuById(row.id)
      if(result.code==200){
        this.skuInfo = result.data
      }
    },
    // 关闭抽屉
  }
};
</script>

<style>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<style scoped>
    .el-row .el-col-5{
    font-size: 18px;
    font-weight: 700;
    text-align: right;
  }
  .el-col{
    margin: 10px;
  }
  >>>.el-carousel__button{
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background-color:rgb(202, 74, 95);
  }
</style>