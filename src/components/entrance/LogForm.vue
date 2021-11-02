<template>
  <div class="login-wrap">
    <div class="login-text">登录</div>
    <div class="register-text">注册</div>
    <div class="qrcode">
      <img src="../../assets/pics/qrcode.png" alt="二维码图片加载失败" />
    </div>
    <div class="path-login-bar"></div>
    <div class="path-bar"></div>
    <br/>
    <div class="log-main">
      <input class="user-form-item" placeholder="请输入手机号/邮箱"/>
      <input type="password" class="pass-form-item" placeholder="请输入登录密码" />
      <!-- </div><div></div> -->
      <input type="checkbox" id="auto-log-check" />
      <label class="auto-log" for="auto-log-check">一周内自动登录</label>
      <label id="veri-code-log">验证码登录</label>
      <button id="login-button">登录</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'LoginForm'
}
</script>

<style type="text/css">
  .login-wrap {
    width: 497px;
    height: 521px;
    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 6px;
    position: relative;
    top: 18.46%;
    left: 1063px;
  }

  .login-text {
    width: 36px;
    height: 27px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    line-height: 0px;
    color: #EC5E2C;
    opacity: 1;
    position: relative;
    top: 8.45%;
    left: 22.44%;
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
    top: 8.45%;
    left: 67.92%;
  }

  .qrcode {
    transform: scale(0.83);
    position: absolute;
    right: 1%;
    top: 1%;
  }

  .path-bar {
    width: 99%;
    height: 0px;
    border: 1px solid #C9C9C9;
    opacity: 1;
    position: absolute;
    top: 16.89%;
  }

  .path-login-bar {
    width: 115px;
    height: 4px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 0px;
    position: absolute;
    top: 16.12%;
    left: 14.4%;
  }

  .log-main {
    position: absolute;
    top: 24%;
    /* margin-left: 20pt; */
    /* text-align: center; */
    /* align:center; */
    display: flex;
    justify-content: center;
  }

  .user-form-item {
    position: absolute;
    align-items: center;
    background-image: url(../../assets/pics/user-icon.png);
    background-position: 0.8125rem 0.8125rem;
    background-repeat: no-repeat;
    /* display:block;
    margin-left:auto;
    margin-right:auto; */
  }

  .pass-form-item {
    position: absolute;
    top: 105px;
    background: url(../../assets/pics/pass-icon.png) no-repeat;
    background-position: 0.75rem 0.8125rem;
  }

  #auto-log-check {
    position: relative;
    top: 49.32%;
    left: 4.5625rem;
    height: 0.75rem;
    width: 0.75rem;
    background-color: #EC5E2C;
  }

  .auto-log {
    width: 112px;
    height: 24px;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #888888;
    opacity: 1;
    position: absolute;
    left: 5.9375rem;
    top: 11rem;
  }

  #veri-code-log {
    width: 80px;
    height: 24px;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    line-height: 0px;
    color: #EC5E2C;
    opacity: 1;
    position: absolute;
    top: 11rem;
    left: 21.625rem;
  }

  #login-button {
    width: 354px;
    height: 46px;
    background: #EC5E2C;
    opacity: 1;
    border-radius: 4px;
    position: absolute;
    top: 13.8125rem;
    left: 4.5625rem;
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
