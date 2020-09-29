import {Message} from 'element-ui'
import axios from '@/http/axios'


export default{
    namespaced:true,

    state:{
        categroys:[],
        total:null
    },

    mutations:{
        CAT(state,categroys){
            state.categroys = categroys
        },
        SET_TOTAL(state,total){
            state.total = total
        }
    },

    actions:{
        queryCat(content,data){
            axios.post("/category/query",data).then(res=>{
                content.commit("CAT",res.data.data.list)
                content.commit("SET_TOTAL",res.data.total)

            })
        },
        saveCat({dispatch},data){
            axios.post("/category/saveOrUpdate",data).then(res=>{
                if(res.data.status == 200){
                    alert("更新成功")
                    dispatch("queryCat",{page:0,pageSize:3})
                }
            })
        },
        delById({dispatch},id){
            axios.get("/category/deleteById?id="+id).then(res=>{
                Message({
                    message:res.data.message,
                    type:"success"
                })
                dispatch("queryCat",{page:0,pageSize:3})
            })
        },
        delAllCat({dispatch},ids){
            axios.post("")
        }
    },
}