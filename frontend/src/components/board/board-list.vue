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
      Draggable
  },
  created() {},
  data() {
    return {};
  },
  methods: {
      setBoardUpdate(val, board){
          this.$emit('setBoardUpdate', val, board)
      },
      updateBoard(text,board){
          this.$emit('updateBoard', text, board)
      },
      chooseBoard(board){
          this.$emit('chooseBoard', board)
      }
  },
  computed: {},
  unmounted() {},
};
</script>
