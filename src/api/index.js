// 对api进行统一管理
// 接口：http://gmall-h5-api.atguigu.cn

import requests from "./ajax";

// 三级联动接口 /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => {
    // 发请求 axios发请求会返回Promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

// mock数据接口
// requests引入的接口是'/api/'开头的,我们得引入'/mock'开头的mockRequests
import mockRequests from "./mockAjax";

// 获取banner（home首页轮播图的数据）
export const reqGetBannerList = () => mockRequests.get('/banner')
