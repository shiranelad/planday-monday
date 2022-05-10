import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus, { ElIcon } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// todo: import scss
// import './styles/styles.css'
import './scss/styles.scss'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
// app.use(ElementUI)

app.use(store)
app.mount('#app')
