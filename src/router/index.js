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
        // ? 表示keyword 可传可不传，适应路由匹配
        path: "/search/:keyword?",
        component: Search,
        meta: {show:true},
        name: 'search',
        // 路由组件传递props参数
        // 1. ture: 开启组件接收params->props参数
        // props: true
        // 2. 传递对象参数
        // props: {a:1,b:2},
        // 3. 函数形式
        props: ($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
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

// let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 解决多次重复调用警告，Vue3已修复该问题，无需重写
// 第一个参数： 跳转地址，参数等
// 第二个参数： 成功的回调
// 第三个参数： 失败的回调
// call和apply区别
// 相同点: 都可以调用函数一次,都可以篡改函数的上下文
// 不同点: call和apply传递参数, call传递参数用逗号隔开,apply传递数组

// 这里用的vue3,无需重写该方法

// VueRouter.prototype.push = function (location,resolve,reject){
//     if (resolve&&reject){
//         // 正常调用
//         originPush.call(this,location,resolve,reject);
//     }else {
//         // 重写成功和拒绝回调，不做任何操作
//         originPush.call(this,location,resolve,reject,()=>{},()=>{});
//     }
// }
//
// VueRouter.prototype.replace = function (location,resolve,reject){
//     if (resolve&&reject){
//         // 正常调用
//         originPush.call(this,location,resolve,reject);
//     }else {
//         // 重写成功和拒绝回调，不做任何操作
//         originPush.call(this,location,resolve,reject,()=>{},()=>{});
//     }
// }


export default router
