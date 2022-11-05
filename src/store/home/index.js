import {getBaseCategoryList} from "@/api";
// home 仓库
const state = {
    // 初始值为[]
    categoryList: [],
};
const mutations = {
    CategoryList(state,categoryList){
        state.categoryList = categoryList
    }
};
const actions = {
    // 通过api接口函数调用，从服务器获取数据
    async categoryList({commit}){
        let result = await getBaseCategoryList();
        console.log(result)
        if (result.status==200){
            commit("CategoryList",result.data.data)
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}