import Vue from 'vue';
import Vuex from 'vuex';
// 使用一次
Vue.use(Vuex);

const state = {
    count: 1
};
// 修改state的唯一手段
const mutations = {
    ADD_COUNT(state) {
        state.count++
    }
};
// 书写业务逻辑，也可以处理异步
const actions = {
    // 可以写业务逻辑但不能修改state
    addCount({ commit }) {
        commit("ADD_COUNT")
    }
};
// 相当于vuex的对state的计算属性
const getters = {};

// 对外暴露store类的一个实例
export default new Vuex.Store({
    state, mutations, actions, getters
})