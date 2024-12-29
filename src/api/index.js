// 对api进行统一管理
// 接口：http://gmall-h5-api.atguigu.cn

import requests from "./ajax";

// 三级联动接口 /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => {
    // 发请求 axios发请求会返回Promise对象
    return requests({
        url: '/api/product/getBaseCategoryList',
        method: 'get',
    })
}
