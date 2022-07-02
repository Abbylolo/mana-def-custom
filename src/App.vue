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
  }
}
</script>

<style>
</style>
