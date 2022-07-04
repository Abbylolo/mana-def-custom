<template>
    <el-dialog title="违约信息" v-model="dialogFormVisible" width="90%" center>
    <el-descriptions>
        <el-descriptions-item label="违约记录ID：">{{ row.defaultId }}</el-descriptions-item>
        <el-descriptions-item label="违约客户ID：">{{ row.clientId }}</el-descriptions-item>
        <el-descriptions-item label="违约客户姓名：">{{ row.clientName }}</el-descriptions-item>
        <el-descriptions-item label="审核状态：">{{ row.defaultState }}</el-descriptions-item>
        <el-descriptions-item label="严重程度：">{{ row.defaultSeverity }}</el-descriptions-item>
        <el-descriptions-item label="认定人ID：">{{ row.sponsorId }}</el-descriptions-item>
        <el-descriptions-item label="认定人：">{{ row.sponsorName }}</el-descriptions-item>
        <el-descriptions-item label="最新外部等级：">{{ row.defaultRete }}</el-descriptions-item>
        <el-descriptions-item label="违约原因">-</el-descriptions-item>
        <el-descriptions-item label="认定申请时间：">{{ row.defaultCreated }}</el-descriptions-item>
        <el-descriptions-item label="认定审核时间：">{{ row.defaultReviewed }}</el-descriptions-item>
        <el-descriptions-item label="备注：">{{ row.defaultRemark }}</el-descriptions-item>
        </el-descriptions>
        <div style="text-align:center">
            <p>
            <el-button type="success" @click="finish">完成</el-button>
            </p>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name:'defaultDetail',
    data () {
        return {
            // 编辑弹窗是否显示
            dialogFormVisible: false,
            row: ''
        }
    },
    methods: {
        setProp (p) {
            this.dialogFormVisible = p.dialogFormVisible
            this.row = p.row
        },
        finish(){
            this.dialogFormVisible = false
        }
    }
}
</script>

<style lang='stylus' scoped>
.checkDetail {
  table {
    width: 100%;
    height: 100%;
    text-align: center;
    table-layout: fixed;
    word-wrap: break-word;

    .td4-1 {
      width: 20%;
    }

    .td4-2 {
      width: 30%;
    }

    .td3 {
      width: 33.3%;
    }

    tr {
      td {
        height: 50px;
      }
    }
  }
}
</style>