<template>
  <section @click="toggleShow" :class="statusClass" class="status-picker">
    <div class="status">
      {{ task.cols[3].value === "" ? "&nbsp;" : task.cols[3].value }}
    </div>
    <div v-if="menuOpen" class="picker-box">
      <!-- TODO - change back to working on it -->
      <div @click="setPriority('Medium')" class="medium">Medium</div>
      <div @click="setPriority('High')" class="high">High</div>
      <div @click="setPriority('Low')" class="low">Low</div>
      <div @click="setPriority('&nbsp;')" class="empty">&nbsp;</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "priority-picker",
  emits: ["update-priority", "add", "remove", "update-date", 'updateTask'],
  props: {
    task: Object,
    group: Object,
    boardMembers: Object
  },
  data() {
    return {
      menuOpen: false,
      currStatus: null,
    };
  },
  methods: {
    toggleShow() {
      this.menuOpen = !this.menuOpen;
    },
    setPriority(status) {
      const board = this.$store.getters.currBoard;
      const task = JSON.parse(JSON.stringify(this.task));
      task.cols[3].value = status;
      this.$emit("update-priority", task, this.group.id);
    },
  },
  computed: {
    statusClass() {
      if (this.task.cols[3].value === "Working on it") return "medium";
      if (this.task.cols[3].value === "&nbsp;") return "null";
      if (this.task.cols[3].value === null) return "empty";
      if (this.task.cols[3].value === "") return "empty";

      return this.task.cols[3].value.toLowerCase();
    },
  },
  created() {
    if (!this.task.cols[3].value) this.task.cols[3].value = "";
  },
};
</script>
