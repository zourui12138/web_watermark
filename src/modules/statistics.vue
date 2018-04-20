<template>
    <div>
        <el-row class="count" :gutter="30">
            <el-col :span="7">
                <div class="countBox">
                    <header>处理水印文件</header>
                    <section class="clear">
                        <img class="fl" src="../assets/img/file.png" alt="">
                        <div class="fl">
                            <h1><span>{{countData.total}}</span><strong></strong></h1>
                            <h2>总文件数</h2>
                        </div>
                    </section>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="countBox">
                    <header>处理水印数据量</header>
                    <section class="clear">
                        <img class="fl" src="../assets/img/data.png" alt="">
                        <div class="fl">
                            <h1><span>{{countData.audioSize+countData.pictureSize}}</span><strong>GB</strong></h1>
                            <h2>总文件数</h2>
                        </div>
                    </section>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="countBox">
                    <header>处理数据类型占比</header>
                    <section class="clear">
                        <img class="fl" src="../assets/img/dataPercent.png" alt="">
                        <div class="fl">
                            <h1><span>{{countData.pictureSize}}</span><strong>GB</strong><s>/</s><span>{{countData.audioSize}}</span><strong>GB</strong></h1>
                            <h2>图片/音频</h2>
                        </div>
                        <div class="fr percent"><h3 :style="`width:${Proportion}%`"></h3></div>
                    </section>
                </div>
            </el-col>
        </el-row>
        <div class="whiteBg">
            <header class="title">每日处理量</header>
            <section class="chartBar" ref="bar"></section>
        </div>
        <div class="whiteBg">
            <header class="title">水印文件调用记录</header>
            <div class="tableList">
                <div class="search">
                    <el-input class="callFile" placeholder="请输入内容" v-model="searchValue" size="small"><template slot="prepend">调用文件</template></el-input>
                    <el-date-picker
                        class="dataPicker"
                        v-model="picker"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
                </div>
                <el-table
                    :data="tableData"
                    :header-cell-style="{backgroundColor:'#edeef2'}"
                    style="width: 100%">
                    <el-table-column prop="id" label="序号" width="180"></el-table-column>
                    <el-table-column prop="time" label="调用时间"></el-table-column>
                    <el-table-column prop="fileName" label="调用文件"></el-table-column>
                    <el-table-column prop="localFile" label="本地路径"></el-table-column>
                    <el-table-column prop="user" label="调用应用" width="100"></el-table-column>
                </el-table>
                <el-pagination
                    class="page"
                    background
                    layout="prev, pager, next"
                    :total="totalElements"
                    :page-size="pageSize"
                    @current-change="getTableData">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { statistics_getChartBar, statistics_getCount, statistics_getTableData } from '~/api/getData'

    export default {
        name: "statistics",
        data() {
            return{
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                picker: null,
                tableData: [],
                pageSize: 5,
                totalElements: null,
                countData: {},
                Proportion: null,
                searchValue: '',
                start: '',
                end: ''
            }
        },
        methods: {
            chartBar(data) {
                let x = [],y_audio = [], y_picture = [];
                for(let i=0;i<data.length;i++){
                    x.push(data[i].date);
                    y_audio.push(data[i].countAudio);
                    y_picture.push(data[i].countPicture);
                }
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.bar);
                // 图表配置项
                let option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        top: 16,
                        data:['图片','音频']
                    },
                    toolbox: {
                        show : false
                    },
                    calculable : true,
                    color: ['#23c6c8','#5a8bff'],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : x
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'图片',
                            type:'bar',
                            data:y_picture,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'音频',
                            type:'bar',
                            data:y_audio,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            async getChartBar() {
                let data = await statistics_getChartBar();
                this.chartBar(data.data.data.reverse());
            },
            async getCount() {
                let data = await statistics_getCount();
                this.countData = data.data.data;
                this.Proportion = parseFloat((data.data.data.pictureSize/(data.data.data.pictureSize+data.data.data.audioSize)).toFixed(2))*100;
            },
            async getTableData(page) {
                let data = await statistics_getTableData(page,this.pageSize,this.searchValue,this.start,this.end);
                this.tableData = data.data.data.content;
                this.totalElements = data.data.data.totalElements;
            },
            search() {
                this.start = this.picker ? this.picker[0] : '';
                this.end = this.picker ? this.picker[1] : '';
                this.getTableData(1);
            }
        },
        mounted() {
            this.getTableData(1);
            this.getChartBar();
            this.getCount();
        }
    }
</script>

<style lang="scss" scoped>
    .count{
        margin-bottom: 20px;
        .countBox{
            background-color: #fff;
            header{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #edeef2;
                padding-left: 20px;
            }
            section{
                padding: 18px 40px 24px;
                img{
                    margin-right: 40px;
                }
                h1{
                    height: 30px;
                    line-height: 30px;
                    font-size: 24px;
                    strong{
                        font-weight: normal;
                        font-size: 16px;
                        margin-left: 10px;
                    }
                    s{
                        margin:0 10px;
                        text-decoration: none;
                    }
                }
                h2{
                    font-size: 12px;
                    height: 16px;
                    line-height: 16px;
                }
                .percent{
                    height: 12px;
                    width: 230px;
                    margin-top: 34px;
                    background-color: #5a8bff;
                    border-radius: 4px;
                    overflow: hidden;
                    h3{
                        height: 12px;
                        background-color: #23c6c8;
                        width: 0;
                    }
                }
            }
        }
    }
    .chartBar{
        height: 274px;
    }
    .tableList{
        padding: 0 20px;
        .search{
            height: 32px;
            padding-top: 15px;
            padding-bottom: 43px;
            .callFile{
                width: 350px;
            }
            .dataPicker{
                vertical-align: top;
                margin: 0 30px;
            }
        }
        .page{
            padding: 20px 0;
            text-align: right;
        }
    }
</style>
