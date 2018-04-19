<template>
    <div>
        <header class="header">
            <el-steps :active="2" align-center>
                <el-step title="选择文件"></el-step>
                <el-step title="配置水印"></el-step>
                <el-step title="创建任务"></el-step>
            </el-steps>
        </header>
        <section class="section">
            <div v-show="step_one" class="whiteBg">
                <Upload uploadType="上传"/>
                <footer><el-button type="primary">下一步</el-button></footer>
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
                        <el-input size="medium" placeholder="请输入水印信息" v-model="watermarkMsg"></el-input>
                    </div>
                    <div class="configBox">
                        <span class="fl">回传路径名：</span>
                        <el-input size="medium" placeholder="请输入水印信息" v-model="watermarkMsg"></el-input>
                    </div>
                    <footer>
                        <el-button type="primary">上一步</el-button>
                        <el-button type="primary">下一步</el-button>
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
                    :percentage="80"
                    color="#23c6c8">
                </el-progress>
                <footer><el-button type="primary">确认</el-button></footer>
            </div>
        </section>
    </div>
</template>

<script>
    import Upload from '~/components/upload'

    export default {
        name: "watermark",
        components: {Upload},
        data() {
            return{
                watermarkMsg: null,
                step_one: true,
                step_two: false,
                step_three: false
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
