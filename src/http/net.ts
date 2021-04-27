import { Headers, NetworkConfig } from '@/model/netObject'
import { ContentType, InfoShowType } from './config'

const _header: Headers = {
  token: '',
  contentType: ContentType.JSON,
}
  
const networkConfig: NetworkConfig = {
  host: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  loading: false,
  errorShowType: InfoShowType.TOAST,
  header: _header
}
export default networkConfig