// home模块的小仓库

import { reqCategoryList, reqGetBannerList } from '@/api';

const state = {
    // home仓库中存储三级菜单的数据
    categoryList: [],
}
const actions = {
    // 通过api里的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    }
}
const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
        console.log('data :>> ', categoryList);
    }
}
const getters = {}

export default {
    state, actions, mutations, getters
}