<template>
  <section class="app-container container">
      <app-sidebar />
      <border-list />
    <router-view />
  </section>
</template>

<script>
import appSidebar from "./components/app-sidebar.vue";
import borderList from "./components/board-list.vue";
import group from "./components/group/group.vue";
export default {
  name: "app",
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
  methods: {},
  components: {
    appSidebar,
    borderList,
    group,
  },
};
</script>
