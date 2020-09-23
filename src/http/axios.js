import axios from 'axios';
import qs from 'qs';
import {Message} from 'element-ui'

axios.defaults.baseURL = 'http://134.175.100.63:5588/'
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use((config)=>{
	if(config.method == 'post'){
		config.data = qs.stringify(config.data,{arrayFormat:'repeat'});
	}
	return config;
})

axios.interceptors.response.use((res)=>{
	if(res.data.status === 200){
		
		return res
		
	}else{
		Message({
			message:res.data.message,
			type:"error"
		})
	}
})
export default axios;