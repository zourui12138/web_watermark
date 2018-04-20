import axios from 'axios'
// 统一配置请求时间限制
axios.defaults.timeout = 4000;

// 文件打水印
export const watermark_create = (fileList,userCode,watermark) => {
    let form = new FormData();
    for(let i=0;i<fileList.length;i++){
        form.append('file',fileList[i].raw);
    }
    form.append('userCode',userCode);
    form.append('watermark',watermark);
    let config = {headers:{'Content-Type':'multipart/form-data'}};
    return axios.post('/mark/file',form,config);
};
// 查询水印任务进度
export const watermark_query = (taskIds) => axios.get('/status/file?taskIds='+taskIds);
// statistics页面柱状图接口
export const statistics_getChartBar = () => axios.get('/statistics/day');
// statistics 表头
export const statistics_getCount = () => axios.get('/statistics');
// statistics 表格
export const statistics_getTableData = (page,size,searchValue,start,end) => axios.get('/record?page='+page+'&size='+size+'&searchValue='+searchValue+'&start='+start+'&end='+end);
