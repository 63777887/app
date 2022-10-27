import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";

const app = createApp(App)
// 注册路由信息
app.use(router)
app.mount('#app')
// new Vue({
//     render: h => h(App)
// }).$mount('#app')
