<template>
  <div class="header">
    <div class="header-logo">
      <img src="../assets/pics/comp-logo.png" alt="logo图片加载失败" />
    </div>
    <div class="header-line"></div>
    <!-- WWWWWWWWWWW -->
    <div class="option">
      <router-link to="/">登录</router-link> |
      <router-link to="/register">注册</router-link>
    </div>
    <!-- WWWWWWWWWWW -->
  </div>
  <div class="main">
    <img src="../assets/pics/background.png" />
    <LoginForm></LoginForm>
    <div id="hello">
      <p>Hello,</p>
      <p>Welcome道海琴天!</p>
    </div>
    <div id="content">
      <p>印染/纺织/仪器/印染/纺织/仪器</p>
    </div>
    <div id="footer">
      <p>Copyright © 浙江道海琴天网络有限公司 . 版权所有 浙ICP备08101609 号</p>
    </div>
   </div>
  <router-view/>
</template>

<script>
  import LoginForm from "../components/entrance/LogForm.vue"

  export default {
    name: 'Login',
    components: {
      LoginForm
    }
  }
</script>

<style>
  .header {
    position: absolute;
    top:78px;
    background-color: white;
  }

  .main {
    background-image: url(../assets/pics/background.png);
    background: no-repeat;
  }

  .header-logo {
    width: 196px;
    height: 52px;
    position: absolute;
    left: 360px;
  }

  .header-line {
    width: 0px;
    height: 28px;
    border: 1px solid #DDDDDD;
    opacity: 1;
    position: absolute;
    left: 575.5px;
    top: 10px;
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

  .option{
    position: relative;
    top:23px;
    left: 595px;
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
    font-size: 20px;
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
    font-size: 15px;
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

</style>
