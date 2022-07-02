<template>
  <!-- 页中 -->
  <div class="main">
    <div id="hello">
      <img src="../assets/pics/main.png" alt="图片走丢啦" style="width:100%"/>
    </div>
    <div class="login-register-wrapper">
      <div class="login-register-tab">
        <div class="login-text">
          违约用户管理系统
        </div>
      </div>
      <br />
      <!-- 各大表单 -->
      <form method="post" @submit="checkForm">
        <!-- 密码登录表单 -->
        <div class="log-form" :style="isLogForm">
          <input class="user-form-item" placeholder="请输入手机号" v-model.trim="phoneNumber" />
          <input type="password" class="pass-form-item" placeholder="请输入登录密码" v-model.trim="password" />
          <!-- <div class="select-line"> -->
          <!-- <input type="checkbox" id="auto-log-check" v-model="autoLogin"/> -->
          <!-- <label class="auto-log" for="auto-log-check" >一周内自动登录</label> -->
          <!-- <label class="veri-code-login" @click="vericodeSelect()">验证码登录</label> -->
          <!-- </div> -->
          <button class="login-button" type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRefHistory } from '@vueuse/core'

// import LoginForm from "../components/entrance/LogForm.vue"
const apiUrl = ''
export default {
  name: 'Login',
  data () {
    return {
      // 各大参数
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      autoLogin: false,
      // 报错
      errors: []
    }
  },
  methods: {
    // 表单验证方法
    checkForm (e) {
      // 密码登录验证
      if (this.phoneNumber === '') {
        this.errors.push('手机号/邮箱不能为空!')
      } else if (this.password === '') {
        this.errors.push('密码不能为空!')
      } else if (this.password.length < '6' || this.password.length > '16') {
        this.errors.push('密码长度为6-16位')
      } else {
        new Promise(apiUrl).then(res => {
          if (res.status === 200) {
            this.$router.push("/index")
          } else if (res.status === 401) {
            const errorResponse = res.json()
            this.errors.push(errorResponse.error)
          }
        })
      }
      e.preventDefault()
    }
  }
}
</script>

<style>


  *,::after,::before{
    box-sizing: border-box;
  }

  @media (max-width:196px) {
    .d-none {
    display: none;
    }
  }

  /* 总布局 */
  .main {
    background: #658dfb;
    background-size: 100% 100%;
    position: absolute;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    overflow-wrap: break-word;
  }

  #hello{
    /* background: url(../assets/pics/main.png) no-repeat; */
    width: 50%;
    color: #FFFFFF;
    opacity: 1;
    justify-content: center;
  }

  /* 登录注册框 */
  .login-register-wrapper {
    width: 497px;
    height: 500px;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 20px;
  }

  /* 表单元素大框 */
  .log-form{
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
  }

  /* 表单头 */
  .login-text {
    height: 27px;
    font-size: 30px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #050000;
    opacity: 1;
    position: relative;
    top: 50px;
    justify-content: center;
    display: flex;
  }

  /* 登录表单样式 */
  .user-form-item {
    background-image: url(../assets/pics/user-icon.png);
    background-position: 13px 13px;
    background-repeat: no-repeat;
    margin-bottom: 30px;
  }

  .pass-form-item {
    background: url(../assets/pics/pass-icon.png) no-repeat;
    background-position: 12px 13px;
    margin-bottom: 30px;
  }

  .select-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    width: 353px;
    margin-bottom: 30px;
  }

  #auto-log-check {
    height: 12px;
    width: 12px;
    background-color: #658dfb;
  }

  .auto-log {
    position: absolute;
    left: 95px;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #888888;
    opacity: 1;
  }

  .veri-code-login, .password-login{
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #658dfb;
    opacity: 1;
  }

  .login-button{
    width: 354px;
    height: 46px;
    background: #658dfb;
    opacity: 1;
    border-radius: 4px;
    border-color: #ffffff;
    text-align:center;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #FFFFFF;
    letter-spacing: 10px;
  }

  input {
    width: 22.0625rem;
    height: 2.875rem;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    opacity: 1;
    border-radius: 0px;
    padding-left: 2.8125rem;
  }
</style>
