<template>
  <div class="container">
    <!-- 页首 -->
    <div class="header d-none">
      <div class="header-logo">
        <img src="../assets/pics/comp-logo.png" alt="logo图片加载失败" />
      </div>
      <div class="header-line"></div>
      <label class="head-title" :style="isLogForm">登录</label>
      <label class="head-title" :style="isVericodeForm">登录</label>
      <label class="head-title" :style="isQRCodeForm">登录</label>
      <label class="head-title" :style="isRegisterForm">注册</label>
    </div>
    <!-- 页中 -->
    <div class="main">
      <div id="hello">
        <p>Hello,</p>
        <p>Welcome道海琴天!</p>
      </div>
      <div id="content">
        <p>印染/纺织/仪器/印染/纺织/仪器</p>
      </div>
      <div class="login-register-wrapper">
        <div class="login-register-tab">
          <div class="login-text" :class="{'color-active':isLogin}" @click="loginSelect()">
            登录
          </div>
          <div class="register-text" :class="{'color-active':isRegister}" @click="registerSelect()">
            注册
          </div>
          <div :class="{'path-login-bar':isLogin}"></div>
          <div :class="{'path-register-bar':isRegister}"></div>
        </div>
        <div class="qrcode" @click="qrcodeSelect()">
          <img src="../assets/pics/qrcode.png" alt="二维码图片加载失败" />
        </div>
        <div class="path-bar"></div>
        <br/>
        <!-- 各大表单 -->
        <form method="post" @submit="checkForm">
          <ul>
            <li v-for="error in errors">{{error}}</li>
          </ul>
          <!-- 密码登录表单 -->
          <div class="log-form" :style="isLogForm" >
            <input class="user-form-item" placeholder="请输入手机号/邮箱" v-model.trim="phoneNumberOrEmail"/>
            <input type="password" class="pass-form-item" placeholder="请输入登录密码" v-model.trim="password"/>
            <div class="select-line">
              <input type="checkbox" id="auto-log-check" v-model="autoLogin"/>
              <label class="auto-log" for="auto-log-check" >一周内自动登录</label>
              <label class="veri-code-login" @click="vericodeSelect()">验证码登录</label>
            </div>
            <button class="login-button" type="submit">登录</button>
          </div>
          <!-- 验证码登录表单 -->
          <div class="verification-code-form" :style="isVericodeForm">
            <input class="user-form-item" placeholder="请输入手机号/邮箱" v-model.trim="phoneNumberOrEmail"/>
            <div class="verification-code-line">
              <input class="verification-code-form-item" placeholder="请输入验证码" v-model.trim="veriCode"/>
              <button class="verification-code-button">获取验证码</button>
            </div>
            <div class="select-line">
              <input type="checkbox" id="auto-log-check" v-model="autoLogin"/>
              <label class="auto-log" for="auto-log-check" >一周内自动登录</label>
              <label class="password-login" @click="loginSelect()">密码登录</label>
            </div>
            <button class="login-button" type="submit">登录</button>
          </div>
          <!-- 二维码登录 -->
          <div class="qrcode-form" :style="isQRCodeForm">
            <img src="../assets/pics/real_qrcode.jpg" alt="二维码加载失败" />
          </div>
          <!-- 注册表单 -->
          <div class="register-form" :style="isRegisterForm">
            <input class="user-form-item" placeholder="请输入手机号/邮箱" v-model.trim="phoneNumberOrEmail"/>
            <div class="verification-code-line">
              <input class="verification-code-form-item" placeholder="请输入验证码" v-model.trim="veriCode"/>
              <button class="verification-code-button">获取验证码</button>
            </div>
            <input type="password" class="pass-form-item" placeholder="密码(6-16个字符组成,区分大小写)" v-model.trim="password"/>
            <input type="password" class="pass-form-item" placeholder="请再次输入密码" v-model.trim="confirmPassword"/>
            <div class="select-line">
              <input type="checkbox" id="auto-log-check" v-model="autoLogin"/>
              <label class="auto-log" for="auto-log-check" >一周内自动登录</label>
              <label class="veri-code-login" @click="vericodeSelect()">验证码登录</label>
            </div>
            <button class="register-button" type="submit">注册</button>
          </div>
        </form>
      </div>
      <!-- 页尾 -->
      <div id="footer">
        <p>Copyright © 浙江道海琴天网络有限公司 . 版权所有 浙ICP备08101609 号</p>
      </div>
     </div>
  </div>
</template>

