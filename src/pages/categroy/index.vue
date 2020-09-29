<template>
  <div>
    <el-button type="success" size="small" @click="addCat">添加栏目</el-button>
    <el-button type="error" size="small" @click="delCat">批量删除</el-button>
    <el-table :data="categroys" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="" width="180">
        <template slot-scope="scope">
  <!-- `checked` 为 true 或 false -->
  <el-checkbox v-model="checked" :label="scope.row.id"></el-checkbox>
</template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="num" label="序号" width="180"></el-table-column>
      <el-table-column label="图片" width="180" >
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt />
        </template>
      </el-table-column>
      <el-table-column flex="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="mini" type="text">修改</el-button>
          <el-button @click="del(scope.row.id)" size="mini" type="text">删除</el-button>
          <el-button @click="details(scope.row.id)" size="mini" type="text">详情</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="changPage"></el-pagination>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="栏目名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="序号" :label-width="formLabelWidth">
      <el-input v-model="form.num" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="图片" :label-width="formLabelWidth">
       <el-upload
  class="upload-demo"
  action="http://134.175.100.63:5588/file/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false" v-on:click="submit()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      list: {
        page: 0,
        pageSize: 3,
      },
      dialogFormVisible:false,
      form:[],
      title:"",
      label:[],
    };
  },

  computed: {
    ...mapState("categroy", ["categroys", "total"]),
  },
  created() {
    this.queryCat(this.list);
    console.log(this.label)
  },
  methods: {
    ...mapActions("categroy", ["queryCat","saveCat","delById","edit","delAllCat"]),

  changPage(page) {
    console.log(page);
    this.list.page = page + 1;
    this.queryCat(this.list);
    // console.log(this.list)
  },
  addCat(){
    this.title = "新增栏目"
    this.dialogFormVisible = true;
      this.form = {};

  },
  submit(form){
    this.saveCat(this.form)
  },
  del(id){
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delById(id)
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    
  },
  edit(row){
    this.title = "修改栏目信息"
    this.dialogFormVisible = true;
    this.form = row;
  },
  delCat(ids){
    this.delAllCat(ids)
  }
  // details(id){
  //     this.$router.push({name:"details",params:{id:id}})
  // }

  },
  
 
};
</script>
<style scoped>
 td img{
  height: 180px;
  width: 180px;
  background-size: 100%;
}
</style>