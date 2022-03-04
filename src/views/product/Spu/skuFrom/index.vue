<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{spu.spuName}}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="sale.saleAttrName" v-for="sale in saleList" :key="sale.id">
            <el-select placeholder="请选择" v-model="sale.saleIdAndValueId">
              <el-option :label="saleValue.saleAttrValueName" :value="`${sale.id}:${saleValue.id}`" v-for="saleValue in sale.spuSaleAttrValueList" :key="saleValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImgList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <el-image style="width: 100px; height: 100px" :src="row.imgUrl"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" v-if="row.isDefault==0" @click="defaultImg(row)">设为默认</el-button>
              <el-button type="success" plain disabled size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuFrom",
  data() {
    return {
      // 图片
      spuImgList: [],
      // 销售属性；saleIdAndValueId收集在这
      saleList: [],
      // 平台属性数据；attrIdAndValueId收集在这
      attrInfoList: [],

      // 收集sku数据
      skuInfo: {
        // 第一类父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,

        // 第二类v-model收集数据
        skuName: "",
        price: '',
        weight: "",
        // 规格描述
        skuDesc: "",

        // 第三类需要写代码
        // 默认图片
        skuDefaultImg: "",
        // 图片
         skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
         // 销售属性列表
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
        
      },
      // 父组件数据
      spu:{},
      // 收集勾选图片;缺少isDefault默认图片
      checkImgList:[]
    };
  },

  methods: {
    // 获取skufrom数据
    async getData(category1Id, category2Id, spu) {
      this.spu = spu
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      //  获取图片
      let imgResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (imgResult.code == 200) {
        let list = imgResult.data
        list.forEach(item => item.isDefault=0);
        this.spuImgList =list
      }
      //  获取销售属性的数据
      let saleResult = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (saleResult.code == 200) {
        this.saleList = saleResult.data;
      }
      // 获取平台属性数据
      let result3 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result3.code == 200) {
        this.attrInfoList = result3.data;
      }
    },
    // 勾选的图片
    handleSelectionChange(value){
      this.checkImgList = value
    },
    // 设置为默认图片
    defaultImg(row){
      this.spuImgList.forEach(item=>item.isDefault=0)
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 保存
   async save(){
     const {skuInfo} = this
        // 整理平台属性数据
      skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev,item)=>{
          if(item.attrIdAndValueId){
            const [attrId,valueId] =item.attrIdAndValueId.split(':')
            prev.push({attrId,valueId})
          }
          return prev
        },[])
      // 整理销售属性数据
      skuInfo.skuSaleAttrValueList = this.saleList.reduce((prev,item)=>{
        if(item.saleIdAndValueId){
        const [saleAttrId,saleAttrValueId] = item.saleIdAndValueId.split(':')
        prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])
      // 图片
      skuInfo.skuImageList = this.checkImgList.map(item=>{
          return{
            imgName:item.imgName,
            imgUrl:item.imgUrl,
            isDefault:item.isDefault,
            spuImgId:item.id
          }
      })
     let result = await this.$API.spu.reqAddSku(skuInfo)
     if(result.code==200){
       this.$message.success('添加SKU成功')
       this.$emit('changeScene',0)
     }
    },
    
     // 取消按钮
    cancel() {
      this.$emit("changeScene",0);
      Object.assign(this._data,this.$options.data())
    },
  },
};
</script>

<style>
</style>