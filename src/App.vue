<template>
  <div class="app">
    <div class="option">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  beforeCreated () {
    this.prototype.$bus = this
  }
}
</script>
  html,body,#app {
    height: 100%;
  }
<style>
</style>
