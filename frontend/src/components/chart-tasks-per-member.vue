<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "tasks-per-member-chart",
  components: { Bar },
  props: {
    members: Array,
membersData: Object,
doneTasks: Array,
openTasks: Array,
overdueTasks: Array,
    chartId: {
      type: String,
      default: "task-per-member",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  created(){
    
  },

  data() {
    return {
      chartData: {
        labels: this.members,
        datasets: [
          {
            label: "Done",
            data: this.doneTasks, 
            backgroundColor: "#00ca72",
          },
          {
            label: "Open",
            data:  this.openTasks, 
            backgroundColor: "#ffcc00",
          },
          {
            label: "Overdue",
            data: this.overdueTasks, 
            backgroundColor: "#f62b54",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };
  },
  methods: {
 
  },

  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
