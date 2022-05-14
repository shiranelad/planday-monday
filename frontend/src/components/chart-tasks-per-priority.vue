<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    priorities: Object,
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
  },
  data() {
    return {
      chartData: {
        labels: ['Low', 'No-Status','High','Medium'],
        datasets: [
          {
            backgroundColor: [
            "#93bd3a", //Low
            "#c4c4c4", // No status
            "#ec3390", // High
            "#68a1bd", //Medium
            ],
            data: [this.priorities['Low'], this.priorities['No-Status'], this.priorities['High'], this.priorities['Medium']]
          }
        
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }},
      }
    }
  }
}
</script>
