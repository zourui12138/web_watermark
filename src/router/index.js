import Vue from 'vue'
import Router from 'vue-router'
// 创建水印任务
import Watermark from '~/modules/watermark'
// 水印溯源
import GetSource from '~/modules/getSource'
// 水印任务统计
import Statistics from '~/modules/statistics'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: 'watermark'
        },
        {
            path: '/watermark',
            name: 'watermark',
            component: Watermark
        },
        {
            path: '/getSource',
            name: 'getSource',
            component: GetSource
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: Statistics
        }
    ]
})
