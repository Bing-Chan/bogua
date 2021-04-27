import axios from './index'
import qs from 'qs'
import { RootObject, ModuleList } from '@/model/httpObject'
import { ContentType, Method } from 'axios-mapper'

const base = {
	md: '/bisapi',
	td: '/lsapi',
	nm: '/deoapi/PublicMNRecord',
	hs: '/basapi'
// }	
}	

const module = {
	getModule: (params: any) => {
		return axios.get(`${base.md}/Module/GetModule`,  {params})
	}
}


export default { module }