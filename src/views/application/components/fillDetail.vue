<template>
    <el-dialog title="违约认定申请" v-model="dialogFormVisible" width="90%" center :destroy-on-close="true" @close="close">
        <el-descriptions title="基本信息">
            <el-descriptions-item label="客户ID：">{{ row.clientId }}</el-descriptions-item>
            <el-descriptions-item label="客户姓名：">{{ row.clientName }}</el-descriptions-item>
            <el-descriptions-item label="最新外部等级：">{{ row.clientRete }}</el-descriptions-item>
        </el-descriptions>
        <el-form
            :model="row"
            ref="ruleForm"
            label-width="160px"
            label-position="top"
            >
            <el-row :gutter="60">
                <div class="container">
                <el-col style="margin-top:20px">
                    <el-form-item label="请选择违约原因：" prop="defaultNotch">
                        <el-checkbox v-model="row.defaultNotch">6个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口2次以上</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultCancel">
                        <el-checkbox v-model="row.defaultCancel">6个月内因各种原因导致成交后撤单2次以上</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultDelay">
                        <el-checkbox v-model="row.defaultDelay">未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultRelate">
                        <el-checkbox v-model="row.defaultRelate">如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultSubstitute">
                        <el-checkbox v-model="row.defaultSubstitute">发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultBankrupt">
                        <el-checkbox v-model="row.defaultBankrupt">申请破产保护，发生法律接管，或者处于类似的破产保护状态</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultExternal">
                        <el-checkbox v-model="row.defaultExternal">在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况， 逾期超过 90 天等），或外部评级显示为违约级别</el-checkbox>
                    </el-form-item>
                </el-col>
                </div>
                <el-col :span="7">
                    <el-form-item  label="严重程度：" prop="defaultSeverity">
                        <el-select v-model="row.defaultSeverity" placeholder="严重程度">
                            <el-option
                                v-for="item in severityOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input
                            type="textarea"
                            v-model="row.defaultRemark"
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

<script scoped>
export default {
    name:'fillDetail',
    data(){
        return{
            dialogFormVisible: false,
            ruleForm:{
                clientId:'',
                clientName:'',
                clientSex:'',
                clientIdCard:'',
                clientTel:'',
                clientEmail:'',
                clientCreated:'',
                clientRete:'',
                defaultNotch:false,
                defaultCancel:false,
                defaultDelay:false,
                defaultRelate:false,
                defaultSubstitute:false,
                defaultBankrupt:false,
                defaultExternal:false,
                defaultSeverity:'',
                defaultRemark:''
            },
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
            
        }
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
            if(this.row.defaultNotch || this.row.defaultBankrupt || this.row.defaultCancel || this.row.defaultDelay || this.row.defaultExternal || this.row.defaultRelate || this.row.defaultSubstitute){
                this.loading = true;
            this.$api.post('default/addDefault',{
                clientId:this.row.clientId,
                clientName:this.row.clientName,
                sponsorId:'SP000001',
                sponsorName:'吴大洁',
                defaultState:'0',
                defaultRemark:this.row.defaultRemark || '',
                defaultSeverity: this.row.defaultSeverity,
                defaultNotch:this.row.defaultNotch==true?'1':'0',
                defaultCancel:this.row.defaultCancel==true?'1':'0',
                defaultDelay:this.row.defaultDelay==true?'1':'0',
                defaultRelate:this.row.defaultRelate==true?'1':'0',
                defaultSubstitute:this.row.defaultSubstitute==true?'1':'0',
                defaultBankrupt:this.row.defaultBankrupt==true?'1':'0',
                defaultExternal:this.row.defaultExternal==true?'1':'0'
            }).then(res => {
                if (res.data.code == "200") {
                    console.log('申请')
                    console.log(this.row);
                    this.loading = false;
                    this.dialogFormVisible = false;
                    
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
                this.$message.error('至少选择一条违约原因！');
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
