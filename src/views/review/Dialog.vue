<template>
  <el-dialog title="违约认定审核" v-model="dialogFormVisible" width="90%" destroy-on-close="true">
    <el-descriptions title="基本信息">
      <el-descriptions-item label="客户姓名：">{{ row.clientName }}</el-descriptions-item>
      <el-descriptions-item label="审核状态：">{{ row.defaultState }}</el-descriptions-item>
      <el-descriptions-item label="违约记录编号：">{{ row.defaultId }}</el-descriptions-item>
      <el-descriptions-item label="客户编号：">{{ row.clientId }}</el-descriptions-item>
      <el-descriptions-item label="严重程度：">{{ row.defaultSeverity }}</el-descriptions-item>
      <el-descriptions-item label="认定人：">{{ row.sponsorName }}</el-descriptions-item>
      <!-- <el-descriptions-item label="最新外部等级：">{{ row.defaultRete }}</el-descriptions-item> -->
      <el-descriptions-item label="认定申请时间：">{{ row.defaultCreated }}</el-descriptions-item>
      <el-descriptions-item label="认定审核时间：">{{ row.defaultReviewed }}</el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions title="违约原因详情" direction="vertical" :column="1">
      <el-descriptions-item v-for="(item,index) in defaultReason" :key="index">{{ index + 1 +'.'+item }}</el-descriptions-item>
    </el-descriptions>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="rejected">拒 绝</el-button>
        <el-button type="primary" @click="passed">同 意</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  data () {
    return {
      // 编辑弹窗是否显示
      dialogFormVisible: false,
      row: '',
      allDefaultReason: [
        '6 个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口 2 次以上',
        '6 个月内因各种原因导致成交后撤单 2 次以上',
        '未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）',
        '关联违约：如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件',
        '发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组',
        '申请破产保护，发生法律接管，或者处于类似的破产保护状态',
        '在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况，逾期超过 90 天等），或外部评级显示为违约级别'
      ],
      defaultReason: []
    }
  },
  methods: {
    setProp (p) {
      console.log('dd')
      this.dialogFormVisible = p.dialogFormVisible
      this.row = p.row
      const r = this.row.defaultReason.split('')
      r.forEach(item => {
        this.defaultReason.push(this.allDefaultReason[item])
      })
    },
    rejected () {
      this.dialogFormVisible = false
      this.$api.post('default/updateDefalutStateToFail?defaultId=' + this.row.defaultId, {
        defaultId: this.row.defaultId
      })
      this.defaultReason = ''
      this.$nextTick(() => {
        this.$emit('setReject', this.dialogFormVisible)
      })
    },
    passed () {
      this.dialogFormVisible = false
      this.$api.post('default/updateDefalutStateToPass?defaultId=' + this.row.defaultId, {
        defaultId: this.row.defaultId
      })
      this.defaultReason = ''
      this.$nextTick(() => {
        this.$emit('setPass', this.dialogFormVisible)
      })
    }
  }
}
</script>
