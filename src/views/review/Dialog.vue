<template>
  <el-dialog title="提交审核" v-model="dialogFormVisible">
    <el-descriptions title="基本信息">
      <el-descriptions-item label="客户姓名：">{{ row.clientName }}</el-descriptions-item>
      <el-descriptions-item label="审核状态：">{{ row.defaultState }}</el-descriptions-item>
      <el-descriptions-item label="违约记录编号：">{{ row.defaultId }}</el-descriptions-item>
      <el-descriptions-item label="客户编号：">{{ row.clientId }}</el-descriptions-item>
      <el-descriptions-item label="严重程度：">{{ row.defaultSeverity }}</el-descriptions-item>
      <el-descriptions-item label="认定人：">{{ row.sponsorName }}</el-descriptions-item>
      <el-descriptions-item label="最新外部等级：">{{ row.defaultRete }}</el-descriptions-item>
      <el-descriptions-item label="认定申请时间：">{{ row.defaultCreated }}</el-descriptions-item>
      <el-descriptions-item label="认定审核时间：">{{ row.defaultReviewed }}</el-descriptions-item>
    </el-descriptions>
    <br/>
    <el-descriptions title="违约原因详情">
      <el-descriptions-item label="认定审核时间：">{{ defaultReason }}</el-descriptions-item>
    </el-descriptions>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="rejected">驳 回</el-button>
        <el-button type="primary" @click="passed">通 过</el-button>
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
      defaultReason: ''
    }
  },
  methods: {
    setProp (p) {
      this.dialogFormVisible = p.dialogFormVisible
      this.row = p.row
    },
    rejected () {
      this.dialogFormVisible = false
      this.$nextTick(() => {
        this.$emit('setReject', this.dialogFormVisible)
      })
      this.$api.post('updateDefalutStateToFail', {
        // ....
      })
    },
    passed () {
      this.dialogFormVisible = false
      this.$nextTick(() => {
        this.$emit('setPass', this.dialogFormVisible)
      })
    }
  }
}
</script>
