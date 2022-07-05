<template>
  <div class="echart" id="reSectorStatistic" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
export default {
  name: 'ReSectorStatistic',
  data () {
    return {
      rawChartData: [],
      myChart: {},
      xData: ['2000', '2005', '2010', '2015', '2020'], // 横坐标-年份
      yData: [45, 33, 56, 89, 33], // 行业一数据
      taskData: [34, 24, 79, 44, 77], // 行业二数据
      myChartStyle: { float: 'left', width: '100%', height: '400px' }, // 图表样式
      legend: [] // 图例
    }
  },
  mounted () {
    this.initEcharts()
  },
  methods: {
    initEcharts () {
      // 通过接口获取图表数据
      this.$api.get('/industry/queryAllIndustry', {
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
          data: ['教育', '计算机'],
          bottom: '0%'
        },
        yAxis: {},
        series: [
          {
            name: '教育',
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
            name: '计算机',
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
      this.myChart = echarts.init(document.getElementById('reSectorStatistic'))
      this.myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    }
  }
}
</script>
