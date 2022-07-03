<template>
  <div>
    <h1>违约重生申请</h1>
  </div>
  <div class="content">
    <div class="search_zone">
      <!-- <h4 class="layout-small-title">自定义搜索</h4> -->
      <el-form ref="searchForm" :model="form">
        <el-row>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.defaultId"
                placeholder="违约记录id"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.clientId"
                placeholder="客户id"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.clientName"
                placeholder="客户姓名"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="searchTableData">查&nbsp;询</el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-select v-model="form.defaultState" placeholder="审核状态">
                <el-option
                  v-for="item in reviewOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item >
              <el-select v-model="form.defaultSeverity" placeholder="严重程度">
                <el-option
                  v-for="item in severityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-select v-model="form.sponsorName" placeholder="认定人">
                <el-option
                  v-for="item in sponsorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button @click="resetForm">重&nbsp;置</el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-select v-model="form.defaultRete" placeholder="最新外部等级">
                <el-option
                  v-for="item in reteOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item >
              <el-date-picker
                v-model="form.defaultCreated"
                type="daterange"
                range-separator="至"
                start-placeholder="认定申请开始日期"
                end-placeholder="认定申请结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-date-picker
                v-model="form.defaultReviewed"
                type="daterange"
                range-separator="至"
                start-placeholder="认定审核开始日期"
                end-placeholder="认定审核结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="违约原因：">
              <el-checkbox v-model="form.defaultNotch">6 个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口 2 次以上</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="margin-left: 80px;">
              <el-checkbox v-model="form.defaultCancel">6个月内因各种原因导致成交后撤单2次以上</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="margin-left: 80px;">
              <el-checkbox v-model="form.defaultDelay">未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="margin-left: 80px;">
              <el-checkbox v-model="form.defaultRelate">如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="margin-left: 80px;">
              <el-checkbox v-model="form.defaultSubstitute">发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="margin-left: 80px;">
              <el-checkbox v-model="form.defaultBankrupt">申请破产保护，发生法律接管，或者处于类似的破产保护状态</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item style="margin-left: 80px;">
              <el-checkbox v-model="form.efaultExternal">在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况， 逾期超过 90 天等），或外部评级显示为违约级别</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table_zone">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :empty-text="querydata == true ? '点击按钮查询':'暂无数据'"
      >
        <el-table-column prop="defaultId" label="违约记录id" width="150" />
        <el-table-column prop="clientId" label="客户id" width="150" />
        <el-table-column
          prop="clientName"
          label="客户姓名"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="defaultState"
          label="审核状态"
          width="100"
        />
        <el-table-column 
          prop="defaultSeverity"
          label="严重程度"
          width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="sponsorName"
          label="认定人"
          width="140"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="defaultRete" label="最新外部等级" width="100" :show-overflow-tooltip="true"/>
        <el-table-column
          prop="defaultCreated"
          label="认定申请时间"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="defaultReviewed"
          label="认定审核时间"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button type="text" size="mini" @click="checkDetail(scope.row)">重生申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_zone" v-if="tableData.length>0 ">
        <el-pagination
          background
          :current-page="form.pageNum"
          :page-sizes="pageSizes"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name:'DefaultRenewalApplication',
        data() {
          return {
            loading: false,
            //初始显示
            querydata:true,
            severityOptions:[
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
              },
            ],
            reviewOptions:[
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
              },
            ],
            reteOptions:[
              {
                value: 0,
                label: '不违约'
              },
              {
                value: 1,
                label: '违约'
              }
            ],
            sponsorOptions:[
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
              defaultId:'',
              clientId: '',
              // 客户名称
              clientName: '',
              defaultState:'',
              sponsorName:'',
              defaultRete:'',
              defaultCreated:'',
              defaultReviewed:'',
              defaultSeverity:'',
              defaultNotch: false,
              defaultCancel:false,
              defaultDelay:false,
              defaultRelate:false,
              defaultSubstitute:false,
              defaultBankrupt:false,
              defaultExternal:false,
              pageNum: 1,
              pageSize: 10,
              ksrq: '', //查询开始日期
              jsrq: '', //查询结束日期
              params: {
                beginTime: "",
                endTime: ""
              }
            },
            tableData: [],
            // 总条数
            total: 0,
            // 当前页数
            currentPage: 1,
            // 每页显示条数
            pageSizes: [10, 20, 30, 50],
            pickerOptions: {
              shortcuts: [{
                text: '即刻',
                onClick(picker) {
                  const date = new Date();
                  picker.$emit('pick', date);
                }
              },{
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              },{
                text: '本月',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.setDate(1));
                  picker.$emit('pick', date);
                }
              }]
            }
          };
        },
        methods:{
          resetForm() {
          this.form = {
            clientId: '',
              defaultId:'',
              clientName: '',
              defaultState:'',
              sponsorName:'',
              defaultRete:'',
              defaultCreated:'',
              defaultReviewed:'',
              defaultSeverity:'',
              defaultNotch: false,
              defaultCancel:false,
              defaultDelay:false,
              defaultRelate:false,
              defaultSubstitute:false,
              defaultBankrupt:false,
              defaultExternal:false,
              pageNum: 1,
              pageSize: 10,

              pageNum: 1,
              pageSize: 10,
            //ksrq: getNearlyRecentYear(2019)[0], //查询开始日期
            //jsrq: getNearlyRecentYear(2019)[1], //查询结束日期
            // ksrq: "", //查询开始日期
            // jsrq: "", //查询结束日期
            //params: {
              //beginTime: getNearlyRecentYear(2019)[0],
              //endTime: getNearlyRecentYear(2019)[1],
              // beginTime: "",
              // endTime: "",
              // 依据排序的属性名称（从 table 返回的数据中获取）
              //sortField: "tbsj",
              //sortOrder: "desc"
            //}
          };
          this.$refs.dateTimeRange.clear();
        },
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