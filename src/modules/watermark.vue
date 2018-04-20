<template>
    <div>
        <header class="header">
            <el-steps :active="step" align-center>
                <el-step title="选择文件"></el-step>
                <el-step title="配置水印"></el-step>
                <el-step title="创建任务"></el-step>
            </el-steps>
        </header>
        <section class="section">
            <div v-show="step_one" class="whiteBg">
                <Upload
                    uploadType="上传"
                    :isAuto="false"
                    ref="uploadDOM"
                    uploadUrl="/mark/file"
                    @watchStepOneDis="getStepOneDis"/>
                <footer><el-button type="primary" :disabled="stepOneDis" @click="toStepTwo">下一步</el-button></footer>
            </div>
            <div v-show="step_two">
                <div class="whiteBg">
                    <header class="title">配置水印信息</header>
                    <div class="configBox">
                        <span class="fl">水印信息：</span>
                        <el-input size="medium" placeholder="请输入水印信息" v-model="watermarkMsg"></el-input>
                    </div>
                </div>
                <div class="whiteBg">
                    <header class="title">水印文件输出配置</header>
                    <div class="configBox">
                        <span class="fl">阿里云OSS BUCKET名：</span>
                        <el-input size="medium" placeholder="请输入阿里云OSS BUCKET"></el-input>
                    </div>
                    <div class="configBox">
                        <span class="fl">回传路径名：</span>
                        <el-input size="medium" placeholder="请输入回传路径"></el-input>
                    </div>
                    <footer>
                        <el-button type="primary" @click="backStepOne">上一步</el-button>
                        <el-button type="primary" :disabled="stepTwoDis" @click="toStepThree">下一步</el-button>
                    </footer>
                </div>
            </div>
            <div v-show="step_three" class="whiteBg created">
                <div class="createdImg"><img src="../assets/img/success.png" alt=""></div>
                <p>水印处理已完成，请在<span>[回传路径]</span>中查看</p>
                <el-progress
                    class="createdProgress"
                    :text-inside="true"
                    :stroke-width="30"
                    :percentage="progress"
                    color="#23c6c8">
                </el-progress>
                <footer><el-button type="primary" :disabled="progress !== 100" @click="successBackStepOne">确认</el-button></footer>
            </div>
        </section>
    </div>
</template>

<script>
    import Upload from '~/components/upload'
    import { watermark_create } from '~/api/getData'
    import { watermark_query } from '~/api/getData'

    export default {
        name: "watermark",
        components: {Upload},
        data() {
            return{
                watermarkMsg: null,
                step_one: true,
                step_two: false,
                step_three: false,
                taskIdArr: null,
                stepOneDis: true,
                progress: 0,
                step: 1
            }
        },
        computed: {
            stepTwoDis() {
                return !this.watermarkMsg
            }
        },
        methods: {
            // 监听是否含有文件--能否到配置水印页面
            getStepOneDis(data) {
                this.stepOneDis = data;
            },
            // 前往配置水印
            toStepTwo() {
                this.step_one = false;
                this.step_two = true;
                this.step_three = false;
                this.step = 2;
            },
            // 返回选择文件
            backStepOne() {
                this.step_one = true;
                this.step_two = false;
                this.step_three = false;
                this.watermarkMsg = null;
                this.step = 1;
            },
            // 创建水印任务
            async toStepThree() {
                let data = await watermark_create(this.$refs.uploadDOM.tableData,'001',this.watermarkMsg);
                if(data.data.message === 'SUCCESS'){
                    this.step_one = false;
                    this.step_two = false;
                    this.step_three = true;
                    this.step = 3;
                    this.timer = setInterval(() => {
                        this.queryTaskProgress(data.data.data);
                    },1000);
                }
            },
            // 查询水印任务进度
            async queryTaskProgress(taskArr) {
                let data = await watermark_query(taskArr.join(','));
                this.progress = data.data.data;
                if(data.data.message === 'FAIL'){
                    clearInterval(this.timer);
                    this.$msgbox({
                        title: '提示',
                        type: 'error',
                        message: '上传图片不符合规定',
                        showCancelButton: false,
                        confirmButtonText: '确定',
                    }).then(() => {
                        this.backStepOne();
                    });
                }
                data.data.data >= 100 && clearInterval(this.timer);
            },
            // 任务创建完成返回选择文件
            successBackStepOne() {
                this.$refs.uploadDOM.clear();
                this.step_one = true;
                this.step_two = false;
                this.step_three = false;
                this.watermarkMsg = null;
                this.taskIdArr = null;
                this.progress = 0;
                this.step = 1;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header{
        background-color: #fff;
        padding-top: 27px;
        padding-bottom: 20px;
    }
    .section{
        margin-top: 20px;
        footer{
            height: 100px;
            line-height: 100px;
            text-align: right;
        }
        .configBox{
            padding: 20px 40px;
            height: 36px;
            line-height: 36px;
            span{
                width: 200px;
                text-align: right;
            }
            .el-input{
                width: calc(100% - 200px);
            }
        }
        .created{
            padding: 72px 20px 0;
            .createdImg{
                text-align: center;
            }
            p{
                line-height: 100px;
                font-size: 16px;
                text-align: center;
                span{
                    color: #23c6c8;
                    margin: 0 6px;
                }
            }
            .createdProgress{
                padding: 0 20px;
                margin-bottom: 40px;
            }
        }
    }
</style>
