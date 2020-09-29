// 在Vuex中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/http/axios'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  state: {
    customers:[],
    total:null,
    customer:"",
  },
  mutations: {
    SET_CUSTOMERS(state,customers){
      state.customers = customers;
    },
    SET_TOTAL(state,total){
      state.total = total
    },
    SET_CUSETOMER(state,customer){
      state.customer = customer;

    }
  },
  actions: {
    findAll(content){
      axios.get("/customer/findAll").then(res=>{
        content.commit("SET_CUSTOMERS",res.data.data)
      })
    },
    queryCustomer(content,data){
      // data = {
      //   page :1,
      //   pageSize :10
      // }
      axios.post("/customer/query",data).then(res=>{
       content.commit("SET_CUSTOMERS",res.data.data.list)
        content.commit("SET_TOTAL",res.data.total)
      })
    },
    saveCustomer({dispatch},data){
      axios.post("/customer/saveOrUpdate",data).then(res=>{
        if(res.data.status == 200 ){
          alert("更新成功")
          dispatch("queryCustomer",{page:0,pageSize:3})
        }
        

      })
    },
    delCustomerById({dispatch},id){
      
        axios.get("/customer/deleteById?id="+id).then(res=>{
          if(res.data.status == 200 ){
            alert("删除成功")
            dispatch("queryCustomer",{page:0,pageSize:3})
          }else{
            alert(res.data.message)
          }
        })
    },
    findCustomerById({commit},id){
        axios.get("/customer/findCustomerById?id="+id).then(res=>{
          commit("SET_CUSETOMER",res.data.data)
        })
    }
  },
  
}