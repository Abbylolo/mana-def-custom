<template>
  <div>
    <h1 v-show="!dialogFormVisible">违约认定申请</h1>
  </div>
  <fill-detail ref="submitDialog" @close="dialogFormVisible=false" @refresh="searchTableData"></fill-detail>
  <div class="content" v-show="!dialogFormVisible">
    <div class="search_zone">
      <el-form ref="searchForm" :model="form">
        <el-row>
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
          <el-col :span="7">
            <el-form-item>
                <el-select v-model="form.clientSex" placeholder="客户性别" clearable>
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="searchTableData">查&nbsp;询</el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.clientIdCard"
                placeholder="客户身份证号"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.clientTel"
                placeholder="客户联系方式"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
              <el-input
                v-model="form.clientEmail"
                placeholder="客户邮箱"
                clearable
                @keyup.enter="searchTableData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button @click="resetForm">重&nbsp;置</el-button>
          </el-col>
          <el-col :span="7">
            <el-form-item label="开始时间">
              <el-date-picker
                :picker-options="pickerOptionsStart"
                clearable
                size="small"
                style="width: 200px"
                v-model="form.startTime"
                type="date"
                placeholder="选择开始时间"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="结束时间">
              <el-date-picker
                :picker-options="pickerOptionsEnd"
                clearable
                size="small"
                style="width: 200px"
                v-model="form.endTime"
                type="date"
                placeholder="选择结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item>
                <el-select v-model="form.clientRete" placeholder="最新外部等级" clearable>
                <el-option
                  v-for="item in rateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" v-if="false">
            <el-form-item>
                <el-select v-model="form.clientState" placeholder="违约状态">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
        <el-table-column prop="clientId" label="客户id" width="100" />
        <el-table-column
          prop="clientName"
          label="客户姓名"
          width="100"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="clientSex"
          label="客户性别"
          width="100"
        />
        <el-table-column 
          prop="clientIdCard"
          label="客户身份证号"
          width="200"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="clientTel"
          label="客户联系方式"
          width="140"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="clientEmail" label="客户邮箱" width="150" :show-overflow-tooltip="true"/>
        <el-table-column
          prop="clientCreated"
          label="成为客户时间"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column
          prop="clientRete"
          label="最新外部等级"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="clientState"
          label="违约状态"
          :show-overflow-tooltip="true"
          v-if="false"
        />
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button type="text" size="mini" @click="checkDetail(scope.row)">申请</el-button>
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
import fillDetail from './components/fillDetail'
    export default {
      name:'DefaultApplication',
      components:{
        fillDetail
      }, 
      data() {
        return {
          loading: false,
          ifSubmit:true,
          dialogFormVisible:false,
          //初始显示
          querydata:true,
          sexOptions:[
            {
              label:'男',
              value:0
            },
            {
              label:'女',
              value:1
            },
          ],
          rateOptions:[
            {
              label:'未违约',
              value:'0'
            },
            {
              label:'违约',
              value:'1'
            },
          ],
          stateOptions:[
            {
              label:'未违约',
              value:'0'
            },
            {
              label:'违约',
              value:'1'
            },
          ],
          form: {
            // 客户id
            clientId: "",
            // 客户名称
            clientName: "",
            //客户性别
            clientSex: "",
            //客户身份证
            clientIdCard: "",
            //客户联系方式
            clientTel: "",
            //客户邮箱
            clientEmail: "",
            //客户状态
            clientState:1,
            //生成客户时间
            clientCreated:"",
            clientRete:"",
            pageNum: 1,
            pageSize: 10,
            startTime: "", //查询开始日期
            endTime: "", //查询结束日期
          },
          tableData: [],
          // 总条数
          total: 0,
          // 当前页数
          currentPage: 1,
          // 每页显示条数
          pickerOptionsStart: {
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
          },
          pickerOptionsEnd: {
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
          this.$api.get('/client/queryClient',{
            params:{
              clientId:'' || this.form.clientId,
              clientName: '' || this.form.clientName,
              clientSex:'' || this.form.clientSex,
              clientIdCard: '' || this.form.clientIdCard,
              clientTel: '' || this.form.clientTel,
              clientEmail: '' || this.form.clientEmail,
              clientRete: '' || this.form.clientRete,
              clientState: '0',
              startTime: '' || this.form.startTime,
              endTime: '' || this.form.endTime,
              applyState: '0'
            }
          }).then(res => {
              //res.rows.forEach(item => {
              //  let arr = item.cdxxtb.split("/");
              //  if (arr[0] == arr[1]) {
              //    item.cdxxtb = "全部已完成";
              //  } else {
              //    item.cdxxtb += "已完成";
              //  }
              //});
              this.total = res.data.data.length;
              this.tableData = res.data.data;
              this.tableData.map(item=>{
                if(item.clientRete=='0'){
                  item.clientRete='未违约';
                }else if(item.clientRete=='1'){
                  item.clientRete='违约';
                }
                item.clientCreated=item.clientCreated.slice(0,10);
              })
              console.log('tableData')
              console.log(this.tableData)
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
            clientId: "",
            clientName: "",
            clientSex: "",
            clientIdCard: "",
            clientTel: "",
            clientEmail: "",
            clientState: 1,
            clientRete:"",
            pageNum: 1,
            pageSize: 10,
            startTime: "",
            endTime: "",
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