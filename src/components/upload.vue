<template>
    <div class="uploadContainer">
        <header class="title">{{'文件'+uploadType}}</header>
        <p>您可以尝试文件拖拽，或者点击添加文件按钮进行上传</p>
        <section class="section">
            <el-upload
                drag
                ref="upload"
                :limit="2"
                multiple
                :action="uploadUrl"
                list-type="picture-card"
                :auto-upload="isAuto"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-change="uploadChange"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" width="30%">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </section>
        <header class="title">{{uploadType+'列表'}}</header>
        <el-table
            :data="tableData"
            :show-header="false"
            class="tableList"
            style="width: 100%">
            <el-table-column prop="raw.name" label="图片名称"></el-table-column>
            <el-table-column prop="raw.size" label="图片大小"></el-table-column>
            <el-table-column prop="raw.type" label="图片类型"></el-table-column>
            <el-table-column prop="raw.type" label="图片类型"></el-table-column>
            <el-table-column label="图片状态">
                <template slot-scope="scope"><span>{{scope.row.status === 'success' ? '上传成功' : '等待上传'}}</span></template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "upload",
        props: ['uploadType','isAuto','uploadUrl'],
        data() {
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                tableData: [],
                fileList: []
            }
        },
        methods: {
            // 删除文件
            handleRemove(file, fileList) {
                this.hasFile(fileList);
            },
            // 预览文件
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 文件上传成功的回调
            uploadSuccess(response,file,fileList) {
                response.message === 'SUCCESS' && this.$emit('watchSourceTableData',response.data);
            },
            // 文件上传失败的回调
            uploadError() {
                this.$message.error('文件上传失败');
            },
            // 文件列表change的回调
            uploadChange(file,fileList) {
                this.tableData = fileList;
                this.hasFile(fileList);
            },
            // 在手动上传的时候监听文件列表是否存在文件
            hasFile(fileList) {
                !this.isAuto && this.$emit('watchStepOneDis',fileList.length === 0);
            },
            // 清空文件
            clear() {
                this.tableData = [];
                this.$refs.upload.clearFiles();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .uploadContainer{
        p{
            height: 40px;
            line-height: 40px;
        }
        .section{
            margin-bottom: 40px;
            border-bottom: 2px solid #edeef2;
            padding: 30px 54px 40px;
        }
    }
</style>
