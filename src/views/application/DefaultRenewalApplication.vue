<template>
  <div>
    <h1 v-show="!dialogFormVisible">违约重生申请</h1>
  </div>
  <fill-renewal-detail ref="submitDialog" @close="dialogFormVisible=false" @refresh="searchTableData"></fill-renewal-detail>
  <div class="content" v-show="!dialogFormVisible">
    <div class="search_zone">
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
                <el-input
                v-model="form.sponsorId"
                placeholder="认定人ID"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.sponsorName"
                placeholder="认定人"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button @click="resetForm">重&nbsp;置</el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item >
              <el-select v-model="form.clientRete" placeholder="最新外部等级">
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
            <el-form-item label="认定开始时间">
              <el-date-picker
                :picker-options="pickerOptionsStart"
                clearable
                size="small"
                style="width: 200px"
                v-model="form.startCreated"
                type="date"
                placeholder="选择开始时间"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="认定结束时间">
              <el-date-picker
                :picker-options="pickerOptionsEnd"
                clearable
                size="small"
                style="width: 200px"
                v-model="form.endCreated"
                type="date"
                placeholder="选择结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="审核开始时间">
              <el-date-picker
                :picker-options="pickerOptionsStart"
                clearable
                size="small"
                style="width: 200px"
                v-model="form.startReviewed"
                type="date"
                placeholder="选择开始时间"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="审核结束时间">
              <el-date-picker
                :picker-options="pickerOptionsEnd"
                clearable
                size="small"
                style="width: 200px"
                v-model="form.endReviewed"
                type="date"
                placeholder="选择结束时间"
              >
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
        <el-table-column prop="clientRete" label="最新外部等级" width="100" :show-overflow-tooltip="true"/>
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
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import fillRenewalDetail from './components/fillRenewalDetail'
    export default {
        name:'DefaultRenewalApplication',
        components:{
          fillRenewalDetail
        },
        data() {
          return {
            loading: false,
            dialogFormVisible:false,
            //初始显示
            querydata:true,
            severityOptions:[
              {
                value: '0',
                label: '低'
              },
              {
                value: '1',
                label: '中'
              },
              {
                value: '2',
                label: '高'
              },
            ],
            reteOptions:[
              {
                value: '0',
                label: '未违约'
              },
              {
                value: '1',
                label: '违约'
              }
            ],
            form: {
              defaultId:'',
              clientId: '',
              // 客户名称
              clientName: '',
              defaultState:'',
              sponsorId:'',
              sponsorName:'',
              clientRete:'',
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
              startCreated: '',
              endCreated: '',
              startReviewed:'',
              endReviewed:''
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
          searchTableData(){
            this.loading = true;
            // 数据初始化
            this.tableData = [];
            this.total = 0;
            this.$api.get('default/queryDefault',{
              params:{
                defaultId: '' || this.form.defaultId,
                clientId: '' || this.form.clientId,
                clientName: '' || this.form.clientName,
                sponsorId: '' || this.form.sponsorId,
                sponsorName: '' || this.form.sponsorName,
                defaultState: '1',
                defaultSeverity: '' || this.form.defaultSeverity,
                defaultNotch: '' || this.form.defaultNotch==true?'1':'',
                defaultCancel: '' || this.form.defaultCancel==true?'1':'',
                defaultDelay: '' || this.form.defaultDelay==true?'1':'',
                defaultRelate:'' || this.form.defaultRelate==true?'1':'',
                defaultSubstitute: '' || this.form.defaultSubstitute==true?'1':'',
                defaultBankrupt: '' || this.form.defaultBankrupt==true?'1':'',
                defaultExternal:'' || this.form.defaultExternal==true?'1':'',
                startCreated: '' || this.form.startCreated,
                endCreated:'' || this.form.endCreated,
                startReviewed: '' || this.form.startReviewed,
                endReviewed: '' || this.form.endReviewed,
                clientRete:''|| this.form.clientRete,
                defaultRemark:'' ,
                applyState:'1'
              }
            }).then(res => {
              console.log(res.data)
                this.total = res.data.data.length;
                this.tableData = res.data.data;
                this.tableData.map(item=>{
                  item.defaultCreated=item.defaultCreated.slice(0,10);
                  item.defaultReviewed=item.defaultReviewed.slice(0,10);
                  if(item.defaultSeverity=='0'){
                    item.defaultSeverity='低';
                  }else if(item.defaultSeverity=='1'){
                    item.defaultSeverity='中';
                  }else if(item.defaultSeverity=='2'){
                    item.defaultSeverity='高';
                  }
                  if(item.defaultState=='0'){
                    item.defaultState='未审核';
                  }else if(item.defaultState=='1'){
                    item.defaultState='通过';
                  }else if(item.defaultState=='2'){
                    item.defaultState='拒绝';
                  }
                  if(item.clientRete=='0'){
                    item.clientRete='未违约';
                  }else if(item.clientRete=='1'){
                    item.clientRete='违约';
                  }
                })
                this.loading = false;
                // console.log("----",this.tableData);
                if(this.tableData.length == 0){
                  this.querydata = false;
                }
              })
              .finally(res => {
                // console.error(res);
                this.loading = false;
            });
          },
          resetForm() {
          this.form = {
              clientId: '',
              defaultId:'',
              clientName: '',
              defaultState:'',
              sponsorId:'',
              sponsorName:'',
              defaultRete:'',
              defaultCreated:'',
              defaultReviewed:'',
              defaultSeverity:'',
              defaultNotch:false,
              defaultCancel:false,
              defaultDelay:false,
              defaultRelate:false,
              defaultSubstitute:false,
              defaultBankrupt:false,
              defaultExternal:false,
              pageNum: 1,
              pageSize: 10,
              startCreated: '',
              endCreated: '',
              startReviewed:'',
              endReviewed:''
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
        },
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