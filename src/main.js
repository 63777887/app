import { createApp } from 'vue'
import App from './App.vue'
// 涌入路由
import router from "@/router";
// 引用仓库
import store from "@/store";
// 注册三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import {getBaseCategoryList} from "@/api";

getBaseCategoryList();

const app = createApp(App);
// 注册路由信息
app.use(router);
// 注册仓库
app.use(store);
// 注册全局主键
app.component(TypeNav.name,TypeNav);
app.mount('#app');
// new Vue({
//     render: h => h(App)
// }).$mount('#app')
