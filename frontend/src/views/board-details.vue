<template>
  <section v-if="currBoard" class="board-details" :key="currBoard">
    <div class="header">
      <div class="">
        <div class="board-header-top">
          <div class="board-header-left flex space-evenly">
            <h1
              class="board-title"
              @keydown.enter="setBoardTitle"
              @blur="setBoardTitle"
              contenteditable="true"
            >
              {{ currBoard.title }}
            </h1>
            <div class="info-star flex">
              <button class="btn-hover" @click="isShown = !isShown">
                <span
                  class="info"
                  :class="{ 'is-full': !isShown, 'is-empty': isShown }"
                ></span>
              </button>
              <button class="btn-hover" @click="isFavorite = !isFavorite">
                <span
                  class="star"
                  :class="{ 'is-on': isFavorite, 'is-off': !isFavorite }"
                >
                </span>
              </button>
            </div>
          </div>
          <div class="board-header-right flex align-center">
            <!-- LAST SEEN CMP -->
            <div class="last-seen flex">
              <button class="btn last h-btn">Last seen</button>
              <last-seen :members="currBoard.members" />
            </div>
            <button class="btn invite flex h-btn">
              Invite / <span> {{ currBoard.members?.length }}</span>
            </button>
            <button class="btn activity flex h-btn">Activity</button>
            <button class="btn add flex h-btn">Add to board</button>
          </div>
        </div>
        <p
          class="description"
          :class="{ 'd-none': isShown }"
          @blur="setBoardTitle"
          @keydown.enter="setBoardTitle"
          contenteditable="true"
          data-placeholder="Add board description"
        >
          {{ currBoard.description }}
        </p>

        <div class="btn-container">
          <button class="main h-btn" @click="isChart = false">
            Main Table
          </button>
          <button class="timeline h-btn">Timeline</button>
          <!-- <button class="more h-btn">More</button> -->
          <button class="dash h-btn" @click="isChart = true">Dashboard</button>
        </div>
      </div>
      <!-- <hr /> -->

      <div class="board-filter flex flex-wrap items-center" v-if="!isChart">
        <el-dropdown
          class="btn-new-task"
          split-button
          type="primary"
          width="104.63px"
          height="32px"
          @click="addNewTask"
        >
          New Item
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="addGroup"
                >New group of Items</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <app-filter @filter="onFilter" />
      </div>

      <add-group-task
        @addGroup="addGroup"
        @addTask="currBoard"
      ></add-group-task>
    </div>

    <div class="bottom-board">
      <dashboard v-if="currBoard && isChart" :board="currBoard"></dashboard>
      <!-- GROUP  -->
      <section class="group-list" v-if="currBoard && !isChart">
        <Container orientation="vertical" @drop="onDrop">
          <Draggable v-for="group in currBoard.groups" :key="group.id">
            <group-cmp
              :group="group"
              :board="currBoard"
              @setCurrGroup="setCurrGroup"
            />
            <br />
          </Draggable>
        </Container>
      </section>

      <!-- TASK DETAILS -->
      <task-details
        v-if="taskToShow"
        :task="taskToShow"
        :group="currGroup"
        :boardId="currBoard._id"
      />
    </div>
  </section>
</template>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: #323338;
  display: flex;
  align-items: center;
}
</style>
<script>
import { ArrowDown } from "@element-plus/icons-vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { socketService } from "../services/socket-service.js";
import lastSeen from "../components/board/last-seen.vue";
import groupCmp from "../components/group/group.vue";
import addGroupTask from "../components/add-group-task.vue";
import appFilter from "../components/board/board-filter.vue";
import taskDetails from "../components/task-details/task-details.vue";
import dashboard from "../components/dashboard.vue";

export default {
  name: "board-details",
  components: {
    groupCmp,
    addGroupTask,
    appFilter,
    Container,
    Draggable,
    lastSeen,
    taskDetails,
    dashboard,
  },
  created() {
    let { boardId } = this.$route.params;
    const board = this.$store.dispatch({ type: "getBoardById", boardId });
    this.$store.commit({ type: "setCurrBoard", board });
    socketService.on("board updated", this.refreshBoard);
  },
  unmounted() {
    socketService.off("board updated", this.refreshBoard);
  },
  data() {
    return {
      board: null,
      currGroup: null,
      isShown: false,
      isFavorite: false,
      isChart: false,
    };
  },
  methods: {
    onFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
    },
    addNewTask() {
      this.$store.dispatch({
        type: "addTask",
        groupIdx: 0,
      });
    },
    addGroup() {
      this.$store.dispatch({ type: "addGroup" });
    },
    setBoardTitle(event) {
      if (event.target.nodeName === "H1") {
        var title = event.target.innerText;
      }
      if (event.target.nodeName === "P") {
        var description = event.target.innerText;
      }
      console.log("title, description", title, description);
      this.$store.dispatch({
        type: "saveBoard",
        title,
        description,
        boardId: this.currBoard._id,
      });
    },
    onDrop(dropResult) {
      const board = JSON.parse(JSON.stringify(this.currBoard));
      board.groups = this.applyDrag(board.groups, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let taskToAdd = payload;

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd);
      }
      this.updateGroupsOrder(result);
      return result;
    },
    updateGroupsOrder(result) {
      const groupsAfterDnd = JSON.parse(JSON.stringify(result));
      console.log("result", groupsAfterDnd);
      this.$store.dispatch({
        type: "updateGroupsOrder",
        newGroups: groupsAfterDnd,
      });
    },
    setCurrGroup(group) {
      JSON.parse(JSON.stringify(group));
      this.currGroup = group;
    },
    refreshBoard() {
      this.$store.dispatch({
        type: "getBoardById",
        boardId: this.currBoard._id,
      });
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
      // return this.$store.getters.currBoard;
    },
    boardToDisplay() {
      // return this.$store.getters.currBoard;
      console.log(this.$store.getters.boardToDisplay);
      return this.$store.getters.boardToDisplay;
    },
    taskToShow() {
      return this.$store.getters.taskToShow;
    },
    currgroup() {
      return this.currGroup;
    },
  },
};
</script>
