<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in traderMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="imageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSaleAttrList.length}个属性未选择`" v-model="attr">
          <el-option
            :label="sale.name"
            :value='`${sale.id}:${sale.name}`'
            v-for="sale in unSaleAttrList"
            :key="sale.id"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled='!attr' @click="addSaleAttr">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column width="80" align="center" type="index" label="序号">
          </el-table-column>
          <el-table-column width="150" prop="saleAttrName" label="属性名">
          </el-table-column>
          <el-table-column width="width" prop="prop" label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.native.enter="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column width="150" prop="prop" label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuFrom",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      attr:'',//收集未选择的销售属性
      //spu信息属性收集
      spu: {
        category3Id: 0,
        spuName: "",
        // 品牌id
        tmId: '',
        // 描述
        description: "",
        // 图片
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        // 属性与属性值
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "",
          //       saleAttrName: "",
          //       saleAttrValueName: "",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      traderMarkList: [], //品牌信息
      imageList: [], //图片收集
      SaleAttrList: [], //销售属性
    };
  },
  computed:{
    unSaleAttrList(){
     return this.SaleAttrList.filter(item=>{
       return this.spu.spuSaleAttrList.every(item2=>{
           return item.name != item2.saleAttrName
          })
      })
      
    }
  },

  methods: {
    handleRemove(file, fileList) {
      this.imageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 属性值input获得焦点
    showInput(row) {
        this.$set(row,'inputVisible',true)
        this.$set(row,'inputValue','')
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    // 属性值input失去焦点
    handleInputConfirm(row) {
      const {baseSaleAttrId,inputValue} =row
        // let inputValue = row.inputValue;
        // if (inputValue) {
        //   this.dynamicTags.push(inputValue);
        // }
        if(!inputValue.trim())return this.$message.error('属性值不能为空')
       let result = row.spuSaleAttrValueList.some(item=>item.saleAttrValueName==inputValue.trim())
       if(result) return this.$message.error('属性值不能重复')
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      row.inputValue =''
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false;
      
    },
      // 初始化spufrom数据
    async initSpuData(spu) {
      // 获取spu信息
      let result = await this.$API.spu.reqSpu(spu.id);
      if (result.code == 200) {
        this.spu = result.data;
      }
      // 获取品牌信息
      let traderMarkResult = await this.$API.spu.reqTraderMarkList();
      if (traderMarkResult.code == 200) {
        this.traderMarkList = traderMarkResult.data;
      }
      // 获取图片
      let imageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (imageResult.code == 200) {
        let imglist = imageResult.data;
        imglist.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.imageList = imglist;
      }
      // 获取销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.SaleAttrList = saleResult.data;
      }
    },
    // 照片上传成功回调
    handlerSuccess(response, file, fileList){
        this.imageList = fileList
    },
    // 添加销售属性
    addSaleAttr(){
     const [baseSaleAttrId,saleAttrName] = this.attr.split(':')
    let newSaleAttr ={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
    this.spu.spuSaleAttrList.push(newSaleAttr)
    this.attr = ''
    },
    // 保存按钮添加or修改
   async addOrUpdateSpu(){
     this.spu.spuImageList = this.imageList.map(item=>{
        return{
          imgName:item.name,
          imgUrl:(item.response&&item.response.data)||item.url
        }
      }) 
     let result = await this.$API.spu.reqAddOrUPdateSpu(this.spu)
     if(result.code==200){
       this.$message.success('spu保存成功')
       this.$emit('changeScene',{scene:0,flag:this.spu.id ? '修改':'保存'}) 
     }
     Object.assign(this._data,this.$options.data())
    },
    // 点击取消按钮
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})
      Object.assign(this._data,this.$options.data())
    },
    // 父组件添加spu
   async addSpu(category3Id){
     this.spu.category3Id = category3Id
      // 获取品牌信息
      let traderMarkResult = await this.$API.spu.reqTraderMarkList();
      if (traderMarkResult.code == 200) {
        this.traderMarkList = traderMarkResult.data;
      }
       // 获取销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.SaleAttrList = saleResult.data;
      }
    }
  },
};
</script>

<style>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>