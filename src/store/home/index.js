// home模块的小仓库

import { reqCategoryList, reqGetBannerList } from '@/api';

const state = {
    categoryList: [],
}
const actions = {
    // 通过api里的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let { data } = await reqCategoryList()
        // 我这里直接默认请求成功哈
        commit("CATEGORYLIST", data)
    }
}
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data
        console.log('data :>> ', data);
    }
}
const getters = {}

export default {
    state, actions, mutations, getters
}