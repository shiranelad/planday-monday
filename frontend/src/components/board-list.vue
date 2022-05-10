<template>
  <section
    :key="boards"
    class="board-list flex col"
    :class="{ 'is-expanded': isExpanded }"
  >
    <div
      disabled=""
      class="collapse-btn"
      :class="{ 'is-pinned': isExpanded, 'is-expanded' : isExpanded }"
      @click="toggleExpanded"
    >
      <i class="collapse-icon fa fa-angle-right"></i>
    </div>
    <div :class="{ all: isExpanded, 'd-none': !isExpanded }">
      <div class="title-box-container flex col">
        <div class="title-container flex col space-between">
          <h1>Workspace</h1>
          <button class="btn"></button>
          <div class="ws-name">
            <span class="ws-icon">M<i class="house-icon"></i></span>
            <span class="ws-title">Main workspace</span>
          </div>
        </div>
      </div>
      <div class="menu-buttons flex col">
        <button
          @click="addBoard"
          class="bl-btn btn flex justify-start align-center"
        >
          <svg width="19" height="19">
            <path
              d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Add</span>
        </button>
        <button class="bl-btn btn flex justify-start">
          <svg width="19" height="19">
            <path
              d="M17.8571 2.87669C18.107 3.41157 18.0246 4.04275 17.6457 4.49555L12.4892 10.6589V15.3856C12.4892 16.0185 12.097 16.5852 11.5048 16.8082L9.56669 17.5381C9.09976 17.7139 8.57627 17.6494 8.16598 17.3655C7.75569 17.0816 7.51084 16.6144 7.51084 16.1155V10.6589L2.35425 4.49555C1.97542 4.04275 1.89302 3.41157 2.14291 2.87669C2.39279 2.34182 2.92977 2 3.52013 2H16.4799C17.0702 2 17.6072 2.34182 17.8571 2.87669ZM16.4799 3.52012H3.52013L8.91611 9.96964C8.99036 10.0584 9.03096 10.1698 9.03096 10.2848V16.1155L10.969 15.3856V10.2848C10.969 10.1698 11.0096 10.0584 11.0839 9.96964L16.4799 3.52012Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Filter</span>
        </button>
        <button class="bl-btn btn flex justify-start">
          <svg width="19" height="19">
            <path
              d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Search</span>
        </button>
      </div>
      <div class="spacer"></div>
      <div class="boards">
        <section class="board-names-list">
          <board-preview
            v-for="board in boards"
            :key="board"
            :board="board"
            @chooseBoard="chooseBoard"
            @setBoardUpdate="setBoardUpdate"
            @updateBoard="updateBoard"
          ></board-preview>
                 </section>
      </div>
    </div>
  </section>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import boardPreview from "../components/board-preview.vue";

export default {
  components: {
    boardPreview,
  },

  data() {
    return {
      isExpanded: true,
    };
  },
  methods: {
  

    async addBoard() {
      try {
        const { value } = await ElMessageBox.prompt(
          "Please enter board name",
          "Add New Board",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            draggable: true,
            "close-on-click-modal": false,
          }
        );
        if (value)
          await this.$store.dispatch({
            type: "addBoard",
            value,
          });
        ElMessage({ type: "success", message: `Board ${value} was created` });
        this.$router.push("/board/" + this.currBoard._id);
      } catch (err) {
        ElMessage({ type: "info", message: "Input canceled" });
      }
    },
    chooseBoard(board) {
      this.$store.commit({ type: "setCurrBoard", board });
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },

    async setBoardUpdate(value, board) {
      // if (value === "rename") {
      //   updateBoard()
      // }
      if (value === "remove") {
        await this.$store.dispatch({
          type: "removeBoard",
          boardId: board._id,
        });
      }
      if (value === "duplicate") {
        await this.$store.dispatch({
          type: "duplicateBoard",
          boardId: board._id,
        });
      }
    },
    // async updateBoard($event) {
    //   console.log($event)
    //   var title = $event.target.innerText
    //   await this.$store.dispatch({ type: "saveBoard", title});
    // },
    async updateBoard(title, board) {
      // console.log($event)
      // var title = $event.target.innerText
      await this.$store.dispatch({
        type: "saveBoard",
        title,
        boardId: board._id,
      });
    },

    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({
          type: "removeBoard",
          boardId,
        });
        this.$router.push(`/board/${this.currBoard._id}`);
        // console.log("/board/" + this.currBoard._id)
      } catch (err) {
        console.log(err);
      }
      // }
    },
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
