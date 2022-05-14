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
    statuses: Object,
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
        labels: ['Done', 'No-Status','Stuck','Working on it'],
        datasets: [
          {
            backgroundColor: [
            // "#ff6961",
            // "#ffb480",
            // "#59adf6",
            "#00c875", //Done
            "#c4c4c4", // No status
            "#e2445c", // Stuck
            "#fda83d", //Working on it
            ],
            data: [this.statuses['Done'], this.statuses['No-Status'], this.statuses['Stuck'], this.statuses['Working on it']]
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
