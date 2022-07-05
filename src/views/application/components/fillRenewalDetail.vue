<template>
    <el-dialog title="违约重生申请" v-model="dialogFormVisible" width="90%" center destroy-on-close="true" @close="close">
        <el-descriptions title="基本信息">
            <el-descriptions-item label="客户ID：">{{ row.clientId }}</el-descriptions-item>
            <el-descriptions-item label="客户姓名：">{{ row.clientName }}</el-descriptions-item>
            <el-descriptions-item label="严重程度：">{{ row.defaultSeverity }}</el-descriptions-item>
            <el-descriptions-item label="认定人：">{{ row.sponsorName }}</el-descriptions-item>
            <el-descriptions-item label="认定申请时间：">{{ row.defaultCreated }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="违约原因" style="margin-top:40px" column="1">
            <el-descriptions-item v-if="row.defaultNotch=='1'">- 6个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口2次以上</el-descriptions-item>
            <el-descriptions-item v-if="row.defaultCancel=='1'">- 6个月内因各种原因导致成交后撤单2次以上</el-descriptions-item>
            <el-descriptions-item v-if="row.defaultDelay=='1'">- 未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）</el-descriptions-item>
            <el-descriptions-item v-if="row.defaultRelate=='1'">- 如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件</el-descriptions-item>
            <el-descriptions-item v-if="row.defaultSubstitute=='1'">- 发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组</el-descriptions-item>
            <el-descriptions-item v-if="row.defaultBankrupt=='1'">- 申请破产保护，发生法律接管，或者处于类似的破产保护状态</el-descriptions-item>
            <el-descriptions-item v-if="row.defaultExternal=='1'">- 在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况，逾期超过90天等），或外部评级显示为违约级别</el-descriptions-item>
        </el-descriptions>
            <el-form
                :model="row"
                ref="ruleForm"
                label-width="160px"
                label-position="top"
                >
                <el-row :gutter="60">
                <div class="container" style="margin-top:40px">
                    <el-col>
                        <el-form-item label="请选择重生原因：" prop="rebirthSettle">
                            <el-checkbox v-model="row.rebirthSettle">正常结算后解除</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item prop="rebirthChange">
                            <el-checkbox v-model="row.rebirthChange">在其他金融机构违约解除，或外部评级显示为非违约级别</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item prop="rebirthReduce">
                            <el-checkbox v-model="row.rebirthReduce">计提比例小于设置界限</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item prop="rebirthPay">
                            <el-checkbox v-model="row.rebirthPay">连续12个月内按时支付本金和利息</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item prop="rebirthRepay">
                            <el-checkbox v-model="row.rebirthRepay">客户的还款意愿和还款能力明显好转，已偿付各项逾期本金、逾期利息和其他费用（包括罚息等），且连续12个月内按时支付本金、利息</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item prop="rebirthRelieve">
                            <el-checkbox v-model="row.rebirthRelieve">导致违约的关联集团内其他发生违约的客户已经违约重生，解除关联成员的违约设定</el-checkbox>
                        </el-form-item>
                    </el-col>
                    </div>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                v-model="row.rebirthRemark"
                                maxlength="300"
                                show-word-limit
                                resize="none"
                                style="width:100%"
                                :autosize="{ minRows: 3, maxRows: 3 }"
                                placeholder="请填写备注信息"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template v-slot:footer>
                <div class="dialog-footer submit-button">
                    <el-button @click="dialogFormVisible=false">返&nbsp;回</el-button>
                    <el-button type="primary" @click="onSubmit">提&nbsp;交</el-button>
                </div>
            </template>
    </el-dialog>
</template>

<script>
export default {
    name:'fillRenewalDetail',
    data(){
        return{
            dialogFormVisible: false,
            defaultForm:{
                clientId:'',
                clientName:'',
                defaultCreated:'',
                clientRete:'',
                defaultNotch: false,
                defaultCancel:false,
                defaultDelay:false,
                defaultRelate:false,
                defaultSubstitute:false,
                defaultBankrupt:false,
                defaultExternal:false,
                defaultSeverity:'',
                sponsorName:'',
            },
            rebirthForm:{
                rebirthRelieve:false,
                rebirthSettle:false,
                rebirthChange:false,
                rebirthReduce:false,
                rebirthPay:false,
                rebirthRepay:false,
                rebirthRemark:''
            },
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
            
        }
    },
    created(){
        console.log(this.row)
    },
    methods:{
        close() {
            this.$emit('refresh');
        },
        setProp (p) {
            this.dialogFormVisible = p.dialogFormVisible
            this.row = p.row
        },
        goback(){
            //this.$router.push('/application/default');
            console.log('back')
        },
        onSubmit() {
            if(this.row.rebirthRelieve || this.row.rebirthSettle || this.row.rebirthChange || this.row.rebirthReduce || this.row.rebirthPay || this.row.rebirthRepay){
                this.loading = true;
                this.$api.post('rebirth/addRebirth',{
                    rebirthId:this.row.rebirthId,
                    defaultId:this.row.defaultId,
                    rebirthState:'0',
                    rebirthRemark:this.row.rebirthRemark || '',
                    rebirthRelieve:this.row.rebirthRelieve==true?'1':'',
                    rebirthSettle:this.row.rebirthSettle==true?'1':'',
                    rebirthChange:this.row.rebirthChange==true?'1':'',
                    rebirthReduce:this.row.rebirthReduce==true?'1':'',
                    rebirthPay:this.row.rebirthPay==true?'1':'',
                    rebirthRepay:this.row.rebirthRepay==true?'1':''
                }).then(res => {
                    if (res.data.code == "200") {
                        console.log('申请')
                        console.log(this.row);
                        this.loading = false;
                        this.dialogFormVisible = false;
                        this.$router.push('/application/defaultRenewal')
                        this.$message({
                            message:'提交成功！',
                            type:'success'
                        })
                    }
                })
                .catch(res => {
                    this.loading = false;
                    this.$message.error("提交失败！");
                });
            }else{
                this.$message.error('至少选择一条重生原因！');
            }
            
        }
    }
}
</script>

<style lang="stylus" scoped>
        .content
            padding 0 30px 18px
            .submit-button
                padding-top 15px
                text-align center
            .shadow-box
                padding 15px
                width 100%
                margin-bottom 20px
                background rgba(255, 255, 255, 1)
                box-shadow 0px 3px 14px 0px rgba(0, 0, 0, 0.11)
                border-radius 3px
                border 1px solid rgba(196, 205, 213, 0.22)
                .shadow-title
                    height none
                    font-size 16px
                    font-weight 600
                    padding-left 10px
                    color rgba(57, 60, 65, 1)
                    margin-bottom 5px
                    border-left 6px solid #FB5938
            .el-select, .el-input
                width 100%


    .el-form-item__label
        // display: flex;
        // align-items: center;
        // justify-content: flex-end;
        // text-align: right;
        // height 32px
        line-height 16px
        font-weight normal

    .tag_group
        .tag_item
            margin 5px auto
            .tag_name
                width 100px
                color #606266
                font-weight 600
                display inline-block
                margin-right 15px
    .container >>>.el-checkbox__label {
        display: inline-grid;
        white-space: pre-line;
        word-wrap: break-word;
        overflow: hidden;
        line-height: 20px;
    }
</style>
