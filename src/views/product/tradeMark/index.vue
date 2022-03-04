<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog">添加</el-button>

    <!-- 表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:90px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getPageList"
      style="margin-top:20px;textAlign:center"
      background
      :current-page="page"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total">
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog :title="tmFrom.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form style="width:80%" :model="tmFrom" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 当前页
      page:1,
      // 显示几页
      limit:3,
      // 全部
      total:0,
      // 数据
      list:[],
      // 对话框显示隐藏
      dialogFormVisible:false,
      // 收集品牌信息
      tmFrom:{
        tmName:'',
        logoUrl:''
      },
      // 表单验证规则
      rules:{
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
          logoUrl: [
            { required: true, message: '请选择品牌图片'}
          ],
      }
    }
  },

  mounted(){
    this.getPageList()
  },
  
  methods:{
   async getPageList(page = 1){
    this.page =page
    let result = await this.$API.tradeMark.reqTradeMark(this.page,this.limit)
    if(result.code==200){
      this.total =result.data.total
      this.list =result.data.records
    }
    },

    handleSizeChange(size){
      this.limit =size
      this.getPageList()
    },
    // 添加
    showDialog(){
      this.dialogFormVisible=true
      this.tmFrom ={tmName:'',logoUrl:''}
    },
    // 修改
    updateTradeMark(row){
      this.dialogFormVisible=true
      this.tmFrom ={...row}
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
     this.tmFrom.logoUrl =res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    // 点击确定按钮添加或修改
    addOrUpdateTradeMark(){
     this.$refs.ruleForm.validate(async(valid)=>{
       if(valid){
            this.dialogFormVisible = false
            let result = await this.$API.tradeMark.reqAddorUpdateTradeMark(this.tmFrom)
            if(result.code==200){
               //  弹出消息
                this.$message({
                type:'success',
                message:this.tmFrom.id? '修改品牌成功':'添加品牌成功'
              })
              //  再获取更新信息列表
              this.getPageList(this.tmFrom.id?this.page:1)
            }
       }else{
          console.log('error submit!!');
          return false;
       }
     })
    
    },
    // 删除
    deleteTradeMark(row){
      this.$confirm('此操作将删除品牌信息'+row.tmName+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(async() => {
        let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id)
          if(result.code==200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPageList(this.list.length>1?this.page:this.page-1)
          }
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>