<template>
    <el-page-header @back="goBack" content="违约重生申请">
    </el-page-header>
    <div class="content">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="160px"
            label-position="top"
            style="margin-top:40px;margin-left:40px;"
            >
            <el-row :gutter="60">
                <el-col :span="7">
                    <el-form-item label="客户id：">
                        <div>{{defaultForm.clientId}}</div>
                        <input type="hidden" v-model="defaultForm.clientId"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="客户姓名：">
                        <div>{{defaultForm.clientName}}</div>
                        <input type="hidden" v-model="defaultForm.clientName"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="违约原因：">
                        <div v-if="defaultForm.defaultNotch">6个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口2次以上</div>
                        <div v-if="defaultForm.defaultCancel">6个月内因各种原因导致成交后撤单2次以上</div>
                        <div v-if="defaultForm.defaultDelay">未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）</div>
                        <div v-if="defaultForm.defaultRelate">如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件</div>
                        <div v-if="defaultForm.defaultSubstitute">发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组</div>
                        <div v-if="defaultForm.defaultBankrupt">申请破产保护，发生法律接管，或者处于类似的破产保护状态</div>
                        <div v-if="defaultForm.defaultExternal">在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况，逾期超过90天等），或外部评级显示为违约级别</div>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="严重程度：">
                        <div>{{defaultForm.defaultSeverity}}</div>
                        <input type="hidden" v-model="defaultForm.defaultSeverity"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="认定人：">
                        <div>{{defaultForm.sponsorName}}</div>
                        <input type="hidden" v-model="defaultForm.sponsorName"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="认定申请时间：">
                        <div>{{defaultForm.defaultCreated}}</div>
                        <input type="hidden" v-model="defaultForm.defaultCreated"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="最新外部等级：">
                        <div>{{defaultForm.clientRete}}</div>
                        <input type="hidden" v-model="defaultForm.clientRete"/>
                    </el-form-item>
                </el-col>
                <el-col style="margin-top:20px">
                    <el-form-item label="重生原因：" prop="rebirthSettle">
                        <el-checkbox v-model="rebirthForm.rebirthSettle">正常结算后解除</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="rebirthChange">
                        <el-checkbox v-model="rebirthForm.rebirthChange">在其他金融机构违约解除，或外部评级显示为非违约级别</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="rebirthReduce">
                        <el-checkbox v-model="rebirthForm.rebirthReduce">计提比例小于设置界限</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="rebirthPay">
                        <el-checkbox v-model="rebirthForm.rebirthPay">连续12个月内按时支付本金和利息</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="rebirthRepay">
                        <el-checkbox v-model="rebirthForm.rebirthRepay">客户的还款意愿和还款能力明显好转，已偿付各项逾期本金、逾期利息和其他费用（包括罚息等），且连续12个月内按时支付本金、利息</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="rebirthRelieve">
                        <el-checkbox v-model="rebirthForm.rebirthRelieve">导致违约的关联集团内其他发生违约的客户已经违约重生，解除关联成员的违约设定</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input
                            type="textarea"
                            v-model="rebirthForm.rebirthRemark"
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
        <div class="submit-button">
          <el-button type="primary" @click="confirm" size="medium">提&nbsp;交</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'fillRenewalDetail',
    data(){
        return{
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
    methods:{
        goback(){
            //this.$router.push('/application/default');
            console.log('back')
        },
        confirm(){
            if(this.rebirthRelieve || this.rebirthSettle || this.rebirthChange || this.rebirthReduce || this.rebirthPay || this.rebirthRepay ){

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
</style>
