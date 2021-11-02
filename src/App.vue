<template>
  <div id="home">
    <div class="option">
      <h1>hhhhh</h1>
      <router-link to="/login">登录</router-link> |
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import Login from './views/Login.vue'

export default {
  name: 'home',
  components:{
    Login
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }    
}
</script>

<style>
#home {
}
</style>
