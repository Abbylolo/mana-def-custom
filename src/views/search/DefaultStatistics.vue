<template>
  <h1>违约统计</h1>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="行业统计" name="sector">行业统计</el-tab-pane>
    <el-tab-pane label="区域统计" name="area">区域统计</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'DefaultStatistics',
  data () {
    return {
      activeName: 'sector'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
