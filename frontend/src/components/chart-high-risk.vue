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
    groups: Array,
    groupsData: Object,
    emptyTasks: Array,
    stuckTasks: Array,
    overdueGroupTasks: Array,
    chartId: {
      type: String,
      default: "task-per-group",
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
  created() {},

  data() {
    return {
      chartData: {
        labels: this.groups,
        datasets: [
          {
            label: "Not started",
            data: this.emptyTasks,
            backgroundColor: "#00ca72",
          },
          {
            label: "Stuck",
            data: this.stuckTasks,
            backgroundColor: "#ffcc00",
          },
          {
            label: "Overdue",
            data: this.overdueGroupTasks,
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
  methods: {},

  computed: {
    board() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
