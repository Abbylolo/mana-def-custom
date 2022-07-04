<template>
    <el-page-header @back="goBack" content="违约认定申请">
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
                    <el-form-item label="客户id：" prop="clientId">
                        <div>{{ruleForm.clientId}}</div>
                        <input type="hidden" v-model="ruleForm.clientId"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="客户姓名：" prop="clientName">
                        <div>{{ruleForm.clientName}}</div>
                        <input type="hidden" v-model="ruleForm.clientName"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="性别：" prop="clientSex">
                        <div>{{ruleForm.clientSex}}</div>
                        <input type="hidden" v-model="ruleForm.clientSex"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="身份证号：" prop="clientIdCard">
                        <div>{{ruleForm.clientIdCard}}</div>
                        <input type="hidden" v-model="ruleForm.clientIdCard"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="联系方式：" prop="clientTel">
                        <div>{{ruleForm.clientTel}}</div>
                        <input type="hidden" v-model="ruleForm.clientTel"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="邮箱：" prop="clientEmail">
                        <div>{{ruleForm.clientEmail}}</div>
                        <input type="hidden" v-model="ruleForm.clientEmail"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="签约时间：" prop="clientCreated">
                        <div>{{ruleForm.clientCreated}}</div>
                        <input type="hidden" v-model="ruleForm.clientCreated"/>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="最新外部等级：" prop="clientRete">
                        <div>{{ruleForm.clientRete}}</div>
                        <input type="hidden" v-model="ruleForm.clientRete"/>
                    </el-form-item>
                </el-col>
                <el-col style="margin-top:20px">
                    <el-form-item label="违约原因：" prop="defaultNotch">
                        <el-checkbox v-model="ruleForm.defaultNotch">6个月内，交易对手技术性或资金等原因，给当天结算带来头寸缺口2次以上</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultCancel">
                        <el-checkbox v-model="ruleForm.defaultCancel">6个月内因各种原因导致成交后撤单2次以上</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultDelay">
                        <el-checkbox v-model="ruleForm.defaultDelay">未能按照合约规定支付或延期支付利息，本金或其他交付义务（不包括在宽限期内延期支付）</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultRelate">
                        <el-checkbox v-model="ruleForm.defaultRelate">如果集团（内部联系较紧密的集团）或集团内任一公司（较重要的子公司，一旦发生违约会对整个集团造成较大影响的）发生违约，可视情况作为集团内所有成员违约的触发条件</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultSubstitute">
                        <el-checkbox v-model="ruleForm.defaultSubstitute">发生消极债务置换：债务人提供给债权人新的或重组的债务，或新的证券组合、现金或资产低于原有金融义务；或为了债务人未来避免发生破产或拖欠还款而进行的展期或重组</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultBankrupt">
                        <el-checkbox v-model="ruleForm.defaultBankrupt">申请破产保护，发生法律接管，或者处于类似的破产保护状态</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="defaultExternal">
                        <el-checkbox v-model="ruleForm.defaultExternal">在其他金融机构违约（包括不限于：人行征信记录中显示贷款分类状态不良类情况， 逾期超过 90 天等），或外部评级显示为违约级别</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item  label="严重程度：" prop="defaultSeverity">
                        <el-select v-model="ruleForm.defaultSeverity" placeholder="严重程度">
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
                            v-model="ruleForm.defaultRemark"
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
    name:'fillDetail',
    data(){
        return{
            ruleForm:{
                clientId:'',
                clientName:'',
                clientSex:'',
                clientIdCard:'',
                clientTel:'',
                clientEmail:'',
                clientCreated:'',
                clientRete:'',
                defaultNotch: false,
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
            if(this.defaultNotch || this.defaultBankrupt || this.defaultCancel || this.defaultDelay || this.defaultExternal || this.defaultRelate || this.defaultSubstitute){

            }else{
                this.$message.error('至少选择一条违约原因！');
            }
        },
        onSubmit() {
        //避免重复提交
          if (this.ifSubmit == false) {
            return;
          }
          this.ifSubmit = false;
          this.loading = true;
          this.$api.post('/default/addDefault',{
            params:{
              
            }
          }).then(res => {
              if (res.code == "200") {
                this.ifSubmit = true;
                this.loading = false;
                // this.$message({
                //   message: "提交成功！",
                //   type: "success"
                // });
                this.resetForm("form");
                this.$confirm("提交申请成功", "提示", {
                  confirmButtonText: "查询违约信息",
                  cancelButtonText: "返回",
                  type: "success"
                })
                  .then(() => {

                  })
                  .catch(() => {
                    this.$router.push({
                      path: "/dataSearch"
                    });
                  });
              }
            })
            .catch(res => {
              this.ifSubmit = true;
              this.loading = false;
              this.$message.error("提交失败！");
            });
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
