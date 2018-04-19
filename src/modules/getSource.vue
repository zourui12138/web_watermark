<template>
    <div>
        <Upload class="whiteBg" uploadType="溯源"/>
        <div class="whiteBg">
            <header class="title">已溯源文件信息</header>
            <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline>
                            <el-form-item label="水印信息"><span>{{scope.row.msg}}</span></el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="文件名称" prop="name"></el-table-column>
                <el-table-column label="信息类型" prop="type"></el-table-column>
                <el-table-column label="溯源时间" prop="date">
                    <template slot-scope="scope"><p style="text-align: right">{{scope.row.date}}</p></template>
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
                tableData: [
                    {
                        name: '我是水印文件名称',
                        type: '普通信息',
                        date: '2018/04/19 23:59:59',
                        msg: '我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息'
                    },
                    {
                        name: '我是水印文件名称',
                        type: '普通信息',
                        date: '2018/04/19 23:59:59',
                        msg: '我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息'
                    },
                    {
                        name: '我是水印文件名称',
                        type: '普通信息',
                        date: '2018/04/19 23:59:59',
                        msg: '我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息'
                    },
                    {
                        name: '我是水印文件名称',
                        type: '普通信息',
                        date: '2018/04/19 23:59:59',
                        msg: '我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息，我是水印信息'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped></style>
