<template>
  <h3>区域统计(违约主体个数)</h3>
  <div style="float:left;width:100%">
    <AreaStatistics></AreaStatistics>
    <PieAreaStatistics></PieAreaStatistics>
  </div>
  <h3>区域统计(违约重生主体个数)</h3>
  <div style="float:left;width:100%">
    <ReAreaStatistics></ReAreaStatistics>
    <PieReAreaStatistics></PieReAreaStatistics>
  </div>
  <h3>行业统计(违约主体个数)</h3>
  <SectorStatistic></SectorStatistic>
  <PieSectorStatistics></PieSectorStatistics>
  <h3>行业统计(违约重生主体个数)</h3>
  <ReSectorStatistic></ReSectorStatistic>
  <PieReSectorStatistics></PieReSectorStatistics>
  <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="行业统计" name="sector">
      行业统计(违约主体个数)
      <AreaStatistics></AreaStatistics>
      行业统计(违约重生主体个数)
      <ReAreaStatistics></ReAreaStatistics>
      <SectorStatistic></SectorStatistic>
    </el-tab-pane>
    <el-tab-pane label="区域统计" name="area">
      区域统计
      <AreaStatistics></AreaStatistics>
      111
    </el-tab-pane>
    </el-tabs> -->
</template>
<script>
import SectorStatistic from './SectorStatistic'
import AreaStatistics from './AreaStatistics'
import ReAreaStatistics from './ReAreaStatistics'
import ReSectorStatistic from './ReSectorStatistic'
import PieAreaStatistics from './pieChart/PieAreaStatistics'
import PieReAreaStatistics from './pieChart/PieReAreaStatistics'
import PieSectorStatistics from './pieChart/PieSectorStatistics'
import PieReSectorStatistics from './pieChart/PieReSectorStatistics'
export default {
  name: 'DefaultStatistics',
  data () {
    return {
      activeName: 'sector'
    }
  },
  components: {
    SectorStatistic,
    AreaStatistics,
    ReAreaStatistics,
    ReSectorStatistic,
    PieAreaStatistics,
    PieReAreaStatistics,
    PieSectorStatistics,
    PieReSectorStatistics
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
