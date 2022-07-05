<template>
  <div>
    <h1>违约重生审核</h1>
    <RenewalDialog ref="submitDialog" @setReject="diaglogSet " @setPass="diaglogSet" @close="dialogFormVisible = false">
    </RenewalDialog>
    <div class="content" v-show="!dialogFormVisible">
      <div class="search_zone">
        <!-- <h4 class="layout-small-title">自定义搜索</h4> -->
        <el-form ref="searchForm" :model="form">
          <el-row>
            <el-col :span="7">
              <el-form-item>
                <el-input v-model="form.clientName" placeholder="客户名称" clearable @keyup.enter="searchTableData" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <el-select v-model="form.rebirthState" placeholder="审核状态">
                  <el-option v-for="(item, index) in reviewOptions" :key="index" :label="item" :value="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="searchTableData">查&nbsp;询</el-button>
            </el-col>
            <el-col :span="1">
              <el-button @click="resetForm">重&nbsp;置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="table_zone">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" :empty-text="querydata == true ? '' : ''">
          <el-table-column prop="clientName" label="违约客户" width="100" :show-overflow-tooltip="true" fixed />
          <el-table-column prop="rebirthState" label="审核状态" width="100" fixed />
          <el-table-column prop="clientId" label="客户编号" width="150" />
          <el-table-column prop="sponsorName" label="认定人" width="100" :show-overflow-tooltip="true" />
          <el-table-column prop="sponsorId" label="认定人编号" width="160" />
          <el-table-column prop="defaultCreated" label="认定申请时间" width="160" :show-overflow-tooltip="true" />
          <el-table-column prop="rebirthCreated" label="重生申请时间" width="160" :show-overflow-tooltip="true" />
          <el-table-column prop="defaultSeverity" label="严重程度" width="100" :show-overflow-tooltip="true" />
          <el-table-column prop="clientRete" label="最新外部等级信息" width="150" :show-overflow-tooltip="true" />
          <el-table-column label="操作" width="100" fixed="right">
            <template v-slot="scope">
              <el-button type="text" size="mini" @click="checkDetail(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination_zone" v-if="tableData.length > 0">
          <el-pagination background :current-page="form.pageNum" :page-sizes="pageSizes" :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
        <div v-else>
          <el-empty :image-size="300" description=" "></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import RenewalDialog from './RenewalDialog'
