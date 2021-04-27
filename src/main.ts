import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Api from './http/api'
import { loadAllPlugins } from './plugins'
import * as directives from './directives'
import '@/assets/css/reset.css';
import '@/assets/css/common.scss';

import '@/assets/css/gua.scss';

// import virtualList from 'vue-virtual-scroll-list'

const app = createApp(App)


// app.use(virtualList)
app.provide('$api', Api)
app.config.globalProperties.$api = Api
// const $api :any = inject('$api')
// app.use(function (vue) { 
//   vue.config.globalProperties.$api = Api
// })

// app.config.globalProperties.$router = Router

// 加载所有插件
loadAllPlugins(app)

// 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string ]: Directive })[key])
})

app.use(store).use(router).mount('#app')
