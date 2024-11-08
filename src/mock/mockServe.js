// 引入mockjs模块（这里Mock是个对象
import Mock from 'mockjs';
// 引入json数据
// （图片和json数据是默认暴露的 所以在floor.json文件里无需export）
import banner from './banner.json'
import floor from './floor.json'

// Mock对象的mock方法 参数1:请求地址 参数2：请求数据
Mock.mock('mock/banner', { code: 200, data: banner }) // 模拟首页轮播图数据
Mock.mock("mock/floor", { code: 200, data: floor })
