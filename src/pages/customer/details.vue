<template>
  <div class="details">
    <el-link type="primary" @click="backHandler">返回</el-link>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
          <div>
              用户名：{{this.customer.username}}
          </div>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="second">订单信息</el-tab-pane>
      <el-tab-pane label="订单地址" name="third">订单地址</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
        activeName:"first",
        
    };
  },
  created() {
      this.findCustomerById(this.$route.params.id)
  },
  computed: {
    ...mapState("customer", ["customer"]),
  },
  methods: {
    ...mapActions("customer", ["findCustomerById"]),
    backHandler() {
      this.$router.push({ name: "customer" });
    },
  },
};
</script>