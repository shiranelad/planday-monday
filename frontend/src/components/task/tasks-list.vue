<template>
  <section class="task-list">
    <Container
      group-name="eltask"
      :get-child-payload="getChildPayloadEltasks"
      orientation="vertical"
      @drop="onDrop($event)"
    >
      <Draggable v-for="eltask in eltasks" :key="eltask.id">
        <!-- <div
          class="side-indicator"
          @click="setIsOptions"
          style="
            flex: 0 0 8px;
            position: relative;
            background-color: rgb(59, 44, 217);
            color: rgb(87, 155, 252);
            height: 36px;
            width: 8px;
            display: inline;
          "
          :style="{ backgroundColor: groupColor }"
        ></div> -->
        <task-preview
          :task="eltask"
          :groupColor="groupColor"
          :group="group"
        ></task-preview>
      </Draggable>
    </Container>
    <!-- <div
      style="
        flex: 0 0 8px;
        position: relative;
        background-color: rgb(59, 44, 217);
        color: rgb(87, 155, 252);
        height: 36px;
        width: 8px;
        display: inline-block;
      "
      class="side-indicator"
      :style="{ backgroundColor: groupColor }"
    ></div> -->
    <div class="inline">
      <new-inline-task @add-task="add" :groupColor="group.groupColor" />
    </div>
    <group-Progress :tasks="group.tasks" />
  </section>
</template>

<script>
import newInlineTask from './new-inline-task.vue'
import groupProgress from '../group/group-progress.vue'
import taskPreview from './task-preview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  props: {
    tasks: Array,
    group: Object,
    groupColor: String,
  },
  emits: ['add-inline', 'updateGroupAfterDnd'],
  data() {
    return {
      eltasks: this.tasks,
    }
  },
  methods: {
    add(value) {
      // console.log('tasklist:', value, this.group)
      this.$emit("add-inline", value, this.group.id);
    },
    getChildPayloadEltasks(index) {
      return this.eltasks[index]
    },
    onDrop(dropResult) {
      if (dropResult.addedIndex === null && dropResult.removedIndex === null)
        return
      this.eltasks = this.applyDrag(this.eltasks, dropResult)
      this.updateGroup(this.eltasks)

      // if (this.eltasks !== this.applyDrag(this.eltasks, dropResult)) {
      //   console.log("yay", dropResult);
      //   this.eltasks = this.applyDrag(this.eltasks, dropResult);
      //   this.updateGroup(this.eltasks);
      // }
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult

      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let taskToAdd = payload

      if (removedIndex !== null) {
        taskToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, taskToAdd)
      }

      return result
    },
    updateGroup(tasksAfterDnd) {
      this.$emit('updateGroupAfterDnd', tasksAfterDnd)
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  components: {
    taskPreview,
    Container,
    Draggable,
    groupProgress,
    newInlineTask,
  },
}
</script>

<style></style>
