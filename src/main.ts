import { createApp } from 'vue'
import { elementPlus } from '@/plugins/element-plus'
import router from './router'
import store from './store'
import App from './App.vue'

import 'uno.css'
import './index.less'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(elementPlus)

app.mount('#app')
