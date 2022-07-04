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
        <el-descriptions-item label="认定申请时间：">{{ row.defaultCreated }}</el-descriptions-item>
        <el-descriptions-item label="认定审核时间：">{{ row.defaultReviewed }}</el-descriptions-item>
        <el-descriptions-item label="备注：">{{ row.defaultRemark }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="违约原因" style="margin-top:40px" column="1">
      <el-descriptions-item v-if="row.defaultNotch=='1'">- 6个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口2次以上</el-descriptions-item>
      <el-descriptions-item v-if="row.defaultCancel=='1'">- 6个月内因各种原因导致成交后撤单2次以上</el-descriptions-item>
      <el-descriptions-item v-if="row.defaultDelay=='1'">- 未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）</el-descriptions-item>
      <el-descriptions-item v-if="row.defaultRelate=='1'">- 如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件</el-descriptions-item>
      <el-descriptions-item v-if="row.defaultSubstitute=='1'">- 发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组</el-descriptions-item>
      <el-descriptions-item v-if="row.defaultBankrupt=='1'">- 申请破产保护，发生法律接管，或者处于类似的破产保护状态</el-descriptions-item>
      <el-descriptions-item v-if="row.defaultExternal=='1'">- 在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况，</el-descriptions-item>
    </el-descriptions>
        <div style="text-align:center">
            <p>
            <el-button type="primary" @click="finish">返回</el-button>
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