<template>
  <div>
    <el-button type="success" size="small" @click="addCat">添加栏目</el-button>
    <el-table :data="categroys" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="num" label="序号"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt />
        </template>
      </el-table-column>
      <el-table-column flex="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="mini" type="text">修改</el-button>
          <el-button @click="del(scope.row.id)" size="mini" type="text">删除</el-button>
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
      <el-input v-model="form.icon" autocomplete="off"></el-input>
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
        pageSize: 5,
      },
      dialogFormVisible:false,
      form:[],
      title:"",
      
    };
  },

  computed: {
    ...mapState("categroy", ["categroys", "total"]),
  },
  created() {
    this.queryCat(this.list);
  },
  methods: {
    ...mapActions("categroy", ["queryCat","saveCat"]),

  changPage(page) {
    console.log(page);
    this.list.page = page + 1;
    this.queryCat(this.list);
    // console.log(this.list)
  },
  addCat(){
    this.title = "新增栏目"
    this.dialogFormVisible = true;
  },
  submit(form){
    this.saveCat(this.form)
  }

  },
  
 
};
</script>
<style scoped>
</style>