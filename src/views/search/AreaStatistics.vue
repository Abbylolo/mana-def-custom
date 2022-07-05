<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
export default {
  name: 'AreaStatistics',
  data () {
    return {
      rawChartData: [],
      myChart: {},
      xData: ['2000', '2005', '2010', '2015', '2020'], // 横坐标-年份
      yData: [88, 55, 124, 66, 77], // 区域一数据
      taskData: [88, 66, 65, 67, 86], // 区域二数据
      myChartStyle: { float: 'left', width: '50%', height: '400px' }, // 图表样式
      legend: [] // 图例
    }
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      // 通过接口获取图表数据
      this.$api.get('/region/queryAllRegion', {
        params: {}
      }).then(res => {
        if (res.data.code === 200) {
          this.rawChartData = res.data.data
          // 将获取的图表数据分类整理
          this.rawChartData.forEach(item => {
            if (this.legend.indexOf(item.regionName) === -1) {
              this.legend.push(item.regionName)
            }
          })
          console.log(this.legend)
        } else {
          ElMessage({
            showClose: true,
            message: res.data.message,
            type: 'error'
          })
        }
      })

      // 处理图表数据
      const option = {
        xAxis: {
          data: this.xData
        },
        legend: { // 图例
          data: ['合肥', '杭州'],
          bottom: '0%'
        },
        yAxis: {},
        series: [
          {
            name: '合肥',
            data: this.yData,
            type: 'line',
            label: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: 16
              }
            }
          },
          {
            name: '杭州',
            data: this.taskData,
            type: 'line',
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 16
              }
            }
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById('mychart'))
      this.myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  }
}
</script>
