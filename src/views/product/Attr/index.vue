<template>
  <div>
    <el-card style="margin: 20px 0"
      ><CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect
    ></el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="200"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 5px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加修改属性结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              style="width: 200px"
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
              @blur="isinput(attrInfo.attrName)"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            :disabled="!attrInfo.attrName"
            @click="addAttrValue"
            >添加属性值</el-button
          >
          <el-button @click="isShowTable = true">取消</el-button>
          <el-table
            :data="attrInfo.attrValueList"
            border
            style="width: 100%; margin: 20px 0"
          >
            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="80"
            >
            </el-table-column>
            <el-table-column prop="prop" label="属性值名称" width="width">
              <template slot-scope="{row}">
               <el-input v-if="row.flag" v-model="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="toLook(row)" @keyup.native.enter="toLook(row)" ref="input"></el-input>
               <span v-else @click="display(row)" style="display:block">{{row.valueName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row,$index}">
                <el-popconfirm :title="`确定要删除${row.valueName}吗？`" @onConfirm='deleteAttrValue($index)'>
                  <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
          <el-button @click="isShowTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],

      // 控制table显示隐藏
      isShowTable: true,

      // 收集添加属性信息
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], // 属性值
        categoryId: 0, //三级id
        categoryLevel: 3, //区分几级id
      },
    };
  },
  methods: {
    // 获取id回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    // 获取平台属性数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    addAttrValue(){
      let attrValue ={attrId:this.attrInfo.id,valueName:'',flag:true}
      this.attrInfo.attrValueList.push(attrValue)
      this.$nextTick(()=>{
        this.$refs.input.focus()
      })
    },
    // 添加属性
    addAttr(){
      this.isShowTable = false
      this.attrInfo ={
        attrName: "", //属性名
        attrValueList: [], // 属性值
        categoryId: this.category3Id, //三级id
        categoryLevel: 3, //区分几级id
      }
    },
    // 修改属性
    updateAttr(row){
      this.isShowTable =false
      this.attrInfo =cloneDeep(row)
      this.attrInfo.attrValueList.forEach(item=>{
        this.$set(item,'flag',false)
      })
    },
    // 属性值input失去焦点
    toLook(row){
      if(row.valueName.trim()==''){
      this.$message.error('属性值不能为空')
      return
      }
     let istrue = this.attrInfo.attrValueList.some(item=>{
        if(row!=item){
          return row.valueName.trim() == item.valueName.trim()
        }
      })
      if(istrue) return this.$message.error('属性值不能重复')
      row.flag =false
    },
    // 属性名input失去焦点
    isinput(value){
      if(!value.trim()){
        this.$message.error('属性名不能为空')
      }
    },
    // 获得焦点
    display(row){
      row.flag = true
      this.$nextTick(()=>{
        this.$refs.input.focus()
      })
    },
    // 删除属性值
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 添加属性或者修改属性点击保存
   async addOrUpdateAttr(){
     this.attrInfo.attrValueList= this.attrInfo.attrValueList.filter(item=>{
          if(item.valueName.trim()){
              delete item.flag
              return true
          }
      })
      try {
        this.isShowTable =true
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message.success('保存成功')
        this.getAttrList()
      } catch (error) {
        this.$message.error('保存失败')
      }
    },

  },
};
</script>

<style>
</style>