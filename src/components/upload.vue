<template>
    <div class="uploadContainer">
        <header class="title">{{'文件'+uploadType}}</header>
        <p>您可以尝试文件拖拽，或者点击添加文件按钮进行上传</p>
        <section class="section">
            <el-upload
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="uploadSuccess"
                :on-error="uploadError"
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
                <template slot-scope="scope"><span>{{scope.row.status === 'success' ? '上传成功' : '上传中···'}}</span></template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "upload",
        props: ['uploadType'],
        data() {
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                tableData: []
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadSuccess(response,file,fileList) {
                this.tableData = fileList;
            },
            uploadError() {
                this.$message.error('文件上传失败');
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
