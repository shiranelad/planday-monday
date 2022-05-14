<template>
  <section class="dashboard flex align-center justify-center wrap">
    <article class="flex justify-center align-center gap-50 kpis wrap">
      <div class="dashboard-header flex align-center justify-center col border">
        <h3 style="font-size: 48px">{{ taskCount }} Tasks</h3>
      </div>

      <div
        class="task-count flex align-center justify-center col border gap-30"
      >
        <h2 class="done-kpi">
          {{ ((doneTasks.length / taskCount) * 100).toFixed(0) }}%
          <span class="done-kpi">Done </span>
        </h2>

        <h2 class="high-kpi">
          {{ ((getHighTasks / taskCount) * 100).toFixed(0) }}% High
          <span style="font-size: 24px">(Open)</span>
        </h2>
      </div>

      <div class="members flex align-center justify-center border col">
        <h2 >{{ members.length }} Members</h2>
        <last-seen :members="board.members" class="members-kpi" />
      </div>
    </article>
    <div class="doughnuts flex align-center wrap space-between">
      <article class="doughnut-tasks-per-status flex col space-between">
        <h2 class="dash-header" title="Chart displays tasks per status" >
          Tasks per Status
        </h2>

        <chart-tasks-per-status
          :statuses="getStatuses"
        ></chart-tasks-per-status>
      </article>
      <article class="doughnut-tasks-per-priority flex col space-between ">
        <h2 class="dash-header" title="Chart displays tasks per priority">
          Tasks per Priority
        </h2>

        <chart-tasks-per-priority
          :priorities="getPriorities"
        ></chart-tasks-per-priority>
      </article>
    </div>
        <div class="bars flex wrap align-center ">

    <article class="bar-tasks-per-member ">
      <h2
        class="dash-header"
        title="Chart displays tasks per member and categorizes them as open, done and overdue"
      >
        Task Classification per Team Member
      </h2>
      <chart-tasks-per-member
        :members="members"
        :membersData="getPerMemberData"
        :doneTasks="doneTasks"
        :openTasks="openTasks"
        :overdueTasks="overdueTasks"
      ></chart-tasks-per-member>
    </article>
    <article class="bar-tasks-per-group ">
      <h2
        class="dash-header"
        title="Chart displays high risk tasks per member. These are tasks of high priority that are either over due, or have not started."
      >
        High Risk Tasks per Group
      </h2>
      <chart-high-risk
        :groups="groups"
        :groupDate="getPerGroupData"
        :emptyTasks="emptyTasks"
        :stuckTasks="stuckTasks"
        :overdueGroupTasks="overdueGroupTasks"
      ></chart-high-risk>
    </article>
    </div>
  </section>
</template>

<script>
import chartTasksPerStatus from "../components/chart-tasks-per-status.vue";
import chartTasksPerPriority from "../components/chart-tasks-per-priority.vue";
import chartTasksPerMember from "../components/chart-tasks-per-member.vue";
import lastSeen from "../components/board/last-seen.vue";
import chartHighRisk from "../components/chart-high-risk.vue";

export default {
  props: { board: Object },
  name: "dashboard",
  components: {
    chartTasksPerStatus,
    chartTasksPerPriority,
    chartTasksPerMember,
    chartHighRisk,
    lastSeen,
  },
  created() {},
  data() {
    return {
      doneTasks: [],
      openTasks: [],
      overdueTasks: [],
      emptyTasks: [],
      stuckTasks: [],
      overdueGroupTasks: [],
      statuses: {},
      priorities: {},
      taskCount: 0,
    };
  },
  methods: {},

  computed: {
    getHighTasks() {
      var countTasks = 0;
      this.board.groups.map((group) =>
        group.tasks.map((task) => {
          if (
            task.cols[3].value?.toLowerCase() === "high" &&
            task.cols[0].value?.toLowerCase() !== "done"
          )
            countTasks++;
        })
      );
      return countTasks;
    },
    getPriorities() {
      this.board.groups.map((group) =>
        group.tasks.map((task) => {
          var priorityName = task.cols[3].value;
          if (priorityName === "" || priorityName === null)
            priorityName = "No-Status";
          if (!this.priorities[priorityName]) {
            this.priorities[priorityName] = 0;
          }
          this.priorities[priorityName]++;
        })
      );

      return JSON.parse(JSON.stringify(this.priorities));
    },
    getStatuses() {
      this.board.groups.map((group) =>
        group.tasks.map((task) => {
          var statusName = task.cols[0].value;
          if (statusName === "" || statusName === null)
            statusName = "No-Status";
          if (!this.statuses[statusName]) {
            this.statuses[statusName] = 0;
          }
          this.statuses[statusName]++;
        })
      );
      this.taskCount = Object.keys(this.statuses).reduce((accumulator, key) => {
        accumulator += this.statuses[key];

        return accumulator;
      }, 0);
      return JSON.parse(JSON.stringify(this.statuses));
    },
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
                task.cols[0].value?.toLowerCase() === "done"
              ) {
                // console.log(task.title, person.fullname)
                member["doneTasks"]++;
              }
              if (
                person.fullname === member.member &&
                task.cols[0].value?.toLowerCase() !== "done"
              )
                member["openTasks"]++;
              if (
                person.fullname === member.member &&
                task.cols[0].value?.toLowerCase() !== "done" &&
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

      // console.log(groupCount);

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
