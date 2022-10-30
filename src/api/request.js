// axios 二次封装
import axios from "axios";
import nprogress from "nprogress"
import "nprogress/nprogress.css"

// 1. 利用axios对象的方法create，去创建一个axios实例
const  requests = axios.create({
    // 配置对象
    // 基础路径: /user => /api/user
    baseURL: "/api",
    // 请求超时时间: 5s
    timeout: 5000,
});

// 请求拦截器: 请求之前,做额外操作
requests.interceptors.request.use((config)=>{
    // config: 配置对象,请求里面有一个属性很重要,header请求头
    nprogress.start();
    return config;
})

// 响应拦截器: 请求之后,做额外操作
requests.interceptors.response.use((res)=>{
    // 成功的回调函数
    nprogress.done();
    return res;
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error("fail"));
});


// 对外暴露
export default requests;