export default {
  name: 'DefaultRenewalApplicationReview',
  components: {
    RenewalDialog
  },
  data () {
    return {
      loading: false,
      // 初始显示
      querydata: true,
      // 违约严重性
      severityOptions: ['低', '中', '高'],
      reviewOptions: ['未审核', '同意', '拒绝'],
      reteOptions: ['不违约', '违约'],
      sponsorOptions: [
        {
          value: 0,
          label: '申请人'
        },
        {
          value: 1,
          label: '审核人'
        }
      ],
      form: {
        clientName: '',
        rebirthState: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      // 总条数
      total: 0,
      // 当前页数
      currentPage: 1,
      // 每页显示条数
      pageSizes: [10, 20, 30, 50],
      // 编辑弹窗是否显示
      dialogFormVisible: false
    }
  },
  methods: {
    diaglogSet (p) {
      this.searchTableData()
      this.$nextTick(() => {
        this.dialogFormVisible = p
      })
    },
    // 弹出编辑弹窗
    checkDetail (row) {
      console.log(row)
      this.dialogFormVisible = true
      const p = []
      p.dialogFormVisible = this.dialogFormVisible
      p.row = row
      this.$refs.submitDialog.setProp(p)
    },
    // 查询
    searchTableData () {
      this.$api.get('rebirth/queryRebirth', {
        params: {
          rebirthId: '',
          defaultId: '',
          clientName: '' || this.form.clientName,
          rebirthState: '' || this.form.rebirthState,
          rebirthRemark: '',
          rebirthRelieve: '',
          rebirthSettle: '',
          rebirthChange: '',
          rebirthReduce: '',
          rebirthPay: '',
          rebirthRepay: '',
          startCreated: '',
          endCreated: ''
        }
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.tableData = res.data.data
          let i = 0
          res.data.data.forEach(item => {
            if (item.rebirthState !== undefined) {
              this.tableData[i].rebirthState = this.reviewOptions[item.rebirthState]
            }
            if (item.defaultCreated !== undefined) {
              this.tableData[i].defaultCreated = item.defaultCreated.substring(0, 10)
            }
            if (item.rebirthCreated !== undefined) {
              this.tableData[i].rebirthCreated = item.rebirthCreated.substring(0, 10)
            }
            if (item.defaultSeverity !== undefined) {
              this.tableData[i].defaultSeverity = this.severityOptions[item.defaultSeverity]
            }
            this.tableData[i].clientRete = this.reteOptions[item.clientRete]

            // 违约原因数据重组
            let reason = ''
            if (this.tableData[i].defaultNotch === '1') {
              reason += '1'
            }
            if (this.tableData[i].defaultCancel === '1') {
              reason += '2'
            }
            if (this.tableData[i].defaultDelay === '1') {
              reason += '3'
            }
            if (this.tableData[i].defaultRelate === '1') {
              reason += '4'
            }
            if (this.tableData[i].defaultSubstitute === '1') {
              reason += '5'
            }
            if (this.tableData[i].defaultBankrupt === '1') {
              reason += '6'
            }
            if (this.tableData[i].defaultExternal === '1') {
              reason += '7'
            }
            this.tableData[i].defaultReason = reason

            // 重生原因重组
            let renewalReason = ''
            if (this.tableData[i].rebirthSettle === '1') {
              renewalReason += '1'
            }
            if (this.tableData[i].rebirthChange === '1') {
              renewalReason += '2'
            }
            if (this.tableData[i].rebirthReduce === '1') {
              renewalReason += '3'
            }
            if (this.tableData[i].rebirthPay === '1') {
              renewalReason += '4'
            }
            if (this.tableData[i].rebirthRepay === '1') {
              renewalReason += '5'
            }
            if (this.tableData[i].rebirthRelieve === '1') {
              renewalReason += '6'
            }
            this.tableData[i].renewalReason = renewalReason
            i++
          })
          // console.log(res.data.data.defaultCreated)
          this.$forceUpdate()
        } else {
          ElMessage({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    // 重置
    resetForm () {
      this.form = {
        clientName: '',
        defaultState: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    handleSizeChange () {
      // ...
    },
    handleCurrentChange () { }
  },
  mounted () {
    this.searchTableData()
  }
}
</script>

<style lang='stylus' scoped>
  .content
    .search_zone
      h4
        font-size 16px
      .el-row
        .el-col
          height 50px
          .el-form-item
            width 93%
            height 32px
            line-height 32px
            .el-input, .el-select, .el-cascader
              width 100%
              .divIncludeTime
                line-height 32px
                position relative
                display inline-block
                .line
                  text-align center
    .table_zone
      font-size 16px
      thead
        background rgba(240, 244, 247, 1)
      #el-table

      .tag
        display inline-block
        width 58px
        border-radius 3px
        font-weight 500
        line-height 20px
        text-align center
      .tag_primary
        color #2296F3
        background rgba(34, 150, 243, 0.2)
        border 1px solid rgba(34, 150, 243, 1)
      .tag_info
        color #01BCD5
        background rgba(1, 188, 213, 0.2)
        border 1px solid rgba(1, 188, 213, 1)
      .tag_warning
        color #FF9802
        background rgba(255, 152, 2, 0.2)
        border 1px solid rgba(255, 152, 2, 1)
      .dot
        &:before
          content '●'
          display inline-block
          margin-right 10px
          font-size 16px
      .dot_success
        &:before
          color #27CA3F
      .dot_error
        &:before
          color #F54336
      .pagination_zone
        margin-top 20px
        text-align right

</style>
