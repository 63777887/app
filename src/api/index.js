// 接口统一管理
import requests from "@/api/request";

// 三级联动接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

export const getBaseCategoryList = ()=>{
    // 发请求: axios返回结果Promise对象
    return requests({url: '/product/getBaseCategoryList',method: 'get'})
}