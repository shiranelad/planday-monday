<template>
  <section class="board-list">
    <Container orientation="vertical" @drop="onDrop">
      <Draggable v-for="board in boards" :key="board._id">
        <board-preview
          :board="board"
          @chooseBoard="chooseBoard"
          @setBoardUpdate="setBoardUpdate"
          @updateBoard="updateBoard"
        ></board-preview>
      </Draggable>
    </Container>
  </section>
</template>

<script>
import boardPreview from "../board-preview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  name: "board-list",
  props: { boards: Object },
  emits: ["setBoardUpdate", "updateBoard", "chooseBoard"],

  components: {
    boardPreview,
    Container,
    Draggable,
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    onDrop(dropResult) {
      // const board = JSON.parse(JSON.stringify(this.currBoard));
      const boards = JSON.parse(JSON.stringify(this.boards))
      this.applyDrag(boards, dropResult);
    },

    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let boardToAdd = payload;

      if (removedIndex !== null) {
        boardToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, boardToAdd);
      }
      this.updateBoardsOrder(result);
      return result;
    },

    updateBoardsOrder(result){
            const boardsAfterDnd = JSON.parse(JSON.stringify(result));
      console.log("result", boardsAfterDnd);
      this.$store.dispatch({
        type: "updateBoardsOrder",
        newBoards: boardsAfterDnd,
      });

    },
    setBoardUpdate(val, board) {
      this.$emit("setBoardUpdate", val, board);
    },
    updateBoard(text, board) {
      this.$emit("updateBoard", text, board);
    },
    chooseBoard(board) {
      this.$emit("chooseBoard", board);
    },
  },
  computed: {},
  unmounted() {},
};
</script>
