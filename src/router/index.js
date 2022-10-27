// 配置路由的地方
import {createRouter, createWebHistory} from 'vue-router';

//引入路由组件
import Home from "@/views/Home";
import Search from "@/views/Search";
import Register from "@/views/Register";
import Login from "@/views/Login";


const routerHistory = createWebHistory()

// $route: 一般获取路由信息【路径，query，params等】
// $router: 一般进行编程式导航进行路由跳转【push｜replace】

const routes = [
//    配置路由
    {
        path: "/home",
        component: Home,
        // meta: 元信息属性
        // 设置变量show: 控制是否展示该路由组件
        meta: {show:true}
    },
    {
        path: "/search/:keyword",
        component: Search,
        meta: {show:true},
        name: 'search'
    },
    {
        path: "/register",
        component: Register,
        meta: {show:false}
    },
    {
        path: "/login",
        component: Login,
        meta: {show:false}
    },
    {
        // 匹配所有路径 vue2使用*   vue3使用/:pathMatch(.*)* 或/:pathMatch(.*)或/:catchAll(.*)
        path: "/:pathMatch(.*)",
        redirect: '/home'
    }
]
const router = createRouter({
    history: routerHistory,
    routes
})

export default router
