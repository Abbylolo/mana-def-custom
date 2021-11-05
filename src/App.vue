<template>
  <div class="app">
    <div class="option">
    <!--  <router-link to="/Login">登录</router-link>
      <router-link to="/register">注册</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
// import Login from './views/Login.vue'

export default {
  name: 'app',
  // components:{
  //   Login
  // },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>
  /* .option{
    position: relative;
    top:23px;
    left: 595px;
  } */

</style>
