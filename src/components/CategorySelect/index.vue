<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" :model="cFrom">
      <el-form-item label="一级分类" >
        <el-select  placeholder="请选择" v-model="cFrom.category1Id" @change="handler1" :disabled='show'>
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in Category1List" :key="c1.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="cFrom.category2Id" @change="handler2" :disabled='show'>
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in Category2List" :key="c2.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="cFrom.category3Id" @change="handler3" :disabled='show'>
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in Category3List" :key="c3.id" ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
    data() {
        return {
            Category1List:[],
            Category2List:[],
            Category3List:[],
            cFrom:{
                category1Id:'',
                category2Id:'',
                category3Id:''
            }
        }
    },
    props:['show'],
  mounted(){
      this.getCategory1List()
  },

  methods:{
    //   获取一级分类数据
     async getCategory1List(){
        let result = await this.$API.attr.reqCategory1List()
        if(result.code==200){
            this.Category1List =result.data.slice(0,15)
        }
      },
    // 一级分类select事件回调获取二级分类相关数据
     async handler1(){
         this.Category2List =[]
         this.Category3List =[]
         this.cFrom.category2Id =''
         this.cFrom.category3Id =''
          const {category1Id} =this.cFrom
          this.$emit('getCategoryId',{categoryId:category1Id,level:1})
        let result = await this.$API.attr.reqCategory2List(category1Id)
        if(result.code==200){
            this.Category2List =result.data
        }
      },
    //  二级分类select事件回调获取三级分类相关数据
    async handler2(){
        this.Category3List =[]
        this.cFrom.category3Id=''
        const {category2Id} = this.cFrom
        this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let result = await this.$API.attr.reqCategory3List(category2Id)
      if(result.code==200){
          this.Category3List = result.data
      }
    },
    // 三级分类select事件回调
    handler3(){
        const {category3Id} =this.cFrom
        this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    }
  }
};
</script>

<style>

</style>