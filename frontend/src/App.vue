<template>
  <section class="app-container container">
    <app-sidebar />
    <board-sidebar :boards="boards"/>
    <router-view />
  </section>
</template>

<script>
import appSidebar from "./components/app-sidebar.vue";
import boardSidebar from "./components/board-sidebar.vue";
import group from "./components/group/group.vue";
export default {
  name: "app",
  created() {
    this.$store.dispatch({ type: "loadBoards" });
  },
  methods: {},
  components: {
    appSidebar,
    boardSidebar,
    group,
  },

  computed:{
    boards(){
      // console.log('BOARDS', this.$store.getters.boards)
      return this.$store.getters.boards
    }
  }
};
</script>
