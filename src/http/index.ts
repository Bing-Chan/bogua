// import { useStore } from '@/store'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import networkConfig from './net'


const showTip: any = (message: any, type: any): void => {
	ElMessage({
    message: message,
    type: type || 'warning'
  });
}
const toLogin: any = () => {
	router.replace({
		path: '/login'
		// query: {redirect: router.currentRoute.fullPath}
	});
};

const codeHandle = (status: number, message: string): void => {
	switch (status) {
		case 401:
			toLogin();
			break;
		case 403:
			showTip(message || '登录过期，请重新登录')
			setTimeout(() => {
				toLogin();
			}, 1000);
			break;
		case 404:
			showTip(message || '请求资源不存在')
			break;
		default:
			showTip(message || '未知问题', 'error')
	}
};

const HTTP: any = axios.create({
	baseURL: networkConfig.host,
	// baseURL: '/',
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json'
	},
	// withCredentials: true
})

HTTP.interceptors.request.use(
	(config: any) => {
		// if (config.method === 'post') {
		// 	if (typeof config.data === 'object') {
		// 		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		// 	} 
		// 	if (typeof config.data === 'string') {
		// 		config.headers.post['Content-Type'] = 'multipart/form-data';
		// 	}
		// }
    
		return config
	},
	(error: any) => {
		Promise.reject(error)
	}
)

HTTP.interceptors.response.use(
	(response: any) => {
		if (response.status === 200){
			// const data: string = JSON.stringify(response.data);
      // return Convert.jsonToModel(data);
			return response.data
		} else {
			codeHandle(response.status, response.data.message);
		} 
	},
	(error: any) => {
		const { response } = error;
		if (response) {
			codeHandle(response.status, response.data.message);
		} else {
			// store.commit('changeNetWork', false);
		}
		return error
	}
)

export default HTTP