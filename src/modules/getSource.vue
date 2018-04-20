<template>
    <div>
        <Upload
            class="whiteBg"
            uploadType="溯源"
            uploadUrl="/verify/file"
            :isAuto="true"
            @watchSourceTableData="getSourceTableData"/>
        <div class="whiteBg">
            <header class="title">已溯源文件信息</header>
            <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline>
                            <el-form-item label="水印信息"><span>{{scope.row.watermark}}</span></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="文件名称" prop="localFile"></el-table-column>
                <el-table-column label="文件类型" prop="type"></el-table-column>
                <el-table-column label="溯源时间">
                    <template slot-scope="scope"><p style="text-align: right">{{scope.row.time}}</p></template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import Upload from '~/components/upload'

    export default {
        name: "get-source",
        components: {Upload},
        data() {
            return{
                tableData: []
            }
        },
        methods: {
            getSourceTableData(data) {
                this.tableData.push(data);
            }
        }
    }
</script>

<style lang="scss" scoped></style>
