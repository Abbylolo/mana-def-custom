<template>
  <div id="register-wrap">
    <div id="register-header">
      <div class="login-text">登录</div>
      <div class="register-text">注册</div>
      <div class="qrcode">
        <img src="../assets/pics/qrcode.png" alt="二维码图片加载失败" />
      </div>
      <div class="path-register-bar"></div>
      <div class="path-bar"></div>
    </div>
    <!-- 注册表单 -->
    <div id="register-main">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            class="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="请再次输入密码"
            class="password-confrim"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Submit</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("Two inputs don't match!"))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    }
  }
</script>

<style>
  @import url("//unpkg.com/element-plus/dist/index.css");

  #register-wrap {
    position: absolute;
    top: 11.5625rem;
    left: 56.25rem;
    width: 31.0625rem;
    height: 40.4375rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 6px;
  }

  .login-text {
    width: 36px;
    height: 27px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #999999;
    opacity: 1;
  }

  .register-text {
    width: 36px;
    height: 27px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #EC5E2C;
    opacity: 1;
  }

  .path-register-bar {
    width: 115px;
    height: 4px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 0px;
    position: absolute;
    top: 5.25rem;
    left: 18.875rem;
  }

  #register-main {
    position: absolute;
    top: 7.8125rem;
    left: 4.5625rem;
  }

  /* 表单 */
  .demo-ruleForm {
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #C9C9C9;
    opacity: 1;
  }

  .password .password-confrim{
    width: 22.0625rem;
    height: 2.875rem;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    opacity: 1;
    border-radius: 0px;
    position: absolute;
    left: 4.5rem;
  }

  .password {
    top: 10.375rem;
  }

</style>
