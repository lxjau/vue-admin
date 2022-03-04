<template>
  <div>
    <el-card style="margin: 10px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene!=0"
      ></CategorySelect>
    </el-card>
    <el-card>
        <div v-show="scene==0">
              <el-button type="primary" icon="el-icon-plus" :disabled='!category3Id' @click="addSpu">添加SPU</el-button>
              <el-table style="width: 100%" border :data="spuList">
                <el-table-column align="center" type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="spuName" label="SPU名称" width="width">
                </el-table-column>
                <el-table-column prop="description" label="SPU描述" width="width">
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="width">
                  <template slot-scope="{row}">
                    <HintButton type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></HintButton>
                    <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></HintButton>
                    <HintButton type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)"></HintButton>
                    <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm='deleteSpu(row)'>
                      <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></HintButton>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                  style="text-align:center;margin:10px 0"
                  background
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :current-page="page"
                  :page-sizes="[3, 5, 10]"
                  :page-size="limit"
                  layout="prev, pager, next, jumper,->,sizes,total"
                  :total="total">
                </el-pagination>
                <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible" @close="close">
                  <el-table :data="skuList" style="width: 100%" v-loading="loading">
                    <el-table-column prop="prop" label="名称" width="width">
                      <template slot-scope="{row}">
                        {{row.skuName}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="价格" width="width">
                      <template slot-scope="{row}">
                        {{row.price}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="重量" width="width">
                      <template slot-scope="{row}">
                        {{row.weight}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="默认图片" width="width">
                      <template slot-scope="{row}">
                        <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg"></el-image>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dialog>
        </div>
        <spuFrom v-show="scene==1" @changeScene='changeScene' ref="spu"></spuFrom>
        <skuFrom v-show="scene==2" ref="sku" @changeScene='changeSceneSku'></skuFrom>
    </el-card>
  </div>
</template>

<script>
import spuFrom from './spuFrom'
import skuFrom from './skuFrom'
export default {
  name: "Spu",
  components:{
    spuFrom,
    skuFrom
  },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page:1,
      limit:3,
      total:0,
      spuList:[],
      scene:0 ,//结构变化 0 最初的展示数据 1添加or修改 2添加sku
      // 控制sku对话框
      dialogTableVisible:false,
      // sku列表
      skuList:[],
      spu:{},
      loading:true,
    };
  },
  methods: {
    // 点击分页器回调会收到当前页
    handleCurrentChange(page){
      this.page = page
      this.getSpuList(this.page)
    },
    // 点击每页显示多少数据
    handleSizeChange(limit){
      this.limit = limit
      this.getSpuList()
    },
    // 获取spu列表数据
   async getSpuList(pager = 1) {
      this.page =pager
      const {page,limit,category3Id} = this
      let result = await this.$API.spu.reqGetSpuList(page,limit,category3Id)
      if(result.code==200){
        this.total = result.data.total
        this.spuList = result.data.records
      }
    },
    // 三级联动的自定义事件，可以把子组件相应id传递过来
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取spu列表数据进行展示
        this.getSpuList();
      }
    },
    // 添加spu
    addSpu(){
      this.scene = 1
      this.$refs.spu.addSpu(this.category3Id)
    },
    // 修改spu
    updateSpu(row){
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    // 删除spu
   async deleteSpu(row){
     let result = this.$API.spu.reqDeleteSpu(row.id)
     if(result.code==200){
       this.getSpuList(this.spuList.length > 1 ? this.page : this.page-1)
     } 
    },
    // spuFrom组件点击取消or保存按钮
    changeScene({scene,flag}){
      this.scene = scene
      if(flag=='修改'){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
    },
    changeSceneSku(scene){
      this.scene = scene
    },
    // 添加+sku
    addSku(row){
      this.scene = 2
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)
    },
    // 查看sku按钮
   async handler(spu){
      this.loading = true
      this.spu = spu
      this.dialogTableVisible = true
      let result = await this.$API.spu.reqSkuList(spu.id)
      if(result.code==200){
        this.skuList = result.data
        this.loading = false
      }
    },
    // 关闭sku对话框
    close(){
      this.skuList = []
    }
  },
};
</script>

<style>
</style>