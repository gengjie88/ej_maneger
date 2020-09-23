<template>
  <div>
    <el-button type="success" size="small" @click="addUser">新增</el-button>
    <el-input v-model="list.status" clearable placeholder="请输入类型" style="width:60px,height:30px,display:inline-block"></el-input>
    <!-- {{customers}} -->
    <el-button @click="search">查询</el-button>
    <el-table :data="customers" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="realname" label="真实姓名" width="180"></el-table-column>
      <el-table-column prop="telephone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column flex="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="mini" type="text">修改</el-button>
          <el-button @click="del(scope.row.id)" size="mini" type="text" >删除</el-button>
          <el-button @click="details(scope.row.id)" size="mini" type="text">详情</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total" @current-change="changPage"></el-pagination>
    <!-- :page-sizes="this.list.pageSize" -->
  

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择用户状态">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
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
      dialogFormVisible: false,
      form: [],
	  title: "",
	  
    };
  },
  created() {
    // this.findAll();
    this.queryCustomer(this.list);
  },
  computed: {
    ...mapState("customer", ["customers", "total"]),
  },
  methods: {
    ...mapActions("customer", [
      "findAll",
      "queryCustomer",
      "saveCustomer",
      "delCustomerById",
    ]),
    changPage(page) {
      this.list.page = page + 1;
      this.queryCustomer(this.list);
      // console.log(this.list)
    },
    addUser() {
      this.title = "添加顾客";
      this.dialogFormVisible = true;
      this.form = {};
    },
    submit(form) {
      this.saveCustomer(this.form);
    //   console.log(this.form);
      // this.dialogFormVisible = false;
    },
    del(id) {
    //console.log(id)
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delCustomerById(id);
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
    edit(row) {
       this.title = "修改顾客信息"
      this.dialogFormVisible = true;
	  this.form = row;
	//   this.saveCustomer(this.form)
    },
    search(){
      this.queryCustomer(this.list)
    },
    details(id){
      this.$router.push({name:"details",params:{id:id}})
    }
  },
};
</script>
<style scoped>
</style>
