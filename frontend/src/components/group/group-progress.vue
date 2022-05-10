<template>
  <section class="status-bar">
    <div class="left-side"></div>
    <div class="right-side flex">
      <div class="status-container">
        <ul class="clean-list flex">
          <li v-for="(status, idx) in sortStatus" :key="idx">
            <div
              :style="{
                width: (1 / sortStatus.length) * 100 + 'px',
                height: '30px',
              }"
              :class="[status, 'bar']"
            >
              &nbsp;
            </div>
          </li>
        </ul>
      </div>
      <div class="member-picker"></div>
      <div class="date-picker"></div>
        <ul class="clean-list flex status-container">
          <li v-for="(priority, idx) in sortPriority" :key="idx">
            <div
              :style="{
                width: (1 / sortPriority.length) * 100 + 'px',
                height: '30px',
              }"
              :class="[priority, 'bar']"
            >
              &nbsp;
            </div>
          </li>
        </ul>
      </div>
  </section>
</template>

<script>
// import chart from './chart.vue'

export default {
  name: "group-progress",
  props: {
    tasks: Array,
  },

  computed: {
    sortStatus() {
      return this.tasks
        .map((task) => {
         
          return task.cols[0].value.toLowerCase();
        })
        .sort();
    },
    sortPriority() {
      return this.tasks
        .map((task) => {
          // console.log(task.cols);
          return task.cols[3].value.toLowerCase();
        })
        .sort();
    },
  },
};
</script>

<style></style>
