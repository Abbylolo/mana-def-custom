<template>
  <div class="echart" id="pieReSector" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      pieReSector: {},
      pieData: [
        {
          value: 256,
          name: '教育'
        },
        {
          value: 258,
          name: '计算机'
        }
      ],
      pieName: [],
      myChartStyle: { float: 'left', width: '50%', height: '400px' } // 图表样式
    }
  },
  mounted () {
    this.initDate() // 数据初始化
    this.initEcharts()
  },
  methods: {
    initDate () {
      for (let i = 0; i < this.pieData.length; i++) {
        // this.xData[i] = i;
        // this.yData =this.xData[i]*this.xData[i];
        this.pieName[i] = this.pieData[i].name
      }
    },
    initEcharts () {
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName,
          right: '10%',
          top: '30%',
          orient: 'vertical'
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: '各行业违约主体个数占比',
          top: '0%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: '{b} : {c} ({d}%)' // b代表名称，c代表对应值，d代表百分比
            },
            radius: '30%', // 饼图半径
            data: this.pieData
          }
        ]
      }
      console.log(this.seriesData)
      this.pieReSector = echarts.init(document.getElementById('pieReSector'))
      this.pieReSector.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        this.pieReSector.resize()
      })
    }
  }
}
</script>
