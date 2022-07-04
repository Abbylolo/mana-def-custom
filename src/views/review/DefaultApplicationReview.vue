<template>
  <div>
    <h1>违约认定审核</h1>
    <Dialog ref="submitDialog" @setReject="diaglogSet " @setPass="diaglogSet" @close="dialogFormVisible=false"></Dialog>
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
                <el-select v-model="form.defaultState" placeholder="审核状态">
                  <el-option v-for="item in reviewOptions" :key="item.value" :label="item.label" :value="item.value">
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
        <el-table v-loading="loading" :data="tableData" style="width: 100%"
          :empty-text="querydata == true ? '点击按钮查询' : '暂无数据'">
          <el-table-column prop="clientName" label="客户姓名" :show-overflow-tooltip="true" fixed />
          <el-table-column prop="defaultState" label="审核状态" width="100" fixed />
          <el-table-column prop="defaultId" label="违约记录id" width="150" />
          <el-table-column prop="clientId" label="客户id" width="150" />
          <el-table-column prop="defaultSeverity" label="严重程度" width="100" :show-overflow-tooltip="true" />
          <el-table-column prop="sponsorName" label="认定人" width="140" :show-overflow-tooltip="true" />
          <el-table-column prop="defaultRete" label="最新外部等级" width="100" :show-overflow-tooltip="true" />
          <el-table-column prop="defaultCreated" label="认定申请时间" width="140" show-overflow-tooltip />
          <el-table-column prop="defaultReviewed" label="认定审核时间" width="140" show-overflow-tooltip />
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
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import Dialog from './Dialog'
export default {
  name: 'DefaultApplicationReview',
  components: {
    Dialog
  },
  data () {
    return {
      loading: false,
      // 初始显示
      querydata: true,
      severityOptions: [
        {
          value: 0,
          label: '低'
        },
        {
          value: 1,
          label: '中'
        },
        {
          value: 2,
          label: '高'
        }
      ],
      reviewOptions: [
        {
          value: 0,
          label: '未审核'
        },
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 2,
          label: '审核不通过'
        }
      ],
      reteOptions: [
        {
          value: 0,
          label: '不违约'
        },
        {
          value: 1,
          label: '违约'
        }
      ],
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
        clientId: '',
        defaultState: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [{
        defaultId: '001',
        clientId: '19051666',
        clientName: '鲁六',
        defaultState: '0',
        defaultSeverity: '0',
        sponsorName: '罗姐',
        defaultRete: '1',
        defaultCreated: '2022-7-2',
        defaultReviewed: '2022-7-3'
      }, {
        defaultId: '002',
        clientId: '19051888',
        clientName: '华八',
        defaultState: '1',
        defaultSeverity: '1',
        sponsorName: '科结',
        defaultRete: '1',
        defaultCreated: '2022-7-2',
        defaultReviewed: '2022-7-3'
      }],
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
      this.$api.get('queryClient', {
        params: {
          clientId: this.form.clientName,
          clientState: this.form.defaultState
        }
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.tableData = res.data
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
        clientId: '',
        defaultId: '',
        clientName: '',
        defaultState: '',
        sponsorName: '',
        defaultRete: '',
        defaultCreated: '',
        defaultReviewed: '',
        defaultSeverity: '',
        pageNum: 1,
        pageSize: 10
      }
      this.$refs.dateTimeRange.clear()
    },
    handleSizeChange () {
      // ...
    },
    handleCurrentChange () {}
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
