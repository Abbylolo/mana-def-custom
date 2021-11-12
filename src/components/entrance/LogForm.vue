<template>
  <<div class="log-form" style="display: none;">
          <input class="user-form-item" placeholder="请输入手机号/邮箱"/>
          <input type="password" class="pass-form-item" placeholder="请输入登录密码" />
          <!-- </div><div></div> -->
          <div class="select-line">
            <input type="checkbox" id="auto-log-check" />
            <label class="auto-log" for="auto-log-check">一周内自动登录</label>
            <label class="veri-code-login">验证码登录</label>
          </div>
          <button class="login-button">登录</button>
        </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'LoginForm'
}
</script>

<style type="text/css">
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
  
</style>
