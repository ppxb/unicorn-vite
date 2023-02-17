import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { elementPlus } from '@/plugins/element-plus'
import 'uno.css'
import './index.less'

const app = createApp(App)

app.use(router)
app.use(elementPlus)

app.mount('#app')
