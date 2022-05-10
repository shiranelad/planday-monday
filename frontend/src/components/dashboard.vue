<template>
  <section class="dashboard flex space-between justify-center">
    <article class="bar-tasks-per-member">
      <h3 class="dash-header">Open/Closed/Overdue tasks per team member</h3>
      <chart-tasks-per-member
        :members="members"
        :membersData="getPerMemberData"
        :doneTasks="doneTasks"
        :openTasks="openTasks"
        :overdueTasks="overdueTasks"
      ></chart-tasks-per-member>
    </article>
    <article class="bar-tasks-per-group">
      <h3 class="dash-header">High Risk Tasks</h3>
      <chart-high-risk
        :groups="groups"
        :groupDate="getPerGroupData"
        :emptyTasks="emptyTasks"
        :stuckTasks="stuckTasks"
        :overdueGroupTasks="overdueGroupTasks"
      ></chart-high-risk>
    </article>
  </section>
</template>

<script>
import chartTasksPerMember from "../components/chart-tasks-per-member.vue";
import chartHighRisk from "../components/chart-high-risk.vue";

export default {
  props: { board: Object },
  name: "dashboard",
  components: {
    chartTasksPerMember,
    chartHighRisk,
  },
  created() {
    // this.getLabelsPrices();
    // this.getLabelsInv();
  },
  data() {
    return {
      doneTasks: [],
      openTasks: [],
      overdueTasks: [],
      emptyTasks: [],
      stuckTasks: [],
      overdueGroupTasks: [],
    };
  },
  methods: {},

  computed: {
    getPerMemberData() {
      const memberCount = []; // [{member: 'Shiran Elad', done: 20, open: 10, overdue: 2 }, {}]
      // console.log(this.members);
      this.members.map((m) =>
        memberCount.push({
          member: m,
          doneTasks: 0,
          openTasks: 0,
          overdueTasks: 0,
        })
      );
      // console.log(memberCount);
      memberCount.map((member) =>
        this.board.groups.map((group) =>
          group.tasks.map((task) => {
            task.cols[1].value.map((person) => {
              if (
                person.fullname === member.member &&
                task.cols[0].value.toLowerCase() === "done"
              ) {
                // console.log(task.title, person.fullname)
                member["doneTasks"]++;
              }
              if (
                person.fullname === member.member &&
                task.cols[0].value.toLowerCase() !== "done"
              )
                member["openTasks"]++;
              if (
                person.fullname === member.member &&
                task.cols[0].value.toLowerCase() !== "done" &&
                new Date(task.cols[2].value) < Date.now()
              )
                member["overdueTasks"]++;
            });
          })
        )
      );
      // DO NOT TOUCH //
      this.doneTasks = memberCount.map((m) => m.doneTasks);
      this.openTasks = memberCount.map((m) => m.openTasks);
      this.overdueTasks = memberCount.map((m) => m.overdueTasks);
    },

    getPerGroupData() {
      var groupCount = [];
      const board = JSON.parse(JSON.stringify(this.board));
      board.groups.map((g) => {
        // console.log(board, groupCount);
        // console.log(g);
        var emptyTasks = 0;
        var stuckTasks = 0;
        var overdueGroupTasks = 0;
        g.tasks.map((task) => {
          if (
            task.cols[3].value?.toLowerCase() === "high" &&
            (task.cols[0].value?.toLowerCase() === "empty" ||
              !task.cols[0].value)
          ) {
            emptyTasks++;
          }

          if (
            task.cols[3].value?.toLowerCase() === "high" &&
            task.cols[0].value?.toLowerCase() === "stuck"
          ) {
            stuckTasks++;
          }
          if (
            task.cols[3].value?.toLowerCase() === "high" &&
            task.cols[0].value?.toLowerCase() !== "done" &&
            new Date(task.cols[2].value) < Date.now()
          ) {
            overdueGroupTasks++;
          }
          });
          groupCount.push({
            group: g.title,
            emptyTasks,
            stuckTasks,
            overdueGroupTasks,
        });
      });

      console.log(groupCount);
  

      // // DO NOT TOUCH //

      this.emptyTasks = groupCount.map((g) => g.emptyTasks);
      this.stuckTasks = groupCount.map((g) => g.stuckTasks);
      this.overdueGroupTasks = groupCount.map((g) => g.overdueGroupTasks);
    },

    members() {
      return this.board.members.map((member) => member.fullname);
    },
    groups() {
      return this.board.groups.map((group) => group.title);
    },
  },
  unmounted() {},
};
</script>
