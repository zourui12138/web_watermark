// 作者：小丶张学友
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 修改element-ui插件的主题
import './element-variables.scss'
Vue.use(ElementUI);

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// 引入时间解析器moment
import moment from 'moment'
Vue.filter('dataFormat', function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

Vue.directive('scroll', {
    // 当组件完成一次更新时调用 还有其它的钩子函数 自行选择合适的
    componentUpdated:  (el) => {el.scrollTop = 0;}
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
