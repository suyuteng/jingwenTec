// 通过mockjs 模块引入假数据
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

// 第一个参数是请求地址 第二个是请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