<script>
// import LoginForm from "../components/entrance/LogForm.vue"
const apiUrl = ''
export default {
  name: 'Login',
  data () {
    return {
      // 以下数据设置是为实现tab页面的切换
      isLogin: true, // 登陆界面
      isRegister: false, // 注册界面
      isLogForm: '',
      isRegisterForm: 'display: none;',
      isVericodeForm: 'display: none;',
      isQRCodeForm: 'display: none;',
      // 各大参数
      phoneNumberOrEmail: '',
      password: '',
      confirmPassword: '',
      veriCode: '',
      autoLogin: false,
      // 报错
      errors: []
    }
  },
  methods: {
    // 以下数据设置是为实现tab页面的切换
    loginSelect () {
      this.isLogin = true
      this.isRegister = false
      this.isLogForm = ''
      this.isRegisterForm = ''
      this.isVericodeForm = 'display: none;'
      this.isQRCodeForm = 'display: none;'
    },
    registerSelect () {
      this.isRegister = true
      this.isLogin = false
      this.isLogForm = 'display: none;'
      this.isRegisterForm = ''
      this.isVericodeForm = 'display: none;'
      this.isQRCodeForm = 'display: none;'
    },
    vericodeSelect () {
      this.isLogin = true
      this.isRegister = false
      this.isLogForm = 'display:none'
      this.isRegisterForm = 'display: none;'
      this.isVericodeForm = ''
      this.isQRCodeForm = 'display: none;'
    },
    qrcodeSelect () {
      this.isLogin = true
      this.isRegister = false
      this.isLogForm = 'display:none'
      this.isRegisterForm = 'display: none;'
      this.isVericodeForm = 'display: none;'
      this.isQRCodeForm = ''
    },
    // 表单验证方法
    checkForm (e) {
      // 密码登录验证
      if (this.isLogForm === '') {
        if (this.phoneNumberOrEmail === '') {
          this.errors.push('手机号/邮箱不能为空!')
        } else if (this.password === '') {
          this.errors.push('密码不能为空!')
        } else if (this.password.length < "6" || this.password.length > "16") {
          this.errors.push('密码长度为6-16位')
        } else {
          fetch(apiUrl)
          .then(async res => {
            if (res.status === 200) {
              alert('登录成功');
            } else if (res.status === 401) {
              let errorResponse = await res.json();
              this.errors.push(errorResponse.error);
            }
          });
        }
      } else if (this.isRegisterForm == "") { //注册验证
        if(this.phoneNumberOrEmail == "") {
          this.errors.push("手机号/邮箱不能为空!");
        } else if(this.veriCode == "") {
          this.errors.push("验证码不能为空")
        } else if(this.password == "" || this.confirmPassword) {
          this.errors.push("密码和确认密码不能为空!");
        } else if(this.password.length < "6" || this.password.length > "16") {
          this.errors.push("密码长度为6-16位");
        } else if(this.password == this.confirmPassword) {
          this.errors.push("密码和确认密码不一致")
        }else{
          return true;
        }
      }
      e.preventDefault();
    },
    // 邮箱校验方法
    validateEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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
  .container {
    display: flex;
    flex-direction: column;
   /* width: 100%;
    min-height: 100vh; */
    overflow-wrap: break-word;
    margin: 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height:77px;
    background-color: #FFFFFF;
    margin-top: 0px;
    margin-left: 10vw;
  }

  .main {
    background: url(../assets/pics/background.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 7%;
    margin-bottom: 0px;
    width: 100vw;
    height: 1002px;
  }

  .header-logo {
    width: 196px;
    height: 52px;
  }

  .header-line {
    width: 0px;
    height: 28px;
    border: 1px solid #DDDDDD;
    opacity: 1;
  }

  .head-title {
    font-size: 22px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #353535;
    opacity: 1;
  }

  #header a {
    width: 44px;
    height: 33px;
    font-size: 22px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #353535;
    opacity: 1;
  }

  #header a.router-link-exact-active {
    color: #ec5e2c;
  }

  #hello{
    width: 545px;
    height: 174px;
    font-size: 3.125rem;
    font-family: Source Han Sans SC;
    font-weight: bold;
    line-height: 40px;
    color: #FFFFFF;
    letter-spacing: 5px;
    opacity: 1;
    position: absolute;
    top: 30.46%;
    left: 18.75%;
  }

  #content{
    width: 311px;
    height: 29px;
    font-size: 1.25rem;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #FFFFFF;
    letter-spacing: 1px;
    opacity: 1;
    position: absolute;
    top: 55.46%;
    left: 18.75%;
  }

  #footer{
    width: 550px;
    height: 22px;
    font-size: 0.9375rem;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #FFFFFF;
    letter-spacing: 1px;
    opacity: 1;
    position: absolute;
    bottom: 39px;
    left: 35.67%;
  }

  /* 登录注册框 */
  .login-register-wrapper {
    width: 497px;
    height: 621px;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 6px;
    position: relative;
    top: 18.46%;
    left: 58%;
  }

  /* 表单元素大框 */
  .log-form, .verification-code-form, .register-form, .qrcode-form {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
  }

  /* 表单头 */
  .login-text {
    width: 36px;
    height: 27px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #999999;
    opacity: 1;
    position: relative;
    top: 44px;
    left: 112px;
  }

  .register-text {
    width: 36px;
    height: 27px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #999999;
    opacity: 1;
    position: absolute;
    top: 44px;
    left: 338px;
  }

  .color-active {
    color: #EC5E2C;
  }

  .qrcode {
    transform: scale(0.83);
    position: absolute;
    right: 4px;
    top: 5px;
  }

  .path-bar {
    width: 100%;
    height: 0px;
    border: 1px solid #C9C9C9;
    opacity: 1;
    position: absolute;
    top: 88px;
  }

  .path-login-bar {
    width: 115px;
    height: 4px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 0px;
    position: absolute;
    top: 84px;
    left: 72px;
  }

  .path-register-bar {
    width: 115px;
    height: 4px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 0px;
    position: absolute;
    top: 84px;
    left: 302px;
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
    background-color: #EC5E2C;
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
    color: #EC5E2C;
    opacity: 1;
  }

  .login-button,  .register-button{
    width: 354px;
    height: 46px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 4px;
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
    padding-top:0.625rem;
    padding-left: 2.8125rem;
  }

  /* 验证码表单样式 */
  .verification-code-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    width: 353px;
    margin-bottom: 30px;
  }
  .verification-code-form-item {
    background-image: url(../assets/pics/vericode-icon.png);
    background-position: 13px 13px;
    background-repeat: no-repeat;
    margin-right: 7px;
  }

  .verification-code-button {
    width: 150px;
    height: 43px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 0px;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #FFFFFF;
    opacity: 1;
  }

  /* 二维码登录样式 */
  .qrcode-form {
    margin-top: 0;
  }
  .qrcode-form img{
    transform: scale(0.5);
  }

  /* 注册表单样式 */


</style>
