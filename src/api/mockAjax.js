// api这个文件夹专门用来存储

// 对axios进行二次封装--需要用到axios的请求和响应器
import axios from "axios";

// 引入进度条
import nprogress from "nprogress";
// start方法：进度条开始，done方法：进度条结束
// 引入进度条样式
import "nprogress/nprogress.css"

// request即为一个axios实例
const requests = axios.create({
    // 因为接口都是以api开头的，所以加上这句后每次调用的时候就可以少写'api/'(不用自己手动去写)
    baseURL: 'mock',
    timeout: 5000,   // 请求超过5s没反应就算超时
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出前做一些事情
requests.interceptors.request.use((config) => {
    // 进度条开始动
    nprogress.start();
    // config:配置对象，存在一个重要属性，请求头header
    return config;
})

// 响应拦截器，需要传成功和失败的回调
requests.interceptors.response.use(res => {
    // 进度条结束
    nprogress.done();
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做些事情
    return res.data
}, err => {
    return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests;