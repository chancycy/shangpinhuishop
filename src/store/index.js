import Vue from 'vue';
import Vuex from 'vuex';
// 使用一次
Vue.use(Vuex);

// 引入小仓库
import home from './home';
import search from './search';

// 对外暴露store类的一个实例
export default new Vuex.Store({
    // 下面这行代码实现vuex仓库模块化开发存储
    modules: {
        home, search,
    },
})