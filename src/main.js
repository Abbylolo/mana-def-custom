import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

// 创建 axios 实例
const requests = axios.create({
  baseURL: 'http://10.253.44.95:8041/',
  // baseURL: 'http://192.168.43.64:8041/',
  timeout: 6000 // 请求超时时间
})
const app = createApp(App).use(router).use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')
app.config.globalProperties.$api = requests
