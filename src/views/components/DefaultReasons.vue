<template>
  <h1>违约风险原因维护</h1>
  <el-table ref="multipleTable" :data="defaultReasonGroup" tooltip-effect="dark" style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="序号" type="index" width="50">
    </el-table-column>
    <el-table-column prop="isUse" label="是否启用" width="80">
    </el-table-column>
    <el-table-column prop="defaultReason" label="违约原因" show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button @click="save()">保存更改</el-button>
  </div>
</template>

<script>
export default {
  name: 'DefaultReasons',
  data () {
    return {
      defaultReasonGroup: [{
        reasonId: '1',
        isUse: '是',
        defaultReason: '6 个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口 2 次以上'
      }, {
        reasonId: '2',
        isUse: '是',
        defaultReason: '6 个月内因各种原因导致成交后撤单 2 次以上'
      }, {
        reasonId: '3',
        isUse: '是',
        defaultReason: '未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）'
      }, {
        reasonId: '4',
        isUse: '是',
        defaultReason: '关联违约：如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件'
      }, {
        reasonId: '5',
        isUse: '是',
        defaultReason: '发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组'
      }, {
        reasonId: '6',
        isUse: '是',
        defaultReason: '申请破产保护，发生法律接管，或者处于类似的破产保护状态'
      }, {
        reasonId: '7',
        isUse: '是',
        defaultReason: '在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况，逾期超过 90 天等），或外部评级显示为违约级别'
      }],
      multipleSelection: [],
      selectedId: []
    }
  },

  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    save () {
      this.defaultReasonGroup.forEach(item => {
        item.isUse = '否'
      })
      this.multipleSelection.forEach(item => {
        item.isUse = '是'
        this.selectedId.push(item.reasonId)
      })
    }
  }
}
</script>
