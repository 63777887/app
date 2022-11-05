import {createStore} from 'vuex'


// 对外暴露store类的实例

// state: 仓库存储数据的地方
const state= {
}
// mutations: 修改state的唯一手段
const mutations= {
}
// action: 处理action,可以书写自己的业务逻辑,可以处理异步
const action= {
    // 这里可以书写业务逻辑,但是不能修改state

}
// getters: 理解为计算属性,用于简化仓库数据,让组件获取仓库数据更加方便
const getters= {}

import home from "@/store/home";
import search from "@/store/search";

export default createStore({
    // vuex仓库模块式开发
    modules: {
        home,
        search
    }
})
